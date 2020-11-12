import {authAPI} from "./api";
import {Dispatch} from "redux";
import {getMeTC} from "./userReducer";


type AuthInitialState = {
    email: null | string,
    password: null | string,
    confirmPassword: null | string,
    username: null | string,
    isAuth: true | false,
    isRegister: true | false,
}




const authInitialState: AuthInitialState = {
    email: null,
    password: null,
    confirmPassword: null,
    username: null,
    isAuth: false,
    isRegister: false,
}

type ActionType =
    | ReturnType<typeof setRegister>
    | ReturnType<typeof setIsAuth>

export const authReducer = (state = authInitialState, action: ActionType) => {
    switch (action.type) {
        case "SET_REGISTER":
            return {
                ...state,
                isRegister: true
            }
        case "SET_IS_AUTH":
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state
    }
}

const setRegister = () => ({
    type: 'SET_REGISTER'
} as const)

export const setIsAuth = (isAuth: boolean) => ({
    type: 'SET_IS_AUTH', isAuth
} as const)


export const register = (username: string, email: string, password: string, confirmPassword: string) => {
    return (dispatch: Dispatch) => {
        authAPI.register(username, email, password, confirmPassword)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setRegister())
                }
            }).catch(error => {
            if (!error.response) {
                // network error
                console.log('Error: Network Error');
            } else {
                console.log(error.response.data.message);
            }
        })
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsAuth(true))
                }
            }).catch(error => {
            if (!error.response) {
                // network error
                console.log('Error: Network Error');
            } else {
                console.log(error.response.data.message);
            }
        })
    }
}


