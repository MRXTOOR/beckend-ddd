const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Models
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');
const UserRole = require('./models/UserRole');

// Routes
const questionRoutes = require('./routes/question');
const quizRoutes = require('./routes/quiz');
const userRoleRoutes = require('./routes/userrole');
app.use('/api/question', questionRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/userrole', userRoleRoutes);

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL);
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Sync models with database
sequelize.sync().then(() => {
    console.log('All models were synchronized successfully.');
}).catch((err) => {
    console.error('Unable to sync models:', err);
});

// Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});