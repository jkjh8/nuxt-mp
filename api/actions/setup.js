const db_Setup = require('../models/Setup.js')
const dgram = require('dgram');
const sock = dgram.createSocket('udp4')

module.exports.getSetup = async function(req, res) {
  const setup = await db_Setup.findOne({ _id: '1' })
  return res.json(setup)
}

module.exports.postSetup = async function(req, res) {
  const setup = await db_Setup.findByIdAndUpdate("1", req.body)
  const message = new Buffer.from('fullscreen')
  sock.send(message, 0, message.length, 12302, '127.0.0.1')
  return res.status(200).json(setup)
}
 
module.exports.playid = async function(req, res) {
  const id = req.params.id
  const list = req.params.list
  const message = new Buffer.from(`pi,${list},${id}`)
  sock.send(message, 0, message.length, 12302, '127.0.0.1')
  return res.status(200).json({ success: true })
}

module.exports.playli = async function(req, res) {
  const id = req.params.id
  const message = new Buffer.from(`pl,${id}`)
  sock.send(message, 0, message.length, 12302, '127.0.0.1')
  return res.status(200).json({ success: true })
}

module.exports.stop = async function(req, res) {
  const message = new Buffer.from('stop')
  sock.send(message, 0, message.length, 12302, '127.0.0.1')
  return res.status(200).json({ success: true })
}