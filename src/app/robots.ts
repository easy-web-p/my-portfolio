import { MetadataRoute } from 'next';

// ประกาศให้ generate ตอน build ไม่ใช่ตอน request
// จำเป็นสำหรับ output: 'export' (BUILD_TARGET=static) และไม่เปลี่ยนพฤติกรรม
// ของ build ปกติ เพราะไฟล์นี้ถูก prerender เป็น static อยู่แล้ว
// อ้างอิง: node_modules/next/dist/docs/01-app/02-guides/static-exports.md
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://phisitcode.web.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/dashboard/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
