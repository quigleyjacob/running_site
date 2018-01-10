var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    image: {type: String, default: "http://vector.me/files/images/6/9/691000/winged_foot"},
    bio: String,
    username: String,
    password: String,
    email: String
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);