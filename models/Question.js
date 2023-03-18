const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

class Question extends Model {}

Question.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'question'
});

module.exports = Question;