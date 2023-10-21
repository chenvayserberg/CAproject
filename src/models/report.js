const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportDate: {
    type: Date,
    required: true
  },
  foodAte: {
    type: String,
    required: true
  },
  sugarLevelTwoHoursLater: {
    type: Number,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
});

const Report = mongoose.model("Report", reportSchema, "Reports");

module.exports = Report;


