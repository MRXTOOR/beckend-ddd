const { verify } = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const router = express.Router();


// Здесь можно добавить определение маршрутов

const authMiddleware = (req, res, next) => {
    // Получаем токен из заголовка запроса
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Если токен не был передан, отправляем ошибку авторизации
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Проверяем, действительный ли токен и извлекаем из него идентификатор пользователя
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;