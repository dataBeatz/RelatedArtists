let mysql = require('mysql');
let connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  database: 'artists',
});

const getRelatedArtists = function(id, showArtist) {
  let sqlQuery =
    `SELECT artist_name, artistid, listeners, artist_image, popularSong FROM artist WHERE artistid IN (SELECT related_artist_id FROM relatedartists WHERE main_artist_id = (SELECT artistid FROM artist WHERE artistid =` +
    connection.escape(id) + `));`;
  connection.query(sqlQuery, function(error, result) {
    if (error) {
      console.log('db query error');
      showArtist(error, null);
    } else {
      console.log('db query success');
      showArtist(null, result);
    }
  });
};

const deleteArtist = function(id) {
  let sqlQuery = `DELETE FROM artist WHERE artistid = ${id};`
  connection.query(sqlQuery, function(error) {
    if (error) {
      console.log('Error while attempting to delete artist.');
    } else {
      console.log('Successfully deleted artist #: ', id);
    }
  })
}

const 

module.exports.deleteArtist = deleteArtist;
module.exports.getRelatedArtists = getRelatedArtists;
