import { Handshake, TrendingUp, Users } from 'lucide-react';
import { useRef } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { useReveal } from '../../lib/motion';
import { Container, SectionHeading } from '../ui';

const ICONS = [Handshake, TrendingUp, Users];

export function VisionSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="vision" aria-labelledby="vision-title" className="relative overflow-hidden bg-bg-alt py-20 sm:py-28">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Container className="relative">
        <SectionHeading id="vision-title" title={t.vision.title} />
        <ol data-stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {t.vision.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item} className="card group relative flex flex-col p-7 transition-[translate,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-vz-yellow group-hover:text-vz-ink">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <span className="ltr text-4xl font-extrabold text-primary/15">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-6 text-[1.05rem] leading-relaxed text-ink/85">{item}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
