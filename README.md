# EcomMERN Stack E-commerce Project

This is a full-stack e-commerce application built from scratch using the MERN (MongoDB, Express, React, Node.js) stack. The project simulates a real-world online store for electronic parts, complete with user authentication, role-based access, a product catalog, a shopping cart, and an order management system.

## 🚀 Tech Stack

## Backend

- Node.js: JavaScript runtime environment

- Express.js: Web application framework for Node.js

- MongoDB: NoSQL database for storing user, product, and order data

- Mongoose: ODM (Object Data Modeling) library for MongoDB

- Multer: Middleware for handling multipart/form-data (file uploads)

- CORS: Middleware for enabling Cross-Origin Resource Sharing

## Frontend

- React.js: A JavaScript library for building user interfaces

- React Router: For client-side routing and navigation (multi-page feel)

- React Context: For global state management (User Authentication and Shopping Cart)

- Axios: Promise-based HTTP client for making API requests

## ✨ Features

- User Authentication: Secure user registration and login.

- Role-Based Access Control:

  -  Customer (default): Can browse products, add items to the cart, check out, and view their order history.

  - Admin: Has all customer permissions, plus access to a special form to add new products to the store.

- Product Catalog: Products are displayed in a clean, card-based grid with images, prices, and descriptions.

- Image Uploads: Admins can upload product images directly from their PC, which are stored on the server.

- Shopping Cart: A global cart state that persists through navigation. Users can add items, see a running total, and remove items.

- Checkout System: Customers can place orders, which are saved to the database with all necessary details (user, products, total price, address).

- Responsive UI: A clean, multi-page layout with a persistent navbar, product page, cart page, and order history page.

## 🔧 How to Get Started

Prerequisites

Node.js (which includes npm)

MongoDB Community Server installed and running locally (or a MongoDB Atlas connection string). This guide assumes you are running a local server.

### Installation & Setup

1. Clone the repository:

git clone <your-repo-link>
```
cd ecom-project
```


2. Backend Setup:

#### Navigate to the backend folder
```
cd backend
```
#### Install dependencies
```
npm install
```

Make sure your local MongoDB server is running.
The app expects it at: mongodb://localhost:27017/ecom-project

#### Start the backend server
```
node index.js
```

Your backend will be running on http://localhost:5000


### 3. Frontend Setup:

Open a new terminal
Navigate to the frontend folder from the root
cd ../frontend

#### Install dependencies
```
npm install
```

#### Start the frontend React app
```
npm start
```

Your app will open in your browser at http://localhost:3000


# Database Design: E-commerce MERN Project (NoSQL)

This document outlines the database schema for our MERN stack application.

**Important Note for Viva:** Our project uses **MongoDB (a NoSQL database)**, not a relational (SQL) database. The design is different and often simpler.

* **No Joins:** We don't use complex SQL "joins." Instead, we either **embed** data (like product details in an order) or use **references** (like linking an order to a user).

* **No Keys (in the same way):** MongoDB automatically creates a unique `_id` (like a Primary Key) for every document. We use this `_id` to create references between collections (like a Foreign Key).

* **Collections, not Tables:** We store data in **Collections** (like tables) which hold **Documents** (like rows).

### 1. Collections and their Documents (Entities & Attributes)

| Collection (Entity) | Fields (Attributes) | Attribute Type / Description | Entity Type (MongoDB) |
| :--- | :--- | :--- | :--- |
| **User** | **\_id (PK)**<br>username<br>email<br>password<br>role<br>shippingAddress<br>timestamps | **ObjectId (Auto-PK)**<br>String, Unique<br>String, Unique<br>String (hashed in a real app)<br>String (Enum: 'customer', 'admin')<br>String<br>Date (Auto-generated) | Strong |
| **Product** | **\_id (PK)**<br>name<br>description<br>price<br>stockQuantity<br>imageUrl<br>timestamps | **ObjectId (Auto-PK)**<br>String<br>String<br>Number<br>Number<br>String (URL to uploaded file)<br>Date (Auto-generated) | Strong |
| **Order** | **\_id (PK)**<br>user<br>products<br>totalPrice<br>status<br>shippingAddress<br>timestamps | **ObjectId (Auto-PK)**<br>**Reference (links to User \_id)**<br>**Array of Embedded Documents**<br>Number<br>String (Enum: 'Processing', etc.)<br>String<br>Date (Auto-generated) | Strong |
| **Cart** | (Not a DB Collection) | Managed as **client-side state** in **React Context**. | (N/A) |

### 2. Collections and Relations

In MongoDB, we have two main relationship types: **Reference** (linking) and **Embedding** (nesting).

| Collections (Entities) | Relation | Cardinality (SQL Equiv.) | Implementation (MERN / NoSQL) |
| :--- | :--- | :--- | :--- |
| **User** <BR> **Order** | `places` | One-to-Many | **Reference.** The `Order` document's `user` field stores a `ref` (ObjectId) pointing to the `_id` of the `User` document. |
| **Order** <BR> **Product** | `contains` | Many-to-Many | **Embedding with Reference.** The `Order` document contains a `products` *array*. Each element in the array is an embedded document that holds a `ref` (ObjectId) to a `Product` and the `quantity`. |
| **User (Admin)** <BR> **Product** | `manages` | (N/A - Logic) | **Application-Layer Logic.** This is not a database relation. The React app checks the `user.role` from `AuthContext` to show/hide the "Add Product" form. |
| **Cart (React)** <BR> **Product** | `holds` | (N/A - State) | **Application-Layer State.** This is not a database relation. The `CartContext` in React holds a temporary array of `Product` objects in the browser's memory. |