const withAuth = (req, res, next) => {
    // Check if user is logged in by checking for a logged_in property in session
    if (!req.session.logged_in) {
        // If not logged in, redirect to the login page
        res.redirect('/login');
    } else {
        // If logged in, continue to the next middleware or route handler
        next();
    }
};

module.exports = withAuth