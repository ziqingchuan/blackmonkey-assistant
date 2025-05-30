// ===== Steam 管理模块 =====
import { axios } from '../utils/request.ts';
import { STEAM_MODULE } from './index.ts'

// Steam 成就模型
/**
 * @Description: Steam 成就信息结构体
 */
export interface Achievement {
    api_name: string;
    name: string; // 成就名称
    description: string; // 描述
    hidden: boolean; // 是否是隐藏成就
    icon: string; // 已达成的成就图标
    icon_gray: string; // 未达成的成就图标
    completion_percentage: number; // 全体用户达成的百分比
    achieved: boolean; // 是否达成（控制显示icon还是iconGray的）
    unlock_time?: string; // 成就解锁时间（可选）
}

/**
 * @Description: SteamUser的子结构体
 */
interface game {
    last_played: string; // 上次玩游戏时间
    playtime_hours: number; // 游戏时长（小时）
}

/**
 * @Description: SteamUser的子结构体
 */
interface user {
    avatar: string; // Steam 用户头像url
    name: string; // Steam 用户名
}

/**
 * @Description: Steam用户基本信息结构
 */
export interface SteamUser {
    game: game;
    user: user;
}

/**
 * @Description: 前端构造的日历结构体
 */
export interface CalendarDay {
    date: number;
    inMonth: boolean,
    achievementCount: number, // 这一天达成的成就数量
    fullDate: string;
}

/**
 * @Description: 前端构造的储存用户信息分析结果的结构体
 */
export interface UserInfoAnalysis {
    playerType: string; // 游戏玩家类型
    lastTime: string; // 最后登录的时间
    dayDiff: number; // 距离上次登录天数
}

/**
 * @Description: 前端构造的用于储存月度成就映射结构体
 */
export interface  AchievementsMonthMap {
    month: string; // 时间（YYYY-MM）月份
    dayAndCount: AchievementsDayMap[]; // 这一月每天达成的成就数量
}

/**
 * @Description: 前端构造的用于储存日期与实现成就数量映射结构体
 */
export interface AchievementsDayMap {
    day: string; // 时间（YYYY-MM-DD）
    count: number; // 这一天达成的成就数量
}

/**
 * @Description: 前端构造的储存成就信息分析结果的结构体
 */
export interface AchievementInfoAnalysis {
    achievementCount: number; // 已达成的成就数量
    rareAchievementTotal: number; // 稀有成就数量（completion_percentage >= 20% && <= 50%）
    superRareAchievementTotal: number; // 超稀有成就数量（completion_percentage < 20%）
    achievedRareAchievementCount: number; // 已实现的稀有成就数量（completion_percentage >= 20% && <= 50%）
    achievedSuperRareAchievementCount: number; // 已实现的超稀有成就数量（completion_percentage < 20%）
    hiddenAchievementCount: number; // 隐藏成就数量
    achievedHiddenAchievementCount: number; // 已实现的隐藏成就数量
    firstAchievementTime: string; // 第一次达成成就的时间
    firstAchievement: Achievement; // 第一次达成的成就
    lastAchievementTime: string; // 最近一次达成成就的时间
    lastAchievement: Achievement; // 最近一次达成的成就
    achievingSpeed: number; // 平均每天达成成就的数量：achievementCount / (lastAchievementTime-firstAchievementTime), 单位：个/天
}

// ===== API 接口 =====

/**
 * 绑定 Steam 账号
 * @param steamId
 */
export const bindSteamAccount = async (steamId: string): Promise<any> => {
    return axios.post<any>(`${STEAM_MODULE}/bind`,{steam_id: steamId}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }).then(response => response.data);
};

/**
 * 获取绑定的 Steam 用户信息
 * @returns SteamUser
 */
export const getSteamUserInfo = async (): Promise<any> => {
    return axios.get<any>(`${STEAM_MODULE}/user/info`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data);
};

/**
 * 获取用户的 Steam 游戏成就信息
 * @returns Achievement[]
 */
export const getUserAchievements = async (): Promise<any> => {
    return axios.get<any>(`${STEAM_MODULE}/user/achievements`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.data.achievements);
};