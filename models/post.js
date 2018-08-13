var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
  author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: {type: String, required: true}
  },
  title: {type: String, required: true},
  body: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Blog", blogSchema);
