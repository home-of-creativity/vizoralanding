import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { CONTACT } from '../content/company';
import { useLocale } from '../i18n/LocaleContext';
import { NAV_ITEMS } from './Navbar';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { Container } from './ui';
import { VizoraLogo } from './VizoraLogo';

export function Footer() {
  const { t } = useLocale();
  const links = NAV_ITEMS.filter((id) => id !== 'home');

  return (
    <footer className="relative bg-vz-purple-deep text-white dark:bg-band-2">
      <div aria-hidden className="flex h-1.5">
        <span className="w-1/5 bg-vz-purple dark:bg-band" />
        <span className="flex-1 bg-vz-yellow" />
        <span className="w-1/12 bg-vz-purple dark:bg-band" />
      </div>
      <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr_1fr]">
        <div>
          <a href="#home" aria-label="VIZORA" className="logo-hover inline-block" dir="ltr">
            <VizoraLogo className="h-14 w-auto [&_.fill-logo]:fill-white" />
          </a>
        </div>

        <nav aria-label={t.nav.label}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {links.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-sm font-medium text-white/75 transition-colors hover:text-vz-yellow">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-3.5 text-sm text-white/80">
          <li className="flex items-center gap-3">
            <MapPin aria-hidden className="size-4 shrink-0 text-vz-yellow" />
            {t.contact.location}
          </li>
          <li className="flex items-center gap-3">
            <Mail aria-hidden className="size-4 shrink-0 text-vz-yellow" />
            <a href={`mailto:${CONTACT.email}`} dir="ltr" className="ltr hover:text-vz-yellow">
              {CONTACT.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex shrink-0 items-center gap-1 text-vz-yellow">
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label={`Facebook ${CONTACT.social}`} className="hover:text-white">
                <FacebookIcon className="size-4" />
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${CONTACT.social}`} className="hover:text-white">
                <InstagramIcon className="size-4" />
              </a>
            </span>
            <span dir="ltr" className="ltr">
              {CONTACT.social}
            </span>
          </li>
        </ul>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex items-center justify-between gap-4 py-5 text-xs text-white/55">
          <p dir="ltr">© {new Date().getFullYear()} VIZORA</p>
          <a
            href="#home"
            aria-label={t.controls.backToTop}
            title={t.controls.backToTop}
            className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-vz-yellow hover:text-vz-yellow"
          >
            <ArrowUp aria-hidden className="size-4" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
