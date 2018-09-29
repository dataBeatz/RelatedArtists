const pg = require('pg');
const path = require('path');
const pool = new pg.Pool({
  user: 'jerrywu',
  host: '127.0.0.1',
  database: 'relatedartists',
  password: null,
  port: '5432'
})

let page = 1;
const fileToCopy = path.join(__dirname, `./csvdata/fakedata${page}.csv`);

// pool.query(`INSERT INTO artists (artist_name, listeners, artist_image, popular_song) VALUES ('Michael Jackson', 123456789, 'http://www.image.com/images/michaeljackson.webp', 'Billie Jean');`, (err, res) => {
//   if (err) {
//     console.log('ERROR W/ INSERT: ', err.detail);
//   } else {
//     console.log('SUCCESS W/ INSERT: ', res.command + ' ' + res.rowCount);
//     pool.end();
//   }
// });

// (id,artist_name,listeners,artist_image,popular_song)

console.log(fileToCopy);
pool.query("COPY artists(artist_name,listeners,artist_image,popular_song) FROM '/Users/jerrywu/Desktop/SDC/RelatedArtists/database/csvdata/fakedata" + page + ".csv' DELIMITER ',' CSV HEADER;", (err, res) => {
  if (err) {
    console.log('Error copying...', err);
  } else {
    console.log('Successful copy! Check database. ', res.command + ' ' + res.rowCount);
    pool.end();
  }
})