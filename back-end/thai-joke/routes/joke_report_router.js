const express = require("express");
const router = express.Router();
const JokeReport = require("../models/joke_report_model");
const UserModel = require('../models/user_model');
const checkAuth = require('../middleware/user_auth');

// GET all
router.get("/", checkAuth, (req, res) => {
  JokeReport.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// GET 1
router.get("/:_id", checkAuth, (req, res) => {
  JokeReport.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// POST (create new data)
router.post("/", checkAuth, (req, res) => {
  var obj = new JokeReport(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
      status: "Yes",
      message:"success to insert new data",
      data: req.body,
    });
  });
});

// POST (like)
router.post("/:_id/like", checkAuth, (req, res) => {
  JokeReport.updateMany(
    {_id : req.params._id},
    {$set : {status: "like"} },
    {new: true, upsert: true}).exec()
    .then(()=>{
      res.status(200).send({
                status: "Yes",
                message : "success to post like joke",
                data: req.body,
                });
  }).catch(err =>{
      res.status(200).send({
        status: "No",
        message : "failed to post like joke",
        });
  })
});

// POST (dislike)
router.post("/:_id/dislike", checkAuth, (req, res) => {
  JokeReport.updateMany(
    {_id : req.params._id},
    {$set : {status: "dislike"} },
    {new: true, upsert: true}).exec()
    .then(()=>{
      res.status(200).send({
                status: "Yes",
                message : "success to post dislike joke",
                data: req.body,
                });
  }).catch(err =>{
      res.status(200).send({
        status: "No",
        message : "failed to post dislike joke",
        });
  })
});

// PUT (update current data)
router.put("/:_id", checkAuth,(req, res) => {
  JokeReport.updateMany({_id : req.params._id},{$set : req.body, updated: new Date() }).exec()
    .then(()=>{
      res.status(200).send({
                status : "Yes", 
                message : "success to update data",
                data: req.body,
                });
  }).catch(err =>{
      res.status(200).send({
        status: "No",
        message : "failed to update data",
        });
  })
});

// DELETE (delete 1 data)
router.delete("/:_id", checkAuth, (req, res) => {
  JokeReport.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
      status:"Yes",
      message:"success to delete data"
    });
  });
});

module.exports = router;