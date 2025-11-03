import React, { useState } from 'react';
import axios from 'axios';

function AddProduct({ onProductAdded }) {
  // --- (MODIFIED) We change imageUrl state to hold the file object ---
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [image, setImage] = useState(null); // This will hold the file

  // --- (NEW) This function updates the image state ---
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Get the first file selected
  };

  // --- (MODIFIED) handleSubmit now uses FormData ---
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // 1. Create FormData
    const formData = new FormData();
    
    // 2. Append all the data
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stockQuantity', stockQuantity);
    formData.append('image', image); // 'image' must match the backend 'upload.single('image')'

    try {
      // 3. Send the FormData
      // We must also set the 'Content-Type' header
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('Product added successfully!');
      
      // Clear all fields
      setName('');
      setDescription('');
      setPrice(0);
      setStockQuantity(0);
      setImage(null);
      // We also need to clear the file input (tricky, but this is a simple way)
      e.target.reset();

      if (onProductAdded) {
        onProductAdded(); 
      }

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '15px', marginTop: '20px' }}>
      <h2>Add a New Product</h2>
      {/* --- (MODIFIED) The form tag needs 'onSubmit' --- */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Description: </label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Price: </label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Stock Quantity: </label>
          <input 
            type="number" 
            value={stockQuantity} 
            onChange={(e) => setStockQuantity(e.target.value)} 
            required 
          />
        </div>
        
        {/* --- (MODIFIED) This is now a file input --- */}
        <div style={{ marginTop: '10px' }}>
          <label>Image: </label>
          <input 
            type="file" 
            name="image" // This name is important
            onChange={handleFileChange} 
            required
          />
        </div>
        {/* ---------------------------------- */}
        
        <button type="submit" style={{ marginTop: '10px' }}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;