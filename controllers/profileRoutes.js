const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET user profile and their liked posts
// route defination: This route fetches user data based on the userId from the URL parameter.

router.get('/users/:id', withAuth, async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('Requested User ID:', userId);
        console.log('Session User ID:', req.session.user_id);


        // session validation: Ensures that users can only view their own profile
        if (parseInt(userId) !== req.session.user_id) {
            return res.status(403).json({ message: 'Forbidden: You cannot view this profile.' });
        }


        //Data Fetching: Fetches the user and their associated posts. Each post includes its comments, and each comment includes the username.
        const userData = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'createdAt'],
                    include: [
                        { model: User, attributes: ['username'] } // Author of the post
                    ]
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'createdAt'],
                    include: [{ model: User, attributes: ['username'] }] // Author of each comment
                }
            ]
        });

        if (!userData) {
            return res.status(404).json({ message: `User with ID ${userId} not found` });
        }

        // Render the profile view with the user data
        res.render('profile', { user: userData });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

//         res.json(userData); // Return JSON data
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         res.status(500).json({ error: 'Failed to fetch user data' });
//     }
// });


// GET the page for creating a new post
router.get('/:userId/newpost', (req, res) => {
    res.render('newpost');
});

module.exports = router;
