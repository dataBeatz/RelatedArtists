# Spotify: Related Artists

> Displays a list of musical artists related to the current artist displayed (represented by the ID in the endpoint).

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Server API instructions:

   GET('/artist/:id/relatedArtists')
   //Returns the artist whose unique ID is an exact match for the ID provided in the URL.
   
   POST('/artist')
   //Creates a new artist in the database and provides them with a unique ID which is sent back to the user.
   
   PUT('/artist/:id')
   //Takes a request body and accepts values within the parameter to replace existing values.  The relevant values are:
   
   (artist_name, artist_image, popularSong)
   
   Schema also contains artistID and listeners (artistID is auto_incremented within SQL and listeners will be randomly generated for the purpose this module serves).
   
   DELETE('/artist/:id')
   //Deletes the artist corresponding to the ID provided from the database. Delete cascades into the related artists table in order to remove any references from the original artist.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

