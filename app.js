const express = require('express');
const app = express();
const db = require('./models/db');

app.use(express.static('resources/public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/search', async function(req, res) {
  let frameData = await db.frames.findByKeyword(req.query.s);
  res.render('frame', frameData);
});

app.listen(3001, function() {
  console.log('app listening on port 3001!');
});
