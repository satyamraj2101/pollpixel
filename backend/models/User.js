// C:\Users\KIIT\WebstormProjects\PollPixel\backend\models\User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // your sequelize instance

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rekognition_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = User;
