import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from '../store/session';
import userReducer from '../store/user';
import classReducer from '../store/class';
import userClassReducer from '../store/user_classes';
import reviewReducer from '../store/review';
import messageReducer from '../store/messages';

const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer,
    class: classReducer,
    user_class: userClassReducer,
    review: reviewReducer,
    message: messageReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preLoadedState) => {
    return createStore(rootReducer, preLoadedState, enhancer)
}

export default configureStore;