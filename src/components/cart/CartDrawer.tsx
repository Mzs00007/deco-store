'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import Drawer from '@/components/Drawer';
import { useCartStore } from '@/store/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeItem, updateQuantity } = useCartStore(state => ({
    cart: state.cart,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity
  }));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Shopping Cart"
      position="right"
      size="md"
    >
      <div className="flex flex-col h-full">
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <span className="text-4xl mb-2">🛒</span>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    className="p-2 text-gray-400 hover:text-red-500"
                    onClick={() => removeItem(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <span className="text-base font-medium text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-lg font-semibold text-accent-600">
                ${total.toFixed(2)}
              </span>
            </div>

            <motion.button
              className="w-full bg-accent-600 text-white py-3 rounded-lg font-medium
                hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Checkout
            </motion.button>
          </div>
        )}
      </div>
    </Drawer>
  );
} 