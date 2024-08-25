const { User } = require('../models');

const userData = [
    {
        username: "Daisy Isibor",
        email: "daisyisibor23@testing.com",
        password: "Password4567"
    },


    {
        username: "Emily Smith",
        email: "emilysmith@testing.com",
        password:"Eagle4000$"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;