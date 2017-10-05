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
  var frameData;
  const searchQuery = req.query.s;
  if (searchQuery.charCodeAt(0) > 255) {
    frameData = await db.frames.findByCharacter(searchQuery);
  } else {
    frameData = await db.frames.findByKeyword(searchQuery);
  }
  res.render('frame', frameData);
});

app.listen(3001, function() {
  console.log('app listening on port 3001!');
});
