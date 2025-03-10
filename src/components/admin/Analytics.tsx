'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    id: 'revenue',
    name: 'Total Revenue',
    value: '$23,456',
    change: '+12.5%',
    icon: CurrencyDollarIcon,
    trend: 'up'
  },
  {
    id: 'orders',
    name: 'Total Orders',
    value: '156',
    change: '+8.2%',
    icon: ShoppingCartIcon,
    trend: 'up'
  },
  {
    id: 'customers',
    name: 'Total Customers',
    value: '2,345',
    change: '+15.3%',
    icon: UserGroupIcon,
    trend: 'up'
  },
  {
    id: 'conversion',
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-0.4%',
    icon: ChartBarIcon,
    trend: 'down'
  }
];

export default function Analytics() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon
                  className="h-6 w-6 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <span
                className={`font-medium ${
                  stat.trend === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-gray-500 dark:text-gray-400"> from last month</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 