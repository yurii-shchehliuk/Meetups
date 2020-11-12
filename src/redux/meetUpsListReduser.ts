import {Dispatch} from "redux";
import {authAPI, meetUpAPI} from "./api";
import {setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {EditedValueType} from "../components/EditMeetUp/EditMeetUp";

export type MeetUpResponseDataType = {
    id: string
    title: string,
    description: string,
    meetupImgPath: string,
    meetupDate: string,
    city: string,
    createdByUser: string,
    joined: boolean,
    users: []
}

export enum SortState {
    Title = 0,
    MeetupDate = 1,
    City = 2
}

type PageViewDataType = {
    pageNumber: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}

export type MeetUpDataType = {
    title: string,
    description: string,
    meetupImgPath: string,
    meetupDate: string,
    city: string,
}


export type MeetUpReducerInitialState = {
    meetups: Array<MeetUpResponseDataType>,
    pageView: PageViewDataType,
    isCreated: boolean,
    isEdited: boolean
}


let initialState: MeetUpReducerInitialState = {
    meetups: [
        {
            id: "36e6f7fc-3739-4545-f8fb-08d883e63470",
            title: "4 Test title",
            description: "Test description by the way, ok?",
            meetupImgPath: "C:\\Users\\Jerzy\\source\\repos\\Back\\ConnectUs\\wwwroot\\img\\highres_493244320.png",
            meetupDate: "2020-11-08T14:00:01.9332275",
            city: "Rzeszow",
            createdByUser: 'a',
            joined: false,
            users: []
        }
    ],
    pageView: {
        pageNumber: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false
    },
    isCreated: false,
    isEdited: false
}

type MeetUpReducerActionType =
    | ReturnType<typeof setMeetUps>
    | ReturnType<typeof createMeetUp>
    | ReturnType<typeof deleteMeetUp>
    | ReturnType<typeof setIsCreated>
    | ReturnType<typeof editMeetUp>
    | ReturnType<typeof setIsEdited>
    | ReturnType<typeof join>
    | ReturnType<typeof unJoin>
    | ReturnType<typeof setPageData>


export const meetUpListReducer = (state = initialState, action: MeetUpReducerActionType): MeetUpReducerInitialState => {
    switch (action.type) {
        case "SET_MEET_UPS":
            return {
                ...state,
                meetups: action.meetUps.map(tl => ({...tl}))
            }
        case "SET_PAGE_DATA":
            return {
                ...state,
                pageView: action.pageData
            }
        case "CREATE_MEET_UP":
            return {
                ...state,
                meetups: [action.meetUpData, ...state.meetups]
            }
        case "DELETE_MEET_UP":
            return {
                ...state,
                meetups: state.meetups.filter(item => item.id !== action.meetUpId)
            }
        case "SET_IS_CREATED":
            return {
                ...state,
                isCreated: action.isCreated
            }
        case "EDIT_MEET_UP": {
            return {
                ...state,
                meetups: state.meetups.map(item => item.id === action.meetUpId ?
                    {...item, ...action.editedMeetUpData} : item)
            }
        }
        case "SET_IS_EDITED":
            return {
                ...state,
                isEdited: action.isEdited
            }
        case "JOIN":
            return {
                ...state,
                meetups: state.meetups.map(item => item.id === action.meetUpId ? {...item, joined: true} : item)
            }
        case "UNJOIN":
            return {
                ...state,
                meetups: state.meetups.map(item => item.id === action.meetUpId ? {...item, joined: false} : item)
            }
        default:
            return state
    }
}

export const setMeetUps = (meetUps: Array<MeetUpResponseDataType>) => ({
    type: "SET_MEET_UPS", meetUps
} as const)

export const setPageData = (pageData: PageViewDataType) => ({
    type: "SET_PAGE_DATA", pageData
} as const)


export const createMeetUp = (meetUpData: MeetUpResponseDataType) => ({
    type: "CREATE_MEET_UP", meetUpData
} as const)

export const deleteMeetUp = (meetUpId: string) => ({
    type: "DELETE_MEET_UP", meetUpId
} as const)

export const setIsCreated = (isCreated: boolean) => ({
    type: "SET_IS_CREATED", isCreated
} as const)

export const setIsEdited = (isEdited: boolean) => ({
    type: "SET_IS_EDITED", isEdited
} as const)

export const editMeetUp = (meetUpId: string, editedMeetUpData: EditedValueType) => ({
    type: "EDIT_MEET_UP", meetUpId, editedMeetUpData
} as const)

export const join = (meetUpId: string) => ({
    type: 'JOIN', meetUpId
} as const)

export const unJoin = (meetUpId: string) => ({
    type: 'UNJOIN', meetUpId
} as const)

export const getList = (page: number = 1, searchQuery: string = '', sortState: SortState = 0,
                        isDescending: boolean = false, meetupsCount: number = 8) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        meetUpAPI.getList(page, searchQuery, sortState, isDescending, meetupsCount)
            .then(res => {
                debugger
                if (res.data.resultCode === 0) {
                    dispatch(setMeetUps(res.data.data.meetups))
                    dispatch(setPageData(res.data.data.pageView))
                    dispatch(setAppStatusAC('succeeded'))
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

export const createMeetUpTC = (meetUpData: MeetUpDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        meetUpAPI.createMeetUp(meetUpData)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(createMeetUp(res.data.data))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setIsCreated(true))
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


export const getMyMeetUpsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        meetUpAPI.getMyMeetUps()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setMeetUps(res.data.data))
                    dispatch(setAppStatusAC('succeeded'))
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

export const deleteMeetUpTC = (meetUpId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        meetUpAPI.deleteMeetUp(meetUpId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteMeetUp(meetUpId))
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


export const editMeetUpTC = (meetUpId: string, editedMeetUpData: EditedValueType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        meetUpAPI.editMeetUp(meetUpId, editedMeetUpData)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(editMeetUp(meetUpId, editedMeetUpData))
                    dispatch(setIsEdited(true))
                    dispatch(setAppStatusAC('succeeded'))
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

export const joinTC = (meetUpId: string) => {
    return (dispatch: Dispatch) => {
        setAppStatusAC('loading')
        meetUpAPI.joinMeetUp(meetUpId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(join(meetUpId))
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

export const unJoinTC = (meetUpId: string) => {
    return (dispatch: Dispatch) => {
        setAppStatusAC('loading')
        meetUpAPI.unJoinMeetUp(meetUpId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(unJoin(meetUpId))
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

