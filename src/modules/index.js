import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import pageInformation from '../reducers/page-information';

export default combineReducers({
  routing: routerReducer,
  pageInformation,
})
