import axios from 'axios';
import hello from 'hellojs';

const extractSetLists = (setListData, artistName) => {

  let extractedSetLists = {};

  extractedSetLists.artistName = artistName;
  extractedSetLists.setLists = [];

  setListData.setlists.setlist.forEach((set, i) => {

    if( (set.artist['@name'].toLowerCase().trim() === artistName.toLowerCase().trim()) && typeof set.sets === 'object') {

      let mainSet = [];
      let encoreSet = [];

      // Test if data returned is in "encore format"
      if(set.sets.set.length) {

        // Has encore

        if(set.sets.set[0].song.length && set.sets.set[1].song.length){

          set.sets.set[0].song.forEach((song, j) => {
            if(song['@name'] !== "") {
              mainSet.push({
                songName: song['@name'],
                spotifyURI: false
              });
            }
          });

          set.sets.set[1].song.forEach((song, j) => {
            if(song['@name'] !== "") {
              encoreSet.push({
                songName: song['@name'],
                spotifyURI: false
              });
            }
          });

        }

      } else {

        // Has No Encore
        if(set.sets.set.song.length){

          set.sets.set.song.forEach((song, j) => {
            if(song['@name'] !== "") {
              mainSet.push({
                songName: song['@name'],
                spotifyURI: false
              });
            }
          });

        }

      }

      if(mainSet.length >= 2) {

        extractedSetLists.setLists.push({
          venue: {
            name: set.venue['@name'],
            city: set.venue.city['@name']
          },
          date: set['@eventDate'],
          songLists: {
            main: mainSet,
            encore: encoreSet
          }
        });

      }

    }

  });

  return extractedSetLists;

}

export const artistSearch = (artistName) => {

  return (dispatch) => {

    axios({
      method: 'post',
      url: '//localhost:3001/searchSetlists',
      data: {
        artistName
      }
    })
    .then((response)=>{

      const responseData = response.data;
      let artistSearchResponse = extractSetLists(responseData, responseData.setlists.setlist[0].artist['@name']);
      dispatch(artistSearchSuccess(artistSearchResponse));

    })
    .catch((error)=>{
      console.log(error);
    });

  }

}

export const getSpotifyURI = (songData) => {

  return (dispatch) => {

    hello('spotify').api({
      path: '/v1/search',
      method: 'get',
      data: {
        q: `artist:${songData.artistName} track:${songData.songName}`,
        type: 'track',
        limit: 1
      }
    }).then((response)=>{

      dispatch(setSpotifyURI({
        spotifyURI: response.tracks.items.length ? response.tracks.items[0].uri : false,
        isEncore: songData.isEncore,
        setListID: songData.setListID,
        songID: songData.songID
      }));

    });

  }

}

export const artistSearchSuccess = (artistSearchData) => {
  return {
    type: "ARTIST_SEARCH_SUCCESS",
    payload: artistSearchData
  }
}

export const searchBarUpdate = (searchValue) => {
  return {
    type: "SEARCH_BAR_UPDATE",
    payload: searchValue
  }
}

export const setLoginStatus = (loginStatus) => {
  return {
    type: "SET_LOGIN_STATUS",
    payload: loginStatus
  }
}

export const setSpotifyURI = (URIData) => {
  return {
    type: "SET_SPOTIFY_URI",
    payload: URIData
  }
}

export const setPlayerState = (playerState) => {
  return {
    type: "SET_PLAYER_STATE",
    payload: playerState
  }
}

export const setUserID = (userID) => {
  return {
    type: "SET_USER_ID",
    payload: userID
  }
}
