const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String ,
            required : true, 
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            unique: true,
            trim: true,
            },
    password: { type: String, required: true, max: 10 },
    token: { type: String }
  },
  { timestamps: true, versionKey: false }
);

const Joke = mongoose.model("users", userSchema);
module.exports = Joke;