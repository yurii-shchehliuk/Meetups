import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./authReducer";
import {appReducer} from "./appReducer";
import {meetUpListReducer} from "./meetUpsListReduser";
import {userReducer} from "./userReducer";
import {meetUpReducer} from "./meetUpReducer";

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    meetUp: meetUpListReducer,
    user: userReducer,
    meetUpItem: meetUpReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export type AppStateType = ReturnType<typeof reducers>

export default store;
