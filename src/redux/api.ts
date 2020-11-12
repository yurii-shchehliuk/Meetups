import axios from 'axios'
import {MeetUpResponseDataType, MeetUpReducerInitialState, MeetUpDataType, SortState} from "./meetUpsListReduser";
import {EditedValueType} from "../components/EditMeetUp/EditMeetUp";
import {UserDataType} from "./userReducer";
import {EditedUserDataType} from "../components/MyProfile/MyProfile";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://connectusweb20201107204235.azurewebsites.net/api/',
    headers: {"Access-Control-Allow-Origin": "*"}
})

export type ResponseType<D = null> = {
    resultCode: number
    message: Array<string>
    data: D
}
export const authAPI = {
    register(username: string, email: string, password: string, confirmPassword: string) {
        return instance.post<ResponseType>('account/register', {username, email, password, confirmPassword})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType>('account/login', {email, password, rememberMe})
    },
    logOut() {
        return instance.get<ResponseType>('account/logout')
    }

}

export const meetUpAPI = {
    getList(page: number = 1, searchQuery: string = '', sortState: SortState = 0,
            isDescending: boolean = false, meetupsCount: number = 8) {
        return instance.get<ResponseType<MeetUpReducerInitialState>>
        (`home?page=${page}&searchQuery=${searchQuery}
        &sortState=${sortState}&isDescending=${isDescending}&meetupsCount=${meetupsCount}`)
    },
    getMyMeetUps() {
        return instance.get<ResponseType<Array<MeetUpResponseDataType>>>('admin/meetups')
    },
    getMeetUpItem(meetUpId: string) {
        return instance.get<ResponseType<MeetUpResponseDataType>>(`home/${meetUpId}`)
    },
    createMeetUp(meetUpData: MeetUpDataType) {
        return instance.post<ResponseType<MeetUpResponseDataType>>('admin/meetups', meetUpData)
    },
    deleteMeetUp(meetUpId: string) {
        return instance.delete<ResponseType>(`admin/meetups/${meetUpId}`)
    },
    editMeetUp(meetUpId: string, editMeetUpData: EditedValueType,) {
        return instance.put<ResponseType>(`admin/meetups/${meetUpId}`, editMeetUpData)
    },
    joinMeetUp(meetUpId: string) {
        return instance.post<ResponseType>(`home/join/${meetUpId}`)
    },
    unJoinMeetUp(meetUpId: string) {
        return instance.delete<ResponseType>(`home/unjoin/${meetUpId}`)
    }
}

export const userAPI = {
    me() {
        return instance.get<ResponseType<UserDataType>>('account/myAccount')
    },
    editProfile(editedData: EditedUserDataType) {
        return instance.put<ResponseType<EditedUserDataType>>('account', editedData)
    },
    deleteProfile(){
        return instance.delete<ResponseType>('account')
    }
}
