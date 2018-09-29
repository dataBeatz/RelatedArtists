const fs = require('fs');
const path = require('path');

let page = 1;
const pathToRead = path.join(__dirname, `./jsondata/fakedata${page}.json`);

const stream = fs.createReadStream(pathToRead);

const readSegment = () => {
  return new Promise((resolve, reject) => {
    stream.read(pathToRead, 'utf-8', (data) => {
      console.log('Reading files from: ' + pathToRead);
      stream.end(resolve);
    })
  })
}

const readSegmentLoop = async () => {
  for (let i = 1; i <= 10; i++){
    page = i;
    await readSegment();
  }
  console.log('Done looping');
}

readSegmentLoop();