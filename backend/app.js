// C:\Users\KIIT\WebstormProjects\PollPixel\backend\app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes'); // Added poll routes
const voteRoutes = require('./routes/voteRoutes'); // Added vote routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// Register routes
app.use('/auth', authRoutes);
app.use('/polls', pollRoutes); // Register poll routes
app.use('/votes', voteRoutes); // Register vote routes
app.use('/vote', voteRoutes); // Register vote routes

const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize
    .sync({ force: false }) // Use { force: false } to avoid dropping tables
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
        process.exit(1); // Exit the process with an error code
    });

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
