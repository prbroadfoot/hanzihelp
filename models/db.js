var pgp = require('pg-promise')();
var db_name = process.env.NODE_ENV == 'test' ? 'rsh_test' : 'rsh';
var db = pgp('postgres://localhost:5432/' + db_name);

module.exports = db;
