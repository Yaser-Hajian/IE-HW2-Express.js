const mongoose = require("mongoose");
const User = require("./user");
const timestamps = require("mongoose-timestamp");

const professorSchema = mongoose.Schema({
  professor_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  major: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});
professorSchema.plugin(timestamps);

const Professor = User.discriminator("Professor", professorSchema);

module.exports = {
  professorSchema,
  Professor
}

// module.exports = Professor;
