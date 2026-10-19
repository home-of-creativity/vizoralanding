import { BookOpenCheck, ChartLine, Database, FileCheck2, LayoutDashboard, Wallet, type LucideIcon } from 'lucide-react';
import { useRef } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { useReveal } from '../../lib/motion';
import { Container, SectionHeading } from '../ui';

/** Same order as `services.items` in each locale. */
const ICONS: LucideIcon[] = [BookOpenCheck, Wallet, FileCheck2, Database, LayoutDashboard, ChartLine];

function ServiceCard({
  index,
  icon: Icon,
  title,
  tag,
  description,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  tag?: string;
  description: string;
}) {
  return (
    <li className="card group relative flex flex-col overflow-hidden p-7 transition-[translate,box-shadow,border-color] duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-vz-yellow/60 hover:shadow-[var(--shadow-lift)]">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-vz-yellow transition-transform duration-500 ease-out-soft group-hover:scale-x-100 rtl:origin-right"
      />
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-13 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-vz-purple group-hover:text-vz-yellow dark:group-hover:bg-primary dark:group-hover:text-vz-ink">
          <Icon aria-hidden className="size-6" strokeWidth={1.75} />
        </span>
        <span className="ltr text-sm font-bold text-muted/70 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-6 text-xl leading-snug font-bold text-ink">{title}</h3>
      {tag && (
        <span dir="ltr" className="mt-3 inline-flex w-fit rounded-full bg-vz-yellow/25 px-3 py-1 text-xs font-bold text-ink">
          {tag}
        </span>
      )}
      <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{description}</p>
    </li>
  );
}

export function ServicesSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="services" aria-labelledby="services-title" className="relative bg-bg-alt py-20 sm:py-28">
      <Container>
        <SectionHeading id="services-title" title={t.services.title} />
        <ul data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => (
            <ServiceCard key={service.title} index={i} icon={ICONS[i]} {...service} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
