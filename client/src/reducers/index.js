import { combineReducers } from 'redux'
import itemsReducer from '../features/items/itemsSlice'

import authReducer from '../features/items/authSlice'

export default combineReducers({
  items: itemsReducer,
  
  auth: authReducer
})