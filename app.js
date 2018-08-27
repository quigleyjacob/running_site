const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://runblogger:runpass1@ds119732.mlab.com:19732/run_blog");
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
    if (err) throw err;
    bcrypt.compare(confirmPassword, hash, (err, resp) => {
      if(err) throw err;
      if (resp) {
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hash
        });
        req.session.user = newUser;
        newUser.save()
        .then(response => res.send({success: true, message: "User added"}))
        .catch(err => res.send({success: false, message: "Unable to add user"}));
      }
    })
  })
})

app.get("/isLoggedIn", (req, res) => {
  if(req.session.user) {
    res.send(true);
  } else {
    res.send(false);
  }
})

app.post("/login", (req, res) => {
  const email = {email: req.body['email']};
  const password = req.body['password'];
  User.findOne(email, (err, user) => {
    if (err) throw err;
    if (user) {
      bcrypt.compare(password, user.password, (err, resp) => {
        if (err) throw err;
        if(resp) {
          req.session.user = user;
          res.send({success: true});
        } else {
          res.send({success: false, message: "Incorrect Password"});
        }
      })
    } else {
      res.send({success: false, message: "Cannot find a user with this email address"});
    }
  })
})

app.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
      res.send({success: false, message: "Unable to log out"});
    } else {
      res.send({success: true});
    }
  })
})

app.get("/admin", (req, res) => {
  if(req.session.user && req.session.user.admin) {
    res.sendFile(__dirname + "/views/admin.html");
  } else {
    res.send("You are not authorized to see this");
  }
})

app.post("/newPost", (req, res) => {
  const title = req.body['title'];
  const body = req.body['body'];
  if(req.session.user && req.session.user.admin) {
    const newPost = new Post({
      title: title,
      body: body,
      author: {id: req.session.user._id, username: req.session.user.firstName}
    });
    newPost.save()
    .then(response => res.send({success: true, message: "Post Added"}))
    .catch(err => res.send({success: false, message: "Unable to add post"}));
  } else {
    res.send({success: false, message: "You do not have access to create posts"});
  }
});

app.get("/getPosts", (req, res) => {
  Post.find({}).sort({createdAt: -1}).exec((err, posts) => {
    if (err) throw err;
    res.send(posts);
  })
})

app.get("/getPost", (req, res) => {
  const id = req.query.id;
  Post.findById(id, (err, post) => {
    if (err) throw err;
    res.send(post);
  });
})

app.listen(PORT, function() {
   console.log("Server is running");
});
