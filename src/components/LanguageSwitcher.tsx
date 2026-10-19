import { Fragment, type MouseEvent } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { LOCALES, type Locale } from '../i18n/types';
import { cx } from '../lib/cx';

const NAMES: Record<Locale, string> = { ar: 'العربية', en: 'English' };

/** AR | EN — real links to the alternate-language URLs, switched client-side. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t, switchLocale } = useLocale();

  const go = (e: MouseEvent<HTMLAnchorElement>, next: Locale) => {
    e.preventDefault();
    switchLocale(next);
  };

  return (
    <nav aria-label={t.controls.language} dir="ltr" className={cx('flex items-center text-xs font-bold', className)}>
      {LOCALES.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && (
            <span aria-hidden className="px-0.5 text-muted/50">
              |
            </span>
          )}
          <a
            href={`/${l}`}
            hrefLang={l}
            lang={l}
            aria-label={NAMES[l]}
            aria-current={locale === l ? 'true' : undefined}
            onClick={(e) => go(e, l)}
            className={cx(
              'inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2 tracking-wide transition-colors duration-200',
              locale === l ? 'bg-vz-yellow text-vz-ink' : 'text-muted hover:text-primary',
            )}
          >
            {l.toUpperCase()}
          </a>
        </Fragment>
      ))}
    </nav>
  );
}
