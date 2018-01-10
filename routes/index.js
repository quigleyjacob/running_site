var express = require("express"),
    router = express.Router({mergeParams: true}),
    User = require("../models/user"),
    passport = require("passport")

router.get("/", function(req, res) {
   res.redirect("/workouts"); 
});

//Register form
router.get("/register", function(req, res) {
   res.render("register"); 
});

//Register post
router.post("/register", function(req, res) {
   var newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            bio: req.body.bio
        });
    User.register(newUser, req.body.password, function(err, user) {
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/");
        });
    }); 
});

//Login Form
router.get("/login", function(req, res) {
   res.render("login"); 
});

//Login Post
router.post("/login", passport.authenticate("local", 
{
   successRedirect: "/",
   failureRedirect: "/login"
}), function(req, res) {});

//Logout Route
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});

module.exports = router;