const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect("/login");
    } else {
        // when withAuth calls next(), it will call the next function
        next();
    }
};

module.exports = withAuth;