const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true // No two users can have the same username
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Each email must be unique
        lowercase: true // Store email in lowercase
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'], 
        default: 'customer'         // By default, everyone is a customer
    },
    shippingAddress: {
        type: String,
        required: false 
    }
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;