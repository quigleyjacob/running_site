var Workout = require("../models/workout"),
    Comment = require("../models/comment")

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    }
    res.redirect("/login");
}


middlewareObj.workoutOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Workout.findById(req.params.id, function(err, workout){
           if(err){
               res.redirect("back");
           }  else {
            if(workout.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.commentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = middlewareObj;