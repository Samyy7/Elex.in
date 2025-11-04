import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth(); // Get the currently logged-in user

  useEffect(() => {
    // Fetch orders only if the user is logged in
    if (user) {
      const fetchOrders = async () => {
        try {
          // Call the backend endpoint with the user's ID
          const response = await axios.get(`http://localhost:5000/api/orders/my-orders/${user._id}`);
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      };
      
      fetchOrders();
    }
  }, [user]); // Re-run this effect if the user object changes

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Order History</h2>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: '1px solid #ccc', margin: '15px 0', padding: '10px' }}>
            <h4>Order ID: {order._id}</h4>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <h5>Items:</h5>
            <ul>
              {order.products.map((item, index) => (
                <li key={index}>
                  {item.product ? item.product.name : 'Product not found'} (Qty: {item.quantity})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistoryPage;