// Import the Comment model from '../models'
const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        postId: 1,
        comment_text: "This post beautifully illustrates the difference between SQL and ORM. While SQL directly interacts with relational databases using a query language, ORM abstracts this interaction, mapping database entities to objects in code. It's like comparing speaking directly to a database (SQL) versus having a translator (ORM) handle the conversation for you."
    }
];

// Function to seed the comments into the database
const seedComments = () => Comment.bulkCreate(commentData);

// Export the function to be used in other files
module.exports = seedComments;
