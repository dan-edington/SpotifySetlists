# Spotify Setlists
Create Spotify playlists using setlist.fm data

http://www.danedington.com/spotifySetlists

### Instructions

Start APIServer:
```sh
node APIServer.js
```

Start development build:
```sh
npm start
```

Start production build:
```sh
npm run build
```

### TODO

- Add error message for occasions when Spotify login problems occur
- Eliminate duplicate requests to spotify api
- Don't display results until all data loaded
- Implement proper error handling
- Styling and UI improvements
- Add option of adding non-artist songs (covers etc. - ie. Run The Jewels open with Queen - We Are The Champions)
