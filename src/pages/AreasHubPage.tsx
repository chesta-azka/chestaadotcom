import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  REGION_GROUPS,
  resolveUnifiedAreaPage,
  getUnifiedAreaPath,
  getServiceAreasByAreaSlug,
} from '../data/service-areas';
import { getServiceAreaPath } from '../data/services';
import { parseLocalizedPath } from '../lib/i18n';
import {
  Container,
  Button,
  Card,
  Badge,
  Tag,
  SectionHeading,
  Breadcrumb,
  CTABlock,
} from '../components/ui/DesignSystem';
import { buildWhatsAppLink, getWhatsAppCtaLabel } from '../lib/whatsapp';
import { trackWaClick } from '../lib/analytics';
import { SITE_IMAGES } from '../config/images';

export default function AreasHubPage() {
  const location = useLocation();
  const { locale } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const waUrl = buildWhatsAppLink({ type: 'default' }, locale);
  const waLabel = getWhatsAppCtaLabel(locale);

  const pageTitle = isEn
    ? 'Service Areas: Tangsel, Tangerang, Depok & Jakarta | CHESTAADOTCOM'
    : 'Area Layanan: Tangsel, Tangerang, Depok & Jakarta | CHESTAADOTCOM';

  const pageDescription = isEn
    ? 'CHESTAADOTCOM is based in BSD, South Tangerang and serves businesses across South Tangerang, Tangerang Regency, Tangerang City, Depok, and South Jakarta.'
    : 'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani bisnis di Tangerang Selatan, Kabupaten Tangerang, Kota Tangerang, Depok, dan Jakarta Selatan.';

  // Build grouped indexable areas per region
  const groupedRegions = REGION_GROUPS.map((group) => {
    const areas = group.areaSlugs
      .map((slug) => resolveUnifiedAreaPage(slug, locale))
      .filter((p): p is NonNullable<typeof p> => Boolean(p && p.indexable));

    return {
      ...group,
      title: isEn ? group.nameEn : group.nameId,
      description: isEn ? group.descriptionEn : group.descriptionId,
      areas,
    };
  }).filter((g) => g.areas.length > 0);

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        path={isEn ? '/en/areas' : '/id/area'}
        image={SITE_IMAGES.ogDefault.src}
      />

      {/* HERO */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb items={[{ label: isEn ? 'Service Areas' : 'Area Layanan' }]} />

          <div className="max-w-3xl space-y-5">
            <Badge variant="tint">
              <MapPin size={13} className="text-[#6A3FD0]" />
              <span>
                {isEn
                  ? 'BASED IN BSD · TANGERANG SELATAN'
                  : 'BERBASIS DI BSD · TANGERANG SELATAN'}
              </span>
            </Badge>

            <h1>
              {isEn
                ? 'Service areas for websites, AI agents, and custom software.'
                : 'Area layanan pembuatan website, AI agent, dan software custom.'}
            </h1>

            <p className="text-[17px] text-[#5B5675] leading-[1.68]">
              {isEn
                ? 'CHESTAADOTCOM is based in BSD, South Tangerang. We work with businesses across South Tangerang, Tangerang Regency, Tangerang City, Depok City, and South Jakarta—online via WhatsApp and video call, or in person in the South Tangerang area by agreement.'
                : 'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan. Kami melayani bisnis di wilayah Tangerang Selatan, Kabupaten Tangerang, Kota Tangerang, Kota Depok, dan Jakarta Selatan—secara online melalui WhatsApp dan video call, atau tatap muka di area Tangerang Selatan sesuai kesepakatan.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                href={waUrl}
                variant="primary"
                onClick={() => trackWaClick('areas_hub_hero')}
              >
                <span>{waLabel}</span>
                <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* REGION GROUPS */}
      <section className="py-16 md:py-24 bg-[#FFFFFF]">
        <Container className="space-y-16">
          {groupedRegions.map((region) => (
            <div key={region.id} className="space-y-6">
              <SectionHeading
                eyebrow={isEn ? 'REGION COVERAGE' : 'WILAYAH LAYANAN'}
                title={region.title}
                description={region.description}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {region.areas.map((areaPage) => {
                  const unifiedHref = getUnifiedAreaPath(areaPage.slug, locale);
                  const servicePages = areaPage.hasServiceAreaPages
                    ? getServiceAreasByAreaSlug(areaPage.slug, true, locale)
                    : [];

                  return (
                    <Card
                      key={areaPage.slug}
                      variant="white"
                      padding="lg"
                      className="flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <Badge variant="tint">{areaPage.regionLabel}</Badge>
                          <Tag>{areaPage.schemaType}</Tag>
                        </div>

                        <h2 className="text-[22px] font-bold text-[#17122B] mb-2">
                          <Link
                            to={unifiedHref}
                            className="hover:text-[#6A3FD0] transition-colors"
                          >
                            {areaPage.name}
                          </Link>
                        </h2>

                        <p className="text-[14px] text-[#5B5675] leading-[1.65] mb-5">
                          {areaPage.factsSummary}
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-4 border-t border-[rgba(91,60,196,0.12)]">
                        <Link
                          to={unifiedHref}
                          className="flex items-center justify-between p-3 rounded-[10px] bg-[#F8F6FE] hover:bg-[#EFEAFF] transition-colors text-[14px] font-semibold text-[#17122B]"
                        >
                          <span>
                            {isEn
                              ? `All services in ${areaPage.name}`
                              : `Semua layanan di ${areaPage.name}`}
                          </span>
                          <ArrowRight size={15} className="text-[#6A3FD0]" />
                        </Link>

                        {servicePages.map((sp) => {
                          const href = getServiceAreaPath(
                            sp.serviceSlug,
                            sp.areaSlug,
                            locale,
                          );
                          const label =
                            sp.serviceSlug === 'pembuatan-website'
                              ? isEn
                                ? `Website Development in ${areaPage.name}`
                                : `Jasa Pembuatan Website ${areaPage.name}`
                              : isEn
                                ? `AI Agent & Chat Automation in ${areaPage.name}`
                                : `Jasa AI Agent ${areaPage.name}`;
                          return (
                            <Link
                              key={`${sp.serviceSlug}-${sp.areaSlug}`}
                              to={href}
                              className="flex items-center justify-between px-3 py-2 rounded-[8px] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0] transition-colors text-[13px] font-medium text-[#5B5675] hover:text-[#17122B]"
                            >
                              <span className="inline-flex items-center gap-1.5">
                                <Sparkles size={13} className="text-[#6A3FD0]" />
                                <span>{label}</span>
                              </span>
                              <ArrowRight size={13} className="text-[#6A3FD0]" />
                            </Link>
                          );
                        })}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <CTABlock
        eyebrow={isEn ? 'REMOTE & LOCAL' : 'ONLINE & TATAP MUKA'}
        title={
          isEn
            ? 'Located outside South Tangerang?'
            : 'Berada di luar Tangerang Selatan?'
        }
        description={
          isEn
            ? 'We work with businesses across Jabodetabek and Indonesia via WhatsApp and video call, or in person in the South Tangerang area by agreement. Start with a free 30-minute workflow audit.'
            : 'Kami bekerja sama dengan bisnis di Jabodetabek dan seluruh Indonesia melalui WhatsApp dan video call, atau tatap muka di wilayah Tangerang Selatan sesuai kesepakatan. Mulai dari audit gratis 30 menit.'
        }
        buttonLabel={waLabel}
        whatsappMessage={
          isEn
            ? 'Hello CHESTAADOTCOM, I am located outside South Tangerang and would like a consultation.'
            : 'Halo CHESTAADOTCOM, saya berada di luar Tangerang Selatan dan ingin konsultasi.'
        }
      />
    </div>
  );
}
