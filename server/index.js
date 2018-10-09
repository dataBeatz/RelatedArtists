require('newrelic');
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) {
    cluster.fork()
  }
} else {
  const app = express()
  var db = require('../database/index.js');
  const path = require('path');
  var cors = require('cors');

  app.use(cors());
  app.use('/', express.static(path.join(__dirname + '/../public')));

  app.get('/artist/:id/relatedArtists', (req, res) => {
    db.getRelatedArtists (req.params.id, data => {
      res.status(200).send(data.rows);
    })
  });

  app.post('/artist/', (req, res) => {
    const fakeArtist = {
      name: 'Fakus Arteez',
      listeners: 129374382, 
      image: 'https://s3-us-west-1.amazonaws.com/hrsf101databeatzrelatedartists/1.webp',
      song: 'Sumsin Abatus',
    };
    db.addArtist(fakeArtist, (error, data) => {
      if (error) {
        res.status(503).send(error);
      } else {
        res.status(201).send(data);
      }
    });
  });

  app.put('/artist/:id/relatedArtists', (req, res) => {
    res.status(200).send();
  });

  app.delete('/artist/:id/relatedArtists', (req, res) => {
    db.deleteArtist(req.params.id, (error, data) => {
      if (error) {
        res.status(503).send(error);
      } else {
        res.status(200).send(data);
      }
    });
  });

  app.options('', (req, res) => {
    res.status(200).send();
  });

  app.listen(3002);

  cluster.on('exit', (worker) => {
    console.log('mayday! mayday! worker', worker.id, ' is no more!')
    cluster.fork()
  })
}