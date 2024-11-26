// C:\Users\KIIT\WebstormProjects\PollPixel\backend\config\database.js
// Import the Sequelize class from sequelize package
const { Sequelize } = require('sequelize');

// Setup the connection to the database (replace with your own credentials)
const sequelize = new Sequelize('postgres://postgres:satyamraj1509@testheaven.czggai6wqb4z.us-east-1.rds.amazonaws.com:5432/pollpixel', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,  // Use SSL
            rejectUnauthorized: false,  // Disable certificate validation if needed
        },
    },
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Export the sequelize instance to use it in other files
module.exports = sequelize;
