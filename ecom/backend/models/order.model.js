const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    // This creates a link to the User model.
    // It stores the user's unique _id.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This tells Mongoose which model to link to
        required: true
    },
    
    // This will be an array of products
    products: [
        {
            // This links to the Product model
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    
    totalPrice: {
        type: Number,
        required: true
    },
    
    // This is the "tracking" part you wanted
    status: {
        type: String,
        required: true,
        default: 'Processing', // Default status when an order is placed
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] // Limits status to these values
    },
    
    trackingNumber: {
        type: String,
        required: false // We'd add this when it's 'Shipped'
    },
    
    shippingAddress: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;