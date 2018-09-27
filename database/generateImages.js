const faker = require('faker');
var request = require('request');
const fs = require('fs');

let imageGetter = function(imageNumber) {
  const keywords = ['person', 'singer', 'artist', 'human', 'rapper', 'man', 'woman', 'rob'];
  const randIndex = Math.floor(Math.random() * keywords.length);
  request
    .get(`https://loremflickr.com/240/240/${keywords[randIndex]}?random=${imageNumber}`)
    .on('error', function(err) {
     console.log(err);
    })
    .pipe(fs.createWriteStream(`./images/${imageNumber}.jpg`));
};

let x = 0;
for (let i = x; i < x+100; i+=1) {
   imageGetter(i);
}