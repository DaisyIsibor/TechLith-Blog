// commentRoutes.js
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// const sequelize = require('../../config/connection');

// Get all comments* backend

router.get('/', async (req, res) => {
try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
} catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
}
});

// Get comments by post ID *postman

router.get('/:postId', async (req, res) => {
const postId = req.params.postId;
try {
    const comments = await Comment.findAll({ where: { postId } });
    if (!comments.length) {
    res.status(404).json({ message: `No comments found for post with ID ${postId}` });
    return;
    }
    res.status(200).json(comments);
} catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
}
});

// Create a new comment* postman

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newComment = await Comment.create({
            ...body,
            userId: req.session.userId,
        });
        res.status(200).json({ newComment, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete comment route//  * postman
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Extract the comment ID from the request parameters
        const commentId = req.params.id;

        // Find the comment by ID and delete it
        const deletedCommentCount = await Comment.destroy({
            where: { id: commentId }
        });

        // Check if any comment was deleted
        if (deletedCommentCount === 0) {
            // No comment found with the specified ID
            return res.status(404).json({
                message: `No comment found with id = ${commentId}`
            });
        }

        // Comment successfully deleted
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: "Failed to delete comment", error: err });
    }
});

module.exports = router;
