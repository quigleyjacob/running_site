var mongoose = require("mongoose");

var workoutSchema = new mongoose.Schema({
   title: String,
   mileage: Number,
   date: Date,
   desc: String,
   comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
    ],
    author: {
       id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
       },
       username: String
    }
});

module.exports = mongoose.model("Workout", workoutSchema);