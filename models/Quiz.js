const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Question = require('./Question');

class Quiz extends Model {}

Quiz.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correct_latitude: {
        type: DataTypes.NUMERIC(10, 6),
        allowNull: false
    },
    correct_longitude: {
        type: DataTypes.NUMERIC(10, 6),
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'quiz'
});

Quiz.belongsTo(Question, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = Quiz;