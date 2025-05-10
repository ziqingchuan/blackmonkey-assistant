import {axios} from '../utils/request'
import { USER_MODULE } from './index.ts'
export interface UserInfo {
    id?: number;
    userName: string;
    password: string;
}

export const login = (userInfo: UserInfo) => {
    return axios.post(`${USER_MODULE}/login`,null,
        {headers: {'Content-Type': 'application/json'}, params: { userName: userInfo.userName, password: userInfo.password }});
};

export const register = (userInfo: UserInfo) => {
    return axios.post(`${USER_MODULE}/register`, userInfo,
        {headers: {'Content-Type': 'application/json'}});
};