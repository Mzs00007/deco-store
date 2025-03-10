'use client';

import React, { useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import { useDarkMode } from '@/store/darkMode';
import Footer from '@/components/Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: string;
  messages: any;
}

export default function ClientLayout({ children, locale, messages }: ClientLayoutProps) {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
} 