const { Post } = require('../models');

const postData = [
    {
        title: "Difference between SQL and ORM",
        
        content: "SQL primarily uses relational database management systems (RDBMS) such as MySQL, PostgreSQL, SQLite, and Oracle. On the other hand, ORM relies on frameworks and libraries like Sequelize, Hibernate, SQLAlchemy, and Entity Framework to facilitate the mapping between objects and relational databases.",

        user_id: 1
    }
];

module.exports = postData;
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;