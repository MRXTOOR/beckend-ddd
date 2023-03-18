const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// GET all quizzes for a specific question
router.get('/questions/:questionId', async(req, res, next) => {
    try {
        const { questionId } = req.params;
        const quizzes = await Quiz.findAll({ where: { question_id: questionId } });
        res.json(quizzes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new quiz for a specific question
router.post('/questions/:questionId', async(req, res) => {
    try {
        const { title, correctLatitude, correctLongitude } = req.body;
        const { questionId } = req.params;
        const newQuiz = await Quiz.create({ title, correct_latitude: correctLatitude, correct_longitude: correctLongitude, question_id: questionId });
        res.json(newQuiz);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;