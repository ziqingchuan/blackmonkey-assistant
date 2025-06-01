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
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      // 武学相关的回答模板
      const combatAnswers = [
        `关于"${question}"之武学，贫僧有如下见解：\n\n• 心法修炼：需日夜不辞，心境如水\n• 招式演练：千遍不厌，万遍方熟\n• 实战运用：因敌制胜，随机应变\n\n记住，武学之道在于悟性，非一朝一夕可成。`,
        
        `"${question}"乃武学精要，需分三阶段修炼：\n\n一阶：筑基立根 - 打熬筋骨，练就基本功\n二阶：融会贯通 - 将各路招式融为一体\n三阶：返璞归真 - 无招胜有招，随心所欲\n\n切记：练武不练功，到老一场空。`,
        
        `天命人所问"${question}"，正是武学要领：\n\n🥋 棍法精髓：一力降十会，速度制胜敌\n⚔️ 战术要诀：知己知彼，百战不殆\n🧘 内功心法：气沉丹田，神凝如岳\n\n此道需勤修苦练，方能大成。`,
        
        `关于"${question}"的武学奥义：\n\n📜 古法传承：师父领进门，修行在个人\n🌟 要诀口诀：手眼身法步，精神气力功\n⚡ 实战心得：料敌先机，制人而不制于人\n\n武学之路漫长，需持之以恒。`,
        
        `"${question}"之道，贫僧略有心得：\n\n🎯 技法要点：\n• 攻守并重，进退有序\n• 刚柔相济，虚实结合\n• 因时制宜，因地制宜\n\n💡 修炼要领：\n• 先练形，后练意\n• 先求准，后求快\n• 先明理，后求变\n\n天命人可细细体悟。`
      ];

      const randomAnswer = combatAnswers[Math.floor(Math.random() * combatAnswers.length)];
      resolve(randomAnswer);
    }, 1500);
  });
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