import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import ClientLayout from '@/components/ClientLayout';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <ClientLayout locale={locale} messages={messages}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
} 