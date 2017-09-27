import { combineReducers } from 'redux';
import newsReducer from './news-reducer';
import favoritesReducer from './favourites-reducer';



const rootReducer = combineReducers({
  news: newsReducer,
  favorites: favoritesReducer
});

export default rootReducer;
