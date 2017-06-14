const initialState = {
  searchValue: '',
  artistName: '',
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

  }

  return state;

}

export default appState;
