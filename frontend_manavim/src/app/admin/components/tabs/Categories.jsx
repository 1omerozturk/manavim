import React from 'react';

const Categories = ({ categories, products, newCategory, setNewCategory, onAddCategory }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Kategori Yönetimi</h2>
      
      {/* Yeni Kategori Formu */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Yeni Kategori Ekle</h3>
        <form onSubmit={onAddCategory} className="flex flex-wrap gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Kategori Adı"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-slate-600 text-gray-800 dark:text-gray-200"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Açıklama"
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-slate-600 text-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
              Ekle
            </button>
          </div>
        </form>
      </div>
      
      {/* Kategori Listesi */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Kategori Adı</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Açıklama</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Ürün Sayısı</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => {
                const productCount = products.filter(p => 
                  (p.categoryId === (category._id || category.id)) || 
                  (p.category === (category._id || category.id))
                ).length;
                
                return (
                  <tr key={category._id || category.id}>
                    <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">{category.name}</td>
                    <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">{category.description || '-'}</td>
                    <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">{productCount}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500 dark:text-gray-400">
                  Kategori bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories; 