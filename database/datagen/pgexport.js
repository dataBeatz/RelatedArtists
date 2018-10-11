const pg = require('pg');
const path = require('path');
const pool = new pg.Pool({
  user: 'power_user',
  host: '54.183.194.223',
  database: 'relatedartists',
  password: '$poweruserpassword',
  port: '5432',
})

let startTime = Date.now();
let page = 0;
let startIndex = 1;
let stopIndex = 1000000;

const exportCSV = (start, stop) => new Promise((resolve, reject) => {
  const fileToCopy = path.join(__dirname, `pgexports/export${page}.csv`);
  pool.query(`COPY (SELECT relations.primary_id, artists.id, artists.artist_name, artists.listeners, artists.artist_image, artists.popular_song FROM artists INNER JOIN relations ON artists.id = relations.related_id WHERE primary_id BETWEEN ${startIndex} AND ${stopIndex} ORDER BY primary_id) TO '${fileToCopy}' DELIMITER ',' CSV HEADER;`, (err, res) => {
    if (err) {
      console.log('Error exporting...', err);
    } else {
      let endTime = (Date.now() - startTime) / 1000;
      console.log('Exporting time: ' + endTime + '\nSuccessful export of CSV files! Check pgexports. ', res.command + ' ' + res.rowCount);
      resolve();
    }
  })
});

const loopExport = async (n) => {
  for (let i = 0; i < n; i++) {
    page++;
    await exportCSV();
    startIndex += 1000000;
    stopIndex += 1000000;
  }
  let endTime = (Date.now() - startTime) / 1000
  console.log('All data inserted in: ' + endTime + ' seconds.');
}

const runExportLoop = async () => {
  await loopExport(10);
  pool.end();
}

runExportLoop();