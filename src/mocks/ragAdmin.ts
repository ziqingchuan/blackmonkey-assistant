import  type { WukongDBInfo } from '../apis/database.ts'

export const mockWukongDB = [
    {
        pk: 10001,
        text: '《黑神话：悟空》是一款以中国古代名著《西游记》为基础的动作角色扮演游戏。',
        category: '游戏概述',
        source: '百度百科',
    },
    {
        pk: 10002,
        text: '游戏的主角是吴猴，即孙悟空，玩家将体验他的冒险故事。',
        category: '角色',
        source: 'IGN',
    },
    {
        pk: 10003,
        text: '《黑神话：悟空》采用了虚幻引擎4开发，画面细腻，特效华丽。',
        category: '游戏引擎',
        source: '游戏日报',
    },
    {
        pk: 10004,
        text: '这款游戏的战斗系统结合了传统动作和现代RPG元素，让玩家可以自由探索和战斗。',
        category: '游戏机制',
        source: '游戏时光',
    },
    {
        pk: 10005,
        text: '《黑神话：悟空》的故事融入了丰富的中国神话元素，展现了各种神仙妖怪的形象。',
        category: '故事设定',
        source: '网易游戏',
    },
    {
        pk: 10006,
        text: '游戏的画风独特，以中国风为主题，色彩丰富且细致。',
        category: '美术风格',
        source: '游侠网',
    },
    {
        pk: 10007,
        text: '开发团队致力于将传统文化与现代游戏技术相结合，为玩家提供深度体验。',
        category: '开发团队',
        source: 'GameLook',
    },
    {
        pk: 10008,
        text: '在游戏中，玩家可以体验到具有挑战性的boss战，每个boss都有独特的技能和战斗风格。',
        category: '游戏玩法',
        source: '17173',
    },
    {
        pk: 10009,
        text: '《黑神话：悟空》的宣传片在多个平台引发了巨大的关注，吸引了大量玩家的期待。',
        category: '宣传情况',
        source: 'Polygon',
    },
    {
        pk: 10010,
        text: '游戏开发团队表示，《黑神话：悟空》将于2024年正式发售。',
        category: '发售信息',
        source: '微博',
    },
    {
        pk: 10011,
        text: '吴承恩的《西游记》为《黑神话：悟空》的故事背景提供了丰富的素材。',
        category: '文学来源',
        source: '搜狐游戏',
    },
    {
        pk: 10012,
        text: '游戏内的怪物设计灵感源自于传统中国的妖怪故事，极具特色。',
        category: '怪物设计',
        source: '刀客网络',
    },
    {
        pk: 10013,
        text: '《黑神话：悟空》在E3展会上首次亮相，得到了媒体的高度评价。',
        category: '展会表现',
        source: '电玩巴士',
    },
    {
        pk: 10014,
        text: '游戏中有多个不同的场景，玩家将穿越山川、河流与不同的神话场景。',
        category: '场景设定',
        source: '游戏通',
    },
    {
        pk: 10015,
        text: '《黑神话：悟空》的配乐由著名作曲家创作，音乐与游戏氛围紧密结合。',
        category: '音乐',
        source: '音乐之家',
    },
    {
        pk: 10016,
        text: '该游戏在角色设计上力求还原《西游记》中的经典角色与形象。',
        category: '角色设计',
        source: '游戏基地',
    },
    {
        pk: 10017,
        text: '《黑神话：悟空》的游戏理念是“传承与创新”，希望吸引年轻玩家。',
        category: '游戏理念',
        source: '游戏研究',
    },
    {
        pk: 10018,
        text: '玩家可以使用多种技能与你的敌人进行战斗，这为战斗增添了战略性。',
        category: '技能系统',
        source: '巴哈姆特',
    },
    {
        pk: 10019,
        text: '《黑神话：悟空》受到了全球范围内玩家的关注，尤其是在欧美市场。',
        category: '市场前景',
        source: '策略乙',
    },
    {
        pk: 10020,
        text: '游戏的预告片展示了令人惊叹的打斗场面与美丽的风景画面。',
        category: '游戏预告',
        source: 'TechCrunch',
    },
    {
        pk: 10021,
        text: '在游戏中，孙悟空的形象与传统文化中的形象相契合，充满中国风。',
        category: '形象分析',
        source: '优酷',
    },
    {
        pk: 10022,
        text: '《黑神话：悟空》拥有丰富的任务系统，玩家需要完成各种主线和支线任务。',
        category: '任务系统',
        source: '游戏观察',
    },
    {
        pk: 10023,
        text: '游戏中的剧情设置围绕着孙悟空的成长历程，展现了他的善与恶的抉择。',
        category: '剧情分析',
        source: '腾讯游戏',
    },
    {
        pk: 10024,
        text: '《黑神话：悟空》的目标是在叙事与游戏玩法之间找到平衡。',
        category: '设计目标',
        source: '游戏开发者',
    },
    {
        pk: 10025,
        text: '游戏中的NPC（非玩家角色）将提供任务和故事背景，增加代入感。',
        category: 'NPC设计',
        source: '游民星空',
    }
];

// 初始数据（深拷贝，避免污染原数据）
let mockDB: WukongDBInfo[] = JSON.parse(JSON.stringify(mockWukongDB));

// 获取所有数据
export const getAllWukongData = (): Promise<WukongDBInfo[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...mockDB]), 500);
    });
};

// 插入数据
export const insertWukongData = async (data: WukongDBInfo): Promise<number> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newPk = Math.max(...mockDB.map(item => item.pk)) + 1; // 生成新 pk
            const newItem = { ...data, pk: newPk ,category: "默认类别"};
            mockDB.push(newItem);
            resolve(newPk);
        }, 500);
    });
};

// 删除数据
export const deleteWukongData = async (pk: number): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const initialLength = mockDB.length;
            mockDB = mockDB.filter(item => item.pk !== pk);
            resolve(mockDB.length < initialLength); // 返回是否删除成功
        }, 500);
    });
};

// 更新数据
export const updateWukongData = async (data: WukongDBInfo): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = mockDB.findIndex(item => item.pk === data.pk);
            if (index !== -1) {
                mockDB[index] = { ...data }; // 直接替换整个对象
                resolve(true); // 返回成功
            } else {
                resolve(false); // 返回失败（未找到对应 pk）
            }
        }, 500);
    });
};

// 获取单条数据详情
export const getWukongDataDetail = async (pk: number): Promise<WukongDBInfo | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = mockDB.find(item => item.pk === pk);
            resolve(item || null);
        }, 500);
    });
};
