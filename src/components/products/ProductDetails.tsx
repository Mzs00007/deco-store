'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Tabs from '@/components/Tabs';
import Tooltip from '@/components/Tooltip';
import { useCartStore, CartItem } from '@/store/cartStore';
import { Product } from '@/models/product';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const addToCart = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    };
    addToCart(cartItem);
  };

  const ProductDescription = () => (
    <div className="prose dark:prose-invert max-w-none">
      {product.description}
    </div>
  );

  const ProductSpecifications = () => (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(product.specifications).map(([key, value]) => (
        <div key={key} className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{key}</dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{value}</dd>
        </div>
      ))}
    </div>
  );

  const ProductReviews = () => (
    <div className="space-y-4">
      {product.reviews?.map((review) => (
        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-900 dark:text-white">{review.author}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-${i < review.rating ? 'yellow' : 'gray'}-400`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{review.comment}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 aspect-square rounded-lg overflow-hidden 
                  ${selectedImage === index ? 'ring-2 ring-accent-600' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>
          
          <p className="text-2xl font-semibold text-accent-600">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex space-x-4">
            <motion.button
              className="flex-1 bg-accent-600 text-white px-6 py-3 rounded-lg font-medium
                hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center space-x-2">
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Add to Cart</span>
              </span>
            </motion.button>

            <Tooltip text={isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
              <motion.button
                className={`p-3 rounded-lg border ${
                  isWishlist 
                    ? 'border-accent-600 text-accent-600' 
                    : 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400'
                }`}
                onClick={() => setIsWishlist(!isWishlist)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isWishlist ? (
                  <HeartSolidIcon className="w-6 h-6" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </motion.button>
            </Tooltip>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-8">
            <Tabs
              tabs={[
                {
                  id: 'description',
                  label: 'Description',
                  content: <ProductDescription />
                },
                {
                  id: 'specifications',
                  label: 'Specifications',
                  content: <ProductSpecifications />
                },
                {
                  id: 'reviews',
                  label: 'Reviews',
                  content: <ProductReviews />
                }
              ]}
              variant="pills"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 