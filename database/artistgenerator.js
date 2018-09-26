const faker = require ('faker');
let mysql = require ('mysql');

let startTime = Date.now();

let connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  database: 'artists',
});

// connection.query('TRUNCATE TABLE artist');

let startGoal = 100
let n = startGoal / 5;

let generateArtist = function(n) {
  for (let k = 0; k < n; k++) {
    const artistToPush = {
      artist_name: faker.name.findName (),
      listeners: faker.random.number (),
      artist_image: `https://s3.amazonaws.com/spotifyphotos/${k % 39 + 1}.jpg`,
      popularSong: faker.lorem.word (),
    };
    connection.query (
      `INSERT INTO artist (artist_name, listeners, artist_image, popularSong) VALUES("${artistToPush.artist_name}", "${artistToPush.listeners}", "${artistToPush.artist_image}", "${artistToPush.popularSong}")`,
      function (error, result, fields) {
        if (error) {
          console.log (error);
        }
      }
    );
  }
}

let goal = startGoal;
while (goal > 0){
  generateArtist(n)
  goal-=n
}

connection.end();
let endTime = (Date.now() - startTime) / 1000
console.log('Generated ' + startGoal + ' results in ' + endTime + ' seconds.');
