// setLists is an array of objects:
//  {
//    venue: {
//      name: '',
//      city: ''
//    },
//    date: '',
//    songLists: {
//      main: [
//        {
//            songName: ''
//            spotifyURI: ''
//        }
//      ]
//      encore: [
//        {
//            songName: ''
//        }
//      ]
//    }
//  }

const initialState = {
  searchValue: '',
  artistName: '',
  playerState: false,
  setLists: [],
  spotifyURIs: {},
};

let newSpotifyURIs;

const appState = (state = initialState, action) => {

  let returnState;

  switch (action.type) {

    case 'RESET_SEARCH_DATA':
      returnState = state;
      break;

    case 'SEARCH_BAR_UPDATE':

      returnState = {
        ...state,
        searchValue: action.payload,
      };
      break;

    case 'ARTIST_SEARCH_SUCCESS':

      returnState = {
        ...state,
        artistName: action.payload.artistName,
        setLists: action.payload.setLists,
        spotifyURIs: action.payload.spotifyURIs,
      };
      break;

    case 'ARTIST_NOT_FOUND':
      returnState = {
        ...state,
        artistName: false
      }
      break;

    case 'SET_SPOTIFY_URI':

      newSpotifyURIs = Object.assign({}, state.spotifyURIs);
      newSpotifyURIs[action.payload.songName] = action.payload.spotifyURI;

      returnState = {
        ...state,
        spotifyURIs: newSpotifyURIs,
      };

      break;

    case 'SET_PLAYER_STATE':
      returnState = {
        ...state,
        playerState: action.payload,
      };
      break;

    default:
      returnState = state;

  }

  return returnState;

};

export default appState;
