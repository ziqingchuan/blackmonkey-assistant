export interface BossInfo {
    bossId: number; // boss的id(0-62)
    chapterIndex: number; // 章节索引(0-5)
    name: string; // boss名字
    imgUrl: string; // boss图片的url
    description: string; // boss描述与背景故事
    position: string; // boss出现位置
    positionImgUrl: string; // boss出现位置的图片url
    difficulty: number; // boss难度(1-10)
    experience: string; // boss的打法和经验
    reward: string; // boss掉落奖励
    bossTrick: TrickInfo[]; // boss的招式
    encouragement?: string; // 鼓励语
}

export interface TrickInfo {
    name: string; // 招式名字
    gifUrl: string; // 招式动画的url
}
export interface TipInfo {
    id: number;
    chapterName: string;
    bossTips: BossInfo[];
}
/**
 * 单独记录小黄龙的BossInfo，其他的后续再加，先模拟数据
 */

/**
 * 黑风山： "广智","幽魂","灵虚子","广谋","白衣秀士","金池长老","黑风大王","黑熊精"
 * 黄风岭："沙国王/沙二郎","沙大郎","虎先锋","虎伥","石先锋","百目真人","疯虎","石中人","石敢当","小骊龙","蝜蝂","黄风大圣"
 * 小西天："亢金龙","魔将·莲眼","魔将·妙音","赤尻马猴","亢金星君","青背龙","不白","不能","魔将·劫波","不空","黄眉"
 * 盘丝岭："二姐","黑手道人","百足虫","右手虫","小黄龙","猪八戒","紫蛛儿","毒敌大王","靡道人","晦月魔君","百眼魔君"
 * 火焰山："石父","快如风/疾如火","云里雾/雾里云","火焰山土地","红银战车","赤金战车","兴烘掀/掀烘兴","碧水金睛兽","红孩儿"
 * 花果山："玉灵官","跳浪蛟","水木兽","凤翅将军","金甲犀","浪波波","步云鹿","碧臂螂","大石敢当","石猿","大圣残躯","二郎显圣真君"
 */

export const chapterName: string[] = ["黑风山", "黄风岭", "小西天", "盘丝岭", "火焰山", "花果山"];

// export const bossName: string[] = [
//     "广智","幽魂","灵虚子","广谋","白衣秀士","金池长老","黑风大王","黑熊精",
//     "沙国王/沙二郎","沙大郎", "虎先锋","虎伥","石先锋","百目真人","疯虎","石中人","石敢当","小骊龙","蝜蝂","黄风大圣",
//     "亢金龙","魔将·莲眼","魔将·妙音","赤尻马猴","亢金星君","青背龙","不白","不能","魔将·劫波","不空","黄眉",
//     "二姐","黑手道人","百足虫","右手虫","小黄龙","猪八戒","紫蛛儿","毒敌大王","靡道人","晦月魔君","百眼魔君",
//     "石父","快如风/疾如火","云里雾/雾里云","火焰山土地","红银战车","赤金战车","兴烘掀/掀烘兴","碧水金睛兽","红孩儿",
//     "玉灵官","跳浪蛟","水木兽","凤翅将军","金甲犀","浪波波","步云鹿","碧臂螂","大石敢当","石猿","大圣残躯","二郎显圣真君"];

export const bossInfo: BossInfo[] = [
    // ================== 黑风山 (0-7) ==================
    {
        bossId: 0, chapterIndex: 0, name: "广智",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/0.png",
        description: "黑风洞小妖，手持长枪，狡诈阴险",
        position: "黑风洞入口",
        positionImgUrl: '',
        difficulty: 3,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 1, chapterIndex: 0, name: "幽魂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/1.png",
        description: "被妖气侵蚀的亡魂，形态虚无",
        position: "黑风山乱葬岗",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 2, chapterIndex: 0, name: "灵虚子",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/2.png",
        description: "修炼成精的狼妖，行动迅捷",
        position: "黑风山断崖",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 3, chapterIndex: 0, name: "广谋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/3.png",
        description: "黑风洞军师，擅长法术攻击",
        position: "黑风洞议事厅",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 4, chapterIndex: 0, name: "白衣秀士",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/4.png",
        description: "文弱书生外表的画皮妖",
        position: "黑风山竹林",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 5, chapterIndex: 0, name: "金池长老",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/5.png",
        description: "堕落的寺院住持，操纵佛珠",
        position: "金光寺大殿",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 6, chapterIndex: 0, name: "黑风大王",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/6.png",
        description: "黑风洞首领，掌控风沙之力",
        position: "黑风洞王座",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 7, chapterIndex: 0, name: "黑熊精",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/7.png",
        description: "黑风山真正的霸主，力大无穷",
        position: "黑风山巅",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },

    // ================== 黄风岭 (8-19) ==================
    {
        bossId: 8, chapterIndex: 1, name: "沙国王/沙二郎",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/8.png",
        description: "沙妖双子，共享生命",
        position: "黄风岭沙王宫",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 9, chapterIndex: 1, name: "沙大郎",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/9.png",
        description: "沙国王长子，操纵沙盾",
        position: "沙族祭坛",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 10, chapterIndex: 1, name: "虎先锋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/10.png",
        description: "黄风岭前哨将军，凶猛异常",
        position: "黄风岭哨站",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 11, chapterIndex: 1, name: "虎伥",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/11.png",
        description: "被虎妖控制的伥鬼",
        position: "虎穴深处",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 12, chapterIndex: 1, name: "石先锋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/12.png",
        description: "岩石构成的守护者",
        position: "黄风岭石阵",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 13, chapterIndex: 1, name: "百目真人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/13.png",
        description: "全身长满眼睛的道士",
        position: "黄风岭道观",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 14, chapterIndex: 1, name: "疯虎",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/14.png",
        description: "陷入疯狂的虎妖",
        position: "黄风岭禁地",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 15, chapterIndex: 1, name: "石中人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/15.png",
        description: "被困在岩石中的怨灵",
        position: "黄风岭石林",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 16, chapterIndex: 1, name: "石敢当",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/16.png",
        description: "巨大的石碑守护者",
        position: "黄风岭古墓",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 17, chapterIndex: 1, name: "小骊龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/17.png",
        description: "年幼的骊龙，掌控水流",
        position: "黄风岭水潭",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 18, chapterIndex: 1, name: "蝜蝂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/18.png",
        description: "背负重物的妖虫",
        position: "黄风岭洞穴",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 19, chapterIndex: 1, name: "黄风大圣",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/19.png",
        description: "黄风岭主宰，掌控三昧神风",
        position: "黄风洞核心",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },

    // ================== 小西天 (20-30) ==================
    {
        bossId: 20, chapterIndex: 2, name: "亢金龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/20.png",
        description: "二十八星宿之一，雷属性龙形",
        position: "星宿台",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 21, chapterIndex: 2, name: "魔将·莲眼",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/21.png",
        description: "眼部绽放莲花的魔将",
        position: "小西天魔将殿",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 22, chapterIndex: 2, name: "魔将·妙音",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/22.png",
        description: "以音律攻击的魔将",
        position: "小西天音律阁",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 23, chapterIndex: 2, name: "赤尻马猴",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/23.png",
        description: "通晓阴阳的灵猴",
        position: "小西天灵猴园",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 24, chapterIndex: 2, name: "亢金星君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/24.png",
        description: "亢金龙的人形化身",
        position: "星宿台核心",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 25, chapterIndex: 2, name: "青背龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/25.png",
        description: "龙族守卫，背生青鳞",
        position: "小西天龙池",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 26, chapterIndex: 2, name: "不白",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/26.png",
        description: "三不和尚之一，力大无穷",
        position: "小西天金刚殿",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 27, chapterIndex: 2, name: "不能",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/27.png",
        description: "三不和尚之一，擅长防御",
        position: "小西天罗汉堂",
        difficulty: 6,
        positionImgUrl: '',
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 28, chapterIndex: 2, name: "魔将·劫波",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/28.png",
        description: "掌控劫难的魔将",
        position: "小西天劫难殿",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 29, chapterIndex: 2, name: "不空",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/29.png",
        description: "三不和尚之首，佛法高深",
        position: "小西天大雄宝殿",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 30, chapterIndex: 2, name: "黄眉",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/30.png",
        description: "小西天最终Boss，伪佛祖",
        position: "小西天雷音寺",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },

    // ================== 盘丝岭 (31-41) ==================
    {
        bossId: 31, chapterIndex: 3, name: "二姐",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/31.png",
        description: "盘丝洞二当家，毒蛛化身",
        position: "盘丝洞前厅",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 32, chapterIndex: 3, name: "黑手道人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/32.png",
        description: "双手漆黑的道士，擅长诅咒",
        position: "盘丝岭道观",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 33, chapterIndex: 3, name: "百足虫",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/33.png",
        description: "巨型蜈蚣精",
        position: "盘丝岭毒虫窟",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 34, chapterIndex: 3, name: "右手虫",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/34.png",
        description: "寄生右手的妖虫",
        position: "盘丝岭寄生林",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 35, chapterIndex: 3, name: "小黄龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/35.png",
        description: "袍缕隐卧龙，困游命流中。\n" +
            "\n" +
            "飞扬起金岚，命劫有始终。\n" +
            "\n" +
            "他原盘算得十分简单，这老头既能窥测天意，必会凭此趋吉避凶，只要与他同行，定能避开危难。\n" +
            "\n" +
            "待兄弟们各自远遁后，他就化作袍服上的一缕龙纹，藏于了袁守诚身上。\n" +
            "\n" +
            "其后百年，他跟着老头走遍了大江南北，也见其为旁人卜过吉凶，占过前程。可终究怎么样呢？大多还是自作聪明，走了老路。\n" +
            "\n" +
            "每见此景，那老头便会找个地方饮酒，恰巧老头有个能自己酿酒的葫芦，是以经常喝得酩酊大醉。\n" +
            "\n" +
            "每次醉酒，老头极爱自言自语，有时心低意沮：“看破棋局，有何用？不入棋局，又有何用？”\n" +
            "\n" +
            "有时又激昂爽快：“生死巳定，何妨一试！”\n" +
            "\n" +
            "有时又语挚情长：“前因既定，后果难改。又有几人能胜过天命？”\n" +
            "\n" +
            "有时又反问嗟叹：“若算得到自己死在哪里，偏偏不去，就能逃得了吗？”\n" +
            "\n" +
            "他时常疑虑，这些话，许是老头刻意对他所说。但那老头从来点破或驱赶他，他又觉得这老头只是在发酒疯。\n" +
            "\n" +
            "时日一久，这些话竟如心魔般，让他踌躇不决，也一直没有下定决心从他身边离去。",
        position: "游记位置: 位于第四回妖王词条【晦月魔君】的下方。\n" + "\n" + "具体位置: 【盘丝岭-盘丝洞-堕龙壁】,  需要先打完前三只隐藏的龙才能触发小黄龙的战斗。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/xhl-position.png',
        difficulty: 9,
        experience: "奇术只需要将禁字法点满；棍法选择劈棍，然后用20技能点将四棍势点出来。\n" + "\n" + "根基将气力相关的技能点出来，防止体力不够用。\n" + "\n" +
            "武器建议选择几丁棍，防具用最新的就行，其他不重要，按自己喜好选择。\n" + "\n" + "开局先使用禁字法，原地蓄力三棍势重棍，在合适的距离使用重棍，可以直接劈到小黄龙，这种我们暂且称为完美劈棍。\n" +"\n" +
            "这种完美劈棍不仅能将无伤消耗小黄龙的血量，还能使小黄龙后撤一大步，也是我们后面保持距离的重要手段。\n" + "\n" +
            "后面直接离小黄龙远远的，当玩家与小黄龙有一定距离时，小黄龙的攻击欲望非常低，我们利用这个特性远距离蓄力三棍势重击，走进劈下再次远离小黄龙，然后重复这个过程。\n" + "\n" +
            "掌握与小黄龙的距离是关键，小黄龙这时只会使用一种突刺攻击，我们离远时原地蓄力，一旦发现小黄龙准备突刺就开始往右边跑，奔跑状态下小黄龙的突刺打不到我们。\n" + "\n" +
            "然后利用重击免伤的特性直接反手一个重击，消耗小黄龙的血量，小黄龙有些突刺是有后续攻击的，不过无所谓，通过免伤换血就行，打完往小黄龙冲过来的位置跑，互换位置继续蓄力重击。\n" + "\n" +
            "原地蓄力的时候最好靠在地图左边，给我们往右侧奔跑躲突刺留空间。\n" + "\n" +
            "如果距离把握到位，小黄龙是不会进入二阶段的，会一直跟我们拉扯突刺，而每次突刺也是有CD的，突刺一次会原地踏步很久。\n" + "\n" +
            "通过这个特性与上述步骤将小黄龙消耗到残血就到了最关键的时刻，小黄龙到残血之后攻击欲望大大提升，我们需要频繁的躲避连招，摸掉最后一丝血皮即可。",
        reward: "架海筋1、灵蕴5129、【法术】金岗、先天锟钢1、玲珑内丹1、龙珠1、【珍玩】金色鲤",
        bossTrick: [
            {
                name: "锄地四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/xhl-trick1.gif",
            },
            {
                name: "翻滚五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/xhl-trick2.gif",
            },
            {
                name: "横扫五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/xhl-trick3.gif",
            },
            {
                name: "瞬移突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/xhl-trick4.gif",
            },
            {
                name: "腾空连突",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/xhl-trick5.gif",
            },
            {
                name: "跳劈三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/xhl-trick6.gif",
            }
        ],
        encouragement: "堕龙壁前，金岚飞扬；此战虽难，天命可期！\n\n" +
            "昔有仙圣张大仙，三百战而殒首；\n\n" +
            "上单霸主The Shy，二十七败而折戟。\n\n" +
            "然，龙有逆鳞，触之则怒；\n" +
            "猴有傲骨，百折不挠！\n\n" +
            "千钧棍下无难事，万死场中见真章。\n" +
            "纵使金鳞化龙去，终教黄龙伏地吟！"
    },
    {
        bossId: 36, chapterIndex: 3, name: "猪八戒",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/36.png",
        description: "被魔化的天蓬元帅",
        position: "盘丝岭高老庄",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 37, chapterIndex: 3, name: "紫蛛儿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/37.png",
        description: "盘丝洞三当家，紫色毒蛛",
        position: "盘丝洞织网室",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 38, chapterIndex: 3, name: "毒敌大王",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/38.png",
        description: "蝎子精，尾刺剧毒",
        position: "盘丝岭毒蝎洞",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 39, chapterIndex: 3, name: "靡道人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/39.png",
        description: "堕落道人，擅长幻术",
        position: "盘丝岭迷魂阵",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 40, chapterIndex: 3, name: "晦月魔君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/40.png",
        description: "掌控月蚀之力的魔君",
        position: "盘丝岭月坛",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 41, chapterIndex: 3, name: "百眼魔君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/41.png",
        description: "全身长满眼睛的魔君",
        position: "盘丝洞核心",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },

    // ================== 火焰山 (42-50) ==================
    {
        bossId: 42, chapterIndex: 4, name: "石父",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/42.png",
        description: "火焰山岩石巨人",
        position: "火焰山口",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 43, chapterIndex: 4, name: "急如火快如风",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/43.png",
        description: "风火双煞组合",
        position: "火焰山风火道",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 44, chapterIndex: 4, name: "云里雾/雾里云",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/44.png",
        description: "云雾双生妖怪",
        position: "火焰山云台",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 45, chapterIndex: 4, name: "火焰山土地",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/45.png",
        description: "被火焰侵蚀的土地神",
        position: "火焰山神庙",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 46, chapterIndex: 4, name: "五行战车",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/46.png",
        description: "红孩儿打造的火焰战车",
        position: "火焰山战场",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 47, chapterIndex: 4, name: "火灵元母",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/47.png",
        description: "红银战车的强化版",
        position: "火焰山要塞",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 48, chapterIndex: 4, name: "兴烘掀/掀烘兴",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/48.png",
        description: "火焰山双将，掌控火势",
        position: "火焰山熔岩河",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 49, chapterIndex: 4, name: "碧水金睛兽",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/49.png",
        description: "水火双属性圣兽",
        position: "熔岩核心",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 50, chapterIndex: 4, name: "红孩儿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/50.png",
        description: "火焰山少主，三昧真火",
        position: "火焰山圣婴宫",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },

    // ================== 花果山 (51-62) ==================
    {
        bossId: 51, chapterIndex: 5, name: "玉灵官",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/51.png",
        description: "天庭守将，奉命镇压花果山",
        position: "花果山南天门",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 52, chapterIndex: 5, name: "跳浪蛟",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/52.png",
        description: "花果山水域蛟龙",
        position: "花果山水帘洞外",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 53, chapterIndex: 5, name: "水木兽",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/53.png",
        description: "水木双属性灵兽",
        position: "花果山灵兽园",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 54, chapterIndex: 5, name: "凤翅将军",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/54.png",
        description: "凤凰后裔，空中单位",
        position: "花果山云霄台",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 55, chapterIndex: 5, name: "金甲犀",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/55.png",
        description: "身披金甲的犀牛精",
        position: "花果山金石谷",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 56, chapterIndex: 5, name: "浪波波",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/56.png",
        description: "水元素聚合体",
        position: "花果山瀑布",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 57, chapterIndex: 5, name: "步云鹿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/57.png",
        description: "脚踏祥云的神鹿",
        position: "花果山云端",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 58, chapterIndex: 5, name: "碧臂螂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/58.png",
        description: "碧玉螳螂妖",
        position: "花果山翡翠林",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 59, chapterIndex: 5, name: "大石敢当",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/59.png",
        description: "巨型石碑守护者",
        position: "花果山灵石阵",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 60, chapterIndex: 5, name: "石子",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/60.png",
        description: "孙悟空石像所化的妖猿",
        position: "花果山灵石像",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 61, chapterIndex: 5, name: "大圣残躯",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/61.png",
        description: "孙悟空被封印的残躯",
        position: "花果山水帘洞",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    },
    {
        bossId: 62, chapterIndex: 5, name: "二郎显圣真君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/62.png",
        description: "天庭第一战神，三尖两刃刀持有者",
        position: "花果山巅峰",
        positionImgUrl: '',
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: []
    }
];
