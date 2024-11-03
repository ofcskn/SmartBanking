const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // This will allow all origins

// Connect to MongoDB (update the connection string as needed)
mongoose.connect(process.env.API_CONNECTION_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the user routes
app.use('/api/users', userRoutes); // All user routes will be prefixed with /api/users

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
