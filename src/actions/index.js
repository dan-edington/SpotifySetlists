import axios from 'axios';
import { TrackHandler } from 'spotify-sdk';
import APIServerCredentials from '../config/APIServerCredentials';

export const artistSearchSuccess = artistSearchData => ({
  type: 'ARTIST_SEARCH_SUCCESS',
  payload: artistSearchData,
});

export const artistNotFound = () => ({
  type: 'ARTIST_NOT_FOUND',
  payload: null,
});

export const initialSearchRun = () => ({
  type: 'INITIAL_SEARCH_RUN',
  payload: null,
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

const getSpotifyURIs = setListData => (

  new Promise((resolve, reject) => {

    const artistName = setListData.artistName;
    const totalSongs = Object.keys(setListData.spotifyURIs).length;
    const setListOutput = { ...setListData };
    let complete = 0;

    for (const spotifySong in setListOutput.spotifyURIs) {

      if (Object.prototype.hasOwnProperty.call(setListOutput.spotifyURIs, spotifySong)) {

        const track = new TrackHandler();
      
        track.search(`${artistName} ${spotifySong}`, { limit: 1 })
          .then((trackCollection) => {

            const theTrack = trackCollection[0];
            setListOutput.spotifyURIs[spotifySong] = theTrack ? theTrack._uri : false;
            complete += 1;
      
            if (complete === totalSongs) {

              resolve(setListOutput);

            }

          });

      }

    }

  })

);

const extractSetLists = (setListData, artistName) => {

  const extractedSetLists = {};

  extractedSetLists.artistName = artistName;
  extractedSetLists.setLists = [];
  extractedSetLists.spotifyURIs = {};

  setListData.setlist.forEach((set) => {

    if ((set.artist.name.toLowerCase().trim() === artistName.toLowerCase().trim()) && typeof set.sets === 'object') {

      const mainSet = [];
      const encoreSet = [];

      set.sets.set.forEach((subset) => {

        const isEncore = subset.encore === undefined ? false : true;

        subset.song.forEach((song) => {

          if(song.name === '') {
            return false;
          }

          if (!isEncore) {

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
      url: `${APIServerCredentials.serverBaseURL}/searchSetlists`,
      data: {
        artistName,
      },
    }).then((response) => {

      const responseData = response.data;

      if(responseData.setlist && responseData.setlist.length > 0) {

        const setlistArtistName = responseData.setlist[0].artist.name;
        const artistSearchResponse = extractSetLists(responseData, setlistArtistName);
        getSpotifyURIs(artistSearchResponse)
          .then(
            setListPlusSpotifyURIs => {
              dispatch(artistSearchSuccess(setListPlusSpotifyURIs));
              dispatch(initialSearchRun());
            });

      } else {

        dispatch(artistNotFound());
        dispatch(initialSearchRun());

      }

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

export const setInitialSearchRun = () => (

  (dispatch) => {

    dispatch(initialSearchRun());
    
  }

);