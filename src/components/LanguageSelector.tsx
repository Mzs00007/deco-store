'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
];

export default function LanguageSelector() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1];

  return (
    <div className="relative group">
      <motion.button
        className="text-gray-600 dark:text-gray-300 hover:text-accent-DEFAULT dark:hover:text-accent-light transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Select language"
      >
        <GlobeAltIcon className="h-6 w-6" />
      </motion.button>

      <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <Link
            key={lang.code}
            href={`/${lang.code}${pathname.substring(3)}`}
            className={`block px-4 py-2 text-sm ${
              currentLang === lang.code
                ? 'text-accent-DEFAULT dark:text-accent-light bg-gray-100 dark:bg-gray-700'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {lang.name}
          </Link>
        ))}
      </div>
    </div>
  );
} 