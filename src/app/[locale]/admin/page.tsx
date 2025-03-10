'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSession } from '@/lib/auth';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import AdminManager from '@/components/admin/AdminManager';
import Analytics from '@/components/admin/Analytics';

type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const t = useTranslations();
  
  return (
    <div className="text-red-600 dark:text-red-400 p-4 rounded-lg bg-red-50 dark:bg-red-900/10">
      <p>{t('common.error')}</p>
      <button
        className="mt-2 text-sm text-red-700 dark:text-red-300 underline"
        onClick={resetErrorBoundary}
      >
        {t('common.tryAgain')}
      </button>
    </div>
  );
}

export default function AdminPage() {
  const t = useTranslations();
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const [activeTab, setActiveTab] = useState('analytics');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    const user = sessionData?.user as AdminUser | undefined;
    if (!user || !['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
      router.push('/');
      return;
    }

    setIsLoading(false);
  }, [status, sessionData, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('admin.title')}
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'analytics'
                ? 'border-accent-600 text-accent-600'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('analytics')}
          >
            {t('admin.tabs.analytics')}
          </button>
          <button
            className={`${
              activeTab === 'admins'
                ? 'border-accent-600 text-accent-600'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('admins')}
          >
            {t('admin.tabs.admins')}
          </button>
        </nav>
      </div>

      {/* Content */}
      <ErrorBoundary fallback={ErrorFallback}>
        {activeTab === 'analytics' ? (
          <Analytics />
        ) : (
          <AdminManager />
        )}
      </ErrorBoundary>
    </div>
  );
} 