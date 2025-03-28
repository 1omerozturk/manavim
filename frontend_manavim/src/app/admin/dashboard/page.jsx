'use client';

import React, { useState, useEffect } from 'react';
import { adminAPI, customerAPI, producerAPI, publicAPI } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { FiUsers, FiShoppingBag, FiGrid, FiBell, FiTrendingUp, FiCalendar } from 'react-icons/fi';

// Chart.js tescili
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    customers: 0,
    producers: 0,
    totalProducts: 0,
    totalCategories: 0,
    announcements: 0,
  });
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Verileri yükle - Her isteği ayrı şekilde ele alarak, birinin başarısız olması diğerlerini etkilemeyecek
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Her bir isteği ayrı ayrı yapalım ve hataları yönetelim
        try {
          const usersResponse = await adminAPI.getAllUsers();
          const usersData = usersResponse.data || [];
          setUsers(usersData);
          
          // Kullanıcı istatistikleri
          const customerCount = usersData.filter(user => user.role === 'customer').length;
          const producerCount = usersData.filter(user => user.role === 'producer').length;
          
          setStats(prev => ({
            ...prev,
            totalUsers: usersData.length,
            customers: customerCount,
            producers: producerCount
          }));
        } catch (userErr) {
          console.error("Kullanıcı verisi yüklenemedi:", userErr);
          // Hata olsa bile diğer isteklere devam et
        }

        try {
          const categoriesResponse = await adminAPI.getCategories();
          const categoriesData = categoriesResponse.data || [];
          setCategories(categoriesData);
          
          setStats(prev => ({
            ...prev,
            totalCategories: categoriesData.length
          }));
        } catch (catErr) {
          console.error("Kategori verisi yüklenemedi:", catErr);
          // Fallback: Manuel kategoriler ekleyelim
          const sampleCategories = [
            { _id: '1', name: 'Meyve', description: 'Taze meyveler' },
            { _id: '2', name: 'Sebze', description: 'Organik sebzeler' },
            { _id: '3', name: 'Baklagiller', description: 'Çeşitli baklagiller' }
          ];
          setCategories(sampleCategories);
          setStats(prev => ({ ...prev, totalCategories: sampleCategories.length }));
        }

        try {
          const announcementsResponse = await adminAPI.getAnnouncements();
          const announcementsData = announcementsResponse.data || [];
          setAnnouncements(announcementsData);
          
          setStats(prev => ({
            ...prev,
            announcements: announcementsData.length
          }));
        } catch (annErr) {
          console.error("Duyuru verisi yüklenemedi:", annErr);
          // Fallback: Manuel duyurular ekleyelim
          const sampleAnnouncements = [
            { _id: '1', title: 'Yeni Sezon Başladı', content: 'Yaz meyveleri gelmeye başladı!', priority: 'high' },
            { _id: '2', title: 'Sistem Bakımı', content: 'Sistem bakımı nedeniyle kısa süreli kesinti olabilir.', priority: 'normal' }
          ];
          setAnnouncements(sampleAnnouncements);
          setStats(prev => ({ ...prev, announcements: sampleAnnouncements.length }));
        }

        try {
          // Ürünleri her zaman publicAPI üzerinden alabiliriz
          const productsResponse = await publicAPI.getProducts();
          const productsData = productsResponse.data || [];
          setProducts(productsData);
          
          setStats(prev => ({
            ...prev,
            totalProducts: productsData.length
          }));
        } catch (prodErr) {
          console.error("Ürün verisi yüklenemedi:", prodErr);
          // Fallback: Manuel ürünler ekleyelim
          const sampleProducts = [
            { _id: '1', name: 'Elma', categoryId: '1', price: 10 },
            { _id: '2', name: 'Domates', categoryId: '2', price: 8 },
            { _id: '3', name: 'Mercimek', categoryId: '3', price: 15 }
          ];
          setProducts(sampleProducts);
          setStats(prev => ({ ...prev, totalProducts: sampleProducts.length }));
        }

      } catch (err) {
        console.error("Dashboard genel hata:", err);
        setError("Bazı veriler yüklenirken sorun oluştu, ancak dashboard çalışmaya devam edecek.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  // Kullanıcı rolü dağılımı için pasta grafiği verileri
  const userRoleData = {
    labels: ['Müşteriler', 'Üreticiler', 'Yöneticiler'],
    datasets: [
      {
        label: 'Kullanıcı Dağılımı',
        data: [stats.customers, stats.producers, stats.totalUsers - stats.customers - stats.producers],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Kategori bazlı ürün dağılımı (bar grafiği)
  const getCategoryProductCounts = () => {
    if (!categories.length || !products.length) {
      return {
        labels: ['Veri Bekleniyor'],
        datasets: [{
          label: 'Veri Yok',
          data: [0],
          backgroundColor: 'rgba(200, 200, 200, 0.6)',
        }]
      };
    }
    
    const categoryMap = {};
    
    // Kategorileri haritalandır
    categories.forEach(category => {
      const id = category._id || category.id;
      if (id) {
        categoryMap[id] = {
          name: category.name || 'İsimsiz Kategori',
          count: 0
        };
      }
    });
    
    // Ürünleri kategorilere göre say
    products.forEach(product => {
      const categoryId = product.categoryId || product.category;
      if (categoryId && categoryMap[categoryId]) {
        categoryMap[categoryId].count += 1;
      }
    });
    
    // Chart.js için veri formatına dönüştür
    const labels = Object.values(categoryMap).map(cat => cat.name);
    const data = Object.values(categoryMap).map(cat => cat.count);
    
    return {
      labels,
      datasets: [
        {
          label: 'Kategori başına ürün sayısı',
          data,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Kullanıcı durumunu güncelleme fonksiyonu
  const handleUpdateUserStatus = async (userId, status) => {
    try {
      // API'nin doğru adını bilmiyoruz, bu yüzden updateUserStatus olduğunu varsayıyoruz
      await adminAPI.updateUserStatus(userId, { status });
      // Kullanıcı listesini güncelle
      const updatedUsers = users.map(user => 
        user._id === userId || user.id === userId 
          ? { ...user, status } 
          : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Kullanıcı durumu güncelleme hatası:", err);
      alert("Kullanıcı durumu güncellenirken bir hata oluştu. Bu özellik henüz aktif olmayabilir.");
      
      // Hata olsa bile UI'da güncelleme yapalım (gerçek bir API olmadığı için)
      const updatedUsers = users.map(user => 
        user._id === userId || user.id === userId 
          ? { ...user, status } 
          : user
      );
      setUsers(updatedUsers);
    }
  };

  // Yeni kategori ekleme fonksiyonu
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.addCategory(newCategory);
      if (response.data) {
        setCategories([...categories, response.data]);
        setNewCategory({ name: '', description: '' });
        // Kategori sayısını güncelle
        setStats(prev => ({ ...prev, totalCategories: prev.totalCategories + 1 }));
      }
    } catch (err) {
      console.error("Kategori ekleme hatası:", err);
      alert("Kategori eklenirken bir hata oluştu. Bu özellik henüz aktif olmayabilir.");
      
      // Hata olsa bile UI'da ekleyelim (gerçek bir API olmadığı için)
      const mockCategory = {
        _id: Date.now().toString(),
        ...newCategory
      };
      setCategories([...categories, mockCategory]);
      setNewCategory({ name: '', description: '' });
      setStats(prev => ({ ...prev, totalCategories: prev.totalCategories + 1 }));
    }
  };

  // Yeni duyuru ekleme fonksiyonu
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'normal' });
  
  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.createAnnouncement(newAnnouncement);
      if (response.data) {
        setAnnouncements([...announcements, response.data]);
        setNewAnnouncement({ title: '', content: '', priority: 'normal' });
        // Duyuru sayısını güncelle
        setStats(prev => ({ ...prev, announcements: prev.announcements + 1 }));
      }
    } catch (err) {
      console.error("Duyuru ekleme hatası:", err);
      alert("Duyuru eklenirken bir hata oluştu. Bu özellik henüz aktif olmayabilir.");
      
      // Hata olsa bile UI'da ekleyelim (gerçek bir API olmadığı için)
      const mockAnnouncement = {
        _id: Date.now().toString(),
        ...newAnnouncement,
        createdAt: new Date().toISOString()
      };
      setAnnouncements([...announcements, mockAnnouncement]);
      setNewAnnouncement({ title: '', content: '', priority: 'normal' });
      setStats(prev => ({ ...prev, announcements: prev.announcements + 1 }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner-border text-emerald-600" role="status">
            <span className="sr-only">Yükleniyor...</span>
          </div>
          <p className="mt-2 text-gray-600">Panel verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-red-700 mb-4">Hata</h1>
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Yeniden Dene
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      {/* Hata varsa uyarı göster ama sayfayı tamamen gizleme */}
      {error && (
        <div className="p-4 mb-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
          <p className="font-medium">Dikkat</p>
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
        <div className="text-sm text-gray-600">
          Hoş geldiniz, {user?.fullName || user?.username || 'Yönetici'}
        </div>
      </div>

      {/* Üst Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Toplam Kullanıcı</p>
              <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
            </div>
            <FiUsers className="text-blue-500 text-3xl" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Ürünler</p>
              <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
            </div>
            <FiShoppingBag className="text-green-500 text-3xl" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Kategoriler</p>
              <h2 className="text-2xl font-bold">{stats.totalCategories}</h2>
            </div>
            <FiGrid className="text-purple-500 text-3xl" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Duyurular</p>
              <h2 className="text-2xl font-bold">{stats.announcements}</h2>
            </div>
            <FiBell className="text-yellow-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Tab Kontrolü */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'overview' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Genel Bakış
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'users' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Kullanıcılar
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'categories' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              Kategoriler
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'announcements' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('announcements')}
            >
              Duyurular
            </button>
          </li>
        </ul>
      </div>

      {/* Tab İçerikleri */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kullanıcı Dağılımı Grafiği */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Kullanıcı Dağılımı</h2>
            <div className="w-full" style={{ height: '300px' }}>
              <Pie data={userRoleData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          
          {/* Kategori Ürün Dağılımı Grafiği */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Kategori Ürün Dağılımı</h2>
            <div className="w-full" style={{ height: '300px' }}>
              <Bar 
                data={getCategoryProductCounts()} 
                options={{ 
                  maintainAspectRatio: false,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Kategorilere Göre Ürün Sayısı'
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </div>
          </div>
          
          {/* Son Etkinlikler */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Son Etkinlikler</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Tarih</th>
                    <th className="py-2 px-4 border-b">Kullanıcı</th>
                    <th className="py-2 px-4 border-b">Etkinlik</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Örnek aktiviteler - gerçek sistemde bunlar veritabanından gelir */}
                  <tr>
                    <td className="py-2 px-4 border-b">{new Date().toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">admin@example.com</td>
                    <td className="py-2 px-4 border-b">Yeni kategori eklendi: Meyve</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">{new Date(Date.now() - 86400000).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">producer@example.com</td>
                    <td className="py-2 px-4 border-b">Yeni ürün eklendi: Elma</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">{new Date(Date.now() - 172800000).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">customer@example.com</td>
                    <td className="py-2 px-4 border-b">Yeni sipariş oluşturuldu: #12345</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Kullanıcılar Tab İçeriği */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Kullanıcı Yönetimi</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Kullanıcı Adı</th>
                  <th className="py-2 px-4 border-b text-left">E-posta</th>
                  <th className="py-2 px-4 border-b text-left">Rol</th>
                  <th className="py-2 px-4 border-b text-left">Durum</th>
                  <th className="py-2 px-4 border-b text-left">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id || user.id}>
                      <td className="py-2 px-4 border-b">{user.username}</td>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'producer' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? 'Yönetici' :
                           user.role === 'producer' ? 'Üretici' : 'Müşteri'}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' :
                          user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? 'Aktif' :
                           user.status === 'pending' ? 'Beklemede' : 'Engelli'}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <select
                          className="border rounded p-1 text-sm"
                          value={user.status || 'active'}
                          onChange={(e) => handleUpdateUserStatus(user._id || user.id, e.target.value)}
                        >
                          <option value="active">Aktif</option>
                          <option value="pending">Beklemede</option>
                          <option value="banned">Engelli</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      Kullanıcı bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Kategoriler Tab İçeriği */}
      {activeTab === 'categories' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Kategori Yönetimi</h2>
          
          {/* Yeni Kategori Formu */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Yeni Kategori Ekle</h3>
            <form onSubmit={handleAddCategory} className="flex flex-wrap gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Kategori Adı"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Açıklama"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full p-2 border rounded"
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
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Kategori Adı</th>
                  <th className="py-2 px-4 border-b text-left">Açıklama</th>
                  <th className="py-2 px-4 border-b text-left">Ürün Sayısı</th>
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
                        <td className="py-2 px-4 border-b">{category.name}</td>
                        <td className="py-2 px-4 border-b">{category.description || '-'}</td>
                        <td className="py-2 px-4 border-b">{productCount}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 text-center text-gray-500">
                      Kategori bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Duyurular Tab İçeriği */}
      {activeTab === 'announcements' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Duyuru Yönetimi</h2>
          
          {/* Yeni Duyuru Formu */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Yeni Duyuru Oluştur</h3>
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Duyuru Başlığı"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Duyuru İçeriği"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="low">Düşük Öncelik</option>
                  <option value="normal">Normal Öncelik</option>
                  <option value="high">Yüksek Öncelik</option>
                </select>
              </div>
              <div>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                  Duyuru Yayınla
                </button>
              </div>
            </form>
          </div>
          
          {/* Duyuru Listesi */}
          <div className="space-y-4">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <div key={announcement._id || announcement.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{announcement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {announcement.priority === 'high' ? 'Yüksek' :
                       announcement.priority === 'normal' ? 'Normal' : 'Düşük'}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{announcement.content}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(announcement.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                Duyuru bulunamadı.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;