# Spotify Setlists
Create Spotify playlists using setlist.fm data

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

- Add spotify URIs to a single state object that can be referenced to cut down massively on requests to spotify
- Don't display results until all data loaded
- Error handling
- Collapsable results
- Improve player preview
- Styling
- Add option of adding non-artist songs (covers etc. - ie. Run The Jewels open with Queen - We Are The Champions)
