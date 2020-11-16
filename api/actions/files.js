const express = require('express');
const homedir = require('os').homedir();
const path = require('path')
const fs = require('fs')
const mediainfo = require('node-mediainfo');
const db_filelist = require('../models/Filelist.js')

const router = express.Router();

const mediaFolder = path.join(homedir, '/media')

module.exports.getfilelist = async function(req, res) {
  const filelist = await db_filelist.find({}).select({ _id: 0 })
  res.json(filelist)
}

module.exports.upload = async function(req, res) {
  let uploadFile = Object.values(req.files)[0]
  await uploadFile.mv(`${mediaFolder}/${uploadFile.name}`,
  function (err) {
    if (err) {
      return res.status(500).json({ message: 'upload err' })
    }
  })
  return res.status(200).json({ success: true })
}

module.exports.refresh = async function(req, res) {
  await db_filelist.deleteMany()
  let filesInfo = new Array()
  const files = fs.readdirSync(mediaFolder)
  for (const mediafile of files) {
    const file = await mediainfo(path.join(mediaFolder, mediafile))
    filesInfo.push({
      complete_name: path.join(mediaFolder, mediafile),
      name: mediafile,
      duration: file.media.track[0].Duration,
      type: mediafile.split(/\./).pop(),
      size: file.media.track[0].FileSize
    })
  }
  const rtmsg = await db_filelist.insertMany(filesInfo)
  if (rtmsg.length > 0) {
    return res.status(200).json(rtmsg)
  }
  return res.status(500).json({ message: 'Error file load' })
}

module.exports.del = async function(req, res) {
  const files = req.body
  files.forEach((file) => {
    try{
      fs.unlinkSync(file.complete_name)
      db_filelist.deleteOne({ complete_name: file.complete_name }).then(async function() {
        const rtlist = await db_filelist.find({}).select({ _id: 0 })
        return res.status(200).json(rtlist)
      })
    } catch (err) {
      return res.status(500)
    }
  })
}

module.exports.preview = function(req, res) {
  const filepath = path.resolve(mediaFolder, req.params.filename)
  const fileSize = fs.statSync(filepath).size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10): fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(filepath, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(filepath).pipe(res)
  }
}