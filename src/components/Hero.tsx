import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { FOUNDED_YEAR } from '../content/company';
import { useLocale } from '../i18n/LocaleContext';
import { canUseParallax, gsap, prefersReducedMotion, useGSAP } from '../lib/motion';
import { HeroVisual } from './HeroVisual';
import { Container } from './ui';

export function Hero({ play }: { play: boolean }) {
  const { t } = useLocale();
  const root = useRef<HTMLElement>(null);
  const entrance = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const q = gsap.utils.selector(section);

      if (prefersReducedMotion()) {
        entrance.current = gsap.timeline({ paused: true }).from(section, { autoAlpha: 0, duration: 0.5 });
        return;
      }

      const line = section.querySelector<SVGPathElement>('[data-chart-line]')!;
      const length = line.getTotalLength();

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      tl.from(q('[data-hero-deco]'), { autoAlpha: 0, duration: 1.2 }, 0)
        .from(q('[data-hero-item]'), { autoAlpha: 0, y: 28, filter: 'blur(6px)', duration: 0.9, stagger: 0.12, clearProps: 'filter' }, 0)
        .from(q('[data-hero-cta]'), { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.12 }, 0.55)
        .from(q('[data-hero-panel]'), { autoAlpha: 0, y: 26, duration: 0.8 }, 0.2)
        .from(q('[data-chart-grid] line'), { autoAlpha: 0, duration: 0.5, stagger: 0.05 }, 0.4)
        .fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 0.5)
        .from(q('[data-chart-point]'), { scale: 0, transformOrigin: '50% 50%', duration: 0.35, stagger: 0.11, ease: 'back.out(2.2)' }, 0.6)
        .from(q('[data-chart-area]'), { autoAlpha: 0, duration: 0.9 }, 1.3)
        .fromTo(
          q('[data-chart-highlight]'),
          { scale: 1, opacity: 0.9 },
          { scale: 2.2, opacity: 0, transformOrigin: '50% 50%', duration: 0.9, stagger: 0.35, ease: 'power2.out', immediateRender: false },
          1.6,
        )
        .from(q('[data-bar]'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.7, stagger: 0.07 }, 0.9)
        .from(q('[data-donut]'), { strokeDasharray: `0 ${2 * Math.PI * 30}`, duration: 0.9, stagger: 0.15, ease: 'power2.out' }, 1.0)
        .from(q('[data-float]'), { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.18 }, 1.1);
      entrance.current = tl;

      // Ambient motion after the entrance: a few pixels of slow float on the analytical cards only.
      if (window.matchMedia('(min-width: 768px)').matches) {
        q('[data-float-inner]').forEach((el, i) => {
          gsap.to(el, { y: -7, duration: 3.2 + i * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.6 + i * 0.4 });
        });
      }

      const scrub = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(q('[data-hero-visual]'), { y: -50, ease: 'none', scrollTrigger: scrub });
      gsap.to(q('[data-hero-bg]'), { y: 90, ease: 'none', scrollTrigger: scrub });
      gsap.to(q('[data-hero-text]'), { autoAlpha: 0.3, ease: 'none', scrollTrigger: { ...scrub, start: '35% top' } });

      if (canUseParallax()) {
        const layers = q('[data-depth]').map((el) => ({
          depth: Number((el as HTMLElement).dataset.depth),
          x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
        }));
        const grid = q('[data-hero-grid]')[0];
        const gx = gsap.quickTo(grid, 'x', { duration: 1.2, ease: 'power3.out' });
        const gy = gsap.quickTo(grid, 'y', { duration: 1.2, ease: 'power3.out' });
        const onMove = (e: PointerEvent) => {
          const rect = section.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          for (const layer of layers) {
            layer.x(nx * layer.depth * 16);
            layer.y(ny * layer.depth * 12);
          }
          gx(nx * -6);
          gy(ny * -6);
        };
        const onLeave = () => {
          for (const layer of layers) {
            layer.x(0);
            layer.y(0);
          }
          gx(0);
          gy(0);
        };
        section.addEventListener('pointermove', onMove);
        section.addEventListener('pointerleave', onLeave);
        return () => {
          section.removeEventListener('pointermove', onMove);
          section.removeEventListener('pointerleave', onLeave);
        };
      }
    },
    { scope: root },
  );

  useEffect(() => {
    if (play) entrance.current?.play();
  }, [play]);

  return (
    <section
      ref={root}
      id="home"
      aria-labelledby="hero-title"
      className="relative flex items-center overflow-hidden pt-28 pb-20 sm:pt-32 lg:min-h-[100svh] lg:pt-28 lg:pb-16"
    >
      <div data-hero-bg aria-hidden className="pointer-events-none absolute inset-0">
        <div
          data-hero-grid
          className="bg-grid absolute -inset-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_20%,transparent_75%)]"
        />
        <div
          data-hero-deco
          className="absolute -top-24 end-[-11rem] h-[20rem] w-[20rem] rounded-[4rem] bg-primary-soft sm:-top-32 sm:end-[-14rem] sm:h-[34rem] sm:w-[34rem] sm:rounded-[5rem] ltr:rotate-[24deg] rtl:-rotate-[24deg] lg:end-[-8rem]"
        />
        <div
          data-hero-deco
          className="absolute end-[18%] top-24 hidden h-2 w-24 bg-vz-yellow lg:block ltr:rotate-[24deg] rtl:-rotate-[24deg]"
        />
        <div data-hero-deco className="absolute start-0 bottom-0 flex h-40 items-end gap-3 px-8 opacity-60">
          {[0.3, 0.5, 0.4, 0.7, 0.55, 0.85].map((h, i) => (
            <span key={i} className="w-6 rounded-t-md bg-primary/[0.07]" style={{ height: `${h * 100}%` }} />
          ))}
        </div>
      </div>

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
        <div data-hero-text>
          <p data-hero-item className="mb-5 flex items-center gap-1.5 text-sm font-bold text-primary">
            <span aria-hidden className="h-1.5 w-8 rounded-full bg-vz-purple dark:bg-primary" />
            <span aria-hidden className="h-1.5 w-12 rounded-full bg-vz-yellow" />
            {t.nav.about}
          </p>
          <h1 id="hero-title" data-hero-item>
            <span className="block text-[clamp(3rem,8vw,5.4rem)] leading-[0.92] font-extrabold tracking-tight text-primary">
              VIZORA
            </span>
            <span className="mt-4 flex items-center gap-3 text-base font-bold text-ink sm:text-lg ltr:tracking-[0.32em]">
              <span aria-hidden className="h-1.5 w-10 rounded-full bg-vz-yellow" />
              {t.hero.category}
            </span>
          </h1>
          <p data-hero-item className="mt-6 max-w-xl text-xl leading-snug font-semibold text-ink sm:text-[1.45rem]">
            {t.hero.lead}
          </p>
          <p data-hero-item className="mt-4 flex max-w-xl gap-3 text-base leading-relaxed text-muted">
            <span aria-hidden className="mt-3 h-0.5 w-6 shrink-0 rounded-full bg-vz-yellow" />
            {t.hero.support}
          </p>
          <div data-hero-item className="mt-8 flex max-w-xl flex-wrap items-start gap-x-8 gap-y-4 border-t border-line pt-6">
            <div>
              <p className="text-xs font-bold text-muted">{t.about.foundedLabel}</p>
              <p className="ltr text-3xl font-extrabold tracking-tight text-primary">{FOUNDED_YEAR}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted">{t.contact.labels.location}</p>
              <p className="mt-1.5 text-sm font-bold text-ink">{t.contact.location}</p>
            </div>
            <div className="min-w-48 flex-1">
              <p className="text-xs font-bold text-muted">{t.about.incubatedLabel}</p>
              <ul className="mt-1.5 space-y-1">
                {t.about.incubators.map((name) => (
                  <li key={name} className="text-sm leading-snug font-semibold text-ink">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a data-hero-cta href="#services" className="btn-primary group">
              {t.hero.ctaServices}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 rtl:-scale-x-100 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </a>
            <a data-hero-cta href="#contact" className="btn-secondary">
              {t.hero.ctaContact}
            </a>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
