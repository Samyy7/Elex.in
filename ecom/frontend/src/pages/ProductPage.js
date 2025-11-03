import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AddProduct from '../components/AddProduct'; 

function ProductPage() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth(); 
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = () => {
    fetchProducts();
  };

  // --- (NEW) Styles for the grid and cards ---
  const productGridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    width: '220px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
  };
  // ------------------------------------------

  return (
    <div style={{ padding: '20px' }}>
      {user && user.role === 'admin' && (
        <AddProduct onProductAdded={handleProductAdded} />
      )}
      
      <hr />
      
      <h2>Our Products</h2>
      
      {/* --- (MODIFIED) Apply the grid style --- */}
      <div style={productGridStyle}>
        {products.length > 0 ? (
          products.map(product => (
            
            // --- (MODIFIED) This is now a product card ---
            <div key={product._id} style={cardStyle}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                style={imageStyle} 
              />
              <h3 style={{ fontSize: '1.1rem' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.description}</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price}</p>
              <p style={{ fontSize: '0.8rem' }}>In Stock: {product.stockQuantity}</p>
              
              <button onClick={() => addToCart(product)} style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;