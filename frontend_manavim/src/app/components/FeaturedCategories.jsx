"use client"

import React from 'react';
import { FaLeaf, FaAppleAlt, FaCarrot, FaCheese } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeaturedCategories = () => {
  const categories = [
    { icon: <FaLeaf className="text-4xl" />, name: "Yeşillikler", count: "25+ Ürün" },
    { icon: <FaAppleAlt className="text-4xl" />, name: "Meyveler", count: "30+ Ürün" },
    { icon: <FaCarrot className="text-4xl" />, name: "Sebzeler", count: "28+ Ürün" },
    { icon: <FaCheese className="text-4xl" />, name: "Süt Ürünleri", count: "20+ Ürün" },
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popüler Kategoriler</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">En çok tercih edilen ürün gruplarımız</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md 
              transition-all duration-200 dark:shadow-gray-700/20"
            >
              <div className="text-green-600 dark:text-green-500 mb-4">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{category.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories; 