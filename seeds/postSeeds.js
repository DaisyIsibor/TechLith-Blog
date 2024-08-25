const { Post } = require('../models');

const postData = [
    {
        title: "Difference between SQL and ORM",
        
        content: "SQL primarily uses relational database management systems (RDBMS) such as MySQL, PostgreSQL, SQLite, and Oracle. On the other hand, ORM relies on frameworks and libraries like Sequelize, Hibernate, SQLAlchemy, and Entity Framework to facilitate the mapping between objects and relational databases.",

        user_id: 1
    },

    {
        title:"Connecting MongoDB Atlas to a React Application",

        content:"Integrating MongoDB Atlas with your React app can seem like a daunting task, but it's easier than you might think. First, set up your MongoDB Atlas account, create a cluster, and add a database user. Don't forget to whitelist your IP address to allow access. Next, you'll need a backend server. Using Node.js with Express and Mongoose is a great choice. Connect your server to MongoDB Atlas using the connection string provided. Finally, create your React app and use fetch or Axios to connect to your backend and retrieve data. This setup will enable you to leverage MongoDB's powerful, flexible database with React's dynamic user interfaces, making your development process smooth and efficient.",

        user_id: 2
    }
];

module.exports = postData;
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;