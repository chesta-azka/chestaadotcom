const fs = require('fs');

// Patch ServicesPage
let servicesContent = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');
servicesContent = servicesContent.replace(
  "import toast from 'react-hot-toast';",
  "import toast from 'react-hot-toast';\nimport { logAnalyticsEvent } from '../lib/firebase';"
);

// Add analytics inside handleQuickRequest
const origRequest = "const handleQuickRequest = async () => {\n    if (!requestText.trim()) return;\n    setIsGenerating(true);\n    // Simulate AI generation\n    setTimeout(() => {\n      setIsGenerating(false);\n      confetti({\n        particleCount: 100,\n        spread: 70,\n        origin: { y: 0.6 }\n      });\n      toast.success('Proposal scope berhasil dibuat (Simulasi)! Tim kami akan menghubungi Anda.');\n      setRequestText('');\n    }, 2000);\n  };";

const patchedRequest = `const handleQuickRequest = async () => {
    if (!requestText.trim()) return;
    
    // Log Firebase Event
    logAnalyticsEvent('generate_scope_proposal', { input_length: requestText.length });
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success('Proposal scope berhasil dibuat (Simulasi)! Tim kami akan menghubungi Anda.');
      setRequestText('');
    }, 2000);
  };`;

servicesContent = servicesContent.replace(origRequest, patchedRequest);
fs.writeFileSync('src/pages/ServicesPage.tsx', servicesContent);

// Patch QuickQuoteModal
let quoteContent = fs.readFileSync('src/components/organisms/QuickQuoteModal.tsx', 'utf8');
quoteContent = quoteContent.replace(
  "import { X, MessageSquare, ChevronRight } from 'lucide-react';",
  "import { X, MessageSquare, ChevronRight } from 'lucide-react';\nimport { logAnalyticsEvent } from '../../lib/firebase';"
);

const origSubmit = "const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    const message = `Halo CHESTADOTCOM, saya tertarik untuk cepat diskusi mengenai:%0A%0A*Layanan:* ${formData.interest}%0A*Nama:* ${formData.name}%0A*Kontak:* ${formData.contact}`;";
const patchedSubmit = `const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logAnalyticsEvent('quick_quote_submit', { service_interest: formData.interest });
    
    const message = \`Halo CHESTADOTCOM, saya tertarik untuk cepat diskusi mengenai:%0A%0A*Layanan:* \${formData.interest}%0A*Nama:* \${formData.name}%0A*Kontak:* \${formData.contact}\`;`;
    
quoteContent = quoteContent.replace(origSubmit, patchedSubmit);
fs.writeFileSync('src/components/organisms/QuickQuoteModal.tsx', quoteContent);
