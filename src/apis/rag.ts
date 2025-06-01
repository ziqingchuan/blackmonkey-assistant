// ===== RAG问答模块 =====
import {axios} from '../utils/request.ts'
import {RAG_MODULE} from "./index.ts";

// export interface QueryInfo {
//     dialogId: number;
//     question: string;
//     searchStrategy: number; // 0 | 1: 0 代表混合检索；1 代表仅向量检索
//     resultCount: number;
//     similarity: number; // 0-1,以0.05为最小单位
// }
//
// export interface AnswerInfo {
//     answer: string;
//     sourceDoc: SourceDoc[];
// }

/**
 * @Description: RAG回答的参考信息的数据结构
 */
export interface SourceDoc {
    source: string;
    category: string;
    content: string;
}

/**
 * @Description: RAG检索的配置参数信息
 */
export interface ConfigParams {
    searchStrategy: number;
    resultCount: number;
    similarity: number;
}

/**
 * 获取武学问答回答
 * @param question 用户问题
 * @returns 武学相关回答
 */
export const getCombatMethodsAnswer = async (question: string): Promise<string> => {
  try {
    // 调用后端真实API
    const baseURL = 'http://localhost:8000'; // 后端地址
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseURL}/api/rag/combat/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        question: question,
        searchStrategy: 0, // 混合检索
        resultCount: 3,
        similarity: 0.4
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.answer;
    } else {
      throw new Error('查询失败');
    }
  } catch (error) {
    console.error('调用战斗知识问答API失败:', error);
    // 返回默认错误消息
    return '贫僧修为尚浅，此武学奥义暂未参透，还需苦修方能为你解惑。';
  }
};

/**
 * 获取成就问答回答 - 调用后端真实API
 * @param question 用户问题
 * @param userAchievements 用户成就数据（可选）
 * @returns 成就相关回答
 */
export const getAchievementAnswer = async (question: string, userAchievements?: any[]): Promise<string> => {
  try {
    // 这里需要导入axios，但为了避免循环依赖，我们直接使用fetch
    const baseURL = 'http://localhost:8000'; // 后端地址
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${baseURL}/api/rag/achievements/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        question: question,
        searchStrategy: 0, // 混合检索
        resultCount: 5,
        similarity: 0.7,
        userAchievements: userAchievements || [] // 传递用户成就数据
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.answer;
    } else {
      throw new Error(data.message || '查询失败');
    }
  } catch (error) {
    console.error('调用成就问答API失败:', error);
    // 返回默认错误消息
    return '贫僧修行尚浅，此问题暂未能解，待我西行归来再为你解惑。';
  }
};

//
// export const getAnswer = async (queryInfo: QueryInfo): Promise<AnswerInfo> => {
//     return axios.post<AnswerInfo>(`${RAG_MODULE}/get`, queryInfo, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     }).then(response => response.data);
// };