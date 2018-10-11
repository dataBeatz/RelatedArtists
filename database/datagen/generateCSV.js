const faker = require('faker');
var request = require('request');
const fs = require('fs');

let startTime = Date.now();
let csvBlock;
let index = 1;

const generateArtist = (index, n) => {
  csvBlock = 'id,artist_name,listeners,artist_image,popular_song\n';
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

const generateRelations = (index, n) => {
  csvBlock = 'primary_id,related_id\n';
  for (let i = index; i < index + n; i++) {
    let addToCSV = '';
    for (let j = 0; j < 10; j++) {
      let randomArtist = Math.ceil(Math.random() * 10000000);
      addToCSV += `${i},${randomArtist}\n`;
    }
    csvBlock += addToCSV;
  }
}

const generateSegment = (stream, csv, index, table) => new Promise((resolve, reject) => {
  stream.write(csvBlock, 'utf-8', () => {
    console.log(`Writing ${table} files: ` + index + ' - ' + (index + 999999));
    stream.end(resolve);
  })
})

const generateLoop = async (generator, table, n) => {
  for (let i = 0; i < n; i += 1) {
    generator(index, 1000000);
    let stream = fs.createWriteStream(`./csvdata/fake${table}${i+1}.csv`);
    await generateSegment(stream, csvBlock, index, table);
    index += 1000000;
    csvBlock = '';
  }
  index = 1;
  console.log((Date.now() - startTime) / 1000 + ' seconds.');
}

const runBothLoops = async () => {
  await generateLoop(generateArtist, 'artists', 10);
  await generateLoop(generateRelations, 'relations', 10);
}

runBothLoops();