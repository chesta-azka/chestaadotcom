import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function initFirebaseAdmin() {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (projectId && clientEmail && privateKey) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      try {
        initializeApp();
      } catch (e) {
        // Ignore initialization error in local preview without credentials
      }
    }
  }
}

initFirebaseAdmin();

export function getAdminDb() {
  try {
    return getFirestore();
  } catch (e) {
    return null;
  }
}

export const adminDb = getAdminDb();

// Collection 1: pseo_targets
export async function getPseoTargets() {
  const db = getAdminDb();
  if (!db) {
    return {
      industries: ['klinik-kecantikan', 'developer-properti', 'f&b-franchise', 'logistik-ekspedisi'],
      cities: ['jakarta-selatan', 'surabaya', 'bandung', 'bali', 'medan']
    };
  }

  try {
    const snapshot = await db.collection('pseo_targets').where('active_status', '==', true).get();
    const targets = snapshot.docs.map(doc => doc.data());
    
    const industries = Array.from(new Set(targets.filter(t => t.type === 'industry').map(t => t.slug)));
    const cities = Array.from(new Set(targets.filter(t => t.type === 'city').map(t => t.slug)));

    return {
      industries: industries.length > 0 ? industries : ['klinik-kecantikan', 'developer-properti'],
      cities: cities.length > 0 ? cities : ['jakarta-selatan', 'surabaya']
    };
  } catch (err) {
    return {
      industries: ['klinik-kecantikan', 'developer-properti', 'f&b-franchise', 'logistik-ekspedisi'],
      cities: ['jakarta-selatan', 'surabaya', 'bandung', 'bali', 'medan']
    };
  }
}

// Collection 2: tech_glossary
export async function getGlossaryTerm(slug: string) {
  const db = getAdminDb();
  if (!db) {
    return {
      slug,
      term_name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      simple_definition: `${slug.replace(/-/g, ' ')} adalah teknologi enterprise untuk efisiensi korporat otonom.`,
      b2b_pitch: "Jujurly, implementasi teknologi ini bersama Chestaa akan memangkas biaya operasional dan melipatgandakan ROAS bisnis Anda.",
      seo_title: `${slug.replace(/-/g, ' ').toUpperCase()} - Definisi & Penerapan Bisnis | Chestaa`
    };
  }

  try {
    const docRef = await db.collection('tech_glossary').doc(slug).get();
    if (docRef.exists) {
      return docRef.data();
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function getAllGlossarySlugs() {
  const db = getAdminDb();
  if (!db) {
    return [
      'machine-learning', 'roas', 'nextjs-15', 'seo', 'aeo', 
      'cloud-computing', 'cybersecurity', 'pwa', 'automation', 'enterprise-architecture'
    ];
  }

  try {
    const snapshot = await db.collection('tech_glossary').get();
    return snapshot.docs.map(doc => doc.id);
  } catch (err) {
    return [
      'machine-learning', 'roas', 'nextjs-15', 'seo', 'aeo', 
      'cloud-computing', 'cybersecurity', 'pwa', 'automation', 'enterprise-architecture'
    ];
  }
}

// Collection 3: executive_insights
export async function getInsightArticle(slug: string) {
  const db = getAdminDb();
  if (!db) {
    return {
      slug,
      title: `Analisis Eksklusif: ${slug.replace(/-/g, ' ').toUpperCase()} untuk Korporat`,
      subtitle: 'Studi kasus nyata transformasi digital dan sistem otonom enterprise.',
      content: [
        'Jujurly, tantangan operasional korporat modern menuntut transisi ke infrastruktur teknologi otonom.',
        'Tim arsitek Chestaa merancang solusi end-to-end untuk memastikan efisiensi finansial dan pertumbuhan ROAS maksimal.'
      ],
      author: 'Chesta Azka',
      published_date: '2026-09-28',
      cover_image_url: 'https://picsum.photos/seed/chestaa-insight/1200/630'
    };
  }

  try {
    const docRef = await db.collection('executive_insights').doc(slug).get();
    if (docRef.exists) {
      return docRef.data();
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function getAllInsightSlugs() {
  const db = getAdminDb();
  if (!db) {
    return [
      'cara-pangkas-biaya-operasional-dengan-ai',
      'mengapa-website-lambat-bakar-duit-iklan'
    ];
  }

  try {
    const snapshot = await db.collection('executive_insights').get();
    return snapshot.docs.map(doc => doc.id);
  } catch (err) {
    return [
      'cara-pangkas-biaya-operasional-dengan-ai',
      'mengapa-website-lambat-bakar-duit-iklan'
    ];
  }
}
