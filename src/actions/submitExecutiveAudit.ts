'use server';

export async function submitExecutiveAudit(formData: FormData) {
  try {
    const corporateEmail = formData.get('corporateEmail')?.toString().trim();
    const companyName = formData.get('companyName')?.toString().trim();
    const painPoint = formData.get('painPoint')?.toString().trim();

    // Strict Server-Side Validation
    if (!corporateEmail || !corporateEmail.includes('@')) {
      return { success: false, error: 'Email perusahaan tidak valid.' };
    }

    if (!companyName || companyName.length < 2) {
      return { success: false, error: 'Nama perusahaan wajib diisi minimal 2 karakter.' };
    }

    if (!painPoint) {
      return { success: false, error: 'Pilih salah satu kendala utama sistem Anda.' };
    }

    // Prepare payload
    const payload = {
      corporateEmail,
      companyName,
      painPoint,
      submittedAt: new Date().toISOString(),
      source: 'chestaadotcom-executive-audit',
    };

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(8000), // 8 seconds timeout
        });

        if (!response.ok) {
          console.error('Webhook notification failed with status:', response.status);
        }
      } catch (webhookErr) {
        // Graceful catch so server action doesn't crash user UX if n8n is down
        console.error('Webhook error transmission:', webhookErr);
      }
    } else {
      console.warn('N8N_WEBHOOK_URL is not defined in environment variables. Audit logged locally.');
    }

    return {
      success: true,
      message: 'Audit eksekutif berhasil dikirim. Tim Principal Architect chestaadotcom akan menghubungi dalam 2 jam kerja.',
    };
  } catch (err: any) {
    console.error('Submit executive audit error:', err);
    return {
      success: false,
      error: 'Terjadi kesalahan sistem saat memproses audit. Silakan coba beberapa saat lagi.',
    };
  }
}
