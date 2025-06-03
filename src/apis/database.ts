// ===== 数据库操作模块 =====
import {axios} from '../utils/request.ts'
import { WUKONG_DB_MODULE, ACHIEVEMENTS_DB_MODULE, COMBATKNOWLEDGE_DB_MODULE } from './index.ts'

/**
 * @Description: wukong数据库结构
 */
export interface WukongDBInfo {
    pk: string; // 内容的id
    text: string; // 知识库中一条数据的主内容 eg: 《黑神话：悟空》是由杭州游科互动科技有限公司开发，浙江出版集团数字传媒有限公司出版的西游题材单机动作角色扮演游戏。
    category: string; // 内容的分类 eg: 开发背景 | 游戏攻略 | 关卡信息
    source: string; // 内容的来源 eg: 百度百科 | 游民星空 | 知乎 | 百度贴吧
}

/**
 * @Description: achievements数据库结构
 */
export interface AchievementsDBInfo {
    primary_key: string; // (string类型防止数据溢出)
    ID: string;
    name: string;
    description: string;
    icon: string;
    icon_gray: string;
    hidden: boolean;
    complete_percentage: number;
    access: string;
    keywords: string[]
}
/**
 * @Description: combatKnowledge数据库结构
 */
export interface CombatKnowledgeDBInfo {
    primary_key: string; // (string类型防止数据溢出)
    title: string;
    content: string;
    category: string;
    keywords: string[];
    rating: number;
    difficulty_level: string;
    combat_type: string;
    cost_type: string;
    usage_scenario: string;
    prerequisites: string[];
    related_skills: string[];
    created_time: string
}

/**
 * @Description: 抽象类，可以表示各类数据库，只需扩展database字段的类型即可
 */
export interface DataBase {
    id: number; // 数据库的类别区分
    name: string;
    database: WukongDBInfo[] | AchievementsDBInfo[] | CombatKnowledgeDBInfo[]; // 数据库信息, 后续会扩展其他类型的info
}

/**
 * @Description: 向数据库插入数据的传参结构体
 */
export interface InsertWukongDBInfo {
    text: string;
    source: string;
    category: string;
}

export interface InsertAchievementsDBInfo {
    ID: string;
    name: string;
    description: string;
    icon: string;
    icon_gray: string;
    hidden: boolean;
    complete_percentage: number;
    access: string;
    keywords: string[]
}

export interface InsertCombatKnowledgeDBInfo {
    title: string;
    content: string;
    category: string;
    keywords: string[];
    rating: number;
    difficulty_level: string;
    combat_type: string;
    cost_type: string;
    usage_scenario: string;
    prerequisites: string[];
    related_skills: string[];
}

/**
 * 插入数据
 * @param data WukongDBInfo 对象
 * @returns 新创建数据的主键
 */
export const insertWukongData = async (data: InsertWukongDBInfo): Promise<number> => {
    return axios.post<{ pk: number }>(WUKONG_DB_MODULE, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data.pk);
};

/**
 * 插入数据
 * @param data WukongDBInfo 对象
 * @returns 新创建数据的主键
 */
export const insertAchievementsData = async (data: InsertAchievementsDBInfo): Promise<number> => {
    return axios.post<{ primary_key: number }>(ACHIEVEMENTS_DB_MODULE, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data.primary_key);
};

/**
 * 插入数据
 * @param data CombatKnowledgeDBInfo 对象
 * @returns 新创建数据的主键
 */
export const insertCombatKnowledgeData = async (data: InsertCombatKnowledgeDBInfo): Promise<number> => {
    return axios.post<{ primary_key: number }>(COMBATKNOWLEDGE_DB_MODULE, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data.primary_key);
};

/**
 * 删除数据
 * @param pk 要删除数据的主键
 * @returns 是否删除成功
 */
export const deleteWukongData = async (pk: string): Promise<boolean> => {
    return axios.delete<boolean>(`${WUKONG_DB_MODULE}/${pk}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};

/**
 * 删除数据
 * @param primary_key 要删除数据的主键
 * @returns 是否删除成功
 */
export const deleteAchievementsData = async (primary_key: string): Promise<boolean> => {
    return axios.delete<boolean>(`${ACHIEVEMENTS_DB_MODULE}/${primary_key}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};

/**
 * 删除数据
 * @param primary_key 要删除数据的主键
 * @returns 是否删除成功
 */
export const deleteCombatKnowledgeData = async (primary_key: string): Promise<boolean> => {
    return axios.delete<boolean>(`${COMBATKNOWLEDGE_DB_MODULE}/${primary_key}`, {
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
    return axios.put<boolean>(`${WUKONG_DB_MODULE}/${data.pk}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};
/**
 * 更新数据
 * @param data AchievementsDBInfo
 * @returns 是否更新成功
 */
export const updateAchievementsData = async (data: AchievementsDBInfo): Promise<boolean> => {
    return axios.put<boolean>(`${ACHIEVEMENTS_DB_MODULE}/${data.primary_key}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};
/**
 * 更新数据
 * @param data AchievementsDBInfo
 * @returns 是否更新成功
 */
export const updateCombatKnowledgeData = async (data: CombatKnowledgeDBInfo): Promise<boolean> => {
    return axios.put<boolean>(`${COMBATKNOWLEDGE_DB_MODULE}/${data.primary_key}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};

/**
 * 获取所有数据列表
 * @returns WukongDBInfo 数组
 */
export const getAllWukongData = async (): Promise<WukongDBInfo[]> => {
    return axios.get<WukongDBInfo[]>(WUKONG_DB_MODULE, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};

/**
 * 获取所有数据列表
 * @returns AchievementsDBInfo 数组
 */
export const getAllAchievementsData = async (): Promise<AchievementsDBInfo[]> => {
    return axios.get<AchievementsDBInfo[]>(ACHIEVEMENTS_DB_MODULE, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};
/**
 * 获取所有数据列表
 * @returns CombatKnowledgeDBInfo 数组
 */
export const getAllCombatKnowledgeData = async (): Promise<CombatKnowledgeDBInfo[]> => {
    return axios.get<CombatKnowledgeDBInfo[]>(COMBATKNOWLEDGE_DB_MODULE, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};