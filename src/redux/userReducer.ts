import {Dispatch} from "redux";
import {authAPI, userAPI} from "./api";
import {setAppStatusAC} from "./appReducer";
import {EditedUserDataType} from "../components/MyProfile/MyProfile";
import {setIsAuth} from "./authReducer";

export type UserDataType = {
    id: string,
    email: string
    description: string,
    userName: string,
    userImgPath: string,
    birthDay: string,
    password: string,
    meetups: []
}

export type MeDataType = {
    userData: UserDataType,
    isEdited: boolean
}

const initialState: MeDataType = {
    userData: {
        id: '',
        email: '',
        description: '',
        userName: '',
        userImgPath: '',
        birthDay: '',
        password: '',
        meetups: []
    },
    isEdited: false
}

type UserReducerActionType =
    | ReturnType<typeof setMe>
    | ReturnType<typeof setUserDataIsEdited>
    | ReturnType<typeof editUserData>

export const userReducer = (state = initialState, action: UserReducerActionType): MeDataType => {
    switch (action.type) {
        case "SET_ME":
            return {
                ...state,
                userData: {...action.meData}
            }
        case "EDIT_USER_DATA":
            return {
                ...state,
                userData: {...state.userData, ...action.editedUserData}
            }
        case "SET_USER_IS_EDITED":
            return {
                ...state,
                isEdited: action.isEdited
            }

        default:
            return state
    }
}

const setMe = (meData: UserDataType) => ({
    type: "SET_ME", meData
} as const)

export const setUserDataIsEdited = (isEdited: boolean) => ({
    type: "SET_USER_IS_EDITED", isEdited
} as const)

const editUserData = (editedUserData: EditedUserDataType) => ({
    type: "EDIT_USER_DATA", editedUserData
} as const)

export const getMeTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        userAPI.me()
            .then(res => {
                debugger
                if (res.data.resultCode === 0) {
                    dispatch(setMe(res.data.data))
                    dispatch(setIsAuth(true))
                    dispatch(setAppStatusAC("succeeded"))
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

export const editUserDataTC = (editedUserData: EditedUserDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        userAPI.editProfile(editedUserData)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(editUserData(editedUserData))
                    dispatch(setUserDataIsEdited(true))
                    dispatch(setAppStatusAC("succeeded"))
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

export const logOut = () => {
    return (dispatch: Dispatch) => {
        authAPI.logOut()
            .then(res => {
                if (res.data.data === 0) {
                    dispatch(setIsAuth(false))
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

export const deleteProfile = () => {
    return (dispatch: Dispatch) => {
        userAPI.deleteProfile()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsAuth(false))
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
