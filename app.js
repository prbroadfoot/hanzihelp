const express = require('express');
const app = express();
const db = require('./models/db');

app.use(express.static('resources/public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/frame_list', async function(req, res) {
  var frameList;
  if (req.query.hsk_level) {
    frameList = await db.frames.findByHSKLevel(req.query.hsk_level);
    frameList.heading = `HSK Level ${req.query.hsk_level}`;
  } else {
    frameList = await db.frames.findByLesson({
      book: req.query.book,
      lesson: req.query.lesson
    });
    frameList.heading = `Book ${req.query.book}, Lesson ${req.query.lesson}`;
  }
  res.render('frame_list', { frameList: frameList });
});

app.get('/search', function(req, res) {
  res.redirect('/' + req.query.s);
});

// matches every route that starts with a Chinese character
app.get(/^\/(\%.+)/, async function(req, res) {
  let frameData = await db.frames.findByCharacter(req.params[0]);
  res.render('frame', frameData);
});

app.get(/\/(.+)/, async function(req, res) {
  let frameType = req.query.frame_type || 'character';
  let frameData = await db.frames.findByKeyword(req.params[0], frameType);
  res.render('frame', frameData);
});

app.listen(3001, function() {
  console.log('app listening on port 3001!');
});
