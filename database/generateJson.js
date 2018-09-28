const faker = require('faker');
var request = require('request');
const fs = require('fs');

let startTime = Date.now();
// let fileLocation = `./jsondata/fakedata.json`;
let jsonToWrite = '[';
let index = 0;

const generateArtist = (n, index) => {
  for (let i = index; i < index + n; i++) {
    let nextImage = i < 1000 ? i : (i % 1000 + 1);
    const artistToPush = {
      artist_id: i,
      artist_name: faker.name.findName (),
      listeners: faker.random.number (),
      artist_image: `https://s3-us-west-1.amazonaws.com/hrsf101databeatzrelatedartists/${nextImage}.webp`,
      popularSong: faker.lorem.word (),
    }
    jsonToWrite += JSON.stringify(artistToPush) + ',\n';
  }
  jsonToWrite += ']';
}


const generateSegment = (stream, json, index) => new Promise ((resolve, reject) => {
  stream.write(jsonToWrite, 'utf-8', () => {
    console.log('Writing files: ' + index + ' - ' + (index + 999999));
    stream.end(resolve);
  })
})

const generateLoop = async () => {
  for (let i = 0; i < 10; i += 1) {
    generateArtist(1000000, index);
    let stream = fs.createWriteStream(`./jsondata/fakedata${i+1}.json`);
    await generateSegment(stream, jsonToWrite, index);
    index += 1000000;
    jsonToWrite = '';
  }
  console.log((Date.now() - startTime) / 1000 + ' seconds.');
}

generateLoop();