'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Sayfanın scroll pozisyonunu kontrol eder
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Sayfayı yukarı kaydırır
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="cursor-pointer fixed bottom-20 right-12 sm:bottom-6 sm:right-6 p-3 rounded-full bg-primary dark:text-white text-black bg-white dark:bg-black shadow-lg z-50"
            aria-label="Yukarı çık"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ 
              rotate: 360,
              scale: 1.1,
              backgroundColor: 'var(--primary-dark)' 
            }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop; 