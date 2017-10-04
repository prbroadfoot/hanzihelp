const express = require('express');
const app = express();

app.use(express.static('resources/public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.listen(3001, function() {
  console.log('app listening on port 3001!');
});
