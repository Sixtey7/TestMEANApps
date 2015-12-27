var config = require('./config'),
mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.dbUri);

  require('../app/models/user.server.model');
  require('../app/models/article.server.model');

  return db;
}
