const pg = require('pg');
const path = require('path');
const pool = new pg.Pool({
  user: 'power_user',
  host: '54.183.194.223',
  database: 'relatedartists',
  password: '$poweruserpassword',
  port: '5432',
})

const getRelatedArtists = (id, callback) => {
  let psqlQuery =
    `SELECT relations.primary_id, artists.id, artists.artist_name, artists.listeners, artists.artist_image, artists.popular_song FROM artists INNER JOIN relations ON artists.id = relations.related_id WHERE primary_id = ${id};`;
  pool.query(psqlQuery)
    .then(result => callback(result))
    .catch(error => callback(error));
};

const deleteArtist = (id, callback) => {
  let psqlQuery = `DELETE FROM artists WHERE id = ${id};`
  pool.query(psqlQuery, (error, result) => {
    if (error) {
      callback(error, result);
    } else {
      callback(null, result);
    }
  })
}

const updateArtist = (id) => {
  let sqlQuery = `UPDATE FROM artists WHERE id = ${id}`;
  //Connect to database and use query to find artist and update
  //Query incomplete
}

const addArtist = (artistInfo, callback) => {
  const {name, listeners, image, song} = artistInfo;
  const insertIntoArtists = `INSERT INTO artists (artist_name, listeners, artist_image, popular_song) VALUES ('${name}', ${listeners}, '${image}', '${song}');`;
  const retrieveCount = `SELECT count(*) FROM artists;`;
  pool.query(insertIntoArtists)
    .then(artistResult => {
      pool.query(retrieveCount)
        .then(countResult => {
          let count = countResults.rows[0].count;
          const artistRelations = [];
          for (let i = 0; i < 10; i++) {
            artistRelations.push(Math.ceil(Math.random() * count));
          }
          const insertIntoRelations = `INSERT INTO relations (primary_id, related_id) VALUES 
            (${count}, ${artistRelations[0]}),
            (${count}, ${artistRelations[1]}),
            (${count}, ${artistRelations[2]}),
            (${count}, ${artistRelations[3]}),
            (${count}, ${artistRelations[4]}),
            (${count}, ${artistRelations[5]}),
            (${count}, ${artistRelations[6]}),
            (${count}, ${artistRelations[7]}),
            (${count}, ${artistRelations[8]}),
            (${count}, ${artistRelations[9]});`
          pool.query(insertIntoRelations)
            .then(artistResult => callback(artistResult))
            .catch(error => callback(error));
        })
        .catch(error => callback(error));
    })
    .catch(error => callback(error));
}

module.exports.addArtist = addArtist;
module.exports.getRelatedArtists = getRelatedArtists;
module.exports.updateArtist = updateArtist;
module.exports.deleteArtist = deleteArtist;