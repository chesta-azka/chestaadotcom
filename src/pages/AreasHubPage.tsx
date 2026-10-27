import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { getIndexableAreas } from '../data/service-areas';
import { getServiceAreaPath } from '../data/services';
import { resolveRedirectTarget } from '../config/redirects';
import { parseLocalizedPath } from '../lib/i18n';
import {
  Container,
  Card,
  Badge,
  Breadcrumb,
} from '../components/ui/DesignSystem';

/**
 * Areas Hub (/id/area and /en/areas):
 * A clean, restrained index page: short intro, the 5 indexable areas each with
 * its 2 service links and a 1-sentence description from the facts, nothing else.
 */
export default function AreasHubPage() {
  const location = useLocation();
  const { locale } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const redirectTarget = resolveRedirectTarget(location.pathname);
  if (redirectTarget && redirectTarget !== location.pathname) {
    return <Navigate to={redirectTarget} replace />;
  }

  const indexableAreas = getIndexableAreas();

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata path={location.pathname} />

      <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF]">
        <Container className="max-w-4xl">
          <Breadcrumb
            items={[
              {
                label: isEn ? 'Areas' : 'Area',
              },
            ]}
          />

          <div className="space-y-4 mb-10">
            <Badge variant="tint">
              <MapPin size={13} className="text-[#6A3FD0]" />
              <span>
                {isEn
                  ? 'Based in BSD, South Tangerang'
                  : 'Berbasis di BSD, Tangerang Selatan'}
              </span>
            </Badge>

            <h1>
              {isEn
                ? 'Service areas in South Tangerang and South Jakarta'
                : 'Area layanan di Tangerang Selatan dan Jakarta Selatan'}
            </h1>

            <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.7] max-w-2xl">
              {isEn
                ? 'CHESTAADOTCOM is based in BSD, South Tangerang and serves businesses in South Tangerang and Greater Jakarta. Day-to-day work runs online via WhatsApp and video call; in-person meetings in the South Tangerang area can be scheduled by agreement.'
                : 'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani klien di Tangerang Selatan serta Jabodetabek. Kerja sehari-hari dilakukan secara online (WhatsApp, video call); pertemuan tatap muka di area Tangerang Selatan bisa dijadwalkan sesuai kesepakatan.'}
            </p>
          </div>

          <div className="space-y-5">
            {indexableAreas.map((area) => {
              const areaDisplayName = isEn ? area.nameEn : area.name;
              const oneSentenceDesc = isEn
                ? area.factsSummaryEn
                : area.factsSummaryId;
              const webHref = getServiceAreaPath(
                'pembuatan-website',
                area.slug,
                locale
              );
              const aiHref = getServiceAreaPath('ai-agent', area.slug, locale);

              const webLabel = isEn
                ? `Website development in ${areaDisplayName}`
                : `Jasa pembuatan website di ${areaDisplayName}`;
              const aiLabel = isEn
                ? `AI agent services in ${areaDisplayName}`
                : `Jasa AI agent di ${areaDisplayName}`;

              return (
                <Card
                  key={area.slug}
                  variant="soft"
                  padding="lg"
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <h2 className="text-[20px] md:text-[22px] font-semibold text-[#17122B]">
                      {areaDisplayName}
                    </h2>
                    <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                      {oneSentenceDesc}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to={webHref}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] text-[13px] md:text-[14px] font-semibold text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors"
                    >
                      <span>{webLabel}</span>
                      <ArrowRight size={14} className="text-[#6A3FD0]" />
                    </Link>

                    <Link
                      to={aiHref}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] text-[13px] md:text-[14px] font-semibold text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors"
                    >
                      <span>{aiLabel}</span>
                      <ArrowRight size={14} className="text-[#6A3FD0]" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
