'use client';

import React from 'react';
import Image from 'next/image';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCartStore } from '@/lib/store';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const t = useTranslations();
  const { addItem } = useCartStore();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const handleAddToCart = () => {
    addItem({ id, name, price, image, quantity: 1 });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <motion.button
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
            onClick={() => setIsWishlisted(!isWishlisted)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isWishlisted ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </motion.button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-accent-DEFAULT">
              ${price.toFixed(2)}
            </span>
            <motion.button
              className="flex items-center space-x-1 bg-accent-DEFAULT text-white px-4 py-2 rounded-md"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span>{t('products.addToCart')}</span>
            </motion.button>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <motion.div
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {t('products.addedToCart')}
          </motion.div>
        )}
      </motion.div>
    </LazyMotion>
  );
} 