import { useEffect } from 'react';
import { CONTACT } from '../content/company';
import type { Dictionary, Locale } from '../i18n/types';
import { localeHref, publicUrl, siteBase } from './site';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Locale-aware title, description, Open Graph, hreflang and Organization JSON-LD. */
export function useDocumentMeta(locale: Locale, t: Dictionary) {
  useEffect(() => {
    const origin = window.location.origin;
    const home = `${origin}${siteBase()}/`;
    document.title = t.meta.title;
    setMeta('meta[name="description"]', 'name', 'description', t.meta.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', t.meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', t.meta.description);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', t.meta.ogLocale);
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${origin}${localeHref(locale)}`);
    setLink('canonical', `${origin}${localeHref(locale)}`);
    setLink('alternate', `${origin}${localeHref('ar')}`, 'ar');
    setLink('alternate', `${origin}${localeHref('en')}`, 'en');
    setLink('alternate', home, 'x-default');

    let ld = document.getElementById('org-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'org-jsonld';
      ld.setAttribute('type', 'application/ld+json');
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'VIZORA',
      url: `${origin}${localeHref(locale)}`,
      logo: `${origin}${publicUrl('/images/vizora-mock.svg')}`,
      description: t.meta.description,
      foundingDate: '2019',
      email: CONTACT.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Damascus', addressCountry: 'SY' },
    });
  }, [locale, t]);
}
