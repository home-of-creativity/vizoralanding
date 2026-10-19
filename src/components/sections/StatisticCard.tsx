import { useRef, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { gsap, prefersReducedMotion, useGSAP } from '../../lib/motion';

/** Profile figure with a one-time count-up when it first scrolls into view. */
export function StatisticCard({
  value,
  text,
  featured = false,
  className,
  children,
}: {
  value: number;
  text: string;
  featured?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const number = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = number.current;
      if (!el || prefersReducedMotion()) return;
      const counter = { v: 0 };
      el.textContent = '0';
      gsap.to(counter, {
        v: value,
        duration: featured ? 2.2 : 1.7,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = String(Math.round(counter.v));
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
      return () => {
        el.textContent = String(value);
      };
    },
    { dependencies: [value] },
  );

  return (
    <li
      className={cx(
        'rounded-2xl border border-white/12 bg-white/[0.06] p-6 transition-colors duration-300 hover:border-vz-yellow/50 sm:p-7',
        className,
      )}
    >
      <div className={cx(featured && 'grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]')}>
        <div>
          <p
            dir="ltr"
            className={cx(
              'flex items-baseline font-extrabold tracking-tight text-vz-yellow tabular-nums rtl:justify-end',
              featured ? 'text-7xl sm:text-8xl' : 'text-5xl',
            )}
          >
            <span ref={number}>{value}</span>
            <span className="text-white/90">+</span>
          </p>
          <p className={cx('mt-4 leading-relaxed text-white/85', featured ? 'max-w-md text-lg sm:text-xl' : 'text-[0.98rem]')}>
            {text}
          </p>
        </div>
        {children}
      </div>
    </li>
  );
}
