import { applyMiddleware, createStore } from 'redux';
import thunk from 'react-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';
let store;
export function configureStore() {
  store = createStore(reducer, applyMiddleware(thunk, logger));
  return store;
}
