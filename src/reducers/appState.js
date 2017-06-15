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
//            spotifyURI: ''
//        }
//      ]
//    }
//  }

const initialState = {
  searchValue: '',
  artistName: '',
  playerState: false,
  setLists: []
};

const appState = (state = initialState, action) => {

  switch(action.type) {

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
        setLists: action.payload.setLists
      }
      break;

    case "SET_SPOTIFY_URI":

      let p = action.payload;
      let newSetLists = state.setLists;
      newSetLists[p.setListID]
        .songLists
        [p.isEncore?'encore':'main']
        [p.songID]
        .spotifyURI = p.spotifyURI;

      return {
        ...state,
        setLists: newSetLists
      }

      break;

      case "SET_PLAYER_STATE":
      //console.log(action.payload);
        return {
          ...state,
          playerState: action.payload
        }
        break;

  }

  return state;

}

export default appState;
