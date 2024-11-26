// C:\Users\KIIT\WebstormProjects\PollPixel\backend\routes\authRoutes.js
const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');

const router = express.Router();
const upload = multer(); // Middleware to handle file uploads

// User registration route
router.post('/register', upload.single('image'), authController.register);

// User login route
router.post('/login', upload.single('image'), authController.login);

module.exports = router;
