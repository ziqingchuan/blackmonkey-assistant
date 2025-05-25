export interface WukongDBInfo {
    pk: number; // 内容的id
    text: string; // 知识库中一条数据的主内容 eg: 《黑神话：悟空》是由杭州游科互动科技有限公司开发，浙江出版集团数字传媒有限公司出版的西游题材单机动作角色扮演游戏。
    category: string; // 内容的分类 eg: 开发背景 | 游戏攻略 | 关卡信息
    source: string; // 内容的来源 eg: 百度百科 | 游民星空 | 知乎 | 百度贴吧
}

export interface DataBase {
    id: number; // 数据库的类别区分
    name: string;
    database: WukongDBInfo[]; // 数据库信息, 后续会扩展其他类型的info
}

export interface insertWukongDBInfo {
    text: string;
    source: string;
}