const Log = require('../models/Log.js');

const error = (message) => {
  const log = new Log({
    level: 'error',
    message: message,
  });
  log.save();
};

const info = (message) => {
  const log = new Log({
    level: 'info',
    message: message,
  });
  log.save();
};

module.exports = { error, info };