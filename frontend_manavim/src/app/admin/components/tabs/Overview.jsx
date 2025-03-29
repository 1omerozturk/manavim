import React from 'react';
import UserDistributionChart from '../charts/UserDistributionChart';
import CategoryProductChart from '../charts/CategoryProductChart';

const Overview = ({ stats, users, categories, products }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Kullanıcı Dağılımı Grafiği */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Kullanıcı Dağılımı</h2>
        <UserDistributionChart 
          customers={stats.customers} 
          producers={stats.producers} 
          totalUsers={stats.totalUsers} 
        />
      </div>
      
      {/* Kategori Ürün Dağılımı Grafiği */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Kategori Ürün Dağılımı</h2>
        <CategoryProductChart 
          categories={categories} 
          products={products} 
        />
      </div>
      
      {/* Son Etkinlikler */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md lg:col-span-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Son Etkinlikler</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">Tarih</th>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">Kullanıcı</th>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">Etkinlik</th>
              </tr>
            </thead>
            <tbody>
              {/* Örnek aktiviteler */}
              <tr>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">{new Date().toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">admin@example.com</td>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">Yeni kategori eklendi: Meyve</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">{new Date(Date.now() - 86400000).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">producer@example.com</td>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">Yeni ürün eklendi: Elma</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">{new Date(Date.now() - 172800000).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">customer@example.com</td>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">Yeni sipariş oluşturuldu: #12345</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview; 