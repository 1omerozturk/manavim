import React from 'react';
import { Pie } from 'react-chartjs-2';

const UserDistributionChart = ({ customers, producers, totalUsers }) => {
  const userRoleData = {
    labels: ['Müşteriler', 'Üreticiler', 'Yöneticiler'],
    datasets: [
      {
        label: 'Kullanıcı Dağılımı',
        data: [customers, producers, totalUsers - customers - producers],
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

  return (
    <div className="w-full" style={{ height: '300px' }}>
      <Pie data={userRoleData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default UserDistributionChart; 