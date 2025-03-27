"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'Hakkımızda', href: '/about' },
      { name: 'İletişim', href: '/contact' },
      { name: 'Kariyer', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Yardım Merkezi', href: '/help' },
      { name: 'Sıkça Sorulan Sorular', href: '/faq' },
      { name: 'Gizlilik Politikası', href: '/privacy' },
      { name: 'Kullanım Koşulları', href: '/terms' },
    ],
    services: [
      { name: 'Teslimat Bilgileri', href: '/delivery' },
      { name: 'İade Politikası', href: '/returns' },
      { name: 'Ödeme Seçenekleri', href: '/payment' },
      { name: 'Üyelik Avantajları', href: '/membership' },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebook size={24} />, href: 'https://facebook.com' },
    { icon: <FaTwitter size={24} />, href: 'https://twitter.com' },
    { icon: <FaInstagram size={24} />, href: 'https://instagram.com' },
    { icon: <FaLinkedin size={24} />, href: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Üst Kısım */}
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Logo ve Açıklama */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center mb-4">
              <Image
                src="/images/ManavIM.ico" // Logo yolunu kendi projenize göre güncelleyin
                alt="Manav Logo"
                width={40}
                height={40}
                className=" rounded-full"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Manav<span className="text-green-500">IM</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Taze, organik ve yerel ürünleri kapınıza getiriyoruz. 
              Sağlıklı yaşamın anahtarı doğal beslenme ile başlar.
            </p>
            {/* Sosyal Medya İkonları */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Linkler */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category === 'company' ? 'Kurumsal' : 
                 category === 'support' ? 'Destek' : 'Hizmetler'}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 
                      dark:hover:text-green-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alt Kısım */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Manavım. Tüm hakları saklıdır.
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <Link 
                  href="/privacy"
                  className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  Gizlilik Politikası
                </Link>
                <Link 
                  href="/terms"
                  className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  Kullanım Koşulları
                </Link>
                <Link 
                  href="/cookies"
                  className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  Çerez Politikası
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İletişim Bandı */}
      <div className="bg-green-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center mr-4">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              +90 (555) 123 45 67
            </span>
            <span className="flex items-center mr-4">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              info@manavim.com
            </span>
            <span className="flex items-center">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              İstanbul, Türkiye
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 