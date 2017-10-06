const express = require('express');
const app = express();
const db = require('./models/db');

app.use(express.static('resources/public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/frame_list', function(req, res) {
  req.query.hsk_level
    ? renderFrameListForHSKLevel(req, res)
    : renderFrameListForLesson(req, res);
});

app.get('/search', function(req, res) {
  res.redirect('/' + req.query.s);
});

// matches every route that starts with a Chinese character
app.get(/^\/(\%.+)/, async function(req, res) {
  try {
    let frameData = await db.frames.findByCharacter(req.params[0]);
    res.render('frame', frameData);
  } catch (e) {
    res.render('frame_not_found', { character: req.params[0] });
  }
});

app.get(/\/(.+)/, async function(req, res) {
  let frameType = req.query.frame_type || 'character';
  try {
    let frameData = await db.frames.findByKeyword(req.params[0], frameType);
    res.render('frame', frameData);
  } catch (e) {
    res.render('frame_not_found', { keyword: req.params[0] });
  }
});

async function renderFrameListForHSKLevel(req, res) {
  const hsk_level = req.query.hsk_level;
  try {
    let frameList = await db.frames.findByHSKLevel(hsk_level);
    frameList.heading = `HSK Level ${hsk_level}`;
    res.render('frame_list', { frameList: frameList });
  } catch (e) {
    res.render('frame_list_not_found', { hsk_level: hsk_level });
  }
}

async function renderFrameListForLesson(req, res) {
  const lesson = req.query.lesson;
  const book = req.query.book;
  try {
    frameList = await db.frames.findByLesson({
      book: book,
      lesson: lesson
    });
    frameList.heading = `Book ${book}, Lesson ${lesson}`;
    res.render('frame_list', { frameList: frameList });
  } catch (e) {
    res.render('frame_list_not_found');
  }
}

app.listen(3001, function() {
  console.log('app listening on port 3001!');
});
