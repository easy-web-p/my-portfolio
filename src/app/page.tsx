'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

const wildIdeas = [
  {
    d1: 'AI & Machine Learning',
    d2: 'Smart Agriculture',
    d3: 'Local Communities',
    textTh: 'ระบบ AI วิเคราะห์สายพันธุ์ข้าวและแนะนำสูตรปุ๋ยเฉพาะแปลงสำหรับเกษตรกรไทย (แอปพลิเคชันเกษตรอินเสิร์ท).',
    textEn: 'AI-driven rice cultivar diagnostics and custom fertilization advisor for Thai farmers (Kaset Insert App).',
  },
  {
    d1: 'AI & LLM',
    d2: 'Mental Health',
    d3: 'Youth Care',
    textTh: 'แชตบอต AI คัดกรองอารมณ์และให้คำปรึกษาด้านสุขภาพจิตเบื้องต้น พร้อมระบบตรวจจับภาวะวิกฤตและส่งต่อความช่วยเหลือ.',
    textEn: 'Conversational AI screening adolescent emotional health with emergency crisis detection and counseling triage.',
  },
  {
    d1: 'Robotics & IoT',
    d2: 'Emergency Rescue',
    d3: 'Disaster Relief',
    textTh: 'หุ่นยนต์อัตโนมัติลำเลียงเวชภัณฑ์และอุปกรณ์ยังชีพในพื้นที่น้ำท่วม ควบคุมและติดตามพิกัดผ่าน Web Dashboard และ LINE Notify.',
    textEn: 'Autonomous amphibious medical delivery rover with real-time GPS tracking dashboard and LINE alerts for flood rescue.',
  },
  {
    d1: 'Full-Stack Web',
    d2: 'Google Maps API',
    d3: 'Local Economy',
    textTh: 'ระบบแผนที่บริการชุมชนเชื่อมต่อ Google Maps API เพื่อเพิ่มการมองเห็นและสร้างตัวตนทางดิจิทัลให้แก่ร้านค้ารายย่อย.',
    textEn: 'Community merchant geolocation platform leveraging Google Maps API to boost foot traffic and digital presence for local vendors.',
  },
  {
    d1: 'Data Analytics',
    d2: 'Research & Surveys',
    d3: 'Sustainable Farming',
    textTh: 'แพลตฟอร์มวิเคราะห์ข้อมูลพฤติกรรมการใช้ปุ๋ยเชิงสถิติ เพื่อการเกษตรแม่นยำและเป็นมิตรต่อสิ่งแวดล้อมอย่างยั่งยืน.',
    textEn: 'Statistical analytics platform examining fertilizer usage patterns to foster precision, eco-friendly agriculture.',
  },
];

export default function HomePage() {
  const { language, t } = useLanguage();

  // Reduced Motion state for Neural Canvas
  const [reduceMotion, setReduceMotion] = useState(false);

  // Bento Design Card Theme Switcher
  const [bentoTheme, setBentoTheme] = useState<'classic' | 'lime' | 'dark'>('classic');

  // Interactive Particle Canvas
  const canvasRef = useRef<HTMLDivElement>(null);
  const particlesLayerRef = useRef<HTMLDivElement>(null);

  const createSpark = (x: number, y: number) => {
    const layer = particlesLayerRef.current;
    if (!layer) return;

    if (layer.children.length > 25) {
      layer.removeChild(layer.firstChild as Node);
    }

    const dot = document.createElement('div');
    dot.className = 'absolute rounded-full pointer-events-none transition-all duration-500 ease-out';
    const size = Math.floor(Math.random() * 8) + 4;
    const colors = ['#8B5CF6', '#baf54c', '#598000', '#121c2a'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.backgroundColor = color;
    dot.style.left = `${x - size / 2}px`;
    dot.style.top = `${y - size / 2}px`;
    layer.appendChild(dot);

    requestAnimationFrame(() => {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      dot.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0)`;
      dot.style.opacity = '0';
    });

    setTimeout(() => {
      if (dot.parentNode) dot.parentNode.removeChild(dot);
    }, 500);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    createSpark(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!canvasRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    createSpark(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  // Mix My Skills state
  const [dial1, setDial1] = useState('AI & Machine Learning');
  const [dial2, setDial2] = useState('Smart Agriculture');
  const [dial3, setDial3] = useState('Local Communities');
  const [ideaText, setIdeaText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('Copy Concept');
  const [ideaAnimated, setIdeaAnimated] = useState(false);

  useEffect(() => {
    const matched = wildIdeas.find((i) => i.d1 === dial1 && i.d2 === dial2 && i.d3 === dial3);
    if (matched) {
      setIdeaText(language === 'th' ? matched.textTh : matched.textEn);
    } else {
      setIdeaText(
        language === 'th'
          ? `ระบบสังเคราะห์นวัตกรรม ${dial1} ร่วมกับ ${dial2} เพื่อสนับสนุน ${dial3} พร้อมวงรอบตอบสนองอัตโนมัติ`
          : `A synthetic ${dial1.toLowerCase()} engine orchestrating ${dial2.toLowerCase()} tailored for ${dial3.toLowerCase()} with autonomous sub-second feedback loops.`
      );
    }
  }, [language, dial1, dial2, dial3]);

  const generateIdea = () => {
    const matched = wildIdeas.find((i) => i.d1 === dial1 && i.d2 === dial2 && i.d3 === dial3);
    if (matched) {
      setIdeaText(language === 'th' ? matched.textTh : matched.textEn);
    } else {
      setIdeaText(
        language === 'th'
          ? `ระบบสังเคราะห์นวัตกรรม ${dial1} ร่วมกับ ${dial2} เพื่อสนับสนุน ${dial3} พร้อมวงรอบตอบสนองอัตโนมัติ`
          : `A synthetic ${dial1.toLowerCase()} engine orchestrating ${dial2.toLowerCase()} tailored for ${dial3.toLowerCase()} with autonomous sub-second feedback loops.`
      );
    }
    setIdeaAnimated(true);
    setTimeout(() => setIdeaAnimated(false), 200);
  };

  const copyGeneratedIdea = () => {
    navigator.clipboard.writeText(ideaText).then(() => {
      setCopyFeedback(language === 'th' ? 'คัดลอกแล้ว! ✓' : 'Copied! ✓');
      setTimeout(() => setCopyFeedback(language === 'th' ? 'คัดลอกไอเดีย' : 'Copy Concept'), 2000);
    });
  };

  // Latent Temperature Slider State
  const [latentTemp, setLatentTemp] = useState(0.65);

  // Contact Form State
  const [contactType, setContactType] = useState('Web Application');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactBudget, setContactBudget] = useState('10k-25k');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          scope: `${contactType} (Budget: ${contactBudget})`,
          message: contactMessage,
        }),
      });
    } catch {
      // Graceful fallback
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO SECTION */}
      <section className="w-full relative px-gutter-mobile lg:px-gutter-desktop py-space-xl lg:py-space-3xl overflow-hidden">
        {/* Ambient Subtle Blueprint Dot Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#121c2a 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="max-w-container-max mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-center">
          {/* Left Column: Expressive Copy & Direct Signals */}
          <div className="lg:col-span-7 flex flex-col items-start gap-space-md lg:gap-space-lg">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-ping"></span>
              <span className="font-label-sm text-label-sm font-semibold text-on-secondary-fixed">
                {t('hero.badge.project')}
              </span>
            </div>

            {/* Expressive Typography */}
            <h1 className="font-headline-lg lg:font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight leading-[1.15] font-bold">
              {language === 'th' ? (
                <>
                  สวัสดีครับ ผม{' '}
                  <span className="text-primary underline decoration-tertiary-fixed decoration-4 underline-offset-8">
                    {t('header.name')}
                  </span>{' '}
                  👋
                  <br />
                  มุ่งมั่นพัฒนา AI,
                  <br />
                  สร้างสรรค์เว็บแอปพลิเคชัน,
                  <br />
                  เพื่อขับเคลื่อนชุมชนและสังคม.
                </>
              ) : (
                <>
                  Hi, I&apos;m{' '}
                  <span className="text-primary underline decoration-tertiary-fixed decoration-4 underline-offset-8">
                    {t('header.name')}
                  </span>{' '}
                  👋
                  <br />
                  Building Intelligent AI,
                  <br />
                  Crafting High-Performance Web Apps,
                  <br />
                  Driving Positive Impact for Communities.
                </>
              )}
            </h1>

            {/* Supporting Editorial Paragraph */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {t('hero.bio')}
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
              <a
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-[4px_4px_0px_#141b2b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#141b2b] transition-all duration-200 cursor-pointer select-none"
                href="#work"
              >
                <span>{t('hero.cta.works')}</span>
                <span className="material-symbols-outlined text-[18px]">south</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#141b2b] transition-all duration-200 cursor-pointer select-none font-bold"
                href="/documents/portfolio-phisit.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                <span>{t('hero.cta.pdf')}</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#141b2b] transition-all duration-200 cursor-pointer select-none"
                href="#contact"
              >
                <span>{t('hero.cta.contact')}</span>
                <span className="material-symbols-outlined text-[18px]">north_east</span>
              </a>
            </div>

            {/* Quick Stats Pill Row */}
            <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm pt-space-sm">
              <div className="px-space-sm py-space-xxs rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm shadow-sm flex items-center gap-space-xxs">
                <span className="material-symbols-outlined text-[16px] text-tertiary">military_tech</span>
                <span>{t('hero.badge.award')}</span>
              </div>
              <span className="text-outline-variant font-label-sm">•</span>
              <div className="px-space-sm py-space-xxs rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm shadow-sm flex items-center gap-space-xxs">
                <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                <span>{t('hero.badge.council')}</span>
              </div>
              <span className="text-outline-variant font-label-sm">•</span>
              <div className="px-space-sm py-space-xxs rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm flex items-center gap-space-xxs font-bold">
                <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                <span>{t('hero.badge.volunteer')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Digital Playground Canvas */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            {/* Interactive Canvas Card Container */}
            <div
              className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-space-lg shadow-[8px_8px_0px_#141b2b] relative overflow-hidden transition-all duration-300 border border-outline-variant/20"
              id="playground-card"
            >
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high">
                <div className="flex items-center gap-space-xs">
                  <span className="w-3 h-3 rounded-full bg-error"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-tertiary-fixed"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant ml-space-xs tracking-wider uppercase font-semibold">
                    canvas_runtime.app
                  </span>
                </div>

                {/* Reduced Motion Toggle Switch */}
                <label className="flex items-center gap-space-xxs cursor-pointer select-none">
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">
                    Reduce FX
                  </span>
                  <input
                    type="checkbox"
                    checked={reduceMotion}
                    onChange={(e) => setReduceMotion(e.target.checked)}
                    className="sr-only peer"
                    id="motion-toggle"
                  />
                  <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary relative"></div>
                </label>
              </div>

              {/* Neural Network Pattern Background SVG */}
              <div className="relative w-full h-44 rounded-xl bg-surface-container-low overflow-hidden mb-space-md flex items-center justify-center p-space-xs">
                <svg
                  className="w-full h-full text-primary"
                  fill="none"
                  viewBox="0 0 360 160"
                  xmlns="http://www.w3.org/2000/svg"
                  id="neural-svg"
                >
                  <g className="nodes-glow" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5">
                    <line x1="40" y1="40" x2="120" y2="30" />
                    <line x1="40" y1="40" x2="120" y2="80" />
                    <line x1="40" y1="120" x2="120" y2="80" />
                    <line x1="40" y1="120" x2="120" y2="130" />
                    <line x1="120" y1="30" x2="220" y2="40" />
                    <line x1="120" y1="80" x2="220" y2="40" />
                    <line x1="120" y1="80" x2="220" y2="110" />
                    <line x1="120" y1="130" x2="220" y2="110" />
                    <line x1="220" y1="40" x2="320" y2="70" />
                    <line x1="220" y1="110" x2="320" y2="70" />
                  </g>

                  {/* Interactive Node Points */}
                  <circle
                    cx="40"
                    cy="40"
                    r="6"
                    fill="#8B5CF6"
                    className={reduceMotion ? '' : 'animate-pulse'}
                  />
                  <circle cx="40" cy="120" r="5" fill="#121c2a" />
                  <circle cx="120" cy="30" r="7" fill="#baf54c" />
                  <circle cx="120" cy="80" r="9" fill="#8455ef" />
                  <circle cx="120" cy="130" r="5" fill="#466500" />
                  <circle cx="220" cy="40" r="8" fill="#8B5CF6" />
                  <circle cx="220" cy="110" r="6" fill="#baf54c" />
                  <circle cx="320" cy="70" r="11" fill="#121c2a" />
                  <text
                    x="320"
                    y="74"
                    fill="#ffffff"
                    fontSize="9"
                    fontFamily="Sora"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    AI
                  </text>
                </svg>

                {/* Floating Sticker Labels */}
                <div className="absolute top-2 left-3 transform -rotate-6 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] px-2 py-0.5 rounded-full shadow-[2px_2px_0px_#141b2b] select-none pointer-events-none font-bold">
                  ✦ DESIGN
                </div>
                <div className="absolute bottom-2 left-4 transform rotate-3 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] px-2 py-0.5 rounded-full shadow-[2px_2px_0px_#141b2b] select-none pointer-events-none font-bold">
                  ⚡ CODE
                </div>
                <div className="absolute top-3 right-4 transform rotate-6 bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-[10px] px-2 py-0.5 rounded-full shadow-[2px_2px_0px_#141b2b] select-none pointer-events-none font-bold">
                  🔮 AI
                </div>
                <div className="absolute bottom-3 right-5 transform -rotate-3 bg-tertiary-container text-on-tertiary-container font-label-sm text-[10px] px-2 py-0.5 rounded-full shadow-[2px_2px_0px_#141b2b] select-none pointer-events-none font-bold">
                  🎈 CURIOSITY
                </div>
              </div>

              {/* Profile Snapshot Card Detail */}
              <div className="flex items-center gap-space-md p-space-sm rounded-xl bg-surface-container-low mb-space-md">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-[2px_2px_0px_#141b2b] shrink-0 border border-outline-variant/30">
                  <Image
                    src="/images/profile/phisit-square.png"
                    alt="พิสิษฐ์ แก้วกุลพิสิฐ"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-body-md font-bold text-on-surface truncate">
                    {t('header.name')}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                    {language === 'th'
                      ? 'นักพัฒนาซอฟต์แวร์ & AI (Personal Studio)'
                      : 'Software & AI Developer (Personal Studio)'}
                  </span>
                  <div className="flex items-center gap-space-xxs mt-space-xxs">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
                    <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                      {language === 'th'
                        ? '🟢 พัฒนา AI & นวัตกรรมเพื่อสังคม'
                        : '🟢 Building AI & Social Innovations'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Tech Pill Cluster */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  {language === 'th' ? 'เครื่องมือและเทคโนโลยี (Active Toolstack)' : 'Active Toolstack'}
                </span>
                <div className="flex flex-wrap gap-space-xs">
                  {['Python', 'TypeScript', 'ChatGPT API', 'HTML5 / CSS3', 'Dialogflow', 'Google Maps API', 'MySQL', 'Hardware'].map(
                    (tech) => (
                      <button
                        key={tech}
                        type="button"
                        className="px-space-xs py-space-xxs rounded-md bg-surface-container text-on-surface font-label-sm text-[12px] hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-2xs cursor-pointer select-none font-medium"
                      >
                        {tech}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SCROLLING IDENTITY STRIP */}
      <section className="w-full bg-secondary-fixed py-space-sm overflow-hidden shadow-sm select-none">
        <div className="flex whitespace-nowrap overflow-hidden">
          {language === 'th' ? (
            <div className="inline-flex items-center gap-space-md animate-marquee font-headline-sm text-headline-sm text-on-secondary-fixed tracking-tight font-bold">
              <span>โปรเจกต์ส่วนตัว (Personal Project)</span>
              <span className="text-primary">✦</span>
              <span>คลังผลงานและนวัตกรรม AI</span>
              <span className="text-primary">✦</span>
              <span>สร้างรายได้เสริม &amp; ดิจิทัลสตูดิโอ</span>
              <span className="text-primary">✦</span>
              <span>{t('hero.badge.award')}</span>
              <span className="text-primary">✦</span>
              <span>GITHUB @EASY-WEB-P</span>
              <span className="text-primary">✦</span>
              <span>{t('hero.badge.council')}</span>
              <span className="text-primary">✦</span>
              <span>AI &amp; WEB INNOVATIONS</span>
              <span className="text-primary">✦</span>
              <span>{t('hero.badge.volunteer')}</span>
              <span className="text-primary">✦</span>
              <span>DIGITAL STORE &amp; CODE ARCHIVE</span>
              <span className="text-primary">✦</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-space-md animate-marquee font-headline-sm text-headline-sm text-on-secondary-fixed tracking-tight font-bold">
              <span>Personal Project &amp; Studio</span>
              <span className="text-primary">✦</span>
              <span>AI Innovation &amp; Code Base</span>
              <span className="text-primary">✦</span>
              <span>Digital Products &amp; Solutions</span>
              <span className="text-primary">✦</span>
              <span>{t('hero.badge.award')}</span>
              <span className="text-primary">✦</span>
              <span>GITHUB @EASY-WEB-P</span>
              <span className="text-primary">✦</span>
              <span>{t('hero.badge.council')}</span>
              <span className="text-primary">✦</span>
              <span>AI &amp; WEB INNOVATIONS</span>
              <span className="text-primary">✦</span>
              <span>{t('hero.badge.volunteer')}</span>
              <span className="text-primary">✦</span>
              <span>DIGITAL STORE &amp; CODE ARCHIVE</span>
              <span className="text-primary">✦</span>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: FEATURED WORK */}
      <section className="w-full px-gutter-mobile lg:px-gutter-desktop py-space-3xl lg:py-space-4xl scroll-mt-24" id="work">
        <div className="max-w-container-max mx-auto flex flex-col gap-space-3xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg border-b border-surface-container-high">
            <div className="flex flex-col gap-space-xxs">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                01 / PORTFOLIO HIGHLIGHTS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                {language === 'th' ? 'ผลงานและโครงงานเด่น (Featured Projects)' : 'Featured Projects & Selected Works'}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              {language === 'th'
                ? 'ผลงานที่เกิดจากความมุ่งมั่นในการผสานเทคโนโลยี AI, เว็บแอปพลิเคชัน และระบบคอมพิวเตอร์เพื่อตอบโจทย์ชุมชนและสังคม'
                : 'Driven by passion to bridge machine intelligence, responsive web platforms, and computing systems for communities.'}
            </p>
          </div>

          {/* PROJECT 1: แอปพลิเคชัน เกษตรอินเสิร์ท (Kaset Insert) */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl p-space-lg lg:p-space-2xl rounded-2xl bg-surface-container-lowest shadow-[8px_8px_0px_#141b2b] items-center border border-outline-variant/20">
            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start gap-space-md order-2 lg:order-1">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="px-space-sm py-space-xxs rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  {language === 'th' ? '🥇 ชนะเลิศ เหรียญทอง (ระดับเขตพื้นที่)' : '🥇 Regional Gold Medal Winner'}
                </span>
                <span className="px-space-sm py-space-xxs rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                  AI &amp; Smart Agriculture
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface font-bold">
                {language === 'th'
                  ? 'แอปพลิเคชันรวบรวมข้อมูลข้าว “เกษตรอินเสิร์ท”'
                  : '“Kaset Insert” Smart Rice & Agricultural AI Platform'}
              </h3>
              <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant leading-relaxed">
                {language === 'th'
                  ? 'แอปพลิเคชันรวบรวมข้อมูลสายพันธุ์ข้าวและการเกษตรแบบครบวงจร ประยุกต์ใช้เทคโนโลยี AI ในการวิเคราะห์และแนะนำสูตรปุ๋ย รวมถึงช่วงเวลาการเพาะปลูกที่เหมาะสมที่สุด เพื่อช่วยลดต้นทุนและเพิ่มผลผลิตให้แก่เกษตรกรไทย'
                  : 'Comprehensive agricultural intelligence app for rice cultivars, applying AI models to analyze and optimize N-P-K fertilizer schedules and boost yield for local farmers.'}
              </p>

              {/* Metrics Callout */}
              <div className="w-full p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {language === 'th' ? 'การประกวดโครงงานคอมพิวเตอร์ซอฟต์แวร์' : 'Software Computing Project Competition'}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {language === 'th' ? 'รางวัลชนะเลิศ เหรียญทอง' : 'Gold Medal 1st Prize'}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  {language === 'th' ? 'ศิลปหัตถกรรมนักเรียน ครั้งที่ 71' : '71st National Arts & Crafts Fair'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                <span className="font-semibold text-on-surface">{language === 'th' ? 'บทบาท:' : 'Role:'}</span>{' '}
                {language === 'th' ? 'ผู้พัฒนาโครงงานหลัก (Lead Developer)' : 'Lead Developer & AI Architect'}
              </div>

              <a
                className="group inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#141b2b] transition-all duration-200 cursor-pointer select-none"
                href="/work/kaset-insert"
              >
                <span>{language === 'th' ? 'อ่านกรณีศึกษาเต็ม (Case Study) →' : 'Read Full Case Study →'}</span>
              </a>
            </div>

            {/* Mockup Visual Column */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="w-full rounded-xl bg-surface-container-high p-space-sm shadow-inner relative overflow-hidden">
                <div className="relative w-full h-80 rounded-lg overflow-hidden bg-surface-container-lowest shadow-sm">
                  <Image
                    src="/images/projects/kaset-insert.png"
                    alt="แอปพลิเคชันเกษตรอินเสิร์ท"
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
          </article>

          {/* PROJECT 2: Lomsak Barber Map */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl p-space-lg lg:p-space-2xl rounded-2xl bg-surface-container-lowest shadow-[8px_8px_0px_#141b2b] items-center border border-outline-variant/20">
            {/* Mockup Visual Column (Left for variation) */}
            <div className="lg:col-span-6 order-1">
              <div className="w-full rounded-xl bg-surface-container-high p-space-sm shadow-inner relative overflow-hidden flex justify-center items-center">
                <div className="relative w-full h-80 rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm">
                  <Image
                    src="/images/projects/barber-map.png"
                    alt="เว็บไซต์แผนที่ร้านตัดผมในตำบลหล่มสัก"
                    fill
                    className="object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start gap-space-md order-2">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="px-space-sm py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                  {language === 'th' ? '🏆 เกียรติบัตรระดับภูมิภาคเหนือ' : '🏆 Upper Northern Regional Certificate'}
                </span>
                <span className="px-space-sm py-space-xxs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                  Google Maps API + Web GIS
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface font-bold">
                {language === 'th'
                  ? 'เว็บไซต์แผนที่ร้านตัดผมในตำบลหล่มสัก'
                  : 'Lom Sak Barbershop Directory & Spatial Web GIS'}
              </h3>
              <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant leading-relaxed">
                {language === 'th'
                  ? 'ระบบแผนที่ออนไลน์รวบรวมพิกัดและข้อมูลร้านตัดผมภายในตำบลหล่มสัก พร้อมระบบค้นหาและแสดงรายละเอียดร้านค้า เชื่อมต่อ Google Maps API เพื่อส่งเสริมการมองเห็นและสร้างตัวตนทางดิจิทัลให้แก่ผู้ประกอบการรายย่อยในท้องถิ่น'
                  : 'Interactive web GIS spatial directory collecting barbershop coordinates and business details in Lom Sak via Google Maps API to boost visibility for local barbers.'}
              </p>

              {/* Metrics Callout */}
              <div className="w-full p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {language === 'th' ? 'การแข่งขันสร้างแผนที่ออนไลน์' : 'Online GIS Map Contest'}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
                    {language === 'th' ? 'เกียรติบัตรระดับภูมิภาคเหนือ' : 'Upper Northern Regional Award'}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  {language === 'th' ? 'เกษตรนเรศวรเอ็กซ์โป 2023 ม.นเรศวร' : 'Naresuan Agri Expo 2023'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                <span className="font-semibold text-on-surface">{language === 'th' ? 'บทบาท:' : 'Role:'}</span>{' '}
                {language === 'th' ? 'นักพัฒนาและออกแบบระบบ UI/UX' : 'UI/UX Designer & Full-stack Developer'}
              </div>

              <a
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#141b2b] transition-all duration-200 cursor-pointer select-none"
                href="/work/lomsak-barber-map"
              >
                <span>{language === 'th' ? 'ดูรายละเอียดผลงาน →' : 'View Project Details →'}</span>
              </a>
            </div>
          </article>

          {/* PROJECT 3: AI ให้คำปรึกษาด้านสุขภาพจิตเบื้องต้น */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl p-space-lg lg:p-space-2xl rounded-2xl bg-surface-container-lowest shadow-[8px_8px_0px_#141b2b] items-center border border-outline-variant/20">
            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start gap-space-md order-2 lg:order-1">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="px-space-sm py-space-xxs rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                  AI Chatbot &amp; NLP
                </span>
                <span className="px-space-sm py-space-xxs rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  {language === 'th' ? 'กำลังพัฒนา (Active Prototype)' : 'Active Prototype'}
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface font-bold">
                {language === 'th'
                  ? 'AI ให้คำปรึกษาด้านสุขภาพจิตเบื้องต้น'
                  : 'AI Mental Health First-line Consultant'}
              </h3>
              <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant leading-relaxed">
                {language === 'th'
                  ? 'แชตบอต AI สำหรับรับฟังและให้คำปรึกษาด้านอารมณ์และความเครียดในเบื้องต้น แรงบันดาลใจจากบทบาทนักเรียนแกนนำเพื่อนที่ปรึกษา YC พัฒนาด้วย ChatGPT API และ Dialogflow พร้อมกลไกตรวจจับข้อความความเสี่ยงสูง (เช่น ภาวะทำร้ายตนเอง) เพื่อส่งต่อช่องทางติดต่อฉุกเฉิน'
                  : 'Conversational AI agent for empathetic emotional screening and stress triage inspired by peer counseling (YC), powered by ChatGPT API & Dialogflow with crisis detection.'}
              </p>

              {/* Metrics Callout */}
              <div className="w-full p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {language === 'th' ? 'แรงบันดาลใจ & โมเดล' : 'Inspiration & Architecture'}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    ME HUG &amp; LLM API
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  {language === 'th' ? 'เชื่อมต่อ Web & LINE Notify' : 'Connected to Web & LINE Notify'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                <span className="font-semibold text-on-surface">{language === 'th' ? 'บทบาท:' : 'Role:'}</span>{' '}
                {language === 'th' ? 'ผู้วิจัยและพัฒนา (AI Researcher & Developer)' : 'Lead AI Researcher & Developer'}
              </div>

              <a
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#141b2b] transition-all duration-200 cursor-pointer select-none"
                href="/work/ai-mental-health-consultant"
              >
                <span>{language === 'th' ? 'ดูรายละเอียดโครงการ ↗' : 'View Project Details ↗'}</span>
              </a>
            </div>

            {/* Interactive Preview Mockup Column */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="w-full rounded-xl bg-surface-container-high p-space-sm shadow-inner">
                <div className="relative w-full h-80 rounded-lg overflow-hidden bg-surface-container-lowest shadow-sm">
                  <Image
                    src="/images/projects/ai-consultant.png"
                    alt="AI ให้คำปรึกษาด้านสุขภาพจิตเบื้องต้น"
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 4: WHAT I DO (BENTO GRID) */}
      <section className="w-full px-gutter-mobile lg:px-gutter-desktop py-space-3xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto flex flex-col gap-space-2xl">
          {/* Section Header */}
          <div className="flex flex-col gap-space-xxs">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
              02 / CORE DISCIPLINES
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {language === 'th' ? 'ความเชี่ยวชาญและบทบาท (Core Disciplines)' : 'Core Disciplines & Expertise'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              {language === 'th'
                ? 'การผสาน 4 เสาหลัก: ปัญญาประดิษฐ์ (AI), การพัฒนาเว็บและซอฟต์แวร์, การซ่อมบำรุงฮาร์ดแวร์, และภาวะผู้นำเพื่อสังคม'
                : 'Bridging 4 core pillars: Artificial Intelligence (AI), Web & Software Engineering, Hardware Maintenance, and Social Leadership.'}
            </p>
          </div>

          {/* Bento Grid 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg">
            {/* Bento 1: AI & Machine Learning */}
            <div
              className={`lg:col-span-7 rounded-2xl p-space-lg shadow-[6px_6px_0px_#141b2b] flex flex-col justify-between transition-colors duration-300 border border-outline-variant/20 ${
                bentoTheme === 'classic'
                  ? 'bg-surface-container-lowest text-on-surface'
                  : bentoTheme === 'lime'
                  ? 'bg-tertiary-fixed text-[#131f00]'
                  : 'bg-inverse-surface text-inverse-on-surface'
              }`}
              id="bento-design-card"
            >
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]">psychology</span>
                  </span>

                  {/* Interactive Theme Swatches */}
                  <div className="flex items-center gap-space-xxs bg-surface-container-high p-1 rounded-full">
                    <button
                      type="button"
                      onClick={() => setBentoTheme('classic')}
                      className={`w-5 h-5 rounded-full bg-primary hover:scale-110 transition-transform cursor-pointer ${
                        bentoTheme === 'classic' ? 'ring-2 ring-primary ring-offset-1' : ''
                      }`}
                      title="Classic Palette"
                    />
                    <button
                      type="button"
                      onClick={() => setBentoTheme('lime')}
                      className={`w-5 h-5 rounded-full bg-tertiary-fixed hover:scale-110 transition-transform cursor-pointer ${
                        bentoTheme === 'lime' ? 'ring-2 ring-tertiary ring-offset-1' : ''
                      }`}
                      title="Cyber Lime"
                    />
                    <button
                      type="button"
                      onClick={() => setBentoTheme('dark')}
                      className={`w-5 h-5 rounded-full bg-inverse-surface hover:scale-110 transition-transform cursor-pointer ${
                        bentoTheme === 'dark' ? 'ring-2 ring-outline ring-offset-1' : ''
                      }`}
                      title="Deep Ink"
                    />
                  </div>
                </div>

                <h3 className="font-headline-md text-headline-md mt-space-sm font-bold">
                  AI &amp; Intelligent Systems
                </h3>
                <p className="font-body-md text-body-md opacity-90 leading-relaxed">
                  {language === 'th'
                    ? 'พัฒนาและประยุกต์ใช้ปัญญาประดิษฐ์ (AI) ทั้งโมเดลภาษาขนาดใหญ่ (LLM APIs), Prompt Engineering, Dialogflow และระบบ Data Analytics เพื่อสร้างโซลูชันและเครื่องมือซอฟต์แวร์ที่ใช้งานได้จริง'
                    : 'Designing and deploying AI solutions including Large Language Model integrations (LLM APIs), Prompt Engineering, Dialogflow, and statistical data analytics pipelines.'}
                </p>
              </div>

              {/* Micro Component Mock inside card */}
              <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low/70 backdrop-blur-xs flex items-center justify-between gap-space-sm text-on-surface">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                  <span className="font-label-sm text-label-sm font-semibold">AI &amp; Smart Systems Focus</span>
                </div>
                <div className="flex gap-space-xxs flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[11px] font-medium">
                    LLM / ChatGPT
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[11px] font-medium">
                    Smart Farm
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[11px] font-medium">
                    Healthcare Bot
                  </span>
                </div>
              </div>
            </div>

            {/* Bento 2: Development */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-[6px_6px_0px_#141b2b] flex flex-col justify-between border border-outline-variant/20">
              <div className="flex flex-col gap-space-xs">
                <span className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shadow-2xs">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-space-sm font-bold">
                  {language === 'th' ? 'การพัฒนาเว็บและซอฟต์แวร์' : 'Web & Software Engineering'}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {language === 'th'
                    ? 'พัฒนาเว็บแอปพลิเคชันที่รองรับการใช้งานจริง ด้วย HTML5, CSS3, JavaScript, TypeScript, Next.js, React, Python, C++, MySQL และ Google Maps API'
                    : 'Building modern responsive web applications with Next.js, React, TypeScript, HTML5/CSS3, Python, MySQL, and Google Maps API integrations.'}
                </p>
              </div>

              {/* Interactive Code Terminal */}
              <div className="mt-space-md rounded-xl bg-inverse-surface p-space-sm text-inverse-on-surface font-mono text-[12px] leading-relaxed shadow-inner">
                <div className="flex items-center justify-between pb-space-xxs mb-space-xxs border-b border-outline/30 text-on-surface-variant text-[10px]">
                  <span>WorkAbility.java</span>
                  <span className="text-tertiary-fixed font-bold">RUNNING</span>
                </div>
                <p className="text-primary-fixed-dim">
                  public class <span className="text-tertiary-fixed">WorkAbility</span> &#123;
                </p>
                <p className="pl-3 text-secondary-fixed-dim">
                  {language === 'th'
                    ? 'String[] abilities = { "รับฟังผู้อื่น", "ใจเย็น", "พัฒนาตนเอง" };'
                    : 'String[] abilities = { "Active Listening", "Calm & Resilient", "Growth Mindset" };'}
                </p>
                <p className="pl-3 text-tertiary-fixed">
                  {language === 'th'
                    ? 'System.out.println("ความสามารถในการทำงาน");'
                    : 'System.out.println("Core Competencies");'}
                </p>
                <p className="text-primary-fixed-dim">&#125;</p>
              </div>
            </div>

            {/* Bento 3: Hardware Maintenance */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-[6px_6px_0px_#141b2b] flex flex-col justify-between border border-outline-variant/20">
              <div className="flex flex-col gap-space-xs">
                <span className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-2xs">
                  <span className="material-symbols-outlined text-[24px]">build</span>
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-space-sm font-bold">
                  {language === 'th' ? 'ฮาร์ดแวร์และระบบคอมพิวเตอร์' : 'Hardware & Systems Diagnostics'}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {language === 'th'
                    ? 'ประสบการณ์จากชุมนุมซ่อมคอมพิวเตอร์ โรงเรียนหล่มสักวิทยาคม ทั้งการตรวจสอบและซ่อมแซมฮาร์ดแวร์ การติดตั้งและดูแลซอฟต์แวร์ระบบ และการแก้ไขปัญหาทางเทคนิค'
                    : 'Hands-on hardware troubleshooting, PC assembly, circuit diagnostics, and systems maintenance from school computing clubs.'}
                </p>
              </div>

              {/* Mini Spark Nodes */}
              <div className="mt-space-md p-space-sm rounded-xl bg-surface-container flex items-center justify-around">
                <div className="flex flex-col items-center gap-1 group">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">memory</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface font-semibold">
                    {language === 'th' ? 'ฮาร์ดแวร์' : 'Hardware'}
                  </span>
                </div>
                <span className="text-primary font-bold">⟶</span>
                <div className="flex flex-col items-center gap-1 group">
                  <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">settings_system_daydream</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface font-semibold">
                    {language === 'th' ? 'ซอฟต์แวร์' : 'Software'}
                  </span>
                </div>
                <span className="text-primary font-bold">⟶</span>
                <div className="flex flex-col items-center gap-1 group">
                  <div className="w-8 h-8 rounded-full bg-inverse-surface text-inverse-on-surface flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">lan</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface font-semibold">
                    {language === 'th' ? 'ระบบเครือข่าย' : 'Network'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bento 4: Leadership & Youth Advocacy */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg shadow-[6px_6px_0px_#141b2b] flex flex-col justify-between border border-outline-variant/20">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]">groups</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold">
                    Youth Leadership
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-space-sm font-bold">
                  {language === 'th'
                    ? 'ภาวะผู้นำ & จิตอาสาเพื่อสังคม (Youth Advocacy)'
                    : 'Youth Leadership & Social Advocacy'}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {language === 'th'
                    ? 'ประธานคณะทำงานสภาเด็กและเยาวชนเทศบาลเมืองหล่มสัก พ.ศ. 2568, นักเรียนแกนนำเพื่อนที่ปรึกษา (YC) และพลเมืองจิตอาสา SET HERO รุ่นที่ ๗ จำนวน 100 ชั่วโมง ฝึกฝนการเป็นผู้ฟังที่ดี การทำงานเป็นทีม และการสื่อสารอย่างมีประสิทธิภาพ'
                    : 'President of the Lom Sak Youth Council (2025), Youth Peer Counselor (YC), and certified SET HERO volunteer (100+ hrs), fostering active listening, team communication, and public service.'}
                </p>
              </div>

              {/* Interactive Hover Canvas Area */}
              <div
                ref={canvasRef}
                onMouseMove={handleCanvasMouseMove}
                onTouchMove={handleCanvasTouchMove}
                className="mt-space-md h-24 rounded-xl bg-surface-container-highest relative overflow-hidden flex items-center justify-center cursor-crosshair select-none"
                id="canvas-experiment"
              >
                <span className="font-label-sm text-label-sm text-on-surface-variant select-none pointer-events-none font-medium">
                  {language === 'th' ? 'เลื่อนเมาส์หรือสัมผัสตรงนี้เพื่อดูประกายแสงอนุภาค ✨' : 'Hover or swipe here for particle bursts ✨'}
                </span>
                <div ref={particlesLayerRef} className="absolute inset-0 pointer-events-none" id="particles-layer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: AI LAB / CURRENTLY LEARNING */}
      <section className="w-full px-gutter-mobile lg:px-gutter-desktop py-space-3xl lg:py-space-4xl scroll-mt-24" id="ai-lab">
        <div className="max-w-container-max mx-auto flex flex-col gap-space-2xl">
          {/* Section Header */}
          <div className="flex flex-col gap-space-xxs">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                03 / LEARNING &amp; CERTIFICATIONS
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {language === 'th'
                ? 'การเรียนรู้และพัฒนาทักษะ AI (AI Lab & Upskilling)'
                : 'AI Lab & Continuous Learning'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              {language === 'th'
                ? 'การศึกษาค้นคว้า คอร์สอบรม และเกียรติบัตรรับรององค์ความรู้ด้านปัญญาประดิษฐ์และวิทยาการคอมพิวเตอร์อย่างต่อเนื่อง'
                : 'Ongoing coursework, specialized certifications, and practical explorations in Artificial Intelligence and Computer Science.'}
            </p>
          </div>

          {/* 3 Collectible Lab Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Lab Card 1: Microsoft Generative AI */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[6px_6px_0px_#141b2b] flex flex-col justify-between hover:translate-y-[-2px] transition-transform border border-outline-variant/20">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-space-xxs rounded-md bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold tracking-wide">
                    [CERTIFICATE: MICROSOFT]
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">2024</span>
                </div>
                <div className="flex flex-col gap-space-xxs">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Career Essentials in Generative AI
                  </h3>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    Microsoft &amp; LinkedIn Learning
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs text-body-sm font-body-sm text-on-surface">
                  <p>
                    <strong className="text-on-surface">
                      {language === 'th' ? 'ขอบเขตเนื้อหา: ' : 'Scope: '}
                    </strong>
                    {language === 'th'
                      ? 'ศึกษาแก่นแท้ของ Generative AI, โมเดลภาษาขนาดใหญ่ (LLMs) และแนวปฏิบัติการใช้งานอย่างมีจริยธรรม'
                      : 'Core principles of Generative AI, Large Language Models (LLMs), and ethical deployment standards.'}
                  </p>
                  <div className="p-space-xs rounded bg-surface-container-low text-[13px]">
                    <span className="text-tertiary font-bold">
                      {language === 'th' ? '✓ สิ่งที่ได้รับ: ' : '✓ Key Takeaways: '}
                    </span>
                    {language === 'th'
                      ? 'เทคนิค Prompt Engineering, ภาพรวม Computer Vision เบื้องต้น และ Responsible AI Frameworks'
                      : 'Prompt Engineering techniques, introductory Computer Vision, and Responsible AI Frameworks.'}
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low text-[13px]">
                    <span className="text-primary font-bold">
                      {language === 'th' ? '★ ผลการทดสอบ: ' : '★ Assessment: '}
                    </span>
                    {language === 'th'
                      ? 'ผ่านเกณฑ์การประเมินและได้รับเกียรติบัตรรับรองความรู้มาตรฐานสากล'
                      : 'Successfully passed rigorous international certification assessment.'}
                  </div>
                  <p className="text-[13px] text-on-surface-variant">
                    <strong>Insight: </strong>
                    {language === 'th'
                      ? 'Responsible AI คือหัวใจสำคัญที่ต้องถูกคำนึงถึงตั้งแต่การออกแบบโมเดลและ Prompt Pipeline'
                      : 'Responsible AI is paramount and must be engineered into every prompt and pipeline from day zero.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm pt-space-md mt-space-md border-t border-surface-container">
                <a
                  className="font-label-sm text-label-sm text-primary hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                  href="/resume"
                >
                  {language === 'th' ? 'ดูเกียรติบัตรในเรซูเม่' : 'View Credential in Résumé'}{' '}
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Lab Card 2: Python for GenAI */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[6px_6px_0px_#141b2b] flex flex-col justify-between hover:translate-y-[-2px] transition-transform border border-outline-variant/20">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-space-xxs rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold tracking-wide">
                    [TRAINING: PCRU]
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                    {language === 'th' ? '2567' : '2024'}
                  </span>
                </div>
                <div className="flex flex-col gap-space-xxs">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Python for Generative AI
                  </h3>
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                    {language === 'th' ? 'มหาวิทยาลัยราชภัฏเพชรบูรณ์' : 'Phetchabun Rajabhat University (PCRU)'}
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs text-body-sm font-body-sm text-on-surface">
                  <p>
                    <strong className="text-on-surface">
                      {language === 'th' ? 'ขอบเขตเนื้อหา: ' : 'Scope: '}
                    </strong>
                    {language === 'th'
                      ? 'อบรมเชิงปฏิบัติการพัฒนาโปรแกรมภาษา Python เชื่อมต่อ API เพื่อสร้างแอปพลิเคชัน AI เชิงสร้างสรรค์'
                      : 'Hands-on Python workshop interfacing with modern LLM APIs to engineer generative web tools.'}
                  </p>
                  <div className="p-space-xs rounded bg-surface-container-low text-[13px]">
                    <span className="text-tertiary font-bold">
                      {language === 'th' ? '✓ สิ่งที่ได้รับ: ' : '✓ Key Takeaways: '}
                    </span>
                    {language === 'th'
                      ? 'โค้ดเชื่อมต่อ LLM APIs, Data Handling ด้วย Python และการจัดการ Prompt Templates'
                      : 'LLM API integration pipelines, Python data processing, and dynamic prompt templating.'}
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low text-[13px]">
                    <span className="text-primary font-bold">
                      {language === 'th' ? '★ ผลการทดสอบ: ' : '★ Assessment: '}
                    </span>
                    {language === 'th'
                      ? 'ผ่านการอบรมเชิงปฏิบัติการพร้อมพัฒนาโปรเจกต์ต้นแบบจริง'
                      : 'Successfully completed hands-on intensive training with production prototypes.'}
                  </div>
                  <p className="text-[13px] text-on-surface-variant">
                    <strong>Insight: </strong>
                    {language === 'th'
                      ? 'ไพทอนเป็นภาษากลางอันทรงพลังที่เชื่อมต่อระหว่างตรรกะโปรแกรมและโมเดล AI ได้อย่างรวดเร็ว'
                      : 'Python serves as the ultimate universal bridge between programmatic logic and frontier AI models.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm pt-space-md mt-space-md border-t border-surface-container">
                <a
                  className="font-label-sm text-label-sm text-primary hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                  href="/resume"
                >
                  {language === 'th' ? 'ดูเกียรติบัตรในเรซูเม่' : 'View Credential in Résumé'}{' '}
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Lab Card 3: Chula MOOC */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[6px_6px_0px_#141b2b] flex flex-col justify-between hover:translate-y-[-2px] transition-transform border border-outline-variant/20">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-space-xxs rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold tracking-wide">
                    [CERTIFICATE: CHULA MOOC]
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">CHULA</span>
                </div>
                <div className="flex flex-col gap-space-xxs">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Computational &amp; AI Foundations
                  </h3>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    {language === 'th' ? 'จุฬาลงกรณ์มหาวิทยาลัย (CHULA MOOC)' : 'Chulalongkorn University (CHULA MOOC)'}
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs text-body-sm font-body-sm text-on-surface">
                  <p>
                    <strong className="text-on-surface">
                      {language === 'th' ? 'ขอบเขตเนื้อหา: ' : 'Scope: '}
                    </strong>
                    {language === 'th'
                      ? 'ศึกษาหลักการวิทยาการคำนวณ ตรรกศาสตร์ ข้อมูล และการวิเคราะห์เพื่อเตรียมความพร้อมสู่ AI'
                      : 'Fundamental computer science, formal propositional logic, and algorithmic data thinking for AI.'}
                  </p>
                  <div className="p-space-xs rounded bg-surface-container-low text-[13px]">
                    <span className="text-tertiary font-bold">
                      {language === 'th' ? '✓ สิ่งที่ได้รับ: ' : '✓ Key Takeaways: '}
                    </span>
                    {language === 'th'
                      ? 'ทักษะคิดเชิงคำนวณ (Computational Thinking) และโครงสร้างตรรกะการประมวลผล'
                      : 'Rigorous computational thinking, algorithmic decomposition, and processing logic.'}
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-low text-[13px]">
                    <span className="text-primary font-bold">
                      {language === 'th' ? '★ ผลการทดสอบ: ' : '★ Assessment: '}
                    </span>
                    {language === 'th'
                      ? 'ผ่านเกณฑ์วัดผลการเรียนรู้ออนไลน์ ได้รับใบประกาศนียบัตร'
                      : 'Verified academic certificate of achievement from Chulalongkorn University.'}
                  </div>
                  <p className="text-[13px] text-on-surface-variant">
                    <strong>Insight: </strong>
                    {language === 'th'
                      ? 'ตรรกะและโครงสร้างข้อมูลที่แม่นยำคือกุญแจสำคัญสู่การต่อยอดในระดับมหาวิทยาลัย'
                      : 'Rock-solid logic and data structures are the foundational prerequisites for advanced AI study.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm pt-space-md mt-space-md border-t border-surface-container">
                <a
                  className="font-label-sm text-label-sm text-primary hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                  href="/resume"
                >
                  {language === 'th' ? 'ดูเกียรติบัตรในเรซูเม่' : 'View Credential in Résumé'}{' '}
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ABOUT SECTION (PERSONALITY & CAPABILITY SPLIT) */}
      <section className="w-full px-gutter-mobile lg:px-gutter-desktop py-space-3xl bg-surface-container-low scroll-mt-24" id="about">
        <div className="max-w-container-max mx-auto flex flex-col gap-space-2xl">
          {/* Section Header */}
          <div className="flex flex-col gap-space-xxs">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
              04 / BACKGROUND &amp; ETHOS
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {language === 'th' ? 'About Phisit Kaewkulphisit (เกี่ยวกับพิสิษฐ์)' : 'About Phisit Kaewkulphisit (Background & Vision)'}
            </h2>
          </div>

          {/* Split Story & Fast Facts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            {/* Story Column */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="p-space-lg lg:p-space-xl rounded-2xl bg-surface-container-lowest shadow-[6px_6px_0px_#141b2b] border border-outline-variant/20">
                <p className="font-headline-sm text-headline-sm text-on-surface leading-snug mb-space-md font-semibold">
                  {language === 'th'
                    ? '“มุ่งมั่นพัฒนาตนเอง สู่การสร้างสรรค์นวัตกรรม AI และเทคโนโลยีเพื่อขับเคลื่อนสังคม”'
                    : '“Dedicated to relentless self-growth and engineering AI innovations that empower society.”'}
                </p>
                <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant leading-relaxed mb-space-sm">
                  {language === 'th'
                    ? 'กำลังศึกษาในหลักสูตรวิทยาศาสตรบัณฑิต สาขาปัญญาประดิษฐ์ (โครงการผู้มีศักยภาพด้านคอมพิวเตอร์) มหาวิทยาลัยขอนแก่น ควบคู่กับการพัฒนาซอฟต์แวร์ คลังผลงานอิสระ และการสร้างสรรค์ดิจิทัลโปรดักต์'
                    : 'Currently pursuing a Bachelor of Science in Artificial Intelligence (High-Potential Computing Talent Track) at Khon Kaen University, building production-grade web applications and open digital products.'}
                </p>
                <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant leading-relaxed">
                  {language === 'th'
                    ? 'ผมมีความสนใจและหลงใหลในเทคโนโลยีมาตั้งแต่วัยมัธยม มีประสบการณ์ลงมือทำจริงทั้งการพัฒนาโครงงานซอฟต์แวร์ปัญญาประดิษฐ์ เว็บแอปพลิเคชัน การซ่อมบำรุงระบบคอมพิวเตอร์ และการอุทิศตนเพื่อส่วนรวมในฐานะประธานสภาเด็กและเยาวชนฯ และจิตอาสา ผมเชื่อมั่นว่าเทคโนโลยีที่ดีต้องแก้ปัญหาให้แก่ผู้คนในสังคมได้จริง'
                    : 'Passionate about technology since high school, with extensive hands-on experience spanning AI software, full-stack web applications, hardware maintenance, and civic leadership as President of the Lom Sak Youth Council. I believe great technology must solve real human problems.'}
                </p>
              </div>

              {/* Visual Timeline */}
              <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-[6px_6px_0px_#141b2b] flex flex-col gap-space-md border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                  {language === 'th'
                    ? 'เส้นทางการเติบโตและพัฒนาการ (Trajectory & Evolution)'
                    : 'Trajectory & Growth Milestones'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-sm relative">
                  <div className="flex flex-col p-space-xs rounded-lg bg-surface-container-low">
                    <span className="font-label-sm text-label-sm font-bold text-primary">
                      {language === 'th' ? '2564' : '2021'}
                    </span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">
                      {language === 'th' ? 'จุดเริ่มต้นการเขียนโค้ด' : 'Coding Origins'}
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      {language === 'th' ? 'เรียนรู้ C++, HTML/CSS, อุปกรณ์คอมฯ' : 'Learned C++, HTML/CSS, hardware'}
                    </span>
                  </div>
                  <div className="flex flex-col p-space-xs rounded-lg bg-surface-container-low">
                    <span className="font-label-sm text-label-sm font-bold text-primary">
                      {language === 'th' ? '2566' : '2023'}
                    </span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">
                      {language === 'th' ? 'สร้างสรรค์นวัตกรรมจริง' : 'Building Real Innovations'}
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      {language === 'th'
                        ? 'แอปเกษตรอินเสิร์ท เหรียญทอง ศิลปหัตถกรรม 71'
                        : 'Kaset Insert App — Gold Medal 71st Arts & Crafts'}
                    </span>
                  </div>
                  <div className="flex flex-col p-space-xs rounded-lg bg-surface-container-low">
                    <span className="font-label-sm text-label-sm font-bold text-primary">
                      {language === 'th' ? '2567' : '2024'}
                    </span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">
                      {language === 'th' ? 'ผู้นำเยาวชน & จิตอาสา' : 'Youth Leadership & Service'}
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      {language === 'th'
                        ? 'ประธานสภาเด็กฯ, เพื่อนที่ปรึกษา YC, SET HERO'
                        : 'Youth Council President, YC Counselor, SET HERO'}
                    </span>
                  </div>
                  <div className="flex flex-col p-space-xs rounded-lg bg-tertiary-fixed text-on-tertiary-fixed shadow-sm">
                    <span className="font-label-sm text-label-sm font-bold">
                      {language === 'th' ? '2568 - ปัจจุบัน' : '2025 - Present'}
                    </span>
                    <span className="font-body-sm text-body-sm font-bold">
                      {language === 'th' ? 'ปี 1 AI ม.ขอนแก่น' : '1st Year AI Student'}
                    </span>
                    <span className="font-body-sm text-[12px]">
                      {language === 'th' ? 'วิทยาลัยการคอมพิวเตอร์ มข.' : 'College of Computing, KKU'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality Matrix & Fast Facts */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-[6px_6px_0px_#141b2b] flex flex-col gap-space-md h-full border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  {language === 'th' ? 'บุคลิกภาพและความสามารถ (Work Ability)' : 'Personality & Core Work Strengths'}
                </span>
                <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-space-xs p-space-xs rounded-lg bg-surface-container-low">
                    <span className="text-xl">👂</span>
                    <div>
                      <strong className="text-on-surface block">
                        {language === 'th' ? 'รับฟังและเข้าใจผู้อื่น (Active Listening):' : 'Active Listening & Empathy:'}
                      </strong>
                      <span className="text-on-surface-variant">
                        {language === 'th'
                          ? 'ฝึกฝนจากการเป็นนักเรียนแกนนำเพื่อนที่ปรึกษา (YC) และประธานสภาเด็กฯ พร้อมรับฟังทุกมุมมอง'
                          : 'Honed through roles as YC Youth Peer Counselor and Youth Council President, attuned to diverse community perspectives.'}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-xs p-space-xs rounded-lg bg-surface-container-low">
                    <span className="text-xl">🧘</span>
                    <div>
                      <strong className="text-on-surface block">
                        {language === 'th' ? 'มีความใจเย็นและรอบคอบ:' : 'Calm & Analytical Problem Solving:'}
                      </strong>
                      <span className="text-on-surface-variant">
                        {language === 'th'
                          ? 'วิเคราะห์ปัญหาอย่างเป็นขั้นตอน ทั้งการดีบักโค้ด การซ่อมฮาร์ดแวร์ และการประสานงานกับผู้คน'
                          : 'Methodical step-by-step troubleshooter in code debugging, hardware diagnostics, and interpersonal collaboration.'}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-xs p-space-xs rounded-lg bg-surface-container-low">
                    <span className="text-xl">🚀</span>
                    <div>
                      <strong className="text-on-surface block">
                        {language === 'th' ? 'กระตือรือร้นในการพัฒนาตนเอง:' : 'Continuous Learning & Initiative:'}
                      </strong>
                      <span className="text-on-surface-variant">
                        {language === 'th'
                          ? 'ขวนขวายศึกษาความรู้ใหม่อยู่เสมอ ทั้งคอร์สอบรม AI, การแข่งขันทักษะ และการลงมือทำโปรเจกต์จริง'
                          : 'Constantly acquiring frontier knowledge through AI coursework, competitive hackathons, and real-world projects.'}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-xs p-space-xs rounded-lg bg-surface-container-low">
                    <span className="text-xl">🤝</span>
                    <div>
                      <strong className="text-on-surface block">
                        {language === 'th' ? 'จิตสาธารณะและการทำงานเป็นทีม:' : 'Civic Mindset & Team Collaboration:'}
                      </strong>
                      <span className="text-on-surface-variant">
                        {language === 'th'
                          ? 'อุทิศตนเพื่องานส่วนรวม ผ่านการบำเพ็ญประโยชน์ SET HERO 100 ชั่วโมง และกิจกรรมของสภาเยาวชน'
                          : 'Passionate community contributor with 100+ volunteer hours in SET HERO and municipal youth development initiatives.'}
                      </span>
                    </div>
                  </li>
                </ul>

                {/* Download Résumé CTA in About */}
                <div className="pt-space-sm mt-auto border-t border-surface-container flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {language === 'th' ? 'แฟ้มสะสมผลงานฉบับเต็ม' : 'Complete Portfolio Dossier'}
                  </span>
                  <a
                    className="inline-flex items-center gap-space-xxs px-space-sm py-space-xs rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors cursor-pointer select-none font-semibold shadow-xs"
                    href="/documents/portfolio-phisit.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>{language === 'th' ? 'ดาวน์โหลด Portfolio PDF' : 'Download Portfolio PDF'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: SKILLS CONSTELLATION */}
      <section className="w-full px-gutter-mobile lg:px-gutter-desktop py-space-3xl lg:py-space-4xl scroll-mt-24" id="skills">
        <div className="max-w-container-max mx-auto flex flex-col gap-space-2xl">
          {/* Section Header */}
          <div className="flex flex-col gap-space-xxs">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
              05 / CAPABILITIES
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {language === 'th' ? 'ทักษะและความสามารถ (Skills & Competencies)' : 'Skills & Core Competencies'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              {language === 'th'
                ? 'จัดกลุ่มตามขอบเขตการปฏิบัติงานจริง ผสานความรู้ด้าน AI วิศวกรรมซอฟต์แวร์ การดูแลฮาร์ดแวร์ และภาวะผู้นำ'
                : 'Organized by functional domains: bridging applied AI, software engineering, hardware maintenance, and civic leadership.'}
            </p>
          </div>

          {/* Constellation Clusters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {/* Cluster 1: AI & Intelligent Systems */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-[6px_6px_0px_#141b2b] flex flex-col gap-space-md border border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  AI &amp; Intelligent Systems
                </h3>
              </div>
              <div className="flex flex-wrap gap-space-xs">
                {['Python', 'Prompt Engineering', 'ChatGPT API', 'Dialogflow', 'Generative AI', 'Smart Agriculture AI', 'Data Analysis'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-space-sm py-space-xxs rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Cluster 2: Web & Software Development */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-[6px_6px_0px_#141b2b] flex flex-col gap-space-md border border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[24px]">code</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Web &amp; Software Development
                </h3>
              </div>
              <div className="flex flex-wrap gap-space-xs">
                {['HTML5 / CSS3', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Responsive UI', 'REST APIs'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-space-sm py-space-xxs rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Cluster 3: Systems, Databases & GIS */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-[6px_6px_0px_#141b2b] flex flex-col gap-space-md border border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-[24px]">database</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Systems, Databases &amp; GIS
                </h3>
              </div>
              <div className="flex flex-wrap gap-space-xs">
                {['MySQL', 'C++', 'Google Maps API', 'Web GIS', 'Git & GitHub', 'VS Code'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-space-sm py-space-xxs rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Cluster 4: Hardware & Maintenance */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-[6px_6px_0px_#141b2b] flex flex-col gap-space-md border border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[24px]">build</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Hardware &amp; PC Maintenance
                </h3>
              </div>
              <div className="flex flex-wrap gap-space-xs">
                {['Computer Assembly', 'Hardware Troubleshooting', 'OS Installation', 'System Optimization', 'Network Setup'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-space-sm py-space-xxs rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Cluster 5: Leadership & Social Impact */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-[6px_6px_0px_#141b2b] flex flex-col gap-space-md lg:col-span-2 border border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[24px]">groups</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Leadership, Counseling &amp; Community Impact
                </h3>
              </div>
              <div className="flex flex-wrap gap-space-xs">
                {(language === 'th'
                  ? [
                      'Youth Council Leadership (ประธานสภาเด็กฯ)',
                      'Youth Counseling (เพื่อนที่ปรึกษา YC)',
                      'Active Listening (การรับฟังเชิงลึก)',
                      'Team Collaboration',
                      'Community Volunteering (SET HERO 100 ชม.)',
                      'Public Speaking',
                    ]
                  : [
                      'Youth Council President',
                      'Youth Peer Counselor (YC)',
                      'Active Listening & Empathy',
                      'Team Collaboration',
                      'Community Volunteering (SET HERO 100+ hrs)',
                      'Public Speaking',
                    ]
                ).map((skill) => (
                  <span
                    key={skill}
                    className="px-space-sm py-space-xxs rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PERSONAL PLAYGROUND ("MIX MY SKILLS") */}
      <section className="w-full px-gutter-mobile lg:px-gutter-desktop py-space-3xl bg-secondary-fixed scroll-mt-24" id="playground">
        <div className="max-w-container-max mx-auto flex flex-col gap-space-2xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xxs">
              <div className="flex items-center gap-space-xs">
                <span className="px-space-xs py-space-xxs rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold">
                  EXPERIMENTAL GENERATOR
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-secondary-fixed font-bold">
                Mix My Skills
              </h2>
              <p className="font-body-md text-body-md text-on-secondary-fixed-variant max-w-lg">
                {language === 'th'
                  ? 'เครื่องมือทดลองจำลองไอเดียนวัตกรรม: หมุนหน้าปัดทักษะต่าง ๆ เพื่อสร้างสมมติฐานโครงงานเทคโนโลยีและ AI เพื่อสังคม'
                  : 'Interactive project ideation sandbox: Spin the capability dials to synthesize conceptual AI and civic technology hypotheses.'}
              </p>
            </div>

            {/* Command Palette Shortcut Hint */}
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-xl bg-surface-container-lowest text-on-surface shadow-[2px_2px_0px_#141b2b]">
              <span className="material-symbols-outlined text-[18px] text-primary">keyboard_command_key</span>
              <span className="font-label-sm text-label-sm font-semibold">
                {language === 'th' ? (
                  <>
                    กดปุ่ม <kbd className="font-bold bg-surface-container px-1 py-0.5 rounded font-mono">⌘K / Ctrl+K</kbd> เพื่อค้นหาอย่างรวดเร็ว
                  </>
                ) : (
                  <>
                    Press <kbd className="font-bold bg-surface-container px-1 py-0.5 rounded font-mono">⌘K / Ctrl+K</kbd> for quick command search
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Interactive Generator Widget Container */}
          <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg lg:p-space-2xl shadow-[8px_8px_0px_#141b2b] flex flex-col gap-space-xl border border-outline-variant/20">
            {/* Three Slot Dials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* Dial 1 */}
              <div className="flex flex-col gap-space-xs p-space-md rounded-xl bg-surface-container-low">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  {language === 'th' ? 'หน้าปัดที่ 1: เทคโนโลยีหลัก' : 'Dial 1: Core Technology'}
                </span>
                <select
                  value={dial1}
                  onChange={(e) => setDial1(e.target.value)}
                  className="w-full p-space-xs rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border-none shadow-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                  id="skill-dial-1"
                >
                  <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                  <option value="AI & LLM">AI &amp; LLM</option>
                  <option value="Robotics & IoT">Robotics &amp; IoT</option>
                  <option value="Full-Stack Web">Full-Stack Web</option>
                  <option value="Data Analytics">Data Analytics</option>
                </select>
              </div>

              {/* Dial 2 */}
              <div className="flex flex-col gap-space-xs p-space-md rounded-xl bg-surface-container-low">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  {language === 'th' ? 'หน้าปัดที่ 2: ฟังก์ชันและกลไก' : 'Dial 2: Domain & Mechanics'}
                </span>
                <select
                  value={dial2}
                  onChange={(e) => setDial2(e.target.value)}
                  className="w-full p-space-xs rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border-none shadow-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                  id="skill-dial-2"
                >
                  <option value="Smart Agriculture">Smart Agriculture</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Emergency Rescue">Emergency Rescue</option>
                  <option value="Google Maps API">Google Maps API</option>
                  <option value="Research & Surveys">Research &amp; Surveys</option>
                </select>
              </div>

              {/* Dial 3 */}
              <div className="flex flex-col gap-space-xs p-space-md rounded-xl bg-surface-container-low">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  {language === 'th' ? 'หน้าปัดที่ 3: บริบทและชุมชนเป้าหมาย' : 'Dial 3: Community & Context'}
                </span>
                <select
                  value={dial3}
                  onChange={(e) => setDial3(e.target.value)}
                  className="w-full p-space-xs rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border-none shadow-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                  id="skill-dial-3"
                >
                  <option value="Local Communities">Local Communities</option>
                  <option value="Youth Care">Youth Care</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                  <option value="Local Economy">Local Economy</option>
                  <option value="Sustainable Farming">Sustainable Farming</option>
                </select>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={generateIdea}
                className="inline-flex items-center gap-space-xs px-space-xl py-space-sm rounded-xl bg-primary text-on-primary font-headline-sm text-body-md shadow-[4px_4px_0px_#141b2b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#141b2b] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_#141b2b] transition-all duration-200 cursor-pointer select-none font-bold"
                id="generate-idea-btn"
              >
                <span>
                  {language === 'th'
                    ? '🎲 หมุนสลับทักษะ & สุ่มไอเดียโครงงานใหม่'
                    : '🎲 Spin Dials & Synthesize Concept'}
                </span>
              </button>
            </div>

            {/* Dynamic Output Container */}
            <div
              className={`p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md transition-all ${
                ideaAnimated ? 'scale-[1.01]' : ''
              }`}
              id="idea-output-card"
            >
              <div className="flex items-start gap-space-md">
                <span className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 font-bold text-lg shadow-2xs">
                  💡
                </span>
                <div className="flex flex-col gap-space-xxs">
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase">
                    {language === 'th'
                      ? 'สมมติฐานโครงงานนวัตกรรม (Concept Hypothesis)'
                      : 'Innovation Concept Hypothesis'}
                  </span>
                  <p className="font-headline-sm text-body-md lg:text-headline-sm text-on-surface font-semibold" id="idea-text">
                    {ideaText}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={copyGeneratedIdea}
                className="inline-flex items-center gap-space-xxs px-space-sm py-space-xs rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm hover:bg-surface-container transition-colors shrink-0 cursor-pointer font-medium"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                <span id="copy-btn-text">
                  {copyFeedback === 'Copy Concept' || copyFeedback === 'คัดลอกไอเดีย'
                    ? (language === 'th' ? 'คัดลอกไอเดีย' : 'Copy Concept')
                    : copyFeedback}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CONTACT SECTION */}
      <section className="w-full px-gutter-mobile lg:px-gutter-desktop py-space-3xl lg:py-space-4xl scroll-mt-24" id="contact">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
          {/* Left Column: Friendly Editorial Invite */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-space-xl">
            <div className="flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xxs px-space-sm py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm w-fit font-bold">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="font-headline-lg lg:font-display-hero text-headline-lg lg:text-headline-lg text-on-surface leading-tight font-bold">
                {language === 'th' ? (
                  <>
                    มีไอเดีย,
                    <br />
                    โครงงานร่วม,
                    <br />
                    หรือต้องการร่วมงาน?
                  </>
                ) : (
                  <>
                    Have an idea,
                    <br />
                    a collaboration,
                    <br />
                    or project in mind?
                  </>
                )}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {language === 'th'
                  ? 'เปิดรับโอกาสการเรียนรู้ โครงงานวิจัย การพัฒนาเว็บแอปพลิเคชัน และการร่วมมือสร้างสรรค์นวัตกรรม AI เพื่อชุมชนและสังคม ยินดีพูดคุยแลกเปลี่ยนเสมอครับ'
                  : 'Open to research collaborations, freelance web development, AI prototype engineering, and speaking/coaching engagements. Always excited to connect and brainstorm!'}
              </p>
            </div>

            {/* Direct Connections & Links */}
            <div className="flex flex-col gap-space-md p-space-md rounded-2xl bg-surface-container-low shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">alternate_email</span>
                <a
                  className="font-headline-sm text-body-md font-bold text-on-surface hover:text-primary transition-colors"
                  href="mailto:hi00000087@gmail.com"
                >
                  hi00000087@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                <a
                  className="font-headline-sm text-body-md font-bold text-on-surface hover:text-primary transition-colors"
                  href="tel:0921975525"
                >
                  092-197-5525
                </a>
              </div>

              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                <span>{language === 'th' ? 'ขอนแก่น / หล่มสัก จ.เพชรบูรณ์ (ประเทศไทย)' : 'Khon Kaen / Lom Sak, Phetchabun (Thailand)'}</span>
              </div>

              {/* Social Matrix */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs border-t border-surface-container">
                <a
                  className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors font-medium"
                  href="https://facebook.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  Facebook ↗
                </a>
                <a
                  className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors font-medium"
                  href="https://instagram.com/phisit012"
                  rel="noreferrer"
                  target="_blank"
                >
                  Instagram (@phisit012) ↗
                </a>
                <a
                  className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors font-medium"
                  href="https://github.com/easy-web-p"
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub (@easy-web-p) ↗
                </a>
              </div>

              {/* PDF Portfolio Download */}
              <a
                className="inline-flex items-center justify-center gap-space-xs w-full py-space-xs rounded-lg bg-primary text-on-primary font-label-sm text-label-sm shadow-[2px_2px_0px_#141b2b] hover:opacity-90 transition-colors font-bold"
                href="/documents/portfolio-phisit.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>
                  {language === 'th'
                    ? 'ดาวน์โหลดแฟ้มสะสมผลงาน (Portfolio_Phisit.pdf)'
                    : 'Download Full Portfolio (Portfolio_Phisit.pdf)'}
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-space-lg lg:p-space-xl rounded-2xl bg-surface-container-lowest shadow-[8px_8px_0px_#141b2b] border border-outline-variant/20">
              <form className="flex flex-col gap-space-md" id="contact-form" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  {/* Name Input */}
                  <div className="flex flex-col gap-space-xxs">
                    <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="contact-name">
                      {language === 'th' ? 'ชื่อ-นามสกุล / ชื่อผู้ติดต่อ *' : 'Your Name / Organization *'}
                    </label>
                    <input
                      className="w-full px-space-sm py-space-xs rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      id="contact-name"
                      placeholder={language === 'th' ? 'เช่น สมชาย ใจดี' : 'e.g. Alex Morgan'}
                      required
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-space-xxs">
                    <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="contact-email">
                      {language === 'th' ? 'อีเมลติดต่อกลับ *' : 'Email Address *'}
                    </label>
                    <input
                      className="w-full px-space-sm py-space-xs rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      id="contact-email"
                      placeholder="name@example.com"
                      required
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Project Type Pill Selector */}
                <div className="flex flex-col gap-space-xxs">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                    {language === 'th' ? 'หัวข้อเรื่องที่ต้องการติดต่อ' : 'Inquiry Scope / Topic'}
                  </label>
                  <div className="flex flex-wrap gap-space-xs" id="project-type-pills">
                    {(language === 'th'
                      ? [
                          'AI & Machine Learning',
                          'Web Application',
                          'Smart Agriculture / IoT',
                          'กิจกรรมเยาวชน & สังคม',
                          'พูดคุยแลกเปลี่ยน 👋',
                        ]
                      : [
                          'AI & Machine Learning',
                          'Web Application',
                          'Smart Agriculture / IoT',
                          'Youth & Civic Impact',
                          'Say Hello 👋',
                        ]
                    ).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setContactType(type)}
                        className={`px-space-sm py-space-xxs rounded-lg font-label-sm text-label-sm transition-all cursor-pointer font-medium ${
                          contactType === type
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brief Description Textarea */}
                <div className="flex flex-col gap-space-xxs">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="contact-message">
                    {language === 'th' ? 'ข้อความหรือรายละเอียดเบื้องต้น *' : 'Brief Project Details or Message *'}
                  </label>
                  <textarea
                    className="w-full px-space-sm py-space-xs rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y"
                    id="contact-message"
                    placeholder={
                      language === 'th'
                        ? 'เล่าถึงโครงงาน ไอเดีย หรือประเด็นที่ท่านต้องการปรึกษา...'
                        : 'Tell me about your project, idea, or how we might collaborate...'
                    }
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </div>

                {/* Budget Range Selector */}
                <div className="flex flex-col gap-space-xxs">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                    {language === 'th' ? 'ลักษณะความร่วมมือ' : 'Collaboration Nature'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
                    {[
                      { id: 'academic', label: language === 'th' ? 'การศึกษา/วิจัย' : 'Research / Academic' },
                      { id: 'project', label: language === 'th' ? 'โปรเจกต์พัฒนา' : 'Software Project' },
                      { id: 'volunteer', label: language === 'th' ? 'เพื่อสังคม/จิตอาสา' : 'Civic / Volunteer' },
                      { id: 'other', label: language === 'th' ? 'อื่นๆ' : 'General / Other' },
                    ].map((b) => (
                      <label key={b.id} className="cursor-pointer select-none">
                        <input
                          type="radio"
                          name="budget"
                          value={b.id}
                          checked={contactBudget === b.id}
                          onChange={() => setContactBudget(b.id)}
                          className="peer sr-only"
                        />
                        <div className="p-space-xs text-center rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm peer-checked:bg-primary peer-checked:text-on-primary transition-all font-medium">
                          {b.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button & Confirmation Feedback */}
                <div className="pt-space-xs">
                  {!formSubmitted ? (
                    <button
                      className="w-full inline-flex items-center justify-center gap-space-xs py-space-sm px-space-lg rounded-lg bg-primary text-on-primary font-headline-sm text-body-md shadow-[4px_4px_0px_#141b2b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#141b2b] active:translate-x-0 active:translate-y-0 transition-all duration-200 cursor-pointer font-bold disabled:opacity-75"
                      id="submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <span id="btn-text">
                        {isSubmitting
                          ? (language === 'th' ? 'กำลังส่งข้อความ...' : 'Sending message...')
                          : (language === 'th' ? 'ส่งข้อความติดต่อ →' : 'Send Message →')}
                      </span>
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                  ) : (
                    <div
                      className="p-space-sm rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-center font-bold shadow-xs animate-in fade-in duration-300"
                      id="form-feedback"
                    >
                      {language === 'th'
                        ? '🎉 ได้รับข้อความเรียบร้อยแล้วครับ! ขอบคุณที่ติดต่อเข้ามา จะรีบตอบกลับโดยเร็วที่สุดครับ'
                        : '🎉 Message received successfully! Thank you for reaching out, I will get back to you promptly.'}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

