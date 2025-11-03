// Import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');         // <-- (NEW) Import 'path'
const multer = require('multer');       // <-- (NEW) Import 'multer'

// Import Models
const Product = require('./models/product.model.js');
const User = require('./models/user.model.js');
const Order = require('./models/order.model.js');

// Set up the app
const app = express();
const port = 5000;

// Set up middleware
app.use(cors());
app.use(express.json());

// --- (NEW) Serve static files from the 'uploads' folder ---
// This makes http://localhost:5000/uploads/filename.jpg work
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// --------------------------------------------------------

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/";
mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

// --- (NEW) Multer Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Create a unique filename (date + original name)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
// ----------------------------------

// --- API Routes ---

app.get('/', (req, res) => {
    res.send('Hello! Your backend server is running.');
});

// --- PRODUCT ROUTES ---

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- (MODIFIED) Product POST Route ---
// We add 'upload.single('image')' as middleware.
// 'image' must match the name in our frontend form.
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        // req.body will have the text fields (name, price, etc.)
        // req.file will have the image info
        
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
        });

        // If a file was uploaded, add its URL to the product
        if (req.file) {
            // This creates the full URL for the image
            newProduct.imageUrl = `http://localhost:5000/uploads/₹{req.file.filename}`;
        }

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// -------------------------------------

// --- USER ROUTES ---
// (Your Register and Login routes are unchanged)
app.post('/api/users/register', async (req, res) => {
    // ... (same code as before)
    console.log("--- REGISTER ROUTE HIT! ---"); 
    try {
        const userExists = await User.findOne({ 
            ₹or: [{ email: req.body.email }, { username: req.body.username }] 
        });
        if (userExists) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        const user = new User(req.body);
        const savedUser = await user.save();
        savedUser.password = undefined; 
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("REGISTER ERROR:", error.message);
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    // ... (same code as before)
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        user.password = undefined;
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- ORDER ROUTES ---
// (Your Order routes are unchanged)
app.post('/api/orders', async (req, res) => {
    // ... (same code as before)
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/orders/my-orders/:userId', async (req, res) => {
    // ... (same code as before)
    try {
        const { userId } = req.params;
        const orders = await Order.find({ user: userId })
            .populate('products.product', 'name price imageUrl')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Start the server ---
app.listen(port, () => {
    console.log(`Server is running on http://localhost:₹{port}`);
});