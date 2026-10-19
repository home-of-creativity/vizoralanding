import { useRef } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { useReveal } from '../../lib/motion';
import { Container, Photo, SectionHeading } from '../ui';

export function WhyVizoraSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="why" aria-labelledby="why-title" className="relative py-20 sm:py-28">
      <Container className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading id="why-title" title={t.why.title} />
          <ol data-stagger className="mt-10 space-y-4">
            {t.why.items.map((item, i) => (
              <li
                key={item.title}
                className="group flex gap-5 rounded-2xl border border-transparent p-5 transition-colors duration-300 hover:border-line hover:bg-surface sm:p-6"
              >
                <span className="ltr flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-vz-yellow text-base font-extrabold text-primary transition-colors duration-300 group-hover:bg-vz-yellow group-hover:text-vz-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="relative lg:mt-24">
          <div aria-hidden className="absolute -top-4 -start-4 h-[60%] w-[60%] rounded-3xl bg-vz-purple dark:bg-primary/30" />
          <div aria-hidden className="absolute -bottom-3 end-8 h-3 w-28 rounded-full bg-vz-yellow" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
            <Photo name="financial-report-desk" alt={t.why.imageAlt} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}
