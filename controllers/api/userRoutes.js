// Routes to get all user details and post.

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth')
// const sequelize = require('../../config/connection');

// get all users *
router.get('/', async (req, res) => {
    try {
    const dbUserData = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    res.status(200).json(dbUserData);
    } catch (err) {
    res.status(400).json(err);
    }
});

// The route handler retrieves user data along with associated posts and comments. *

router.get('/:id', async (req, res) => {
    try {
    const userData = await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
        {
            model: Post,
            attributes: ['id', 'title', 'content'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text'],
            include: {
            model: Post,
            attributes: ['title'],
            },
        },
        ],
    });

    if (!userData) {
        return res.status(404).json({ message: `User with ID ${req.params.id} not found` });
    }

    res.status(200).json(userData);
    } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

// user login *
router.post('/login', async (req, res) => {
    try {
    const { username, password } = req.body;
    const dbUserData = await User.findOne({ where: { username } }); 
    if (!dbUserData || !(await dbUserData.checkPassword(password))) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.name = dbUserData.name;
        req.session.logged_in = true;
        res.status(200).json({ message: 'Login successful' });
    });
    } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
    }
});


// this is a signup route to redirect to the profile once user signs up *
router.post('/signup', async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.name = dbUserData.name;
            req.session.logged_in = true;
            res.status(200).json({ message: 'Account created successfully', redirectTo: '/profile' }); // JSON response with redirection info
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// user logout *
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
    req.session.destroy(() => {
        res.status(204).end();
    });
    } else {
    res.status(404).end();
    }
});

// Using the DELETE method to delete a user
router.delete('/:id', withAuth, async (req, res) => {
    try {
    const dbUserData = await User.destroy({
        where: {id: req.params.id},
    });        
    if (!dbUserData) {
        res.status(404).json({
        });
        return;
    }  
    res.status(200).json({dbUserData, success: true});
    } catch (err) {
    res.status(500).json(err);
    }
});


module.exports = router;