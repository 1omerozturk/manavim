import React from 'react';
import { Bar } from 'react-chartjs-2';

const CategoryProductChart = ({ categories, products }) => {
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

  return (
    <div className="w-full" style={{ height: '300px' }}>
      <Bar 
        data={getCategoryProductCounts()} 
        options={{ 
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Kategorilere Göre Ürün Sayısı',
              color: 'rgb(156, 163, 175)'
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'rgb(156, 163, 175)'
              }
            },
            x: {
              ticks: {
                color: 'rgb(156, 163, 175)'
              }
            }
          }
        }} 
      />
    </div>
  );
};

export default CategoryProductChart; 