const mongoose = require('mongoose');

const SignUpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

const SignUp = mongoose.model('SignUp', SignUpSchema)

module.exports = {SignUp}
