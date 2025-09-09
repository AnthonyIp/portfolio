import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import { Projects } from './components/projects/Projects';
import { Contact } from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import BackToTop from './components/BackToTop';
import { useLocalStorage } from './hooks';
import { useLenis } from './hooks/useLenis';
import type { Language } from './types';
import { useEffect, useMemo, useState } from 'react';

export default function App() {
  // Initialiser Lenis pour le scroll fluide
  useLenis();
  
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    'theme-dark',
    true
  );
  // default FR; if no saved language, detect browser -> fr else en
  const [language, setLanguage] = useLocalStorage<Language>('lang', 'fr');
  const [t, setT] = useState<any>({});
  const isFr = language === 'fr';
  const [timelineRaw, setTimelineRaw] = useState<any[]>([]);
  const [projectsRaw, setProjectsRaw] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (!saved) {
      const nav = (
        navigator.language ||
        navigator.languages?.[0] ||
        'en'
      ).toLowerCase();
      const detected = nav.startsWith('fr') ? 'fr' : 'en';
      setLanguage(detected as Language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load i18n and data JSON from public
  useEffect(() => {
    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        // Charger les données en parallèle
        const [i18nResponse, timelineResponse, projectsResponse] =
          await Promise.all([
            fetch('/datas/i18n.json'),
            fetch('/datas/data-timeline.json'),
            fetch('/datas/data-projects.json'),
          ]);

        if (!i18nResponse.ok || !timelineResponse.ok || !projectsResponse.ok) {
          throw new Error('Erreur lors du chargement des données');
        }

        const [i18nData, timelineData, projectsData] = await Promise.all([
          i18nResponse.json(),
          timelineResponse.json(),
          projectsResponse.json(),
        ]);

        setT(i18nData[language] || i18nData['fr'] || {});
        setTimelineRaw(timelineData.timeline || []);
        setProjectsRaw(projectsData.projects || []);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        setLoading(false);
      }
    };

    loadData();
  }, [language]);

  const timelineData = useMemo(() => {
    return (timelineRaw || []).map((item: any) => ({
      type: item.type,
      year: item.year,
      title:
        language === 'fr'
          ? item.title_fr || item.title_en
          : item.title_en || item.title_fr,
      institution:
        language === 'fr'
          ? item.institution_fr || item.institution || item.institution_en
          : item.institution_en || item.institution || item.institution_fr,
      location:
        language === 'fr'
          ? item.location_fr || item.location_en
          : item.location_en || item.location_fr,
      description:
        language === 'fr'
          ? item.description_fr || item.description_en
          : item.description_en || item.description_fr,
      tech: Array.isArray(item.tech) ? item.tech : [],
      skills: Array.isArray(item.skills) ? item.skills : [],
    }));
  }, [timelineRaw, language]);

  const projects = useMemo(() => {
    return (projectsRaw || []).map((p: any) => ({
      title_fr: p.title_fr,
      title_en: p.title_en,
      description_fr: p.description_fr,
      description_en: p.description_en,
      tech: p.tech || [],
      image: p.image,
      github: p.github,
      live: p.live,
      category: p.category,
      features_fr: p.features_fr || [],
      features_en: p.features_en || [],
      duration_fr: p.duration_fr,
      duration_en: p.duration_en,
      team_fr: p.team_fr,
      team_en: p.team_en,
      role_fr: p.role_fr,
      role_en: p.role_en,
      challenges_fr: p.challenges_fr,
      challenges_en: p.challenges_en,
      longDescription_fr: p.longDescription_fr,
      longDescription_en: p.longDescription_en,
    }));
  }, [projectsRaw]);

  // Inject dynamic hreflang alternates and canonical
  useEffect(() => {
    const head = document.head;

    // Supprimer les liens existants pour éviter les doublons
    const existingAlternates = Array.from(
      head.querySelectorAll('link[rel="alternate"][hreflang]')
    );
    const existingCanonical = Array.from(
      head.querySelectorAll('link[rel="canonical"]')
    );

    existingAlternates.forEach(el => el.parentElement?.removeChild(el));
    existingCanonical.forEach(el => el.parentElement?.removeChild(el));

    // Ajouter le lien canonical
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.origin + window.location.pathname;
    head.appendChild(canonical);

    // Ajouter les liens hreflang
    const basePath = window.location.origin;
    const en = document.createElement('link');
    en.rel = 'alternate';
    en.hreflang = 'en';
    en.href = basePath;
    head.appendChild(en);

    const fr = document.createElement('link');
    fr.rel = 'alternate';
    fr.hreflang = 'fr';
    fr.href = basePath + '/fr';
    head.appendChild(fr);

    console.log('✅ Liens canonical et hreflang ajoutés dynamiquement');
  }, [language]);

  const navFallback = {
    home: '',
    about: '',
    timeline: '',
    projects: '',
    contact: '',
  };

  // Afficher un indicateur de chargement si les données ne sont pas encore chargées
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      >
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-xl'>Chargement...</p>
        </div>
      </div>
    );
  }

  // Afficher un message d'erreur si il y a un problème
  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      >
        <div className='text-center'>
          <p className='text-xl text-red-500 mb-4'>
            Erreur de chargement des données
          </p>
          <p className='text-gray-500'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen transition-all duration-500 ease-in-out ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
      lang={language}
    >
      <ParticlesBackground isDarkMode={isDarkMode} />
      <div className='relative z-10'>
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={v => setIsDarkMode(v)}
          language={language}
          setLanguage={l => setLanguage(l)}
          labels={t.nav || navFallback}
        />
        <main id='home' role='main'>
          <Hero
            isDarkMode={isDarkMode}
            title={t.hero?.title}
            subtitle={t.hero?.subtitle}
            ctaView={t.hero?.viewWork}
            ctaContact={t.hero?.getInTouch}
            onViewClick={() => {
              const element = document.getElementById('projects');
              if (element) {
                if (window.lenis) {
                  window.lenis.scrollTo(element, { offset: -80 });
                } else {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            onContactClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                if (window.lenis) {
                  window.lenis.scrollTo(element, { offset: -80 });
                } else {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          />
          <About
            isDarkMode={isDarkMode}
            title={t.about?.title}
            subtitle={t.about?.subtitle}
            description1={t.about?.description1}
            description2={t.about?.description2}
            stats={{
              projects: t.about?.projects,
              experience: t.about?.experience,
              clients: t.about?.clients,
            }}
            labels={{
              backend: t.about?.backend,
              backendDesc: t.about?.backendDesc,
              frontend: t.about?.frontend,
              frontendDesc: t.about?.frontendDesc,
              database: t.about?.database,
              databaseDesc: t.about?.databaseDesc,
            }}
          />
          <Timeline
            isDarkMode={isDarkMode}
            title={t.timeline?.title}
            subtitle={t.timeline?.subtitle}
            items={timelineData}
          />
          <Projects
            isDarkMode={isDarkMode}
            title={t.projects?.title}
            subtitle={t.projects?.subtitle}
            allLabel={t.projects?.allProjects}
            projects={projects}
            language={language}
          />
          <Contact
            isDarkMode={isDarkMode}
            title={t.contact?.title}
            subtitle={t.contact?.subtitle}
            isFr={isFr}
          />
        </main>
        <Footer isDarkMode={isDarkMode} text={t.footer || ''} />
        <BackToTop isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
