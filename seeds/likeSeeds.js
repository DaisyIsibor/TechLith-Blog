const { Like } = require('../models');

const likeData = [
{
    user_id: 1,
    postId: 1,
},
{
    user_id: 2,
    postId: 1,
},

];

const seedLikes = () => Like.bulkCreate(likeData);

module.exports = seedLikes;
