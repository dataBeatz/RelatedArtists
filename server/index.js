var express = require ('express');
var app = express ();
var db = require ('../database/index.js');
const path = require ('path');
var cors = require ('cors');

app.use(cors ());
app.use(express.static (path.join (__dirname + '/../public')));

app.get('/artist/:id/relatedArtists', (req, res) => {
  console.log('Received GET with: ', req.params);
  db.getRelatedArtists (req.params.id, (error, data) => {
    if (error) {
      res.status (503).send (error);
    } else {
      res.send (data);
    }
  });
});

app.post('/artist/:id/relatedArtists', (req, res) => {
  console.log('Receiving post request.');
});

app.put('/artist/:id/relatedArtists', (req, res) => {
  console.log('Receiving put request.');
});

app.delete('/artist/:id/relatedArtists', (req, res) => {
  console.log('Receiving delete request.');
});

app.options('', (req, res) => {
  console.log('Here are your options: get, post, put, delete.')
});

app.listen(3002, () => {
  console.log ('listening on port 3002!');
});
