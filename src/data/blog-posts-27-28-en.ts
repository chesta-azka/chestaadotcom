import { SITE_IMAGES } from '../config/images';
import type { RawBlogPostInput } from './blog-posts';

export const BLOG_POSTS_27_28_EN_RAW: RawBlogPostInput[] = [
  // ==========================================================================
  // ARTICLE 27 (EN): Landing Pages for Meta and Google Ads: High-Conversion Structure
  // Author: Zeeshan
  // Cluster: website-dan-performa (Pillar: why-slow-landing-pages-waste-ad-spend)
  // ==========================================================================
  {
    slug: 'landing-pages-meta-google-ads-high-conversion',
    alternateSlug: 'landing-page-iklan-meta-google-konversi-tinggi',
    locale: 'en',
    clusterId: 'website-dan-performa',
    title: 'Landing Pages for Meta and Google Ads: High-Conversion Structure Without Wasting Budget',
    seoTitle: 'High-Conversion Meta & Google Ads Landing Pages | CHESTA',
    excerpt:
      'Guide to structuring dedicated landing pages for Meta Ads and Google Ads: message match, the 6-block page anatomy, privacy-safe conversion tracking, and a BSD clinic scenario.',
    metaDescription:
      'Build high-converting Meta and Google Ads landing pages in South Tangerang: message match, real proof, fast mobile load, and accurate WhatsApp conversion tracking.',
    category: 'Website & Performance',
    categorySlug: 'website-dan-performa',
    tags: [
      'Landing Page',
      'Meta Ads',
      'Google Ads',
      'Conversion Optimization',
      'BSD Clinic',
      'Fast Website',
    ],
    author: 'zeeshan',
    date: '2026-11-03',
    updatedAt: '2026-11-03',
    featured: false,
    draft: false,
    coverImageKey: 'clusterWebsitePerformance',
    cover: SITE_IMAGES.clusterWebsitePerformance.src,
    coverAlt: SITE_IMAGES.clusterWebsitePerformance.altEn || SITE_IMAGES.clusterWebsitePerformance.alt,
    beforeIntroSnapshot:
      'Many business owners blame ad algorithms when their campaign budget runs out without generating incoming WhatsApp leads. Yet the real bottleneck is frequently not the ad image, but a slow, unfocused destination page that fails to match the promise made in the ad.',
    founderNote: {
      author: 'zeeshan',
      title: 'Operations Note · Ads Only Buy the Click, the Landing Page Wins the Customer',
      text: 'When you pay Rp5,000 per click on Google Ads or Instagram, you only buy three seconds of a visitor attention. If your destination page greets them with ten unrelated navigation links, that ad spend evaporates without a trace.',
    },
    content: [
      {
        type: 'ul',
        title: 'Key takeaways',
        items: [
          'A high-converting ad landing page must preserve strict message match between the wording in the ad creative and the primary headline on the first screen.',
          'Unlike a general company homepage built with broad navigation menus, a dedicated ad landing page focuses visitor attention on a single specific offer and one primary call to action.',
          'Sub-two-second mobile load speed paired with verified conversion event tracking determines whether your cost per lead stays profitable.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A prospective patient in Serpong sees an Instagram ad from a dental clinic offering a scaling and polishing package for Rp250,000. Interested, she taps "Learn More." Unfortunately, the link drops her onto the clinic general homepage filled with company history, a directory of 20 specialist doctors, and community event news. Unable to find the scaling promo quickly, she closes her phone browser.',
      },
      {
        type: 'paragraph',
        text: 'This everyday scenario explains why millions of rupiah in ad spend vanish without producing leads. As we detailed in our pillar guide on [why slow landing pages waste your ad spend](/en/blog/why-slow-landing-pages-waste-ad-spend), both mobile load speed and structural clarity after the click dictate your return on ad spend.',
      },
      {
        type: 'paragraph',
        text: 'In this practical guide, we break down the architecture of a dedicated paid-ad landing page, compare visitor intent between Meta Ads and Google Search Ads, and provide a pre-launch checklist before you turn on your campaign budget.',
      },
      {
        type: 'h2',
        id: 'differences-between-an-ad-landing-page-and-a-standard-website-homepage',
        text: 'Differences between an ad landing page and a standard website homepage',
      },
      {
        type: 'paragraph',
        text: 'An ad landing page is a standalone web page engineered specifically to receive paid campaign traffic with one conversion goal, whereas a standard homepage is a general directory serving multiple visitor intents.',
      },
      {
        type: 'paragraph',
        text: 'A company homepage acts like the main lobby of an office building. It displays signposts pointing toward recruitment, product catalogs, founder bios, and blog archives. Organic visitors who type your brand name need that complete navigation map to explore your company.',
      },
      {
        type: 'paragraph',
        text: 'By contrast, visitors who click a paid ad arrive because of one specific promise. If you leave a top navigation bar with ten outbound links on your ad destination page, visitor attention splits. Every extra link competing with your primary call-to-action button lowers your conversion rate.',
      },
      {
        type: 'table',
        caption: 'Architectural comparison between a general website homepage and a dedicated ad landing page',
        headers: ['Page Dimension', 'General Website Homepage', 'Dedicated Ad Landing Page'],
        rows: [
          [
            'Primary Purpose',
            'Introduce company profile and all service categories',
            'Convert ad clicks into one specific action (WhatsApp chat or form)',
          ],
          [
            'Top Navigation Bar',
            'Full menu (About, Services, Blog, Careers, Contact)',
            'Removed or simplified to brand wordmark and one action button',
          ],
          [
            'Headline Message',
            'Broad company positioning for all market segments',
            'Directly mirrors the exact offer promised in the ad creative',
          ],
          [
            'Number of Action Choices',
            'Multiple links pointing to various internal pages',
            'One consistent primary conversion button from top to bottom',
          ],
          [
            'Success Metric',
            'Session duration and pages viewed per visit',
            'Conversion Rate (CVR) and Cost per Lead (CPL)',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Separating campaign landing pages from your main homepage also lets you test offers and headlines rapidly without disrupting your core website for returning clients.',
      },
      {
        type: 'h2',
        id: 'adapting-the-page-to-traffic-intent-meta-ads-vs-google-ads',
        text: 'Adapting the page to traffic intent: Meta Ads vs Google Ads',
      },
      {
        type: 'paragraph',
        text: 'Visitors from Meta Ads (Instagram and Facebook) click out of visual curiosity while scrolling social feeds and need benefit education, whereas Google Search Ads visitors arrive with urgent problem-solving intent and need immediate pricing and availability.',
      },
      {
        type: 'paragraph',
        text: 'Understanding the psychological difference between these two traffic sources prevents you from sending both audiences to the exact same page layout. An Instagram user was not actively looking for your service five seconds ago; your ad interrupted their social feed.',
      },
      {
        type: 'paragraph',
        text: 'Consequently, a Meta Ads landing page must clarify the problem first, showcase visual proof of real outcomes, and explain why the offer matters now. Conversely, a Google user typing "urgent AC repair BSD" already knows their AC is leaking and wants immediate dispatch.',
      },
      {
        type: 'ol',
        title: 'Content adaptation rules by paid traffic source',
        items: [
          'Google Search Ads Traffic (High Intent): State your service area coverage right in the top headline, display transparent starting prices, show response times, and place a direct WhatsApp button above the fold.',
          'Meta Ads Traffic (Discovery Intent): Lead with visual proof matching the video or carousel ad, outline three concrete customer pain points solved, display verified local reviews, and invite a low-friction consultation.',
          'Retargeting Campaign Traffic (Warm Audience): Focus the page on overcoming objections, comparing package value, highlighting service warranties, and answering technical FAQs.',
        ],
      },
      {
        type: 'h2',
        id: 'anatomy-of-a-six-section-high-converting-landing-page',
        text: 'Anatomy of a six-section high-converting landing page',
      },
      {
        type: 'paragraph',
        text: 'An effective ad landing page is built from six sequential blocks: a clear opening hero section, problem-and-solution framing, transparent package pricing, real project proof, objection-handling FAQs, and a closing call-to-action block.',
      },
      {
        type: 'paragraph',
        text: 'This six-block sequence follows the natural decision flow of a buyer evaluating a service provider online:',
      },
      {
        type: 'ol',
        title: 'Six mandatory blocks on a service business ad landing page',
        items: [
          'First Screen (Above the Fold): Contains a headline repeating the ad promise, a subheadline explaining the concrete benefit, one authentic visual or schematic illustration, and an action button visible without scrolling.',
          'Specific Problem & Solution Block: Names three real operational headaches the customer faces and explains how your service resolves them step by step.',
          'Service Scope & Starting Price Block: Displays a clear package table or starting price anchor to qualify leads who match your budget range.',
          'Social Proof & Case Study Block: Shows real project outcomes, verified Google Maps customer reviews, or concrete before-and-after workflows without invented claims.',
          'Objection-Handling FAQ Block: Answers the 5 most common questions regarding turnaround time, warranty terms, payment stages, and service area coverage.',
          'Closing Conversion Block (Final CTA): Restates the core offer at the bottom of the page with either a short 3-field form or a WhatsApp button pre-filled with a specific inquiry message.',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'The Conversion Cost of Bloated Intake Forms',
        text: 'Never ask mobile visitors to fill out ten form fields—such as full street address, ID number, and company history—on the first step. Every non-essential field cuts form completion rates sharply.',
      },
      {
        type: 'h2',
        id: 'message-match-and-loading-speed-on-mobile-networks',
        text: 'Message match and loading speed on mobile networks',
      },
      {
        type: 'paragraph',
        text: 'Message match and first-screen load speed (Largest Contentful Paint) directly govern your ad quality score on both Google and Meta, determining how much you pay per click in every auction.',
      },
      {
        type: 'paragraph',
        text: 'Advertising platforms evaluate landing page experience using automated crawlers. If your ad headline says "Kids English Course in Pamulang," ensure that exact phrase appears in the `<h1>` and `<title>` of the destination page. Mismatched copy lowers your Google Ads Quality Score.',
      },
      {
        type: 'paragraph',
        text: 'Beyond text alignment, more than 80 percent of social ad clicks open inside an in-app mobile browser with tighter memory limits than a desktop browser.',
      },
      {
        type: 'paragraph',
        text: 'If your landing page loads 4 megabytes of unoptimized images and heavy animation scripts, the user stares at a blank white screen for five seconds and taps the back button. Read our technical breakdown of these speed metrics in our guide to [Core Web Vitals for business owners](/en/blog/core-web-vitals-business-owners-lcp-inp-cls) and our [high-converting service landing page checklist](/en/blog/high-converting-landing-page-checklist-service-business).',
      },
      {
        type: 'h2',
        id: 'example-scenario-physiotherapy-clinic-ad-campaign-in-bsd',
        text: 'Example scenario: physiotherapy clinic ad campaign in BSD',
      },
      {
        type: 'paragraph',
        text: 'As a concrete scenario in South Tangerang, a sports injury physiotherapy clinic in BSD City restructured its ad destination page to fix high patient acquisition costs.',
      },
      {
        type: 'paragraph',
        text: 'In the prior month campaign, the clinic sent all Google and Instagram ad clicks to its general homepage covering every medical department. Out of 500 ad clicks costing Rp2,500,000, only 11 visitors messaged on WhatsApp, resulting in a cost per lead of Rp227,000.',
      },
      {
        type: 'paragraph',
        text: 'The team rebuilt the campaign funnel around a dedicated landing page:',
      },
      {
        type: 'ol',
        title: 'Landing page optimization steps for the BSD physiotherapy clinic',
        items: [
          'Created a dedicated route `/sports-physiotherapy-bsd` with distractions and unrelated department links removed.',
          'Wrote a direct headline matching the ad: "Knee & Shoulder Sports Physiotherapy in BSD City with Certified Therapists."',
          'Displayed the 45-minute therapy session breakdown, transparent first-visit pricing, and clinic map location near the Serpong toll exit.',
          'Configured a WhatsApp button with a pre-filled message: "Hello Admin, I saw the knee physiotherapy page and want to check available slots this week."',
          'Compressed image assets so mobile load time dropped from 5.4 seconds to 1.2 seconds.',
        ],
      },
      {
        type: 'paragraph',
        text: 'With this focused page structure, visitors immediately understood the treatment scope and price within a single scroll. You can explore our high-speed page engineering on our [website development service](/en/services/web-development) page, review our [clinic WhatsApp concierge case study](/en/case-studies/wa-concierge-klinik), and check our coverage in [BSD City](/en/area/bsd).',
      },
      {
        type: 'h2',
        id: 'accurate-and-privacy-compliant-conversion-tracking',
        text: 'Accurate and privacy-compliant conversion tracking',
      },
      {
        type: 'paragraph',
        text: 'Conversion tracking on an ad landing page tells ad platforms which clicks produced real business value by combining browser event triggers with privacy-compliant server signals.',
      },
      {
        type: 'paragraph',
        text: 'A frequent mistake among advertisers is optimizing campaigns around raw link clicks or page views. The ad algorithm then hunts for users who tap links accidentally but never message your WhatsApp team.',
      },
      {
        type: 'paragraph',
        text: 'Configure your conversion event to fire only on high-intent actions, such as a validated form submission or a WhatsApp button click after the visitor has engaged with the pricing section.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Protecting Personal Data in Ad Pixels',
        text: 'Never pass sensitive medical complaints or raw customer identity fields inside URL query strings or Meta Pixel / Google Tag event parameters. Send only anonymized event identifiers in compliance with data privacy laws.',
      },
      {
        type: 'h2',
        id: 'official-reference-sources',
        text: 'Official reference sources',
      },
      {
        type: 'paragraph',
        text: 'The following official ad platform documentation and web performance guides serve as primary references for building ad landing pages; check the official documentation for current figures and terms regarding ad policies and tracking parameters:',
      },
      {
        type: 'ul',
        items: [
          '[Google Ads Help Center: Landing Page Experience Guide](https://support.google.com/google-ads/answer/2404197) explains how Google evaluates landing page relevance, transparency, and speed for Quality Score; check the official documentation for current figures and terms.',
          '[Meta Business Help Center: Ad Destination Best Practices](https://www.facebook.com/business/help) covers mobile browser load speed recommendations and destination policy compliance; check the official documentation for current figures and terms.',
          '[Web.dev Documentation: Why Speed Matters for Conversion](https://web.dev/articles/why-speed-matters) details the relationship between mobile load milliseconds and visitor bounce rates; check the official documentation for current figures and terms.',
          '[Indonesia Personal Data Protection Law No. 27 of 2022 at JDIH BPK RI](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) governs user consent and personal data protection on digital lead forms; check the official documentation for current figures and terms.',
        ],
      },
    ],
    conclusion: [
      'A high-converting landing page is not a page overloaded with flashy animations; it is a fast, honest, and focused page that fulfills the exact promise made in your ad.',
      'Give every paid ad campaign a dedicated destination page with tight message match, transparent service details, sub-two-second mobile speed, and clean conversion tracking.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Build Fast, High-Converting Ad Landing Pages with CHESTAADOTCOM',
      description:
        'We design and engineer dedicated Meta Ads and Google Ads landing pages with green Core Web Vitals, clear copywriting, and WhatsApp tracking.',
      href: '/en/services/web-development',
      label: 'Consult on Ad Landing Pages',
    },
    faq: [
      {
        question: 'Do I need a separate landing page for each distinct service I advertise?',
        answer:
          'Yes. If you run separate ads for canopy installation and bathroom renovation, send each ad to its own dedicated page so visitors immediately see matching photos, scope, and pricing.',
      },
      {
        question: 'Which converts better for local service businesses: a lead form or a direct WhatsApp button?',
        answer:
          'For consumer and local services, a WhatsApp button with a pre-filled inquiry message usually generates higher contact rates. For B2B or high-ticket custom projects, a concise 3-field form helps pre-qualify serious buyers.',
      },
      {
        question: 'What is the maximum safe loading time for an ad landing page on mobile?',
        answer:
          'First-screen content (Largest Contentful Paint) should load in under 2.5 seconds on a 4G mobile connection, and ideally under 1.8 seconds to prevent click abandonment.',
      },
      {
        question: 'Why does Meta Ads Manager show hundreds of link clicks while zero WhatsApp chats arrive?',
        answer:
          'The three most common culprits are slow page loading inside the Instagram in-app browser, a mismatch between the ad offer and the page headline, or a broken WhatsApp redirect link.',
      },
      {
        question: 'Will showing starting prices on my landing page scare away potential leads?',
        answer:
          'No—transparent starting prices ("starting from") build immediate trust and filter out inquiries that do not match your market segment, saving your admin team hours of unproductive chatting.',
      },
      {
        question: 'Where can I look up technical terms like conversion rate, bounce rate, and LCP?',
        answer:
          'Visit our technology glossary at /en/glossary for straightforward definitions of digital marketing and web performance metrics.',
      },
    ],
    relatedSlugs: [
      'why-slow-landing-pages-waste-ad-spend',
      'high-converting-landing-page-checklist-service-business',
      'core-web-vitals-business-owners-lcp-inp-cls',
    ],
  },

  // ==========================================================================
  // ARTICLE 28 (EN): Core Web Vitals for Business Owners: LCP, INP, and CLS
  // Author: Chesta Azka
  // Cluster: website-dan-performa (Pillar: why-slow-landing-pages-waste-ad-spend)
  // ==========================================================================
  {
    slug: 'core-web-vitals-business-owners-lcp-inp-cls',
    alternateSlug: 'core-web-vitals-pemilik-bisnis-lcp-inp-cls',
    locale: 'en',
    clusterId: 'website-dan-performa',
    title: 'Core Web Vitals for Business Owners: Understanding LCP, INP, and CLS Without Technical Jargon',
    seoTitle: 'Core Web Vitals Guide: LCP, INP & CLS for Business | CHESTA',
    excerpt:
      'Plain-English guide to Core Web Vitals (LCP, INP, CLS) for business owners: what each metric means for customer comfort, Google score thresholds, and a Serpong furniture store scenario.',
    metaDescription:
      'Understand Core Web Vitals (LCP, INP, and CLS) for business owners without jargon: impact on Google SEO rankings, sales conversions, and how to fix slow pages.',
    category: 'Website & Performance',
    categorySlug: 'website-dan-performa',
    tags: [
      'Core Web Vitals',
      'LCP',
      'INP',
      'CLS',
      'Website Speed',
      'Technical SEO',
    ],
    author: 'chesta',
    date: '2026-11-03',
    updatedAt: '2026-11-03',
    featured: false,
    draft: false,
    coverImageKey: 'clusterWebsitePerformance',
    cover: SITE_IMAGES.clusterWebsitePerformance.src,
    coverAlt: SITE_IMAGES.clusterWebsitePerformance.altEn || SITE_IMAGES.clusterWebsitePerformance.alt,
    beforeIntroSnapshot:
      'When a website audit report flashes red acronyms like LCP, INP, and CLS, many business owners tune out and assume it is purely a programmer problem. In truth, those three metrics measure whether your digital storefront feels welcoming or frustrates mobile buyers into leaving.',
    founderNote: {
      author: 'chesta',
      title: 'Architecture Note · Core Web Vitals Measure the Courtesy of Your Digital Storefront',
      text: 'Picture a customer walking into your physical shop: LCP is how fast the lights turn on, INP is how quickly a staff member responds when spoken to, and CLS is making sure the chair a customer is about to sit on does not suddenly slide away.',
    },
    content: [
      {
        type: 'ul',
        title: 'Key takeaways',
        items: [
          'Core Web Vitals are Google three official metrics measuring real user experience across first-screen loading speed (LCP), button tap responsiveness (INP), and visual layout stability (CLS).',
          'Poor scores on any of these three metrics hurt your business twice: frustrating mobile visitors while weakening your competitiveness in Google organic search results.',
          'The highest-impact fixes include compressing hero images into modern formats, removing bloated third-party tracking scripts, and locking explicit width and height dimensions on all media.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Have you ever opened a product catalog on your phone, reached with your thumb to tap "Order Now," and right at that millisecond a late-loading promo banner pushed the button down the screen? Instead of ordering, you accidentally tapped an ad and got redirected. That annoying layout jump is measured mathematically by modern search engines.',
      },
      {
        type: 'paragraph',
        text: 'Google no longer evaluates a business web page solely by keyword density. As covered in our pillar article on [why slow landing pages waste your ad spend](/en/blog/why-slow-landing-pages-waste-ad-spend), the physical responsiveness of your page on a mobile screen directly impacts sales conversion.',
      },
      {
        type: 'paragraph',
        text: 'In this guide, we translate all three Core Web Vitals metrics into everyday business terms, review the healthy score thresholds, and outline the exact fixes to request from your web development team.',
      },
      {
        type: 'h2',
        id: 'what-core-web-vitals-are-and-why-they-matter-for-business-revenue',
        text: 'What Core Web Vitals are and why they matter for business revenue',
      },
      {
        type: 'paragraph',
        text: 'Core Web Vitals are a set of standardized metrics from Google that quantify real-world user experience on a web page across visual loading speed, interactive responsiveness, and layout stability on actual visitor devices.',
      },
      {
        type: 'paragraph',
        text: 'For a business owner, these metrics matter for two concrete financial reasons. First, Google incorporates Core Web Vitals into its page experience ranking signals. When two local competitors publish equally helpful content, the site with faster, more stable technical performance holds a ranking advantage.',
      },
      {
        type: 'paragraph',
        text: 'Second, mobile internet users have very little patience for sluggish interfaces. A page that freezes when tapped makes a company look unreliable before the customer even sends a message.',
      },
      {
        type: 'table',
        caption: 'Summary of the three Core Web Vitals metrics and their official Google thresholds',
        headers: ['Metric Name', 'What It Measures on the Customer Screen', 'Good Target Threshold', 'Poor Score (Needs Fix)'],
        rows: [
          [
            'LCP (Largest Contentful Paint)',
            'How fast the main hero image or headline appears on the first screen',
            '2.5 seconds or less',
            'Over 4.0 seconds',
          ],
          [
            'INP (Interaction to Next Paint)',
            'How fast the page responds visually when a user taps a button or menu',
            '200 milliseconds or less',
            'Over 500 milliseconds',
          ],
          [
            'CLS (Cumulative Layout Shift)',
            'Visual stability ensuring text and buttons do not jump unexpectedly',
            '0.1 score or less',
            'Over 0.25 score',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Google evaluates these thresholds at the 75th percentile of real mobile and desktop visits, meaning at least 75 percent of your visitors must experience performance inside the green target range.',
      },
      {
        type: 'h2',
        id: 'understanding-lcp-how-fast-your-main-storefront-window-opens',
        text: 'Understanding LCP: how fast your main storefront window opens',
      },
      {
        type: 'paragraph',
        text: 'Largest Contentful Paint (LCP) measures the elapsed time from when a user clicks your link until the largest visual element on the first screen—such as your primary product photo or main headline—is fully rendered.',
      },
      {
        type: 'paragraph',
        text: 'Visitors do not care whether your footer copyright text has finished loading in the first second. They judge whether the page is working by how quickly the primary content right in front of their eyes appears.',
      },
      {
        type: 'paragraph',
        text: 'The most common cause of a slow LCP score on local business websites is uploading raw camera photos (such as a 5 MB PNG file) as the hero banner, combined with slow shared hosting that takes over a second just to begin responding (high Time to First Byte).',
      },
      {
        type: 'ol',
        title: 'Three practical steps to bring LCP under 2.5 seconds',
        items: [
          'Convert Hero Images to WebP or AVIF: Compress all first-screen photos so each file stays under 150 KB while preserving crisp detail on mobile screens.',
          'Never Lazy-Load the Primary Hero Image: Apply `fetchpriority="high"` and `loading="eager"` to the main above-the-fold visual so the browser downloads it immediately.',
          'Serve Static Assets via a Content Delivery Network (CDN): Deliver images, fonts, and stylesheets from edge servers located close to your customers in Indonesia.',
        ],
      },
      {
        type: 'h2',
        id: 'understanding-inp-how-responsive-buttons-feel-when-tapped',
        text: 'Understanding INP: how responsive buttons feel when tapped',
      },
      {
        type: 'paragraph',
        text: 'Interaction to Next Paint (INP) measures the delay between when a customer taps an interactive control—such as a mobile menu button, product variant selector, or FAQ accordion—and when the screen visually updates in response.',
      },
      {
        type: 'paragraph',
        text: 'INP replaced the older First Input Delay (FID) metric because INP evaluates every tap and click across the entire visit, not just the very first interaction. If a shopper taps an "Add to Order" button and the screen freezes for a full second before showing a confirmation badge, the page suffers from poor INP.',
      },
      {
        type: 'paragraph',
        text: 'The main culprit behind poor INP is not image file size, but excessive JavaScript blocking the browser main thread on the user phone. Stacking five ad trackers, heavy floating chat widgets, and unoptimized animation libraries causes buttons to lag when touched.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'The Hidden Cost of Stacking Third-Party Widgets',
        text: 'Every external widget you add—such as spin-the-wheel popups, heavy countdown timers, or duplicate analytics trackers—forces the visitor phone processor to execute extra JavaScript that delays WhatsApp button taps.',
      },
      {
        type: 'h2',
        id: 'understanding-cls-preventing-layout-jumps-that-cause-misclicks',
        text: 'Understanding CLS: preventing layout jumps that cause misclicks',
      },
      {
        type: 'paragraph',
        text: 'Cumulative Layout Shift (CLS) quantifies how much visible text and buttons shift unexpectedly while the page loads, preventing frustrating misclicks on mobile screens.',
      },
      {
        type: 'paragraph',
        text: 'Have you ever started reading a pricing paragraph, only for an image above it to finish downloading late and push the text down out of view? That unexpected movement is penalized as layout shift.',
      },
      {
        type: 'paragraph',
        text: 'Layout shifts happen when developers omit explicit `width` and `height` attributes on image tags or dynamic embeds. Without reserved dimensions, the browser draws text at the top of the screen first and then shoves everything downward once the image file arrives.',
      },
      {
        type: 'paragraph',
        text: 'The engineering fix is straightforward: lock explicit aspect-ratio dimensions on every image, video, and SVG container in the initial HTML, and configure web fonts with metric-matched fallback fonts so text lines never reflow during loading.',
      },
      {
        type: 'h2',
        id: 'example-scenario-fixing-a-furniture-catalog-site-in-serpong',
        text: 'Example scenario: fixing a furniture catalog site in Serpong',
      },
      {
        type: 'paragraph',
        text: 'As a real-world local scenario, a custom wood furniture showroom in Serpong, South Tangerang noticed that mobile visitors were abandoning its online dining table catalog before tapping the consultation button.',
      },
      {
        type: 'paragraph',
        text: 'A performance audit revealed an LCP of 6.2 seconds, an INP of 480 milliseconds, and a CLS of 0.38. The page loaded 24 uncompressed studio photos without width or height attributes and relied on an 800 KB JavaScript carousel plugin.',
      },
      {
        type: 'paragraph',
        text: 'Our engineering team executed three targeted fixes without altering the showroom visual branding:',
      },
      {
        type: 'ol',
        title: 'Core Web Vitals optimization steps for the Serpong furniture store',
        items: [
          'Converted all catalog photos to responsive WebP files averaging 65 KB each and locked 4:3 aspect-ratio containers in the HTML.',
          'Replaced the heavy JavaScript carousel plugin with a hardware-accelerated CSS scroll-snap gallery.',
          'Deferred secondary analytics scripts until after the primary hero image finished rendering.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Following these changes, mobile LCP dropped to 1.6 seconds, INP improved to 85 milliseconds, and CLS reached a rock-solid 0.00. Shoppers could browse wood finishes and tap the WhatsApp inquiry button without delay. Explore our performance-first engineering on our [website development service](/en/services/web-development) page, review our coverage in [South Tangerang](/en/area/tangerang-selatan), and read our [chestaa.com v2 architecture case study](/en/case-studies/chestaa-v2-architecture).',
      },
      {
        type: 'h2',
        id: 'how-to-check-your-own-website-scores-in-2-minutes',
        text: 'How to check your own website scores in 2 minutes',
      },
      {
        type: 'paragraph',
        text: 'You can test your website Core Web Vitals scores yourself for free in under two minutes using Google PageSpeed Insights and Google Search Console without installing any software.',
      },
      {
        type: 'paragraph',
        text: 'Follow these four steps to inspect your website performance report card:',
      },
      {
        type: 'ol',
        title: 'Self-audit steps for checking business website speed',
        items: [
          'Open the official Google PageSpeed Insights tool in your browser and paste your homepage or ad landing page URL.',
          'Inspect the "Mobile" tab first, because the vast majority of local customers visit your site from smartphones rather than desktop computers.',
          'Check the "Discover what your real users are experiencing" banner at the top to see whether your Core Web Vitals assessment is marked Passed (green) or Failed (red).',
          'Scroll down to the "Diagnostics" table and note the top three items marked with red triangles to share with your web developer.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If you plan to run paid ads once your site speed is healthy, read our companion guide on [structuring high-conversion Meta and Google Ads landing pages](/en/blog/landing-pages-meta-google-ads-high-conversion).',
      },
      {
        type: 'h2',
        id: 'official-reference-sources',
        text: 'Official reference sources',
      },
      {
        type: 'paragraph',
        text: 'The following official documentation from the Google Chrome and Google Search Central teams defines Core Web Vitals standards; check the official documentation for current figures and terms regarding millisecond thresholds and evaluation methods:',
      },
      {
        type: 'ul',
        items: [
          '[Official Web.dev Core Web Vitals Documentation](https://web.dev/articles/vitals) defines the technical measurement rules, field data collection (CrUX), and thresholds for LCP, INP, and CLS; check the official documentation for current figures and terms.',
          '[Google Search Central: Understanding Core Web Vitals and Search Results](https://developers.google.com/search/docs/appearance/core-web-vitals) explains how page experience metrics factor into Google Search rankings; check the official documentation for current figures and terms.',
          '[Web.dev Guide to Optimizing Interaction to Next Paint (INP)](https://web.dev/articles/inp) covers techniques for breaking up long JavaScript tasks to keep mobile interfaces responsive; check the official documentation for current figures and terms.',
          '[Google PageSpeed Insights Official Testing Tool](https://pagespeed.web.dev/) provides both live Lighthouse lab diagnostics and 28-day Chrome User Experience Report field data; check the official documentation for current figures and terms.',
        ],
      },
    ],
    conclusion: [
      'Core Web Vitals are not abstract engineering numbers meant only for developers; they directly reflect how quickly, smoothly, and respectfully your business welcomes customers online.',
      'By keeping LCP under 2.5 seconds, INP under 200 milliseconds, and CLS near zero, you ensure every organic visitor and paid ad click experiences a fast, trustworthy storefront.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Get a Fast Business Website with Green Core Web Vitals',
      description:
        'Every website we build is engineered from the ground up to pass LCP, INP, and CLS standards on both mobile and desktop.',
      href: '/en/services/web-development',
      label: 'Consult on Website Performance',
    },
    faq: [
      {
        question: 'Why does my website score 95 (green) on Desktop but only 45 (red) on Mobile?',
        answer:
          'The Mobile test simulates a mid-tier smartphone processor over a 4G cellular connection, which has far stricter CPU and bandwidth limits than a desktop computer. Because Google uses mobile-first indexing, your mobile score is the one that matters most.',
      },
      {
        question: 'Do I need a perfect 100/100 score on PageSpeed Insights to rank well on Google?',
        answer:
          'No, a perfect 100 is not required. What matters is that all three core metrics (LCP, INP, and CLS) pass within the green threshold on real user data while your content answers the searcher intent thoroughly.',
      },
      {
        question: 'What is the difference between Lab Data (Lighthouse) and Field Data (CrUX) in speed reports?',
        answer:
          'Lab data is a single simulated test run when you click Analyze, whereas Field Data (Chrome User Experience Report) aggregates the actual loading speeds experienced by real Chrome visitors on your website over the past 28 days.',
      },
      {
        question: 'Will installing Google Tag Manager and the Meta Pixel ruin my Core Web Vitals scores?',
        answer:
          'If multiple heavy tracking scripts are loaded synchronously in the document head, they will hurt LCP and INP. Loading tags after initial render or using server-side tagging keeps your Core Web Vitals in the green.',
      },
      {
        question: 'How long does it take for Google Search Console to mark Core Web Vitals as Passed after a fix?',
        answer:
          'Once your developer deploys the fixes and you click "Validate Fix" in Search Console, Google monitors real visitor data over a 28-day window before updating the official status to Passed.',
      },
      {
        question: 'Where can I look up technical web terms like TTFB, CDN, and DOM?',
        answer:
          'You can browse our technology glossary at /en/glossary for plain-language explanations of web engineering and technical SEO concepts.',
      },
    ],
    relatedSlugs: [
      'why-slow-landing-pages-waste-ad-spend',
      'landing-pages-meta-google-ads-high-conversion',
      'high-converting-landing-page-checklist-service-business',
    ],
  },
];
