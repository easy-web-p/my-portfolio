'use client';

import React from 'react';
import Link from 'next/link';

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0 print:m-0">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Action Controls (Hidden when printing) */}
        <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <span>/</span>
            <span className="text-primary font-bold">Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>พิมพ์เรซูเม่ (Print)</span>
            </button>
            <a
              href="/documents/portfolio-phisit.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-hard-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-hard-4 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>ดาวน์โหลด PDF พอร์ตโฟลิโอ</span>
            </a>
          </div>
        </div>

        {/* Printable Resume Document Sheet */}
        <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-8 sm:p-12 border border-outline-variant/25 shadow-sm print:shadow-none print:border-none print:p-0 print:bg-white text-on-surface">
          {/* Header Section */}
          <div className="pb-8 mb-8 border-b border-surface-container flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>Software Developer &amp; AI Innovator</span>
              </div>
              <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
                นายพิสิษฐ์ แก้วกุลพิสิฐ
              </h1>
              <p className="text-base sm:text-lg font-semibold text-primary mt-1">
                Mr. Phisit Kaewkulphisit • Artificial Intelligence &amp; Software Innovator
              </p>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-xl leading-relaxed">
                นักพัฒนาซอฟต์แวร์และนวัตกรรมปัญญาประดิษฐ์ (AI) โครงการผู้มีศักยภาพด้านคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น | มุ่งมั่นพัฒนาเว็บแอปพลิเคชัน โซลูชันอัจฉริยะ และเครื่องมือซอฟต์แวร์เพื่อขับเคลื่อนชุมชนและสังคม
              </p>
            </div>

            <div className="space-y-2 text-xs text-on-surface-variant font-medium shrink-0 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6 border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                <span>ขอนแก่น / หล่มเก่า เพชรบูรณ์ 67120</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                <a href="mailto:hi00000087@gmail.com" className="hover:underline text-primary font-semibold">
                  hi00000087@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                <a href="tel:0921975525" className="hover:underline font-semibold">
                  092-197-5525
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">photo_camera</span>
                <a href="https://instagram.com/phisit012" target="_blank" rel="noreferrer" className="hover:underline">
                  IG: @phisit012
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                <span>FB: Phisit kaewkulphisit</span>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">school</span>
              <span>ประวัติการศึกษา (Education)</span>
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface border-l-4 border-primary border border-outline-variant/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-on-surface">
                    วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น (College of Computing, KKU)
                  </h3>
                  <span className="text-xs font-mono text-primary font-bold px-2.5 py-0.5 rounded-full bg-primary-fixed">
                    2568 – ปัจจุบัน (ปี 1)
                  </span>
                </div>
                <span className="text-xs font-semibold text-on-surface mt-1 block">
                  หลักสูตรวิทยาศาสตรบัณฑิต (ปัญญาประดิษฐ์) สาขาปัญญาประดิษฐ์ (วท.บ. ปัญญาประดิษฐ์)
                </span>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  ได้รับคัดเลือกเข้าศึกษาผ่าน **โครงการผู้มีศักยภาพด้านคอมพิวเตอร์** มุ่งเน้นการวิจัยและพัฒนาปัญญาประดิษฐ์ โมเดลภาษา ระบบอัตโนมัติ และการประยุกต์ใช้เพื่อการพัฒนาชุมชนและประเทศ
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface border-l-4 border-outline-variant border border-outline-variant/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-on-surface">
                    โรงเรียนหล่มสักวิทยาคม จังหวัดเพชรบูรณ์
                  </h3>
                  <span className="text-xs font-mono text-on-surface-variant font-medium">
                    มัธยมศึกษาตอนปลาย
                  </span>
                </div>
                <span className="text-xs font-semibold text-on-surface-variant mt-1 block">
                  แผนการเรียน วิทยาศาสตร์ – คณิตศาสตร์
                </span>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  สมาชิกชุมนุมซ่อมคอมพิวเตอร์, หัวหน้าแกนนำฝ่ายกิจกรรม ม.5/7, แกนนำเพื่อนที่ปรึกษา YC และตัวแทนแข่งขันวิชาการด้านคอมพิวเตอร์และโครงงานวิทยาศาสตร์
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills Clusters */}
          <div className="mb-8">
            <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              <span>ทักษะและความสามารถ (Skills &amp; Capabilities)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <span className="font-bold text-on-surface block mb-1">AI &amp; Smart Solutions</span>
                <p className="text-on-surface-variant leading-relaxed">
                  OpenAI / ChatGPT API, Dialogflow, Generative AI, Prompt Engineering, ระบบคัดกรองข้อความเสี่ยง, AI ให้คำปรึกษา
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <span className="font-bold text-on-surface block mb-1">Web &amp; Programming</span>
                <p className="text-on-surface-variant leading-relaxed">
                  HTML5, CSS3, JavaScript, TypeScript, Python, C++, Java, Node.js, MySQL, Google Maps API, Git &amp; GitHub
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <span className="font-bold text-on-surface block mb-1">Hardware &amp; Soft Skills</span>
                <p className="text-on-surface-variant leading-relaxed">
                  ช่างซ่อมคอมพิวเตอร์และระบบเครือข่ายเบื้องต้น, ภาวะผู้นำ, การรับฟังอย่างเข้าอกเข้าใจ (Active Listening), พิธีกรและการสื่อสาร
                </p>
              </div>
            </div>
          </div>

          {/* Key Featured Projects */}
          <div className="mb-8">
            <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">military_tech</span>
              <span>ผลงานและรางวัลเด่น (Featured Projects &amp; Awards)</span>
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-on-surface">
                    🥇 รางวัลชนะเลิศ เหรียญทอง โครงงานคอมพิวเตอร์ประเภทซอฟต์แวร์ — แอปพลิเคชัน “เกษตรอินเสิร์ท”
                  </h3>
                  <span className="text-xs font-mono text-tertiary font-bold">พ.ย. 2566</span>
                </div>
                <span className="text-xs text-primary font-semibold block mt-0.5">
                  งานศิลปหัตถกรรมนักเรียน ครั้งที่ 71 ระดับเขตพื้นที่การศึกษา สพม.เพชรบูรณ์ เขต 2
                </span>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  พัฒนาแอปพลิเคชันรวบรวมข้อมูลข้าวครบวงจร ประยุกต์ใช้เทคโนโลยี AI แนะนำการปลูกและการใช้ปุ๋ยให้เหมาะสมกับสายพันธุ์ข้าวและสภาพพื้นที่ ช่วยให้เกษตรกรเข้าถึงข้อมูลง่าย สะดวกรวดเร็ว และแม่นยำ
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-on-surface">
                    🏆 เกียรติบัตรระดับภูมิภาคเหนือ — เว็บไซต์แผนที่ร้านตัดผมในตำบลหล่มสัก
                  </h3>
                  <span className="text-xs font-mono text-on-surface-variant font-medium">ก.ค. 2566</span>
                </div>
                <span className="text-xs text-primary font-semibold block mt-0.5">
                  งานเกษตรนเรศวรเอ็กซ์โป 2023 ณ คณะเกษตรศาสตร์ฯ มหาวิทยาลัยนเรศวร
                </span>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  จัดทำระบบแผนที่ออนไลน์เชื่อมโยง Google Maps API และฐานข้อมูล รวบรวมพิกัดและรายละเอียดร้านตัดผม ช่วยเพิ่มการมองเห็นและสร้างตัวตนทางดิจิทัลให้แก่ผู้ประกอบการรายย่อยในท้องถิ่น
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-on-surface">
                    🥈 รางวัลเหรียญเงิน มหกรรมการนำเสนอผลงานวิชาการนักเรียน ครั้งที่ 2
                  </h3>
                  <span className="text-xs font-mono text-on-surface-variant font-medium">มี.ค. 2567</span>
                </div>
                <span className="text-xs text-primary font-semibold block mt-0.5">
                  โครงงานศึกษาค้นคว้าด้วยตนเอง (IS) — การสำรวจพฤติกรรมการใช้ปุ๋ยทางการเกษตร บ้านท่าโก
                </span>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  วิเคราะห์ข้อมูลพฤติกรรมการใช้ปุ๋ยเคมีและชีวมวลของเกษตรกรกลุ่ม GAP (30 ราย) และไม่ใช่ GAP (191 ราย) เพื่อพัฒนาสื่อส่งเสริมการใช้ปุ๋ยอย่างยั่งยืน
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-on-surface">
                    🥇 รางวัลชนะเลิศ การเขียนโปรแกรมด้วยภาษาคอมพิวเตอร์
                  </h3>
                  <span className="text-xs font-mono text-tertiary font-bold">ส.ค. 2567</span>
                </div>
                <span className="text-xs text-primary font-semibold block mt-0.5">
                  กิจกรรมสัปดาห์วิทยาศาสตร์แห่งชาติ ณ โรงเรียนหล่มสักวิทยาคม
                </span>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  แข่งขันเขียนโค้ดแก้ปัญหาอัลกอริทึมและตรรกะโปรแกรมมิ่ง ได้รับรางวัลชนะเลิศอันดับ 1
                </p>
              </div>
            </div>
          </div>

          {/* Leadership & Activities */}
          <div>
            <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>บทบาทผู้นำและกิจกรรมเพื่อสังคม (Leadership &amp; Community Service)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <span className="font-bold text-on-surface block text-sm">ประธานสภาเด็กและเยาวชนเทศบาลเมืองหล่มสัก</span>
                <span className="text-xs text-primary font-semibold">พ.ศ. 2568</span>
                <p className="text-on-surface-variant mt-1.5 leading-relaxed">
                  นำทีมตัวแทนเยาวชนจัดกิจกรรมสร้างสรรค์สังคม เช่น โครงการสุขภาพจิต พิชิตใจวัยทีน, บอร์ดเกมบิงโกบุหรี่ไฟฟ้า, และร่วมขับเคลื่อนท้องถิ่นต้นแบบ
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <span className="font-bold text-on-surface block text-sm">พลเมืองจิตอาสา SET HERO รุ่นที่ ๗ (100 ชั่วโมง)</span>
                <span className="text-xs text-primary font-semibold">จิตอาสาเพื่อสังคม</span>
                <p className="text-on-surface-variant mt-1.5 leading-relaxed">
                  ผ่านการอบรมทักษะทางจิตวิทยาและการเป็นผู้นำ และนำกระบวนการเรียนรู้ทางจิตวิทยาไปจัดกิจกรรมส่งต่อให้กับเพื่อนนักเรียนในชุมนุม
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <span className="font-bold text-on-surface block text-sm">นักเรียนแกนนำ เพื่อนที่ปรึกษา YC (Youth Counselor)</span>
                <span className="text-xs text-primary font-semibold">โรงเรียนหล่มสักวิทยาคม</span>
                <p className="text-on-surface-variant mt-1.5 leading-relaxed">
                  ทำหน้าที่รับฟัง เข้าใจปัญหา และให้คำแนะนำเบื้องต้นแก่เพื่อนและน้อง ๆ อย่างปลอดภัย เป็นแรงบันดาลใจในการต่อยอดสู่ AI เพื่อสุขภาพจิต
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/15">
                <span className="font-bold text-on-surface block text-sm">ตัวแทนเสวนาประเด็น AI วันสตรีสากล 2568</span>
                <span className="text-xs text-primary font-semibold">จังหวัดเพชรบูรณ์</span>
                <p className="text-on-surface-variant mt-1.5 leading-relaxed">
                  ร่วมจัดบอร์ด &ldquo;พื้นที่ปลอดภัย&rdquo; และเป็นผู้เสริมประเด็นความเสี่ยงของ AI ต่อเด็ก สตรี และเยาวชน เช่น Deepfake และภัยไซเบอร์
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
