let mysql = require('mysql');
let connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  database: 'artists',
});

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

module.exports.addArtist = addArtist;
module.exports.getRelatedArtists = getRelatedArtists;
module.exports.updateArtist = updateArtist;
module.exports.deleteArtist = deleteArtist;