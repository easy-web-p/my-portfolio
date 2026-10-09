import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'กรุณาระบุชื่ออย่างน้อย 2 ตัวอักษร'),
  email: z.string().email('กรุณาระบุอีเมลที่ถูกต้อง'),
  subject: z.string().min(3, 'กรุณาระบุหัวข้อข้อความ'),
  service: z.string().optional(),
  message: z.string().min(10, 'กรุณาระบุข้อความอย่างน้อย 10 ตัวอักษร'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
