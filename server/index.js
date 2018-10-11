require('newrelic');
const express = require('express');
const app = express()
const db = require('../database/index.js');
// const { getData, getCache } = require('./cacheredis.js');

const cluster = require('cluster');
const os = require('os');
const redis = require('redis');
const client = redis.createClient();

if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) {
    cluster.fork()
  }
} else {
  const path = require('path');
  var cors = require('cors');

  app.use(cors());
  app.use('/', express.static(path.join(__dirname + '/../public')));

  app.get('/artist/:id/relatedArtists', (req, res) => {
    client.get(req.params.id, (err, result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        db.getRelatedArtists(req.params.id, data => {
          client.setex(req.params.id, 3000, JSON.stringify(data));
          res.status(200).send(data.rows);
        })
      }
    });
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

module.exports = { app }