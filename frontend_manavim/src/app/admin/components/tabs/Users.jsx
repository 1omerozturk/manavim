import React from 'react';

const Users = ({ users, onUpdateUserStatus }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Kullanıcı Yönetimi</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Kullanıcı Adı</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">E-posta</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Rol</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Durum</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id || user.id}>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">{user.username}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-700">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                      user.role === 'producer' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}>
                      {user.role === 'admin' ? 'Yönetici' :
                       user.role === 'producer' ? 'Üretici' : 'Müşteri'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-700">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      user.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {user.status === 'active' ? 'Aktif' :
                       user.status === 'pending' ? 'Beklemede' : 'Engelli'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-700">
                    <select
                      className="border dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                      value={user.status || 'active'}
                      onChange={(e) => onUpdateUserStatus(user._id || user.id, e.target.value)}
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
                <td colSpan="5" className="py-4 text-center text-gray-500 dark:text-gray-400">
                  Kullanıcı bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users; 