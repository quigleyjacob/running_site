var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
  author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
  },
  text: String,
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Blog", blogSchema);
