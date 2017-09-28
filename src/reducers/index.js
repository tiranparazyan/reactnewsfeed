import { combineReducers } from 'redux';
import newsReducer from './news-reducer';
import favoritesReducer from './favourites-reducer';
import scrollReducer from './scroll-reducer';



const rootReducer = combineReducers({
  news: newsReducer,
  favorites: favoritesReducer,
  scroll: scrollReducer
});

export default rootReducer;
