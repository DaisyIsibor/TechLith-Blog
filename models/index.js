const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');

// this is if a user has many post then create foreign key and user post can be deleted 
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
//this is if a user has many story the foreign key is created and user post can be deleted as well 
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//This is if a post has many post then a foreign key is created and can be deleted 
Post.hasMany(Comment, {
    foreignKey: 'postId', 
    onDelete: 'CASCADE'
});


// this is if a post belongs to a user then a foreign keys is created and user's post can be deleted as well 
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//this is if a post belong to a story then a foreign key is created and it can be deleted.
Comment.belongsTo(Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


Post.belongsTo(User, { 
    foreignKey: 'user_id' });

User.hasMany(Post, {
     foreignKey: 'user_id' });

Post.belongsToMany(User, {
     through: Like, foreignKey: 'postId' });

User.belongsToMany(Post, { 
    through: Like, foreignKey: 'user_id' });

module.exports = { User, Post, Comment, Like };