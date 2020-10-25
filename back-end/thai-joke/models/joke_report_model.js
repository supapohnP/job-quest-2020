const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    joke_id: { type: String },
    username: { type: String },
    status: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Report = mongoose.model("joke_report", reportSchema);
module.exports = Report;