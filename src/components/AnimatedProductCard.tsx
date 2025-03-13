'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

interface AnimatedProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative group">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      <div className="p-4">
        <motion.h3
          className="text-lg font-semibold text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {product.name}
        </motion.h3>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {product.description}
        </motion.p>

        <div className="mt-4 flex items-center justify-between">
          <motion.span
            className="text-xl font-bold text-accent-600 dark:text-accent-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            ${product.price.toFixed(2)}
          </motion.span>

          <div className="flex space-x-2">
            <motion.button
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400"
              onClick={onAddToWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </motion.button>

            <motion.button
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400"
              onClick={onAddToCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedProductCard; 