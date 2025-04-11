'use client'

import Header from '../components/Header'

const categories = [
  {
    id: 1,
    name: 'Meyve & Sebze',
    icon: '🍎',
    color: 'bg-green-100 dark:bg-green-900',
    description: 'Taze meyve ve sebzeler',
  },
  {
    id: 2,
    name: 'Süt & Kahvaltılık',
    icon: '🥛',
    color: 'bg-blue-100 dark:bg-blue-900',
    description: 'Süt ürünleri ve kahvaltılıklar',
  },
  {
    id: 3,
    name: 'Et & Balık',
    icon: '🥩',
    color: 'bg-red-100 dark:bg-red-900',
    description: 'Taze et ve deniz ürünleri',
  },
  {
    id: 4,
    name: 'Temel Gıda',
    icon: '🍚',
    color: 'bg-yellow-100 dark:bg-yellow-900',
    description: 'Temel gıda ürünleri',
  },
  {
    id: 5,
    name: 'Atıştırmalık',
    icon: '🍪',
    color: 'bg-purple-100 dark:bg-purple-900',
    description: 'Atıştırmalıklar ve çerezler',
  },
  {
    id: 6,
    name: 'İçecekler',
    icon: '🥤',
    color: 'bg-cyan-100 dark:bg-cyan-900',
    description: 'İçecekler ve meşrubatlar',
  },
]

const CategoriesPage = () => {
  return (
    <div className='h-screen dark:bg-gray-900'>
    <div className="container mx-auto px-4 py-8">
      <Header header={'Kategoriler'} />
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${category.color} rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h2 className="font-semibold text-lg dark:text-white">{category.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default CategoriesPage
