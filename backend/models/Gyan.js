const mongoose = require('mongoose')
const {answerSchema} = require('./Answer')

const gyanSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers:{
    type:[answerSchema]
  }
});

module.exports = mongoose.model('Gyan',gyanSchema);