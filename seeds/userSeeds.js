const { User } = require('../models');

const userData = [
    {
        username: "Daisy Isibor",
        email: "daisyisibor23@testing.com",
        password: "Password4567"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;