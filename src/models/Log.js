const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/potifolio')

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  level: String,
  message: String,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;