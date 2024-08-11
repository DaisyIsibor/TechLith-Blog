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
    console.error('Error fetching comments:', err); // Added log
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
    console.error('Error fetching comments by post ID:', err); // Added log
    res.status(500).json({ message: "Failed to fetch comments" });
}
});

// Create a new comment* postman

// Fetches comments by post ID

router.post('/', withAuth, async (req, res) => {
    console.log('Session User ID:', req.session.userId);
    const { comment_text, postId } = req.body;
    
    try {
        if (!req.session.user_id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const newComment = await Comment.create({
            comment_text,
            postId,
            user_id: req.session.user_id // corrected user_id to match model
        });
        
        res.status(200).json({ newComment, success: true });
    } catch (err) {
        console.error('Error creating comment:', err);
        res.status(500).json({ message: 'Failed to create comment', error: err });
    }
});

// Delete a comment

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id, // Ensure only the comment owner can delete
            },
        });

        if (!comment) {  // No comment found or not authorized
            return res.status(404).json({ message: 'No comment found or you do not have permission to delete this comment' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ message: 'Failed to delete comment', error: err });
    }
});



// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const commentId = req.params.id;
//         const comment = await Comment.findByPk(commentId);

//         if (!comment) {
//             return res.status(404).json({ message: `No comment found with id = ${commentId}` });
//         }

//         if (comment.user_id !== req.session.user_id) {
//             return res.status(403).json({ message: 'You do not have permission to delete this comment' });
//         }

//         await comment.destroy();
//         res.status(200).json({ message: 'Comment deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting comment:', err);
//         res.status(500).json({ message: 'Failed to delete comment', error: err });
//     }
// });


// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         // Extract the comment ID from the request parameters
//         const commentId = req.params.id;

//         // Find the comment by ID
//         const comment = await Comment.findByPk(commentId);

//         // Check if the comment exists
//         if (!comment) {
//             return res.status(404).json({
//                 message: `No comment found with id = ${commentId}`
//             });
//         }

//         // Log the comment and the session user ID for debugging
//         console.log('Comment:', comment);
//         console.log('Session User ID:', req.session.user_id);

//         // Check if the logged-in user is the author of the comment
//         if (comment.user_id !== req.session.user_id) {
//             return res.status(403).json({
//                 message: 'You do not have permission to delete this comment'
//             });
//         }

//         // Delete the comment
//         await comment.destroy();

//         // Comment successfully deleted
//         res.status(200).json({ message: 'Comment deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting comment:', err); // Added log
//         // Handle errors
//         res.status(500).json({ message: 'Failed to delete comment', error: err });
//     }
// });

module.exports = router;

