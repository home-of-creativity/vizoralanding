import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { appPath, localeHref } from '../lib/site';
import ar from './locales/ar';
import en from './locales/en';
import type { Dictionary, Locale } from './types';

const STORAGE_KEY = 'vizora.locale';
const FADE_MS = 200;
const dictionaries: Record<Locale, Dictionary> = { ar, en };

interface LocaleValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  t: Dictionary;
  switching: boolean;
  switchLocale: (next: Locale) => void;
}

const LocaleContext = createContext<LocaleValue | null>(null);

function localeFromPath(pathname: string): Locale | null {
  const path = appPath(pathname);
  return path === '/en' ? 'en' : path === '/ar' ? 'ar' : null;
}

/** The inline script in index.html already resolved path → storage → browser → Arabic. */
function initialLocale(): Locale {
  return document.documentElement.lang === 'en' ? 'en' : 'ar';
}

/** Section closest to the top of the viewport, so the reader stays in place across a language switch. */
function currentAnchor() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
  let anchor: HTMLElement | null = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 120) anchor = section;
  }
  return anchor ? { id: anchor.id, top: anchor.getBoundingClientRect().top } : null;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [switching, setSwitching] = useState(false);
  const anchorRef = useRef<{ id: string; top: number } | null>(null);
  const busy = useRef(false);

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* storage unavailable */
    }
    const anchor = anchorRef.current;
    anchorRef.current = null;
    if (anchor) {
      const el = document.getElementById(anchor.id);
      if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - anchor.top, behavior: 'instant' });
    }
  }, [locale]);

  useEffect(() => {
    if (localeFromPath(location.pathname) !== locale) {
      history.replaceState(null, '', `${localeHref(locale)}${location.hash}`);
    }
    const onPop = () => {
      const fromPath = localeFromPath(location.pathname);
      if (fromPath) setLocale(fromPath);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale || busy.current) return;
      const commit = () => {
        anchorRef.current = currentAnchor();
        history.pushState(null, '', `${localeHref(next)}${location.hash}`);
        setLocale(next);
      };
      if (prefersReducedMotion()) {
        commit();
        return;
      }
      busy.current = true;
      setSwitching(true);
      window.setTimeout(() => {
        commit();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setSwitching(false);
            busy.current = false;
          }),
        );
      }, FADE_MS);
    },
    [locale],
  );

  const value = useMemo<LocaleValue>(
    () => ({ locale, dir: locale === 'ar' ? 'rtl' : 'ltr', t: dictionaries[locale], switching, switchLocale }),
    [locale, switching, switchLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx;
}
