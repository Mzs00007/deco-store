import React from 'react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import ClientLayout from '@/components/ClientLayout';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: typeof locales[number] };
}) {
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ClientLayout locale={locale} messages={messages as Record<string, Record<string, string>>}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
} 