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