import { useRef } from 'react';
import { CLIENTS } from '../../content/company';
import { useLocale } from '../../i18n/LocaleContext';
import { useReveal } from '../../lib/motion';
import { Container, SectionHeading } from '../ui';

export function ClientsSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="clients" aria-labelledby="clients-title" className="relative bg-bg-alt py-20 sm:py-28">
      <Container>
        <SectionHeading id="clients-title" title={t.clients.title} align="center" />
        <ul data-stagger className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((name) => (
            <li
              key={name}
              lang="en"
              dir="ltr"
              className="card group flex min-h-32 items-center justify-center px-6 py-8 text-center transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-vz-yellow"
            >
              <span className="text-lg leading-snug font-bold text-muted transition-colors duration-300 group-hover:text-primary">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
