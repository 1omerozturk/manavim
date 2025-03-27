"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const HealthyFoodShowcase = () => {
  const containerRef = useRef(null);

  const healthyFoods = [
    {
      id: 1,
      name: "Avokado",
      image: "/images/avocado.jpg",
      benefits: [
        "Sağlıklı yağlar açısından zengindir",
        "K vitamini deposudur",
        "Kalp sağlığını destekler",
        "Antioksidan kaynağıdır"
      ],
      description: "Avokado, içerdiği tekli doymamış yağlar, lif ve potasyum sayesinde kalp sağlığını destekler. Ayrıca E vitamini ve lutein gibi göz sağlığını koruyan bileşenler içerir.",
      nutritionFacts: {
        calories: "160 kcal",
        protein: "2g",
        fats: "15g",
        carbs: "9g",
        fiber: "7g"
      }
    },
    {
      id: 2,
      name: "Nar",
      image: "/images/pomegranate.jpg",
      benefits: [
        "Güçlü antioksidan etkisi",
        "Kanser önleyici özellikler",
        "Kalp sağlığını korur",
        "Bağışıklık sistemini güçlendirir"
      ],
      description: "Nar, içerdiği punicalagin adlı güçlü antioksidanlar sayesinde vücudu serbest radikallere karşı korur. C vitamini ve polifenoller açısından zengindir.",
      nutritionFacts: {
        calories: "83 kcal",
        protein: "1.7g",
        fats: "1.2g",
        carbs: "19g",
        fiber: "4g"
      }
    },
    {
      id: 3,
      name: "Ispanak",
      image: "/images/spinach.jpg",
      benefits: [
        "A ve K vitamini kaynağı",
        "Demir açısından zengin",
        "Göz sağlığını korur",
        "Kemik sağlığını destekler"
      ],
      description: "Ispanak, demir, kalsiyum ve magnezyum gibi mineraller açısından zengindir. İçerdiği lutein ve zeaksantin bileşenleri göz sağlığını korur.",
      nutritionFacts: {
        calories: "23 kcal",
        protein: "2.9g",
        fats: "0.4g",
        carbs: "3.6g",
        fiber: "2.2g"
      }
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sağlıklı Yaşam için Süper Besinler
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Doğanın bize sunduğu en değerli besinler
          </p>
        </motion.div>

        <div className="space-y-24" ref={containerRef}>
          {healthyFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-8 lg:gap-16`}
            >
              {/* Resim Bölümü */}
              <motion.div 
                className="w-full lg:w-1/2 relative h-[400px] rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  className="object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              {/* Bilgi Bölümü */}
              <div className="w-full lg:w-1/2 space-y-6">
                <motion.h3 
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                  whileInView={{ x: [50, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {food.name}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 text-lg"
                  whileInView={{ x: [50, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {food.description}
                </motion.p>

                <motion.div
                  className="space-y-4"
                  whileInView={{ x: [50, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Faydaları:
                  </h4>
                  <ul className="space-y-2">
                    {food.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 dark:text-gray-400">
                        <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Besin Değerleri */}
                <motion.div
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
                  whileInView={{ x: [50, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Besin Değerleri (100g)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(food.nutritionFacts).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {key}
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthyFoodShowcase; 