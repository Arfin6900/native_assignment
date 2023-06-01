import { PLACES_HISTORY_CREATED } from "../constants";

const initialState = {
  // Token:null,
  places: [],

  // isLoading: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACES_HISTORY_CREATED: {
      console.log("==========Get developemet",action)
      return {...state,places:action.payload};
    }
  

    default:
      return state
  }
}

export default userReducer






