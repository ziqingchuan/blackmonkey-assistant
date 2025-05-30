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
//
// export const getAnswer = async (queryInfo: QueryInfo): Promise<AnswerInfo> => {
//     return axios.post<AnswerInfo>(`${RAG_MODULE}/get`, queryInfo, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     }).then(response => response.data);
// };