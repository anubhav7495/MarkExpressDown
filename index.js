var express = require('express'),
  bodyParser = require('body-parser'),
  sharejs = require('share'),
  fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('pad');
});

app.post('/new', function(req, res) {
  var file = req.body.file;
  res.redirect('/'+ file);
});

app.get('/(:id)', function(req, res) {
  filename = req.params.id;
  res.render('pad');
});

app.post('/(:id)/download', function(req, res) {
  fs.writeFileSync(__dirname + "/" + req.params.id, req.body.Contents);
  path = __dirname + "/" + req.params.id;
  res.download(path);
});

require('redis');

var options = {
  db : { type: 'redis' },
};

sharejs.server.attach(app, options);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('App running on port ' + port);
});
