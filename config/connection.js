// Import Sequelize module

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    // For Heroku JawsDB MySQL add-on or similar
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Local MySQL database configuration
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false
    });
}

module.exports = sequelize;
