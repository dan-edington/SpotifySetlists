const initialState = {
  loggedIntoSpotify: false
};

const authState = (state = initialState, action) => {

  switch(action.type) {

    case "SET_LOGIN_STATUS":

      return {
        ...state,
        loggedIntoSpotify: action.payload
      }
      break;

  }

  return state;

}

export default authState;
