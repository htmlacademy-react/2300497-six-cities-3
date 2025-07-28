import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import offersReducer from './offers-slice';
import favoritesReducer from './favorites-slice';
import currentOfferReducer from './current-offer-slice';
import commentsReducer from './comments-slice';

const rootReducer = combineReducers({
  user: userReducer,
  offers: offersReducer,
  favorites: favoritesReducer,
  currentOffer: currentOfferReducer,
  comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
