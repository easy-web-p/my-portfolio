'use client';

import { useEffect } from 'react';
import { translateText, translateKey, handleKeyStroke } from '@/lib/keyboardTranslator';

/**
 * Background Keyboard Translator
 * 
 * ทำงานอยู่เบื้องหลังแบบ 100% (ไม่แสดงผล UI บนหน้าจอ):
 * 1. ดักจับคีย์ลัดระดับสากล (Global Hotkey: F2 หรือ Alt+T) เมื่อโฟกัสที่ช่อง Input / Textarea ใดๆ
 *    เพื่อแปลงข้อความที่ลืมเปลี่ยนภาษา (เช่น l;ylfu ⇄ สวัสดี, ้ำสสน ⇄ hello) ในเบื้องหลังทันที
 * 2. ลงทะเบียน API บน window สำหรับเรียกใช้งานในเบื้องหลัง
 */
export function BackgroundKeyboardTranslator() {
  useEffect(() => {
    // 1. ลงทะเบียน Global Helper บน window สำหรับเรียกใช้งานเบื้องหลัง
    if (typeof window !== 'undefined') {
      (window as unknown as { __translateKeyboard: typeof translateText }).__translateKeyboard = translateText;
      (window as unknown as { __translateKey: typeof translateKey }).__translateKey = translateKey;
    }

    // 2. ดักจับคีย์บอร์ดในระดับ Window เมื่อพิมพ์ใน Input/Textarea
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (!activeEl) return;

      const isInputElement =
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable;

      if (!isInputElement) return;

      const input = activeEl as HTMLInputElement | HTMLTextAreaElement;

      // คีย์ลัดแปลงคำที่พิมพ์ผิดในช่องทันที: F2 หรือ Alt+T
      const isHotkey =
        e.key === 'F2' ||
        (e.altKey && e.key?.toLowerCase() === 't');

      if (isHotkey) {
        e.preventDefault();
        e.stopPropagation();

        const currentVal = input.value ?? '';
        if (!currentVal) return;

        // แปลงข้อความสลับภาษาไทย <-> อังกฤษ
        const converted = translateText(currentVal, 'auto');

        input.value = converted;

        // กระตุ้น Input Event เพื่อให้ React Form / State รับรู้
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        // คืนตำแหน่ง Cursor
        input.setSelectionRange(converted.length, converted.length);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown, true);
    };
  }, []);

  // ไม่แสดงผลองค์ประกอบ UI ใดๆ บนหน้าจอ
  return null;
}
