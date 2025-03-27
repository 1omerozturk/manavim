'use client';

const cartItems = [
  {
    id: 1,
    name: 'Elma',
    price: 12.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    unit: 'kg'
  },
  {
    id: 2,
    name: 'Süt',
    price: 15.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    unit: 'adet'
  },
  {
    id: 3,
    name: 'Ekmek',
    price: 5.99,
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    unit: 'adet'
  }
];

const CartPage = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">Sepetim</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Sepetiniz boş</p>
          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Alışverişe Başla
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.price.toFixed(2)} TL / {item.unit}
                </p>
                <div className="flex items-center mt-2">
                  <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                    +
                  </button>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Ara Toplam:</span>
              <span className="text-xl font-bold text-green-600">{total.toFixed(2)} TL</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Kargo:</span>
              <span className="text-xl font-bold text-green-600">Ücretsiz</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">Toplam:</span>
                <span className="text-2xl font-bold text-green-600">{total.toFixed(2)} TL</span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                Siparişi Tamamla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 