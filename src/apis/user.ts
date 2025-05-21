// ===== 用户认证模块 =====
import {axios} from '../utils/request'
import { API_MODULE } from './index.ts'
export interface RegisterInfo {
    email: string;
    validCode: string;
    password: string;
    salt: string;
}

export interface LoginInfo {
    email: string;
    password: string;
}

export const login = (loginInfo: LoginInfo) => {
    return axios.post(`${API_MODULE}/login`, loginInfo, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const getValidCode = (email: string) => {
    return axios.post(`${API_MODULE}/getValidCode`, {email: email}, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const register = (userInfo: UserInfo) => {
    return axios.post(`${API_MODULE}/register`, userInfo, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const getSalt = (email: string) => {
    return axios.post(`${API_MODULE}/salt`, { email }, {
        headers: { 'Content-Type': 'application/json' }
    });
};