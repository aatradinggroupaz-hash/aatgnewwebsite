/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  Menu as MenuIcon, 
  X as CloseIcon, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';

// Dil kodları və məlumatları
type LanguageKey = 'az' | 'en' | 'ru' | 'tr' | 'fr';

interface LanguageOption {
  code: LanguageKey;
  label: string;
  name: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'az', label: 'AZE', name: 'Azərbaycan' },
  { code: 'en', label: 'ENG', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ru', label: 'RUS', name: 'Русский' },
  { code: 'tr', label: 'TR', name: 'Türkçe' },
];

// Dəqiq tərcümə lüğəti
interface Translations {
  menu: {
    about: string;
    delabie: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    button: string;
  };
  about: {
    title: string;
    text: string;
  };
  delabie: {
    title: string;
    text: string;
    button: string;
  };
  contact: {
    title: string;
    phoneLabel: string;
    emailLabel: string;
  };
  footer: {
    copyright: string;
  };
}

const TRANSLATIONS: Record<LanguageKey, Translations> = {
  az: {
    menu: {
      about: 'Haqqımızda',
      delabie: 'Delabie',
      contact: 'Əlaqə',
    },
    hero: {
      title: '"AA TRADING GROUP" MMC',
      subtitle: 'Etibarlı tərəfdaşlıq və keyfiyyətli məhsul təchizatı',
      button: 'Əlaqə',
    },
    about: {
      title: 'Haqqımızda',
      text: '2020-ci ildə təsis edilmiş “AA Trading Group” MMC beynəlxalq ticarət, sənaye avadanlıqlarının təchizatı, satınalma və layihələrin təminatı sahələrində fəaliyyət göstərir. Şirkət həm kommersiya, həm də dövlət sifarişçiləri ilə əməkdaşlıq təcrübəsinə malikdir.',
    },
    delabie: {
      title: 'DELABIE',
      text: 'Fəaliyyətimizin əsas istiqamətlərindən biri 1928-ci ildən fəaliyyət göstərən Fransa brendi DELABIE-nin Azərbaycanda rəsmi nümayəndəliyidir. DELABIE ictimai və kommersiya obyektləri üçün yüksək davamlılığa malik sanitar-texniki avadanlıqlar və su sərfiyyatının idarə olunması üzrə həllər təqdim edir.',
      button: 'Daha ətraflı',
    },
    contact: {
      title: 'Əlaqə',
      phoneLabel: 'Telefon',
      emailLabel: 'E-poçt',
    },
    footer: {
      copyright: '© 2026 AA TRADING GROUP MMC. Bütün hüquqlar qorunur.',
    },
  },
  en: {
    menu: {
      about: 'About Us',
      delabie: 'Delabie',
      contact: 'Contact',
    },
    hero: {
      title: '"AA TRADING GROUP" LLC',
      subtitle: 'Reliable partnership and quality product supply',
      button: 'Contact',
    },
    about: {
      title: 'About Us',
      text: 'Established in 2020, “AA Trading Group” LLC operates in the fields of international trade, supply of industrial equipment, procurement, and project support. The company has experience in cooperating with both commercial and government clients.',
    },
    delabie: {
      title: 'DELABIE',
      text: 'One of our key areas of activity is serving as the official representative in Azerbaijan of the French brand DELABIE, which has been operating since 1928. DELABIE offers highly durable sanitary equipment and water consumption management solutions for public and commercial facilities.',
      button: 'Learn more',
    },
    contact: {
      title: 'Contact',
      phoneLabel: 'Phone',
      emailLabel: 'E-mail',
    },
    footer: {
      copyright: '© 2026 AA TRADING GROUP LLC. All rights reserved.',
    },
  },
  ru: {
    menu: {
      about: 'О нас',
      delabie: 'Delabie',
      contact: 'Контакты',
    },
    hero: {
      title: 'ООО «AA TRADING GROUP»',
      subtitle: 'Надёжное партнёрство и поставки качественной продукции',
      button: 'Контакты',
    },
    about: {
      title: 'О нас',
      text: 'Компания ООО «AA Trading Group», основанная в 2020 году, осуществляет деятельность в сферах международной торговли, поставок промышленного оборудования, закупок и обеспечения проектов. Компания имеет опыт сотрудничества как с коммерческими, так и с государственными заказчиками.',
    },
    delabie: {
      title: 'DELABIE',
      text: 'Одним из основных направлений нашей деятельности является официальное представительство в Азербайджане французского бренда DELABIE, работающего с 1928 года. DELABIE предлагает для общественных и коммерческих объектов высокопрочное сантехническое оборудование и решения по управлению расходом воды.',
      button: 'Подробнее',
    },
    contact: {
      title: 'Контакты',
      phoneLabel: 'Телефон',
      emailLabel: 'Эл. почта',
    },
    footer: {
      copyright: '© 2026 ООО «AA TRADING GROUP». Все права защищены.',
    },
  },
  tr: {
    menu: {
      about: 'Hakkımızda',
      delabie: 'Delabie',
      contact: 'İletişim',
    },
    hero: {
      title: '"AA TRADING GROUP" Ltd. Şti.',
      subtitle: 'Güvenilir iş ortaklığı ve kaliteli ürün tedariki',
      button: 'İletişim',
    },
    about: {
      title: 'Hakkımızda',
      text: '2020 yılında kurulan “AA Trading Group” Ltd. Şti.; uluslararası ticaret, endüstriyel ekipman tedariki, satın alma ve proje desteği alanlarında faaliyet göstermektedir. Şirket, hem ticari hem de kamu müşterileriyle iş birliği deneyimine sahiptir.',
    },
    delabie: {
      title: 'DELABIE',
      text: 'Faaliyetlerimizin temel alanlarından biri, 1928 yılından bu yana faaliyet gösteren Fransız markası DELABIE’nin Azerbaycan’daki resmi temsilciliğidir. DELABIE, kamu ve ticari tesisler için yüksek dayanıklılığa sahip sıhhi tesisat ekipmanları ile su tüketiminin yönetimine yönelik çözümler sunmaktadır.',
      button: 'Daha fazla bilgi',
    },
    contact: {
      title: 'İletişim',
      phoneLabel: 'Telefon',
      emailLabel: 'E-posta',
    },
    footer: {
      copyright: '© 2026 AA TRADING GROUP Ltd. Şti. Tüm hakları saklıdır.',
    },
  },
  fr: {
    menu: {
      about: 'À propos',
      delabie: 'Delabie',
      contact: 'Contact',
    },
    hero: {
      title: '"AA TRADING GROUP" LLC',
      subtitle: 'Partenariat fiable et fourniture de produits de qualité',
      button: 'Contact',
    },
    about: {
      title: 'À propos',
      text: "Fondée en 2020, la société « AA Trading Group » LLC opère dans les domaines du commerce international, de la fourniture d'équipements industriels, de l'approvisionnement et du soutien aux projets. L'entreprise possède une solide expérience de coopération avec des clients commerciaux et gouvernementaux.",
    },
    delabie: {
      title: 'DELABIE',
      text: "L'un de nos principaux domaines d'activité est la représentation officielle en Azerbaïdjan de la marque française DELABIE, en activité depuis 1928. DELABIE propose des équipements sanitaires hautement durables et des solutions de gestion de la consommation d'eau pour les établissements publics et commerciaux.",
      button: 'En savoir plus',
    },
    contact: {
      title: 'Contact',
      phoneLabel: 'Téléphone',
      emailLabel: 'E-mail',
    },
    footer: {
      copyright: '© 2026 AA TRADING GROUP LLC. Tous droits réservés.',
    },
  },
};

export default function App() {
  // Seçilmiş dil vəziyyəti (defolt: 'az')
  const [lang, setLang] = useState<LanguageKey>(() => {
    const saved = localStorage.getItem('aatg_lang') as LanguageKey;
    if (saved && ['az', 'en', 'ru', 'tr', 'fr'].includes(saved)) {
      return saved;
    }
    return 'az';
  });

  // Dil menyusunun (dropdown) açıq/qapalı vəziyyəti
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Mobil menyunun açıq/qapalı vəziyyəti
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Aktiv bölmə indikatoru
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Dil dəyişdikdə localStorage və html lang atributunu yeniləmək
  useEffect(() => {
    localStorage.setItem('aatg_lang', lang);
    document.documentElement.lang = lang;
    document.title = 'AATG';
  }, [lang]);

  // Dropdown xaricində klik edildikdə dropdown-u bağlamaq
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Aktiv bölməni skrola əsasən müəyyən etmək
  useEffect(() => {
    const sections = ['hero', 'haqqimizda', 'delabie', 'elaqe'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 90;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = TRANSLATIONS[lang];
  const currentLangOption = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Sürüşmə (smooth scroll) funksiyası
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF3F8] text-slate-900 flex flex-col font-sans selection:bg-[#0C1A2E] selection:text-white antialiased">
      {/* =========================================================
          HEADER (Sabit / Sticky Glassmorphism)
      ========================================================== */}
      <header className="sticky top-0 z-50 bg-[#EEF3F8]/95 backdrop-blur-md border-b border-[#0C1A2E]/10 shadow-2xs transition-all duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* SOL: Şirkət Loqosu */}
          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, 'hero')}
            className="flex items-center gap-2.5 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0C1A2E] rounded-md p-1 -ml-1 transition-opacity"
            aria-label="AA TRADING GROUP"
          >
            <img 
              src="/assets/aistudio/Logo_AATG_3191a6e0.jpg" 
              alt="AA TRADING GROUP" 
              className="h-9 sm:h-10 w-auto max-w-[170px] sm:max-w-[210px] object-contain rounded-sm shadow-2xs group-hover:opacity-95 transition-opacity"
            />
            <span className="text-[10px] font-semibold text-slate-600 tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/80 border border-slate-300/70 hidden sm:inline-block">
              {lang === 'az' ? 'MMC' : lang === 'ru' ? 'ООО' : lang === 'tr' ? 'Ltd. Şti.' : lang === 'fr' ? 'SARL' : 'LLC'}
            </span>
          </a>

          {/* ORTA/SAĞ: Desktop Naviqasiya Menyusu */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Əsas Menyu">
            <a
              href="#haqqimizda"
              onClick={(e) => scrollToSection(e, 'haqqimizda')}
              data-i18n="menu.about"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeSection === 'haqqimizda'
                  ? 'text-[#0C1A2E] font-semibold bg-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {t.menu.about}
            </a>

            <a
              href="#delabie"
              onClick={(e) => scrollToSection(e, 'delabie')}
              data-i18n="menu.delabie"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeSection === 'delabie'
                  ? 'text-[#0C1A2E] font-semibold bg-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {t.menu.delabie}
            </a>

            <a
              href="#elaqe"
              onClick={(e) => scrollToSection(e, 'elaqe')}
              data-i18n="menu.contact"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeSection === 'elaqe'
                  ? 'text-[#0C1A2E] font-semibold bg-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {t.menu.contact}
            </a>
          </nav>

          {/* ƏN SAĞ: Dil Seçimi Dropdown və Mobil Menyu Düyməsi */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Dil Dəyişdirmə Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:border-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0C1A2E] transition-all cursor-pointer shadow-2xs"
                aria-expanded={isLangMenuOpen}
                aria-haspopup="true"
                aria-label="Dil seçimi"
              >
                <span>{currentLangOption.label}</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    isLangMenuOpen ? 'rotate-180 text-[#0C1A2E]' : ''
                  }`} 
                />
              </button>

              {/* Dil menyusu siyahısı */}
              {isLangMenuOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-36 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                  role="menu"
                >
                  {LANGUAGES.map((item) => {
                    const isSelected = item.code === lang;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLang(item.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#EEF3F8] text-[#0C1A2E] font-semibold'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        role="menuitem"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-8 font-mono font-medium text-xs text-slate-500">
                            {item.label}
                          </span>
                          <span>{item.name}</span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#0C1A2E]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobil Menyu Aç/Bağla Düyməsi */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#0C1A2E] transition-colors"
              aria-label={isMobileMenuOpen ? 'Menyunu bağla' : 'Menyunu aç'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobil Açılan Menyu Paneli */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#0C1A2E]/10 bg-[#EEF3F8] px-4 pt-2 pb-3 space-y-1 shadow-md">
            <a
              href="#haqqimizda"
              onClick={(e) => scrollToSection(e, 'haqqimizda')}
              data-i18n="menu.about"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'haqqimizda'
                  ? 'bg-white text-[#0C1A2E] font-semibold shadow-2xs'
                  : 'text-slate-700 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              {t.menu.about}
            </a>
            <a
              href="#delabie"
              onClick={(e) => scrollToSection(e, 'delabie')}
              data-i18n="menu.delabie"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'delabie'
                  ? 'bg-white text-[#0C1A2E] font-semibold shadow-2xs'
                  : 'text-slate-700 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              {t.menu.delabie}
            </a>
            <a
              href="#elaqe"
              onClick={(e) => scrollToSection(e, 'elaqe')}
              data-i18n="menu.contact"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'elaqe'
                  ? 'bg-white text-[#0C1A2E] font-semibold shadow-2xs'
                  : 'text-slate-700 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              {t.menu.contact}
            </a>
          </div>
        )}
      </header>

      {/* =========================================================
          ƏSAS MƏZMUN (Main Content - Kompakt və Yığcam Məsafələr)
      ========================================================== */}
      <main className="grow">
        
        {/* 1) HERO BÖLMƏSİ */}
        <section 
          id="hero" 
          className="relative pt-8 pb-9 sm:pt-11 sm:pb-12 border-b border-[#0C1A2E]/8"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Hero Başlıq */}
            <h1 
              data-i18n="hero.title" 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              {t.hero.title}
            </h1>

            {/* Hero Alt Başlıq */}
            <p 
              data-i18n="hero.subtitle" 
              className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
            >
              {t.hero.subtitle}
            </p>

            {/* Hero Düyməsi */}
            <div className="mt-5 flex justify-center">
              <a
                href="#elaqe"
                onClick={(e) => scrollToSection(e, 'elaqe')}
                data-i18n="hero.button"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#0C1A2E] text-white font-medium text-sm shadow-sm hover:bg-[#162740] focus:outline-hidden focus:ring-2 focus:ring-[#0C1A2E] focus:ring-offset-2 transition-all cursor-pointer group hover:shadow-md"
              >
                <span>{t.hero.button}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>
        </section>

        {/* 2) HAQQIMIZDA BÖLMƏSİ */}
        <section 
          id="haqqimizda" 
          className="py-5 sm:py-7 border-b border-[#0C1A2E]/8"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-8 h-8 rounded-md bg-[#0C1A2E]/5 border border-[#0C1A2E]/10 flex items-center justify-center text-[#0C1A2E]">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 
                  data-i18n="about.title" 
                  className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
                >
                  {t.about.title}
                </h2>
              </div>
              <p 
                data-i18n="about.text" 
                className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
              >
                {t.about.text}
              </p>
            </div>
          </div>
        </section>

        {/* 3) DELABIE BÖLMƏSİ */}
        <section 
          id="delabie" 
          className="py-5 sm:py-7 border-b border-[#0C1A2E]/8"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3.5 border-b border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-[#0C1A2E]/5 border border-[#0C1A2E]/10 flex items-center justify-center text-[#0C1A2E]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {lang === 'az' ? 'Rəsmi Nümayəndəlik' : lang === 'ru' ? 'Официальное представительство' : lang === 'tr' ? 'Resmi Temsilcilik' : lang === 'fr' ? 'Représentation Officielle' : 'Official Representative'}
                    </span>
                    <h2 
                      data-i18n="delabie.title" 
                      className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
                    >
                      {t.delabie.title}
                    </h2>
                  </div>
                </div>

                <div className="shrink-0 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium text-slate-700 bg-slate-50 rounded-full border border-slate-200 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0C1A2E]" />
                    <span>France · 1928</span>
                  </span>
                </div>
              </div>

              <p 
                data-i18n="delabie.text" 
                className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-5"
              >
                {t.delabie.text}
              </p>

              <div>
                <a
                  href="https://www.delabie.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-i18n="delabie.button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#0C1A2E] text-[#0C1A2E] hover:bg-[#0C1A2E] hover:text-white font-medium text-xs sm:text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-[#0C1A2E] focus:ring-offset-2 cursor-pointer shadow-2xs group"
                >
                  <span>{t.delabie.button}</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* 4) ƏLAQƏ BÖLMƏSİ */}
        <section 
          id="elaqe" 
          className="py-5 sm:py-8"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              data-i18n="contact.title" 
              className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-5 text-center sm:text-left"
            >
              {t.contact.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              
              {/* Telefon Kartı 1 */}
              <a
                href="tel:+994124898080"
                className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0C1A2E] hover:shadow-xs transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 text-[#0C1A2E] group-hover:bg-[#0C1A2E] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span 
                    data-i18n="contact.phoneLabel" 
                    className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5"
                  >
                    {t.contact.phoneLabel}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-[#0C1A2E] transition-colors whitespace-nowrap">
                    +994 12 489 80 80
                  </span>
                </div>
              </a>

              {/* Telefon Kartı 2 (Mobil) */}
              <a
                href="tel:+994552203930"
                className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0C1A2E] hover:shadow-xs transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 text-[#0C1A2E] group-hover:bg-[#0C1A2E] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span 
                    data-i18n="contact.phoneLabel" 
                    className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5"
                  >
                    {t.contact.phoneLabel}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-[#0C1A2E] transition-colors whitespace-nowrap">
                    +994 55 220 39 30
                  </span>
                </div>
              </a>

              {/* E-poçt Kartı */}
              <a
                href="mailto:office@aatg.az"
                className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0C1A2E] hover:shadow-xs transition-all group cursor-pointer sm:col-span-2 lg:col-span-1"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 text-[#0C1A2E] group-hover:bg-[#0C1A2E] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span 
                    data-i18n="contact.emailLabel" 
                    className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5"
                  >
                    {t.contact.emailLabel}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-[#0C1A2E] transition-colors truncate block">
                    office@aatg.az
                  </span>
                </div>
              </a>

            </div>
          </div>
        </section>

      </main>

      {/* =========================================================
          5) FOOTER (Yığcam və Təmiz)
      ========================================================== */}
      <footer className="border-t border-[#0C1A2E]/10 bg-[#EEF3F8] py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p 
            data-i18n="footer.copyright" 
            className="text-xs text-slate-500 font-normal"
          >
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
