import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware  from 'redux-thunk';
import rootReducer from './reducer';

const initialState = {};

const middleWare = [thunkMiddleware ];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

export default store;