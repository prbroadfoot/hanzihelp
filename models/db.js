var pgp = require('pg-promise')();
var db = pgp('postgres://localhost:5432/rsh');

module.exports = db;
