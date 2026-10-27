/**
 * ============================================================================
 * DATA-DRIVEN ILLUSTRATION SYSTEM DATASET — CHESTAADOTCOM
 * ============================================================================
 * Single source of truth for all FlowIllustration diagrams across the site.
 * Supports Indonesian (source) and faithful English 1:1 translations.
 */

export type IllustrationRole = 'input' | 'hub' | 'output' | 'branch' | 'module';
export type EdgeKind = 'normal' | 'branch' | 'failure';
export type IllustrationVariant =
  | 'workflow-flow'
  | 'agent-flow'
  | 'website-flow'
  | 'software-flow'
  | 'area-flow'
  | 'error-flow'
  | 'about-flow'
  | 'casestudy-flow';

export interface IllustrationNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  x: number;
  y: number;
  role: IllustrationRole;
  isCurrentArea?: boolean;
  badge?: string;
}

export interface IllustrationEdge {
  id: string;
  from: string;
  to: string;
  dots: number;
  kind: EdgeKind;
  label?: string;
  pathD?: string;
}

export interface IllustrationStep {
  highlightNodes: string[];
  activeEdgeIds?: string[];
  caption: string;
}

export interface IllustrationModule {
  id: string;
  code: string;
  title: string;
  sub: string;
  accent?: boolean;
}

export interface IllustrationData {
  id: string;
  variant: IllustrationVariant;
  theme: 'light' | 'dark';
  title: string;
  description: string;
  chipLabel: string;
  schematicNotice?: string;
  viewBox: string;
  speedMeter?: boolean;
  speedLabel?: string;
  modules?: IllustrationModule[];
  nodes: IllustrationNode[];
  edges: IllustrationEdge[];
  steps: IllustrationStep[];
}

export const ILLUSTRATIONS_ID: Record<string, IllustrationData> = {
  // 1. Workflow Automation Flow
  'workflow-flow': {
    id: 'workflow-flow',
    variant: 'workflow-flow',
    theme: 'light',
    title: 'Aliran data otomatis antar-aplikasi',
    description: 'Data masuk dari formulir dan WhatsApp diproses oleh alur otomatis, lalu didistribusikan ke Sheets, Kalender, Invoice, dan Notifikasi.',
    chipLabel: 'Ilustrasi',
    viewBox: '0 0 540 360',
    nodes: [
      { id: 'form', label: 'Formulir', icon: 'FileText', x: 75, y: 90, role: 'input' },
      { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageSquare', x: 75, y: 230, role: 'input' },
      { id: 'hub', label: 'Alur otomatis', icon: 'Workflow', x: 245, y: 160, role: 'hub' },
      { id: 'sheets', label: 'Google Sheets', icon: 'Sheet', x: 435, y: 65, role: 'output' },
      { id: 'calendar', label: 'Kalender', icon: 'Calendar', x: 435, y: 140, role: 'output' },
      { id: 'invoice', label: 'Invoice', icon: 'Receipt', x: 435, y: 215, role: 'output' },
      { id: 'notify', label: 'Notifikasi', icon: 'Bell', x: 435, y: 290, role: 'output' },
    ],
    edges: [
      { id: 'e-form-hub', from: 'form', to: 'hub', dots: 1, kind: 'normal' },
      { id: 'e-wa-hub', from: 'whatsapp', to: 'hub', dots: 1, kind: 'normal' },
      { id: 'e-hub-sheets', from: 'hub', to: 'sheets', dots: 1, kind: 'normal' },
      { id: 'e-hub-calendar', from: 'hub', to: 'calendar', dots: 1, kind: 'normal' },
      { id: 'e-hub-invoice', from: 'hub', to: 'invoice', dots: 1, kind: 'normal' },
      { id: 'e-hub-notify', from: 'hub', to: 'notify', dots: 0, kind: 'failure', label: 'Gagal: tim diberi tahu' },
    ],
    steps: [
      { highlightNodes: ['form', 'whatsapp'], caption: 'Data masuk dari formulir atau WhatsApp' },
      { highlightNodes: ['hub'], caption: 'Alur memeriksa dan merapikan data' },
      { highlightNodes: ['sheets', 'calendar'], caption: 'Data tercatat di Sheets dan kalender' },
      { highlightNodes: ['invoice'], caption: 'Invoice dibuat dan dikirim' },
      { highlightNodes: ['notify'], caption: 'Kalau ada yang gagal, tim diberi tahu.' },
    ],
  },

  // 2. AI Agent Flow
  'agent-flow': {
    id: 'agent-flow',
    variant: 'agent-flow',
    theme: 'dark',
    title: 'Alur kerja AI Agent cerdas',
    description: 'Pesan WhatsApp diterima oleh Agent otonom, kemudian menggunakan tool kalender, database, CRM, dan invoice dengan eskalasi ke staf.',
    chipLabel: 'Ilustrasi',
    viewBox: '0 0 540 370',
    nodes: [
      { id: 'wa-in', label: 'Pesan WhatsApp', icon: 'MessageSquare', x: 75, y: 160, role: 'input' },
      { id: 'agent-hub', label: 'Agent', icon: 'Bot', x: 235, y: 160, role: 'hub' },
      { id: 'calendar', label: 'Kalender', icon: 'Calendar', x: 435, y: 65, role: 'output' },
      { id: 'database', label: 'Database', icon: 'Database', x: 435, y: 140, role: 'output' },
      { id: 'crm', label: 'CRM', icon: 'Users', x: 435, y: 215, role: 'output' },
      { id: 'invoice', label: 'Invoice', icon: 'Receipt', x: 435, y: 290, role: 'output' },
      { id: 'staff', label: 'Staf', icon: 'User', x: 235, y: 295, role: 'branch' },
    ],
    edges: [
      { id: 'e-wain-agent', from: 'wa-in', to: 'agent-hub', dots: 1, kind: 'normal' },
      { id: 'e-agent-cal', from: 'agent-hub', to: 'calendar', dots: 1, kind: 'normal' },
      { id: 'e-agent-db', from: 'agent-hub', to: 'database', dots: 1, kind: 'normal' },
      { id: 'e-agent-crm', from: 'agent-hub', to: 'crm', dots: 1, kind: 'normal' },
      { id: 'e-agent-inv', from: 'agent-hub', to: 'invoice', dots: 1, kind: 'normal' },
      { id: 'e-agent-staff', from: 'agent-hub', to: 'staff', dots: 0, kind: 'branch', label: 'Serah ke manusia' },
    ],
    steps: [
      { highlightNodes: ['wa-in'], caption: 'Pesan masuk' },
      { highlightNodes: ['agent-hub'], caption: 'Agent memahami maksud' },
      { highlightNodes: ['agent-hub', 'calendar', 'database'], caption: 'Agent memakai tool' },
      { highlightNodes: ['crm', 'invoice'], caption: 'Agent bertindak dan mencatat' },
      { highlightNodes: ['staff'], caption: 'Kasus sensitif diserahkan ke staf.' },
    ],
  },

  // 3. Website Flow
  'website-flow': {
    id: 'website-flow',
    variant: 'website-flow',
    theme: 'light',
    title: 'Alur konversi website modern',
    description: 'Pengunjung membuka halaman berkecepatan tinggi, menekan tombol interaktif, dan pesan langsung terkirim ke pemilik bisnis.',
    chipLabel: 'Ilustrasi',
    viewBox: '0 0 540 330',
    speedMeter: true,
    speedLabel: 'Ilustrasi kecepatan',
    nodes: [
      { id: 'visitor', label: 'Pengunjung', icon: 'User', x: 75, y: 160, role: 'input' },
      { id: 'fastpage', label: 'Halaman cepat', icon: 'Smartphone', x: 220, y: 160, role: 'hub' },
      { id: 'ctabuttons', label: 'WhatsApp & Formulir', icon: 'MessageSquare', x: 375, y: 160, role: 'module' },
      { id: 'messagein', label: 'Pesan masuk', icon: 'CheckCircle2', x: 475, y: 160, role: 'output' },
    ],
    edges: [
      { id: 'e-vis-page', from: 'visitor', to: 'fastpage', dots: 1, kind: 'normal' },
      { id: 'e-page-cta', from: 'fastpage', to: 'ctabuttons', dots: 1, kind: 'normal' },
      { id: 'e-cta-msg', from: 'ctabuttons', to: 'messagein', dots: 1, kind: 'normal' },
    ],
    steps: [
      { highlightNodes: ['visitor'], caption: 'Pengunjung membuka halaman' },
      { highlightNodes: ['fastpage'], caption: 'Halaman muncul cepat di HP' },
      { highlightNodes: ['ctabuttons'], caption: 'Pengunjung memilih chat atau formulir' },
      { highlightNodes: ['messagein'], caption: 'Pesan sampai ke kamu.' },
    ],
  },

  // 4. Software Flow
  'software-flow': {
    id: 'software-flow',
    variant: 'software-flow',
    theme: 'light',
    title: 'Arsitektur software kustom modular',
    description: 'Input operasional staf diproses oleh modul aplikasi terintegrasi (Penjualan, Stok, Laporan) dan disajikan ke dashboard pemilik.',
    chipLabel: 'Ilustrasi',
    viewBox: '0 0 540 340',
    modules: [
      { id: 'mod-1', code: 'MODUL 01', title: 'Penjualan', sub: 'Kasir & Invoice' },
      { id: 'mod-2', code: 'MODUL 02', title: 'Stok', sub: 'Inventaris & Opname', accent: true },
      { id: 'mod-3', code: 'MODUL 03', title: 'Laporan', sub: 'Laba Rugi Harian' },
    ],
    nodes: [
      { id: 'staffinput', label: 'Input staf', icon: 'User', x: 70, y: 160, role: 'input' },
      { id: 'apphub', label: 'Aplikasi', icon: 'Layers', x: 245, y: 160, role: 'hub' },
      { id: 'dashboard', label: 'Dashboard pemilik', icon: 'LayoutDashboard', x: 440, y: 160, role: 'output' },
    ],
    edges: [
      { id: 'e-staff-app', from: 'staffinput', to: 'apphub', dots: 1, kind: 'normal' },
      { id: 'e-app-dash', from: 'apphub', to: 'dashboard', dots: 1, kind: 'normal' },
    ],
    steps: [
      { highlightNodes: ['staffinput'], caption: 'Staf mengisi data' },
      { highlightNodes: ['apphub'], caption: 'Data tersimpan di satu sistem' },
      { highlightNodes: ['apphub'], caption: 'Modul saling terhubung' },
      { highlightNodes: ['dashboard'], caption: 'Pemilik melihat laporan.' },
    ],
  },

  // 5. Area Flow (Schematic service coverage)
  'area-flow': {
    id: 'area-flow',
    variant: 'area-flow',
    theme: 'light',
    title: 'Jangkauan layanan teknologi BSD & Sekitarnya',
    description: 'Hub operasional BSD terhubung ke seluruh area penyangga Tangerang Selatan, Pamulang, Jurang Mangu, dan Lebak Bulus.',
    chipLabel: 'Ilustrasi',
    schematicNotice: 'Ilustrasi skematik layanan, bukan peta',
    viewBox: '0 0 540 340',
    nodes: [
      { id: 'bsd', label: 'BSD', icon: 'MapPin', x: 270, y: 160, role: 'hub' },
      { id: 'tangerang-selatan', label: 'Tangerang Selatan', icon: 'MapPin', x: 95, y: 85, role: 'output' },
      { id: 'pamulang', label: 'Pamulang', icon: 'MapPin', x: 445, y: 85, role: 'output' },
      { id: 'jurang-mangu', label: 'Jurang Mangu', icon: 'MapPin', x: 95, y: 245, role: 'output' },
      { id: 'lebak-bulus', label: 'Lebak Bulus', icon: 'MapPin', x: 445, y: 245, role: 'output' },
    ],
    edges: [
      { id: 'e-bsd-tangsel', from: 'bsd', to: 'tangerang-selatan', dots: 1, kind: 'normal' },
      { id: 'e-bsd-pamulang', from: 'bsd', to: 'pamulang', dots: 1, kind: 'normal' },
      { id: 'e-bsd-jm', from: 'bsd', to: 'jurang-mangu', dots: 1, kind: 'normal' },
      { id: 'e-bsd-lb', from: 'bsd', to: 'lebak-bulus', dots: 1, kind: 'normal' },
    ],
    steps: [
      { highlightNodes: ['bsd'], caption: 'Pusat operasional dan arsitektur sistem di BSD' },
      { highlightNodes: ['tangerang-selatan', 'pamulang'], caption: 'Koordinasi tatap muka kawasan Serpong dan Pamulang' },
      { highlightNodes: ['jurang-mangu', 'lebak-bulus'], caption: 'Konektivitas cepat komuter Bintaro dan Jakarta Selatan' },
      { highlightNodes: ['bsd', 'tangerang-selatan', 'pamulang', 'jurang-mangu', 'lebak-bulus'], caption: 'Layanan digital terintegrasi untuk seluruh Jabodetabek.' },
    ],
  },

  // 6. Error Flow (404 Page)
  'error-flow': {
    id: 'error-flow',
    variant: 'error-flow',
    theme: 'light',
    title: 'Tautan terputus, ini jalan keluarnya.',
    description: 'Alur visual mendeteksi tautan yang terputus dan menghubungkan kembali pengunjung ke rute yang tepat.',
    chipLabel: 'Ilustrasi',
    viewBox: '0 0 540 220',
    nodes: [
      { id: 'brokenlink', label: 'Tautan lama', icon: 'AlertCircle', x: 105, y: 110, role: 'input' },
      { id: 'destination', label: 'Halaman tepat', icon: 'CheckCircle2', x: 435, y: 110, role: 'output' },
    ],
    edges: [
      { id: 'e-broken-reconnect', from: 'brokenlink', to: 'destination', dots: 1, kind: 'failure', label: 'Tautan terputus, ini jalan keluarnya.' },
    ],
    steps: [
      { highlightNodes: ['brokenlink'], caption: 'Tautan yang diklik tidak lagi aktif' },
      { highlightNodes: ['destination'], caption: 'Sistem mencarikan halaman alternatif yang sesuai' },
    ],
  },

  // 7. About Flow
  'about-flow': {
    id: 'about-flow',
    variant: 'about-flow',
    theme: 'light',
    title: 'Empat tahap kerja terukur dan transparan',
    description: 'Proses kolaborasi dari audit gratis hingga pemeliharaan sistem jangka panjang.',
    chipLabel: 'Ilustrasi',
    viewBox: '0 0 540 220',
    nodes: [
      { id: 'audit', label: 'Audit gratis', icon: 'Search', x: 75, y: 100, role: 'input' },
      { id: 'design', label: 'Rancang & prototipe', icon: 'Layers', x: 195, y: 100, role: 'module' },
      { id: 'build', label: 'Bangun & uji', icon: 'Workflow', x: 325, y: 100, role: 'hub' },
      { id: 'release', label: 'Rilis & rawat', icon: 'CheckCircle2', x: 455, y: 100, role: 'output' },
    ],
    edges: [
      { id: 'e-step-1', from: 'audit', to: 'design', dots: 1, kind: 'normal' },
      { id: 'e-step-2', from: 'design', to: 'build', dots: 1, kind: 'normal' },
      { id: 'e-step-3', from: 'build', to: 'release', dots: 1, kind: 'normal' },
    ],
    steps: [
      { highlightNodes: ['audit'], caption: 'Audit alur kerja gratis 30 menit tanpa komitmen' },
      { highlightNodes: ['design'], caption: 'Rancang arsitektur sistem dan prototipe tampilan' },
      { highlightNodes: ['build'], caption: 'Bangun kode bersih dan uji reliabilitas otomatis' },
      { highlightNodes: ['release'], caption: 'Rilis produksi serta pemantauan rutin.' },
    ],
  },
};

export const ILLUSTRATIONS_EN: Record<string, IllustrationData> = {
  // 1. Workflow Automation Flow (EN)
  'workflow-flow': {
    id: 'workflow-flow',
    variant: 'workflow-flow',
    theme: 'light',
    title: 'Automated data flow between applications',
    description: 'Incoming data from forms and WhatsApp is organized by automated pipelines and distributed to Sheets, Calendar, Invoices, and Notifications.',
    chipLabel: 'Illustration',
    viewBox: '0 0 540 360',
    nodes: [
      { id: 'form', label: 'Web Form', icon: 'FileText', x: 75, y: 90, role: 'input' },
      { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageSquare', x: 75, y: 230, role: 'input' },
      { id: 'hub', label: 'Auto pipeline', icon: 'Workflow', x: 245, y: 160, role: 'hub' },
      { id: 'sheets', label: 'Google Sheets', icon: 'Sheet', x: 435, y: 65, role: 'output' },
      { id: 'calendar', label: 'Calendar', icon: 'Calendar', x: 435, y: 140, role: 'output' },
      { id: 'invoice', label: 'Invoicing', icon: 'Receipt', x: 435, y: 215, role: 'output' },
      { id: 'notify', label: 'Notification', icon: 'Bell', x: 435, y: 290, role: 'output' },
    ],
    edges: [
      { id: 'e-form-hub', from: 'form', to: 'hub', dots: 1, kind: 'normal' },
      { id: 'e-wa-hub', from: 'whatsapp', to: 'hub', dots: 1, kind: 'normal' },
      { id: 'e-hub-sheets', from: 'hub', to: 'sheets', dots: 1, kind: 'normal' },
      { id: 'e-hub-calendar', from: 'hub', to: 'calendar', dots: 1, kind: 'normal' },
      { id: 'e-hub-invoice', from: 'hub', to: 'invoice', dots: 1, kind: 'normal' },
      { id: 'e-hub-notify', from: 'hub', to: 'notify', dots: 0, kind: 'failure', label: 'Failure: team alerted' },
    ],
    steps: [
      { highlightNodes: ['form', 'whatsapp'], caption: 'Data enters via form or WhatsApp message' },
      { highlightNodes: ['hub'], caption: 'Pipeline validates and structures raw data' },
      { highlightNodes: ['sheets', 'calendar'], caption: 'Data is recorded to Sheets and calendar' },
      { highlightNodes: ['invoice'], caption: 'Invoice generated and dispatched' },
      { highlightNodes: ['notify'], caption: 'If any error occurs, team is alerted immediately.' },
    ],
  },

  // 2. AI Agent Flow (EN)
  'agent-flow': {
    id: 'agent-flow',
    variant: 'agent-flow',
    theme: 'dark',
    title: 'Intelligent AI Agent workflow',
    description: 'WhatsApp inquiries are processed autonomously by the Agent, interacting with calendar, database, CRM, and invoice tools with graceful human handoff.',
    chipLabel: 'Illustration',
    viewBox: '0 0 540 370',
    nodes: [
      { id: 'wa-in', label: 'WhatsApp Chat', icon: 'MessageSquare', x: 75, y: 160, role: 'input' },
      { id: 'agent-hub', label: 'AI Agent', icon: 'Bot', x: 235, y: 160, role: 'hub' },
      { id: 'calendar', label: 'Calendar', icon: 'Calendar', x: 435, y: 65, role: 'output' },
      { id: 'database', label: 'Database', icon: 'Database', x: 435, y: 140, role: 'output' },
      { id: 'crm', label: 'CRM', icon: 'Users', x: 435, y: 215, role: 'output' },
      { id: 'invoice', label: 'Invoice', icon: 'Receipt', x: 435, y: 290, role: 'output' },
      { id: 'staff', label: 'Human Staff', icon: 'User', x: 235, y: 295, role: 'branch' },
    ],
    edges: [
      { id: 'e-wain-agent', from: 'wa-in', to: 'agent-hub', dots: 1, kind: 'normal' },
      { id: 'e-agent-cal', from: 'agent-hub', to: 'calendar', dots: 1, kind: 'normal' },
      { id: 'e-agent-db', from: 'agent-hub', to: 'database', dots: 1, kind: 'normal' },
      { id: 'e-agent-crm', from: 'agent-hub', to: 'crm', dots: 1, kind: 'normal' },
      { id: 'e-agent-inv', from: 'agent-hub', to: 'invoice', dots: 1, kind: 'normal' },
      { id: 'e-agent-staff', from: 'agent-hub', to: 'staff', dots: 0, kind: 'branch', label: 'Handoff to human' },
    ],
    steps: [
      { highlightNodes: ['wa-in'], caption: 'Inbound chat received' },
      { highlightNodes: ['agent-hub'], caption: 'Agent interprets user intent' },
      { highlightNodes: ['agent-hub', 'calendar', 'database'], caption: 'Agent executes required tool calls' },
      { highlightNodes: ['crm', 'invoice'], caption: 'Agent updates CRM and dispatches invoice' },
      { highlightNodes: ['staff'], caption: 'Sensitive edge cases safely handed off to staff.' },
    ],
  },

  // 3. Website Flow (EN)
  'website-flow': {
    id: 'website-flow',
    variant: 'website-flow',
    theme: 'light',
    title: 'High-speed website conversion flow',
    description: 'Prospects land on an ultra-fast mobile page, trigger immediate action triggers, and connect directly to your communication channels.',
    chipLabel: 'Illustration',
    viewBox: '0 0 540 330',
    speedMeter: true,
    speedLabel: 'Speed illustration',
    nodes: [
      { id: 'visitor', label: 'Visitor', icon: 'User', x: 75, y: 160, role: 'input' },
      { id: 'fastpage', label: 'Fast page', icon: 'Smartphone', x: 220, y: 160, role: 'hub' },
      { id: 'ctabuttons', label: 'WhatsApp & Form', icon: 'MessageSquare', x: 375, y: 160, role: 'module' },
      { id: 'messagein', label: 'Lead received', icon: 'CheckCircle2', x: 475, y: 160, role: 'output' },
    ],
    edges: [
      { id: 'e-vis-page', from: 'visitor', to: 'fastpage', dots: 1, kind: 'normal' },
      { id: 'e-page-cta', from: 'fastpage', to: 'ctabuttons', dots: 1, kind: 'normal' },
      { id: 'e-cta-msg', from: 'ctabuttons', to: 'messagein', dots: 1, kind: 'normal' },
    ],
    steps: [
      { highlightNodes: ['visitor'], caption: 'Prospect opens landing page' },
      { highlightNodes: ['fastpage'], caption: 'Page loads instantly on mobile' },
      { highlightNodes: ['ctabuttons'], caption: 'Prospect taps WhatsApp or submits inquiry' },
      { highlightNodes: ['messagein'], caption: 'Inquiry arrives directly in your hands.' },
    ],
  },

  // 4. Software Flow (EN)
  'software-flow': {
    id: 'software-flow',
    variant: 'software-flow',
    theme: 'light',
    title: 'Custom modular software architecture',
    description: 'Staff data entry feeds integrated modules (Sales, Inventory, Reports) and flows into executive management dashboards.',
    chipLabel: 'Illustration',
    viewBox: '0 0 540 340',
    modules: [
      { id: 'mod-1', code: 'MODULE 01', title: 'Sales & POS', sub: 'Cashier & Invoicing' },
      { id: 'mod-2', code: 'MODULE 02', title: 'Inventory', sub: 'Stock & Tracking', accent: true },
      { id: 'mod-3', code: 'MODULE 03', title: 'Reporting', sub: 'P&L & Analytics' },
    ],
    nodes: [
      { id: 'staffinput', label: 'Staff input', icon: 'User', x: 70, y: 160, role: 'input' },
      { id: 'apphub', label: 'Application', icon: 'Layers', x: 245, y: 160, role: 'hub' },
      { id: 'dashboard', label: 'Owner dashboard', icon: 'LayoutDashboard', x: 440, y: 160, role: 'output' },
    ],
    edges: [
      { id: 'e-staff-app', from: 'staffinput', to: 'apphub', dots: 1, kind: 'normal' },
      { id: 'e-app-dash', from: 'apphub', to: 'dashboard', dots: 1, kind: 'normal' },
    ],
    steps: [
      { highlightNodes: ['staffinput'], caption: 'Staff enters transaction data' },
      { highlightNodes: ['apphub'], caption: 'Data is synced into a unified database' },
      { highlightNodes: ['apphub'], caption: 'Modules seamlessly communicate' },
      { highlightNodes: ['dashboard'], caption: 'Business owner reviews real-time reports.' },
    ],
  },

  // 5. Area Flow (EN)
  'area-flow': {
    id: 'area-flow',
    variant: 'area-flow',
    theme: 'light',
    title: 'Technology service coverage across BSD & surrounding areas',
    description: 'The BSD operational hub connects directly to key regional service zones across South Tangerang, Pamulang, Jurang Mangu, and Lebak Bulus.',
    chipLabel: 'Illustration',
    schematicNotice: 'Schematic service illustration, not a map',
    viewBox: '0 0 540 340',
    nodes: [
      { id: 'bsd', label: 'BSD Hub', icon: 'MapPin', x: 270, y: 160, role: 'hub' },
      { id: 'tangerang-selatan', label: 'South Tangerang', icon: 'MapPin', x: 95, y: 85, role: 'output' },
      { id: 'pamulang', label: 'Pamulang', icon: 'MapPin', x: 445, y: 85, role: 'output' },
      { id: 'jurang-mangu', label: 'Jurang Mangu', icon: 'MapPin', x: 95, y: 245, role: 'output' },
      { id: 'lebak-bulus', label: 'Lebak Bulus', icon: 'MapPin', x: 445, y: 245, role: 'output' },
    ],
    edges: [
      { id: 'e-bsd-tangsel', from: 'bsd', to: 'tangerang-selatan', dots: 1, kind: 'normal' },
      { id: 'e-bsd-pamulang', from: 'bsd', to: 'pamulang', dots: 1, kind: 'normal' },
      { id: 'e-bsd-jm', from: 'bsd', to: 'jurang-mangu', dots: 1, kind: 'normal' },
      { id: 'e-bsd-lb', from: 'bsd', to: 'lebak-bulus', dots: 1, kind: 'normal' },
    ],
    steps: [
      { highlightNodes: ['bsd'], caption: 'Core development and architecture hub in BSD' },
      { highlightNodes: ['tangerang-selatan', 'pamulang'], caption: 'Direct in-person consultation across Serpong & Pamulang' },
      { highlightNodes: ['jurang-mangu', 'lebak-bulus'], caption: 'Swift commuter transit linking Bintaro and South Jakarta' },
      { highlightNodes: ['bsd', 'tangerang-selatan', 'pamulang', 'jurang-mangu', 'lebak-bulus'], caption: 'Unified digital systems across Greater Jakarta.' },
    ],
  },

  // 6. Error Flow (EN)
  'error-flow': {
    id: 'error-flow',
    variant: 'error-flow',
    theme: 'light',
    title: 'Broken link, here is the way forward.',
    description: 'Visual flow detecting disconnected URL paths and reconnecting visitors to verified destinations.',
    chipLabel: 'Illustration',
    viewBox: '0 0 540 220',
    nodes: [
      { id: 'brokenlink', label: 'Broken link', icon: 'AlertCircle', x: 105, y: 110, role: 'input' },
      { id: 'destination', label: 'Right destination', icon: 'CheckCircle2', x: 435, y: 110, role: 'output' },
    ],
    edges: [
      { id: 'e-broken-reconnect', from: 'brokenlink', to: 'destination', dots: 1, kind: 'failure', label: 'Broken link, here is the way forward.' },
    ],
    steps: [
      { highlightNodes: ['brokenlink'], caption: 'The requested link is no longer available' },
      { highlightNodes: ['destination'], caption: 'Intelligent suggestion finds the closest relevant page' },
    ],
  },

  // 7. About Flow (EN)
  'about-flow': {
    id: 'about-flow',
    variant: 'about-flow',
    theme: 'light',
    title: 'Four transparent phases from start to launch',
    description: 'Our collaborative delivery process from free operational audit to long-term care.',
    chipLabel: 'Illustration',
    viewBox: '0 0 540 220',
    nodes: [
      { id: 'audit', label: 'Free audit', icon: 'Search', x: 75, y: 100, role: 'input' },
      { id: 'design', label: 'Plan & prototype', icon: 'Layers', x: 195, y: 100, role: 'module' },
      { id: 'build', label: 'Build & verify', icon: 'Workflow', x: 325, y: 100, role: 'hub' },
      { id: 'release', label: 'Ship & maintain', icon: 'CheckCircle2', x: 455, y: 100, role: 'output' },
    ],
    edges: [
      { id: 'e-step-1', from: 'audit', to: 'design', dots: 1, kind: 'normal' },
      { id: 'e-step-2', from: 'design', to: 'build', dots: 1, kind: 'normal' },
      { id: 'e-step-3', from: 'build', to: 'release', dots: 1, kind: 'normal' },
    ],
    steps: [
      { highlightNodes: ['audit'], caption: 'Free 30-minute operational workflow audit with no obligations' },
      { highlightNodes: ['design'], caption: 'Architecture blueprint and interactive prototype review' },
      { highlightNodes: ['build'], caption: 'Clean engineering, API integration, and automated testing' },
      { highlightNodes: ['release'], caption: 'Production launch and active ongoing maintenance.' },
    ],
  },
};

/**
 * Helper to retrieve illustration data by ID and locale.
 */
export function getIllustrationData(
  id: string,
  locale: 'id' | 'en' = 'id'
): IllustrationData | undefined {
  const dictionary = locale === 'en' ? ILLUSTRATIONS_EN : ILLUSTRATIONS_ID;
  return dictionary[id] || ILLUSTRATIONS_ID[id];
}
