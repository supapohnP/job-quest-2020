const mongoose = require("mongoose");

const jokeSchema = mongoose.Schema(
  {
    question: { type: String },
    answer: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Joke = mongoose.model("jokes", jokeSchema);
module.exports = Joke;