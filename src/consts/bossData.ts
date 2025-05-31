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
        description: "意气出毒谋，惹祸终自受。\n" +
            "\n" +
            "天道虽不言，善恶必追究。\n" +
            "\n" +
            "广智幼时并非和尚，而是只极想做人的小狼妖。\n" +
            "\n" +
            "他经常化形去镇上玩耍，却总被人们识破，受人追打。他向其他小妖询问缘由，众妖都道：“你虽变得像人，却没有人味，自然会被认出。你若想学做人，就该去人堆里待着，与人相处，学习他们的礼仪和习惯。”他深以为然，跑去求大王成全。他的大王凌虚子与山中的黑熊精十分相熟，黑熊精就将其化作一个小和尚，荐给了一同论禅的金池长老做个弟子。\n" +
            "\n" +
            "初时，庙里一众和尚都不喜欢他，时常戏弄他做耍。而他总是讷讷的，上当受骗。老和尚便给他取了法号叫广智，希望他机智敏锐，不再受同门欺负。在老和尚的关照教导下，广智真就学会了读书写字，清规戒律，慢慢融入了和尚之中。\n" +
            "\n" +
            "某日，庙中来了师徒二人，一个是白面的胖和尚，一个是雷公嘴的毛和尚。他们带来了一件锦榈袈裟，是老和尚从未见过的异宝。老和尚一心一意地想要，广智想报答老和尚的恩情，就仔细替他谋算起来。\n" +
            "\n" +
            "广智从未料到，只因自己的一念之差，红色的火浪，吞噬了他熟悉的整个禅院。其后，老和尚自戕，凌虚子死在了金箍棒下，连黑熊精也受降去了南海。他深觉自己连累了许多人，认定自己做人实乃惨败，便弃了和尚的身份，重回山中，照着老和尚教的佛法，好生悔悟去了。\n" +
            "\n" +
            "在山中修炼的日子里，他仿照那夜所见漫山遍野的火浪，炼就了一门新兵器，名为“赤潮”。即使许多年过去，他仍能听到山中传来的呼唤：广智，广智！这究竞是谁，在不住地呼唤他？",
        position: "游记位置：位于第一回头目词条【牯护院】的下方。\n" + "\n" + "具体位置：点亮第二个土地庙【林外】后一直往前走，右边方是幽魂，继续往前能看到一个桥上面有一个弓箭手，过桥继续直走就能到广智所在位置。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-position.png',
        difficulty: 1,
        experience: "此时我们的等级不高，建议将技能点加到棍法一栏，点三点将第二段棍势点出来就行。\n" +
            "\n" +
            "广智和幽魂是在同一片地区出现的BOSS，幽魂甚至离土地庙更近一点，但这里推荐大家先击败广智再去找幽魂，击败广智可以获得变形能力，变成广智可以额外多一管额外血条，大大提高我们前期BOSS战的容错。\n" +
            "\n" +
            "广智的攻击模组与牯护院相比要敏捷许多，其使用火焰附魔双头剑在连招能够夹杂火焰伤害。\n" +
            "\n" +
            "可能是考虑到是一个前期BOSS的原因，设计师并没有给广智塞快慢刀、神经刀这些东西，虽然看着连招很快范围也很广，但躲避起来也很容易。\n" +
            "\n" +
            "除了基础的连招外广智可以从较远距离旋转刀刃突进到玩家周围，也可以将双头剑扔出远程攻击玩家。\n" +
            "\n" +
            "打广智我们要注意重棍的使用，广智的强韧很低，普通攻击连招的最后一击与重棍都能造成硬直，进入战斗后先正常攻击正常躲避技能，攒够第一个棍势直接找机会敲下去造成硬直。\n" +
            "\n" +
            "广智硬直期间立刻接一套普攻连招，注意最后一击的攻击时间造成第二次硬直，恢复一下体力马上用定身术再接一套普攻连招，使用最后一击造成硬直后直接消耗积攒的所有棍势重击广智，这一套下来我们虽然在战斗中也有损伤，但能消耗广智四分之三的血量，而我们的葫芦还是满的。\n" +
            "\n" +
            "后面会进入广智的攻击节奏，躲避的同时穿插普攻，等在棍势积攒起来时直接定身术打一套普攻连招，最后消耗棍势将广智击败即可。",
        reward: "564灵蕴和2个棉纱，拾取广智掉落的武器获得变化技能【狼】",
        bossTrick: [
            {
                name: "二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-trick1.gif"
            },
            {
                name: "火焰旋转",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-trick2.gif"
            },
            {
                name: "近战五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-trick3.gif"
            },
            {
                name: "两连突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-trick4.gif"
            },
            {
                name: "三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-trick5.gif"
            },
            {
                name: "四连劈地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-trick6.gif"
            },
            {
                name: "跳高突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-trick7.gif"
            },
            {
                name: "远程扔棍",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广智/gz-trick8.gif"
            },
        ]
    },
    {
        bossId: 1, chapterIndex: 0, name: "幽魂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/1.png",
        description: "暂无记载",
        position: "游记位置：幽魂没有影神图。\n" +
            "\n" +
            "具体位置：走主线就能遇到。",
        positionImgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/幽魂/yh-position.png",
        difficulty: 1,
        experience: "棍法点到二棍势即可。\n" +
            "\n" +
            "幽魂的外表是一个大头佛，总体攻击欲望不高，常常通过挥舞拳掌进行小范围近战攻击，也有单一的突进与远程攻击手段，但远程攻击的伤害很高，前摇不明显，也是对前期玩家威胁最大的攻击。\n" +
            "\n" +
            "破防阈值为3次重击左右，将第三次重击控制在可破坏的场景物体旁边，使幽魂倒地的时候撞到场景可破坏物体可以有效的延长倒地时间。\n" +
            "\n" +
            "因为幽魂的BOSS位置在一个开放场地，所以我们可以在幽魂没有进入攻击状态前直接使用一套近战攻击，当最后一棒敲下去还能对其造成短时间的硬直。\n" +
            "\n" +
            "这时我们也攒好了第一次重棒需要的棍势，立刻使用一次重击造成第二次硬直，然后短暂普攻几下，发现幽魂缓过来直接使用定身术，再打一套完整的普攻连招，最后一棒即可让幽魂破防倒地，这时我们注意观察自己的体力，继续输出即可，但不要消耗棍势使用重击。\n" +
            "\n" +
            "在幽魂站起来后使用刚才普攻积攒的棍势再次重击造成硬直，输出最后一套，这时我们基本已经无伤消耗了幽魂的半管血，进入幽魂高欲望的攻击节奏，注意不要被消耗太多血量，挺过这一轮攻击是关键。\n" +
            "\n" +
            "后面再重复一次上述流程，即可将击败幽魂，幽魂的攻击招式没有变化，我们也有高效无伤的输出手段，因此击败幽魂的难度不算高。",
        reward: "【精魄】幽魂（需要与葫芦仙人对话后才能吸取）",
        bossTrick: [
            {
                name: "多连撼地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/幽魂/yh-trick1.gif"
            },
            {
                name: "三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/幽魂/yh-trick2.gif"
            },
            {
                name: "双突进回旋",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/幽魂/yh-trick3.gif"
            },
            {
                name: "撼地二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/幽魂/yh-trick4.gif"
            },
            {
                name: "组合连击1",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/幽魂/yh-trick5.gif"
            },
            {
                name: "组合连击2",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/幽魂/yh-trick6.gif"
            },
        ]
    },
    {
        bossId: 2, chapterIndex: 0, name: "灵虚子",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/2.png",
        description: "苍毛生锐气，血口透寒芒。\n" +
            "\n" +
            "爪如索魂钩，尾似哭丧棒。\n" +
            "\n" +
            "假名成道友，禅院充虚相。\n" +
            "\n" +
            "可怜功果散，仍是旧皮囊。\n" +
            "\n" +
            "禅院的苍狼精，原是狮驼国流民。城破后，群狼随他一路远走，终在黑风大王的庇护下，安家落户。\n" +
            "\n" +
            "与求仙问道，心怀超脱的老凌虚子不同，这苍狼精不羡仙佛之超然，不屑长生之虚言，只情修炼气力与本事，铁爪一钩，脱皮露骨。\n" +
            "\n" +
            "自从老凌虚子不知所踪，黑熊精便扶了这苍狼精继位狼妖妖王，并改其名为灵虚子，着他看守观音禅院。\n" +
            "\n" +
            "与灵虚子同来的狮驼国狼妖，自然也得了势，吃的用的都超过了黑风山的旧部。本处群狼原就不喜灵虚子的修炼之道，如今还把他们挤到一边，更是心生怨怼。义愤之情，让他们更加团结。他们时常相聚，互相安慰，怀念老妖王的统领，一边密谋声讨新继位的妖王。\n" +
            "\n" +
            "未料，灵虚子早有所备，他假借点卯之名，将本处小妖召集在禅院之中，命令接管的随从侍卫们围捕闹事的妖众。禅院乱做一团，他从房顶一气跃下，扑在群妖中，要将他们吞噬殆尽。\n" +
            "\n" +
            "刀狼教头闻声赶来，这才抵敌住灵虚子，保下小妖们性命。黑风大王得知此事，原要发落众妖，幸得蛇精一派调停周旋，这才双方安宁下来。自此，本处的旧狼妖们再也不愿意靠近观音禅院半步。",
        position: "游记位置：位于游记第一回妖王与总妖王词条的第一位。\n" +
            "\n" +
            "具体位置：此BOSS位于观音禅院内，击败幽魂从幽魂旁边的门缝继续走主线就会碰到灵虚子。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-position.png',
        difficulty: 1,
        experience: "加点棍法将第二段棍势点出来，然后根基将任翻腾点出来，其他没啥要求。\n" +
            "\n" +
            "招式解析与应对方法\n" +
            "攻击模组基本就是使用爪子、嘴进行大开大合的攻击，因此躲避也相对容易，毛多弱火的传统相信大家也是知道的。\n" +
            "\n" +
            "正好变形成广智就能够通过攻击给敌人上一个火焰异常状态。\n" +
            "\n" +
            "见面直接打一套连招再用定身术打一套，最后观察情况躲避技能然后接两段棍势重击，这时灵虚子会跳到四周的房子上，等待数秒回俯冲下来。\n" +
            "\n" +
            "直接变广智开始连招，先用普攻连招积攒右下角的值，再使用闪避后的重击伤害更高。\n" +
            "\n" +
            "给灵虚子附上火焰异常后基本都是框框掉血，变回猴子如果定身术好了直接定身术，没定身术就找破绽攻击，打不了几下基本能结束战斗，这场BOSS战没什么难度。\n" +
            "\n",
        reward: "灵蕴754、白脸子、绵纱2",
        bossTrick: [
            {
                name: "单次爪击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick1.gif"
            },
            {
                name: "房顶飞扑",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick2.gif"
            },
            {
                name: "翻滚攻击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick3.gif"
            },
            {
                name: "吼叫",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick4.gif"
            },
            {
                name: "啃咬",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick5.gif"
            },
            {
                name: "两连扑击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick6.gif"
            },
            {
                name: "跳高二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick7.gif"
            },
            {
                name: "投技",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick8.gif"
            },
            {
                name: "跳高扑击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/灵虚子/lxz-trick9.gif"
            },
        ]
    },
    {
        bossId: 3, chapterIndex: 0, name: "广谋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/3.png",
        description: "佛口蛇心真似毒，两面三刀还反复。\n" +
            "\n" +
            "哪得丹心向师祖，空听禅机夜虚度。\n" +
            "\n" +
            "广谋与他师兄广智不同，他自幼的心愿，是做个历代持名的大妖王。\n" +
            "\n" +
            "可事与愿违，因凌虚子将爱徒送去观音禅院做了和尚，白花蛇精十分忧心，他忌怕这是凌虚子拉拢黑熊精的手段，就命令广谋也出家为僧了。\n" +
            "\n" +
            "临行前，白花蛇精告诚广谋，绝不可落于人后，尤其是广智。可不论广谋如何努力，金池长老总不如像喜欢广智般喜欢他，哪怕他学得更快，练得更多，也无济于事。广谋认为此乃非战之罪，皆因大王照猫画虎，这才连累自己受人厌弃。他时常安慰自己，他是要回山中做妖怪的，才不在乎这些。\n" +
            "\n" +
            "广谋忆起当年，老和尚常教导他：“你行事太绝，事事都应留个有余不尽的意思。”可那日见到锦榈袈裟，老和尚一心想要，竟彻底忘了此话。他嘤嘤哭到半夜，广谋早就看出，他动了杀人夺宝的念想。众人俱是小心避开，唯有耿直的广智说了出来。\n" +
            "\n" +
            "广谋心中无名恼火，索性计中生计。老和尚与那师徒二人饮茶时，他就看出，那猴子的双眼中，戾气难驯，定是个有仇必报的，就依着广智的主意，推波助澜，出了个赶尽杀绝，不留余地的计谋。那老东西果真高兴起来，头次欣赏起广谋的才华。\n" +
            "\n" +
            "献完计策，广谋料准此夜大祸将至，使股旋风，躲入山后竹林去了。果然，那晚发起大火，非但没有烧死取经僧，反把个禅院烧没了。\n" +
            "\n" +
            "咦，世上果有此等小人，引得高士入局，败在他的一条歪计之下，或许就是世人常说的借刀杀人罢。",
        position: "游记位置：位于第一回头目词条【广智】的下方。\n" +
            "\n" +
            "具体位置：有两条路都通往广谋所在的竹林，以蛇径土地庙为出发点，从左边房子跳下击败浪里个浪然后往右走，或者往蛇径土地庙右边的楼梯沿路一直走。\n" +
            "\n" +
            "到达竹林直接绕着墙一直走，有篝火燃烧的入口便是广谋所在的位置。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广谋/gm-position.png',
        difficulty: 1,
        experience: "人物等级10级，根基点出任翻腾，棍法用三个技能点激活第二段棍势即可，其他技能点建议加到定身法。\n" +
            "\n" +
            "广谋擅长使用各类远程法术进行攻击，还会频繁的瞬移，血条过半后还能召唤出大量的蛇辅助攻击，玩家被蛇命中会积累毒素异常状态，累计值满开始持续扣血。\n" +
            "\n" +
            "总体来说广谋的攻击花样很少，基本就是两个法术来回使用再配合瞬移，法术的攻击前摇明显好躲，伤害也不高，就一直普攻追广智瞬移后的位置。\n" +
            "\n" +
            "将变身留在广谋血条后期收尾就行，这场BOSS战难度很低，基本就是精英怪级别。",
        reward: "566灵蕴、2个棉纱与广谋的精魄",
        bossTrick: [
            {
                name: "飞弹攻击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广谋/gm-trick1.gif"
            },
            {
                name: "龙卷风",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广谋/gm-trick2.gif"
            },
            {
                name: "散叶",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广谋/gm-trick3.gif"
            },
            {
                name: "吐毒",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广谋/gm-trick4.gif"
            },
            {
                name: "召唤小蛇",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广谋/gm-trick5.gif"
            },
            {
                name: "震荡波",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/广谋/gm-trick6.gif"
            },
        ]
    },
    {
        bossId: 4, chapterIndex: 0, name: "白衣秀士",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/4.png",
        description: "翩翩恰少年，白衣配怒颜。\n" +
            "\n" +
            "吟诗折扇骨，嗔怒出枪尖。\n" +
            "\n" +
            "春日，风和，白雾泽。\n" +
            "\n" +
            "一老狼架炉烹茶，看着水中白影喃喃：“你我本不该在此。”\n" +
            "\n" +
            "白衣秀士正自舞着—段枪法，闻及此言，倏地将枪掷到炉旁，将身一闪，已握住枪柄，立在老狼身前。\n" +
            "\n" +
            "“饮血，还是喝茶？”\n" +
            "\n" +
            "“喝茶。坐。”\n" +
            "\n" +
            "二人对坐，老狼将一碗茶汤递与秀士。\n" +
            "\n" +
            "秀士一饮而尽：“好茶。”\n" +
            "\n" +
            "老狼领首，问：“一个烧过的山场，可值许多把戏？”\n" +
            "\n" +
            "秀士答：“我奉大哥之命来此，绝无把戏。”\n" +
            "\n" +
            "老狼反问：“那我起死回生，难道不是把戏？”\n" +
            "\n" +
            "秀士不语，老狼盯着秀士亦不语，他双目虽浑浊，却难掩焦急之情。\n" +
            "\n" +
            "秀士思量片时，终是答道：“这个还真不是把戏。”\n" +
            "\n" +
            "“若非把戏，何解？”\n" +
            "\n" +
            "“你可听过天上那童子，佛祖菩萨有个术法，拼凑外物，念动起死回生真言，遂救得性命。”\n" +
            "\n" +
            "老狼苦笑摇头：“大王绝无这等本事。”“他没有，他得来的邪物有。”\n" +
            "\n" +
            "老狼心急道：“可我如此苟活，寝食难安。”\n" +
            "\n" +
            "“必死则生，幸生则死，一息尚存，也算超然……”\n" +
            "\n" +
            "老狼不语，秀士垂眼亦不语，他双目虽异瞳，却难掩怜悯之色。\n" +
            "\n" +
            "老狼道：“这茶留于你了。还是喝茶好。”\n" +
            "\n" +
            "老狼拂袖起身，喟然而叹：“饮他们的血，我于心何忍呐…。。。”\n" +
            "\n" +
            "他蹒跚离去，并非来时之路，只向水泽—侧的岔路拐过。\n" +
            "\n" +
            "“叫大王，不用再来看我了。”",
        position: "游记位置：白衣秀士是第一回的额外BOSS，位于人物词条的第一位。\n" +
            "\n" +
            "具体位置：主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/白衣秀士/byxs-position.png',
        difficulty: 2,
        experience: "走主线就能遇到，不同担心错过。白衣秀士是第一回唯一一个拥有两个形态两管血条的BOSS，擅长使用长枪进行中距离连招，攻击欲望较高，但白衣秀士每打完一套连招都会与玩家对峙一会，给玩家一点补充状态的时间。\n" +
            "\n" +
            "打白衣秀士首先要试错几次熟悉其连招的节奏，第一形态的白衣秀士连招相对固定，基本都是突刺到玩家旁边，使用长枪打一套连招完事立刻开始舞枪打出很多远距离剑气远程攻击。\n" +
            "\n" +
            "其中只有白衣秀士将枪尖插到地面再扒住枪杆转圈这套连招有快慢刀，需要注意躲避时机，其他连招都很好躲，正常躲技能穿插普攻积攒棍势，找准机会重击就行，虽然白衣秀士不吃硬直，但血很脆。\n" +
            "\n" +
            "第二阶段白衣秀士的血条回满，下半身变成蛇，上半身依然保持人形姿态舞枪，连招范围会进一步增加，尤其要小心第二阶段的突刺技能，前摇基本看不到，一不小心就会被抓住破绽。\n" +
            "\n" +
            "所以第二阶段建议多把自己放在被动的一方，将变形留在二形态自己或BOSS没血再用，在白衣秀士的一招一式下穿插普攻，少用重击给自己创造真空破绽是最优解。",
        reward: "玉垂牙、棉纱、灵蕴",
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
