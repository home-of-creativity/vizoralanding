import { ChartLine, FileText, Gauge } from 'lucide-react';
import { useId, type ReactNode } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { cx } from '../lib/cx';

// Illustrative shapes only — the visual carries no figures, so nothing here reads as a VIZORA statistic.
const W = 520;
const H = 200;
const SERIES = [0.34, 0.42, 0.37, 0.5, 0.46, 0.58, 0.53, 0.66, 0.61, 0.74, 0.7, 0.84];
const HIGHLIGHTS = new Set([7, 11]);
const BARS = [0.36, 0.52, 0.44, 0.63, 0.57, 0.76, 0.9];
const DONUT = [0.46, 0.32, 0.22];
const R = 30;
const C = 2 * Math.PI * R;

const points = SERIES.map((v, i) => ({ x: 14 + (i * (W - 28)) / (SERIES.length - 1), y: H - 16 - v * (H - 40) }));

/** Catmull-Rom → cubic Bézier, so the line reads as a smooth statistical curve. */
function smoothPath(pts: { x: number; y: number }[]) {
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

const LINE = smoothPath(points);
const AREA = `${LINE} L${points[points.length - 1].x},${H} L${points[0].x},${H} Z`;

function FloatCard({
  depth,
  className,
  icon,
  label,
  children,
}: {
  depth: number;
  className: string;
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div data-depth={depth} className={cx('absolute z-20', className)}>
      <div data-float>
        <div data-float-inner className="card flex items-center gap-3 rounded-xl px-3.5 py-3 sm:px-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-vz-yellow text-vz-ink">{icon}</span>
          <div className="min-w-0">
            <p className="text-[0.8rem] font-bold whitespace-nowrap text-ink">{label}</p>
            <div className="mt-1.5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const { t } = useLocale();
  const gradient = useId();

  return (
    <div data-hero-visual className="relative mx-auto w-full max-w-[34rem] lg:max-w-none" aria-hidden>
      <div data-depth={0.6} data-hero-deco className="pointer-events-none absolute -top-5 end-10 h-2 w-28 rounded-full bg-vz-yellow" />

      <div data-depth={0.3} className="relative z-10">
        <div data-hero-panel className="card relative overflow-hidden rounded-3xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-vz-yellow" />
              <span className="text-sm font-bold text-ink">{t.hero.dashboard}</span>
            </div>
            <div className="flex gap-1.5">
              <span className="h-2 w-10 rounded-full bg-primary-soft" />
              <span className="h-2 w-6 rounded-full bg-primary-soft" />
              <span className="h-2 w-8 rounded-full bg-vz-yellow/70" />
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 h-auto w-full overflow-visible">
            <defs>
              <linearGradient id={gradient} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g data-chart-grid className="stroke-line" strokeWidth={1}>
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1={0} x2={W} y1={20 + i * 42} y2={20 + i * 42} strokeDasharray={i === 4 ? undefined : '4 6'} />
              ))}
            </g>
            <path data-chart-area d={AREA} fill={`url(#${gradient})`} />
            <path data-chart-line d={LINE} fill="none" className="stroke-primary" strokeWidth={3} strokeLinecap="round" />
            {points.map((p, i) =>
              HIGHLIGHTS.has(i) ? (
                <g key={i}>
                  <circle data-chart-highlight cx={p.x} cy={p.y} r={7} fill="none" stroke="#F2D763" strokeWidth={2} opacity={0} />
                  <circle data-chart-point cx={p.x} cy={p.y} r={6} fill="#F2D763" stroke="#E2C24A" strokeWidth={2} />
                </g>
              ) : (
                <circle key={i} data-chart-point cx={p.x} cy={p.y} r={4} className="fill-surface stroke-primary" strokeWidth={2.5} />
              ),
            )}
          </svg>

          <div className="mt-5 grid grid-cols-[1.5fr_1fr] gap-3 sm:gap-4">
            <div className="rounded-2xl bg-surface-2 p-4">
              <div className="mb-3 h-2 w-16 rounded-full bg-primary-soft" />
              <svg viewBox="0 0 200 90" className="h-auto w-full">
                {BARS.map((v, i) => (
                  <rect
                    key={i}
                    data-bar
                    x={6 + i * 28}
                    y={90 - v * 86}
                    width={18}
                    height={v * 86}
                    rx={4}
                    className={i === BARS.length - 1 ? 'fill-vz-yellow' : 'fill-primary'}
                    opacity={i === BARS.length - 1 ? 1 : 0.35 + i * 0.09}
                  />
                ))}
              </svg>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-surface-2 p-4">
              <svg viewBox="0 0 80 80" className="size-full max-h-28 max-w-28 -rotate-90">
                <circle cx={40} cy={40} r={R} fill="none" strokeWidth={11} className="stroke-primary-soft" />
                {DONUT.map((share, i) => {
                  const offset = DONUT.slice(0, i).reduce((a, b) => a + b, 0);
                  return (
                    <circle
                      key={i}
                      data-donut
                      cx={40}
                      cy={40}
                      r={R}
                      fill="none"
                      strokeWidth={11}
                      className={i === 1 ? 'stroke-vz-yellow' : i === 0 ? 'stroke-primary' : 'stroke-primary/45'}
                      style={{ strokeDasharray: `${share * C - 2} ${C}`, strokeDashoffset: -offset * C }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <FloatCard
        depth={1}
        className="-top-14 start-2 sm:-top-16 sm:-start-6"
        icon={<ChartLine className="size-[18px]" />}
        label={t.hero.cards.analysis}
      >
        <svg viewBox="0 0 64 16" className="h-4 w-16">
          <path d="M1 13 L12 10 L22 11.5 L33 6 L43 8 L54 3 L63 4" fill="none" strokeWidth={2} strokeLinecap="round" className="stroke-primary" />
        </svg>
      </FloatCard>

      <FloatCard
        depth={0.8}
        className="-bottom-6 end-2 sm:-end-5"
        icon={<FileText className="size-[18px]" />}
        label={t.hero.cards.reports}
      >
        <div className="space-y-1">
          <span className="block h-1.5 w-20 rounded-full bg-primary-soft" />
          <span className="block h-1.5 w-14 rounded-full bg-primary-soft" />
        </div>
      </FloatCard>

      <FloatCard
        depth={1.2}
        className="top-[38%] -end-10 hidden xl:block"
        icon={<Gauge className="size-[18px]" />}
        label={t.hero.cards.indicators}
      >
        <div className="flex h-4 items-end gap-1">
          {[0.4, 0.6, 0.5, 0.8, 1].map((h, i) => (
            <span key={i} className={cx('w-1.5 rounded-sm', i === 4 ? 'bg-vz-yellow' : 'bg-primary/60')} style={{ height: `${h * 100}%` }} />
          ))}
        </div>
      </FloatCard>
    </div>
  );
}
