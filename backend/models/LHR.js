const mongoose = require('mongoose')

const lhrSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },
  CPU: {
    type: String,
    required: true
  },
  Memory: {
    type: String,
    required: true
  },
  'Operating System': {
    type: String,
    required: true
  },
  'IPv4 Address': {
    type: String,
    required: true
  },
  'CAStools Status': {
    type: String,
    required: true
  },
  'CAStools Version': {
    type: String
  },
  'Disk Capacity': {
    type: String
  },
  'Used Capacity': {
    type: String
  },
  'Available Capacity': {
    type: String
  },
  Username: {
    type: String,
    required: true
  }
})

const LHR = mongoose.model('lhr', lhrSchema, 'lhr')

module.exports = LHR
