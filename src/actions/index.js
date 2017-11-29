import axios from 'axios';
import { TrackHandler } from 'spotify-sdk';
import APIServerCredentials from '../config/APIServerCredentials';

export const artistSearchSuccess = artistSearchData => ({
  type: 'ARTIST_SEARCH_SUCCESS',
  payload: artistSearchData,
});

export const searchBarUpdate = searchValue => ({
  type: 'SEARCH_BAR_UPDATE',
  payload: searchValue,
});

export const setSpotifyURI = URIData => ({
  type: 'SET_SPOTIFY_URI',
  payload: URIData,
});

export const setPlayerState = playerState => ({
  type: 'SET_PLAYER_STATE',
  payload: playerState,
});

export const resetSearchData = () => ({
  type: 'RESET_SEARCH_DATA',
  payload: null,
});

export const setToken = () => ({
  type: 'SET_TOKEN',
  payload: null,
});

export const clearToken = () => ({
  type: 'CLEAR_TOKEN',
  payload: null,
});

const getSpotifyURIs = setListData => {

    return new Promise((resolve, reject) => {

      const artistName = setListData.artistName;
      const totalSongs = Object.keys(setListData.spotifyURIs).length;
      let complete = 0;

      for(const spotifySong in setListData.spotifyURIs) {
  
          const track = new TrackHandler();
          
          track.search(`${artistName} ${spotifySong}`, { limit: 1 })
            .then((trackCollection) => {
      
              const theTrack = trackCollection[0];
              setListData.spotifyURIs[spotifySong] = theTrack ? theTrack._uri : false;
              complete++;
              
              if(complete === totalSongs) {
                resolve(setListData);
              }
  
            });
  
      }

    });

};

const extractSetLists = (setListData, artistName) => {

  const extractedSetLists = {};

  extractedSetLists.artistName = artistName;
  extractedSetLists.setLists = [];
  extractedSetLists.spotifyURIs = {};

  setListData.setlist.forEach((set) => {

    if ((set.artist['name'].toLowerCase().trim() === artistName.toLowerCase().trim()) && typeof set.sets === 'object') {

      const mainSet = [];
      const encoreSet = [];

      set.sets.set.forEach((subset) => {

        let isEncore = subset.encore === undefined ? false : true;

        subset.song.forEach((song) => {

          if(!isEncore) {
            
            mainSet.push(song.name);

          } else {

            encoreSet.push(song.name);

          }

          extractedSetLists.spotifyURIs[song.name] = null;

        });

      });

      if (mainSet.length > 1) {

        extractedSetLists.setLists.push({
          venue: {
            name: set.venue.name,
            city: set.venue.city.name,
          },
          date: set.eventDate,
          songLists: {
            main: mainSet,
            encore: encoreSet,
          },
        });

      }

    }

  });

  return extractedSetLists;

};

export const artistSearch = artistName => (

  (dispatch) => {

    axios({
      method: 'post',
      url: `${APIServerCredentials.serverBaseURL}/setlist.fm/searchSetlists`,
      data: {
        artistName,
      },
    }).then((response) => {

      const responseData = response.data;
      const artistSearchResponse = extractSetLists(responseData, responseData.setlist[0].artist['name']);
      const setListData = getSpotifyURIs(artistSearchResponse)
                            .then(setListPlusSpotifyURIs => dispatch(artistSearchSuccess(setListPlusSpotifyURIs)));

    }).catch((error) => {

      console.log(error);

    });

  }

);

export const getSpotifyURI = songData => (

  (dispatch) => {

    const track = new TrackHandler();

    track.search(`${songData.artistName} ${songData.songName}`, { limit: 1 })
      .then((trackCollection) => {

        const theTrack = trackCollection[0];

        dispatch(setSpotifyURI({

          spotifyURI: theTrack ? theTrack._uri : false,
          songName: songData.songName,

        }));

      });

  }

);
