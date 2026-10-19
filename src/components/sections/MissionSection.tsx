import { useRef } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { useReveal } from '../../lib/motion';
import { Container, Photo, SectionHeading } from '../ui';

export function MissionSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [statement, support] = t.mission.paragraphs;

  return (
    <section ref={ref} id="mission" aria-labelledby="mission-title" className="relative py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className="relative order-last lg:order-first">
          <div aria-hidden className="absolute -bottom-4 -end-4 h-[70%] w-[70%] rounded-3xl bg-vz-yellow" />
          <div aria-hidden className="absolute -top-4 -start-4 h-24 w-24 rounded-2xl bg-vz-purple dark:bg-primary/40" />
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
            <Photo name="team-presentation" alt={t.mission.imageAlt} />
          </div>
        </div>

        <div>
          <SectionHeading id="mission-title" title={t.mission.title} />
          <div data-stagger className="mt-8 space-y-6">
            <p className="border-s-4 border-vz-yellow ps-6 text-2xl leading-snug font-bold text-ink sm:text-[1.75rem]">
              {statement}
            </p>
            <p className="text-lg leading-relaxed text-muted">{support}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
