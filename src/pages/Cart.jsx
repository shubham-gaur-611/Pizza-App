import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    // Handle checkout logic here
    alert('Order placed successfully!');
  };

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty</div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {cart.map((pizza, index) => (
            <div
              key={pizza.id}
              className="border-b last:border-b-0 py-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">Custom Pizza</h3>
                <p className="text-gray-600 text-sm">
                  {pizza.ingredients.map((ing) => ing.name).join(', ')}
                </p>
                <p className="font-bold mt-1">${pizza.totalPrice.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: ${total.toFixed(2)}
            </div>
            <button
              onClick={handleCheckout}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              {user ? 'Checkout' : 'Login to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;