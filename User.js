const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  comision: {
    type: Number,
    required: true
  },
  CUIT: {
    type: Number,
    required: false
  },
  RazonSocial: {
    type: String,
    required: false
  },
  habiltado: {
    type: Boolean,
    default: 0
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
