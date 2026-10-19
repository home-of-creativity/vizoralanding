import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import type { SectionId } from '../i18n/types';
import { cx } from '../lib/cx';
import { useActiveSection } from '../lib/useActiveSection';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { VizoraLogo } from './VizoraLogo';

export const NAV_ITEMS: readonly SectionId[] = [
  'home',
  'about',
  'vision',
  'objectives',
  'mission',
  'services',
  'achievements',
  'clients',
  'contact',
];

export function Navbar({ visible }: { visible: boolean }) {
  const { t, switching } = useLocale();
  const active = useActiveSection(NAV_ITEMS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow,opacity,translate] duration-500 ease-out-soft',
          scrolled
            ? 'border-line bg-bg/85 shadow-[0_10px_30px_-20px_rgb(42_20_56/0.35)] backdrop-blur-md'
            : 'border-transparent bg-transparent',
          visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
        )}
      >
        <div className={cx('locale-stage', switching && 'is-switching')}>
          <div
            className={cx(
              'mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[height] duration-500 sm:px-8',
              scrolled ? 'h-16' : 'h-20',
            )}
          >
            <a href="#home" aria-label="VIZORA" className="logo-hover shrink-0" dir="ltr">
              <VizoraLogo
                className={cx(
                  'w-auto origin-left transition-[height] duration-500 ease-out-soft',
                  scrolled ? 'h-10' : 'h-12',
                )}
              />
            </a>

            <nav aria-label={t.nav.label} className="hidden xl:block">
              <ul className="flex items-center">
                {NAV_ITEMS.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={active === id ? 'location' : undefined}
                      className={cx(
                        'group relative block rounded-md px-2.5 py-2 text-[0.84rem] font-semibold whitespace-nowrap transition-colors duration-200',
                        active === id ? 'text-primary' : 'text-muted hover:text-ink',
                      )}
                    >
                      {t.nav[id]}
                      <span
                        aria-hidden
                        className={cx(
                          'absolute inset-x-2.5 -bottom-0.5 h-[3px] rounded-full bg-vz-yellow transition-transform duration-300 ease-out-soft',
                          active === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50',
                        )}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={t.nav.open}
                className="inline-flex size-9 flex-col items-center justify-center gap-[5px] rounded-full border border-line text-ink transition-colors hover:border-vz-yellow xl:hidden"
              >
                <span className="h-0.5 w-4 rounded-full bg-current" />
                <span className="h-0.5 w-4 rounded-full bg-current ltr:translate-x-0.5 rtl:-translate-x-0.5" />
                <span className="h-0.5 w-4 rounded-full bg-current" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={open} active={active} onClose={close} />
    </>
  );
}

function MobileMenu({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: SectionId;
  onClose: (restoreFocus: boolean) => void;
}) {
  const { t } = useLocale();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose(true);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  return (
    <div
      className={cx(
        'fixed inset-0 z-50 transition-[visibility] duration-500 xl:hidden',
        open ? 'visible' : 'invisible',
      )}
      inert={!open}
    >
      <div
        onClick={() => onClose(true)}
        className={cx(
          'absolute inset-0 bg-vz-ink/45 backdrop-blur-[2px] transition-opacity duration-500',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        id="mobile-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.label}
        className={cx(
          'absolute inset-y-0 end-0 flex w-[min(86vw,22rem)] flex-col bg-surface shadow-2xl transition-transform duration-500 ease-out-soft',
          open ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full',
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-6">
          <span dir="ltr">
            <VizoraLogo className="h-10 w-auto" />
          </span>
          <button
            type="button"
            data-autofocus
            onClick={() => onClose(true)}
            aria-label={t.nav.close}
            className="relative inline-flex size-9 items-center justify-center rounded-full border border-line text-ink hover:border-vz-yellow"
          >
            <span className="absolute h-0.5 w-4 rotate-45 rounded-full bg-current" />
            <span className="absolute h-0.5 w-4 -rotate-45 rounded-full bg-current" />
          </button>
        </div>
        <nav aria-label={t.nav.label} className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="space-y-1">
            {NAV_ITEMS.map((id, i) => (
              <li
                key={id}
                className={cx(
                  'transition-[opacity,translate] duration-500 ease-out-soft',
                  open ? 'translate-x-0 opacity-100' : 'opacity-0 ltr:translate-x-4 rtl:-translate-x-4',
                )}
                style={{ transitionDelay: open ? `${80 + i * 35}ms` : '0ms' }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => onClose(false)}
                  aria-current={active === id ? 'location' : undefined}
                  className={cx(
                    'flex items-center gap-4 rounded-xl px-3 py-3 text-base font-semibold transition-colors',
                    active === id ? 'bg-primary-soft text-primary' : 'text-ink hover:bg-surface-2',
                  )}
                >
                  <span className="ltr text-xs font-bold text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {t.nav[id]}
                  {active === id && <span aria-hidden className="ms-auto h-2 w-2 rounded-full bg-vz-yellow" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div aria-hidden className="flex h-2">
          <span className="w-1/4 bg-vz-purple" />
          <span className="w-1/2 bg-vz-yellow" />
          <span className="w-1/4 bg-vz-purple" />
        </div>
      </div>
    </div>
  );
}
