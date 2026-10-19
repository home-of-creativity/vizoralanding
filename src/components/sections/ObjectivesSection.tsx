import { Flag, Target } from 'lucide-react';
import { useRef } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { useReveal } from '../../lib/motion';
import { Container, SectionHeading } from '../ui';

const ICONS = [Target, Flag];

export function ObjectivesSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="objectives" aria-labelledby="objectives-title" className="relative overflow-hidden bg-band py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -end-28 hidden h-56 w-56 bg-vz-yellow xl:block ltr:rotate-[24deg] rtl:-rotate-[24deg]" />
        <div className="absolute bottom-0 start-[8%] flex h-48 items-end gap-3 opacity-[0.08]">
          {[0.35, 0.55, 0.45, 0.75, 0.6, 0.95].map((h, i) => (
            <span key={i} className="w-8 rounded-t-md bg-white" style={{ height: `${h * 100}%` }} />
          ))}
        </div>
      </div>

      <Container className="relative grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <SectionHeading id="objectives-title" title={t.objectives.title} tone="inverse" />
        <ol data-stagger className="space-y-5">
          {t.objectives.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item} className="flex gap-5 rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-[2px] sm:p-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-vz-yellow text-vz-ink">
                  <Icon aria-hidden className="size-6" />
                </span>
                <p className="text-lg leading-relaxed text-white/90 sm:text-xl">{item}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
