// ==================== 接口定义 ====================

/**
 * 棍法类型
 */
export type StickType = '劈棍' | '立棍' | '截棍';

/**
 * 消息类型 - 用于区分不同阶段的秘籍内容
 */
export type MessageType = 'welcome' | 'school_recommendation' | 'training_progress' | 'combat_training' | 'advanced_schools' | 'advanced_school_details';

/**
 * 对话消息接口
 */
export interface ConversationMessage {
  role: 'RAG' | 'USER';
  content: string;
  timestamp: number;
  messageType?: MessageType;
  stickType?: StickType;
}

/**
 * 系统消息响应
 */
export interface SystemMessageResponse {
  success: boolean;
  message: string;
  data: {
    content: string;
    hasChoices: boolean;
    choices?: StickChoice[];
    messageType?: MessageType; // 新增：消息类型
  };
}

/**
 * 棍法选择项
 */
export interface StickChoice {
  id: StickType;
  name: string;
  description: string;
}

/**
 * 流派信息
 */
export interface SchoolInfo {
  name: string;
  description: string;
}

/**
 * 棍法秘籍内容
 */
export interface StickMethodContent {
  title: string;
  description: string;
  techniques: string;
  videoUrl: string;
}

/**
 * 流派详细说明内容
 */
export interface SchoolDetailContent {
  name: string;
  title: string;
  description: string;
  strategy: string;
  videoUrl: string;
}

/**
 * 流派攻略内容
 */
export interface SchoolStrategyContent {
  name: string;
  title: string;
  talentPoints: string;
  equipment: string;
  operation: string;
  tips: string;
}

/**
 * 实战演示内容
 */
export interface CombatDemoContent {
  name: string;
  title: string;
  description: string;
  operationSteps: string;
  videoUrl: string;
}

/**
 * 秘籍响应
 */
export interface ScriptureResponse {
  success: boolean;
  message: string;
  data: {
    methods: StickMethodContent[];
    schools?: SchoolDetailContent[]; // 流派说明
    strategies?: SchoolStrategyContent[]; // 流派攻略
    combatDemos?: CombatDemoContent[]; // 实战演示
    messageType: MessageType; // 消息类型
  };
}

/**
 * 流派推荐响应
 */
export interface SchoolRecommendationResponse {
  success: boolean;
  message: string;
  data: {
    stickType: StickType;
    content: string;
    schools: SchoolInfo[];
    philosophy: string;
  };
}

// ==================== 数据存储 ====================

/**
 * 棍法选择数据
 */
const STICK_CHOICES: StickChoice[] = [
  {
    id: '劈棍',
    name: '劈棍',
    description: '开天辟地，势大力沉'
  },
  {
    id: '立棍',
    name: '立棍',
    description: '中正平和，守中用攻'
  },
  {
    id: '截棍',
    name: '截棍',
    description: '短打疾击，敏捷如风'
  }
];

/**
 * 各棍法对应的流派推荐
 */
const SCHOOL_RECOMMENDATIONS: Record<StickType, SchoolRecommendationResponse['data']> = {
  '劈棍': {
    stickType: '劈棍',
    content: '善哉！劈棍乃天罡正法，老夫为你推荐三大流派',
    schools: [
      {
        name: '禁字劈棍流',
        description: '以禁制之法，克己制敌'
      },
      {
        name: '隐身劈棍流',
        description: '身形如鬼魅，出手如雷霆'
      },
      {
        name: '花棍劈棍流',
        description: '棍法华丽多变，眼花缭乱'
      }
    ],
    philosophy: '此三派各有玄机，需依你悟性选择。记住，劈棍之道在于势，势起则无坚不摧。<br>（蓄力劈棍流主打远离观望，猥琐蓄力，敲一棒就跑。完全做到点到为止，点完就滚。是所有流派最爽、最猥琐、最暴力的流派。感受核爆的威力吧！）'
  },
  '立棍': {
    stickType: '立棍',
    content: '妙哉！立棍乃中庸至道，老夫为你推荐两大流派',
    schools: [
      {
        name: '安身立棍流',
        description: '立身如山，不动如岳'
      },
      {
        name: '隐身立棍流',
        description: '身隐于无形，棍现于瞬间'
      }
    ],
    philosophy: '此三派皆重心法，需静心体悟。记住，立棍之道在于守，守中有攻，攻中有守。<br>（什么是闪避？什么是蓄力？什么是万物起源？天下武功，唯立不破。本派主打防御法术回血拉满，遇到boss先画个圈圈诅咒它，然后立立立，敲一棒。能立起来就绝不闪避，能坐轮椅就绝不站立！）'
  },
  '截棍': {
    stickType: '截棍',
    content: '奇哉！截棍乃灵巧变化，老夫为你推荐两大流派',
    schools: [
      {
        name: '戳棍搅棍流',
        description: '一戳一搅，变化无穷'
      },
      {
        name: '退寸进尺流',
        description: '退一寸，进一尺，以退为进'
      }
    ],
    philosophy: '此两派重在巧劲，需苦练身法。记住，截棍之道在于快，快则制人，慢则制于人。<br>（戳棍流讲究一进一出，可进可退，在敌人的攻击范围内出入自如。看准时机便能直捣黄龙，直接开搅！我愿称该流派为:黑神话赵云！）'
  }
};

/**
 * 武学秘籍数据
 */
const STICK_METHODS_SCRIPTURE: StickMethodContent[] = [
  {
    title: '劈棍心法',
    description: '非蓄力重击，两段前摇中首段可移动，蓄力后添加跃起下劈威力，棍势消耗越多，攻击范围与威力愈强，适合应对小体型，攻击欲望不怎么强的敌人。',
    techniques: '劈棍切手技"破棍势"，招式前摇起跳时有一段无敌时间，期间被攻击可以获得增益，下劈攻击冲击力大，更容易打出怪物硬直。切手二段延长棍棒跳起下劈，造成一次伤害判定。基本百分百打出硬直！',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  {
    title: '立棍心法',
    description: '以稳制胜，立棍规避地面攻击，蓄力期间无法移动，但防御与伤害并蓄，对群敌尤为有效。',
    techniques: '立棍切手技"风云转"，撑起身造成一次伤害判定，而后绕棍踢击周围敌人，对周围单位造成一次伤害判定，若持续按技能则会消耗大量体力，持续绕棍攻击，适合对付群怪。立棍的重击需要在比较灵活的场景释放。有些场景有奇效。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E7%AB%8B%E6%A3%8D.mp4'
  },
  {
    title: '戳棍心法',
    description: '远程攻击，收棍蓄势，向前延伸棍影，一击必中。蓄力期间虽固定身形，但棍势加成让攻击距离与威力倍增。',
    techniques: '"回头望月"切手技，非常适合平时跑图用，也很适合打难近身，攻击段数多，攻击欲望高的怪物的怪物，此外，戳棍冲击力高，容易打出硬值，如果正常boss战攒到了三层棍势，推荐用戳棍打出去，戳棍最稳最不容易空。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E6%88%AA%E6%A3%8D.mp4'
  }
];

/**
 * 上层流派数据 - 第五条消息的秘籍内容
 */
const ADVANCED_SCHOOLS_SCRIPTURE: StickMethodContent[] = [
  {
    title: '毛毛流',
    description: '一、天赋加点推荐\n1、身外身法就是毛毛流的主要输出手段优先点满。\n2、定身法点满增加天命人和毛猴的输出。\n3、聚形散气左边点两级可以加长隐身时间。\n4、棍法点三段棍势，不需要第四段，劈棍左边能点满最好点满加伤害。\n5、根基选择法力值和暴击率点满，可以共享给毛猴。',
    techniques: '二、装备方案\n1、精魄必备百目真人，法宝带定风珠。\n2、仙丹全部炼法力值加成的，提升蓝量。\n3、珍玩带小老虎和手串，提升连击伤害以及暴击率加成。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  {
    title: '毒虫流',
    description: '第一点必需品\n1）【法宝-绣花针】-当然了，毕竟我们的流派叫【毒绣花】\n2）【变化-藕雹-加点加满】-就是图中这个丑怪。这个是打糜道人掉落的\n3）【毫毛-身外化法（分身）】只需点出：存身、仗势、契合、同寿即可\n4）【奇术-定身法】有就行，如果想点，点出瞬机即可',
    techniques: '半必需品（不过都已经有绣花针了，这些装备大家应该也都有了）\n1）【珍玩-卵中骨*3】想必大家背包里都有\n2）【衣甲-昆蚑毒敌甲】打毒敌大王掉的...我真的想吐槽这个BOSS\n3）【精魄-广谋】这个...这个大家一定会有的，条件允许可以升几级增加伤害\n4）【头冠-长嘴脸】我目前的收藏里除武器外唯一有加攻击力的装备。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  {
    title: '永冻流',
    description: '永冻流的整体玩法就是通过法宝芭蕉扇打出控制后再用化身技打出冰冻，冰冻期间用棍花持续输出同时积攒元气和棍势，再利用三或四棍势打出一波爆发输出，基本上一套打完元气又满了，可以再放芭蕉扇控制，如此往复。低韧性的BOSS可以无限连到死，即使有时候没有存满元气也可以用定身术弥补，容错率非常高。',
    techniques: '棍法可以自由选择，劈棍可以跑动蓄力比较灵活，伤害也比较高，但是重击前摇长距离短容易打空，戳棍重击距离长出手快 ，稍微升级后命中还可以回体力，立棍就是比较安全。棍法也可以看武器用什么就改哪个，比如用枪类可以带戳棍劈棍，用龙棍可以带立棍。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  {
    title: '风灵月影流',
    description: '一个古老的流派，神秘而强大，为师只在江湖听闻其名，你可自行去江湖寻找机缘。',
    techniques: '此流派深不可测，需要修行者自己探索其中的奥秘。传说中掌握此流派的武者，身法如风，速度如影，来去无踪。',
    videoUrl: ''
  }
];

/**
 * 各流派的详细说明数据
 */
const SCHOOL_DETAILS: Record<string, SchoolDetailContent> = {
  // 劈棍流派
  '禁字劈棍流': {
    name: '禁字劈棍流',
    title: '禁字法·舍身成魔',
    description: '禁字法作为这游戏单独的一个流派，使用了禁字法就无法再使用任何法术和变身。',
    strategy: '禁字法的核心就是所有临时属性都可以作为半永久属性（持续至长休）提供给攻击力和暴击率。在前期，使用禁字法可以极大节省技能点数，因为不需要点身法和毫毛，甚至在开完禁字法后，可以在土地庙把禁字法的点数全部重置，完全不影响当前属性。由于不能使用技能，法力神力元气也都不会消耗，所以在开荒推图过程中几乎不需要休息，走过的路小怪也不会刷新，迷路玩家的福音。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E7%AB%8B%E6%A3%8D.mp4'
  },
  '隐身劈棍流': {
    name: '隐身劈棍流',
    title: '鬼影劈天·一击必杀',
    description: '是一种高效的战斗策略，它结合了隐身和劈棍的高伤害输出。',
    strategy: '核心就是三蓄劈棍重击，依靠定身、隐身来保证命中和提高伤害，因为大部分时间都在围着boss跑路，走的是一击脱离的路子，三蓄重棍下去敌人一般必出硬直。此流派讲究时机把握，需要观察敌人招式间隙，找准机会潜行接近，一棍定乾坤。适合喜欢猥琐发育、出其不意的修行者。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E7%AB%8B%E6%A3%8D.mp4'
  },
  '花棍劈棍流': {
    name: '花棍劈棍流',
    title: '花开满天·豆雨连珠',
    description: '目前最为流行的一种打法，华丽且实用，攻守兼备。',
    strategy: '核心思路是点出棍花蓄豆跟四段棍势，用棍花的高频攻击快速蓄豆，再砸一个四段重棍。该加点很适合应对出手较慢的BOSS，因为四段重棍具有高额削韧，一下去能破BOSS出手，如果时机卡得好，能做到无限打断。没卡好时机的话，还可以用定身术来破招，进行一个完全的棍花+重棍。此流派华丽多变，观赏性极强。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E7%AB%8B%E6%A3%8D.mp4'
  },
  
  // 立棍流派
  '安身立棍流': {
    name: '安身立棍流',
    title: '泰山不倒·稳如磐石',
    description: '立身如山，不动如岳，以守为攻的至高境界。',
    strategy: '核心在于利用立棍的超强防御能力和范围攻击，配合安身法术提供的护盾和减伤效果，形成铜墙铁壁般的防线。在敌人攻击时立棍格挡，积攒棍势后发动毁天灭地的反击。此流派适合新手修行者，容错率极高，即使失误也不易暴毙。但需要耐心，切忌急躁冒进。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E7%AB%8B%E6%A3%8D.mp4'
  },
  '隐身立棍流': {
    name: '隐身立棍流',
    title: '虚无缥缈·神出鬼没',
    description: '身隐于无形，棍现于瞬间，攻守转换如鬼神莫测。',
    strategy: '结合隐身术的完美时机掌控和立棍的强大防御反击能力。利用隐身接近敌人，在最佳位置发动立棍，既能有效防御也能对周围敌人造成大面积伤害。这种打法需要对敌人的攻击模式有深度理解，找准隐身和立棍的最佳时机。适合追求技巧和策略的高阶修行者。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E7%AB%8B%E6%A3%8D.mp4'
  },
  
  // 截棍流派  
  '戳棍搅棍流': {
    name: '戳棍搅棍流',
    title: '龙蛇飞舞·搅动风云',
    description: '一戳一搅，变化无穷，如龙蛇出洞般灵动多变。',
    strategy: '以戳棍的远程精准打击为主，配合搅棍的近身连击。先用戳棍远程消耗敌人，打出硬直后立即切换搅棍近身连击。这种打法节奏感极强，需要熟练掌握戳搅转换的时机。适合喜欢华丽连招和操作流的修行者，但需要大量练习才能发挥出真正威力。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E7%AB%8B%E6%A3%8D.mp4'
  },
  '退寸进尺流': {
    name: '退寸进尺流', 
    title: '以退为进·后发制人',
    description: '退一寸，进一尺，以退为进，后发制人的高深策略。',
    strategy: '核心理念是通过主动后撤来诱导敌人攻击，在敌人攻击落空的瞬间发动致命反击。利用戳棍的机动性和射程优势，保持安全距离的同时寻找反击机会。这种打法需要极高的走位技巧和预判能力，但掌握后几乎可以做到毫发无伤地击败强敌。是真正的以弱胜强之道。',
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E7%AB%8B%E6%A3%8D.mp4'
  }
};

/**
 * 各流派的详细攻略数据
 */
const SCHOOL_STRATEGIES: Record<string, SchoolStrategyContent> = {
  '禁字劈棍流': {
    name: '禁字劈棍流',
    title: '禁字劈棍流 · 战前准备',
    talentPoints: `
      <strong>天赋加点：</strong><br>
      根基：前期先把能够增加法力和气力的节点全部点出并点满<br>
      【武艺】把左边一列点亮，右边点到第二排即可<br>
      棍法：1、劈棍直接无脑拉满，点满20点的时候记得把左下方的【四段棍势】给点出来；2、推荐玩家把跑步蓄力也点出来，攒到三颗豆的时候直接重棍带走<br>
      奇术：直接把【禁字法】全部点满，如果前期点数不够那就先把法力和气力可以转换的效果优先点出来
    `,
    equipment: `
      <strong>所需装备：</strong><br>
      1. 禁字诀（瓜田任务解锁）<br>
      2. 雷火印（雷音寺法师概率掉落，越多越好，不够就上不求人）<br>
      3. 定颜珠（百眼魔君通关后观门开箱）<br>
      4. 百目真人<br>
      5. 不能<br>
      6. 兽与佛、白贝腰链、猫晴宝串<br><br>
      
      <strong>装备方面：</strong><br>
      选择羽士套（有下毒手的可以替换）<br>
      武器选择暴击攻击最高的<br>
      葫芦选择秒仙葫芦<br>
      泡酒物酒食（宗旨就是选择一切加伤害的）
    `,
    operation: `
      <strong>流派优点：</strong><br>
      1. 用机制换数值，低周目boss血皮薄，很容易被这套乱拳打死<br><br>
      
      <strong>流派缺点：</strong><br>
      1. 失去大部分保命手段，自身非常脆<br>
      2. 打高周目boss时，无法莽死boss，又没在低周目吸取足够经验，会导致容易坐牢
    `,
    tips: `
      <strong>战前准备要点：</strong><br>
      确保所有装备和天赋点都按照上述方案配置完毕，这是禁字劈棍流发挥威力的基础。记住，这是一个高风险高回报的流派，适合追求极致伤害输出的玩家。<br><br>
      
      <strong>注意事项：</strong><br>
      由于失去了大部分保命手段，战前准备更显重要。务必确保装备搭配合理，天赋加点到位，这样才能在战斗中发挥出禁字法的真正威力。
    `
  },
  '隐身劈棍流': {
    name: '隐身劈棍流',
    title: '隐身劈棍流 · 完整攻略',
    talentPoints: `
      <strong>天赋加点：</strong><br>
      根基：优先增加气力和敏捷的节点，提升移动速度和隐身持续时间<br>
      【武艺】左边一列点亮，右边重点投资身法相关技能<br>
      棍法：劈棍点到15级即可，重点投资【三蓄棍势】和【移动蓄力】<br>
      奇术：【隐身术】必须点满，【定身术】辅助控制，【移形换影】增强机动性
    `,
    equipment: `
      <strong>所需装备：</strong><br>
      1. 隐身诀（乌鸡国任务线获得）<br>
      2. 影分身符（小西天商店购买）<br>
      3. 疾风靴（增加移动速度）<br>
      4. 夜行衣（延长隐身时间）<br>
      5. 暗影面具<br>
      6. 鬼魅腰带、潜行护腕、敏捷项链<br><br>
      
      <strong>装备方面：</strong><br>
      选择刺客套装（提升背刺伤害）<br>
      武器选择速度和暴击双高的<br>
      葫芦选择能量恢复类型<br>
      药品重点配置隐身和移速增强类
    `,
    operation: `
      <strong>战斗操作要领：</strong><br>
      开局立即隐身绕后，找准敌人破绽发动三蓄劈棍。一击不中立即拉开距离重新隐身。利用地形和障碍物进行掩护，保持距离优势。<br><br>
      
      <strong>核心连招：</strong><br>
      隐身→绕后→三蓄劲棍→背刺暴击→立即脱离→再次隐身→寻找下次机会。对付血厚的BOSS可以用定身术控制后连续攻击。记住：能偷袭绝不正面，能一击绝不连击。
    `,
    tips: `
      <strong>实战技巧：</strong><br>
      此流派的核心在于耐心和时机把握。不要贪刀，宁可多跑几圈也要确保安全。利用环境优势，如高低差、柱子、障碍物等。合理使用道具恢复隐身状态。<br><br>
      
      <strong>注意事项：</strong><br>
      避免在开阔地带战斗，选择有掩体的地形。保持法力充足，确保能够连续使用隐身术。对付群体敌人时优先清理察觉能力强的单位。
    `
  },
  '花棍劈棍流': {
    name: '花棍劈棍流',
    title: '花棍劈棍流 · 完整攻略',
    talentPoints: `
      <strong>天赋加点：</strong><br>
      根基：平衡发展，气力和法力各占一半<br>
      【武艺】全面投资，左右两列都要点亮<br>
      棍法：【棍花】点满，【豆蓄技巧】点满，【四段棍势】必点，【连击精通】优先<br>
      奇术：【眩晕术】、【加速术】、【恢复术】平衡发展
    `,
    equipment: `
      <strong>所需装备：</strong><br>
      1. 花棍秘籍（花果山任务奖励）<br>
      2. 连击手环（增加连击数量）<br>
      3. 节奏护符（提升攻击节拍）<br>
      4. 华丽战袍（增加棍花威力）<br>
      5. 眩晕宝石<br>
      6. 速度腰带、连击护腕、节奏项链<br><br>
      
      <strong>装备方面：</strong><br>
      选择表演者套装（提升棍花效果）<br>
      武器选择连击和花哨度双高的<br>
      葫芦选择平衡恢复类型<br>
      药品配置连击增强和体力恢复类
    `,
    operation: `
      <strong>战斗节奏掌控：</strong><br>
      开局棍花迷惑敌人，快速积攒豆子。利用连击机制保持攻击节奏，不给敌人反击机会。四段棍势释放时机要精准，配合眩晕效果确保命中。<br><br>
      
      <strong>连招技巧：</strong><br>
      棍花起手→连续轻击蓄豆→眩晕控制→四段重击→再次棍花→无限循环。关键在于保持攻击节奏不断，让敌人始终处于被动状态。
    `,
    tips: `
      <strong>实战心得：</strong><br>
      花棍流的魅力在于华丽的连击和持续的压制力。虽然单次伤害不如其他流派，但胜在稳定和安全。适合喜欢操作感和节奏感的玩家。<br><br>
      
      <strong>进阶技巧：</strong><br>
      熟练后可以在棍花中穿插各种技能，形成独特的战斗风格。利用眩晕时间窗口进行装备切换或道具使用。保持体力充足，连击流最怕中途断节奏。
    `
  },
  '安身立棍流': {
    name: '安身立棍流',
    title: '安身立棍流 · 完整攻略',
    talentPoints: `
      <strong>天赋加点：</strong><br>
      根基：全力投资生命和防御相关节点<br>
      【武艺】防御技能优先，格挡和反击要点满<br>
      棍法：【立棍精通】点满，【防御立棍】、【反击立棍】重点投资<br>
      奇术：【安身术】必须点满，【回血术】、【护盾术】辅助生存
    `,
    equipment: `
      <strong>所需装备：</strong><br>
      1. 安身诀（土地庙系列任务获得）<br>
      2. 护盾符文（增加防御力）<br>
      3. 回血宝珠（持续恢复生命）<br>
      4. 不动明王像（增加定力）<br>
      5. 坚固护甲<br>
      6. 防御腰带、护盾护腕、坚韧项链<br><br>
      
      <strong>装备方面：</strong><br>
      选择守护者套装（全面提升防御）<br>
      武器选择防御和生命双加成的<br>
      葫芦选择生命恢复专精<br>
      药品主要配置各类回血和护盾药物
    `,
    operation: `
      <strong>防守反击战术：</strong><br>
      开局立即开启安身术，保持立棍防御姿态。利用敌人攻击间隙进行回血，积攒能量后发动强力反击。重点在于耐心等待，不急于求成。<br><br>
      
      <strong>核心策略：</strong><br>
      立棍防御→承受伤害→触发回血→积攒反击能量→爆发攻击→继续防御循环。关键是把握反击时机，一击要有足够威力震慑敌人。
    `,
    tips: `
      <strong>生存要诀：</strong><br>
      安身立棍流的精髓在于"稳"。宁可多花时间，也要确保安全。合理利用地形优势，背靠墙壁或高地。保持药品充足，随时准备应对突发情况。<br><br>
      
      <strong>高级技巧：</strong><br>
      熟练掌握反击时机窗口，利用完美格挡触发额外效果。在团队战中承担坦克角色，为队友创造输出空间。面对强敌时可以采用消耗战术。
    `
  },
  '隐身立棍流': {
    name: '隐身立棍流',
    title: '隐身立棍流 · 完整攻略',
    talentPoints: `
      <strong>天赋加点：</strong><br>
      根基：气力和法力平衡发展，兼顾生存能力<br>
      【武艺】身法和防御技能并重发展<br>
      棍法：【立棍精通】和【隐身立棍】优先，【范围立棍】后期必点<br>
      奇术：【隐身术】和【安身术】双修，【瞬移术】增强机动性
    `,
    equipment: `
      <strong>所需装备：</strong><br>
      1. 隐身安身双修诀（特殊任务获得）<br>
      2. 影身护符（隐身时防御不减）<br>
      3. 虚实宝珠（隐身与实体切换）<br>
      4. 幻影战甲（减少隐身消耗）<br>
      5. 双面面具<br>
      6. 隐匿腰带、幻象护腕、虚实项链<br><br>
      
      <strong>装备方面：</strong><br>
      选择幻影守护套装（隐身防御特化）<br>
      武器选择攻防平衡型<br>
      葫芦选择能量回复型<br>
      药品配置隐身延长和防御增强类
    `,
    operation: `
      <strong>虚实转换战法：</strong><br>
      隐身接近敌人→选择最佳位置→现身立棍防御→吸收伤害积蓄反击→隐身脱离→重新布局。关键在于掌握隐身和现身的时机，做到攻守转换自如。<br><br>
      
      <strong>高级战术：</strong><br>
      利用隐身状态观察敌人攻击模式→在最佳时机现身立棍→利用范围攻击打击多个目标→根据情况选择继续战斗或重新隐身。
    `,
    tips: `
      <strong>虚实精要：</strong><br>
      这是最难掌握但也最全面的流派。需要同时精通隐身技巧和防御反击。适合喜欢策略性战斗的高手玩家。实战中要灵活运用虚实转换。<br><br>
      
      <strong>大师境界：</strong><br>
      当你能够在隐身、防御、攻击之间无缝切换时，就达到了此流派的最高境界。敌人将永远无法预测你的下一步行动，这就是虚实之道的精髓。
    `
  },
  '戳棍搅棍流': {
    name: '戳棍搅棍流',
    title: '戳棍搅棍流 · 完整攻略',
    talentPoints: `
      <strong>天赋加点：</strong><br>
      根基：优先气力和速度，提升连击能力<br>
      【武艺】速度技能优先，连击和穿刺专精<br>
      棍法：【戳棍精通】和【搅棍精通】并重，【连环戳击】、【旋风搅棍】必点<br>
      奇术：【加速术】、【穿透术】、【旋风术】配合战法
    `,
    equipment: `
      <strong>所需装备：</strong><br>
      1. 戳搅双修诀（黑风山试炼获得）<br>
      2. 穿透宝石（增加戳击威力）<br>
      3. 旋风符文（提升搅棍范围）<br>
      4. 龙蛇战衣（增加灵活性）<br>
      5. 连击面具<br>
      6. 速度腰带、连击护腕、穿透项链<br><br>
      
      <strong>装备方面：</strong><br>
      选择敏捷突击套装（速度特化）<br>
      武器选择速度和穿透力双高的<br>
      葫芦选择能量快速恢复型<br>
      药品配置速度增强和连击延长类
    `,
    operation: `
      <strong>龙蛇战法：</strong><br>
      远程戳击消耗敌人→快速接近转换搅棍→连环攻击不给喘息→打出硬直后戳击终结→再次拉开距离。关键在于距离控制和攻击转换的流畅性。<br><br>
      
      <strong>连招精要：</strong><br>
      戳击起手→敌人硬直→冲刺搅棍→连环旋转→戳击穿刺→循环往复。每一次转换都要精准无误，形成如龙蛇般流畅的攻击节奏。
    `,
    tips: `
      <strong>龙蛇之道：</strong><br>
      此流派要求极高的操作技巧和节奏感。需要大量练习才能熟练掌握戳搅转换。适合追求华丽操作和连击快感的玩家。实战中保持攻击节奏不断是关键。<br><br>
      
      <strong>进阶秘诀：</strong><br>
      熟练后可以根据敌人类型调整戳搅比例。对付单体强敌多用戳击，对付群体多用搅棍。利用旋转攻击的无敌帧躲避反击，这是高手的标志。
    `
  },
  '退寸进尺流': {
    name: '退寸进尺流',
    title: '退寸进尺流 · 完整攻略',
    talentPoints: `
      <strong>天赋加点：</strong><br>
      根基：敏捷和预判能力优先，移动速度相关节点<br>
      【武艺】闪避技能点满，反击技能重点投资<br>
      棍法：【机动戳棍】、【闪避戳击】、【反击戳棍】必须点满<br>
      奇术：【瞬移术】、【预知术】、【减速术】辅助战术
    `,
    equipment: `
      <strong>所需装备：</strong><br>
      1. 进退如意诀（取经路试炼获得）<br>
      2. 预判水晶（提前感知攻击）<br>
      3. 闪避羽毛（增加闪避成功率）<br>
      4. 反击战甲（反击伤害提升）<br>
      5. 机动面具<br>
      6. 敏捷腰带、闪避护腕、反击项链<br><br>
      
      <strong>装备方面：</strong><br>
      选择游侠套装（移动和反击特化）<br>
      武器选择速度和机动性最高的<br>
      葫芦选择瞬间爆发型<br>
      药品配置速度和反应能力增强类
    `,
    operation: `
      <strong>以退为进战法：</strong><br>
      主动后撤诱导敌人攻击→精准预判闪避→敌人攻击落空瞬间→立即反击戳击→再次后撤等待下次机会。每一次交锋都要确保自己处于有利位置。<br><br>
      
      <strong>高级技巧：</strong><br>
      利用地形优势创造后撤空间→诱导敌人进入预设攻击范围→完美时机反击→连续多次成功后可以主动进攻→但始终保持退路准备。
    `,
    tips: `
      <strong>进退精髓：</strong><br>
      这是最考验预判能力和心理战的流派。需要对敌人的攻击模式有深度理解。适合喜欢策略性战斗和心理博弈的玩家。耐心是最重要的品质。<br><br>
      
      <strong>大师之路：</strong><br>
      当你能够完美预判敌人每一次攻击，并且每次反击都能造成关键伤害时，你就掌握了以退为进的真谛。这是真正的后发制人，以弱胜强之道。
    `
  }
};

/**
 * 各流派的实战演示数据
 */
const SCHOOL_COMBAT_DEMOS: Record<string, CombatDemoContent> = {
  '禁字劈棍流': {
    name: '禁字劈棍流',
    title: '禁字劈棍流 · 实战演示',
    description: '禁字劈棍流的核心在于通过复杂的装备切换和属性转化，实现超高攻击力的一棍秒杀。此流派虽然操作复杂，但一旦掌握，威力惊人。以下是完整的实战操作演示。',
    operationSteps: `
      <strong>关键提示：</strong><br>
      • 当遭遇那些血量超多、防御极为强大的 boss 时，玩家可以先借助其他方式去积攒法力、收集药品以及提升棍势。
      • 等到所有准备工作都完成后，再开启禁字决，随后使用重棍对 boss 展开攻击，这样能够实现快速降低其血量，甚至有可能直接将其击败。
      • 但是要注意的是，玩家务必要准确地把握好使用时机，同时清楚自身的资源情况，避免在法力不够或者其他条件不满足的时候盲目启用禁字决，否则会使得战斗陷入被动状态。
    `,
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  '隐身劈棍流': {
    name: '隐身劈棍流',
    title: '隐身劈棍流 · 实战演示',
    description: '隐身劈棍流强调一击必杀的刺客风格，通过完美的隐身时机和精准的背刺，达到以弱胜强的效果。',
    operationSteps: `
      <strong>实战操作流程：</strong><br>
      1. 开局立即施展隐身术，观察敌人动向<br>
      2. 绕到敌人侧后方，寻找最佳攻击角度<br>
      3. 等待敌人攻击间隙，准备三蓄劈棍<br>
      4. 瞬间现身发动背刺暴击<br>
      5. 一击过后立即重新隐身脱离<br>
      6. 重复以上过程直至敌人倒下
    `,
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  '花棍劈棍流': {
    name: '花棍劈棍流',
    title: '花棍劈棍流 · 实战演示',
    description: '花棍劈棍流以华丽的连击和持续的压制力见长，通过不断的棍花和连击保持攻击节奏。',
    operationSteps: `
      <strong>实战操作流程：</strong><br>
      1. 开局棍花迷惑敌人视线<br>
      2. 快速积攒豆子，保持连击节奏<br>
      3. 利用眩晕术控制敌人<br>
      4. 四段棍势精准释放<br>
      5. 再次棍花，形成无限循环<br>
      6. 保持攻击节奏不断，压制敌人
    `,
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  '安身立棍流': {
    name: '安身立棍流',
    title: '安身立棍流 · 实战演示',
    description: '安身立棍流以稳健的防守反击为核心，通过持续的防御和回血，最终实现防守反击。',
    operationSteps: `
      <strong>实战操作流程：</strong><br>
      1. 开局立即开启安身术<br>
      2. 保持立棍防御姿态<br>
      3. 利用敌人攻击间隙回血<br>
      4. 积攒能量等待反击时机<br>
      5. 发动强力反击<br>
      6. 继续防御循环直至胜利
    `,
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  '隐身立棍流': {
    name: '隐身立棍流',
    title: '隐身立棍流 · 实战演示',
    description: '隐身立棍流结合隐身和防御的双重优势，实现攻守兼备的战斗风格。',
    operationSteps: `
      <strong>实战操作流程：</strong><br>
      1. 隐身接近敌人选择最佳位置<br>
      2. 现身立棍防御吸收伤害<br>
      3. 积蓄反击能量<br>
      4. 隐身脱离重新布局<br>
      5. 利用范围攻击打击多个目标<br>
      6. 根据情况选择继续战斗或隐身
    `,
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  '戳棍搅棍流': {
    name: '戳棍搅棍流',
    title: '戳棍搅棍流 · 实战演示',
    description: '戳棍搅棍流以灵活的远近切换和连续攻击为特色，如龙蛇般变化莫测。',
    operationSteps: `
      <strong>实战操作流程：</strong><br>
      1. 远程戳击消耗敌人<br>
      2. 快速接近转换搅棍<br>
      3. 连环攻击不给喘息<br>
      4. 打出硬直后戳击终结<br>
      5. 再次拉开距离<br>
      6. 重复戳搅转换直至胜利
    `,
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  },
  '退寸进尺流': {
    name: '退寸进尺流',
    title: '退寸进尺流 · 实战演示',
    description: '退寸进尺流以高超的预判和完美的反击时机著称，体现以退为进的智慧。',
    operationSteps: `
      <strong>实战操作流程：</strong><br>
      1. 主动后撤诱导敌人攻击<br>
      2. 精准预判闪避攻击<br>
      3. 敌人攻击落空瞬间反击<br>
      4. 立即后撤等待下次机会<br>
      5. 利用地形优势创造空间<br>
      6. 完美时机连续反击致胜
    `,
    videoUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/PlayMethod/%E5%8A%88%E6%A3%8D.mp4'
  }
};

// ==================== API 函数 ====================

/**
 * 获取系统欢迎消息
 * @param hasChosenStick 是否已选择棍法
 * @returns Promise<SystemMessageResponse>
 */
export const getWelcomeMessage = async (hasChosenStick: boolean = false): Promise<SystemMessageResponse> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 100));

  if (!hasChosenStick) {
    // 生成带选择项的欢迎消息
    const choiceHtml = STICK_CHOICES.map(choice => 
      `<span class="choice-option" onclick="window.handleStickChoice('${choice.id}')">${choice.name}</span> —— ${choice.description}`
    ).join('<br><br>');

    const content = `你来了，天命人。吾乃棍法宗师，传承千年武学精髓。棍法者，百兵之祖也，一棍在手可破万法。今日传你三式根基，请告诉老夫，你更倾心于哪一式？<br><br>${choiceHtml}`;

    return {
      success: true,
      message: '获取欢迎消息成功',
      data: {
        content,
        hasChoices: true,
        choices: STICK_CHOICES,
        messageType: 'welcome'
      }
    };
  } else {
    // 生成禁用状态的消息
    const disabledChoiceHtml = STICK_CHOICES.map(choice => 
      `<span class="choice-option disabled">${choice.name}</span> —— ${choice.description}`
    ).join('<br><br>');

    const content = `你来了，天命人。吾乃棍法宗师，传承千年武学精髓。棍法者，百兵之祖也，一棍在手可破万法。今日传你三式根基，请告诉老夫，你更倾心于哪一式？<br><br>${disabledChoiceHtml}<br><br><em style="color: #a89c7c;">（你已选择修炼路径，如需重新选择，请在修行历程中点击"棍法入门"）</em>`;

    return {
      success: true,
      message: '获取欢迎消息成功',
      data: {
        content,
        hasChoices: false,
        messageType: 'welcome'
      }
    };
  }
};

/**
 * 根据棍法选择获取流派推荐
 * @param stickType 选择的棍法类型
 * @param hasChosenSchool 是否已选择流派
 * @param chosenSchoolName 已选择的流派名称
 * @returns Promise<SchoolRecommendationResponse>
 */
export const getSchoolRecommendation = async (
  stickType: StickType, 
  hasChosenSchool: boolean = false, 
  chosenSchoolName: string = ''
): Promise<SchoolRecommendationResponse> => {

  const recommendation = SCHOOL_RECOMMENDATIONS[stickType];
  
  if (!recommendation) {
    return {
      success: false,
      message: '未找到对应的流派推荐',
      data: {
        stickType,
        content: '',
        schools: [],
        philosophy: ''
      }
    };
  }

  // 生成可点击的流派按钮HTML
  const schoolsHtml = recommendation.schools.map(school => {
    const isDisabled = hasChosenSchool && school.name === chosenSchoolName;
    const className = isDisabled ? 'school-option disabled' : 'school-option';
    const onclick = isDisabled ? '' : `onclick="window.handleSchoolChoice('${school.name}')"`;
    
    return `<span class="${className}" ${onclick}>${school.name}</span> —— ${school.description}`;
  }).join('<br><br>');

  let fullContent = `${recommendation.content}：<br><br>${schoolsHtml}<br><br>${recommendation.philosophy}`;
  
  if (hasChosenSchool) {
    fullContent += '<br><br><em style="color: #a89c7c;">（你已选择修炼流派，如需重新选择，请在修行历程中重新开始）</em>';
  }

  return {
    success: true,
    message: '获取流派推荐成功',
    data: {
      ...recommendation,
      content: fullContent
    }
  };
};

/**
 * 验证棍法选择是否有效
 * @param stickType 棍法类型
 * @returns boolean
 */
export const isValidStickType = (stickType: string): stickType is StickType => {
  return ['劈棍', '立棍', '截棍'].includes(stickType);
};

/**
 * 获取秘籍内容
 * @param messageType 消息类型，用于决定返回哪种内容
 * @param stickType 棍法类型
 * @param schoolName 流派名称，第三和第四阶段需要
 * @returns Promise<ScriptureResponse>
 */
export const getScriptureContent = async (
  messageType: MessageType = 'welcome', 
  stickType?: StickType,
  schoolName?: string
): Promise<ScriptureResponse> => {
  try {
    
    if (messageType === 'welcome') {
      // 第一条消息：返回基础棍法
      return {
        success: true,
        message: '获取基础武学秘籍成功',
        data: {
          methods: STICK_METHODS_SCRIPTURE,
          messageType: 'welcome'
        }
      };
    } else if (messageType === 'school_recommendation' && stickType) {
      // 第二条消息：返回对应棍法的流派说明
      const schools = Object.values(SCHOOL_DETAILS).flat().filter(school => 
        SCHOOL_RECOMMENDATIONS[stickType]?.schools.some(s => s.name === school.name)
      );
      if (schools.length > 0) {
        return {
          success: true,
          message: '获取流派说明成功',
          data: {
            methods: [],
            schools: schools,
            messageType: 'school_recommendation'
          }
        };
      }
    } else if (messageType === 'training_progress' && schoolName) {
      // 第三条消息：返回对应流派的攻略
      const strategy = SCHOOL_STRATEGIES[schoolName];
      if (strategy) {
        return {
          success: true,
          message: '获取修炼攻略成功',
          data: {
            methods: [],
            strategies: [strategy],
            messageType: 'training_progress'
          }
        };
      }
    } else if (messageType === 'combat_training' && schoolName) {
      // 第四条消息：返回对应流派的实战演示
      const demo = SCHOOL_COMBAT_DEMOS[schoolName];
      if (demo) {
        return {
          success: true,
          message: '获取实战演示成功',
          data: {
            methods: [],
            combatDemos: [demo],
            messageType: 'combat_training'
          }
        };
      }
    } else if (messageType === 'advanced_schools') {
      // 第五条消息：返回上层流派的秘籍内容
      return {
        success: true,
        message: '获取上层流派秘籍内容成功',
        data: {
          methods: ADVANCED_SCHOOLS_SCRIPTURE,
          messageType: 'advanced_schools'
        }
      };
    } else if (messageType === 'advanced_school_details') {
      // 第六条消息：返回师父传授完毕的秘籍内容
      const masterFinalContent: StickMethodContent = {
        title: '武学传承',
        description: '老夫已将毕生所学倾囊相授于你',
        techniques: `
          <div class="master-final-section">
            <h3>传承心得</h3>
            <p>老夫已经传给你过人武艺和七十二般变化，此时你的武学修为已臻化境。</p>
            
            <p>棍法者，百兵之祖，你已通晓其中奥义；</p>
            <p>流派者，各有千秋，你已领悟各家精髓；</p>
            <p>变化者，千变万化，你已掌握变身之法。</p>
            
            <h3>出师嘱托</h3>
            <p>江湖险恶，路途遥远，但你已不再是当初那个初入门墙的新手。凭借这一身绝学，去闯一闯江湖吧！</p>
            
            <p>记住，武学之道无止境，纵然老夫传你绝学，但真正的成长还需在实战中磨砺。</p>
            
            <h3>师父赠言</h3>
            <p style="color: #d3b479; font-weight: bold;">
              "棍法通神，变化无穷，天地任逍遥；<br>
              师父传艺，徒儿成才，江湖见真章。"
            </p>
            
            <p style="font-style: italic; color: #c0aa6a;">
              去吧，天命人，愿你在江湖中闯出属于自己的一片天地！
            </p>
          </div>
        `,
        videoUrl: ''
      };

      return {
        success: true,
        message: '获取师父传承秘籍成功',
        data: {
          methods: [masterFinalContent],
          messageType: 'advanced_school_details'
        }
      };
    }
    
    return {
      success: false,
      message: '未找到对应的秘籍内容',
      data: {
        methods: [],
        messageType: messageType
      }
    };
  } catch (error) {
    console.error('获取秘籍内容失败:', error);
    return {
      success: false,
      message: '获取秘籍内容失败',
      data: {
        methods: [],
        messageType: messageType
      }
    };
  }
};

/**
 * 获取上层流派介绍内容
 * @returns 上层流派介绍的HTML内容
 */
export const getAdvancedSchoolsContent = (): string => {
  return `
    <strong>上层流派传承</strong><br><br>
    
    善哉！你已完成基础流派的修炼，现在可以研习更为高深的上层流派。这些流派各有奇能，威力无穷！<br><br>
    
    <span class="advanced-school-option" onclick="window.selectAdvancedSchool('毛毛流')"><strong>毛毛流</strong></span><br>
    能打群架，绝不单挑！能靠别人，绝不靠己！<br>
    本派把豪毛法术上限升满，带加蓝的葫芦和酒食。群战无敌，单挑拉胯。<br><br>
    
    <span class="advanced-school-option" onclick="window.selectAdvancedSchool('毒伤流')"><strong>毒伤流</strong></span><br>
    正经人谁刚正面啊？做人最重要就是以德服人，以毒伤人！<br>
    非常赖皮的打法，把装备带上毒属性的，天赋点有毒属性，然后糜道人变化加满，带上广谋，便可成为绝命毒师！<br><br>
    
    <span class="advanced-school-option" onclick="window.selectAdvancedSchool('永冻流')"><strong>永冻流</strong></span><br>
    控制永远是最强的技能，本派配合定身术能让对面一直立在远地。<br>
    花里胡哨在本派面前，不值一提！（硬直高的不行）<br><br>
    
    <span class="advanced-school-option" onclick="window.selectAdvancedSchool('风灵月影流')"><strong>风灵月影流</strong></span><br>
    真正意义上的齐天大圣孙悟空，能飞天，能疾跑，在大圣面前众生平等，均仅需一棍。<br>
    唯一缺点是，找大圣代打容易被其他门派鄙视。
  `;
};

/**
 * 获取上层流派详情
 * @param schoolName 流派名称
 * @returns 流派详情内容
 */
export const getAdvancedSchoolDetails = (schoolName: string): string => {
  const schoolDetails: Record<string, string> = {
    '毛毛流': `
      <strong>上层流派详解 · 毛毛流</strong><br><br>
      
      首先我们开局用"百目真人"插旗享受攻击加成。<br><br>
      接着用"聚形散气"，隐身召唤毛猴分身。<br><br>
      我们等毛猴靠近BOSS时，用"定身术"。<br><br>
      定身术结束后用定风珠。<br><br>
      毛猴分身消失后，躲避BOSS攻击也可变身广智拉扯boss，剩余法力能放第二波分身就拖，不够就放"聚形散气"或者定身术磨掉boss最后的血量。<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成毛毛流的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.startNewCycle()">开启二周目</span>
      <span class="advanced-school-btn" onclick="window.returnToMainPage()">功成身退</span>
    `,
    '毒伤流': `
      <strong>上层流派详解 · 毒虫流</strong><br><br>
      
      【变化-藕雹】重击刺自己会给武器叠加一层毒伤，可叠加四层。有趣的是我们的绣花针是可以用它叠的毒伤的，绣花针的频率大概和我们叠毒的速率差不多，右下角会显示叠了几层，但最多叠四层。听声音数四下，但是要看右下角层数栏清空后即可释放法术"功成"，将叠加的四次伤害一次爆发出来。<br><br>
      
      悟空里面的毒伤是根据你的攻击力来计算的，而且不能暴击。所以尽可能地增加你的攻击力，就可以做到"秒杀"BOSS了。<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成毒虫流的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.startNewCycle()">开启二周目</span>
      <span class="advanced-school-btn" onclick="window.returnToMainPage()">功成身退</span>
    `,
    '永冻流': `
      <strong>上层流派详解 · 永冻流</strong><br><br>
      
      法宝选择芭蕉扇。武器首选暴击率高的虫棍通天，想用飞剑来打连续攻击的可以用三尖两刃刀，想打其他异常流的可以用天龙棍，武器选择相对自由点，就是打法会稍微有点调整，如果是刚拿到金身套还在一周目的玩家就有什么用什么。<br><br>
      
      葫芦可以自由选择，想要伤害可以选妙仙葫芦，酒选九霞清醑，饮酒后可以恢复元气，增加容错率。泡酒物首推虎舍利，其他可以自由搭配，双冠血的效果和虎舍利同样都是给5%暴击，如果玩到2周目了可以下掉双冠血和倒马毒钩装上虎舍利，这样在搭配上就可以多一个格子。<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成永冻流的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.startNewCycle()">开启二周目</span>
      <span class="advanced-school-btn" onclick="window.returnToMainPage()">功成身退</span>
    `,
    '风灵月影流': `
      <strong>上层流派详解 · 风灵月影流</strong><br><br>
      
      一个古老的流派，神秘而强大，为师只在江湖听闻其名，你可自行去江湖寻找机缘。<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成风灵月影流的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.startNewCycle()">开启二周目</span>
      <span class="advanced-school-btn" onclick="window.returnToMainPage()">功成身退</span>
    `
  };
  
  return schoolDetails[schoolName] || '此上层流派的详情暂未收录，请向师父请教。';
};

/**
 * 计算动态标题
 * @param hasChosenStick 是否已选择棍法
 * @param chosenStickType 选择的棍法类型
 * @param hasChosenSchool 是否已选择流派
 * @param chosenSchoolName 选择的流派名称
 * @param hasStartedCombat 是否已开始实战教学
 * @param hasReachedAdvanced 是否已进入上层流派阶段
 * @param hasSelectedAdvancedSchool 是否已选择上层流派
 * @param selectedAdvancedSchool 选择的上层流派名称
 * @returns 动态标题文本
 */
export const getDynamicTitle = (
  hasChosenStick: boolean,
  chosenStickType: string,
  hasChosenSchool: boolean,
  chosenSchoolName: string,
  hasStartedCombat: boolean,
  hasReachedAdvanced: boolean,
  hasSelectedAdvancedSchool: boolean,
  selectedAdvancedSchool: string
): string => {
  if (!hasChosenStick) {
    return '武学传承 · 棍法入门';
  } else if (hasChosenStick && !hasChosenSchool) {
    return `武学传承 · ${chosenStickType}修炼`;
  } else if (hasChosenSchool && !hasStartedCombat) {
    return `武学传承 · ${chosenSchoolName}`;
  } else if (hasStartedCombat && !hasReachedAdvanced) {
    return `武学传承 · 实战传授`;
  } else if (hasReachedAdvanced && !hasSelectedAdvancedSchool) {
    return `武学传承 · 上层流派`;
  } else {
    return `武学传承 · ${selectedAdvancedSchool}`;
  }
};