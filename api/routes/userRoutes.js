// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const UserController = require('../controllers/UserController');

// Define file size limit (in bytes)
const MAX_FILE_SIZE = 1000 * 1024 * 1024; // 10 MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Add a unique timestamp to the file name
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE, // Set the file size limit
    fieldSize: MAX_FILE_SIZE, // Set the file size limit
  },
}).single('file'); // For a single file upload

// Define the routes
router.get('/', UserController.getUsers); // GET /api/users

router.post('/create', UserController.createUser); // POST /api/users/create
router.post('/login', UserController.login); // POST /api/users/create
router.get('/verify', UserController.verifyToken); // GET /api/users/verify
router.post('/uploadImage', upload, UserController.uploadImage); // POST /api/users/uploadImage

module.exports = router; // Export the router
