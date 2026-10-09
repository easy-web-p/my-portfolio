'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Code2,
  Wrench,
  HeartHandshake,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Layers,
  Award,
  Users,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  badge: string;
  description: string;
  project: string;
  code: string;
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'kaset-ai',
    name: 'kaset_advisor.py',
    language: 'Python',
    badge: 'AI & Smart Agriculture',
    project: 'โครงงาน เกษตรอินเสิร์ท (รางวัลชนะเลิศ เหรียญทอง ศิลปหัตถกรรม 71)',
    description: 'อัลกอริทึมวิเคราะห์ปริมาณธาตุอาหารในดิน (N-P-K) และแนะนำสูตรปุ๋ยเคมีร่วมกับปุ๋ยอินทรีย์ตามช่วงการเจริญเติบโตของข้าว',
    code: `class KasetInsertAI:
    """
    Kaset Insert: Rice Cultivation & N-P-K Fertilizer Optimization Engine
    พัฒนาโดย: พิสิษฐ์ แก้วกุลพิสิฐ (โครงงานชนะเลิศเหรียญทอง ศิลปหัตถกรรม ครั้งที่ 71)
    """
    RICE_VARIETIES = {
        "Khao Dawk Mali 105": {"duration_days": 120, "opt_ph": (5.5, 6.5), "base_npk": (16, 16, 8)},
        "RD43": {"duration_days": 95, "opt_ph": (5.5, 7.0), "base_npk": (15, 15, 15)},
        "Phitsanulok 2": {"duration_days": 115, "opt_ph": (6.0, 7.5), "base_npk": (16, 20, 0)}
    }

    def analyze_soil_and_recommend(self, variety_name: str, soil_ph: float, organic_matter_pct: float, stage: str):
        variety = self.RICE_VARIETIES.get(variety_name)
        if not variety:
            raise ValueError(f"Unknown variety: {variety_name}")

        recommendations = []
        is_ph_optimal = variety["opt_ph"][0] <= soil_ph <= variety["opt_ph"][1]
        
        if not is_ph_optimal:
            adj = "ใส่ปูนขาวเพื่อลดกรด" if soil_ph < variety["opt_ph"][0] else "ปรับปรุงดินด้วยอินทรียวัตถุ"
            recommendations.append(f"แจ้งเตือนค่า pH ({soil_ph:.1f}): แนะนำ{adj}")

        # ปรับสัดส่วน N-P-K ตามระยะการเจริญเติบโต (Vegetative, Reproductive, Ripening)
        if stage == "tillering": # ระยะแตกกอ: เน้นไนโตรเจน (N)
            target_formula = (46, 0, 0)
            kg_per_rai = 15.0 if organic_matter_pct < 2.0 else 10.0
        elif stage == "panicle_initiation": # ระยะกำเนิดช่อดอก: เน้นฟอสฟอรัส-โพแทสเซียม
            target_formula = (16, 16, 8)
            kg_per_rai = 20.0
        else:
            target_formula = variety["base_npk"]
            kg_per_rai = 12.5

        return {
            "variety": variety_name,
            "stage": stage,
            "recommended_fertilizer": target_formula,
            "rate_kg_per_rai": kg_per_rai,
            "advisories": recommendations,
            "status": "Optimal Calculation Completed"
        }`
  },
  {
    id: 'barber-map',
    name: 'barberMapService.ts',
    language: 'TypeScript',
    badge: 'Web GIS & Google Maps',
    project: 'เว็บไซต์แผนที่ร้านตัดผมในตำบลหล่มสัก (เกียรติบัตรภูมิภาคเหนือ ม.นเรศวร)',
    description: 'บริการประมวลผลพิกัดภูมิศาสตร์ (Web GIS) ค้นหาร้านตัดผมตามรัศมี และคำนวณระยะทางด้วยสูตร Haversine เชื่อมโยง Google Maps Markers',
    code: `interface BarberShop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  phone: string;
  services: string[];
  rating: number;
}

export class LomsakBarberGIS {
  private googleMap: google.maps.Map | null = null;
  private markers: Map<string, google.maps.Marker> = new Map();

  // คำนวณระยะห่างระหว่างพิกัดผู้ใช้และร้านตัดผม (Haversine Formula ในหน่วยกิโลเมตร)
  static calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (val: number) => (val * Math.PI) / 180;
    const R = 6371; // รัศมีโลก (km)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(2));
  }

  // กรองร้านตัดผมในตำบลหล่มสักตามรัศมีที่ผู้ใช้ระบุ
  filterShopsWithinRadius(shops: BarberShop[], userLat: number, userLng: number, maxRadiusKm: number) {
    return shops
      .map((shop) => ({
        ...shop,
        distanceKm: LomsakBarberGIS.calculateDistanceKm(userLat, userLng, shop.lat, shop.lng)
      }))
      .filter((shop) => shop.distanceKm <= maxRadiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }
}`
  },
  {
    id: 'mental-health',
    name: 'mentalHealthTriage.ts',
    language: 'TypeScript / Node.js',
    badge: 'AI Chatbot & Safety Triage',
    project: 'AI ให้คำปรึกษาด้านสุขภาพจิตเบื้องต้น (แกนนำเพื่อนที่ปรึกษา YC)',
    description: 'โมดูลคัดกรองอารมณ์และตรวจจับภาวะวิกฤต (Crisis Triage Webhook) พร้อมกลไกความปลอดภัยและส่งต่อสายด่วนสุขภาพจิต 1323',
    code: `import { OpenAI } from 'openai';

interface TriageResult {
  isCriticalCrisis: boolean;
  sentiment: 'DISTRESSED' | 'ANXIOUS' | 'STABLE' | 'NEUTRAL';
  safeResponse: string;
  emergencyHelpline?: string;
}

const CRITICAL_KEYWORDS = ['อยากตาย', 'ไม่อยากอยู่แล้ว', 'ทำร้ายตัวเอง', 'กรีดแขน', 'ฆ่าตัวตาย'];

export async function processYCMessage(userMessage: string): Promise<TriageResult> {
  const normalized = userMessage.trim().toLowerCase();
  
  // 1. Safety Guardrail: ตรวจสอบความเสี่ยงฉุกเฉินทันทีก่อนเรียก AI API
  const hasCriticalFlag = CRITICAL_KEYWORDS.some((kw) => normalized.includes(kw));
  if (hasCriticalFlag) {
    return {
      isCriticalCrisis: true,
      sentiment: 'DISTRESSED',
      safeResponse:
        'เราได้รับรู้ถึงความเจ็บปวดของคุณนะ คุณไม่ได้อยู่เพียงลำพัง กรุณาติดต่อสายด่วนสุขภาพจิต 1323 (โทรฟรีตลอด 24 ชั่วโมง) หรือพบคุณครูแนะแนว/เพื่อนที่ปรึกษา YC ทันทีครับ',
      emergencyHelpline: 'สายด่วนสุขภาพจิต 1323 หรือ 1669'
    };
  }

  // 2. หากปลอดภัย: ส่งต่อให้ LLM ในฐานะเพื่อนที่ปรึกษา YC ด้วย Active Listening Prompt
  const systemPrompt = \`คุณคือเพื่อนที่ปรึกษา YC (Youth Counselor) ให้คำปรึกษาด้วยความอบอุ่น ไม่ตัดสิน ไม่สั่งสอน 
และเน้นการสะท้อนความรู้สึกเพื่อช่วยให้ผู้รับคำปรึกษาคลายความกังวลในเบื้องต้น\`;

  // จำลองกระบวนการเชื่อมต่อ LLM Pipeline
  return {
    isCriticalCrisis: false,
    sentiment: 'ANXIOUS',
    safeResponse: 'ขอบคุณที่ไว้ใจเล่าให้เราฟังนะ เรื่องนี้ทำให้รู้สึกหนักใจและเหนื่อยมากเลยใช่ไหม ลองค่อยๆ ระบายเพิ่มได้นะ เราพร้อมรับฟังเสมอ'
  };
}`
  },
  {
    id: 'robot-controller',
    name: 'rescue_robot_controller.ino',
    language: 'C++ / Arduino',
    badge: 'Hardware & Robotics',
    project: 'หุ่นยนต์ขนส่งอุปกรณ์สาธารณูปโภคในสถานการณ์ฉุกเฉิน',
    description: 'ระบบควบคุมการขับเคลื่อนมอเตอร์ Dual H-Bridge และตรวจวัดระยะทางด้วย Ultrasonic HC-SR04 เพื่อนำส่งเวชภัณฑ์ในพื้นที่แคบ/ภัยพิบัติ',
    code: `#define TRIG_PIN 9
#define ECHO_PIN 10
#define MOTOR_LEFT_FWD 5
#define MOTOR_LEFT_REV 6
#define MOTOR_RIGHT_FWD 10
#define MOTOR_RIGHT_REV 11

const int SAFE_DISTANCE_CM = 25; // รัศมีความปลอดภัยขั้นต่ำ

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(MOTOR_LEFT_FWD, OUTPUT);
  pinMode(MOTOR_LEFT_REV, OUTPUT);
  pinMode(MOTOR_RIGHT_FWD, OUTPUT);
  pinMode(MOTOR_RIGHT_REV, OUTPUT);
}

long getUltrasonicDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout
  if (duration == 0) return 999;
  return duration * 0.034 / 2; // คำนวณเป็นเซนติเมตร
}

void moveForward(int speedPwm) {
  analogWrite(MOTOR_LEFT_FWD, speedPwm);
  analogWrite(MOTOR_LEFT_REV, 0);
  analogWrite(MOTOR_RIGHT_FWD, speedPwm);
  analogWrite(MOTOR_RIGHT_REV, 0);
}

void turnSafeAngle() {
  // ถอยหลังเล็กน้อยแล้วหมุนหลบสิ่งกีดขวาง
  analogWrite(MOTOR_LEFT_REV, 180);
  analogWrite(MOTOR_RIGHT_FWD, 180);
  delay(400);
}

void loop() {
  long distance = getUltrasonicDistance();
  if (distance > SAFE_DISTANCE_CM) {
    moveForward(200); // วิ่งนำส่งอุปกรณ์ไปข้างหน้า
  } else {
    turnSafeAngle(); // หลบหลีกสิ่งกีดขวางอัตโนมัติ
  }
  delay(50);
}`
  },
  {
    id: 'keyboard-translator',
    name: 'keyboardTranslator.ts',
    language: 'TypeScript / Keystroke API',
    badge: 'Keystroke & Input UX',
    project: 'ระบบดักจับการกดปุ่มและแปลงภาษาแป้นพิมพ์อัตโนมัติ (Thai-English Keystroke Translator)',
    description: 'อัลกอริทึมดักจับ KeyboardEvent แปลงอักขระไทย (เกษมณี) <-> อังกฤษ (QWERTY) แก้ปัญหาลืมเปลี่ยนภาษา พร้อมตรวจจับภาษาอัตโนมัติและสลับค่าใน DOM Input',
    code: `// Thai Kedmanee <-> US QWERTY Keystroke Translator Engine
// มาตรฐาน TIS 820-2531 รองรับสระ วรรณยุกต์ ตัวเลข และเครื่องหมายครบ 100%
// พัฒนาโดย: พิสิษฐ์ แก้วกุลพิสิฐ (GitHub: @easy-web-p)

export function handleKeyStroke(
  event: KeyboardEvent,
  targetElement?: HTMLInputElement | HTMLTextAreaElement,
  options?: { mode?: 'auto' | 'th2en' | 'en2th' }
): boolean {
  // ข้ามปุ่มคำสั่งพิเศษ เช่น Ctrl, Alt, Meta หรือปุ่มลูกศร
  if (event.ctrlKey || event.altKey || event.metaKey || event.key.length > 1) {
    return false;
  }

  const originalKey = event.key;
  const translatedChar = translateKey(originalKey);

  if (translatedChar !== originalKey && targetElement) {
    event.preventDefault();

    const start = targetElement.selectionStart ?? targetElement.value.length;
    const end = targetElement.selectionEnd ?? targetElement.value.length;
    const currentValue = targetElement.value;

    // แทรกตัวอักษรที่แปลงแล้ว ณ ตำแหน่ง Cursor ปัจจุบัน
    targetElement.value =
      currentValue.substring(0, start) +
      translatedChar +
      currentValue.substring(end);

    const nextPos = start + translatedChar.length;
    targetElement.setSelectionRange(nextPos, nextPos);
    targetElement.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  }
  return false;
}

export function translateText(text: string, mode: 'auto' | 'th2en' | 'en2th' = 'auto'): string {
  const isThai = detectLanguage(text) === 'th';
  const map = (mode === 'th2en' || (mode === 'auto' && isThai)) ? TH_TO_EN_MAP : EN_TO_TH_MAP;
  return text.split('').map(ch => map[ch] ?? ch).join('');
}`
  }
];

export default function ServicesPage() {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(CODE_SNIPPETS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const services = [
    {
      id: 'ai-prototyping',
      title: 'AI & Intelligent Chatbot Prototyping',
      subtitle: 'การพัฒนาแชตบอตอัจฉริยะและระบบเชื่อมต่อโมเดล AI',
      icon: Cpu,
      badge: 'ด้านที่ 1: AI & Data',
      accentColor: 'border-primary/40 bg-primary/5',
      description:
        'บริการออกแบบและพัฒนาต้นแบบ AI Chatbot, ระบบประมวลผลภาษาธรรมชาติ (NLP) และการเชื่อมต่อ LLM APIs (ChatGPT, Dialogflow) สำหรับแก้ปัญหาเฉพาะทาง เช่น การเกษตรอัจฉริยะ หรือระบบรับฟังสุขภาพจิต',
      deliverables: [
        'ออกแบบโครงสร้าง Prompt Engineering & Conversational Flow',
        'เชื่อมต่อ ChatGPT API / Dialogflow เข้ากับเว็บแอปพลิเคชัน และ LINE OA',
        'ระบบ Safety Guardrail และคัดกรองอารมณ์/ความเสี่ยงวิกฤต (Crisis Triage)',
        'พัฒนา AI ให้คำแนะนำเฉพาะโดเมน (Domain-Specific Recommendation Engine)'
      ],
      idealFor: 'หน่วยงาน ชุมชน หรือผู้พัฒนาที่ต้องการระบบ AI ต้นแบบที่ตอบสนองเร็วและมีประโยชน์จริง'
    },
    {
      id: 'web-gis',
      title: 'Web Application & Web GIS Development',
      subtitle: 'พัฒนาเว็บแอปพลิเคชันและระบบแผนที่ดิจิทัลเพื่อชุมชน',
      icon: Code2,
      badge: 'ด้านที่ 2: Software Dev',
      accentColor: 'border-secondary/40 bg-secondary/5',
      description:
        'บริการพัฒนาเว็บไซต์และเว็บแอปพลิเคชันสมัยใหม่ด้วย Next.js, React, TypeScript, Tailwind CSS ร่วมกับการประยุกต์ใช้ Google Maps API เพื่อเพิ่มการมองเห็นและสร้างมูลค่าทางเศรษฐกิจดิจิทัลให้แก่ชุมชน',
      deliverables: [
        'พัฒนา Web GIS & Interactive Map พร้อมฟังก์ชันรัศมีและค้นหาตำแหน่ง',
        'สร้าง User Interface ที่สวยงาม ลื่นไหล ใช้งานง่ายทั้งบนมือถือและคอมพิวเตอร์',
        'ออกแบบระบบฐานข้อมูล MySQL / PostgreSQL และเชื่อมต่อ RESTful APIs',
        'ปรับปรุงประสิทธิภาพหน้าเว็บ (Core Web Vitals & Fast Rendering)'
      ],
      idealFor: 'ผู้ประกอบการท้องถิ่น โครงงานระดับโรงเรียน/มหาวิทยาลัย และองค์กรที่ต้องการเว็บคุณภาพสูง'
    },
    {
      id: 'hardware-maintenance',
      title: 'Computer Hardware & System Maintenance',
      subtitle: 'บริการตรวจเช็ค ประกอบคอมพิวเตอร์ และซ่อมบำรุงระบบ',
      icon: Wrench,
      badge: 'ด้านที่ 3: IT Hardware',
      accentColor: 'border-amber-500/40 bg-amber-500/5',
      description:
        'ประสบการณ์ตรงจากชุมนุมซ่อมคอมพิวเตอร์ โรงเรียนหล่มสักวิทยาคม ให้บริการตรวจเช็คอาการเสีย วินิจฉัยข้อผิดพลาดของอุปกรณ์ ติดตั้งระบบปฏิบัติการ และปรับแต่งประสิทธิภาพคอมพิวเตอร์ให้พร้อมใช้งาน',
      deliverables: [
        'จัดสเปกและประกอบเครื่องคอมพิวเตอร์ตามงบประมาณและการใช้งาน',
        'ตรวจเช็คและเปลี่ยนอุปกรณ์ที่ชำรุด (RAM, SSD, Power Supply, GPU, พัดลมระบายความร้อน)',
        'ติดตั้งระบบปฏิบัติการ Windows / Linux พร้อมลงโปรแกรมและอัปเดตไดรเวอร์ที่ถูกต้อง',
        'ทำความสะอาด ทาซิลิโคนระบายความร้อนใหม่ และจัดสายไฟภายในเคสให้เป็นระเบียบ'
      ],
      idealFor: 'นักเรียน นักศึกษา บุคลากร และผู้ใช้งานทั่วไปที่ต้องการคอมพิวเตอร์ที่เสถียรและคุ้มค่า'
    },
    {
      id: 'youth-advocacy',
      title: 'Youth Leadership & Social Project Coordination',
      subtitle: 'การขับเคลื่อนงานเยาวชน จิตอาสา และกระบวนการเพื่อนที่ปรึกษา',
      icon: HeartHandshake,
      badge: 'ด้านที่ 4: Leadership & YC',
      accentColor: 'border-tertiary/40 bg-tertiary/5',
      description:
        'บทบาทประธานคณะทำงานสภาเด็กและเยาวชนเทศบาลเมืองหล่มสัก พ.ศ. 2568, แกนนำเพื่อนที่ปรึกษา (YC) และพลเมืองจิตอาสา SET HERO 100 ชั่วโมง พร้อมร่วมวางแผน ประสานงาน และเป็นวิทยากรถ่ายทอดความรู้',
      deliverables: [
        'เป็นผู้รับฟังและให้คำปรึกษาปัญหาเบื้องต้นด้วยเทคนิค Active Listening',
        'ร่วมวางแผนและจัดกิจกรรมส่งเสริมสิทธิและทักษะของเด็กและเยาวชนในชุมชน',
        'บรรยายและแลกเปลี่ยนประเด็นความปลอดภัยทางไซเบอร์และจริยธรรม AI (AI Ethics)',
        'ประสานงานโครงงานจิตอาสาพัฒนาสังคมเพื่อส่งเสริมจิตสาธารณะในคนรุ่นใหม่'
      ],
      idealFor: 'องค์กรเยาวชน ชมรมในสถาบันการศึกษา ชุมชนท้องถิ่น และกิจกรรมเพื่อสังคม'
    }
  ];

  const volunteerAchievements = [
    {
      role: 'ประธานคณะทำงานสภาเด็กและเยาวชน',
      org: 'สภาเด็กและเยาวชนเทศบาลเมืองหล่มสัก ประจำปี 2568',
      desc: 'นำทีมเยาวชนขับเคลื่อนกิจกรรมเพื่อสังคม ผลักดันสิทธิเด็ก นำเสนอประเด็นความปลอดภัยด้าน AI ในงานวันสตรีสากล และจัดกิจกรรมส่งเสริมทักษะเชิงบวก',
      icon: Users,
      badge: 'ผู้นำเยาวชน 2568'
    },
    {
      role: 'นักเรียนแกนนำเพื่อนที่ปรึกษา (Youth Counselor - YC)',
      org: 'ศูนย์เพื่อนใจวัยรุ่น โรงเรียนหล่มสักวิทยาคม',
      desc: 'ผ่านการอบรมทักษะการให้คำปรึกษาจิตวิทยาเบื้องต้น การรับฟังอย่างเข้าอกเข้าใจ (Active Listening) และการช่วยเหลือเพื่อนนักเรียนในการปรับตัวและจัดการความเครียด',
      icon: ShieldAlert,
      badge: 'แกนนำ YC'
    },
    {
      role: 'พลเมืองจิตอาสา SET HERO รุ่นที่ ๗',
      org: 'ตลาดหลักทรัพย์แห่งประเทศไทย (SET)',
      desc: 'ผ่านการฝึกอบรมการเป็นพลเมืองคุณภาพและปฏิบัติงานจิตอาสาบำเพ็ญประโยชน์ครบ 100 ชั่วโมง เพื่อสร้างผลกระทบเชิงบวกให้แก่สังคมและสิ่งแวดล้อม',
      icon: Award,
      badge: 'SET HERO 100 ชม.'
    },
    {
      role: 'ช่างเทคนิคและสมาชิกชุมนุมซ่อมคอมพิวเตอร์',
      org: 'โรงเรียนหล่มสักวิทยาคม',
      desc: 'บำเพ็ญประโยชน์ช่วยเหลืองานติดตั้งระบบคอมพิวเตอร์ของโรงเรียน ซ่อมบำรุงเครื่องคอมพิวเตอร์ในห้องปฏิบัติการ และดูแลระบบโสตทัศนูปกรณ์ในกิจกรรมต่างๆ',
      icon: Wrench,
      badge: 'บริการชุมชน'
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col gap-24">
      {/* Page Header */}
      <div className="flex flex-col gap-5 border-b border-outline-variant/40 pb-12">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>ความเชี่ยวชาญและบริการ (Services &amp; Capabilities)</span>
          </Badge>
          <Badge variant="neutral">
            <Bot className="w-3.5 h-3.5 text-secondary" />
            <span>Independent Software &amp; AI Developer</span>
          </Badge>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-on-surface tracking-tight leading-tight">
          สิ่งที่ผมสามารถทำได้ &amp; โอกาสร่วมงาน
        </h1>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-3xl leading-relaxed">
          ผสานความรู้ทางวิชาการด้าน <strong>ปัญญาประดิษฐ์ (AI)</strong>, การพัฒนา <strong>เว็บแอปพลิเคชันและแผนที่ดิจิทัล</strong>, ทักษะงานช่าง <strong>ฮาร์ดแวร์คอมพิวเตอร์</strong> และประสบการณ์ <strong>ผู้นำเยาวชนและจิตอาสาเพื่อสังคม</strong>
        </p>
      </div>

      {/* SECTION 1: SERVICES GRID */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
            01 / CORE SERVICE PILLARS
          </span>
          <h2 className="font-display font-black text-3xl text-on-surface">
            บริการและความสามารถที่พร้อมส่งมอบ
          </h2>
          <p className="text-on-surface-variant text-sm max-w-xl">
            พร้อมรับงานพัฒนาซอฟต์แวร์ โปรเจกต์ดิจิทัลต้นแบบ (PoC) โซลูชัน AI และงานจิตอาสาช่วยเหลือชุมชน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className={`p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border shadow-ambient flex flex-col justify-between gap-6 hover:shadow-xl transition-all duration-300 group ${s.accentColor}`}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-highest text-on-surface flex items-center justify-center shadow-sm border border-outline-variant/30 group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <Badge variant="primary" className="text-xs font-mono">
                      {s.badge}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-black text-2xl text-on-surface group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <span className="text-xs font-semibold text-on-surface-variant">
                      {s.subtitle}
                    </span>
                  </div>

                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {s.description}
                  </p>

                  <div className="flex flex-col gap-2.5 pt-3 border-t border-outline-variant/30">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary">
                      สิ่งที่จะได้รับ (Deliverables):
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {s.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-on-surface font-medium">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant italic">
                  <span>เหมาะสำหรับ: {s.idealFor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: VOLUNTEER & SOCIAL IMPACT */}
      <div className="flex flex-col gap-8 bg-surface-container-low p-8 sm:p-12 rounded-[2.5rem] border border-outline-variant/50">
        <div className="flex flex-col gap-2">
          <Badge variant="tactile" className="self-start">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Social Impact &amp; Advocacy</span>
          </Badge>
          <h2 className="font-display font-black text-3xl text-on-surface">
            งานจิตอาสาและบทบาทผู้นำเยาวชนเพื่อสังคม
          </h2>
          <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
            นอกเหนือจากด้านเทคโนโลยีคอมพิวเตอร์ ผมเชื่อมั่นในการใช้ความรู้และความทุ่มเทเพื่อพัฒนาคุณภาพชีวิตของผู้คนในท้องถิ่น ผ่านบทบาทต่างๆ ที่ได้รับความไว้วางใจ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {volunteerAchievements.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="text-[11px] font-mono">
                    {v.badge}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display font-bold text-lg text-on-surface">
                    {v.role}
                  </h3>
                  <span className="text-xs text-primary font-semibold">
                    {v.org}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: CODE SHOWCASE */}
      <div className="flex flex-col gap-6" id="code-showcase">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                03 / CODE LABORATORY &amp; ARTIFACTS
              </span>
            </div>
            <h2 className="font-display font-black text-3xl text-on-surface">
              ตัวอย่างโค้ดจริงที่ได้พัฒนาขึ้น (Code Showcase)
            </h2>
            <p className="text-on-surface-variant text-sm max-w-xl">
              สถาปัตยกรรมโค้ดบางส่วนจากโครงงานที่ได้รับรางวัล ทั้งภาษา Python, TypeScript, Node.js และ C++ Arduino
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CODE_SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                type="button"
                onClick={() => setSelectedSnippet(snippet)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                  selectedSnippet.id === snippet.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {snippet.name}
              </button>
            ))}
          </div>
        </div>

        {/* Code Viewer Box */}
        <div className="w-full rounded-3xl bg-[#0f172a] text-slate-100 shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="font-mono text-xs font-bold text-slate-300">
                {selectedSnippet.name}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-cyan-400">
                {selectedSnippet.language}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                {selectedSnippet.badge}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'คัดลอกแล้ว!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Snippet Context Info */}
          <div className="px-6 py-3 bg-slate-900/40 border-b border-slate-800/80 flex flex-col gap-1 text-xs text-slate-400">
            <p>
              <strong className="text-slate-200">ที่มา:</strong> {selectedSnippet.project}
            </p>
            <p className="text-slate-400">{selectedSnippet.description}</p>
          </div>

          {/* Syntax Highlighted Box */}
          <div className="p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed max-h-[480px]">
            <pre className="text-slate-200 font-mono">
              <code>{selectedSnippet.code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* SECTION 4: CREATIVE GALLERY & ANIME CAT BOY */}
      <div className="flex flex-col gap-8 bg-surface-container-low p-8 sm:p-12 rounded-[2.5rem] border border-outline-variant/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <Badge variant="primary" className="self-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Artwork &amp; AI Character Creation</span>
            </Badge>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-on-surface">
              Anime Character Art: Male with Cat Ears
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              ภาพตัวละครสไตล์อนิเมะดิจิทัลอาร์ต (Digital Anime Art) ตัวละครชายที่มีหูแมวและหางสุดเท่ ผสานแฟชั่นสตรีทแวร์แนวเทคโนโลยี (Tech-wear hoodie) พร้อมเอฟเฟกต์แสงนีออนดิจิทัล แสดงให้เห็นถึงความสามารถในการประยุกต์ใช้ Generative AI ในการสร้างสรรค์ผลงานภาพประกอบดิจิทัล
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-mono font-semibold text-primary">
                ✦ Anime Art Direction
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-mono font-semibold text-primary">
                ✦ Nekomimi Male Character
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-mono font-semibold text-primary">
                ✦ Cyber Tech-Wear Styling
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest ring-2 ring-primary/30 group">
              <Image
                src="/images/art/anime-cat-boy.jpg"
                alt="Anime style male character with cat ears"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-xs font-mono flex items-center justify-between">
                <span>Anime Cat Boy (AI Generated)</span>
                <span className="text-cyan-300 font-bold">1:1 Edition</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: CALL TO ACTION */}
      <div className="text-center flex flex-col items-center gap-5 p-12 rounded-[2.5rem] bg-surface-container-lowest border border-outline-variant/40 shadow-ambient">
        <Badge variant="secondary">พร้อมร่วมงาน &amp; แลกเปลี่ยนความคิดเห็น</Badge>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-on-surface">
          มีโครงงาน ไอเดีย หรือประเด็นที่อยากปรึกษา?
        </h2>
        <p className="text-on-surface-variant text-sm sm:text-base max-w-xl leading-relaxed">
          ยินดีร่วมมือในโปรเจกต์วิจัย AI, การพัฒนาเว็บแอปพลิเคชันเพื่อชุมชน, งานช่างซ่อมบำรุงคอมพิวเตอร์ และกิจกรรมอาสาพัฒนาเยาวชนครับ
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-[#111827] text-white font-display font-black text-sm shadow-[4px_4px_0px_#8455ef] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-2"
          >
            <span>ส่งข้อความติดต่อ (Contact Form)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="mailto:hi00000087@gmail.com"
            className="px-6 py-4 rounded-full bg-surface-container text-on-surface font-display font-bold text-sm hover:bg-surface-container-high transition-colors"
          >
            อีเมล: hi00000087@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
