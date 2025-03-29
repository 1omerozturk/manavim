// LoadingComponent.jsx
import { motion } from 'framer-motion';

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="w-16 h-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default LoadingComponent;