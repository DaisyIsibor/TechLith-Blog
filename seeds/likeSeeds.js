const { Like } = require('../models');

const likeData = [
{
    userId: 1,
    postId: 1,
},
{
    userId: 2,
    postId: 1,
},

];

const seedLikes = () => Like.bulkCreate(likeData);

module.exports = seedLikes;
