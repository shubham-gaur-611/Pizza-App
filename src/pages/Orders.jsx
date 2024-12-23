import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Orders() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Mock orders data
  const orders = [
    {
      id: 1,
      date: '2024-03-15',
      items: [
        {
          ingredients: [
            { name: 'Pepperoni', price: 2.5 },
            { name: 'Extra Cheese', price: 2.0 },
          ],
          totalPrice: 14.5,
        },
      ],
      status: 'Delivered',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-600">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {order.status}
              </span>
            </div>
            {order.items.map((item, index) => (
              <div key={index} className="border-t pt-4 mt-4">
                <h3 className="font-medium">Custom Pizza</h3>
                <p className="text-gray-600 text-sm">
                  {item.ingredients.map((ing) => ing.name).join(', ')}
                </p>
                <p className="font-bold mt-1">${item.totalPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;