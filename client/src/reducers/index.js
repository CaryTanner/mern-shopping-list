import { combineReducers } from 'redux'
import itemsReducer from '../features/items/itemsSlice'

export default combineReducers({
  items: itemsReducer
})