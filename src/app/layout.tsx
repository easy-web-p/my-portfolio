import type { Metadata, Viewport } from 'next';
import { Sora, Manrope, Inter, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { CartProvider } from '@/components/store/cart-context';
import { CartDrawer } from '@/components/store/cart-drawer';
import { MainContent } from '@/components/layout/main-content';
import { PublicCommandPalette } from '@/components/layout/public-command-palette';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { BackgroundKeyboardTranslator } from '@/components/layout/background-keyboard-translator';
import { LanguageProvider } from '@/context/language-context';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://phisitcode.web.app'),
  title: {
    default: 'PhisitCode | พิสิษฐ์ แก้วกุลพิสิฐ (phisitcode.web.app)',
    template: '%s | PhisitCode',
  },
  description:
    'PhisitCode (phisitcode.web.app) — พอร์ตโฟลิโอและคลังรวบรวมผลงานของ พิสิษฐ์ แก้วกุลพิสิฐ (Phisit Kaewkulphisit) จัดแสดงโครงงานซอฟต์แวร์ นวัตกรรม AI คลังโค้ด GitHub และดิจิทัลโปรดักต์',
  icons: {
    icon: '/images/stitch-logo.png',
  },
  openGraph: {
    title: 'PhisitCode | พิสิษฐ์ แก้วกุลพิสิฐ (Phisit Kaewkulphisit)',
    description:
      'PhisitCode (phisitcode.web.app) — พอร์ตโฟลิโอและคลังรวบรวมผลงานของ พิสิษฐ์ แก้วกุลพิสิฐ จัดแสดงโครงงานซอฟต์แวร์ นวัตกรรม AI และคลังโค้ด',
    url: 'https://phisitcode.web.app',
    siteName: 'PhisitCode',
    locale: 'th_TH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <MainContent>
              {children}
              <Footer />
            </MainContent>
            <BottomNav />
            <CartDrawer />
            <PublicCommandPalette />
            <CookieBanner />
            <BackgroundKeyboardTranslator />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
