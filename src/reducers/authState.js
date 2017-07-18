const initialState = {
  loggedIntoSpotify: false,
  userID: null,
};

const authState = (state = initialState, action) => {

  let returnState;

  switch (action.type) {

    case 'SET_LOGIN_STATUS':

      returnState = {
        ...state,
        loggedIntoSpotify: action.payload,
      };
      break;

    case 'SET_USER_ID':

      returnState = {
        ...state,
        userID: action.payload,
      };
      break;

    default:
      returnState = state;

  }

  return returnState;

};

export default authState;
