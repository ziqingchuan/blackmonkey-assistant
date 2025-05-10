export interface QueryInfo {
    question: string;
    searchStrategy: number;
    resultCount: number;
    similarity: number;
}

export interface Content {
    text: string;
    role: 'USER' | 'RAG';
}

export interface Dialog {
    id: number;
    userId: number;
    title: string;
    createTime: Date;
    contentList: Content[];
}

export interface ConfigParams {
    searchStrategy: number;
    resultCount: number;
    similarity: number;
}