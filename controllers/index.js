// Router for project routes and api routes
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');
const signupRoutes = require('./signupRoutes');
const likeRoutes = require('./likeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/signup', signupRoutes);
router.use('/like', likeRoutes);


module.exports = router;