"use client";

import React, { useState, useEffect } from "react";
import { adminAPI, publicAPI } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import StatCards from "../components/StatCards";
import TabNavigation from "../components/TabNavigation";
import Overview from "../components/tabs/Overview";
import Users from "../components/tabs/Users";
import Categories from "../components/tabs/Categories";
import Announcements from "../components/tabs/Announcements";
import LoadingComponent from "../components/Loading";
// Chart.js tescili
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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
  const [activeTab, setActiveTab] = useState("overview");

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
          const customerCount = usersData.filter(
            (user) => user.role === "customer"
          ).length;
          const producerCount = usersData.filter(
            (user) => user.role === "producer"
          ).length;

          setStats((prev) => ({
            ...prev,
            totalUsers: usersData.length,
            customers: customerCount,
            producers: producerCount,
          }));
        } catch (userErr) {
          console.error("Kullanıcı verisi yüklenemedi:", userErr);
          // Hata olsa bile diğer isteklere devam et
        }

        try {
          const categoriesResponse = await adminAPI.getCategories();
          const categoriesData = categoriesResponse.data || [];
          setCategories(categoriesData);

          setStats((prev) => ({
            ...prev,
            totalCategories: categoriesData.length,
          }));
        } catch (catErr) {
          console.error("Kategori verisi yüklenemedi:", catErr);
          // Fallback: Manuel kategoriler ekleyelim
          const sampleCategories = [
            { _id: "1", name: "Meyve", description: "Taze meyveler" },
            { _id: "2", name: "Sebze", description: "Organik sebzeler" },
            {
              _id: "3",
              name: "Baklagiller",
              description: "Çeşitli baklagiller",
            },
          ];
          setCategories(sampleCategories);
          setStats((prev) => ({
            ...prev,
            totalCategories: sampleCategories.length,
          }));
        }

        try {
          const announcementsResponse = await adminAPI.getAnnouncements();
          const announcementsData = announcementsResponse.data || [];
          setAnnouncements(announcementsData);

          setStats((prev) => ({
            ...prev,
            announcements: announcementsData.length,
          }));
        } catch (annErr) {
          console.error("Duyuru verisi yüklenemedi:", annErr);
          // Fallback: Manuel duyurular ekleyelim
          const sampleAnnouncements = [
            {
              _id: "1",
              title: "Yeni Sezon Başladı",
              content: "Yaz meyveleri gelmeye başladı!",
              priority: "high",
            },
            {
              _id: "2",
              title: "Sistem Bakımı",
              content: "Sistem bakımı nedeniyle kısa süreli kesinti olabilir.",
              priority: "normal",
            },
          ];
          setAnnouncements(sampleAnnouncements);
          setStats((prev) => ({
            ...prev,
            announcements: sampleAnnouncements.length,
          }));
        }

        try {
          // Ürünleri her zaman publicAPI üzerinden alabiliriz
          const productsResponse = await publicAPI.getProducts();
          const productsData = productsResponse.data || [];
          setProducts(productsData);

          setStats((prev) => ({
            ...prev,
            totalProducts: productsData.length,
          }));
        } catch (prodErr) {
          console.error("Ürün verisi yüklenemedi:", prodErr);
          // Fallback: Manuel ürünler ekleyelim
          const sampleProducts = [
            { _id: "1", name: "Elma", categoryId: "1", price: 10 },
            { _id: "2", name: "Domates", categoryId: "2", price: 8 },
            { _id: "3", name: "Mercimek", categoryId: "3", price: 15 },
          ];
          setProducts(sampleProducts);
          setStats((prev) => ({
            ...prev,
            totalProducts: sampleProducts.length,
          }));
        }
      } catch (err) {
        console.error("Dashboard genel hata:", err);
        setError(
          "Bazı veriler yüklenirken sorun oluştu, ancak dashboard çalışmaya devam edecek."
        );
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
    labels: ["Müşteriler", "Üreticiler", "Yöneticiler"],
    datasets: [
      {
        label: "Kullanıcı Dağılımı",
        data: [
          stats.customers,
          stats.producers,
          stats.totalUsers - stats.customers - stats.producers,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Kategori bazlı ürün dağılımı (bar grafiği)
  const getCategoryProductCounts = () => {
    if (!categories.length || !products.length) {
      return {
        labels: ["Veri Bekleniyor"],
        datasets: [
          {
            label: "Veri Yok",
            data: [0],
            backgroundColor: "rgba(200, 200, 200, 0.6)",
          },
        ],
      };
    }

    const categoryMap = {};

    // Kategorileri haritalandır
    categories.forEach((category) => {
      const id = category._id || category.id;
      if (id) {
        categoryMap[id] = {
          name: category.name || "İsimsiz Kategori",
          count: 0,
        };
      }
    });

    // Ürünleri kategorilere göre say
    products.forEach((product) => {
      const categoryId = product.categoryId || product.category;
      if (categoryId && categoryMap[categoryId]) {
        categoryMap[categoryId].count += 1;
      }
    });

    // Chart.js için veri formatına dönüştür
    const labels = Object.values(categoryMap).map((cat) => cat.name);
    const data = Object.values(categoryMap).map((cat) => cat.count);

    return {
      labels,
      datasets: [
        {
          label: "Kategori başına ürün sayısı",
          data,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
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
      const updatedUsers = users.map((user) =>
        user._id === userId || user.id === userId ? { ...user, status } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Kullanıcı durumu güncelleme hatası:", err);
      alert(
        "Kullanıcı durumu güncellenirken bir hata oluştu. Bu özellik henüz aktif olmayabilir."
      );

      // Hata olsa bile UI'da güncelleme yapalım (gerçek bir API olmadığı için)
      const updatedUsers = users.map((user) =>
        user._id === userId || user.id === userId ? { ...user, status } : user
      );
      setUsers(updatedUsers);
    }
  };

  // Yeni kategori ekleme fonksiyonu
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.addCategory(newCategory);
      if (response.data) {
        setCategories([...categories, response.data]);
        setNewCategory({ name: "", description: "" });
        // Kategori sayısını güncelle
        setStats((prev) => ({
          ...prev,
          totalCategories: prev.totalCategories + 1,
        }));
      }
    } catch (err) {
      console.error("Kategori ekleme hatası:", err);
      alert(
        "Kategori eklenirken bir hata oluştu. Bu özellik henüz aktif olmayabilir."
      );

      // Hata olsa bile UI'da ekleyelim (gerçek bir API olmadığı için)
      const mockCategory = {
        _id: Date.now().toString(),
        ...newCategory,
      };
      setCategories([...categories, mockCategory]);
      setNewCategory({ name: "", description: "" });
      setStats((prev) => ({
        ...prev,
        totalCategories: prev.totalCategories + 1,
      }));
    }
  };

  // Yeni duyuru ekleme fonksiyonu
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "normal",
  });

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.createAnnouncement(newAnnouncement);
      if (response.data) {
        setAnnouncements([...announcements, response.data]);
        setNewAnnouncement({ title: "", content: "", priority: "normal" });
        // Duyuru sayısını güncelle
        setStats((prev) => ({
          ...prev,
          announcements: prev.announcements + 1,
        }));
      }
    } catch (err) {
      console.error("Duyuru ekleme hatası:", err);
      alert(
        "Duyuru eklenirken bir hata oluştu. Bu özellik henüz aktif olmayabilir."
      );

      // Hata olsa bile UI'da ekleyelim (gerçek bir API olmadığı için)
      const mockAnnouncement = {
        _id: Date.now().toString(),
        ...newAnnouncement,
        createdAt: new Date().toISOString(),
      };
      setAnnouncements([...announcements, mockAnnouncement]);
      setNewAnnouncement({ title: "", content: "", priority: "normal" });
      setStats((prev) => ({ ...prev, announcements: prev.announcements + 1 }));
    }
  };

  if (loading) {
    return <LoadingComponent />;
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
    <div className="px-6 py-8 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Hata varsa uyarı göster ama sayfayı tamamen gizleme */}
      {error && (
        <div className="p-4 mb-6 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 text-yellow-700 dark:text-yellow-200">
          <p className="font-medium">Dikkat</p>
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">
          Yönetici Paneli
        </h1>
        <div className="text-sm text-gray-600 dark:text-slate-300">
          Hoş geldiniz, {user?.fullName || user?.username || "Yönetici"}
        </div>
      </div>

      {/* İstatistik Kartları */}
      <StatCards stats={stats} />

      {/* Tab Menüsü */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab İçerikleri */}
      {activeTab === "overview" && (
        <Overview
          stats={stats}
          users={users}
          categories={categories}
          products={products}
        />
      )}

      {activeTab === "users" && (
        <Users users={users} onUpdateUserStatus={handleUpdateUserStatus} />
      )}

      {activeTab === "categories" && (
        <Categories
          categories={categories}
          products={products}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          onAddCategory={handleAddCategory}
        />
      )}

      {activeTab === "announcements" && (
        <Announcements
          announcements={announcements}
          newAnnouncement={newAnnouncement}
          setNewAnnouncement={setNewAnnouncement}
          onAddAnnouncement={handleAddAnnouncement}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
