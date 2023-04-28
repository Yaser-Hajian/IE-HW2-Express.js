const mongoose = require('mongoose');
const userSchema = require('./user')
const timestamps = require('mongoose-timestamp');

const professorSchema = mongoose.Schema({
  professor_ID: {
    type: Number,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  faculty:{
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  }
});
professorSchema.add(userSchema);
professorSchema.plugin(timestamps);

const Professor = mongoose.model("Professor", professorSchema);
module.exports = {
  professorSchema,
  Professor
}
