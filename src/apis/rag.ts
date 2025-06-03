// ===== RAG问答模块 =====
import {axios} from '../utils/request.ts'
import {RAG_MODULE} from "./index.ts";
import type {Achievement} from "./steam.ts";
/**
 * @Description: RAG回答的参考信息的数据结构
 */
export interface SourceDoc {
    source: string;
    category: string;
    content: string;
}
/**
 * @Description: RAG的意图识别
 */
export interface IntentInfo {
    confidence: number;
    description: string;
    intent: string;
    intent_name: string;
    method: string;
    original_text: string;
}

/**
 * @Description: RAG检索的配置参数信息
 */
export interface ConfigParams {
    searchStrategy: number;
    resultCount: number;
    similarity: number;
}

export interface CommonQuestion {
    dialogId: number;
    question: string;
    searchStrategy: number;
    resultCount: number;
    similarity: number;
}

export interface CombatMethodsQuestion {
  question: string;
  config: ConfigParams;
}

export interface AchievementQuestion {
  question: string;
  config: ConfigParams;
  userAchievements: Achievement[];
}

export interface StreamData {
    type: string;
    documents: SourceDoc[];
    content: string;
    intent_info: IntentInfo;
}

/**
 * 获取武学问答回答
 * @param question 用户问题
 * @returns 武学相关回答
 */
export const getCombatMethodsAnswer = async (question: CombatMethodsQuestion): Promise<string> => {
  return axios.post<any>(`${RAG_MODULE}/combat/query`, question, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  }).then(response => response.data);
}
/**
 * 获取成就问答回答
 * @param question 用户问题
 * @returns 成就相关回答
 */
export const getAchievementAnswer = async (question: AchievementQuestion): Promise<string> => {

  return axios.post<any>(`${RAG_MODULE}/achievements/query`, question, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  }).then(response => response.data);
};
