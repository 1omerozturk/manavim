import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center cursor-pointer">
        <li className="mr-2">
          <button
            className={`inline-block p-4 rounded-t-lg cursor-pointer ${
              activeTab === 'overview' 
                ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400' 
                : 'hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 dark:text-slate-100'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Genel Bakış
          </button>
        </li>
        <li className="mr-2">
          <button
            className={`inline-block p-4 rounded-t-lg cursor-pointer ${
              activeTab === 'users' 
                ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400' 
                : 'hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 dark:text-slate-100'
            }`}
            onClick={() => setActiveTab('users')}
          >
            Kullanıcılar
          </button>
        </li>
        <li className="mr-2">
          <button
            className={`inline-block p-4 rounded-t-lg cursor-pointer ${
              activeTab === 'categories' 
                ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400' 
                : 'hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 dark:text-slate-100'
            }`}
            onClick={() => setActiveTab('categories')}
          >
            Kategoriler
          </button>
        </li>
        <li className="mr-2">
          <button
            className={`inline-block p-4 rounded-t-lg cursor-pointer ${
              activeTab === 'announcements' 
                ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400' 
                : 'hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 dark:text-slate-100'
            }`}
            onClick={() => setActiveTab('announcements')}
          >
            Duyurular
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TabNavigation; 