const { Mongoose } = require("mongoose");

const mongoose = require('mongoose')

const setupSchema = new mongoose.Schema({
  _id: { type: String},
  endclose: { type: Boolean},
  fullscreen: { type: Boolean},
  gw: { type: String},
  ip: { type: String },
  loop: { type: Boolean },
  loop_one: { type: Boolean },
  nm: { type: Number },
  poweronplay: { type: Boolean },
  progress: { type: Boolean },
  rtIp: { type: String },
  rtPort: { type: Number }
})

const Setup = mongoose.model('Setup', setupSchema)

module.exports = Setup
