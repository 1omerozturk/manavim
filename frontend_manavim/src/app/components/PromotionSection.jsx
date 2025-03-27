import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PromotionSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Taze ve Organik Ürünler
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Yerel çiftçilerden direkt sofranıza gelen doğal lezzetler. 
              Mevsiminde yetişen, hormonsuz ve katkısız ürünler.
            </p>
            <ul className="space-y-4">
              {[
                "100% Organik Sertifikalı",
                "Aynı Gün Teslimat",
                "Yerel Üreticilerden Direkt Tedarik",
                "Mevsimsel Ürün Garantisi"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <svg className="h-6 w-6 text-green-500 dark:text-green-400" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" 
                      strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full 
            hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 
            transition-colors">
              Hemen Keşfet
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/images/organic-products.jpg"
              alt="Organik Ürünler"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PromotionSection; 