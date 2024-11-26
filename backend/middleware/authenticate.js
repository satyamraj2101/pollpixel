//C:\Users\KIIT\WebstormProjects\PollPixel\backend\middleware\authenticate.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const authenticate = (req, res, next) => {
    // Check if token is provided in the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Use JWT_SECRET instead of JWT_SECRET_KEY
        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            throw new Error('Secret key for JWT verification is not provided.');
        }

        // Verify the JWT token
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid or expired token.' });
            }

            // Attach the decoded user info to the request object
            req.user = decoded;
            next();  // Proceed to the next middleware or route handler
        });

    } catch (error) {
        console.error('Error in JWT verification:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

module.exports = authenticate;