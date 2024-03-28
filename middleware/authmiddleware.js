const authenticate = (req, res, next) => {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
        // User is authenticated, proceed to the next middleware
        return next();
    } else {
        // User is not authenticated, send an error response
        return res.status(401).send('Unauthorized');
    }
};

module.exports = authenticate;
