// C:\Users\KIIT\WebstormProjects\PollPixel\backend\controllers\authController.js
require('dotenv').config();  // Load environment variables at the top of the file

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const rekognition = require('../services/rekognitionService');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, confirmPassword, image } = req.body;

    // Check if the image is base64
    if (!image || !image.startsWith('data:image')) {
        return res.status(400).json({ error: 'Invalid image format' });
    }

    // Decode the base64 image
    const base64Image = image.split(';base64,').pop(); // Remove the data:image/jpeg;base64 part
    const buffer = Buffer.from(base64Image, 'base64');

    try {
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const user = await User.create({
            username: name,
            email,
            password: hashedPassword,
        });

        // Add face to Rekognition
        const rekognitionResponse = await rekognition.addFaceToCollection(process.env.AWS_REKOGNITION_COLLECTION, buffer);

        // Store Rekognition ID in the user's record
        user.rekognition_id = rekognitionResponse.FaceRecords[0].Face.ExternalImageId;
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password, image } = req.body;

    // Check if image is provided and properly formatted
    if (!image || !image.startsWith('data:image')) {
        return res.status(400).json({ error: 'Invalid image format' });
    }

    const base64Image = image.split(';base64,').pop();
    const buffer = Buffer.from(base64Image, 'base64');

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify face with Rekognition
        const searchResult = await rekognition.searchFace(process.env.AWS_REKOGNITION_COLLECTION, buffer);
        if (
            !searchResult.FaceMatches.length ||
            searchResult.FaceMatches[0].Face.ExternalImageId !== user.rekognition_id
        ) {
            return res.status(401).json({ error: 'Face verification failed' });
        }

        // Create a JWT token using JWT_SECRET
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};