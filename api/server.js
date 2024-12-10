const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const bankingRoutes = require('./routes/bankingRoutes');

dotenv.config();

const PORT = process.env.PORT || 5000;
const API_LOCALHOST = process.env.API_LOCALHOST || '0.0.0.0';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // This will allow all origins

// Connect to MongoDB (update the connection string as needed)
mongoose
  .connect(process.env.API_CONNECTION_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use the user routes
app.use('/api/users', userRoutes); // All user routes will be prefixed with /api/users
app.use('/api/banking', bankingRoutes); // All user routes will be prefixed with /api/users

app.use('/api/uploads', express.static('uploads'));

app.listen(PORT, API_LOCALHOST, () =>
  console.log(`Server running on port ${PORT}`)
);
