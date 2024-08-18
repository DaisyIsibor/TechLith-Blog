const express = require('express');
const router = express.Router();
const { Like } = require('../models');
const withAuth = require('../utils/auth');

// Like a post

//http://localhost:3001/like/1 
router.post('/:postId', withAuth, async (req, res) => {
    console.log('POST /:postId called');
    try {
        const { postId } = req.params;
        const userId = req.session.user_id;

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({
            where: {
                user_id: userId,
                postId: postId,
            },
        });

        if (existingLike) {
            return res.status(400).json({ message: 'You have already liked this post.' });
        }

        // Create a new like
        const newLike = await Like.create({
            user_id: userId,
            postId: postId,
        });

        res.status(200).json(newLike);
    } catch (err) {
        console.error('Error liking post:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Unlike a post

router.delete('/:postId', withAuth, async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.session.user_id;

        // Delete the like
        const likeToDelete = await Like.destroy({
            where: {
                user_id: userId,
                postId: postId,
            },
        });

        if (!likeToDelete) {
            return res.status(404).json({ message: 'Like not found.' });
        }

        res.status(200).json({ message: 'Like removed successfully' });
    } catch (err) {
        console.error('Error unliking post:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get the count of likes for a post
router.get('/count/:postId', async (req, res) => {
    try {
        const { postId } = req.params;

        // Count the number of likes for the post
        const likeCount = await Like.count({
            where: {
                postId: postId,
            },
        });

        res.status(200).json({ likeCount });
    } catch (err) {
        console.error('Error getting like count:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
