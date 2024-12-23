import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-red-600">
            Pizza Builder
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-600">
              Build Pizza
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-red-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-red-600">
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );    
}

export default Navbar;