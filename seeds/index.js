const sequelize = require('../config/connection');
// const { User, Post, Comment, Like } = require('../models');
const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');
const seedLikes = require('./likeSeeds');

const seedAll = async () => {
  try {
    // Disable foreign key checks to drop tables with constraints
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Drop all tables
    await sequelize.dropAllSchemas();

    // Sync the database
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Seed the data
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');
    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
    await seedLikes();
    console.log('\n----- LIKES SEEDED -----\n');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedAll();





// const seedPosts = require('./postSeeds');
// const seedUsers = require('./userSeeds');
// const seedComments = require('./commentSeeds');
// const seedLikes = require('./likeSeeds');

// const sequelize = require('../config/connection')

// const seedAll = async () => {
// await sequelize.sync({ force: true });
//     console.log('\n----- DATABASE SYNCED -----\n');
// await seedUsers();
//     console.log('\n----- USERS SEEDED -----\n');
// await seedPosts();
//     console.log('\n----- POSTS SEEDED -----\n');
// await seedComments();
//     console.log('\n----- COMMENTS SEEDED -----\n');
//     await seedLikes();
//     console.log('\n----- LIKES SEEDED -----\n');

// process.exit(0);
// };

// seedAll();