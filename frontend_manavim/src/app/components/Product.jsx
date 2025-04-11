import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Product = ({ product, index }) => {
  return (
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
        <span
          className={`absolute top-2 right-2 ${
            product.tag && product.tag == "Taze Ürün"
              ? "bg-green-500 dark:bg-green-600"
              :product.tag=="İndirimli Ürün"? "bg-orange-500 dark:bg-orange-600":"bg-red-500 dark:bg-red-600"
          } 
                text-white px-3 py-1 rounded-full text-sm`}
        >
          {product.tag}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="text-green-600 dark:text-green-500 font-medium mt-2">
          {product.price}
        </p>
        <button
          className="cursor-pointer mt-4 w-full bg-green-600 text-white py-2 rounded-full 
                hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 
                transition-colors"
        >
          Sepete Ekle
        </button>
      </div>
    </motion.div>
  );
};

export default Product;
