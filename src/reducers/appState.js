const initialState = {
  artistName: ''
};

const appState = (state = initialState, action) => {

  switch(action.type) {

    case "ARTIST_SEARCH_SUCCESS":

      return action.payload;
      break;

  }

  return state;

}

export default appState;
