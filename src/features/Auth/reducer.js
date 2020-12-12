import {
  CHANGE_ISLOADING,
  CHANGE_ISLOGIN,
  CHANGE_USER,
  SET_VALUES
} from "./constants";

let initialState = {
  popup: false,
  login: false,
  loading: false,
  user: {},
  notes: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ISLOADING:
      return {
        ...state,
        loading: action.value
      };

    case CHANGE_ISLOGIN:
      return {
        ...state,
        login: action.value
      };

    case CHANGE_USER:
      return {
        ...state,
        user: action.value
      };

    case SET_VALUES:
      return {
        ...state,
        notes: action.value
      };

    default:
      return state;
  }
};

export default reducer;
