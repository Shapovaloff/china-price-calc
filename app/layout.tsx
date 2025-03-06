import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Калькулятор стоимости товаров из Китая',
  description: 'Калькулятор стоимости товаров из Китая',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/favicon/favicon-96x96.png',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon/favicon/favicon.svg',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      sizes: '180x180',
      url: '/favicon/site.webmanifest',
    },
  ],
  openGraph: {
    title: 'Калькулятор',
    images: '/og.png',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'width=device-width',
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
