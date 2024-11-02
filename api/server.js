const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB (update the connection string as needed)
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the user routes
app.use('/api/users', userRoutes); // All user routes will be prefixed with /api/users

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));