var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local")

var workoutRoutes = require("./routes/workout"),
    commentRoutes = require("./routes/comment"),
    authRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/run_club_site", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//AUTHENTICATION
app.use(require("express-session")({
    secret: "Running is the best sport in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//ROUTES

app.use("/", authRoutes);
app.use("/workouts", workoutRoutes);
app.use("/workouts/:id/comments", commentRoutes);

app.listen(3000, function() {
   console.log("Server is running");
});
