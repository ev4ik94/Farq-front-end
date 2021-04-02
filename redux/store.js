import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

/*---Reducers---*/
import rootReducers from './reducers/rootReducers'

const store = createStore(rootReducers, applyMiddleware(thunk))

export default store