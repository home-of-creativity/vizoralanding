import { useEffect, useRef } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/motion';
import { VizoraLogo } from './VizoraLogo';

/**
 * Opening sequence (~2.4s): the purple V is drawn then filled, the yellow bars slide in,
 * IZORA and DATA ANALYSIS rise into place, and a thin yellow line extends across the screen
 * as the overlay lifts — handing over to the hero chart, which starts drawing at that moment.
 * Any click or key press fast-forwards it.
 */
export function LogoAnimation({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const { t, dir } = useLocale();
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ onComplete: onDone });
      timeline.current = tl;

      if (prefersReducedMotion()) {
        gsap.set(q('[data-intro-caption]'), { autoAlpha: 1 });
        tl.from(q('[data-intro-logo]'), { autoAlpha: 0, duration: 0.4 })
          .add(onReveal, '+=0.4')
          .to(root.current, { autoAlpha: 0, duration: 0.4 });
        return;
      }

      const svg = root.current!;
      const v = svg.querySelector<SVGPathElement>('.vz-v')!;
      const vLength = v.getTotalLength();
      v.style.stroke = 'var(--logo-purple)';
      v.style.strokeWidth = '2';
      const curve = svg.querySelector<SVGPathElement>('.vz-curve')!;
      const curveLength = curve.getTotalLength();
      const arrow = svg.querySelector<SVGPathElement>('.vz-arrow')!;
      const arrowLength = arrow.getTotalLength();

      tl.fromTo(v, { strokeDasharray: vLength, strokeDashoffset: vLength, fillOpacity: 0 }, { strokeDashoffset: 0, duration: 0.65, ease: 'power2.inOut' })
        .to(v, { fillOpacity: 1, duration: 0.35, ease: 'power1.out' }, '-=0.15')
        .to(v, { strokeOpacity: 0, duration: 0.25 }, '<0.15')
        .from(q('.vz-bar'), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.42, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
        .from(q('.vz-tri'), { scale: 0, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'power2.out' }, '<0.1')
        .fromTo(curve, { strokeDasharray: curveLength, strokeDashoffset: curveLength }, { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut' }, '<')
        .from(q('.vz-letter'), { autoAlpha: 0, y: 14, duration: 0.45, stagger: 0.04, ease: 'power3.out' }, '-=0.35')
        .fromTo(arrow, { strokeDasharray: arrowLength, strokeDashoffset: arrowLength }, { strokeDashoffset: 0, duration: 0.3 }, '-=0.2')
        .from(q('.vz-arrow-head'), { autoAlpha: 0, duration: 0.2 }, '-=0.05')
        .from(q('.vz-tagline'), { autoAlpha: 0, y: 8, duration: 0.4, ease: 'power2.out' }, '-=0.3')
        .fromTo(
          q('[data-intro-caption]'),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.15',
        )
        .to({}, { duration: 0.85 })
        .fromTo(q('[data-intro-line]'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' })
        .add(onReveal)
        .to(q('[data-intro-logo]'), { autoAlpha: 0, y: -14, scale: 0.97, duration: 0.45, ease: 'power2.in' }, '<')
        .to(root.current, { autoAlpha: 0, duration: 0.5, ease: 'power1.out' }, '<0.15');
    },
    { scope: root },
  );

  useEffect(() => {
    const skip = () => timeline.current?.timeScale(4);
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[70] flex items-center justify-center bg-bg">
      <div className="flex w-full flex-col items-center">
        <div data-intro-logo className="flex flex-col items-center">
          <div dir="ltr">
            <VizoraLogo className="h-auto w-[min(78vw,30rem)]" />
          </div>
          <p
            data-intro-caption
            dir={dir}
            className="mt-6 max-w-2xl px-6 text-center text-[0.95rem] leading-relaxed font-semibold text-ink opacity-0 sm:text-base"
          >
            {t.intro.caption}
          </p>
        </div>
        <span data-intro-line className="mt-10 block h-[2px] w-full origin-center bg-vz-yellow" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  );
}
