var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false}
});

module.exports = mongoose.model("User", userSchema);
