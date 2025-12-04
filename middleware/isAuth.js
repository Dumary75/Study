

exports.isAuth = (req, res, next){

    if(!req.session.isLoggedIn){
        console.log("You're not logged in!");
        res.redirect('/login');
    };

    next();
}