import React from "react";
import { motion } from "framer-motion";
import Product from "./Product";

const ProductHighlights = () => {
  const products = [
    {
      name: "Organik Domates",
      price: "₺24.90/kg",
      image: "/images/tomato.jpg",
      tag: "Yeni Sezon",
    },
    {
      name: "Taze Çilek",
      price: "₺39.90/kg",
      image: "/images/strawberry.jpg",
      tag: "Popüler",
    },
    {
      name: "Yeşil Elma",
      price: "₺29.90/kg",
      image: "/images/apple.jpg",
      tag: "İndirimli",
    },
    {
      name: "Organik Yumurta",
      price: "₺45.90/15'li",
      image: "/images/eggs.jpg",
      tag: "Tükeniyor",
    },
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
            Öne Çıkan Ürünler
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Günün en taze ve özel seçilmiş ürünleri
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index}>
            <Product product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHighlights;
