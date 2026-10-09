'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ContactFormData } from '@/lib/validation';
import { useLanguage } from '@/context/language-context';

export const ContactForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    service: 'AI Prototyping & UX',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          service: 'AI Prototyping & UX',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(
          result.error ||
            (language === 'th'
              ? 'ไม่สามารถส่งข้อความได้ กรุณาตรวจสอบข้อมูลในแบบฟอร์ม'
              : 'Failed to deliver message. Please check the form.')
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        language === 'th'
          ? 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้งหรือติดต่อทางอีเมลโดยตรง'
          : 'Network error occurred. Please try again or reach out directly.'
      );
    }
  };

  return (
    <div className="w-full bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border-2 border-[#1a1c1a] shadow-[6px_6px_0px_#1a1c1a]">
      {status === 'success' ? (
        <div className="flex flex-col items-center text-center py-10 gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-tactile-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-display font-black text-2xl text-on-surface">
            {t('contact.form.successTitle')}
          </h3>
          <p className="text-on-surface-variant text-sm max-w-sm">
            {t('contact.form.successDesc')}
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#111827] text-white font-display font-bold text-xs shadow-tactile-sm cursor-pointer hover:bg-primary transition-colors"
          >
            {t('contact.form.sendAnother')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {status === 'error' && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-display font-bold text-xs text-on-surface">
                {t('contact.form.name')} <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={language === 'th' ? 'เช่น นายสมชาย ใจดี' : 'e.g. Alex Morgan'}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-display font-bold text-xs text-on-surface">
                {t('contact.form.email')} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="font-display font-bold text-xs text-on-surface">
                {t('contact.form.service')}
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
              >
                <option value="AI Prototyping & UX">
                  {language === 'th' ? 'ต้นแบบ AI และ ออกแบบ UX/UI' : 'AI Prototyping & UX'}
                </option>
                <option value="Fullstack Web Application">
                  {language === 'th' ? 'พัฒนาเว็บแอปพลิเคชัน Full-stack' : 'Fullstack Web Application'}
                </option>
                <option value="Web GIS & Map Dashboard">
                  {language === 'th' ? 'ระบบแผนที่ดิจิทัล (Web GIS & Maps)' : 'Web GIS & Map Dashboard'}
                </option>
                <option value="Design System & Code Templates">
                  {language === 'th' ? 'เทมเพลตโค้ด & Design System' : 'Design System & Code Templates'}
                </option>
                <option value="Other Inquiries">
                  {language === 'th' ? 'เรื่องอื่นๆ / ปรึกษาทั่วไป' : 'Other Inquiries'}
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="font-display font-bold text-xs text-on-surface">
                {t('contact.form.subject')} <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder={language === 'th' ? 'สรุปประเด็นที่ต้องการหารือ...' : 'Brief project summary...'}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-display font-bold text-xs text-on-surface">
              {t('contact.form.message')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={
                language === 'th'
                  ? 'บอกเล่าเป้าหมาย ขนาดทีม กรอบเวลาที่ต้องการ หรือความท้าทายที่ต้องการให้ผมช่วยพัฒนา...'
                  : 'Tell me about your goals, team size, target timeline, or what challenge needs solving...'
              }
              className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all resize-y"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 rounded-full bg-[#111827] text-white font-display font-black text-sm shadow-[4px_4px_0px_#8455ef] border border-[#1a1c1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#8455ef] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t('contact.form.sending')}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t('contact.form.submit')}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
