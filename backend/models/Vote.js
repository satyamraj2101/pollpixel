// C:\Users\KIIT\WebstormProjects\PollPixel\backend\models\Vote.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Vote extends Model {}

Vote.init(
    {
        poll_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        voter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        selected_option: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Vote',
        tableName: 'votes',
        timestamps: true,
    }
);

module.exports = Vote;
