import { combineReducers } from 'redux'
import itemsReducer from '../features/items/itemsSlice'
import errorReducer from '../features/items/errorSlice'
import authReducer from '../features/items/authSlice'

export default combineReducers({
  items: itemsReducer,
  error: errorReducer,
  auth: authReducer
})