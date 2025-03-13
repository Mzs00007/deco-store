'use client';

import React, { useState, Fragment, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, LazyMotion, domAnimation, m } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/store';
import LanguageSelector from './LanguageSelector';
import { DarkModeToggle } from './DarkModeToggle';
import { ErrorBoundary } from './ErrorBoundary';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchBar from '@/components/SearchBar';

interface HeaderErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const HeaderErrorFallback = ({ error, resetErrorBoundary }: HeaderErrorFallbackProps) => (
  <div className="bg-white dark:bg-gray-900 shadow-sm p-4">
    <div className="container mx-auto text-center">
      <p className="text-red-600 dark:text-red-400">Error loading header: {error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 bg-accent-DEFAULT hover:bg-accent-dark text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  </div>
);

const SectionErrorFallback = ({ error, resetErrorBoundary }: HeaderErrorFallbackProps) => (
  <div className="p-2 text-center">
    <p className="text-red-600 dark:text-red-400 text-sm">Error: {error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-1 text-sm text-accent-DEFAULT hover:text-accent-light"
    >
      Retry
    </button>
  </div>
);

export default function Header() {
  const t = useTranslations();
  const { cart } = useCartStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    
    try {
      if (!searchQuery.trim()) {
        throw new Error(t('errors.emptySearch'));
      }
      
      // In a real app, you would implement search functionality here
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(t('errors.searchFailed'));
      }
      
      setIsSearchOpen(false);
      setSearchQuery('');
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : t('errors.unexpectedError'));
    }
  }, [searchQuery, t]);

  return (
    <LazyMotion features={domAnimation}>
      <ErrorBoundary fallback={HeaderErrorFallback}>
        <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold text-accent-DEFAULT dark:text-accent-light">
                <motion.span 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  DecoStore
                </motion.span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300">
                  {t('navigation.home')}
                </Link>
                <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300">
                  {t('navigation.products')}
                </Link>
                <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300">
                  {t('navigation.categories')}
                </Link>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300">
                  {t('navigation.about')}
                </Link>
              </nav>
              
              {/* Actions */}
              <div className="flex items-center space-x-4">
                {/* Language Selector */}
                <ErrorBoundary fallback={SectionErrorFallback}>
                  <div className="hidden sm:block">
                    <LanguageSelector />
                  </div>
                </ErrorBoundary>
                
                {/* Dark Mode Toggle */}
                <ErrorBoundary fallback={SectionErrorFallback}>
                  <DarkModeToggle />
                </ErrorBoundary>
                
                {/* Search Button */}
                <motion.button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label={t('header.search')}
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </motion.button>
                
                {/* Wishlist */}
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link href="/wishlist" className="text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300 relative">
                    <HeartIcon className="h-6 w-6" />
                  </Link>
                </motion.div>
                
                {/* Cart */}
                <ErrorBoundary fallback={SectionErrorFallback}>
                  <m.button
                    className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={() => setIsCartOpen(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                    {cart.items.length > 0 && (
                      <m.span
                        className="absolute -top-1 -right-1 bg-accent-DEFAULT text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {cart.items.length}
                      </m.span>
                    )}
                  </m.button>
                </ErrorBoundary>
                
                {/* Profile Menu */}
                <ErrorBoundary fallback={SectionErrorFallback}>
                  <Menu as="div" className="relative">
                    <Menu.Button as={motion.button}
                      className="text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      aria-label={t('header.profile')}
                    >
                      <UserIcon className="h-6 w-6" />
                    </Menu.Button>
                    
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-gray-700 text-accent-DEFAULT dark:text-accent-light' : 'text-gray-700 dark:text-gray-300'
                                } block px-4 py-2 text-sm`}
                              >
                                {t('header.profile')}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/orders"
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-gray-700 text-accent-DEFAULT dark:text-accent-light' : 'text-gray-700 dark:text-gray-300'
                                } block px-4 py-2 text-sm`}
                              >
                                {t('header.orders')}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/settings"
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-gray-700 text-accent-DEFAULT dark:text-accent-light' : 'text-gray-700 dark:text-gray-300'
                                } block px-4 py-2 text-sm`}
                              >
                                {t('header.settings')}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-gray-700 text-accent-DEFAULT dark:text-accent-light' : 'text-gray-700 dark:text-gray-300'
                                } block w-full text-left px-4 py-2 text-sm`}
                                onClick={() => {
                                  try {
                                    // Implement logout logic here
                                    console.log('Logging out...');
                                  } catch (error) {
                                    console.error('Failed to logout:', error);
                                  }
                                }}
                              >
                                {t('header.logout')}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </ErrorBoundary>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <m.button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </m.button>
          </div>
          
          {/* Mobile Menu */}
          <ErrorBoundary fallback={SectionErrorFallback}>
            <m.div>
              {isMobileMenuOpen && (
                <m.div
                  className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col space-y-4">
                    <SearchBar />
                    <m.button
                      className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      onClick={() => {
                        setIsCartOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <ShoppingCartIcon className="w-6 h-6" />
                      <span>{t('cart.title')}</span>
                      {cart.items.length > 0 && (
                        <m.span
                          className="bg-accent-DEFAULT text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          {cart.items.length}
                        </m.span>
                      )}
                    </m.button>
                  </div>
                </m.div>
              )}
            </m.div>
          </ErrorBoundary>
        </header>
        
        {/* Search Overlay */}
        <ErrorBoundary fallback={SectionErrorFallback}>
          <m.div>
            {isSearchOpen && (
              <m.div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.2 }}
                onClick={() => setIsSearchOpen(false)}
              >
                <m.div
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6"
                  initial={{ scale: 0.9, opacity: 0, y: -20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={e => e.stopPropagation()}
                >
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('header.searchPlaceholder')}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-DEFAULT dark:bg-gray-700 dark:text-white"
                        autoFocus
                      />
                      {searchError && (
                        <p className="text-red-500 text-sm mt-1">{searchError}</p>
                      )}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300"
                      >
                        {t('common.cancel')}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-accent-DEFAULT hover:bg-accent-dark text-white rounded-lg transition-colors duration-300"
                      >
                        {t('common.search')}
                      </button>
                    </div>
                  </form>
                </m.div>
              </m.div>
            )}
          </m.div>
        </ErrorBoundary>
      </ErrorBoundary>
      
      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </LazyMotion>
  );
} 