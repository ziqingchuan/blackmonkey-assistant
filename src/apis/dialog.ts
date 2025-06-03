// ===== 对话管理模块 =====
import {axios} from '../utils/request.ts'
import { DIALOG_MODULE } from './index.ts'
import type { LoginInfo } from './user.ts'
import type { SourceDoc } from './rag.ts'

/**
 * @Description: 一次对话的数据结构
 */
export interface Dialog {
    id: number;
    userId: number;
    title: string;
    createTime: Date;
    contentList: Content[];

}

/**
 * @Description: 前端用于显示对话的独有数据结构
 */
export interface DisplayContent {
    text: string;
    role: 'USER' | 'RAG';
    sourceDoc?: SourceDoc[];
}

/**
 * @Description: 对话内容的数据结构
 */
export interface Content {
    question: string;
    answer: string;
    sourceDoc: SourceDoc[];
    createTime: Date;
    selected?: boolean;
}

/**
 * 获取对话详情
 * @param id
 * @returns Dialog
 */
export const getDialogDetail = async (id: number): Promise<Dialog> => {
    return axios.get<any>(`${DIALOG_MODULE}/detail/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data.data);
};

/**
 * 获取所有历史对话
 * @param userInfo
 * @returns Dialog[]
 */
export const getAllHistory = async (userInfo: LoginInfo): Promise<Dialog[]> => {
    return axios.get<any>(`${DIALOG_MODULE}/getAll`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            email: userInfo.email,
            password: userInfo.password
        }
    }).then(response => response.data.data);
};

/**
 * 创建对话
 * @param title
 * @returns boolean
 */
export const createDialog = async (title: string): Promise<boolean> => {
    return axios.post<boolean>(`${DIALOG_MODULE}/create`, {title: title}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }).then(response => response.data);
};

/**
 * 管理员获取所有用户对话
 * @returns Dialog[]
 */
export const getAllUserDialogs = async (): Promise<Dialog[]> => {
    return axios.get<any>(`${DIALOG_MODULE}/admin/getAllUserDialogs`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => {
        
        return response.data.data || [];
    })
};