"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";

import Product from "../components/Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API'den ürünleri çek
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // Burada API çağrısı yapılacak
    // Örnek veri yapısı
    const dummyData = [
      {
        id: 1,
        name: "Kırmızı Biber",
        price: 10.99,
        image: "/images/reed_chilli.jpg",
        tag: "Taze Ürün",
      },

      {
        id: 1,
        name: "Karnabahar",
        price: 14.99,
        image: "/images/cauliflower.jpg",
        tag: "İndirimli Ürün",
      },

      {
        id: 3,
        name: "Kırmızı Soğan",
        price: 7.49,
        image: "/images/red_onion.jpg",
        tag: "Yeni Ürün",
      },
    ];
    setProducts(dummyData);
  };

  return (
    <div className="h-screen mx-auto px-4 py-8 dark:bg-gray-900">
      <Header header={"Ürünler"} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
