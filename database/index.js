const pg = require('pg');
const path = require('path');
const pool = new pg.Pool({
  user: 'jerrywu',
  host: '127.0.0.1',
  database: 'relatedartists',
  password: null,
  port: '5432'
})

const getRelatedArtists = (id, showArtist) => {
  let sqlQuery =
    `SELECT artist_name, artistid, listeners, artist_image, popularSong FROM artist WHERE artistid IN (SELECT related_artist_id FROM relatedartists WHERE main_artist_id = (SELECT artistid FROM artist WHERE artistid =` +
    connection.escape(id) + `));`;
  connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log('db query error');
      showArtist(error, null);
    } else {
      console.log('db query success');
      showArtist(null, result);
    }
  });
};

//Gets all related artists pertinent to the provided artist id
// select * from artists where id IN (select related_id from relations where primary_id = (select id from artists where id = 10));

const pgGet = (id, callback) => {
  let pgQuery = `SELECT * FROM artists WHERE id = ${id}`;
  pool.query(pgQuery, (err, result) => {
    if (err) {
      console.log('Error handling GET request in PostgreSQL: ', err);
    } else {
      callback(result);
    }
  });
}

const deleteArtist = (id) => {
  let sqlQuery = `DELETE FROM artist WHERE artistid = ${id};`
  connection.query(sqlQuery, (error) => {
    if (error) {
      console.log('Error while attempting to delete artist.');
    } else {
      console.log('Successfully deleted artist #: ', id);
    }
  })
}

const updateArtist = (id) => {
  let sqlQuery = `UPDATE FROM artist WHERE artistid = ${id}`;
  //Connect to database and use query to find artist and update
  //Query incomplete
}

const addArtist = (artistInfo) => {
  //Store artist info in object
  //Set up query, using properties from object in line 40
  //Connect to database and run query to add another row to table
}


module.exports.pgGet = pgGet;
module.exports.addArtist = addArtist;
module.exports.getRelatedArtists = getRelatedArtists;
module.exports.updateArtist = updateArtist;
module.exports.deleteArtist = deleteArtist;