import { useRef } from 'react';
import { ACHIEVEMENT_VALUES } from '../../content/company';
import { useLocale } from '../../i18n/LocaleContext';
import { cx } from '../../lib/cx';
import { gsap, prefersReducedMotion, useGSAP, useReveal } from '../../lib/motion';
import { Container, SectionHeading } from '../ui';
import { StatisticCard } from './StatisticCard';

const MAX = Math.max(...ACHIEVEMENT_VALUES);

/** The seven Company Profile figures drawn to scale; the first (featured) one is highlighted. */
function AchievementsChart() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-stat-bar]', {
        scaleY: 0,
        transformOrigin: '50% 100%',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden dir="ltr" className="flex h-44 items-end gap-2 sm:gap-3">
      {ACHIEVEMENT_VALUES.map((v, i) => (
        <div key={i} className="flex h-full flex-1 flex-col justify-end gap-2">
          <span className={cx('text-center text-xs font-bold tabular-nums', i === 0 ? 'text-vz-yellow' : 'text-white/55')}>{v}+</span>
          <span
            data-stat-bar
            className={cx('block rounded-t-lg', i === 0 ? 'bg-vz-yellow' : 'bg-white/20')}
            style={{ height: `${Math.max((v / MAX) * 100, 6)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

export function AchievementsSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [first, ...rest] = t.achievements.items;

  return (
    <section ref={ref} id="achievements" aria-labelledby="achievements-title" className="relative overflow-hidden bg-band py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute -bottom-28 -end-28 hidden h-56 w-56 bg-vz-yellow xl:block ltr:rotate-[24deg] rtl:-rotate-[24deg]" />
      </div>
      <Container className="relative">
        <SectionHeading id="achievements-title" title={t.achievements.title} tone="inverse" />
        <ul data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatisticCard value={ACHIEVEMENT_VALUES[0]} text={first} featured className="sm:col-span-2 lg:col-span-3">
            <AchievementsChart />
          </StatisticCard>
          {rest.map((text, i) => (
            <StatisticCard key={text} value={ACHIEVEMENT_VALUES[i + 1]} text={text} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
