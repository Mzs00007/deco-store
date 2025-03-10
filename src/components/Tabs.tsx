'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills';
}

export default function Tabs({ 
  tabs, 
  activeTab, 
  onChange,
  variant = 'default'
}: TabsProps) {
  const currentTab = activeTab || tabs[0]?.id;

  const variants = {
    default: {
      tabList: "flex border-b border-gray-200 dark:border-gray-700",
      tab: (isActive: boolean) => `
        px-4 py-2 -mb-px text-sm font-medium 
        ${isActive 
          ? 'text-accent-600 border-b-2 border-accent-600' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
        }
      `
    },
    pills: {
      tabList: "flex space-x-2",
      tab: (isActive: boolean) => `
        px-4 py-2 rounded-full text-sm font-medium transition-colors
        ${isActive
          ? 'bg-accent-600 text-white'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800'
        }
      `
    }
  };

  return (
    <div>
      {/* Tab List */}
      <div className={variants[variant].tabList}>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={variants[variant].tab(tab.id === currentTab)}
            onClick={() => onChange(tab.id)}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => (
            tab.id === currentTab && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {tab.content}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 