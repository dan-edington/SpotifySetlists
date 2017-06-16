const initialState = {
  loggedIntoSpotify: false,
  userID: null
};

const authState = (state = initialState, action) => {

  switch(action.type) {

    case "SET_LOGIN_STATUS":

      return {
        ...state,
        loggedIntoSpotify: action.payload
      }
      break;

    case "SET_USER_ID":

      return {
        ...state,
        userID: action.payload
      }
      break;

  }

  return state;

}

export default authState;
