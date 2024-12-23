import { useState } from 'react';
import { useCart } from '../context/CartContext';

const ingredients = [
  { id: 1, name: 'Pepperoni', price: 2.5, image: '🍖' },
  { id: 2, name: 'Mushrooms', price: 1.5, image: '🍄' },
  { id: 3, name: 'Bell Peppers', price: 1.0, image: '🫑' },
  { id: 4, name: 'Onions', price: 1.0, image: '🧅' },
  { id: 5, name: 'Extra Cheese', price: 2.0, image: '🧀' },
  { id: 6, name: 'Olives', price: 1.5, image: '🫒' },
];

function Home() {
  const { addToCart } = useCart();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const basePrice = 10;

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const calculateTotal = () => {
    return (
      basePrice + selectedIngredients.reduce((sum, ing) => sum + ing.price, 0)
    );
  };

  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      alert('Please select at least one ingredient.');
      return;
    }
  
    const pizza = {
      ingredients: selectedIngredients,
      totalPrice: calculateTotal(),
      id: Date.now(),
    };
    addToCart(pizza);
    setSelectedIngredients([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Build Your Pizza</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Base Pizza: ${basePrice}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              onClick={() => toggleIngredient(ingredient)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedIngredients.includes(ingredient)
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <div className="text-4xl mb-2">{ingredient.image}</div>
              <h3 className="font-medium">{ingredient.name}</h3>
              <p className="text-gray-600">${ingredient.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;