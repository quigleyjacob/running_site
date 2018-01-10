var express = require("express"),
    router = express.Router({mergeParams: true}),
    Comment = require("../models/comment"),
    Workout = require("../models/workout"),
    middleware = require("../middleware")

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Workout.findById(req.params.id, function(err, workout) {
        if (err) {
            console.log(err);
        } else {
            res.render("comment/new", {workout: workout}); 
        }
    }); 
});

//POST
router.post("/", middleware.isLoggedIn, function(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
       if (err) {
           console.log(err);
           res.redirect("/workouts");
       } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    workout.comments.push(comment);
                    workout.save();
                    res.redirect("/workouts/" + workout._id);
                }           
           });
       }
   });
});

//EDIT
router.get("/:comment_id/edit", middleware.commentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
       if (err) {
           res.redirect("back");
       } else {
            res.render("comment/edit", {workout_id: req.params.id, comment: comment});
       }
    });
});

//UPDATE
router.put("/:comment_id", middleware.commentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/workouts/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:comment_id", middleware.commentOwnership, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
      if (err) {
          return res.redirect("/workouts/" + req.params.id);
      }
      res.redirect("/workouts/" + req.params.id);
   });
});

module.exports = router;