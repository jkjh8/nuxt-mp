const express = require('express')

const {
  Playlist_1,
  Playlist_2,
  Playlist_3,
  Playlist_4,
  Playlist_5,
  Playlist_6,
  Playlist_7,
  Playlist_8  
} = require('../models/Playlist.js')
const router = express.Router();

const db_Playlist = [
  Playlist_1,
  Playlist_2,
  Playlist_3,
  Playlist_4,
  Playlist_5,
  Playlist_6,
  Playlist_7,
  Playlist_8
]
module.exports.getplaylist = async function(req, res) {
  const id = req.params.id
  console.log(id)
  if (id < 8) {
    let playlist = await db_Playlist[id].find({}).select({ _id: 0 })
    res.json(playlist)
  } else {
    res.status(422).json({ message: 'out of range' })
  }
}

module.exports.postplaylist = async function(req, res) {
  const id = req.body.id
  const list = req.body.list
  console.log(id)
  
  if (id > 8) { return res.status(422).json({ message: 'out of range' }) }
  try { 
    await db_Playlist[id].deleteMany()
    const rtlist = await db_Playlist[id].insertMany(list)
    return res.json(rtlist)
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}
