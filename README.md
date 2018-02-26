# Spotify Setlists
Create Spotify playlists using setlist.fm data

https://spotify-setlists.danedington.com

### Instructions

Start APIServer in src/server :
```sh
node index.js
```

Start development build:
```sh
npm start
```

Start production build:
```sh
npm run build
```

After creating a production build, go into build/index.html and change the path of the main.js bundle to be /static/js (CRA build issue)
