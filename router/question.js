const express = require('express');
const router = express.Router();
const { Question } = require('../models');

// Получение списка всех вопросов
router.get('/', async(req, res) => {
    try {
        const questions = await Question.findAll();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение одного вопроса по id
router.get('/:id', async(req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (question == null) {
            return res.status(404).json({ message: 'Cannot find question' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Создание нового вопроса
router.post('/', async(req, res) => {
    const { title, description, is_private } = req.body;
    try {
        const question = await Question.create({ title, description, is_private });
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Изменение данных вопроса по id
router.patch('/:id', async(req, res) => {
    const { title, description, is_private } = req.body;
    try {
        const question = await Question.findByPk(req.params.id);
        if (question == null) {
            return res.status(404).json({ message: 'Cannot find question' });
        }
        question.title = title || question.title;
        question.description = description || question.description;
        question.is_private = is_private || question.is_private;
        await question.save();
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Удаление вопроса по id
router.delete('/:id', async(req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (question == null) {
            return res.status(404).json({ message: 'Cannot find question' });
        }
        await question.destroy();
        res.json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;