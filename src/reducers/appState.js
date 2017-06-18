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
  spotifyURIs: {}
};

const appState = (state = initialState, action) => {

  switch(action.type) {

    case "RESET_SEARCH_DATA":
      return initialState
      break;

    case "SEARCH_BAR_UPDATE":

      return {
        ...state,
        searchValue: action.payload
      }
      break;

    case "ARTIST_SEARCH_SUCCESS":

      return {
        ...state,
        artistName: action.payload.artistName,
        setLists: action.payload.setLists,
        spotifyURIs: action.payload.spotifyURIs
      }
      break;

    case "SET_SPOTIFY_URI":

      let p = action.payload;
      let newSpotifyURIs = Object.assign({}, state.spotifyURIs); // create dupe of array to prevent mutability
      newSpotifyURIs[p.songName] = p.spotifyURI;

      return {
        ...state,
        spotifyURIs: newSpotifyURIs
      }

      break;

      case "SET_PLAYER_STATE":
        return {
          ...state,
          playerState: action.payload
        }
        break;

  }

  return state;

}

export default appState;
