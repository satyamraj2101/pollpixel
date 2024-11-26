// C:\Users\KIIT\WebstormProjects\PollPixel\backend\models\Poll.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vote = require('./Vote'); // Optional circular reference

class Poll extends Model {}

Poll.init(
    {
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        options: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Poll',
        tableName: 'polls',
        timestamps: true,
    }
);

Poll.hasMany(Vote, { foreignKey: 'poll_id', as: 'Votes' });
Vote.belongsTo(Poll, { foreignKey: 'poll_id', as: 'Poll' });

module.exports = Poll;
