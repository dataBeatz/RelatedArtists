const pg = require('pg');
const pool = new pg.Pool({
  user: 'power_user',
  host: '54.183.194.223',
  database: 'relatedartists',
  password: '$poweruserpassword',
  port: '5432',
})

pool.query(`CREATE TABLE IF NOT EXISTS artists(id SERIAL PRIMARY KEY, artist_name VARCHAR(40) NOT NULL, listeners INT NOT NULL, artist_image VARCHAR(100) NOT NULL, popular_song VARCHAR(130) NOT NULL);`, (err, res) => {
  if (err) {
    console.log('ERROR w/ CREATE TABLE: ', err);
  } else {
    console.log('SUCCESS, TABLE CREATED: ', res);
  }
});

pool.query(`CREATE TABLE IF NOT EXISTS relations(primary_id int, related_id int);`, (err, res) => {
  if (err) {
    console.log('ERROR w/ CREATE TABLE: ', err);
  } else {
    console.log('SUCCESS, TABLE CREATED: ', res);
    pool.end();
  }
});