const { Mongoose } = require("mongoose");
const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
  color: { type: String },
  complete_name: { type: String},
  name: { type: String},
  duration: { type: Number },
  type: { type: String },
  playid: { type: Number },
  size: { type: Number }
})

const Playlist_1 = mongoose.model('Playlist_1', playlistSchema)
const Playlist_2 = mongoose.model('Playlist_2', playlistSchema)
const Playlist_3 = mongoose.model('Playlist_3', playlistSchema)
const Playlist_4 = mongoose.model('Playlist_4', playlistSchema)
const Playlist_5 = mongoose.model('Playlist_5', playlistSchema)
const Playlist_6 = mongoose.model('Playlist_6', playlistSchema)
const Playlist_7 = mongoose.model('Playlist_7', playlistSchema)
const Playlist_8 = mongoose.model('Playlist_8', playlistSchema)

module.exports = {
  Playlist_1,
  Playlist_2,
  Playlist_3,
  Playlist_4,
  Playlist_5,
  Playlist_6,
  Playlist_7,
  Playlist_8
}