'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

export default function Accordion({ 
  items, 
  allowMultiple = false,
  defaultExpanded = []
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setExpandedItems(prev => 
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setExpandedItems(prev => 
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {items.map((item) => (
        <div key={item.id} className="py-2">
          <button
            className="w-full flex items-center justify-between py-2 text-left"
            onClick={() => toggleItem(item.id)}
          >
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {item.title}
            </span>
            <motion.div
              animate={{ rotate: isExpanded(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {isExpanded(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto', 
                  opacity: 1,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2, delay: 0.1 }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 }
                  }
                }}
                className="overflow-hidden"
              >
                <div className="py-2 text-sm text-gray-600 dark:text-gray-400">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
} 