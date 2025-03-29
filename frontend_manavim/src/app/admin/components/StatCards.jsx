import React from 'react';
import { FiUsers, FiShoppingBag, FiGrid, FiBell } from 'react-icons/fi';

const StatCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toplam Kullanıcı</p>
            <h2 className="text-2xl font-bold dark:text-white">{stats.totalUsers}</h2>
          </div>
          <FiUsers className="text-blue-500 text-3xl" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ürünler</p>
            <h2 className="text-2xl font-bold dark:text-white">{stats.totalProducts}</h2>
          </div>
          <FiShoppingBag className="text-green-500 text-3xl" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Kategoriler</p>
            <h2 className="text-2xl font-bold dark:text-white">{stats.totalCategories}</h2>
          </div>
          <FiGrid className="text-purple-500 text-3xl" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Duyurular</p>
            <h2 className="text-2xl font-bold dark:text-white">{stats.announcements}</h2>
          </div>
          <FiBell className="text-yellow-500 text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default StatCards; 