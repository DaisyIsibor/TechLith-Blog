//api/commentRoute.js
// const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Creating a new post *
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(201).json(postData); // Use status 201 for successful creation
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Retrieving all posts with associated comments
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: Comment }],
        });
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});

// fetches post by id *
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId, {
            include: [{ model: User, attributes: ['username'] }]
        });
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});


// Editing a post


router.put('/api/posts/:id', withAuth, async (req, res) => {
    const postId = req.params.id;  // Corrected from req.params.postId
    const { title, content } = req.body;

    try {
        console.log('Received PUT request for post ID:', postId);
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.user_id !== req.session.user_id) {
            console.log('Unauthorized attempt to update post by user ID:', req.session.user_id);
            return res.status(403).json({ error: 'Unauthorized' });
        }

        console.log('Updating post with ID:', postId, 'New title:', title, 'New content:', content);

        await post.update({ title, content });

        console.log('Post updated successfully');

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// router.put('/posts/:id', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.update(req.body, {
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id // Ensure only the owner can update
//             }
//         });

//         if (!postData[0]) {
//             res.status(404).json({ message: 'No post found with this id or you do not have permission to edit this post' });
//             return;
//         }

//         res.status(200).json({ message: 'Post updated successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to update post' });
//     }
// });




// Deleting a post *
router.delete('/:postId', withAuth, async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the post by its ID
        const post = await Post.findByPk(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        // Check if the authenticated user is the owner of the post
        if (post.user_id !== req.session.user_id) {
            return res.status(403).json({ message: 'You do not have permission to delete this post' });
        }

        // Delete comments associated with the post
        await Comment.destroy({
            where: { postId: postId },
        });

        // Delete the post itself
        await post.destroy();

        // Send a success response
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete post' });
    }
});


module.exports = router;

