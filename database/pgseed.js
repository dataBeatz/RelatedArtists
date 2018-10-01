const pg = require('pg');
const path = require('path');
const pool = new pg.Pool({
  user: 'jerrywu',
  host: '127.0.0.1',
  database: 'relatedartists',
  password: null,
  port: '5432'
})

let startTime = Date.now();
let page = 0;

const seedArtistsCSV = () => new Promise((resolve, reject) => {
  const fileToCopy = path.join(__dirname, `csvdata/fakeartists${page}.csv`);
  pool.query(`COPY artists(artist_name,listeners,artist_image,popular_song) FROM '${fileToCopy}' DELIMITER ',' CSV HEADER;`, (err, res) => {
    if (err) {
      console.log('Error copying...', err);
    } else {
      let endTime = (Date.now() - startTime) / 1000;
      console.log('Seeding time: ' + endTime + '\nSuccessful copy of artists! Check database. ', res.command + ' ' + res.rowCount);
      resolve();
    }
  })
});

const seedRelatedCSV = () => new Promise((resolve, reject) => {
  const fileToCopy = path.join(__dirname, `csvdata/fakerelations${page}.csv`);
  pool.query(`COPY relations(primary_id, related_id) FROM '${fileToCopy}' DELIMITER ',' CSV HEADER;`, (err, res) => {
    if (err) {
      console.log('Error copying relations: ', err);
    } else {
      let endTime = (Date.now() - startTime) / 1000;
      console.log('Seeding time: ' + endTime + '\nSuccessful copy of relations! Check database. ', res.command + ' ' + res.rowCount);
      resolve();
    }
  })
});

const loopThroughCSV = async (csvToSeed, n) => {
  page = 0;
  for (let i = 0; i < n; i++) {
    page++;
    await csvToSeed();
  }
  let endTime = (Date.now() - startTime) / 1000
  console.log('All data inserted in: ' + endTime + ' seconds.');
}

const runBothSeeds = async () => {
  await loopThroughCSV(seedArtistsCSV, 10);
  await loopThroughCSV(seedRelatedCSV, 10);
  pool.query(`ALTER TABLE relations ADD CONSTRAINT fk_artist FOREIGN KEY (id) REFERENCES artists(id);`)
  pool.end();
}

runBothSeeds();