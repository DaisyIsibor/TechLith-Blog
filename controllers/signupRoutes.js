// signupRoutes.js
const express = require('express');
const router = express.Router();
// const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    // Render the sign-up form
    res.render('signup');
});

module.exports = router;