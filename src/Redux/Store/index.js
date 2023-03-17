import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../Reducers/auth';
import { dbReducer } from '../Reducers/db';

const persistConfig = {
    key: "root",
    storage,
    whiteList: []
}


const rootReducers = combineReducers({
    auth: authReducer,
    db: dbReducer,
})

const reducers = persistReducer(persistConfig, rootReducers)

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))