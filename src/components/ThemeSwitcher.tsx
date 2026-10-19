import { Moon, Sun } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { cx } from '../lib/cx';
import { useTheme } from '../theme/ThemeContext';

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? t.controls.toLight : t.controls.toDark}
      title={dark ? t.controls.toLight : t.controls.toDark}
      className={cx(
        'relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-line text-primary transition-colors duration-200 hover:border-vz-yellow hover:text-ink',
        className,
      )}
    >
      {dark ? <Sun aria-hidden className="size-[18px]" /> : <Moon aria-hidden className="size-[18px]" />}
    </button>
  );
}
