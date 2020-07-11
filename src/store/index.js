import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import SideMenuReducer from './reducers/sidemenureducer';
import BoardsReducer from './reducers/boardsreducer';
//import BoardsReducer from '../containers/BoardCreator/duck/reducer';
const rootReducer = combineReducers({
	SideMenuReducer,
	BoardsReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
