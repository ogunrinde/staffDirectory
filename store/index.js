import { createStore, applyMiddleware,combineReducers } from 'redux';
import AsyncReducer from '../reducer/reducer';
import updateReducer from '../reducer/updatereducer';
import thunk from 'redux-thunk';


const reducer = combineReducers({
    AsyncReducer:AsyncReducer,
    updateReducer:updateReducer

});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;