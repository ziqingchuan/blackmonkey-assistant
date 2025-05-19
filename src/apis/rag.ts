export interface QueryInfo {
    question: string;
    searchStrategy: number;
    resultCount: number;
    similarity: number;
}

export interface AnswerInfo {
    answer: string;
    sourceDoc: SourceDoc[];
}

export interface SourceDoc {
    source: string;
    category: string;
    content: string;
}

export interface Content {
    text: string;
    role: 'USER' | 'RAG';
    sourceDoc?: SourceDoc[];
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