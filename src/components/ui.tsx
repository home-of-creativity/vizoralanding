import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { publicUrl } from '../lib/site';

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-5 sm:px-8', className)}>{children}</div>;
}

/** Purple + yellow band above every section title, taken from the Company Profile page headers. */
export function SectionHeading({
  id,
  title,
  tone = 'default',
  align = 'start',
  className,
}: {
  id: string;
  title: string;
  tone?: 'default' | 'inverse';
  align?: 'start' | 'center';
  className?: string;
}) {
  return (
    <div data-reveal className={cx(align === 'center' && 'text-center', className)}>
      <div aria-hidden className={cx('mb-5 flex items-center gap-1.5', align === 'center' && 'justify-center')}>
        <span className={cx('h-1.5 w-8 rounded-full', tone === 'inverse' ? 'bg-white/40' : 'bg-vz-purple dark:bg-primary')} />
        <span className="h-1.5 w-14 rounded-full bg-vz-yellow" />
      </div>
      <h2
        id={id}
        className={cx(
          'text-[2rem] leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]',
          tone === 'inverse' ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
    </div>
  );
}

/** Responsive WebP from public/images (`name.webp` 1280w, `name-sm.webp` 768w). */
export function Photo({
  name,
  alt,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <img
      src={publicUrl(`/images/${name}.webp`)}
      srcSet={`${publicUrl(`/images/${name}-sm.webp`)} 768w, ${publicUrl(`/images/${name}.webp`)} 1280w`}
      sizes={sizes}
      width={1280}
      height={720}
      loading="lazy"
      decoding="async"
      alt={alt}
      className={cx('h-full w-full object-cover', className)}
    />
  );
}
