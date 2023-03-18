const { DataTypes } = require('sequelize');
const db = require('../db');

const UserRole = db.define('userrole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = UserRole;