'use client';

import React from 'react';
import Image from 'next/image';
import { Download, Sparkles, Terminal, Award, Lightbulb, Compass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

export const AboutView: React.FC = () => {
  const { t, language } = useLanguage();

  const milestones = [
    {
      periodTh: '2568 — ปัจจุบัน',
      periodEn: '2025 — Present',
      roleTh: 'นักศึกษาปริญญาตรี สาขาปัญญาประดิษฐ์',
      roleEn: 'Undergraduate, Artificial Intelligence',
      placeTh: 'วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น',
      placeEn: 'College of Computing, Khon Kaen University',
      descTh:
        'เข้าศึกษาในหลักสูตรวิทยาศาสตรบัณฑิต (ปัญญาประดิษฐ์) โครงการผู้มีศักยภาพด้านคอมพิวเตอร์ มุ่งเน้นการวิจัยและประยุกต์ใช้ AI เพื่อการเกษตรแม่นยำและชุมชน ควบคู่กับตำแหน่งประธานคณะทำงานสภาเด็กและเยาวชนเทศบาลเมืองหล่มสัก',
      descEn:
        'Admitted to B.S. in Artificial Intelligence (High-Potential Computing Talent Track). Researching precision agriculture AI models and community software, concurrently serving as President of the Lom Sak Youth Council.',
    },
    {
      periodTh: '2567',
      periodEn: '2024',
      roleTh: 'หัวหน้าแกนนำกิจกรรม & ชนะเลิศเขียนโปรแกรม',
      roleEn: 'Youth Activity Leader & 1st Place Coding Winner',
      placeTh: 'โรงเรียนหล่มสักวิทยาคม / สภาเด็กฯ',
      placeEn: 'Lomsakwittayakom School / Youth Council',
      descTh:
        'ได้รับรางวัลชนะเลิศ การเขียนโปรแกรมด้วยภาษาคอมพิวเตอร์ สัปดาห์วิทยาศาสตร์แห่งชาติ, พลเมืองจิตอาสา SET HERO 100 ชั่วโมง และนำเสนอประเด็นความปลอดภัยด้าน AI ในงานวันสตรีสากล',
      descEn:
        'First place winner in Computer Programming at National Science Week; certified SET HERO Volunteer (100+ hours); keynote presenter on AI safety and youth well-being at International Women\'s Day symposium.',
    },
    {
      periodTh: '2566',
      periodEn: '2023',
      roleTh: 'ชนะเลิศเหรียญทอง โครงงานซอฟต์แวร์ “เกษตรอินเสิร์ท”',
      roleEn: 'Gold Medal Winner: "Kaset Insert" AI Crop Engine',
      placeTh: 'งานศิลปหัตถกรรมนักเรียน ครั้งที่ 71 (สพม.เพชรบูรณ์ เขต 2)',
      placeEn: '71st National Student Arts & Crafts Fair (SESAO Phetchabun 2)',
      descTh:
        'พัฒนาแอปพลิเคชันรวบรวมข้อมูลข้าวและระบบ AI แนะนำการเพาะปลูกและใส่ปุ๋ย คว้ารางวัลชนะเลิศเหรียญทอง พร้อมได้รับเกียรติบัตรระดับภูมิภาคเหนือจากงานเกษตรนเรศวรเอ็กซ์โป 2023 ม.นเรศวร',
      descEn:
        'Engineered an agricultural optimization application with AI-driven N-P-K fertilizer recommendations for regional rice cultivars. Awarded Gold Medal First Prize and Upper Northern Regional Certificate at Naresuan Agri Expo.',
    },
    {
      periodTh: '2564',
      periodEn: '2021',
      roleTh: 'จุดเริ่มต้นความหลงใหลในคอมพิวเตอร์และโค้ดดิ้ง',
      roleEn: 'The Ignition: Self-Taught Programming Journey',
      placeTh: 'เรียนรู้ด้วยตนเองช่วง ม.1',
      placeEn: 'Independent Self-Study (Grade 7)',
      descTh:
        'เริ่มต้นศึกษาการเขียนเว็บไซต์ HTML/CSS จากช่อง YouTube Patiphan Phengpao และภาษา Python ออนไลน์ ต่อยอดสู่ความสนใจด้านปัญญาประดิษฐ์และ Cyber Security',
      descEn:
        'Started web engineering fundamentals via Patiphan Phengpao’s educational YouTube channel and online Python curricula, evolving rapidly into applied machine intelligence and software development.',
    },
  ];

  const workAbilities = [
    {
      titleTh: 'รับฟังผู้อื่น (Active Listening)',
      titleEn: 'Active Listening & Empathy',
      descTh: 'เปิดใจรับฟังความคิดเห็นจากเพื่อนร่วมทีมและผู้ใช้งาน เพื่อนำมาปรับปรุงงานให้ตอบโจทย์',
      descEn: 'Actively listening to user needs, teammates, and stakeholders to refine software solutions that genuinely solve problems.',
    },
    {
      titleTh: 'ใจเย็นและมีสติ',
      titleEn: 'Composed & Analytical Mindset',
      descTh: 'สุขุมรอบคอบในการแก้ปัญหาเฉพาะหน้า โดยเฉพาะงานเขียนโค้ดและดีบักระบบ',
      descEn: 'Maintaining calm problem-solving and rigorous analytical thinking, especially during complex debugging and critical deployments.',
    },
    {
      titleTh: 'กล้าทดลองทำสิ่งใหม่',
      titleEn: 'Fearless Experimentation',
      descTh: 'ไม่กลัวที่จะก้าวออกจาก Safe Zone เพื่อลงมือสร้างสรรค์นวัตกรรมที่ไม่เคยทำมาก่อน',
      descEn: 'Stepping outside comfort zones to embrace novel paradigms, state-of-the-art frameworks, and uncharted AI frontiers.',
    },
    {
      titleTh: 'จัดการเวลาได้ดี',
      titleEn: 'Exemplary Time Management',
      descTh: 'สามารถบริหารจัดการเวลาทั้งการเรียน การเขียนโปรแกรม และการทำกิจกรรมเพื่อสังคม',
      descEn: 'Balancing rigorous university coursework, open-source development, freelance commitments, and civic leadership.',
    },
    {
      titleTh: 'พัฒนาตนเองอยู่เสมอ',
      titleEn: 'Continuous Self-Directed Learning',
      descTh: 'หมั่นเรียนรู้เทคโนโลยีใหม่ๆ เช่น Generative AI และ Machine Learning ตลอดเวลา',
      descEn: 'Constantly tracking emerging technologies in LLMs, agent architectures, modern web frameworks, and machine learning.',
    },
  ];

  const tools = [
    'Python',
    'C++',
    'JavaScript',
    'TypeScript',
    'HTML5 & CSS3',
    'Node.js',
    'Next.js',
    'React',
    'MySQL / SQLite',
    'OpenAI & Gemini APIs',
    'Google Maps API',
    'VS Code',
    'Git & GitHub',
  ];

  return (
    <div className="py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col gap-16">
      {/* Intro Header */}
      <div className="flex flex-col gap-4 border-b border-outline-variant/40 pb-10">
        <Badge variant="secondary" className="self-start">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('about.badge')}</span>
        </Badge>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight">
          {t('about.headline')}
        </h1>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-3xl leading-relaxed">
          {t('about.intro')}
        </p>
      </div>

      {/* Main Grid: Portrait & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Portrait & Stats Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#1a1c1a] shadow-[6px_6px_0px_#1a1c1a] bg-primary-container">
            <Image
              src="/images/profile/phisit-hero.png"
              alt="นายพิสิษฐ์ แก้วกุลพิสิฐ"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/50 shadow-ambient flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              {t('about.summaryTitle')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-on-surface">
              <li className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                <span className="text-on-surface-variant">{t('about.eduLabel')}</span>
                <span className="font-bold text-right">{t('about.eduValue')}</span>
              </li>
              <li className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                <span className="text-on-surface-variant">{t('about.schoolLabel')}</span>
                <span className="font-bold">{t('about.schoolValue')}</span>
              </li>
              <li className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                <span className="text-on-surface-variant">{t('about.homeLabel')}</span>
                <span className="font-bold">{t('about.homeValue')}</span>
              </li>
              <li className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                <span className="text-on-surface-variant">{t('about.interestLabel')}</span>
                <span className="font-bold">{t('about.interestValue')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-on-surface-variant">{t('about.roleLabel')}</span>
                <span className="font-bold">{t('about.roleValue')}</span>
              </li>
            </ul>

            <a
              href="/documents/portfolio-phisit.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full py-3 rounded-full bg-[#111827] text-white font-display font-bold text-xs shadow-tactile-sm flex items-center justify-center gap-2 hover:bg-primary transition-all text-center cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('about.pdfBtn')}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Philosophy & Story */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              <Compass className="w-6 h-6 text-primary" />
              <span>{t('about.sopTitle')}</span>
            </h2>
            <div className="text-on-surface-variant text-base leading-relaxed space-y-4">
              {language === 'th' ? (
                <>
                  <p>
                    ความสนใจด้านคอมพิวเตอร์และหุ่นยนต์ของผมเริ่มต้นขึ้นในระดับมัธยมศึกษาปีที่ 1 ในช่วงการระบาดของโควิด-19 การได้พบช่อง YouTube ของคุณ Patiphan Phengpao ที่สอนการสร้างเว็บไซต์ ได้จุดประกายให้ผมเริ่มลงมือศึกษา HTML, CSS และการเขียนโปรแกรมเบื้องต้นภาษา Python ผ่านคอร์สเรียนออนไลน์ต่าง ๆ
                  </p>
                  <p>
                    ต่อมาเมื่อได้เข้าร่วมการอบรมด้าน AI และ Cyber Security ทำให้ผมมองเห็นภาพกว้างว่า เทคโนโลยีคอมพิวเตอร์สามารถนำไปใช้แก้ปัญหาจริงในสังคมได้อย่างหลากหลาย โดยเฉพาะด้านการเกษตรและชุมชน ผมจึงเริ่มทำโครงงาน <strong>“ระบบวิเคราะห์โรคพืชด้วย AI”</strong> และต่อยอดสร้างแอปพลิเคชัน <strong>“เกษตรอินเสิร์ท”</strong> เพื่อช่วยแนะนำการปลูกข้าวและการใช้ปุ๋ยแก่เกษตรกร จนได้รับรางวัลชนะเลิศเหรียญทองระดับเขตพื้นที่การศึกษา
                  </p>
                  <p>
                    ในขณะเดียวกัน บทบาทการเป็น <strong>นักเรียนแกนนำเพื่อนที่ปรึกษา (YC)</strong> และ <strong>ประธานสภาเด็กและเยาวชน</strong> ทำให้ผมตระหนักถึงปัญหาสุขภาพจิตของวัยรุ่น จึงได้เริ่มพัฒนาต้นแบบ <strong>AI Chatbot</strong> ให้คำปรึกษาด้านจิตใจเบื้องต้น เพื่อเป็นพื้นที่ปลอดภัยในการรับฟังผู้คน
                  </p>
                  <div className="p-4 rounded-2xl bg-secondary-fixed/50 border border-secondary-fixed-dim/30 text-on-surface text-sm font-medium">
                    💡 <em>&ldquo;การกล้าที่จะลองและกล้าที่จะลงมือทำ ทำให้ผมได้โตมาเป็นผมในปัจจุบันนี้ อย่ากลัวการที่จะผิดพลาด เพราะทุกประสบการณ์เป็นบทเรียนที่ทำให้เราเติบโต&rdquo;</em>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    My passion for computer science, robotics, and software engineering was ignited during Grade 7 amidst the COVID-19 pandemic. Discovering web development tutorials on YouTube inspired me to dive deeply into HTML, CSS, and algorithmic programming with Python through interactive courses.
                  </p>
                  <p>
                    As I participated in hands-on AI and cybersecurity seminars, I realized computing could solve tangible problems in our community—especially in precision agriculture. This led me to develop <strong>“AI Plant Disease Diagnostics”</strong> and subsequently the award-winning <strong>“Kaset Insert”</strong> application, which provided optimized rice fertilizing ratios and won First Place Gold Medal honors.
                  </p>
                  <p>
                    Concurrently, my responsibilities as <strong>Youth Counselor (YC) Lead</strong> and <strong>President of the Youth Council</strong> heightened my empathy towards teenage mental health challenges. This motivated me to architect conversational AI counselor prototypes designed as compassionate first-line listening spaces.
                  </p>
                  <div className="p-4 rounded-2xl bg-secondary-fixed/50 border border-secondary-fixed-dim/30 text-on-surface text-sm font-medium">
                    💡 <em>&ldquo;Having the courage to experiment and build fearlessly shaped who I am today. Never dread failure, for every obstacle is a foundational lesson in growth.&rdquo;</em>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Work Abilities / Attitude */}
          <div className="flex flex-col gap-4 pt-2">
            <h2 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              <span>{t('about.workAbilityTitle')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workAbilities.map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <h3 className="font-bold text-sm text-primary">
                    {language === 'th' ? item.titleTh : item.titleEn}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {language === 'th' ? item.descTh : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="flex flex-col gap-6 pt-4">
            <h2 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              <span>{t('about.milestonesTitle')}</span>
            </h2>

            <div className="flex flex-col gap-6 border-l-2 border-primary/40 pl-6 ml-2">
              {milestones.map((exp, i) => (
                <div key={i} className="flex flex-col gap-1.5 relative">
                  <span className="w-3.5 h-3.5 rounded-full bg-primary absolute -left-[31px] top-1.5 ring-4 ring-surface"></span>
                  <span className="text-xs font-display font-bold text-primary">
                    {language === 'th' ? exp.periodTh : exp.periodEn}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-on-surface">
                    {language === 'th' ? exp.roleTh : exp.roleEn}{' '}
                    <span className="text-on-surface-variant font-normal text-sm sm:text-base">
                      @ {language === 'th' ? exp.placeTh : exp.placeEn}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {language === 'th' ? exp.descTh : exp.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technical Stack */}
          <div className="flex flex-col gap-4 pt-4">
            <h2 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary" />
              <span>{t('about.toolsTitle')}</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface font-display text-xs font-bold shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
