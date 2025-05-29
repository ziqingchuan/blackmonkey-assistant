import {axios} from '../utils/request.ts'
import { DB_MODULE } from './index.ts'
export interface WukongDBInfo {
    pk: string; // 内容的id
    text: string; // 知识库中一条数据的主内容 eg: 《黑神话：悟空》是由杭州游科互动科技有限公司开发，浙江出版集团数字传媒有限公司出版的西游题材单机动作角色扮演游戏。
    category: string; // 内容的分类 eg: 开发背景 | 游戏攻略 | 关卡信息
    source: string; // 内容的来源 eg: 百度百科 | 游民星空 | 知乎 | 百度贴吧
}

export interface DataBase {
    id: number; // 数据库的类别区分
    name: string;
    database: WukongDBInfo[]; // 数据库信息, 后续会扩展其他类型的info
}

export interface InsertWukongDBInfo {
    text: string;
    source: string;
    category: string;
}

/**
 * 插入数据
 * @param data WukongDBInfo 对象
 * @returns 新创建数据的主键
 */
export const insertWukongData = async (data: InsertWukongDBInfo): Promise<number> => {
    return axios.post<{ pk: number }>(DB_MODULE, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data.pk);
};

/**
 * 删除数据
 * @param pk 要删除数据的主键
 * @returns 是否删除成功
 */
export const deleteWukongData = async (pk: string): Promise<boolean> => {
    return axios.delete<boolean>(`${DB_MODULE}/${pk}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};

/**
 * 更新数据
 * @param data 包含主键的完整WukongDBInfo对象
 * @returns 是否更新成功
 */
export const updateWukongData = async (data: WukongDBInfo): Promise<boolean> => {
    return axios.put<boolean>(`${DB_MODULE}/${data.pk}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};

// /**
//  * 获取单条数据详情
//  * @param pk 要获取数据的主键
//  * @returns WukongDBInfo 对象
//  */
// export const getWukongDataDetail = async (pk: number): Promise<WukongDBInfo> => {
//     return axios.get<WukongDBInfo>(`${DB_MODULE}/${pk}`, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     }).then(response => response.data);
// };

/**
 * 获取所有数据列表
 * @returns WukongDBInfo 数组
 */
export const getAllWukongData = async (): Promise<WukongDBInfo[]> => {
    return axios.get<WukongDBInfo[]>(DB_MODULE, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};