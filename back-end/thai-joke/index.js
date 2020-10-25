const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const mongo_uri = "mongodb+srv://admin:1234@myprj.k99y8.mongodb.net/thai_joke?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
// mongoose.set('useFindAndModify', false);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useCreateIndex', true);
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("[success] task 1 : listening on port " + port);
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to THAI'S JOKE.");
});

// path for MongoDB
const Joke = require("./routes/joke_router");
const User = require("./routes/user_router");
const Report = require("./routes/joke_report_router");

app.use("/api/joke", Joke);
app.use("/api/user", User);
app.use("/api/report", Report);

app.use((req, res, next) => {
  var err = new Error("not found path");
  err.status = 404;
  next(err);
});