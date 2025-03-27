"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

const ProductDetail = () => {
  const [product, setProduct] = useState(null)
  const params = useParams()

  useEffect(() => {
    AOS.init({ duration: 1000 })
    // API'den ürün detaylarını çek
    fetchProductDetail()
  }, [params.id])

  const fetchProductDetail = async () => {
    // Burada API çağrısı yapılacak
    // Örnek veri
    const dummyProduct = {
      id: params.id,
      name: 'Örnek Ürün',
      price: 100,
      description: 'Bu ürün hakkında detaylı açıklama...',
      image: '/images/apple.jpg',
    }
    setProduct(dummyProduct)
  }

  if (!product) return <div>Yükleniyor...</div>

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <Link href="/products" className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-400 mb-6 hover:text-blue-600 dark:hover:text-blue-300">
        <FaArrowLeft />
        Ürünlere Geri Dön
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-lg overflow-hidden"
          data-aos="fade-right"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
          data-aos="fade-left"
        >
          <h1 className="text-3xl font-bold dark:text-white">
            {product.name}
          </h1>
          <p className="text-2xl text-blue-500 dark:text-blue-400">
            ${product.price}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
          
          <button className="flex items-center gap-2 bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition">
            <FaShoppingCart />
            Sepete Ekle
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail 