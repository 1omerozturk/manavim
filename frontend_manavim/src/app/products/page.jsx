"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    AOS.init({ duration: 1000 })
    // API'den ürünleri çek
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    // Burada API çağrısı yapılacak
    // Örnek veri yapısı
    const dummyData = [
      { id: 1, name: 'Ürün 1', price: 100, image: '/images/apple.jpg' },
      { id: 2, name: 'Ürün 2', price: 200, image: '/images/strawberry.jpg' },
    ]
    setProducts(dummyData)
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 dark:text-white" data-aos="fade-down">
        Ürünlerimiz
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            data-aos="fade-up"
          >
            <Link href={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  ${product.price}
                </p>
                <button className="mt-4 flex items-center gap-2 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                  <FaShoppingCart />
                  Sepete Ekle
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Products
