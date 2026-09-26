export interface ParsedOption {
  label: string;
  action?: string;
  value?: string;
  nextStep?: 'whatsapp' | 'schedule' | 'details' | 'default';
  isUrgent?: boolean;
}

export interface ParsedAiResponse {
  cleanText: string;
  options: ParsedOption[];
}

/**
 * Parses AI chat responses containing <opsi>label</opsi> tags or JSON options blocks
 * supporting urgency bolding detection and adaptive next-step logic.
 */
export function parseAiResponse(rawText: string): ParsedAiResponse {
  if (!rawText) return { cleanText: '', options: [] };

  const options: ParsedOption[] = [];
  
  // 1. Extract <opsi>...</opsi> or <option>...</option> tags
  const optionTagRegex = /<(?:opsi|option)>([\s\S]*?)<\/(?:opsi|option)>/g;
  let match;
  let cleanText = rawText;

  while ((match = optionTagRegex.exec(rawText)) !== null) {
    const optionContent = match[1].trim();
    // Check if format is Label|Action|NextStep or Label|Action or just Label
    const parts = optionContent.split('|').map(p => p.trim());
    const label = parts[0];
    const action = parts[1] || label;
    const nextStepHint = (parts[2] || '').toLowerCase();
    
    let nextStep: 'whatsapp' | 'schedule' | 'details' | 'default' = 'default';
    if (nextStepHint.includes('whatsapp') || label.toLowerCase().includes('whatsapp')) {
      nextStep = 'whatsapp';
    } else if (nextStepHint.includes('schedule') || nextStepHint.includes('jadwal') || label.toLowerCase().includes('jadwal')) {
      nextStep = 'schedule';
    } else if (nextStepHint.includes('details') || nextStepHint.includes('rincian')) {
      nextStep = 'details';
    }

    const isUrgent = /\*\*(sisa|promo|terbatas|diskon|cepat|hari ini)\b/i.test(label) || /sisa|promo|terbatas/i.test(label);

    options.push({
      label,
      action,
      value: label,
      nextStep,
      isUrgent
    });
  }

  // Remove the tags from cleanText
  cleanText = cleanText.replace(optionTagRegex, '').trim();

  // 2. Also check if JSON options block exists at the end
  const jsonBlockRegex = /```(?:json)?\s*(\{[\s\S]*?["']options["'][\s\S]*?\})\s*```/i;
  const jsonMatch = cleanText.match(jsonBlockRegex);
  if (jsonMatch) {
    try {
      const parsedJson = JSON.parse(jsonMatch[1]);
      if (parsedJson && Array.isArray(parsedJson.options)) {
        parsedJson.options.forEach((opt: any) => {
          const label = typeof opt === 'string' ? opt : (opt.label || '');
          const action = opt.action || label;
          const isUrgent = /\*\*(sisa|promo|terbatas|diskon)\b/i.test(label) || /sisa|promo|terbatas/i.test(label);
          options.push({
            label,
            action,
            value: opt.value || label,
            nextStep: opt.nextStep || 'default',
            isUrgent
          });
        });
      }
      cleanText = cleanText.replace(jsonBlockRegex, '').trim();
    } catch (e) {
      // Ignore JSON parse errors
    }
  }

  // Fallback default smart options if no explicit tags found in expert greeting
  if (options.length === 0 && (cleanText.toLowerCase().includes('halo') || cleanText.toLowerCase().includes('chestadotcom'))) {
    options.push(
      { label: '🔥 **Amankan Paket 540K** (Sisa 3 Slot!)', action: 'Amankan Paket 540K', nextStep: 'whatsapp', isUrgent: true },
      { label: '📅 Jadwal Discovery Call', action: 'Jadwal Discovery Call', nextStep: 'schedule', isUrgent: false },
      { label: '💬 Tanya Detail via WhatsApp', action: 'WhatsApp', nextStep: 'whatsapp', isUrgent: false }
    );
  }

  return { cleanText, options };
}

