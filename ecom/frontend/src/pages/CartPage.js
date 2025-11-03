import React from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartPage() {
  // 1. Get data from our contexts
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth(); // We need the user to check out

  // 2. Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  // 3. Handle the checkout process
  const handleCheckout = async () => {
    // --- Security Checks ---
    if (!user) {
      alert("You must be logged in to check out.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // --- Get Shipping Address (simple way) ---
    const shippingAddress = prompt("Please enter your shipping address:");
    if (!shippingAddress) {
      alert("Shipping address is required.");
      return;
    }

    // 4. Format the order data for our backend
    const orderData = {
      user: user._id, // Get the user's ID
      products: cart.map(item => ({
        product: item._id, // Get the product ID
        quantity: 1 // (Our simple cart only supports quantity 1 for now)
      })),
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      // 'status' will be "Processing" by default (set in our backend)
    };

    // 5. Send the order to the backend
    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      
      alert("Order placed successfully!");
      clearCart(); // Empty the cart

    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  // 6. Render the cart
  return (
    <div style={{ border: '1px solid green', padding: '15px', marginTop: '20px' }}>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <hr />
          <h3>Total: ${totalPrice}</h3>
          <button onClick={handleCheckout} style={{ width: '100%', padding: '10px' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;