import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

// Import Pages
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage'; // 1. IMPORT IT

function App() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowAuth(true);
    } else {
      setShowAuth(false);
    }
  }, [user]);

  return (
    <BrowserRouter>
      {/* The Navbar is shown on ALL pages */}
      <Navbar onLoginClick={() => setShowAuth(true)} />

      {/* This is the main content area */}
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        
        {/* --- 2. ADD THIS NEW ROUTE --- */}
        <Route path="/my-orders" element={<OrderHistoryPage />} />
      </Routes>

      {/* --- This is our Login/Register Popup (Modal) --- */}
      {showAuth && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '5px' }}>
            <Login onLoginSuccess={() => setShowAuth(false)} />
            <Register />
            <button onClick={() => setShowAuth(false)} style={{ marginTop: '10px' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;