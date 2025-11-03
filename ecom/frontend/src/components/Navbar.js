import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar({ onLoginClick }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      background: '#eee'
    }}>
      {/* Left Side: Page Links */}
      <div>
        <Link to="/" style={{ marginRight: '15px' }}>Products</Link>
        <Link to="/cart" style={{ marginRight: '15px' }}>Cart ({cart.length})</Link>
        
        {/* --- (NEW) ADD THIS LINK (only show if logged in) --- */}
        {user && (
          <Link to="/my-orders">My Orders</Link>
        )}
      </div>
      
      {/* Right Side: Auth Status */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '15px' }}>
              Welcome, {user.username}!
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={onLoginClick}>Login / Register</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;