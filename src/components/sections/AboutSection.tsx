import { Building2 } from 'lucide-react';
import { useRef } from 'react';
import { FOUNDED_YEAR } from '../../content/company';
import { useLocale } from '../../i18n/LocaleContext';
import { useReveal } from '../../lib/motion';
import { Container, Photo, SectionHeading } from '../ui';

export function AboutSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [first, ...rest] = t.about.paragraphs;

  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="relative py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="about-title" title={t.about.title} />
          <div data-stagger className="mt-8 space-y-5">
            <p className="text-xl leading-relaxed font-semibold text-ink sm:text-[1.35rem]">{first}</p>
            {rest.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div data-reveal className="relative pb-6 lg:pb-0">
          <div aria-hidden className="absolute -top-4 -end-4 h-28 w-40 rounded-2xl bg-vz-yellow" />
          <div aria-hidden className="absolute -bottom-4 start-10 h-20 w-20 rounded-xl border-2 border-primary/30" />
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
            <Photo name="office-dashboard-day" alt={t.about.imageAlt} className="dark:hidden" />
            <Photo name="office-dashboard-night" alt={t.about.imageAlt} className="hidden dark:block" />
          </div>

          <div className="card relative mx-4 -mt-14 p-5 sm:mx-8 sm:p-6 lg:absolute lg:-bottom-12 lg:-start-10 lg:mx-0 lg:mt-0 lg:w-[22rem]">
            <div className="relative ps-6">
              <span aria-hidden className="absolute inset-y-2 start-[5px] w-px bg-line" />
              <ol className="space-y-5">
                <li className="relative">
                  <span aria-hidden className="absolute -start-6 top-3 size-[11px] rounded-full bg-vz-yellow ring-4 ring-vz-yellow/25" />
                  <div className="flex items-baseline gap-3">
                    <span className="ltr text-4xl font-extrabold tracking-tight text-primary">{FOUNDED_YEAR}</span>
                    <span className="text-sm font-semibold text-muted">{t.about.foundedLabel}</span>
                  </div>
                </li>
                <li className="relative">
                  <span aria-hidden className="absolute -start-6 top-1.5 size-[11px] rounded-full border-2 border-primary bg-surface" />
                  <p className="text-xs font-bold text-muted">{t.about.incubatedLabel}</p>
                  <ul className="mt-2 space-y-2">
                    {t.about.incubators.map((name) => (
                      <li key={name} className="flex items-start gap-2 text-sm font-semibold text-ink">
                        <Building2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
