// Router for project routes and api routes
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');
const signupRoutes = require('./signupRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/signup', signupRoutes);


module.exports = router;