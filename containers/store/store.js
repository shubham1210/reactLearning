import {createStore,compose,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import headerReducer from '../header/reducer.js';
import bodyReducer from '../body/reducer.js';

const rootReducer = combineReducers({headerReducer,bodyReducer});

export default function configureStore() {
    console.log('= Initializing redux store for ' + process.env.NODE_ENV + ' environment... =');
    if (process.env.NODE_ENV === 'production') {
      return createStore(rootReducer);
    } else {
      // Configure middleware only for non-production environment
      const finalCreateStore = compose(applyMiddleware(createLogger({collapsed: true}), reduxImmutableStateInvariant()))(createStore);
      return finalCreateStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }
  }