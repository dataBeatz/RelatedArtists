const faker = require('faker');
var request = require('request');
const fs = require('fs');

let startTime = Date.now();
let csvBlock = 'id,artist_name,listeners,artist_image,popular_song\n';
let index = 0;

const generateArtist = (n, index) => {
  for (let i = index; i < index + n; i++) {
    let nextImage = i < 1000 ? i : (i % 1000 + 1);
    let artist_name = faker.name.findName();
    let listeners = faker.random.number();
    let artist_image = `https://s3-us-west-1.amazonaws.com/hrsf101databeatzrelatedartists/${nextImage}.webp`;
    let popularSong = faker.lorem.word ();
    let addToCSV = `${artist_name},${listeners},${artist_image},${popularSong}\n`
    csvBlock += addToCSV;
  }
}

const generateSegment = (stream, csv, index) => new Promise((resolve, reject) => {
  stream.write(csvBlock, 'utf-8', () => {
    console.log('Writing files: ' + index + ' - ' + (index + 999999));
    stream.end(resolve);
  })
})

const generateLoop = async () => {
  for (let i = 0; i < 10; i += 1) {
    csvBlock = 'id,artist_name,listeners,artist_image,popular_song\n';
    generateArtist(1000000, index);
    let stream = fs.createWriteStream(`./csvdata/fakedata${i+1}.csv`);
    await generateSegment(stream, csvBlock, index);
    index += 1000000;
    csvBlock = '';
  }
  console.log((Date.now() - startTime) / 1000 + ' seconds.');
}

generateLoop();