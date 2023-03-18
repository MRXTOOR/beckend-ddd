const express = require('express');
const router = express.Router();
const { UserRole } = require('../models/UserRole');

// Get all user roles
router.get('/', async(req, res) => {
    try {
        const allUserRoles = await UserRole.findAll();
        res.json(allUserRoles);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get a user role by ID
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const userRole = await UserRole.findByPk(id);
        if (!userRole) {
            return res.status(404).json({ message: 'User role not found' });
        }
        res.json(userRole);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create a user role
router.post('/', async(req, res) => {
    try {
        const { name } = req.body;
        const newUserRole = await UserRole.create({ name });
        res.status(201).json(newUserRole);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a user role
router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const [numAffectedRows, updatedUserRole] = await UserRole.update({ name }, { where: { id }, returning: true });
        if (numAffectedRows === 0) {
            return res.status(404).json({ message: 'User role not found' });
        }
        res.json(updatedUserRole[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a user role
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const numAffectedRows = await UserRole.destroy({ where: { id } });
        if (numAffectedRows === 0) {
            return res.status(404).json({ message: 'User role not found' });
        }
        res.sendStatus(204);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;