const mongoose = require('mongoose');

// This is the "blueprint" for our product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // This field must be filled out
        trim: true      // Removes any extra whitespace
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0          // Price can't be negative
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        required: false, // An image isn't strictly required
        default: 'https://via.placeholder.com/150'
    }
}, {
    timestamps: true // Automatically adds "createdAt" and "updatedAt" fields
});

// This creates the model that our app can use
const Product = mongoose.model('Product', productSchema);

module.exports = Product; // Exports the model to be used in other files