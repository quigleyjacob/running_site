const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

//const workoutRoutes = require("./routes/workout");
//const commentRoutes = require("./routes/comment");
//const authRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/run_club_site", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({extended: true}));

//AUTHENTICATION
app.use(require("express-session")({
    secret: "Running is the best sport in the world",
    resave: false,
    saveUninitialized: false
}));

//ROUTES
app.post("/subscribe", (req, res) => {
  const firstName = req.body['first-name'];
  const lastName = req.body['last-name'];
  const email = req.body['email'];
  const password = req.body['password'];
  const confirmPassword= req.body['confirm-password'];
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    }
    bcrypt.compare(confirmPassword, hash, (err, resp) => {
      if(err) {
        console.log(err);
        return;
      }
      if (resp) {
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hash
        });
        newUser.save()
        .then(res => res.send({success: true, message: "User added"}))
        .catch(err => res.send({success: false, message: "Unable to add user"}));
      }
    })
  })
})


app.listen(3000, function() {
   console.log("Server is running");
});
