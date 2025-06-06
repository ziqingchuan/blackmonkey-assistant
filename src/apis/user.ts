// ===== 用户认证模块 =====
import {axios} from '../utils/request.ts'
import { API_MODULE } from './index.ts'

/**
 * @Description: 用户注册信息结构体，可用作formData
 */
export interface RegisterInfo {
    email: string;
    validCode: string;
    password: string;
    salt: string;
}

/**
 * @Description: 用户登录传参结构体
 */
export interface LoginInfo {
    email: string;
    password: string;
}

/**
 * 登录
 * @param loginInfo
 */
export const login = (loginInfo: LoginInfo) => {
    return axios.post(`${API_MODULE}/login`, loginInfo, {
        headers: { 'Content-Type': 'application/json' }
    });
};

/**
 * 获取验证码
 * @param email
 */
export const getValidCode = (email: string) => {
    return axios.post(`${API_MODULE}/getValidCode`, {email: email}, {
        headers: { 'Content-Type': 'application/json' }
    });
};

/**
 * 注册
 * @param userInfo
 */
export const register = (userInfo: RegisterInfo) => {
    return axios.post(`${API_MODULE}/register`, userInfo, {
        headers: { 'Content-Type': 'application/json' }
    });
};

/**
 * 获取加密盐
 * @param email
 * @returns salt: string
 */
export const getSalt = (email: string) => {
    // return axios.post(`${API_MODULE}/salt`, { email }, {
    return axios.post('/proxy/salt', { email }, {
        headers: { 'Content-Type': 'application/json' }
    });
};