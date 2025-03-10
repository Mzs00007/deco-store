'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  delay?: number;
}

const positions = {
  top: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    className: 'bottom-full left-1/2 -translate-x-1/2 mb-2'
  },
  bottom: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    className: 'top-full left-1/2 -translate-x-1/2 mt-2'
  },
  left: {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    className: 'right-full top-1/2 -translate-y-1/2 mr-2'
  },
  right: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    className: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }
};

export default function Tooltip({ 
  text, 
  position = 'top', 
  children,
  delay = 0.3
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay * 1000);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap ${positions[position].className}`}
            initial={positions[position].initial}
            animate={positions[position].animate}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 