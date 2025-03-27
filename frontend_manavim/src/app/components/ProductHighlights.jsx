import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProductHighlights = () => {
  const products = [
    {
      name: "Organik Domates",
      price: "₺24.90/kg",
      image: "/images/tomato.jpg",
      tag: "Yeni Sezon"
    },
    {
      name: "Taze Çilek",
      price: "₺39.90/kg",
      image: "/images/strawberry.jpg",
      tag: "Popüler"
    },
    {
      name: "Yeşil Elma",
      price: "₺29.90/kg",
      image: "/images/apple.jpg",
      tag: "İndirimli"
    },
    {
      name: "Organik Yumurta",
      price: "₺45.90/15'li",
      image: "/images/eggs.jpg",
      tag: "Tükeniyor"
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Öne Çıkan Ürünler</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Günün en taze ve özel seçilmiş ürünleri
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm 
              hover:shadow-md transition-all duration-200 dark:shadow-gray-700/20"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 right-2 bg-green-500 dark:bg-green-600 
                text-white px-3 py-1 rounded-full text-sm">
                  {product.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-green-600 dark:text-green-500 font-medium mt-2">{product.price}</p>
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-full 
                hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 
                transition-colors">
                  Sepete Ekle
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHighlights; 