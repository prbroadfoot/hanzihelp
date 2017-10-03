const FramesRepository = require('./frames');

var initOptions = {
  extend: (obj, dc) => {
    obj.frames = new FramesRepository(obj, pgp);
  }
};

var pgp = require('pg-promise')(initOptions);
var db_name = process.env.NODE_ENV == 'test' ? 'rsh_test' : 'rsh';
var db = pgp('postgres://localhost:5432/' + db_name);

module.exports = db;
