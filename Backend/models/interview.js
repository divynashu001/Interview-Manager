const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const interviewSchema = new Schema({
  candidate_name: {
    type: String,
  },
  position:{
    type: String
  },
  status:{
    type: String,
    enum:["pending","scheduled", "completed"],
    default: "pending"
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes:{
    type: String,

  }
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;