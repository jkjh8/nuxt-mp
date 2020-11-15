const { Mongoose } = require("mongoose");

const mongoose = require('mongoose')

const filelistSchema = new mongoose.Schema({
  complete_name: { type: String},
  name: { type: String},
  duration: { type: Number },
  type: { type: String },
  size: { type: Number }
})

const Filelist = mongoose.model('Filelist', filelistSchema)

module.exports = Filelist
