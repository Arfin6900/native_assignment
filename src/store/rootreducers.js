import { combineReducers } from 'redux'
import userReducer from "./reducer/places.reducer"
//insert another reducers here to be combined

const reducers = combineReducers({
  userReducer
})

export default reducers