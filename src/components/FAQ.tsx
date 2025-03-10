'use client';

import React from 'react';
import Accordion from '@/components/Accordion';

const faqItems = [
  {
    id: 'shipping',
    title: 'What are your shipping options?',
    content: (
      <div className="space-y-2">
        <p>We offer several shipping options:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Standard Shipping (5-7 business days)</li>
          <li>Express Shipping (2-3 business days)</li>
          <li>Next Day Delivery (order before 2 PM)</li>
        </ul>
        <p>Free shipping on orders over $50!</p>
      </div>
    )
  },
  {
    id: 'returns',
    title: 'What is your return policy?',
    content: (
      <div className="space-y-2">
        <p>We offer a hassle-free 30-day return policy:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Items must be unused and in original packaging</li>
          <li>Free returns on all orders</li>
          <li>Refunds are processed within 5-7 business days</li>
        </ul>
      </div>
    )
  },
  {
    id: 'payment',
    title: 'What payment methods do you accept?',
    content: (
      <div className="space-y-2">
        <p>We accept various payment methods:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
          <li>PayPal</li>
          <li>Apple Pay</li>
          <li>Google Pay</li>
        </ul>
      </div>
    )
  },
  {
    id: 'size',
    title: 'How do I find my size?',
    content: (
      <div className="space-y-2">
        <p>You can find your perfect size by:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Using our size guide in the product description</li>
          <li>Measuring yourself following our measurement guide</li>
          <li>Contacting our customer service for assistance</li>
        </ul>
      </div>
    )
  }
];

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion items={faqItems} allowMultiple={true} />
    </div>
  );
} 