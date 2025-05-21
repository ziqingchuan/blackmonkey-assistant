// ===== 对话管理模块 =====
import {axios} from '../utils/request'
import { DIALOG_MODULE } from './index.ts'
import type { UserInfo } from './user.ts'
import type { SourceDoc } from './rag.ts'

export interface Dialog {
    id: number;
    userId: number;
    title: string;
    createTime: Date;
    contentList: Content[];
}

// 用于前端显示对话的数据结构
export interface DisplayContent {
    text: string;
    role: 'USER' | 'RAG';
    sourceDoc: SourceDoc[];
}

export interface Content {
    question: string;
    answer: string;
    sourceDoc: SourceDoc[];
    createTime: Date;
}

// 对话详情 - 返回单个 Dialog
export const getDialogDetail = (id: number): Promise<Dialog> => {
    return axios.get<Dialog>(`${DIALOG_MODULE}/detail/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data.data);
};

// 获取所有历史对话 - 返回 Dialog 数组
export const getAllHistory = (userInfo: UserInfo): Promise<Dialog[]> => {
    return axios.get<Dialog[]>(`${DIALOG_MODULE}/getAll`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            userName: userInfo.userName,
            password: userInfo.password
        }
    }).then(response => response.data.data);
};

// 创建对话 - 返回 boolean 表示是否成功
export const createDialog = (title: string): Promise<boolean> => {
    return axios.post<boolean>(`${DIALOG_MODULE}/create`, {title: title}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }).then(response => response.data);
};