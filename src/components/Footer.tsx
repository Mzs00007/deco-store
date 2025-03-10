'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ErrorBoundary } from './ErrorBoundary';

interface FooterErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const FooterErrorFallback = ({ error, resetErrorBoundary }: FooterErrorFallbackProps) => (
  <footer className="bg-gray-900 text-white py-4">
    <div className="container mx-auto px-4 text-center">
      <p className="text-red-400">Error loading footer: {error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 bg-accent-DEFAULT hover:bg-accent-dark text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  </footer>
);

const SectionErrorFallback = ({ error, resetErrorBoundary }: FooterErrorFallbackProps) => (
  <div className="p-4 bg-gray-800 rounded">
    <p className="text-red-400">Error: {error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-2 text-sm text-accent-DEFAULT hover:text-accent-light"
    >
      Try again
    </button>
  </div>
);

interface ContactInfo {
  street: string;
  district: string;
  email: string;
  phone: string;
}

export default function Footer() {
  const t = useTranslations();
  
  const getCurrentYear = useCallback(() => {
    try {
      return new Date().getFullYear();
    } catch (error) {
      console.error('Failed to get current year:', error);
      return '2024'; // Fallback year
    }
  }, []);

  const getContactInfo = useCallback((): ContactInfo => {
    try {
      // In a real app, this might come from an API or configuration
      return {
        street: '123 Decoration Street',
        district: 'Design District, 12345',
        email: 'info@deco-store.com',
        phone: '+1 (123) 456-7890'
      };
    } catch (error) {
      console.error('Failed to get contact info:', error);
      return {
        street: '',
        district: '',
        email: '',
        phone: ''
      };
    }
  }, []);

  const contactInfo = getContactInfo();
  
  return (
    <ErrorBoundary fallback={FooterErrorFallback}>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ErrorBoundary fallback={SectionErrorFallback}>
              <div>
                <h3 className="text-lg font-semibold mb-4">DecoStore</h3>
                <p className="text-gray-400">
                  {t('footer.description')}
                </p>
              </div>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={SectionErrorFallback}>
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('navigation.products')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/products?category=wall-art" className="text-gray-400 hover:text-white">
                      {t('categories.wall-art')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=vases" className="text-gray-400 hover:text-white">
                      {t('categories.vases')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=cushions" className="text-gray-400 hover:text-white">
                      {t('categories.cushions')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=lighting" className="text-gray-400 hover:text-white">
                      {t('categories.lighting')}
                    </Link>
                  </li>
                </ul>
              </div>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={SectionErrorFallback}>
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('footer.links')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white">
                      {t('navigation.home')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-gray-400 hover:text-white">
                      {t('navigation.products')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="text-gray-400 hover:text-white">
                      {t('navigation.cart')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/wishlist" className="text-gray-400 hover:text-white">
                      {t('navigation.wishlist')}
                    </Link>
                  </li>
                </ul>
              </div>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={SectionErrorFallback}>
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
                <address className="not-italic text-gray-400">
                  <p>{contactInfo.street}</p>
                  <p>{contactInfo.district}</p>
                  <p>Email: {contactInfo.email}</p>
                  <p>Phone: {contactInfo.phone}</p>
                </address>
              </div>
            </ErrorBoundary>
          </div>
          
          <ErrorBoundary fallback={SectionErrorFallback}>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {getCurrentYear()} DecoStore. {t('footer.rights')}</p>
            </div>
          </ErrorBoundary>
        </div>
      </footer>
    </ErrorBoundary>
  );
} 