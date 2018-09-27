const faker = require('faker');
var request = require('request');
const fs = require('fs');

let target = 10;
let fileNum = 0;
let fileLocation = './jsondata/fakedata' + {fileNum} + '.json';
let jsonToWrite = '';

let generateArtist = function(n) {
    for (let k = 0; k < n; k++) {
    const artistToPush = {
      artist_name: faker.name.findName (),
      listeners: faker.random.number (),
      artist_image: `https://s3.amazonaws.com/spotifyphotos/${k % 39 + 1}.jpg`,
      popularSong: faker.lorem.word (),
    };
    jsonToWrite += JSON.stringify(artistToPush);
  }
}

while (target > 0) {
  target -= 5;
  fileNum += 1;
  generateArtist(5);
  fs.writeFile(fileLocation, jsonToWrite, err => {
    if (err) {
      return console.log(err);
    }
    console.log('File written to: ', fileNum);
  })
}