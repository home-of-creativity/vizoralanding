import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LogoAnimation } from './components/LogoAnimation';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { AboutSection } from './components/sections/AboutSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ClientsSection } from './components/sections/ClientsSection';
import { ContactSection } from './components/sections/ContactSection';
import { MissionSection } from './components/sections/MissionSection';
import { ObjectivesSection } from './components/sections/ObjectivesSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { VisionSection } from './components/sections/VisionSection';
import { WhyVizoraSection } from './components/sections/WhyVizoraSection';
import { useLocale } from './i18n/LocaleContext';
import { cx } from './lib/cx';
import { ScrollTrigger } from './lib/motion';
import { useDocumentMeta } from './lib/useDocumentMeta';

export default function App() {
  const { locale, t, switching } = useLocale();
  const [showIntro, setShowIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useDocumentMeta(locale, t);

  // Text length and direction change with the locale, so trigger positions must be recomputed.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [locale]);

  const finishIntro = () => setShowIntro(false);

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-3 z-[60] -translate-y-20 rounded-full bg-vz-yellow px-4 py-2 text-sm font-bold text-vz-ink transition-transform focus:translate-y-0"
      >
        {t.controls.skip}
      </a>
      <ScrollProgress />
      <Navbar visible={revealed} />
      <div className={cx('locale-stage', switching && 'is-switching')}>
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero play={revealed} />
          <AboutSection />
          <VisionSection />
          <ObjectivesSection />
          <MissionSection />
          <ServicesSection />
          <AchievementsSection />
          <WhyVizoraSection />
          <ClientsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      {showIntro && <LogoAnimation onReveal={() => setRevealed(true)} onDone={finishIntro} />}
    </>
  );
}
