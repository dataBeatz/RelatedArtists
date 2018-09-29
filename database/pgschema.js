const pg = require('pg');
const pool = new pg.Pool({
  user: 'jerrywu',
  host: '127.0.0.1',
  database: 'relatedartists',
  password: null,
  port: '5432'
})

pool.query(`CREATE TABLE IF NOT EXISTS artists(id SERIAL PRIMARY KEY, artist_name VARCHAR(40) NOT NULL, listeners INT, artist_image VARCHAR(100) NOT NULL, popular_song VARCHAR(130) NOT NULL);`, (err, res) => {
  if (err) {
    console.log('ERROR w/ CREATE TABLE: ', err);
  } else {
    console.log('SUCCESS, TABLE CREATED: ', res);
    pool.end();
  }
});