const express = require('express');
const router = express.Router();
const { User, Post} = require('../models');
// const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// GET user profile and their posts
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId, {
            include: [{ model: Post, order: [['createdAt', 'DESC']] }],
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.render('profile', { user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
});


// GET the page for creating a new post
router.get('/:userId/newpost', (req, res) => {
    res.render('newpost');
});



module.exports = router;
