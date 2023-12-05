const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  currentSugarLevel: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  opinion: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema, "Questions");

module.exports = Question;
