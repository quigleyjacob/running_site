var express = require("express"),
    router = express.Router({mergeParams: true}),
    Workout = require("../models/workout"),
    middleware = require("../middleware")
    
//INDEX ROUTE
router.get("/", function(req, res) {
    Workout.find({}, function(err, workout) {
        if (err) {
            console.log(err);
        } else {
            res.render("workout/index", {workouts: workout});
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("workout/new"); 
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
    Workout.create(req.body.workout, function(err, workout) {
        if (err) {
            console.log(err);
        } else {
            workout.author.id = req.user._id;
            workout.author.username = req.user.username;
            workout.save();
            res.redirect("/workouts");
        }
    });
});

//SHOW ROUTE
router.get("/:id", function(req, res) {
    Workout.findById(req.params.id).populate("comments").exec(function(err, workout) {
      if (err) {
          res.redirect("/workouts");
      } else {
          res.render("workout/show", {workout: workout});
      }
    });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.workoutOwnership, function(req, res) {
    Workout.findById(req.params.id, function(err, foundWorkout) {
        if (err) {
            res.redirect("/workouts");
        } else {
            res.render("workout/edit", {workout: foundWorkout});
        }
    })
});

//UPDATE ROUTE
router.put("/:id", middleware.workoutOwnership, function(req, res) {
    Workout.findByIdAndUpdate(req.params.id, req.body.workout, function(err, updatedWorkout) {
      if (err) {
          res.redirect("/workouts");
      } else {
          res.redirect("/workouts/" + req.params.id);
      }
    });
});

//DESTROY ROUTE
router.delete("/:id", middleware.workoutOwnership, function(req, res) {
   Workout.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
          res.redirect("/workouts");
      } else {
          res.redirect("/workouts");
      }
   });
});

module.exports = router;