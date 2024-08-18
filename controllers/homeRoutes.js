//controller/homeRoutes.js

const express = require('express');
const router = express.Router();
const { Post, User, Comment, Like } = require('../models');
// const sequelize = require('../config/connection');
const withAuth = require('../utils/auth')

// Retrieve all posts for the homepage *
//http://localhost:3001/api/posts
router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }] 
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

            // Determine if the user has liked each post
            if (req.session.user_id) {
                for (const post of posts) {
                    const userLiked = await Like.findOne({
                        where: {
                            user_id: req.session.user_id,
                            postId: post.id, // Use postId to match the model
                        },
                    });
                    post.userLiked = !!userLiked;
                }
            }

        res.render('homepage', { posts,  
        logged_in: req.session.logged_in  });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Render single post view  * DUPLICATE CODE MAYBE

// router.get('/post/:id/comments', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User, // Include User model
//                     attributes: ['username'], // Only include the username attribute
//                 },
//                 {
//                     model: Comment, include: [User],
//                 }
//             ],
//         });

//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }

//         const post = postData.get({ plain: true });

//         // const isAuthor = post.user_id === req.session.user_id;

//         // post.comments.forEach(comment => {
//         //     comment.isAuthor = comment.user_id === req.session.user_id; 

//         //     console.log('Comment Data:',comment)
//         // });

//         // res.render('singlepost', {
//         //     post,
//         //     comments: post.Comments,
//         //     isAuthor,
//         //     logged_in: req.session.logged_in
//         // });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });


// Retrieving all posts with associated comments // may not need 
// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.findAll({
//             include: [{ model: Comment }],
//         });
//         res.status(200).json(posts);
//     } catch (err) {
//         console.error('Error retrieving posts:', err);
//         res.status(500).json({ error: 'Failed to retrieve posts' });
//     }
// });

// Render single post view with comments
// ***

router.get('/post/:id/comments', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User, // Include User model
                    attributes: ['username'], // Only include the username attribute
                },
                {
                    model: Comment, include: [User],
                }
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // Convert to plain object for easier manipulation
        const post = postData.get({ plain: true });

        // Debug logging
        console.log('Post Data:', post);
        console.log('Logged-in User ID:', req.session.user_id);

        // Set `isAuthor` for post
        post.isAuthor = post.user_id === req.session.user_id;

        // Set `isAuthor` for each comment
        post.comments.forEach(comment => {
            comment.isAuthor = comment.user_id === req.session.user_id;
            
        });

        // Pass `post` with `isAuthor` flags to the template
        res.render('singlepost', {
            post,
            comments: post.comments,
            logged_in: req.session.logged_in,
            isAuthor: post.isAuthor
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});






//Render edit post form
router.get('/posts/:id/edit', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = postData.get({ plain: true });

        // Check if the authenticated user is the owner of the post
        if (post.user_id !== req.session.user_id) {
            res.status(403).json({ message: 'You do not have permission to edit this post' });
            return;
        }

        // Render the edit post form with the post data
        res.render('editpost', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch post data' });
    }
});

// profile route *
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged-in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { 
                    model: Post, 
                    include: [{ model: Comment, attributes: ['id', 'comment_text'] }] 
                }
            ],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


//Login *
router.get("/login", (req, res) => {
    if (req.session.logged_in){
        res.redirect('/profile');
        return;
    }
    res.render('login');
})

// route for the newpost form *
router.get('/newpost', (req, res) => {
    if (req.session.logged_in) {
        res.render('newpost', {
            logged_in: true,
        });
        return;
    }
})

// route for my contact information *
router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;
