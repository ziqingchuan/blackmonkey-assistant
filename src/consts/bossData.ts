export interface BossInfo {
    bossId: number; // boss的id(0-62)
    chapterIndex: number; // 章节索引(0-5)
    name: string; // boss名字
    imgUrl: string; // boss图片的url
    description: string; // boss描述
    position: string; // boss出现位置
    difficulty: number; // boss难度(1-10)
    experience: string; // boss的打法和经验
    reward: string; // boss掉落奖励
    bossTrick: string[]; // boss的招式
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

export const bossName: string[] = [
    "广智","幽魂","灵虚子","广谋","白衣秀士","金池长老","黑风大王","黑熊精",
    "沙国王/沙二郎","沙大郎", "虎先锋","虎伥","石先锋","百目真人","疯虎","石中人","石敢当","小骊龙","蝜蝂","黄风大圣",
    "亢金龙","魔将·莲眼","魔将·妙音","赤尻马猴","亢金星君","青背龙","不白","不能","魔将·劫波","不空","黄眉",
    "二姐","黑手道人","百足虫","右手虫","小黄龙","猪八戒","紫蛛儿","毒敌大王","靡道人","晦月魔君","百眼魔君",
    "石父","快如风/疾如火","云里雾/雾里云","火焰山土地","红银战车","赤金战车","兴烘掀/掀烘兴","碧水金睛兽","红孩儿",
    "玉灵官","跳浪蛟","水木兽","凤翅将军","金甲犀","浪波波","步云鹿","碧臂螂","大石敢当","石猿","大圣残躯","二郎显圣真君"];

export const bossInfo: BossInfo[] = [
    // ================== 黑风山 (0-7) ==================
    {
        bossId: 0, chapterIndex: 0, name: "广智",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/0.png?Expires=1748633832&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=HW7%2BZP%2FCp7CSuTWRMkPByl0Aq6k%3D",
        description: "黑风洞小妖，手持长枪，狡诈阴险",
        position: "黑风洞入口",
        difficulty: 2,
        experience: "躲避直线冲刺，破防后连击",
        reward: "精魄x50，粗铁矿石",
        bossTrick: ["长枪突刺", "横扫攻击", "后跳闪避"]
    },
    {
        bossId: 1, chapterIndex: 0, name: "幽魂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/1.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "被妖气侵蚀的亡魂，形态虚无",
        position: "黑风山乱葬岗",
        difficulty: 3,
        experience: "免疫物理伤害时需用火属性攻击",
        reward: "幽魂精华，往生咒残卷",
        bossTrick: ["鬼影穿梭", "灵魂尖啸", "虚无形态"]
    },
    {
        bossId: 2, chapterIndex: 0, name: "灵虚子",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/2.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "修炼成精的狼妖，行动迅捷",
        position: "黑风山断崖",
        difficulty: 4,
        experience: "注意躲避扑击，背后攻击有加成",
        reward: "狼牙项链，疾风靴",
        bossTrick: ["狼爪撕裂", "旋风突进", "嚎叫增益"]
    },
    {
        bossId: 3, chapterIndex: 0, name: "广谋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/3.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "黑风洞军师，擅长法术攻击",
        position: "黑风洞议事厅",
        difficulty: 5,
        experience: "打断吟唱可阻止大招",
        reward: "智慧经卷，法术符文",
        bossTrick: ["火球术", "地刺陷阱", "妖力护盾"]
    },
    {
        bossId: 4, chapterIndex: 0, name: "白衣秀士",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/4.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "文弱书生外表的画皮妖",
        position: "黑风山竹林",
        difficulty: 6,
        experience: "二阶段蜕皮后防御力暴增",
        reward: "画皮面具，文士袍",
        bossTrick: ["墨汁禁锢", "画笔突刺", "蜕皮重生"]
    },
    {
        bossId: 5, chapterIndex: 0, name: "金池长老",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/5.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "堕落的寺院住持，操纵佛珠",
        position: "金光寺大殿",
        difficulty: 7,
        experience: "净化佛珠可削弱其力量",
        reward: "舍利子，镀金禅杖",
        bossTrick: ["佛珠连射", "梵音震慑", "金刚护体"]
    },
    {
        bossId: 6, chapterIndex: 0, name: "黑风大王",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/6.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "黑风洞首领，掌控风沙之力",
        position: "黑风洞王座",
        difficulty: 8,
        experience: "风眼处可躲避全屏沙暴",
        reward: "风灵珠，黑风披风",
        bossTrick: ["沙尘暴", "地裂斩", "召唤小妖"]
    },
    {
        bossId: 7, chapterIndex: 0, name: "黑熊精",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/7.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "黑风山真正的霸主，力大无穷",
        position: "黑风山巅",
        difficulty: 9,
        experience: "破甲后攻击腹部弱点",
        reward: "熊胆酒，玄铁重甲",
        bossTrick: ["巨掌拍击", "岩石投掷", "狂暴冲锋"]
    },

    // ================== 黄风岭 (8-19) ==================
    {
        bossId: 8, chapterIndex: 1, name: "沙国王/沙二郎",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/8.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "沙妖双子，共享生命",
        position: "黄风岭沙王宫",
        difficulty: 6,
        experience: "需同时击杀避免复活",
        reward: "沙之心，双子戒指",
        bossTrick: ["沙矛投射", "流沙陷阱", "替身互换"]
    },
    {
        bossId: 9, chapterIndex: 1, name: "沙大郎",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/9.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "沙国王长子，操纵沙盾",
        position: "沙族祭坛",
        difficulty: 5,
        experience: "击碎沙盾后输出窗口仅3秒",
        reward: "砂岩护符",
        bossTrick: ["沙墙防御", "地刺突袭", "沙暴领域"]
    },
    {
        bossId: 10, chapterIndex: 1, name: "虎先锋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/10.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "黄风岭前哨将军，凶猛异常",
        position: "黄风岭哨站",
        difficulty: 7,
        experience: "注意闪避三连爪击，破尾可削弱",
        reward: "虎牙项链，先锋铠甲",
        bossTrick: ["猛虎扑击", "撕裂爪", "虎啸震慑"]
    },
    {
        bossId: 11, chapterIndex: 1, name: "虎伥",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/11.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "被虎妖控制的伥鬼",
        position: "虎穴深处",
        difficulty: 4,
        experience: "净化符咒可解除控制状态",
        reward: "伥鬼符",
        bossTrick: ["鬼影缠身", "诅咒之触", "自爆攻击"]
    },
    {
        bossId: 12, chapterIndex: 1, name: "石先锋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/12.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "岩石构成的守护者",
        position: "黄风岭石阵",
        difficulty: 6,
        experience: "弱点是关节处，雷属性有效",
        reward: "石之心，坚固护腕",
        bossTrick: ["岩石投掷", "地震波", "石化皮肤"]
    },
    {
        bossId: 13, chapterIndex: 1, name: "百目真人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/13.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "全身长满眼睛的道士",
        position: "黄风岭道观",
        difficulty: 8,
        experience: "优先破坏眼睛减少射线攻击",
        reward: "千目镜，道法真经",
        bossTrick: ["死亡射线", "眼魔召唤", "全视领域"]
    },
    {
        bossId: 14, chapterIndex: 1, name: "疯虎",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/14.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "陷入疯狂的虎妖",
        position: "黄风岭禁地",
        difficulty: 7,
        experience: "狂暴状态时保持距离",
        reward: "狂战之爪",
        bossTrick: ["疯狂撕咬", "血怒冲锋", "狂气爆发"]
    },
    {
        bossId: 15, chapterIndex: 1, name: "石中人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/15.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "被困在岩石中的怨灵",
        position: "黄风岭石林",
        difficulty: 5,
        experience: "破坏石壳后快速输出",
        reward: "怨灵石",
        bossTrick: ["石刺突袭", "怨灵附体", "岩石屏障"]
    },
    {
        bossId: 16, chapterIndex: 1, name: "石敢当",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/16.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "巨大的石碑守护者",
        position: "黄风岭古墓",
        difficulty: 6,
        experience: "躲避石碑坠落，攻击基座",
        reward: "石碑碎片，守护者印记",
        bossTrick: ["石碑坠落", "地脉冲击", "守护结界"]
    },
    {
        bossId: 17, chapterIndex: 1, name: "小骊龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/17.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "年幼的骊龙，掌控水流",
        position: "黄风岭水潭",
        difficulty: 7,
        experience: "导电地形可增强雷属性伤害",
        reward: "龙鳞，水灵珠",
        bossTrick: ["水龙卷", "寒冰吐息", "召唤水元素"]
    },
    {
        bossId: 18, chapterIndex: 1, name: "蝜蝂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/18.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "背负重物的妖虫",
        position: "黄风岭洞穴",
        difficulty: 4,
        experience: "破坏背部重物可使其失衡",
        reward: "虫甲壳",
        bossTrick: ["重压攻击", "翻滚冲撞", "甲壳防御"]
    },
    {
        bossId: 19, chapterIndex: 1, name: "黄风大圣",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/19.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "黄风岭主宰，掌控三昧神风",
        position: "黄风洞核心",
        difficulty: 10,
        experience: "逆风方向躲避毒沙，破风眼",
        reward: "定风珠，黄袍披风",
        bossTrick: ["神风领域", "毒沙喷射", "风刃乱舞"]
    },

    // ================== 小西天 (20-30) ==================
    {
        bossId: 20, chapterIndex: 2, name: "亢金龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/20.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "二十八星宿之一，雷属性龙形",
        position: "星宿台",
        difficulty: 8,
        experience: "导电地形可分摊雷击伤害",
        reward: "龙鳞铠，雷光珠",
        bossTrick: ["雷霆万钧", "龙尾扫击", "星宿阵法"]
    },
    {
        bossId: 21, chapterIndex: 2, name: "魔将·莲眼",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/21.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "眼部绽放莲花的魔将",
        position: "小西天魔将殿",
        difficulty: 7,
        experience: "避免直视莲花可减少控制效果",
        reward: "莲眼魔核",
        bossTrick: ["摄魂凝视", "莲花陷阱", "魔气爆发"]
    },
    {
        bossId: 22, chapterIndex: 2, name: "魔将·妙音",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/22.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "以音律攻击的魔将",
        position: "小西天音律阁",
        difficulty: 7,
        experience: "使用静心咒抵抗音波攻击",
        reward: "妙音琴弦",
        bossTrick: ["迷魂曲", "音波刃", "震魂怒吼"]
    },
    {
        bossId: 23, chapterIndex: 2, name: "赤尻马猴",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/23.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "通晓阴阳的灵猴",
        position: "小西天灵猴园",
        difficulty: 8,
        experience: "会预判玩家动作，需多变招式",
        reward: "灵猴尾毛，阴阳符",
        bossTrick: ["分身幻影", "阴阳冲击", "预判闪避"]
    },
    {
        bossId: 24, chapterIndex: 2, name: "亢金星君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/24.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "亢金龙的人形化身",
        position: "星宿台核心",
        difficulty: 9,
        experience: "二阶段会召唤雷龙分身",
        reward: "星君法袍，雷神印",
        bossTrick: ["雷神降临", "星宿召唤", "天雷引"]
    },
    {
        bossId: 25, chapterIndex: 2, name: "青背龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/25.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "龙族守卫，背生青鳞",
        position: "小西天龙池",
        difficulty: 8,
        experience: "破鳞可造成额外伤害",
        reward: "青龙逆鳞",
        bossTrick: ["龙息喷吐", "青鳞护体", "神龙摆尾"]
    },
    {
        bossId: 26, chapterIndex: 2, name: "不白",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/26.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "三不和尚之一，力大无穷",
        position: "小西天金刚殿",
        difficulty: 6,
        experience: "硬直时间长但攻击力高",
        reward: "金刚杵",
        bossTrick: ["罗汉拳", "金刚伏魔", "大力金刚掌"]
    },
    {
        bossId: 27, chapterIndex: 2, name: "不能",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/27.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "三不和尚之一，擅长防御",
        position: "小西天罗汉堂",
        difficulty: 6,
        experience: "破防后可造成有效伤害",
        reward: "罗汉袈裟",
        bossTrick: ["铁布衫", "反弹罡气", "不动明王"]
    },
    {
        bossId: 28, chapterIndex: 2, name: "魔将·劫波",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/28.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "掌控劫难的魔将",
        position: "小西天劫难殿",
        difficulty: 8,
        experience: "劫难状态需及时净化",
        reward: "劫波魔核",
        bossTrick: ["灾厄降临", "劫火焚身", "厄运诅咒"]
    },
    {
        bossId: 29, chapterIndex: 2, name: "不空",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/29.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "三不和尚之首，佛法高深",
        position: "小西天大雄宝殿",
        difficulty: 9,
        experience: "三人合击时优先击杀不空",
        reward: "佛骨舍利",
        bossTrick: ["佛法无边", "金刚伏魔圈", "明王怒相"]
    },
    {
        bossId: 30, chapterIndex: 2, name: "黄眉",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/30.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "小西天最终Boss，伪佛祖",
        position: "小西天雷音寺",
        difficulty: 10,
        experience: "金钵法宝需用定风珠破解",
        reward: "金铙碎片，佛祖袈裟",
        bossTrick: ["金钵收妖", "掌中佛国", "伪佛真身"]
    },

    // ================== 盘丝岭 (31-41) ==================
    {
        bossId: 31, chapterIndex: 3, name: "二姐",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/31.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "盘丝洞二当家，毒蛛化身",
        position: "盘丝洞前厅",
        difficulty: 6,
        experience: "注意躲避蛛网束缚",
        reward: "蛛丝囊",
        bossTrick: ["毒蛛召唤", "蛛网束缚", "毒牙突刺"]
    },
    {
        bossId: 32, chapterIndex: 3, name: "黑手道人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/32.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "双手漆黑的道士，擅长诅咒",
        position: "盘丝岭道观",
        difficulty: 7,
        experience: "被诅咒时及时使用净化",
        reward: "黑手符咒",
        bossTrick: ["黑手咒", "腐毒蔓延", "暗影傀儡"]
    },
    {
        bossId: 33, chapterIndex: 3, name: "百足虫",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/33.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "巨型蜈蚣精",
        position: "盘丝岭毒虫窟",
        difficulty: 7,
        experience: "攻击关节使其瘫痪",
        reward: "百足毒牙",
        bossTrick: ["毒雾喷吐", "百足穿刺", "缠绕攻击"]
    },
    {
        bossId: 34, chapterIndex: 3, name: "右手虫",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/34.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "寄生右手的妖虫",
        position: "盘丝岭寄生林",
        difficulty: 5,
        experience: "优先斩断寄生触手",
        reward: "寄生核心",
        bossTrick: ["触手鞭挞", "寄生种子", "虫群召唤"]
    },
    {
        bossId: 35, chapterIndex: 3, name: "小黄龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/35.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "盘丝洞守护龙，剧毒吐息",
        position: "毒龙潭",
        difficulty: 9,
        experience: "解毒丹必备，破角后输出",
        reward: "毒龙牙，避毒珠",
        bossTrick: ["毒液喷射", "龙翼斩击", "腐毒领域"]
    },
    {
        bossId: 36, chapterIndex: 3, name: "猪八戒",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/36.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "被魔化的天蓬元帅",
        position: "盘丝岭高老庄",
        difficulty: 9,
        experience: "破戒后进入狂暴状态",
        reward: "九齿钉耙碎片",
        bossTrick: ["天蓬下凡", "巨耙挥击", "猪魔真身"]
    },
    {
        bossId: 37, chapterIndex: 3, name: "紫蛛儿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/37.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "盘丝洞三当家，紫色毒蛛",
        position: "盘丝洞织网室",
        difficulty: 7,
        experience: "避免踩中紫色蛛网",
        reward: "紫蛛毒囊",
        bossTrick: ["剧毒蛛网", "紫雾弥漫", "毒卵孵化"]
    },
    {
        bossId: 38, chapterIndex: 3, name: "毒敌大王",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/38.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "蝎子精，尾刺剧毒",
        position: "盘丝岭毒蝎洞",
        difficulty: 8,
        experience: "侧面攻击避免尾刺",
        reward: "蝎尾针",
        bossTrick: ["毒刺突袭", "沙尘隐身", "蝎群召唤"]
    },
    {
        bossId: 39, chapterIndex: 3, name: "靡道人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/39.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "堕落道人，擅长幻术",
        position: "盘丝岭迷魂阵",
        difficulty: 7,
        experience: "破除幻象核心可解除",
        reward: "迷魂幡",
        bossTrick: ["心魔幻象", "七情迷阵", "六欲乱神"]
    },
    {
        bossId: 40, chapterIndex: 3, name: "晦月魔君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/40.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "掌控月蚀之力的魔君",
        position: "盘丝岭月坛",
        difficulty: 9,
        experience: "月蚀期间攻击力翻倍",
        reward: "晦月镜",
        bossTrick: ["月蚀领域", "暗月冲击", "月影分身"]
    },
    {
        bossId: 41, chapterIndex: 3, name: "百眼魔君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/41.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "全身长满眼睛的魔君",
        position: "盘丝洞核心",
        difficulty: 10,
        experience: "破坏所有眼睛才能击杀",
        reward: "千眼魔核",
        bossTrick: ["魔眼光束", "千眼领域", "魔眼幻阵"]
    },

    // ================== 火焰山 (42-50) ==================
    {
        bossId: 42, chapterIndex: 4, name: "石父",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/42.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "火焰山岩石巨人",
        position: "火焰山口",
        difficulty: 6,
        experience: "弱点是胸口的熔岩核心",
        reward: "熔岩石心",
        bossTrick: ["熔岩投掷", "地震践踏", "岩石护体"]
    },
    {
        bossId: 43, chapterIndex: 4, name: "快如风/疾如火",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/43.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "风火双煞组合",
        position: "火焰山风火道",
        difficulty: 7,
        experience: "先击杀疾如火可削弱快如风",
        reward: "风火轮碎片",
        bossTrick: ["风火连击", "烈焰旋风", "合体技·风火燎原"]
    },
    {
        bossId: 44, chapterIndex: 4, name: "云里雾/雾里云",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/44.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "云雾双生妖怪",
        position: "火焰山云台",
        difficulty: 7,
        experience: "驱散云雾可使其显形",
        reward: "云雾珠",
        bossTrick: ["云雾隐身", "凝雾成冰", "合体技·云遮雾罩"]
    },
    {
        bossId: 45, chapterIndex: 4, name: "火焰山土地",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/45.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "被火焰侵蚀的土地神",
        position: "火焰山神庙",
        difficulty: 6,
        experience: "熄灭神坛火焰可削弱",
        reward: "土地神杖",
        bossTrick: ["地脉喷火", "召唤火灵", "山神怒"]
    },
    {
        bossId: 46, chapterIndex: 4, name: "红银战车",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/46.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "红孩儿打造的火焰战车",
        position: "火焰山战场",
        difficulty: 7,
        experience: "破坏车轮可使其瘫痪",
        reward: "战车核心",
        bossTrick: ["火焰冲锋", "熔岩炮弹", "战车碾压"]
    },
    {
        bossId: 47, chapterIndex: 4, name: "赤金战车",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/47.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "红银战车的强化版",
        position: "火焰山要塞",
        difficulty: 8,
        experience: "攻击散热口可造成额外伤害",
        reward: "赤金装甲",
        bossTrick: ["三昧真火炮", "黄金冲撞", "战车合体"]
    },
    {
        bossId: 48, chapterIndex: 4, name: "兴烘掀/掀烘兴",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/48.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "火焰山双将，掌控火势",
        position: "火焰山熔岩河",
        difficulty: 8,
        experience: "分开两人可降低难度",
        reward: "火神令",
        bossTrick: ["火浪滔天", "熔岩喷发", "合体技·火焚城郭"]
    },
    {
        bossId: 49, chapterIndex: 4, name: "碧水金睛兽",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/49.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "水火双属性圣兽",
        position: "熔岩核心",
        difficulty: 9,
        experience: "冰属性克制，注意形态转换",
        reward: "圣兽之角，水火精魄",
        bossTrick: ["熔岩喷发", "寒冰吐息", "元素爆裂"]
    },
    {
        bossId: 50, chapterIndex: 4, name: "红孩儿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/50.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "火焰山少主，三昧真火",
        position: "火焰山圣婴宫",
        difficulty: 10,
        experience: "水属性攻击可熄灭三昧真火",
        reward: "火尖枪 三昧真火诀",
        bossTrick: ["三昧真火", "火尖枪法", "圣婴真身"]
    },

    // ================== 花果山 (51-62) ==================
    {
        bossId: 51, chapterIndex: 5, name: "玉灵官",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/51.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "天庭守将，奉命镇压花果山",
        position: "花果山南天门",
        difficulty: 8,
        experience: "破其金甲可降低防御",
        reward: "灵官印",
        bossTrick: ["天将斩", "金光护体", "天兵召唤"]
    },
    {
        bossId: 52, chapterIndex: 5, name: "跳浪蛟",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/52.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "花果山水域蛟龙",
        position: "花果山水帘洞外",
        difficulty: 7,
        experience: "离开水域可削弱其力量",
        reward: "蛟龙筋",
        bossTrick: ["水浪冲击", "蛟龙出海", "唤潮术"]
    },
    {
        bossId: 53, chapterIndex: 5, name: "水木兽",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/53.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "水木双属性灵兽",
        position: "花果山灵兽园",
        difficulty: 7,
        experience: "火克木，金克水",
        reward: "水木精魄",
        bossTrick: ["藤蔓缠绕", "水炮攻击", "生生不息"]
    },
    {
        bossId: 54, chapterIndex: 5, name: "凤翅将军",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/54.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "凤凰后裔，空中单位",
        position: "花果山云霄台",
        difficulty: 8,
        experience: "使用远程攻击或等其落地",
        reward: "凤羽披风",
        bossTrick: ["凤翼天翔", "烈焰俯冲", "凤凰鸣"]
    },
    {
        bossId: 55, chapterIndex: 5, name: "金甲犀",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/55.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "身披金甲的犀牛精",
        position: "花果山金石谷",
        difficulty: 6,
        experience: "腹部是唯一弱点",
        reward: "金甲碎片",
        bossTrick: ["金甲冲撞", "大地践踏", "金甲护体"]
    },
    {
        bossId: 56, chapterIndex: 5, name: "浪波波",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/56.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "水元素聚合体",
        position: "花果山瀑布",
        difficulty: 5,
        experience: "蒸发攻击可快速削减血量",
        reward: "纯净水精",
        bossTrick: ["水弹连射", "巨浪拍击", "水分身"]
    },
    {
        bossId: 57, chapterIndex: 5, name: "步云鹿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/57.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "脚踏祥云的神鹿",
        position: "花果山云端",
        difficulty: 7,
        experience: "破坏祥云可使其落地",
        reward: "祥云碎片",
        bossTrick: ["云踏冲击", "鹿角突刺", "祥云护体"]
    },
    {
        bossId: 58, chapterIndex: 5, name: "碧臂螂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/58.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "碧玉螳螂妖",
        position: "花果山翡翠林",
        difficulty: 8,
        experience: "注意格挡快速斩击",
        reward: "碧玉刀臂",
        bossTrick: ["双刀斩", "疾风闪", "碧玉风暴"]
    },
    {
        bossId: 59, chapterIndex: 5, name: "大石敢当",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/59.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "巨型石碑守护者",
        position: "花果山灵石阵",
        difficulty: 9,
        experience: "同时破坏三块核心石碑",
        reward: "灵石核心",
        bossTrick: ["石碑坠落", "地脉共振", "守护意志"]
    },
    {
        bossId: 60, chapterIndex: 5, name: "石猿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/60.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "孙悟空石像所化的妖猿",
        position: "花果山灵石像",
        difficulty: 9,
        experience: "模仿孙悟空招式，熟悉套路",
        reward: "灵石心",
        bossTrick: ["猴拳连打", "石猴分身", "灵石爆发"]
    },
    {
        bossId: 61, chapterIndex: 5, name: "大圣残躯",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/61.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "孙悟空被封印的残躯",
        position: "花果山水帘洞",
        difficulty: 10,
        experience: "三阶段变化，最后一管血会狂暴",
        reward: "如意金箍棒碎片",
        bossTrick: ["七十二变", "筋斗云", "法天象地"]
    },
    {
        bossId: 62, chapterIndex: 5, name: "二郎显圣真君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/62.png?Expires=1748630745&OSSAccessKeyId=TMP.3KqxeHgCVxPbgu5kxgmRbJJzJYUo4ga23n1KkfvHdvCFrxiWjy61RArLWzT8ex3VwMumZEFRypHG42XydGWMwZAhXxHd8M&Signature=hpNEZfOjmjHW%2FI92ZArgGzy5ans%3D",
        description: "天庭第一战神，三尖两刃刀持有者",
        position: "花果山巅峰",
        difficulty: 10,
        experience: "三阶段变身需打断，携带破法法宝",
        reward: "神通·天眼 神器碎片",
        bossTrick: ["天眼射线", "神犬突袭", "法天象地", "八九玄功"]
    }
];
