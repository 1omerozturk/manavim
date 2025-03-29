import React from 'react';

const Announcements = ({ announcements, newAnnouncement, setNewAnnouncement, onAddAnnouncement }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Duyuru Yönetimi</h2>
      
      {/* Yeni Duyuru Formu */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Yeni Duyuru Oluştur</h3>
        <form onSubmit={onAddAnnouncement} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Duyuru Başlığı"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
              className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-slate-600 text-gray-800 dark:text-gray-200"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Duyuru İçeriği"
              value={newAnnouncement.content}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
              className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-slate-600 text-gray-800 dark:text-gray-200"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <select
              value={newAnnouncement.priority}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
              className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-slate-600 text-gray-800 dark:text-gray-200"
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
            <div key={announcement._id || announcement.id} className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-slate-700">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg text-gray-800 dark:text-white">{announcement.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  announcement.priority === 'high' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                  announcement.priority === 'normal' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {announcement.priority === 'high' ? 'Yüksek' :
                   announcement.priority === 'normal' ? 'Normal' : 'Düşük'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{announcement.content}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {new Date(announcement.createdAt || Date.now()).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            Duyuru bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements; 