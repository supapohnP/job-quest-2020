const express = require("express");
const router = express.Router();
const Joke = require("../models/joke_model");

// GET all
router.get("/", (req, res) => {
  Joke.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// GET 1
router.get("/:_id", (req, res) => {
  Joke.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// POST (create new data)
router.post("/", (req, res) => {
  var obj = new Joke(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
        status: "Yes",
        message: "success to insert new data",
        data: req.body,
    });
  });
});

// PUT (update current data)
router.put("/:_id", (req, res) => {
  Joke.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
        status: "Yes",
        message: "success to update data",
        data: req.body,
    });
  });
});

// DELETE (delete 1 data)
router.delete("/:_id", (req, res) => {
  Joke.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
        status: "Yes",
        message: "success to delete data",
    });
  });
});

module.exports = router;