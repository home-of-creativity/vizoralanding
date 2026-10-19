import { Mail, MapPin, Phone, Send, type LucideIcon } from 'lucide-react';
import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CONTACT } from '../../content/company';
import { useLocale } from '../../i18n/LocaleContext';
import { useReveal } from '../../lib/motion';
import { FacebookIcon, InstagramIcon } from '../SocialIcons';
import { Container, SectionHeading } from '../ui';

function InfoRow({ icon: Icon, label, children }: { icon?: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4">
      {Icon && (
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-vz-yellow">
          <Icon aria-hidden className="size-5" />
        </span>
      )}
      <div className="min-w-0">
        <p className="text-xs font-semibold text-white/60">{label}</p>
        <div className="mt-0.5 text-base font-semibold break-words text-white sm:text-lg">{children}</div>
      </div>
    </li>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactSection() {
  const { t } = useLocale();
  const f = t.contact.form;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [key]: e.target.value }));

  // No mail server ships with this site: the visitor's own mail app sends the message.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `${f.subject} ${values.name}`.trim();
    const body = [
      `${f.name}: ${values.name}`,
      `${f.email}: ${values.email}`,
      ...(values.phone ? [`${f.phone}: ${values.phone}`] : []),
      '',
      values.message,
    ].join('\n');
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[58%] hidden h-14 lg:flex">
        <span className="w-[22%] bg-vz-purple dark:bg-band" />
        <span className="flex-1 bg-vz-yellow" />
        <span className="w-[10%] bg-vz-purple dark:bg-band" />
      </div>

      <Container className="relative">
        <SectionHeading id="contact-title" title={t.contact.title} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div data-reveal className="relative overflow-hidden rounded-3xl bg-vz-purple p-7 text-white shadow-[var(--shadow-lift)] sm:p-10 dark:bg-band">
            <div aria-hidden className="absolute -end-10 -top-10 h-32 w-32 rounded-3xl bg-vz-yellow/90 ltr:rotate-[24deg] rtl:-rotate-[24deg]" />
            <p dir="ltr" className="relative text-3xl font-extrabold tracking-tight rtl:text-right">
              VIZORA
            </p>
            <span aria-hidden className="relative mt-3 block h-1 w-14 rounded-full bg-vz-yellow" />
            <ul className="relative mt-8 space-y-6">
              <InfoRow icon={Phone} label={t.contact.labels.phone}>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} dir="ltr" className="ltr hover:text-vz-yellow">
                  {CONTACT.phone}
                </a>
              </InfoRow>
              <InfoRow icon={Mail} label={t.contact.labels.email}>
                <a href={`mailto:${CONTACT.email}`} dir="ltr" className="ltr hover:text-vz-yellow">
                  {CONTACT.email}
                </a>
              </InfoRow>
              <InfoRow icon={MapPin} label={t.contact.labels.location}>
                {t.contact.location}
              </InfoRow>
              <li className="flex items-center gap-4">
                <span className="flex shrink-0 items-center gap-1.5">
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Facebook ${CONTACT.social}`}
                    className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-vz-yellow transition-colors hover:bg-vz-yellow hover:text-vz-ink"
                  >
                    <FacebookIcon className="size-5" />
                  </a>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram ${CONTACT.social}`}
                    className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-vz-yellow transition-colors hover:bg-vz-yellow hover:text-vz-ink"
                  >
                    <InstagramIcon className="size-5" />
                  </a>
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white/60">{t.contact.labels.social}</p>
                  <p dir="ltr" className="ltr mt-0.5 text-base font-semibold text-white sm:text-lg">
                    {CONTACT.social}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <form data-reveal onSubmit={submit} className="card relative p-7 sm:p-10" aria-labelledby="contact-form-title">
            <h3 id="contact-form-title" className="text-xl font-bold text-ink">
              {f.title}
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id="c-name" label={f.name}>
                <input id="c-name" name="name" required autoComplete="name" className="field" value={values.name} onChange={set('name')} />
              </Field>
              <Field id="c-email" label={f.email}>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  dir="ltr"
                  className="field rtl:text-right"
                  value={values.email}
                  onChange={set('email')}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field id="c-phone" label={f.phone}>
                  <input
                    id="c-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    dir="ltr"
                    className="field rtl:text-right"
                    value={values.phone}
                    onChange={set('phone')}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="c-message" label={f.message}>
                  <textarea id="c-message" name="message" required rows={5} className="field resize-y" value={values.message} onChange={set('message')} />
                </Field>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary group">
                {f.submit}
                <Send
                  aria-hidden
                  className="size-4 transition-transform duration-300 rtl:-scale-x-100 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                />
              </button>
              <p className="max-w-xs text-xs leading-relaxed text-muted">{f.note}</p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
