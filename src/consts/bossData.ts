export interface BossInfo {
    bossId: number; // boss的id(0-62)
    chapterIndex: number; // 章节索引(0-5)
    name: string; // boss名字
    imgUrl: string; // boss图片的url
    description?: string; // boss描述与背景故事
    position: string; // boss出现位置
    positionImgUrl?: string; // boss出现位置的图片url
    difficulty: number; // boss难度(1-10)
    experience: string; // boss的打法和经验
    reward?: string; // boss掉落奖励
    bossTrick?: TrickInfo[]; // boss的招式
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

export const chapterName: string[] = ["黑风山", "黄风岭", "小西天", "盘丝岭", "火焰山", "花果山"];

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
            "具体位置：有两条路都通往广谋所在的竹林，以蛇径土地庙为出发点，从左边房子跳下击败浪里个浪然后往右走，或者往蛇径土地庙右边的楼梯沿路一直走。到达竹林直接绕着墙一直走，有篝火燃烧的入口便是广谋所在的位置。",
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
        bossTrick: [
            {
                name: "八连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/白衣秀士/byxs-trick1.gif"
            },
            {
                name: "后撤步突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/白衣秀士/byxs-trick2.gif"
            },
            {
                name: "急速突击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/白衣秀士/byxs-trick3.gif"
            },
            {
                name: "枪击突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/白衣秀士/byxs-trick4.gif"
            },
            {
                name: "扔枪三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/白衣秀士/byxs-trick5.gif"
            },
            {
                name: "四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/白衣秀士/byxs-trick6.gif"
            },
            {
                name: "蓄力重击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/白衣秀士/byxs-trick7.gif"
            },
        ]
    },
    {
        bossId: 5, chapterIndex: 0, name: "金池长老",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/5.png",
        description: "白手传经饿后人，竞产争财误终生。\n" +
            "\n" +
            "合该定杆金银秤，好算功德抵罪惩。\n" +
            "\n" +
            "一行有两个月太平之路，三藏勒马遥观，只见山凹中楼台影影，殿阁沉沉，直至山门首观看，果然是一座寺院。\n" +
            "\n" +
            "他师徒两个道了问讯，进了山门，见正殿上书四个大字，是“观音禅院”。三藏大喜，行者却道：“师父，这不是个好去处，还是趁早走了为妙。”这长老哪里肯听，望了金像就拜。行者在侧，只管撞钟不歇，惊动寺里大小僧人，上下房长老一齐拥出。\n" +
            "\n" +
            "众僧与三藏见礼，行者就拿火眼金睛四下观望，笑道：“你们这里的和尚，怎么面黄气弱，元神不足？莫不是破了戒矣？”\n" +
            "\n" +
            "三藏见此间和尚各个袈裟簇新，身体高大，只觉行者说了句风话，道：“莫乱谈。”转而向众僧告罪。众僧也只当行者胡说，唯有两个绝小的和尚，掩在人群里，不敢出头。\n" +
            "\n" +
            "院主又请师徒二人入后房用茶，待众僧序了坐次，排了斋宴，那两个小和尚才搀着老僧进来。\n" +
            "\n" +
            "三藏躬身施礼，二人寒暄数句，三藏问：“老院主高寿几何？”老僧道：“痴长二百七十岁。”行者听见，笑道：“你这老剥皮，禅院怎么有些妖气？”老僧不做答，三藏忙道：“我这徒弟性子有些不好，老院主勿怪。”\n" +
            "\n" +
            "有个小和尚，正用美器斟了三杯香荼来献，行者盯着他瞧，又道：“你这小和尚哪里来的？”小和尚放了茶，忙躲身老僧之后，咬着指头道：“这和尚丑头怪脑，有些吓人。”\n" +
            "\n" +
            "三藏瞅了行者一眼，道：“谨言！莫要不识高低，冲撞人。”又借口对香茶美器夸爱不尽，揭过了此番。\n" +
            "\n" +
            "老僧不戒意，反问三藏道：“老爷自上邦来，可有什么宝贝，借与弟子一观？”\n" +
            "\n" +
            "三藏再三推辞，行者却笑道：“师父，那领袈裟，不是件宝贝？拿与他看看何如？”\n" +
            "\n" +
            "众僧皆笑，继而抬出十二柜袈裟，抖开挂起，请三藏观看。行者却笑道：“好，好，好。收起，收起。把我们的也取出来看看。”\n" +
            "\n" +
            "三藏把行者扯住，十分劝阻，行者道：“放心！放心！都在老孙身上！”不由分说，取出袈裟与众僧看了。\n" +
            "\n" +
            "那老和尚见了这般宝贝，果然动心，走上前对三藏跪下，眼中垂泪：“我弟子真是没缘。眼目昏花，不能看得明白。”\n" +
            "\n" +
            "行者复又笑道：“你要怎的看才好？”老僧道：“老爷若是宽恩放心，教弟子拿到后房，细细的看一夜，明早送还老爷西去，不知尊意何如？”\n" +
            "\n" +
            "三藏听说，吃了一惊，埋怨行者。行者笑道：“怕他怎的？等他拿了去看。但有疏虞，尽是老孙管整。”",
        position: "游记位置：位于游记第一回妖王词条【黑风大王】的下方。\n" +
            "\n" +
            "具体位置：需要敲向地图内的三口打钟，第一口位于广智的BOSS战场地，第二口位于广谋的BOSS战场地，第三口位于白衣秀士的BOSS战场地，击败白衣秀士后往左边的道路走。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/金池长老/jczl-position.png',
        difficulty: 2,
        experience: "此时整体等级不高，加点优先将三棍势点出来，然后根基将任翻腾点出来，其他没啥要求。\n" +
            "\n" +
            "金池长老是第一回的隐藏BOSS，需要敲响三个分布在地图各处的大钟传送到隐藏地图“隐·旧观音禅院”。\n" +
            "\n" +
            "不仅外观与幽魂很想，攻击方式也和幽魂别无二致，完全可以当做一个升级版的幽魂来打。\n" +
            "\n" +
            "与幽魂不同的是金池长老可以控制旁边的小怪向玩家自爆，虽然好躲但数量极多，如果属于观察容易被不知道哪来的小怪突然炸一下。\n" +
            "\n" +
            "如果发现金池长老升到半空开始念经时，我们需要将周围的小怪全部干掉，如果让小怪走到金池长老附近能够给它回血。\n" +
            "\n" +
            "除了上述的两个招式威胁较大且没有出现过，其他招式都是幽魂用过的，小编初见就过了，非常简单的BOSS。",
        reward: "灵蕴2000、【法宝】辟火罩",
    },
    {
        bossId: 6, chapterIndex: 0, name: "黑风大王",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/6.png",
        description: "前程暗漆本难知，乘风得势各有时。\n" +
            "\n" +
            "既成南海修真士，却叫财迷作钱痴。\n" +
            "\n" +
            "自南海归来，黑风大王心怀壮志，誓要在山中重振雄风。他深知自己一去多年，要在群妖中树起威望，单凭武力是不能服众的，因此他做了许多举措，想挣得敬畏与忠诚。\n" +
            "\n" +
            "在南海时，他学过起死回生真言，便以自愿赴死的狼妖为牺牲，救活了苍狼精老凌虚子。不曾想那老狼却不识好歹，还魂后留下只言片语竟不再见他了。\n" +
            "\n" +
            "黑风大王怕群狼无首，乱了阵脚，只好另选狼妖继任妖王。他见狮驼国来的苍狼精，年富力强，是个尚佳之选，便亲自赐了名、扶他上位。不曾想群狼却在禅院引发动乱，险些酿下自相残杀的大祸。\n" +
            "\n" +
            "见众妖难以与自己相知，苦闷之下，他又施法想要还魂昔日一同论禅的老和尚。不曾想那老和尚的魂魄未在拼凑的尸身上复生，反与他旧日理藏的金银铜钱化生了个发昏的精怪，天天搅扰山场，没个消停。\n" +
            "\n" +
            "幸而，白衣秀士深得黑熊精重用，认为是个一等一的贤能之辈，赤胆忠义，为他省下许多烦恼。\n" +
            "\n" +
            "咦，自作高明，反而一事无成，真可谓下士有志，不如碌碌庸人哩。",
        position: "游记位置：位于游记第一回妖王词条【灵虚字】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-position.png',
        difficulty: 3,
        experience: "此时整体等级不高，加点优先将三棍势点出来，然后根基将任翻腾点出来，其他没啥要求。\n" +
            "\n" +
            "招式解析与应对方法\n" +
            "黑风大王为正常的人形BOSS，走主线就能遇到，通过一把长枪附魔攻击，每次攻击都伴有蓝色火焰特效，显的攻击范围很广，主要靠挥舞长枪的长连招抓我们躲避的失误造成威胁，还能够化成风进入无敌状态来攻击我们，难度偏高。\n" +
            "\n" +
            "但他的身板很脆，只需要打完一套普攻连招就能消耗不少血量，黑风大王的韧性也很高，无法通过重击造成明显的硬直。\n" +
            "\n" +
            "他的攻击欲望在第一回的所有BOSS中也算非常高的，建议先试错观察几次黑风大王的招式再正式开打。\n" +
            "\n" +
            "进入BOSS房直接跑到黑风大王旁边输出半套连招，他也属于开场先放狠话的类型，在我们攻击半套才会反应过来开始回击，因此攻击半套及时收手防止自己攻击造成的硬直被敌人直接抓到。\n" +
            "\n" +
            "然后在黑风大王攻击的时候抓他的硬直，普工一棍两棍的继续躲伤害，上面也提到过黑风大王身板很脆，通过躲避连招断断续续的攻击积攒棍势，通过定身术使用重击造成大量伤害。\n" +
            "\n" +
            "本场战斗小编的加点为重击流，棍势达到三层，因此攻击套路也是通过普通与频繁的躲避技能积攒棍势，通过定身术与黑风大王本身技能造成的硬直进行输出。\n" +
            "\n" +
            "黑风大王在受到大量伤害会幻化成风球，通过突刺来攻击玩家，风球每次爆炸的瞬间便是黑风大王突刺的前摇，直接往旁边翻滚躲避，敌人连招结束会直接降落在BOSS房中间的位置，造成一次小范围AOE伤害。\n" +
            "\n" +
            "也需要注意黑风大王的人形突进招式，常常在猴子喝药的时候使用，建议在耗掉黑风大王大半管血后再使用变形技能，通过狼形态收尾。",
        reward: "灵蕴696、奇术【聚形散气】、精石1",
        bossTrick: [
            {
                name: "近战三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-trick1.gif"
            },
            {
                name: "近战四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-trick2.gif"
            },
            {
                name: "近战五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-trick3.gif"
            },
            {
                name: "变风",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-trick4.gif"
            },
            {
                name: "持枪突进",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-trick5.gif"
            },
            {
                name: "隐身突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-trick6.gif"
            },
            {
                name: "吐火",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-trick7.gif"
            },
            {
                name: "远程剑气",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑风大王/hfdw-trick8.gif"
            },
        ]
    },
    {
        bossId: 7, chapterIndex: 0, name: "黑熊精",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/7.png",
        description: "紫竹难定俗尘心，潮音未改风与云。\n" +
            "\n" +
            "知机未必真机灵，倚天才知无天命。\n" +
            "\n" +
            "紫竹林中，素日清闲。黑熊精天天就着马蓝头醋拌笋尖，喝些自酿的竹叶酒，日子快淡出鸟来了。\n" +
            "\n" +
            "这日，龙女携善财突然造访，慌得他急忙收拾碗盏，遮遮掩掩。\n" +
            "\n" +
            "龙女将眼一翻，问道：“前几日菩萨与你说的差事，你可想好了？”\n" +
            "\n" +
            "黑熊精不答，只从箱内找出个匣子，递到龙女跟前。善财抢过来，揭开一看，是座蜜煎糖浇，晶莹剔透的狮仙糖。\n" +
            "\n" +
            "“昨日有场法事，斋宴顶上，有座最洁净最显眼的糖点，我特意留着，孝敬你的。”\n" +
            "\n" +
            "“你知我吃不吃糖？就这东西，还是留给小孩子家罢。”\n" +
            "\n" +
            "善财一听，没了兴致，立时将匣子捽回黑熊精怀内，龙女这才轻侮地一笑。知道自己闹了个无趣，黑熊精磨磨蹭蹭道：“我有心效力，但手段平平。此等大事，只怕办不好……”\n" +
            "\n" +
            "龙女答道：“我们岂能不知？放心，自有比你凶，比你狠的冲在前头。”“无功不受禄，若是烫手的山芋，不好下口哩。”\n" +
            "\n" +
            "“自有菩萨打点，哪有什么烫手之说。”\n" +
            "\n" +
            "“你莫诳我，菩萨叫我在此静修，怎会又替我打点。”\n" +
            "\n" +
            "龙女悾着脸，道：“你怎这般没胆识，此番可是个大机缘，抢着去的人排都排不过来。只因菩萨要点个亲信些的，这才选了你，你竟悟不出来？”\n" +
            "\n" +
            "黑熊精半晌无话，龙女被磨尽了耐性：“这点胸怀也无。罢！罢！罢！我替你回了菩萨去。”\n" +
            "\n" +
            "“姐姐，姐姐，我不是那个意思。我去，我去！”\n" +
            "\n" +
            "只待瞧见了黑熊精满眼热盼，龙女这才将眼又一翻，撤下善财，飘摇而去。\n" +
            "\n" +
            "见她走远，善财急急追问：“到底是何差事？我想走，你不若禀告菩萨，把我也带上罢。”\n" +
            "\n" +
            "“是有些要紧差事，可你刚听了，菩萨不让你去。你休再缠我，别连带我也失了机缘。”\n" +
            "\n" +
            "数日后。\n" +
            "\n" +
            "黑熊精收拾停当，绰着一杆黑缨枪正要远行。善财在竹林外守候多日，赶紧跟上他，又闹着要与他同行。\n" +
            "\n" +
            "黑熊精一反常态，劝道：“善财，菩萨嘱咐了，让你老实呆着。此次你父亲也被强征出战，可见凶险，不是胡闹的。”他摸了摸额上的禁箍，叹道：“为了去个箍儿，丢了性命，便是不值了。”\n" +
            "\n" +
            "话毕，他将身一摇，化作一道黑风，不顾善财的呼喊，迅速遁去了。\n" +
            "\n" +
            "其后，善财在紫竹林外等了他很久，再也未见他回来。事后红孩儿回想，那原是他在南海，最后一次见到黑熊精。",
        position: "游记位置：位于游记第一回妖王词条【黑风大王】的下方。\n" +
            "\n" +
            "具体位置：主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑熊精/hxj-position.png',
        difficulty: 3,
        experience: "点出【棍法-劈棍-展足】，携带白衣秀士掉落的【锦鳞战袍】和【行者戒箍】，其余优先点满【定身术】。\n" +
            "\n" +
            "开局定身术，然后奔跑蓄力，蓄力满了就靠近重击，半血以下不要急着回血，【锦鳞战袍】会自动回血，全程拉开距离慢慢磨，当黑熊精化成风，就要抓一下他发光的瞬间进行闪避。\n" +
            "\n" +
            "二阶段黑熊精着火之后，直接打开辟火罩，可以免疫火焰伤害，然后继续奔跑拉开距离蓄力，蓄力满了来一棍，它的伤害不可能比我们高，就可将其耗死。\n" +
            "\n" +
            "黑熊精是黑风大王的第二阶段，从人形变成了一只巨熊，血量变厚的同时攻击手段也变成了大范围明显前摇的攻击。\n" +
            "\n" +
            "血量也比人形时厚了不少，因此这场战斗的关键是躲避巨熊的攻击，慢慢的消耗其血量。\n" +
            "\n" +
            "第一次打先试错，适应一下黑熊精的攻击前摇与躲避手感，第二次正常打就行，黑星精通常使用前掌来攻击，偶尔会跳起来或幻化成一团火冲过来突刺，都是前摇明显很好躲避的招式。\n" +
            "\n" +
            "在黑熊的血量到半管及以下时，固定会幻化成一团火开始连续突刺，其机制与黑风大王的风相同，只需要在发现爆炸后翻滚即可，这场BOSS战的难度很低。",
        reward: " 兽棍·熊罴、烈火乌金",
        bossTrick: [
            {
                name: "近战三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑熊精/hxj-trick1.gif"
            },
            {
                name: "双爪拍地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑熊精/hxj-trick2.gif"
            },
            {
                name: "跳跃背摔",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑熊精/hxj-trick3.gif"
            },
            {
                name: "隐身一击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑熊精/hxj-trick4.gif"
            },
            {
                name: "近战二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑熊精/hxj-trick5.gif"
            },
            {
                name: "火焰三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑熊精/hxj-trick6.gif"
            },
            {
                name: "突进三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑熊精/hxj-trick7.gif"
            },
        ]
    },

    // ================== 黄风岭 (8-19) ==================
    {
        bossId: 8, chapterIndex: 1, name: "沙国王父子",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/8.png",
        description: "聪明老子糊涂儿，一个算计两个呆。\n" +
            "\n" +
            "阵上父子真有情，相父抛石儿逞快。\n" +
            "\n" +
            "打虎兄弟莫论才，莽汉将军迟早栽。\n" +
            "\n" +
            "莫亏阴德损后代，算计终害自家儿。\n" +
            "\n" +
            "斯哈哩国曾经有三位王子。\n" +
            "\n" +
            "大王子最受国王宠爱，他在蝜蝂大战中军功累累，被封为英武将军，后来却得了癔症，七情不全，六亲难认，只得关起来，幽居不出。\n" +
            "\n" +
            "沙国王疚心疾首，幸而，他还剩两个儿子。\n" +
            "\n" +
            "三王子最受国王信重，饱读诗书，喜爱佛法，文武兼备。可颁布“敬鼠令”后，国王斩杀了一批上书的大臣，三王子诀别而去。沙国王愤气填胸，幸而，他还剩一个儿子。\n" +
            "\n" +
            "二王子天生神力，可惜有些憨傻，不似大哥那么能打;没有三弟那么有谋。三个儿子中，国王最不喜他。可陪国王最久的，却偏是他。\n" +
            "\n" +
            "黄风大圣终于得了神物，再次归来。沙国王为了复国，带着剩下的国民投入黄风大圣麾下。其时，黄风大圣正缺人手，见二王子有几分蛮勇，便收留了他们。\n" +
            "\n" +
            "可黄风大圣手下还有位虎先锋，极好吃鼠。每日都要啖下几只，方可满足。黄风大圣闭关后，他更是肆无忌惮。好在二王子的大锤使得凶悍，倒能稍稍令他忌惮。\n" +
            "\n" +
            "二王子为国王做了许多牺牲，可不论局势多惨烈，多艰难，沙国王到哪都要带上大王子，派人寻找三王子，也不知二王子心里到底是种何样的心情。",
        position: "游记位置：位于游记第二回头目词条【地狼】的下方。\n" +
            "\n" +
            "具体位置：主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/沙国王父子/sgwfz-position.png',
        difficulty: 3,
        experience: "主要加定身法，然后把三棍势点出来就行。\n" +
            "\n" +
            "这是一个双人BOSS，沙国王个头较小，战斗时经常在边缘OB远程攻击玩家但伤害较低，沙二郎手持长柄大锤体型较大，攻击前摇明显但伤害高。\n" +
            "\n" +
            "沙国王父子根据击杀顺序的不同也会影响到后续的剧情与奖励，如果先杀掉沙二郎，沙国王会跑掉。丢失【沙二郎的精魄】但能够激活沙大郎的BOSS战。\n" +
            "\n" +
            "如果先杀掉了沙国王，沙二郎强度会提升，将沙二郎打败可以获得沙二郎的精魄与道具【沙国王的肉】以激活沙大郎的BOSS战。\n" +
            "\n" +
            "所以想要拿满奖励必须要先杀掉沙国王，然后再击败沙二郎，这样既可以获得沙二郎的精魄也可以激活沙大郎的BOSS战。\n" +
            "\n" +
            "因为击杀沙国王后沙二郎的强度激增，因此战斗开局我们先要将沙二郎的血量削减到三分之一，先在难度低的时候控个血。\n" +
            "\n" +
            "然后寻找战斗场地内沙国王躲避的石柱子，躲在石柱子后面引导沙二郎直接用武器干碎石柱。\n" +
            "\n" +
            "看到沙国王倒地直接上去一顿输出，重复这流程直到击败沙国王，最后击败先前已经被我们削减至残血的沙二郎，此战斗结束。",
        reward: "灵蕴、【精魄】沙二郎（错过二周目）",
    },
    {
        bossId: 9, chapterIndex: 1, name: "沙大郎",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/9.png",
        description: "无毛法更强，秃皮腰板壮。\n" +
            "\n" +
            "疯魔锁山底，阴沟作大王。\n" +
            "\n" +
            "六亲难相认，情爱费恩量。\n" +
            "\n" +
            "自杀自灭后，带孝入战场。\n" +
            "\n" +
            "黄毛貂鼠平定了螾缀之灾，国王十分敬重他，将其奉为了国师，不论朝政大事，民生细务，必先征其意见，听其看法。\n" +
            "\n" +
            "在国师的提议下，国王颁布了\"敬鼠令\"，十里八乡的妖怪，纷纷往城内迁徙。\n" +
            "\n" +
            "大王子因阵前有功，被封为英武将军，正是春风得意之时。他未曾想，一个妖怪国师却抢了他的风采，内心极是不满。他借着鼠妖作乱为由，四处拉拢朝臣上书，要夺了国师的权位。\n" +
            "\n" +
            "朝中闹了数次风波，杀了不少王子党的大臣，连三王子也负气出走，却仍未动摇国王对国师的信任。\n" +
            "\n" +
            "这日，正逢国师诞辰，举国上下都在供奉他的雕像，连国王也亲临护国寺，为其添香祝祷。大王子愤懑难忍，当众掀了香案。\n" +
            "\n" +
            "天子之威，岂可触犯。国王一怒之下，将大王子下了监牢。国师却不生气，反替英武将军说了许多好话。大王子得知国师求情，更认为他是个城府极深的邪魔，成日在监牢里咒骂不止。国王得知此事，更觉儿子放浪捐介，应严加管教，便下令一日三餐只可送至牢门前，不许任何人探视他。\n" +
            "\n" +
            "大王子初时非常耿倔，可日子一久，他便服软起来，不停求饶。只是他心中仍是不服，日夜想着，等他出去，必要杀了那些老鼠，替自己报仇。\n" +
            "\n" +
            "这日，饭食迟迟没能送来，他正是惊疑，却听锁钥一响，牢门居然开了。\n" +
            "\n" +
            "他等了片时，未见有人进来，就自己走了出去。可他万万没想到，那外头往来穿梭的侍卫，大臣，没有一个人模人样。他们俱是些穿着衣袍的老鼠。\n" +
            "\n" +
            "大王子以为国师带着鼠妖篡了皇位，心下惊惶不已，一路横冲直撞，闯入父亲的金殿——\n" +
            "\n" +
            "一只矮锉的老鼠，以其父之声，叫唤了他两句。这必是假扮的！大王子一把夺过侍卫的刀，劈向了国王。\n" +
            "\n" +
            "殿内乱作一团，只有鼠司空抬来面铜镜让大王子自己观看。镜中哪有什么英武将军，乃是一只肥硕无匹的老鼠。",
        position: "游记位置：位于游记第二回头目词条【沙国王父子】的下方。\n" +
            "\n" +
            "具体位置：击败沙国王父子后，往左侧的不济谷土地庙旁边的洞穴走，如果放过了沙国王就会进入剧情，如果击杀了沙国王则是用掉落道具【沙国王的肉】来召唤。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/沙大郎/sdl-position.png',
        difficulty: 2,
        experience: "沙大郎的战斗强度很低，使用自己最熟悉的一套就够了。\n" +
            "\n" +
            "第二回游记词条位置位于沙国王&沙二郎的下方。\n" +
            "\n" +
            "击败沙国王与沙二郎后往地图上方走激活土地庙“不济谷”，然后往右边山洞走激活沙大郎的BOSS战剧情。\n" +
            "\n" +
            "沙大朗的体型要比沙二郎大很多，因为没有武器所以攻击方式基本靠前爪与啃咬，还能通过翻滚背击玩家，通过捕捉沙大郎的技能后摇来积攒棍势，面对这种大体型BOSS还是普通的重棍好用。\n" +
            "\n" +
            "虽然与灵虚子等BOSS同样是前爪和啃咬的攻击模组，但沙大郎还能通过甩动尾巴进行一次大范围的攻击，这种超乎预想的攻击还是需要注意一下。\n" +
            "\n" +
            "总体来说沙大郎的战斗难度很低，基本初见就能过，在战斗时诱导沙大郎撞开战斗场地旁全是符文的墙可以打开一个隐藏区域，里面可以拿到龙鳞，激活隐藏BOSS的位置。",
        reward: "阿罗金片、灵蕴1028、棉纱2、蚕丝2",
    },
    {
        bossId: 10, chapterIndex: 1, name: "虎先锋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/10.png",
        description: "威凛凛，气堂堂，花身电目逞凶狂。\n" +
            "\n" +
            "腥风血雨起杀意，铜头铁尾镇四方。\n" +
            "\n" +
            "前事得从数百年前，取经人经过黄风岭说起。斯时，前任虎先锋因捉唐僧，丢了性命。他膝下还有两个儿子，父亲一死，两人只得自已过活。\n" +
            "\n" +
            "山场尽毁，虎兄弟二人领着残存的小妖艰难求存，幸而父亲教过他们些真本事。随着风沙停息，石精逐渐将山场恢复昔日样貌。虎兄仿照父亲昔日所做，管束着山中妖怪，让他们各安其职，不随意祸害生灵。后来，有凡人见此地山清水秀，便在山中建起了村庄。虎兄又依照“啖尽迷路奸邪，护送过往好人”的规则，为自己博了个“虎神”的名号。\n" +
            "\n" +
            "村人为虎兄虎弟建了座卧虎寺，常常供奉，日子越发好了。唯有虎弟心下不服，总觉每每提及山中之虎，兄长占尽威风，只因比自己早生几年。\n" +
            "\n" +
            "又过了百年，黄风大圣带着一众鼠妖重回黄风岭。虎弟说，正因黄风大圣当初坐视不理，才致父亲身亡，他嚷着要杀黄风大圣替父报仇，怂恿虎兄赶走鼠妖，虎兄觉得有理，应承下来。谁知这战中，黄风大圣祭出了一个仿佛菩萨头颅的法器，呼风如刀，一个照面便重伤了虎弟。虎兄为保弟弟一命，旋即扔掉兵器，跪下称臣，黄风大圣也不计较，将他命为先锋，让虎弟此生不再踏入黄风岭。虎弟救还醒转，得知兄长做了先锋，又不肯依。二虎大吵一番，虎弟负气出走，再也不肯与兄长有任何往来。\n" +
            "\n" +
            "在虎先锋看来，那黄毛貂鼠害得他家破人散，两次毁了他的家，着实可恨。但他也不糊涂，深知只要天上有人为那貂鼠撑腰，除了每天多吃几只老鼠泄愤，又能做些什么哩？",
        position: "游记位置：位于游记第二回妖王词条的第一位。\n" +
            "\n" +
            "具体位置：主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-position.png',
        difficulty: 9,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "招式解析与应对方法\n" +
            "击败沙大朗离开洞穴继续走来到卧虎寺即可触发战斗。\n" +
            "\n" +
            "虎先锋从刚开始的线下试玩便出现在了玩家的视野中，相信这么长时间过去对这种血池里的老虎已经很了解了。\n" +
            "\n" +
            "虽然虎先锋背着一把大剑，但大多数攻击是通过拳脚武术来施展招式，无论是举起双拳向前砸去，还是一套军体拳连招都不会用到背面的剑，因虎先锋的招式变化多样，不适合用固定的连招打。\n" +
            "\n" +
            "当看到虎先锋手握后剑摆起架势时就要做好躲避斩击的准备了，斩击的形式是以极快的速度挥剑砍向玩家，每次即将冲过来时虎先锋都会喊一声霸，听见霸后默数两秒直接翻滚即可躲避。\n" +
            "\n" +
            "除了直接冲过来，虎先锋还可以挥剑创建一个龙卷风或数道剑气来远程攻击玩家，当然这些远程攻击的威胁要比直接冲过来小很多。\n" +
            "\n" +
            "当看到虎先锋石化自己需要额外注意看看有没有影子离开石化的虎先锋，如果看到影子说明虎先锋即将瞬移到玩家旁边打军体拳，没有影子就单纯的控住自己罢了。\n" +
            "\n" +
            "虎先锋每输出完一套军体拳，也就是打完一套连招都会有一定时间的后摇，我们通过这个时间快速用普攻积攒棍势，等待时机使用重击消耗血量，重击也可以打断虎先锋的连招。\n" +
            "\n" +
            "虎先锋本人也是非常有武德的，打完一套连招如果玩家打过来还会慢慢的等玩家恢复状态。\n" +
            "\n",
        reward: "玲珑内丹1、灵蕴1364、蚕丝3、【法术】铜头铁臂，虎之锋",
        bossTrick: [
            {
                name: "腾空砸地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick1.gif"
            },
            {
                name: "拔刀三连斩",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick2.gif"
            },
            {
                name: "拔刀四连斩",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick3.gif"
            },
            {
                name: "拔刀五连斩",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick4.gif"
            },
            {
                name: "拔刀斩",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick5.gif"
            },
            {
                name: "寸拳",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick6.gif"
            },
            {
                name: "军体拳",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick7.gif"
            },
            {
                name: "铁山靠",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick8.gif"
            },
            {
                name: "铁山靠七连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick9.gif"
            },
            {
                name: "铁山靠三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick10.gif"
            },
            {
                name: "铜头铁臂一",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick11.gif"
            },
            {
                name: "铜头铁臂二",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick12.gif"
            },
            {
                name: "血刃七连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick13.gif"
            },
            {
                name: "爪击三连",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎先锋/hxf-trick14.gif"
            },
        ]
    },
    {
        bossId: 11, chapterIndex: 1, name: "虎伥",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/11.png",
        description: "刀客竟何去，回首泪潸然。\n" +
            "\n" +
            "狂风扫磧北，凄凄复单单。\n" +
            "\n" +
            "草访村舍空，尘迎恶鬼还。\n" +
            "\n" +
            "谁知莲心苦，梨儿腹内酸。\n" +
            "\n" +
            "昔年，江湖中有个刀客，为娶心爱的女子，弃了旧业。未想，城中受黄风吹过，妻子染疾下世，儿子也生起病来。\n" +
            "\n" +
            "男人听闻山里有个菩萨能治风疾，就携子寻到了黄风岭。他们借住在定风庄内，孩子养病，男人则去寻找菩萨的踪迹。\n" +
            "\n" +
            "一日，男人路过村外一口枯井，听到有虎啸之声传来。他下井一看，竟别有洞天——\n" +
            "\n" +
            "有头受伤的猛虎在那井底修行，猛虎告诉男人，他原是山中虎神，村中的大巫们也受他庇佑，谷中还有村民为自己修建的寺庙。他说那刮起黄风的妖怪偷袭了她，占去了她的寺庙，这才落难到此。\n" +
            "\n" +
            "男人将信将疑，经过一番查访，大巫与寺庙之事，果都应证了，便带着儿子来给虎神瞧病。\n" +
            "\n" +
            "虎神用个怪模样的葫芦灌满水，喂给孩子喝。说来也奇，自喝了葫芦内的水，孩子好了大半，又能活蹦乱跳了。虎神嘱咐男人，他被邪风伤了元气，若能吃些活人，恢复神通，定能停下风沙，根治孩子的风疾。\n" +
            "\n" +
            "男人极不情愿，但见儿子精神渐好，又能在村边游玩，还交了不少朋友，真就狠下心来，诱人入井，为虎神疗伤。时间一久，村民渐渐发觉了异样。\n" +
            "\n" +
            "待男人回到村中时，儿子已被激愤的村民打死了。\n" +
            "\n" +
            "男人悔恨不迭，拔出封了多年的刀，将村民一一斩杀，这才踏着一条血路，迷失在了茫茫风沙里。",
        position: "游记位置：位于游记第二回头目词条【沙大郎】的下方。\n" +
            "\n" +
            "具体位置：击败虎先锋继续往卧虎寺后方的道路走，连续经过定风桥与定风庄走到终点的桥上遇到虎伥。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/虎伥/hc-position.png',
        difficulty: 3,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "玩家需要在一个桥上与虎伥战斗，稍微一不注意就会不小心从桥上掉下去直接死亡，因此与虎伥战斗时要尤其注意翻滚的朝向与自己目前所在的位置。\n" +
            "\n" +
            "虎伥的个头不大，右手持刀左手持爪，攻击欲望属于偏中的水平，连招速度不算块，所以和虎伥打可以把自己放在相对主动的地位。\n" +
            "\n" +
            "通过重棍与普攻的最后一击寻求硬直效果并获得更多输出机会。\n" +
            "\n" +
            "和虎伥战斗其实对我们威胁最大的是被虎伥的技能逼到桥边而摔倒桥下，因此建议喜欢左右翻滚的玩家尽量前后斜向翻滚，以最大程度的避免这种情况的发生。\n" +
            "\n" +
            "小编本人在这次战斗的死亡都是因不小心摔倒桥下，反而虎伥本人没有太多的威胁。",
        reward: "旧拨浪鼓、灵蕴757、棉纱2、蚕丝2、铁中血",
    },
    {
        bossId: 12, chapterIndex: 1, name: "石先锋",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/12.png",
        description: "山以石为骨，石作土之精。\n" +
            "\n" +
            "背岩屹噔噔，躯壳耸青云。\n" +
            "\n" +
            "自黄风大圣将那佛头石怪的精魄给了两位山神，他们分而食之，竟有了人心人形。二石和合，竟诞下了个石头孩儿。是以，众妖就将他们三者称作石父、石母与石子。其后，石父因故离了山场，石子亦寻父而去，便就只留了石母一个，孤零零在此。\n" +
            "\n" +
            "石母原不喜打打杀杀，黄风大圣授她精魄时，也曾托她好生打造山场，她便以此勤勤恳恳地做了起来。取经人径过黄风岭时，黄风大圣因捉了唐僧，被孙悟空请灵吉捉回了灵山。此去经年，待他重新归来，岭上竟生出了许多石精。其中有只石精，极为健壮强横，打听才知，它乃石母尽全力化生，用以守护洞窟。\n" +
            "\n" +
            "一日，黄风大圣亲来寻石母，不想被众石拦在了外头，黄风大圣心下一惊，这般不听指使，留着恐是祸患，便叫唤来新任命的虎先锋，让他铲除此物。\n" +
            "\n" +
            "虎先锋先是一口答应，可心中并不愿与他们为敌，当年他们一起合力重塑山场，也算老交情，他知那大石精极受众石精拥护，视其如兄长，便劝道：“兄弟，能有今日，你我吃了不少苦头，能帮我自会帮你。差事我已打点好了，你等只需退入谷内，专司镇守石敢当，也不用做甚恶事。我今日来尚且有话好说，若是明日，就得兵戎相见了。你我虽有些本事，确实非那鼠妖的对手，不如同做个先锋，一切如故，有何不好？“\n" +
            "\n" +
            "翌日，黄风大圣封了大石精为石先锋，命其率领群石退守河谷。自那以后，石精们老实本分地守着那封印的邪物，再也不过问山中之事了。",
        position: "游记位置：位于游记第二回妖王词条【虎先锋】的下方。\n" +
            "\n" +
            "具体位置：主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/石先锋/sxf-position.png',
        difficulty: 2,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "石先锋位于土地庙枕石坪左前方的区域，词条则是位于游记妖王目录虎先锋的下方。\n" +
            "\n" +
            "石先锋与石敢当两个BOSS都在同一个区域，如果此时已经收集了六个佛眼珠即可激活石敢当与石先锋的战斗，而最后的胜利者绝对是石敢当，从而跳过石先锋的BOSS战。\n" +
            "\n" +
            "当然也可以先打石先锋再打石敢当，石先锋的攻击方式单一，只能使用前手臂进行大幅度的砸地，有时还能造成小范围的AOE伤害。\n" +
            "\n" +
            "而此时玩家能做的也只有抓住后摇不断使用普攻磨血，如果害怕容错率不够就将技能点往法术层面点，增加蓝条与法术的实用性，多用定身术等法术增加自己攻击时的容错。",
        reward: "石之厉、灵蕴1366、妖核2、玲珑内丹1",
    },
    {
        bossId: 13, chapterIndex: 1, name: "百目真人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/13.png",
        description: "真人背有囊，百目透红光。\n" +
            "\n" +
            "颠颠还跳跳，摇舞血灵杖。\n" +
            "\n" +
            "黄花观来过一个怪人。\n" +
            "\n" +
            "他自称在灵台方寸山学过艺，只要魔君交出大圣的东西，立时归降，便放他一马。魔君遣虫总兵，将这怪人制服，照例放入洞中虫卵内育化。未料，几日后小妖来报，卵被破开，人已逃了。魔君听罢，嘿然一笑。\n" +
            "\n" +
            "自破卵而出，怪人背上生了一颗肉团，团上还有许多眼睛，十分骇人。怪人不以为意，继续云游修炼。\n" +
            "\n" +
            "他途经一座荒山，山中盗匪横行，山下村民贫苦不堪。他就地住下，求风求雨，洗青荒山，栽种榆柳，遍植松冉。\n" +
            "\n" +
            "过了数年，怪人忽至村中，绰起一根法杖，立在村口。那杖头发出幽幽红光，众生被红光一照，只如着魔般，互相撕咬残杀起来。\n" +
            "\n" +
            "霎时间，山下血流成河，宛如地狱现世。\n" +
            "\n" +
            "他驼背上的肉团倏忽张开无数眼睛，将周遭的血气精魂缓缓吸入其中。不多时，那肉团便胀大了一圈，直到再也吸不动了，那眼睛才缓缓闭上。\n" +
            "\n" +
            "怪人苏醒过来，拔出法杖，又寻下一座荒山去了。",
        position: "游记位置：位于游记第二回头目词条【石母】的下方。\n" +
            "\n" +
            "具体位置：此BOSS位于镇风门土地庙附近。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百目真人/bmzr-position.png',
        difficulty: 2,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "百目真人大小与猴子相等，使用一个类似锤头的法杖攻击，每次攻击都能在一定区域内生产大量的红色毒池，当玩家靠近就会累计中毒异常。\n" +
            "\n" +
            "攻击方式从远处喷撒毒液，近处衍射毒液，还能使用毒液法球一类的远程攻击，但总体来说威胁不大，无论是战斗场景的大小无法发挥毒液池的效果，其百目真人本身的攻击模组太少而不具备威胁性。\n" +
            "\n" +
            "就日常积攒棍势在过去敲一棍跑就能慢慢将其耗死，正面硬钢也可以通过熟练的翻滚规避大量伤害，很多玩家应该都能初见过的精英怪级别BOSS。",
        reward: "灵蕴767、棉纱2、蚕丝2，铁中血1，【精魄】百目真人",
    },
    {
        bossId: 14, chapterIndex: 1, name: "疯虎",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/14.png",
        description: "黄风邪入境，兄弟乱阋墙。\n" +
            "\n" +
            "父仇不得报，井底落平阳。\n" +
            "\n" +
            "咆哮透山岗，装样软心肠。\n" +
            "\n" +
            "行事总半道，志丧命也丧。\n" +
            "\n" +
            "某年某日，虎弟正于井底练啸聚神功，忽见井口有人攀藤而下。见那人有几分胆色，虎弟没急着扑食他，反打探起他到此的缘由来。\n" +
            "\n" +
            "原来这人要寻菩萨为儿子治风疾，可菩萨未找见，儿子反病得要死了。\n" +
            "\n" +
            "听此一说，虎弟心下有了计较，他将兄长的事迹安在自己身上，说服了男人将儿子带来给他瞧病。\n" +
            "\n" +
            "初见时，那孩子面色惨白，浑身绵软，只能由男人使一根火麻绳将其缚在身前，才能安稳下到井底。\n" +
            "\n" +
            "虎弟仔细一看，这孩子果被三昧神风吹乱了精气神魂，若不停下风沙，神医也治不好他。\n" +
            "\n" +
            "虎弟想起兄长曾给过自己一个宝贝葫芦，只要饮过葫芦中的酒水，就能壮人气力，或许能凭此保这孩子一命。\n" +
            "\n" +
            "待孩子饮下虎弟喂的水，他有了些精神，能开口说话了。他虽是久病之身，却十分有礼，得了帮助，连声称谢，对虎弟崇慕不已，虎弟十分快意。\n" +
            "\n" +
            "他叮嘱父子俩，每日必须来此饮一口葫芦中的水。数次之后，孩子越发好了，他不仅能在村中玩闹，还结交了好些朋友。每次来喝葫芦，孩子都围着虎弟\"虎神虎神\"地叫他，将自己新得的吃食、玩具和见闻逐一分享给虎弟。\n" +
            "\n" +
            "虎弟原对父子俩有些提防，但见这男人也算重情重义，便将葫芦给了孩子，让他贴身带着，只用葫芦喝水，孩子的病又好了几分。\n" +
            "\n" +
            "忽有一日，他二人都不再来了。虎弟很少在岭中出没，一连等了数日，他终想弄清楚究竟，就往村中寻去。\n" +
            "\n" +
            "入村一瞧，只见血流满地，村民们都被斩杀了。村头有口薄皮棺材，孩子的尸首就在里头，胸前还挂着葫芦。细看那伤痕，不难猜出孩子是被乱棍打死的。\n" +
            "\n" +
            "虎弟扛着棺木回到了井底。每日都在棺木前练功，他总想着，再等等罢，等我足够强大，定会替你停下那该死的风沙……",
        position: "游记位置：位于游记第二回头目词条【百目真人】的下方。\n" +
            "\n" +
            "具体位置：首先要击败虎伥获得拨浪鼓，然后在下图所示的三个位置一次敲响拨浪鼓，在位置3处进入枯井下方触发与疯虎的战斗。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/疯虎/fh-position.png',
        difficulty: 5,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "招式解析与应对方法 \n" +
            "疯虎主要靠双手战斗，能够搬起一个巨大的石块砸向我们，攻击欲望也很高，正常连招出的拳有块有慢一定要注意。\n" +
            "\n" +
            "在将其消耗三分之一的血量后开始大吼，此时天花板会不断掉落各种石块，被砸到就会扣血，因此一定要注意石块的位置。\n" +
            "\n" +
            "我们最佳的输出时机依然是疯虎机动完之后的长后摇，攻击位置最好是屁股，因为疯虎没有高效反制身后攻击的手段。\n" +
            "\n" +
            "积攒棍势寻找出招的破绽使用重击慢慢消耗血量即可，如果暂时打不过可以先去下一回，我们随时可以回来打这个疯虎。\n" +
            "\n",
        reward: "【精魄】疯虎、灵蕴1033、棉纱2、蚕丝2",
        bossTrick: [
            {
                name: "跳跃重击+三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/疯虎/fh-trick1.gif"
            },
            {
                name: "吼叫三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/疯虎/fh-trick2.gif"
            },
            {
                name: "吼叫五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/疯虎/fh-trick3.gif"
            },
            {
                name: "锄地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/疯虎/fh-trick4.gif"
            },
            {
                name: "砸石",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/疯虎/fh-trick5.gif"
            },
            {
                name: "抓取",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/疯虎/fh-trick6.gif"
            },
        ]
    },
    {
        bossId: 15, chapterIndex: 1, name: "石中人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/15.png",
        description: "失意莫谈得意事，得意莫忘失意时。\n" +
            "\n" +
            "一念贪私令智昏，步步嗔痴是为执。\n" +
            "\n" +
            "依常理，当坊土地与本处山神原是协同处事。但这黄风岭中，绝非如此。\n" +
            "\n" +
            "昔年黄风大圣率群妖降伏佛头石怪时，曾求土地一同作战。土地作壁上观，因此分佛头精魄时，山神有，他却无，这令他十分嫉恨。\n" +
            "\n" +
            "他知自己本事平平，无甚神通与靠山，自认只要得了那精魄，便能如那山神一般，习得大神通。是以，待石父出走，黄风大圣受降，他便对石母起了歹意。\n" +
            "\n" +
            "他在山谷中窥看了好些时日，发现石精们，搬山造石，非常忙碌，而山神坐镇石窟之中，只管调令，便心生一计。\n" +
            "\n" +
            "这日，他将自己也变做个石精的模样，假意交差，凑到石母近前。他原要朝那石丹腹上、全力撞下一头，裂石取核。岂料、他刚蹦起，就听那石母尖啸起来。近旁竟钻起了几个栖身地底的石精来。\n" +
            "\n" +
            "因这一下分了心神，土地用力不当，只在石母胸前撞裂了一道石缝。他见事已败露，索性趴在石母身上，以全力要吸她体内的法力。待石精们将其扑开，他堪堪吸了一半。\n" +
            "\n" +
            "石精们暴躁难禁，追着他一路冲撞。土地难以脱身，正要还原本相对敌。岂料，他尝尽术法，却变化不得，想是那石之精魄，已将其变做了个石头。石精们对着土地又撞又敲，只将他砸到地里才罢手。\n" +
            "\n" +
            "土地从此没了盼头，索性在山沟当块烂石头，但他又自认只要得了另一半土地从此没了盼头，索性在山沟当块烂石头，但他又自认只要得了另一半精魄，或能变回来罢。",
        position: "游记位置：位于游记人物词条【黑风山土地】的下方。\n" +
            "\n" +
            "具体位置：详情可查看石中人的完整支线流程",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/石中人/szr-position.png',
        difficulty: 3,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "石中人为第二回的额外BOSS。\n" +
            "\n" +
            "石中人需要击败左边洞穴中的石母才能打，打败石母与石中人对话，对话到重复直接攻击他。\n" +
            "\n" +
            "因为身处一个狭窄的隧道中，石中人的体型还很大，因此我们直接离远开始蓄力棍势，蓄满走到石中人的位置攻击他再离远蓄力慢慢将其耗死。",
        reward: "法术【碧尘】、开启隐藏商店",
    },
    {
        bossId: 16, chapterIndex: 1, name: "石敢当",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/16.png",
        description: "苦海无边浪，只渡有缘人。\n" +
            "\n" +
            "雨后三千土，灯前一点尘。\n" +
            "\n" +
            "昔年，黄风岭中有几块崖石，吸取天地灵气，日月精华，遂感通灵，修成了几只石精。其中有两只，因道行较深，被授以了山神之职。\n" +
            "\n" +
            "一日，岭中不知缘何生出了几颗佛头，有眼耳口鼻，筋肉俱全，长在土里，十分古怪。即见活物，这些肉佛头便放声嚎叫，若对方靠来，它就一口将其吞下。\n" +
            "\n" +
            "有个石精见这肉佛头诡异，要除了它，保护山中生灵，就一下撞在那佛头上，将其碾作了肉泥。这肉泥黏在它身上，不久竟依凭它的石身，又生出个石佛头来。\n" +
            "\n" +
            "自此，那石精全然变了心性，成日在山中搜寻其他肉佛头，先将其砸烂，再把残骸包裹到自己背上。随着它的佛头日益增加，它也不再感什么天地之气。全以啃食山中生灵修行。石情们都斗不过他，经常被撞得粉碎，神魂俱灭。\n" +
            "\n" +
            "黄毛貂鼠带着众妖离了斯哈哩国，径过黄风岭时，正巧遇见两个山神率着几只石精，意欲驱他离去。黄毛貂鼠似是极懂那佛头之物，心中一股意气涌上，带着众妖加入了战斗。\n" +
            "\n" +
            "一战大捷，绍鼠不仅灭了那佛头石怪，还将山中肉佛头悉数铲灭了去。佛头石怪遺留的精魄，他将其分给了那两位勇猛的山神，又将其佛头上的目珠一一挖下，镇在了山谷中。\n" +
            "\n" +
            "山中众生十分感谢貂鼠，将其拜作大王，称他为黄风大圣，他便也在此定居了下来。",
        position: "游记位置：位于游记第二回妖王词条【石先锋】的下方。\n" +
            "\n" +
            "具体位置：石敢当位于土地庙枕石坪左前方的区域，需要收集藏风山凹地区的六个佛目珠激活战斗。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/石敢当/sgd-position.png',
        difficulty: 4,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "石敢当就是一个更灵活的石先锋，能够进行大范围的跳跃扑击，其他攻击方式基本与石先锋的套路完全相同，还是建议先收集六个佛眼珠激活石敢当与石先锋的战斗，然后坐收渔翁之利。\n" +
            "\n" +
            "因为攻击套路基本相同，击杀石敢当的方法也和石先锋别无二致，也是通过石敢当攻击的长后摇一直偷屁股，慢慢磨血；打这种BOSS一定不能急，保持自己的高容错。",
        reward: "铁石心1、玲珑内丹1、受蕴1、灵蕴1358、蚕丝3",
    },
    {
        bossId: 17, chapterIndex: 1, name: "小骊龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/17.png",
        description: "血口铁髭须，瓜锤双双提。\n" +
            "\n" +
            "电光激造化，风雷振玄机。\n" +
            "\n" +
            "济水旁的渔民们常说，九渊之下，有骊龙，项下有慧珠，拿到的人可开明大智慧，因此价比千金。许多人不顾危险，想要探骊得珠。少数有命回来的人都哭道，空手而归就算了，还遇到水下凶恶的龙王，舞一对双锤，能唤出雷霆万钧，被他劈得尸骨无存。\n" +
            "\n" +
            "此后千百年，下河探珠的人屡禁不止。大家总说济水泛滥，必定是探珠人得罪了龙王，所以修造了宏伟的庙宇，祭祀和供奉他。这日，来了个年轻人，他穿一领皂色衣袍，戴一串月白项链，自称盗圣，手段滔天。大家纷纷劝他不要冒犯龙王，可他只一下扎入水中，朝龙宫去了。\n" +
            "\n" +
            "他见那处既无虾兵，也无蟹将，门庭冷清，景色凄凉，心下奇怪，径寻海藏而去，就见个黑壮的汉子，坐在高高堆起的箱笼之间，愁眉不展。听得响动，那龙王草草从箱子里翻出一挂珍珠，随手扔在地上，敷衍道：“我的慧珠实是不能给你们，这个送你，拿了快走吧。”\n" +
            "\n" +
            "年轻人奇道：“岸上的人都说你凶恶哩，若是稍有得罪，不是吃人劈雷，就是水淹千里。”那龙王道：“凡人那点血肉我才看不上，你当我是寻常妖魔？若无旨意，岂敢行云布雨。那岸上的人竟说些瞎话，想我父亲，不过一点过失，就挨了一刀。我们龙族啊，再老实不过了，哎……”\n" +
            "\n" +
            "年轻人听后便道：“泾河龙王之事我也曾听闻，的确冤屈，你如今这般境地，难道是受了牵连？”龙王知他不是凡人，便道：\n" +
            "\n" +
            "“正是，我可不想去那剐龙台，上，我问过那算命的，他说只要我寻个隐蔽处躲好，杀掉西去的猴子，便能将功折罪哩。”\n" +
            "\n" +
            "年轻人若有所思：“算命的，我也是听一个算命的，才寻来此处。既是如此，也是机缘，不如来我家，我正好住那西去的路上哩。”那龙王听后大喜，年轻人又道：“只是不能白住。你这海藏里的宝贝，都得归我。”\n" +
            "\n" +
            "自那年轻人来过后，济水边下河探珠的人渐渐少了。再后来，大家纷纷弃了探珠的行头，也没人再谈论过那九渊之下的龙王和慧珠究竟如何了。",
        position: "游记位置：位于游记第二回妖王词条【黄风大圣】的下方。\n" +
            "\n" +
            "具体位置：需要先击败沙大郎获得重要道具龙鳞，然后来到枕石评右侧楼梯顶层处触发战斗",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-position.png',
        difficulty: 3,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "小骊龙位于土地庙枕石坪右侧楼梯顶部的沙子瀑布后方，词条则是位于游记妖王目录黄风大圣的下方。\n" +
            "\n" +
            "武器为两把大锤子，可以通过互相敲击或连招的最后一击触发范围爆炸伤害以及波形范围伤害。\n" +
            "\n" +
            "与小骊龙战斗一定要把握好翻滚的精准度，因为小骊龙的攻击非常有节奏，而且速度不快但伤害很高，躲避不好容易被削减太多血量导致战斗失败。\n" +
            "\n" +
            "连续的波纹范围攻击可以站在附近的岩石上等到招式释放完毕再攻击，躲都不用躲，但需要注意这些岩石都是可以被破坏的，战斗时小心这些岩石被波及到。\n" +
            "\n" +
            "小骊龙的连招节奏感很好，且速度很慢，所以最好的应对方式就是站在小骊龙的身后不断翻滚并穿插普攻，如果走位够好甚至都不用翻滚，慢慢抓后摇并熟悉招式的应对就能轻松将其击败。",
        reward: "玲玲内丹1、灵蕴1600、镔铁砂2、龙珠1、振雷骨1，【珍玩】砗磲佩",
        bossTrick: [
            {
                name: "锄地连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-trick1.gif"
            },
            {
                name: "锄地冲击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-trick2.gif"
            },
            {
                name: "风暴雷击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-trick3.gif"
            },
            {
                name: "三连锄地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-trick4.gif"
            },
            {
                name: "三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-trick5.gif"
            },
            {
                name: "三敲雷",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-trick6.gif"
            },
            {
                name: "四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-trick7.gif"
            },
            {
                name: "跳劈",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/小骊龙/xll-trick8.gif"
            },
        ]
    },
    {
        bossId: 18, chapterIndex: 1, name: "蝜蝂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/18.png",
        description: "甲坚牢，角峥嵘，钻食人间祸无穷。\n" +
            "\n" +
            "佛头竟是不祥物，一面菩萨一面虫。\n" +
            "\n" +
            "流沙国遍地黄金，传说是日落之处。\n" +
            "\n" +
            "日乃太阳真火，落于西海之间，如火淬水，接声滚沸。每到申酉时，国王差人上城，擂鼓吹角，混杂海沸之声，谨防振杀城中小儿。\n" +
            "\n" +
            "这所擂之鼓，名落日鼓，原是佛祖所赐。百姓凭此鼓得以安居，是举国上下崇信佛法，为佛祖塑了许多金身法相，又称黄金佛国。\n" +
            "\n" +
            "可随着信众日多，寺庙遍布，大家日渐信佛不信王。国王对此十分不满。丞相洞悉了他的心思，上疏止浮屠，以言无佛。\n" +
            "\n" +
            "国王遂下令，拆毁寺庙，驱赶修行之人，改国名为斯哈哩国。\n" +
            "\n" +
            "此事兴起不久，一日黄昏，城楼击鼓，国界之外尘土纷飞。有一大虫，掘地而出，将边陲村庄破坏殆尽，死伤无数。\n" +
            "\n" +
            "自此之后，每日日暮击鼓，大虫必出。\n" +
            "\n" +
            "臣民进言，说此乃止佛的报应，国王只得停下此事，派大军去剿灭妖邪。\n" +
            "\n" +
            "可大军并非妖邪的对手，牺牲无数也只得了个吓退之法，难以根治。\n" +
            "\n" +
            "幸而，有个黄发黄毛的修士途经此地。他为人仗义，最见不得不平之事，便协助大军斩杀了虫妖。国王将其敬为国师，他便在斯哈哩国修行了数年。\n" +
            "\n" +
            "其后，国师游方而去，听闻他被菩萨收作弟子，如今在黄风岭还有了自己道场，国王总说这是天道喜善哩！",
        position: "游记位置：位于游记第二回妖王词条【小骊龙】的下方。\n" +
            "\n" +
            "具体位置：击败黄袍员外前往隐·斯哈里国，蝜蝂是这个隐藏地图的最终BOSS",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/蝜蝂/fb-position.png',
        difficulty: 4,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "蝜蝂在游记妖王目录中小骊龙的下方。\n" +
            "\n" +
            "从土地庙枕石坪出发一直往前走，跨过栅栏可以看到一只喝醉的猪，击败石中人可以开启商店购买醒酒石，然后携带醒酒石与其对话。\n" +
            "\n" +
            "传送到卧虎寺的大门处，上楼梯往右前方走再次遇见这只猪，与其对话交给他一个随处可见恶毒莲藕再传送到第一次见面的地方开启与黄袍员外的战斗，将其击败进入隐斯哈里王国，一路往前触发与蝜蝂的战斗。\n" +
            "\n" +
            "蝜蝂开始会潜入沙土再冲出来砸向玩家，在即将砸下来时翻滚躲避，这招的翻滚时间还挺长的，躲避难度不高。\n" +
            "\n" +
            "等蝜蝂冒头后攻击它前面的两个爪子，只有这里可以对它造成伤害，同时要注意爪子的攻击，这里建议将锁定关掉，锁定会导致玩家许多攻击落空，而且爪子的目标很大，锁定此时也不重要；蝜蝂的其他攻击前摇都很明显，躲避难度不高。\n" +
            "\n" +
            "蝜蝂唯一有威胁性的技能便是潜入沙土中一直零碎的攻击我们，只能观察地面，发现地面出现特效时远离特效区域，比较看反应。\n" +
            "\n" +
            "等我们消耗了蝜蝂半管血就会触发剧情，我们趁蝜蝂晕倒的时候爬到身上与佛头互动将宝物拿走，此时黄风大圣也会加入战斗，后面的战斗难度下降许多，与黄风大圣一同击败蝜蝂即可。",
        reward: "定风珠、通天角1",
    },
    {
        bossId: 19, chapterIndex: 1, name: "黄风大圣",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/19.png",
        description: "千里黄风万里沙，方圆八百无人家。\n" +
            "\n" +
            "盗圣怀土失恩义，吹梦难醒躲山崖。\n" +
            "\n" +
            "炉火荧荧，满桌酒菜。沙二郎举着半拉，不知何物的腿，正啃得有滋有味。\n" +
            "\n" +
            "沙国王坐在儿子身侧，难得地没有警示他注意分寸。素日设宴，他最爱告状的，今日也一直沉默着。\n" +
            "\n" +
            "虎先锋也十分文雅，他看着对面的傻子吃得喷香，肚里饥渴难耐，还是忍住了。\n" +
            "\n" +
            "黄风大圣坐在太师椅内，一只手摸着桌上闭目的佛头，一边喃喃道：“师父呀师父，你常说让我永远陪在你身边，如今无论到哪里，我都带着你了。”听到这话，虎先锋和沙国王垂下头，甚至不敢抬头多看两眼灵吉的头颅。大王面前禁提灵吉，一直是不成文的规矩。\n" +
            "\n" +
            "又过了不知多久，沙二郎一声爹，在场所有人都惊了一跳。沙国王压低声怒斥道：“闭嘴。”其后连滚带爬跪下讨饶道：“大王，我这孩儿有些疯病，但他很是骁勇，能替大王办不少事，大王……”\n" +
            "\n" +
            "“起来吧，都是小事。”言罢，黄风大圣把手搭在灵吉的头顶，站起身来，道：“我拿了师父最宝贝的东西，定能炼化那邪物。我准备从今日起闭关修行。天上那些老东西虽已安排好了，还是多留一手为妙。”\n" +
            "\n" +
            "“大王若想闭关，我和我的子民愿搬来洞外守护。”沙国王谄媚道。\n" +
            "\n" +
            "“不用。我要在谷中修行，你那鼠村就让给我住罢。”\n" +
            "\n" +
            "“若是能守在大王身侧，自是我等的荣耀。”沙国王笑着。\n" +
            "\n" +
            "“留在我身侧？”黄风大圣看着师父的头，守在身侧的，才是最可怕的。\n" +
            "\n" +
            "他摇头对沙国王道：“你们搬去岭上住罢。那处不是有些凡人的庄子吗？占去就是了。我要开黄风大阵，谁都不要来打扰我。”\n" +
            "\n" +
            "“大王，若是……有急事要通报您该如何是好？”沙国王急急追问。\n" +
            "\n" +
            "黄风大圣抱起桌上的头颅，来回踱了几步，指着虎先锋道：“叫你那石头兄弟。修几条沙道，每个沙道由大门锁住，需要秘符才能开启。你们两个先锋，各拿一个秘符，日常事务就归你们暂管。出了天大的事，再来报我。”\n" +
            "\n" +
            "虎先锋得了这般大任，赶紧下拜谢恩。那沙国王急切道：“大王，我们与那大猫向来不睦，若是由他们领了秘符……”\n" +
            "\n" +
            "“你那两个儿子，可能担大任？”黄风大圣看了一眼无事可做，正在啃瓜锤的沙二郎，沙国王露出一脸挫败。\n" +
            "\n" +
            "黄风大圣又道：“你也不用太担心，鼠禁卫会监管他们，你只做好份内的事就行。”\n" +
            "\n" +
            "“大王，大王！秘符一事可再商量…。。”\n" +
            "\n" +
            "但是任凭他如何呼唤，黄风大圣只是叫送客，其后抱着佛头，又陷入了沉思。",
        position: "游记位置”位于游记第二回妖王词条【石敢当】的下方。\n" +
            "\n" +
            "具体位置：主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-position.png',
        difficulty: 7,
        experience: "主要加定身法，然后把三棍势点出来就行，其他按照自己喜好来。\n" +
            "\n" +
            "第二回游记词条位置位于疯虎的下方。\n" +
            "\n" +
            "相比于前面的BOSS，作为第二回最终BOSS黄风大圣可能是唯一一个能卡玩家一段时间的大BOSS。\n" +
            "\n" +
            "黄风大圣使用一把长柄武器战斗，第一阶段与第三阶段的战斗风格相差很多，第一阶段玩家处于相对被动的地位，需要等待黄风大圣输出完一套连招再输出，而第二阶段玩家需要非常主动，不然只会被黄风大圣无尽的连招慢慢耗死。\n" +
            "\n" +
            "但与虎先锋这种灵活多变的打法不同，黄风大圣的招式模板比较僵，可以通过背板打。\n" +
            "\n" +
            "进入BOSS战直接跑到黄风大圣旁边，黄风大圣第一阶段基本只使用两套连招，稍微记然后随时站在黄风大圣身后的位置就很好躲，每打完一套连招就上去输出一套。\n" +
            "\n" +
            "而且黄风大圣的强韧不高，可以随时用普攻最后一下与重击打断连招，建议第一阶段不要用太多法术，给第二、三阶段留法力，变形等到第三阶段再用，第一阶段稍微熟练一点就能很轻松的输出伤害。\n" +
            "\n" +
            "当血量只剩三分之二时黄风大圣就会进入第二阶段，开始呼唤神风，这时我们需要尽快远离黄风大圣的位置。\n" +
            "\n" +
            "正式进入二阶段后黄风大圣的第一招绝对是往前挥舞手臂，往玩家的方向进行远距离攻击，但其实这招的距离很近，只要玩家离远点都不用翻滚，如果离得比较近就往两边先跑再翻滚。\n" +
            "\n" +
            "用完上一招黄风大圣会在原地挥动武器造成大范围攻击，这是三连击，第一击离得够远就能躲，第二击会直接出现在玩家旁边，跳起来向下挥动武器，然后再转身向玩家挥动武器，这是第三次攻击，也是威胁最大的攻击。\n" +
            "\n" +
            "玩家需要观察黄风大圣挥动武器的时机躲避，前两招都可以通过站位直接躲，第三招必须翻滚。\n" +
            "\n" +
            "上述连招结束黄风大圣回到正常模式，周围会被旋风困住，也就是说BOSS房在第二阶段变小，而黄风大圣可以进入边界的风中隐藏身形再向玩家袭来。\n" +
            "\n" +
            "第二阶段一开始建议不要打，继续躲避攻击，直到看见黄风大圣向踢玩家的时候但失败的时候再打，这是一个投技，想要躲避需要仔细观察前摇，一旦躲避失败就会被消耗将近一管血，与你这段时间对黄风大圣造成的伤害不成正比。\n" +
            "\n" +
            "而且黄风大圣每用完一套连招才会使用一次投技，所以直接远远的躲着，等到黄风大圣用过一次投技再上去打，是最稳妥的方式。\n" +
            "\n" +
            "投技用过继续贴着黄风大圣的屁股后面打，期间需要注意黄风大圣大吼一声，然后召唤出蝜蝂向玩家冲过来，离远就能直接躲。\n" +
            "\n" +
            "和躲在沙尘中的突击招式，因为黄风大圣进入沙尘是不可见得，躲避这种连招失误率很大。\n" +
            "\n" +
            "当血量剩下三分之一时黄风大圣进入第三阶段，第三阶段开始大量使用剑气远程攻击玩家，这时俩方的状态都不好，而且黄风大圣还会出现你可能没见过的攻击，这时候变形多一管血既能提高容错率，还能观察其他技能，用广智收尾即可。\n" +
            "\n",
        reward: "【阿罗金片】、变身能力【碧尘】",
        bossTrick: [
            {
                name: "单次践踏",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick1.gif"
            },
            {
                name: "二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick2.gif"
            },
            {
                name: "三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick3.gif"
            },
            {
                name: "四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick4.gif"
            },
            {
                name: "三连剑气",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick5.gif"
            },
            {
                name: "撼地三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick6.gif"
            },
            {
                name: "重击塌地二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick7.gif"
            },
            {
                name: "转二阶段连招",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick8.gif"
            },
            {
                name: "六连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick9.gif"
            },
            {
                name: "八连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick10.gif"
            },
            {
                name: "抓取",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick11.gif"
            },
            {
                name: "制作旋风",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick12.gif"
            },
            {
                name: "召唤蝜蝂",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄风大圣/hfds-trick13.gif"
            },
        ]
    },

    // ================== 小西天 (20-30) ==================
    {
        bossId: 20, chapterIndex: 2, name: "亢金龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/20.png",
        description: "西天远去半程途，东土归来一梦初。\n" +
            "\n" +
            "暗解宝袋撤强能，私开尘锁冲歧路。\n" +
            "\n" +
            "亢金龙乃二十八宿之一，为东方青龙第二星宿。其额上有一尖角，锐不可当，曾为大圣顶开金铙，将其救出。自此，星宿们常以“秉持坚锐”为傲，连累众仙以为，他们神识里，侵入了什么邪魔。\n" +
            "\n" +
            "某日斗牛宫点卯，昴日鸡未在天上，一番查问，众人竟俱不知晓他的去向。恰于此时，黄眉回归小西天，要办盛大的香会，并广邀诸位妖魔神佛同来参加。亢金龙向天庭请旨赴会，要去秘密查访昴日鸡的下落。但这一去，亢金龙也如昴日鸡般，断了音讯。\n" +
            "\n" +
            "星君们议论纷纷，一番比较，发现昴日鸡和亢金龙都曾帮过大圣的大忙，便就猜测与大圣有关。星宿们细细回想他们与大圣的交情，害怕不已，奎木狼嗤之以鼻，道：“他虽坏了我的好事，我倒敬他是个汉子。倒是你们，平日里最喜说和那猴子多要好，怎么今日都没声了？”",
        position: "游记位置：位于游记第三回妖王词条的第一位。\n" +
            "\n" +
            "具体位置：主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/亢金龙/kjl-position.png',
        difficulty: 7,
        experience: "打法有正常流程与棍花逃课，正常流程就按自己常用的配装来即可。\n" +
            "\n" +
            "棍花逃课：法宝携带定风珠，精魄携带幽魂，加点如下：\n" +
            "\n" +
            "根基将棍花一栏全部点满。\n" +
            "\n" +
            "棍法选择劈棍，点到20点激活四棍势。其余加点全部点到四棍势，如果不够也没关系，能点多少是多少。\n" +
            "\n" +
            "正常流程\n" +
            "先来到亢金龙的BOSS战场地触发战斗，然后不要直接跑到亢金龙的下方，先等待亢金龙放完一开始的两轮闪电。\n" +
            "\n" +
            "随后亢金龙会直接冲过来，等亢金龙冲过来喊叫的后摇直接打一套。\n" +
            "\n" +
            "等待亢金龙喊完后续的招式是一个投技，依然是飞高再突进过来的形式，如果没躲过固定会扣除十分之九的血量，一定要注意躲避。\n" +
            "\n" +
            "后面就是老生常谈的飞扑、甩尾、爪击，习惯节奏就很好躲，等待亢金龙的血量降到四分之三左右会召唤一次大型的雷电AOE，只要连续奔跑就能躲。\n" +
            "\n" +
            "中间一直刷棍势，等待亢金龙的技能后摇重击敲头，大约三次即可让其倒地破防，然后上前输出，等待下一个技能轮回即可。\n" +
            "\n" +
            "棍花逃课\n" +
            "开局站到下图所示位置，战斗开始后因为距离过远，亢金龙会先释放两个闪电落地攻击，躲过这两个攻击直接开始蓄力，过一会亢金龙会直接冲过来。\n" +
            "\n" +
            "这里一定要注意重棍的释放时机，过完会直接被亢金龙吼停，稍微提前一点只要开始重棍动作就是霸体状态。\n" +
            "\n" +
            "一棍敲下去亢金龙会直接倒地我们立刻使用身外身法召唤小猴子，抓一个龙头朝下的时机使用定身术将其定住，快速跑到龙头的位置使用棍花蓄力棍势，使用棍花的时候注意要一直往前移动。\n" +
            "\n" +
            "看到亢金龙想要飞起来的时候直接使用定风珠，强制让它落地，继续走上前用棍花蓄力棍势，满四格直接重击亢金龙再次使其落地。\n" +
            "\n" +
            "继续上前使用棍花蓄力棍势，时刻查看亢金龙的状态，如果发现来不及攒四棍势就直接三棍势重击，后面龙飞起来进入一个大范围AOE，这时我们还是满状态，无论是变身还是拖着耗血都是我们这边胜利！",
        reward: "银星雾角、寒铁叶、玲珑内丹、灵蕴",
    },
    {
        bossId: 21, chapterIndex: 2, name: "魔将·莲眼",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/21.png",
        description: "诸法空相，不增不减。\n" +
            "\n" +
            "自狂高慢，金身破碎\n" +
            "\n" +
            "时时放佛光，庄严无量神威\n" +
            "\n" +
            "霞光映照，耀我惊我破我\n" +
            "\n" +
            "忘真言，堕伪魅\n" +
            "\n" +
            "形孤形单形废\n" +
            "\n" +
            "足之蹈之，若神若鬼\n" +
            "\n" +
            "智者疯，勇者凶，仁者危\n" +
            "\n" +
            "一朝染尘埃，禅心昧\n" +
            "\n" +
            "愿以此身照世人\n" +
            "\n" +
            "光即是暗，将那骄狂灭溃。。。。。。",
        position: "游记位置：位于第三回头目词条【赤尻马猴】的下方。\n" +
            "\n" +
            "具体位置：位于浮屠塔土地庙【山层】旁边，从土地庙转头往后走，在前方尽头往下面的房顶上跳到下层，然后往右走就会触发BOSS战。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/魔将莲眼/mjly-position.png',
        difficulty: 5,
        experience: "根基将武艺下方棍花的技能点满。棍法选择劈棍，点到20点激活四棍势。\n" +
            "\n" +
            "精魄携带地狼，地狼的被动可以帮助我们更快的攒棍势，其他以自身喜好为主即可。\n" +
            "\n" +
            "魔将莲眼主要通过法术攻击玩家，有连续的飞弹攻击、射线扫射，能够移动的光波等，初见可以先感受一下躲避的节奏。\n" +
            "\n" +
            "其中比较有威胁性的招式是通过墙壁地面四处弹射的法术飞弹以及有些快慢刀的射线。\n" +
            "\n" +
            "开局待在跳下来的位置蓄满两层棍势，然后一边蓄第三层一边跑到莲眼旁边给他一棍重击，此时他会立刻瞬移到另一个地方。\n" +
            "\n" +
            "我们直接使用聚形散气追着紫色的光线跑到莲眼的旁边，然后开始使用棍花打莲眼蓄力棍势。\n" +
            "\n" +
            "使用棍花的时候记得一边往前走一边使用棍花，蓄力两棍势后使用定身术再蓄力到四棍势直接重击敲。\n" +
            "\n" +
            "这时莲眼会直接瞬移到后方中间的位置，后面还会出现紫色的法阵，我们直接跑到开始跳下来的位置，这里有一块能挡住我们的大石头，在这里待着都不用躲BOSS的技能。\n" +
            "\n" +
            "一直在这里等待BOSS的连续攻击结束，后面会有从地面攻击我们的招式，此时直接使用聚形散气移动到莲眼旁边继续棍花。\n" +
            "\n" +
            "攒到四棍势一个重击敲下去，莲眼的血条差不多只剩三分之一不到，这时要赶快跑到BOSS的身后。\n" +
            "\n" +
            "莲眼在血量到达三分之一左右会固定使用一次几乎覆盖全图的射线，除了他的身后。\n" +
            "\n" +
            "我们就一直在莲眼身后待到攻击结束继续使用棍花蓄力重击，重复上面的流程，当然也可以稳妥起见直接变身收尾，这就看自己的选择了。",
        reward: "【珍玩】耐雪枝、【神魂-四将】",
    },
    {
        bossId: 22, chapterIndex: 2, name: "魔将·妙音",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/22.png",
        description: "妙音之声，开化众生。\n" +
            "\n" +
            "自恃才高，败走经堂\n" +
            "\n" +
            "极乐难思量，照出真我本相\n" +
            "\n" +
            "法海波涛，漫我倾我负我\n" +
            "\n" +
            "失正念，迷邪障\n" +
            "\n" +
            "问天问地问佛\n" +
            "\n" +
            "一步踏错，步步皆错\n" +
            "\n" +
            "胜负无常势，高低无常理\n" +
            "\n" +
            "积了度人心，近魔\n" +
            "\n" +
            "愿负此身归净土\n" +
            "\n" +
            "金身正果，反将众生愚惑……",
        position: "游记位置：位于游记第三回妖王词条【亢金星君】的下方。\n" +
            "\n" +
            "具体位置：主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/魔将妙音/mjmy-position.png',
        difficulty: 5,
        experience: "法宝携带定风珠，精魄携带幽魂，棍法选择劈棍，点20技能点激活四棍势，法术携带身外身法、定身术、聚形散气，法术加点主加身外身法即可。\n" +
            "\n" +
            "魔将妙音的打法很像MMO团本机制，但玩家只能通过打妙音的前脚来造成伤害，妙音的弱点是脑袋上一直转动的铁球，当妙音破防倒地时敲打这个铁球能造成大量伤害。\n" +
            "\n" +
            "开局先在门口原地蓄力二棍势，然后进入BOSS房触发战斗，蓄力完成走到BOSS左前方视角往右对着头部的铁球来一个重击，这样不仅能输出一波伤害，还能躲避一波射线攻击，看到妙音倒地趁机对着铁球再输出一套普攻。\n" +
            "\n" +
            "然后一直对着敌人发光的右前脚打普攻，这段时间也没有强力的攻击需要躲避，等待妙音吼出来屏幕变白，这时玩家的攻击力大幅度提升，继续普攻用连招的最后一棍把妙音打出破防。\n" +
            "\n" +
            "确认倒地立刻使用身外身法，然后跑到妙音的头部普攻铁球，积攒到四棍势时妙音基本也快起来了，看到起身立刻使用幽魂头槌与四棍势重击，最后再使用定风珠打控制，如果控制连上妙音会再次倒地。\n" +
            "\n" +
            "我们趁机继续输出几套普攻，这时我们还是满状态，而妙音基本就剩一个血皮，马上变身继续消耗敌人血量，最后变回来收尾即可。\n",
        reward: "神魂-一将",
    },
    {
        bossId: 23, chapterIndex: 2, name: "赤尻马猴",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/23.png",
        description: "山中元帅唤马流，毛脸黥黑爱红绸。\n" +
            "\n" +
            "冰刀雪刃劈赤胆，放屁添风笑石猴。\n" +
            "\n" +
            "金身佛像下，赤尻马猴躬着背，合起背上黝黑的羽翅，跪在黄眉跟前。\n" +
            "\n" +
            "黄眉捏了捏翅上的羽毛，道：“这种烂俗手段，也敢用在你们猴子身上，当真不识世情。”他拿着狼牙棒一挥，点点灵光落在马猴身上，那双黑翅便悄无声息的缩入了他的体内。马猴一怔，摸摸自己的背，欢喜起来。\n" +
            "\n" +
            "黄眉大笑：“你曾是孙悟空手下的元帅，如今他已身死，你也莫四处流浪，本座重整雷音，救苦救难，你就留下罢。”\n" +
            "\n" +
            "那马猴有些犹豫，黄眉便道：“我知你受了许多苦。欲为诸佛龙象，先做牛马众生。只要你入我门下，我便能带你超脱烦恼，解开恐怖。”\n" +
            "\n" +
            "赤尻马猴像是有些心动，那黄眉又道：“挣扎，欣喜，决绝，快意，才是生命的真谛！你这一路都已经历，只要稍加点拨，也能如孙悟空一样。拜我为师，自己做个妖王，就是你的正道！”\n" +
            "\n" +
            "那马猴想到花果山覆灭后经历的种种，禁不住落下两滴泪来，在那黄眉跟前连连磕头。\n" +
            "\n" +
            "黄眉很是畅快，打开自己的搭包将那赤尻马猴收入其内，道：“很好很好，为师这就教教你。”",
        position: "游记位置:位于第三回头目词条的第一位。\n" +
            "\n" +
            "具体位置:主线必定遇到，总共会遇到三次，第一次是在披霜道，第二次是在安身寺，第三次是与黄眉BOSS战的中间。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/赤尻马猴/ckmh-position.png',
        difficulty: 4,
        experience: "主要加“身外身法”与“定身法”，棍法选择劈棍，建议前期不要加立棍或戳棍，其他加点对这个BOSS没什么加成。\n" +
            "\n" +
            "赤尻马猴的连招很多但没有多少变化，初见需要习惯一下赤尻马猴的快慢刀，特别是跳到刀上旋转的那一下。\n" +
            "\n" +
            "通过身外身法的毛猴与定身术的结合，能够有效的克制这种单个的人性小BOSS，最后直接变形收尾。\n" +
            "\n" +
            "第一回碰到赤尻马猴开局直接身外身法+定身术，赤尻马猴的韧性很低，让猴子们直接过去群殴到半管血就会逃跑。\n" +
            "\n" +
            "第二次在安身寺碰到也是身外身法+定身术起步，然后不停的跟着猴子们用普攻的最后一击敲，叠满三层棍势就重击。基本能把赤尻马猴打倒在地上起不来。\n" +
            "\n" +
            "将赤尻马猴的血量削减三分之一进入第二阶段，赤尻马猴会长出黑色的翅膀，但基本属性与之前没有任何变化。\n" +
            "\n" +
            "使用一个聚形散气追上脱离控制的马猴，用破隐一击使其硬直，等召唤出来的猴子们过来继续群殴就行。\n" +
            "\n" +
            "第二次需要完全将赤尻马猴的血条清空才会结束战斗，难度很低，使用一个身外身法就能全程压制赤尻马猴。",
        reward: "暂无特殊奖励",
    },
    {
        bossId: 24, chapterIndex: 2, name: "亢金星君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/24.png",
        description: "龙女名亢金，白角映碧波。\n" +
            "\n" +
            "不羡鸳鸯侣．风姿绝世多。\n" +
            "\n" +
            "故人难再见，袋中黑白颠。\n" +
            "\n" +
            "风刀霜剑下，犹自舞翩跹。\n" +
            "\n" +
            "等了许久，亢金龙也未盼来星宿们下界救她。\n" +
            "\n" +
            "黄眉笑道：“你这女娃，心气太高，才输到这般地步。”\n" +
            "\n" +
            "亢金龙道：“我又未向你求饶，论什么输与不输？”\n" +
            "\n" +
            "黄眉也不恼，只道：“为了那只放哨的鸡，你绝不会这般冒险。你来，是为了那猴子。”\n" +
            "\n" +
            "亢金龙闭口不言。\n" +
            "\n" +
            "“我的确是得了那猴子的……一小块东西，就放在这袋子里。”说罢，他从腰间，解下个包儿。\n" +
            "\n" +
            "亢金龙认得，那曾是捉过他们的后天袋，不屑道：“什么稀罕物件，我又不是没进过你那搭包儿。”\n" +
            "\n" +
            "“你若真想知道他的事，就得自己进去瞧瞧。”\n" +
            "\n" +
            "吸入袋子的瞬间，她依稀看到袋中有只十尾金鱼，朝自己游来。\n" +
            "\n" +
            "待黄眉再将其放出时，那星君已变得痴痴傻傻，愣愣怔怔。\n" +
            "\n" +
            "黄眉大笑：“如何，他可还是你熟悉的那般英雄？”\n" +
            "\n" +
            "亢金龙问道：“他与满天神佛，皆是如此？”\n" +
            "\n" +
            "黄眉不置可否。\n" +
            "\n" +
            "又过了许久，亢金龙忽然跪在了地上，道：“还请师父，收我为徒……”",
        position: "游记位置：位于游记第三回妖王词条【亢金龙】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/亢金星君/kjxj-position.png',
        difficulty: 6,
        experience: "法宝携带定风珠，精魄携带幽魂，棍法选择劈棍，点20技能点激活四棍势，法术携带身外身法、定身术、聚形散气，法术加点主加身外身法即可。\n" +
            "\n" +
            "亢金星军就是亢进龙的人间体版本，比龙版本多了更多的雷电技能，更像一个法师。\n" +
            "\n" +
            "开局先往左边绕一下，蓄力二棍势再往亢进星君的位置边走边蓄力三棍势，贴脸先来一个重击。\n" +
            "\n" +
            "重击后短暂休息缓一下体力，立刻接一套普攻，最后一击也会造成硬直，这时直接使用身外身法。\n" +
            "\n" +
            "小猴子召唤出来躲避一波技能，等待2-3秒立刻使用定风珠，定风珠能够强行跳过亢金星君的变身阶段，是最关键的时机，如果没能使用定风珠阻止变龙可以直接下一把。\n" +
            "\n" +
            "成功使用定风珠阻止变龙就能和猴子们一直普攻积攒四棍势重击，亢金星君的韧性很低，基本被我们打的动弹不得。\n" +
            "\n" +
            "等待猴子们消失，亢金星君的血量已经很低，但我们还是满状态，直接变广智收尾，中间失误也没关系，变回来贴脸换血也是我们赢。\n" +
            "\n",
        reward: "龙珠",
    },
    {
        bossId: 25, chapterIndex: 2, name: "青背龙",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/25.png",
        position: "游记位置：位于游记第三回妖王词条【魔将妙音】的下方。\n" +
            "\n" +
            "具体位置：从龟岛土地庙出发，面对土地庙转头往后一直走就能看到下方的青背龙，需要拿到第二章的鳞片才能触发战斗。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/青背龙/qbl-position.png',
        difficulty: 6,
        experience: "法宝携带定风珠，精魄携带幽魂，棍法选择劈棍，点20技能点激活四棍势，法术携带身外身法、定身术、聚形散气，法术加点主加身外身法即可。\n" +
            "\n" +
            "开局先蓄好二棍势然后跳下来经常蓄三棍势直接敲上去，这里要小心不要被青背龙的滞空技躲掉。\n" +
            "\n" +
            "通过重击的硬直原地使用身外身法与定身术开始群殴青背龙，它的韧性不高，基本能硬控大半管血，中间记得穿插四棍势的重击。\n" +
            "\n" +
            "到半血的时候使用大头防止进入二阶段，青背龙进二阶段的方式是用雷电擦剑，前摇很大。\n" +
            "\n" +
            "等猴子猴孙消失青背龙基本被我们干惨，这时直接变身广智继续追着青背龙打，青背龙的攻击方式很单一，主要是它的数值很高。\n" +
            "\n" +
            "这一套不仅跳过了数值更高的二阶段，还留足了玩家自身的状态，就算变身后因失误没能打死，此时我们还是满血瓶，耗着打就行。",
        reward: "击杀青背龙获得【龙珠】；开宝箱得到【泡酒物】十二重楼胶。",
        bossTrick: [
            {
                name: "单次雷击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/青背龙/qbl-trick1.gif"
            },
            {
                name: "二阶段起始招式",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/青背龙/qbl-trick2.gif"
            },
            {
                name: "三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/青背龙/qbl-trick3.gif"
            },
            {
                name: "腾空突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/青背龙/qbl-trick4.gif"
            },
            {
                name: "尾巴扫击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/青背龙/qbl-trick5.gif"
            },
            {
                name: "横扫重击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/青背龙/qbl-trick6.gif"
            },
        ]
    },
    {
        bossId: 26, chapterIndex: 2, name: "不白",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/26.png",
        description: "刺青扑白粉，阴毒狡诈身。\n" +
            "\n" +
            "换脸做好汉，终是戏中人。\n" +
            "\n" +
            "驼罗庄有个十几人的小戏班，听他们唱戏，是大家最奢华的取乐方式。\n" +
            "\n" +
            "这戏班中有个专唱丑角的人，平素总涂着张白脸，庄中人见他便窃笑不止。丑角十分郁闷，他从小练功，是为了有朝一日能上台扮演英雄好汉，与眼下处境，恰好相反。于是他提议，要换个英雄角色来唱。大家却说他身上没有正气，不适合这样的角色。\n" +
            "\n" +
            "丑角觉得大家在糊弄自己，便在一次登台时，改了自己的戏份，导致戏没唱完，就被看客砸了戏台。班主一气之下，便将他逐出了戏班。\n" +
            "\n" +
            "丑角仔细反思，觉得可能是自己面相生得不好，便守在小巷中，用两柄淬毒的匕首，将素日扮英雄的伶人杀了，又剥下他的面皮，贴在自己脸上，想以此顶替他的生活。可他才刚迈出小巷，周围的人便叫叫喊喊，吓得落荒而逃了。丑角心寒至极，在村中乱砍乱杀，十数个乡勇一起上阵，才把他捉住。他们认为丑角是得了癔症，便将他送到了四千里外，最有名的小雷音寺静修。那庙中的住持听了他的故事，十分畅快地就将他收下，做了弟子。还为他那阴毒又冰寒的心，独创了一门功法。\n" +
            "\n" +
            "其后，丑角越变越强，四处剥下人脸，要学画皮的功夫。黄眉也任由他去，还特地命他守在一念壁的窄巷中，等一个能让他功法大成的天命之人。如今，谁都不敢走那条山道，谁都害怕遇见四师兄。",
        position: "小西游记位置：位于游记第三回头目词条【不净】的下方。\n" +
            "\n" +
            "具体位置：主线必定遇到。天金刚殿",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-position.png',
        difficulty: 6,
        experience: "手残玩家建议直接将身外身法与定身术点满，1V1真男人大战则加定身术与聚形散气，其他加点随意。\n" +
            "\n" +
            "总共会遇到两次不白，第一次遇到他打到一般会逃走，第二次则需要清空血条。\n" +
            "\n" +
            "不白有两种形态，当血条上面还有一个黄条时处于冰形态，此时不白手持一把刀刃，可以使用冰类的异常攻击。\n" +
            "\n" +
            "此形态下的不白攻击更有节奏感，能够格挡玩家的攻击，但总体攻击欲望相比下一个形态有所下降。\n" +
            "\n" +
            "当不白的黄条归零就会转为毒刃形态，此时武器变为双刀，且开始积攒中毒异常状态。\n" +
            "\n" +
            "此阶段的不白攻击更加迅猛，招式也变得更快，攻击欲望变高。\n" +
            "\n" +
            "打法很简单，先召唤毛猴群殴不白，然后通过定身术再输出一套，最后变形收尾，如果还没死就继续通过聚形散气+定身术消耗血量。\n" +
            "\n" +
            "不白在连战中依然有两个形态，冰形态有着强制格挡的架势，需要玩家消耗血条上的白条才能强制解除格挡。\n" +
            "\n" +
            "毒形态有着更加灵活的连招身法与连招数量，连招里通常结合了大量攻击组合。\n" +
            "\n" +
            "冰形态下通过背板所有招式并识破敌人的攻击比较好用，而在毒形态则是多使用退寸与戳棍重击来强制打断不白的虚影位置非常好用。",
        reward: "【精魄】不白",
        bossTrick: [
            {
                name: "寒冰突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick1.gif"
            },
            {
                name: "寒冰突刺三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick2.gif"
            },
            {
                name: "寒冰突刺五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick3.gif"
            },
            {
                name: "突刺连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick4.gif"
            },
            {
                name: "寒冰五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick5.gif"
            },
            {
                name: "吐毒攻击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick6.gif"
            },
            {
                name: "吐毒二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick7.gif"
            },
            {
                name: "毒飞镖",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick8.gif"
            },
            {
                name: "五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick9.gif"
            },
            {
                name: "剑雨三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick10.gif"
            },
            {
                name: "双重连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不白/bb-trick11.gif"
            },
        ]
    },
    {
        bossId: 27, chapterIndex: 2, name: "不能",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/27.png",
        description: "雪中有怪僧，壁前临朔风。\n" +
            "\n" +
            "以武入真禅，缚手难缚魂。\n" +
            "\n" +
            "二师兄不能，拳法超群，寺中无人能敌。\n" +
            "\n" +
            "一日，黃眉招他近前，要授他些克敌的法术。二师兄却道：“弟子自认拳法足以胜敌，不必再用他法。\n" +
            "\n" +
            "黄眉听罢，笑道：“你的堂堂正正，不过是不知变通。这般東缚自己，如何再进一步？”\n" +
            "\n" +
            "不能道：“弟子觉得，若用自己不认同的方法争胜，即便最后赢了，面上虽能，心里仍是不能。”\n" +
            "\n" +
            "黄眉问道：“你不认同为师的道？”\n" +
            "\n" +
            "不能道：“师父，您一直走巧路子，所以难以成佛。看似样样皆能，实则样样不能。”\n" +
            "\n" +
            "黄眉听后轻笑几声，命人反绑了他的双手，令其在寺外的石壁前思过。原以为他跪上几日便会放下执念，不想他十分耿倔，直至今日也不肯低头。",
        position: "游记位置：位于第三回头目词条【不空】下方。\n" +
            "\n" +
            "具体位置：头目的具体位置在【小西天-极乐谷-无忧涧】土地庙，朝着桥的反方向沿着道路前进。",
        difficulty: 5,
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-position.png',
        experience: "不空的双手被绑住，所以他的主要输出手段是头和脚。如果想逃课的话，可以选择用猴子猴孙打，或者自己使用劈棍，然后蓄力拉开距离，蓄满了再去敲，基本上多消耗点时间还是很轻松的。\n" +
            "\n" +
            "前空翻→头槌：这招前空翻有一定的延迟，如果闪避快了容易中招。\n" +
            "\n" +
            "踩地板→空中转体一周半→踩地板：第一下踩地板是有伤害的，注意躲避，在空中的滞空时间可以根据他的旋转情况来判断，一周半的时候他会背对我们踩下，只要转到背对我们按下闪避或者石化即可。\n" +
            "\n" +
            "二连踩→侧空翻：两连踩都是有小范围伤害，有石化用石化进行弹反，没有的话就躲避拉开距离吧，侧空翻可以向左右两侧进行闪避。有的时候只是单纯两连踩，是否会有侧空翻是随机的，所以要防着点。\n" +
            "\n" +
            "前滚翻→倒转腿→踢腿：只要看到他向前翻滚，直接石化，他必定会踢到石头上，如果闪避可能要稍微慢个0.5秒。如果拉开距离，要小心后接的踢腿有一段小位移，距离太近会被踢到。",
        reward: "【精魄】不能",
        bossTrick: [
            {
                name: "普通连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick1.gif"
            },
            {
                name: "寸拳",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick2.gif"
            },
            {
                name: "单拳连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick3.gif"
            },
            {
                name: "双拳连击一",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick4.gif"
            },
            {
                name: "双拳连击二",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick5.gif"
            },
            {
                name: "踢脚三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick6.gif"
            },
            {
                name: "踢脚突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick7.gif"
            },
            {
                name: "铁山靠连击一",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick8.gif"
            },
            {
                name: "铁山靠连击二",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick9.gif"
            },
            {
                name: "抓取",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不能/bn-trick10.gif"
            },
        ]
    },
    {
        bossId: 28, chapterIndex: 2, name: "魔将·劫波",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/28.png",
        description: "弹指一轻，刹那芳华。\n" +
            "\n" +
            "自念显能，身首异处\n" +
            "\n" +
            "血生红莲花，一念万朵尽出\n" +
            "\n" +
            "吉祥纷呈，哄我诱我刺我\n" +
            "\n" +
            "剪慧根，陷香雾\n" +
            "\n" +
            "尽真尽善尽美\n" +
            "\n" +
            "斗法证道，败中枭首\n" +
            "\n" +
            "天生刚烈骨，温柔尽倾覆\n" +
            "\n" +
            "浮云盖性，不得明朗\n" +
            "\n" +
            "愿以此身种繁华\n" +
            "\n" +
            "锦簇花攒，反将众生戮……",
        position: "游记位置：位于第三回头目词条【魔将莲眼】的下方。\n" +
            "\n" +
            "具体位置：魔将劫波位于小雷音寺的门口，主线流程必定会遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/魔将劫波/mjjb-position.png',
        difficulty: 2,
        experience: "这个BOSS的难度很低，使用自己最常用的流派BD即可。\n" +
            "\n" +
            "魔将劫波的战斗难度很低，完全可以当成一个精英怪来打，攻击欲望很低而且强韧度也不行。\n" +
            "\n" +
            "连续的轻重棍攻击就能造成一定程度的连续硬直，因此不过多介绍。",
        reward: "神魂-二将",
    },
    {
        bossId: 29, chapterIndex: 2, name: "不空",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/29.png",
        description: "不死亦不生，空余梦里人。\n" +
            "\n" +
            "前脚差一步，光阴又半程。\n" +
            "\n" +
            "很少有人知道大师兄不空是何时剃度出家的，只知道他是最早随着师父修行的，资历最深，庙中许多事务都由他来打理。\n" +
            "\n" +
            "他极少从佛殿里出来，似乎总有念不完的经。他还极擅写诗作画，画过诸天神佛，叹过市井百态。可他却从不留恋，笔下的东西，写完画完就是草草扔在地上。有人问他为何，他便说：“我见不缘实我，不空是空。都是假的，何必吝惜？\n" +
            "\n" +
            "大师兄虽不出殿门，但爱好寻人辩经论禅。\n" +
            "\n" +
            "一日，不能过来问他：“师兄，杀生有罪吗？”\n" +
            "\n" +
            "不空答：“杀生有罪。可若为了大道，不得不杀，便无罪。”\n" +
            "\n" +
            "不能反问：“那何为大道？”\n" +
            "\n" +
            "不空答：“自是明空觉性，福德圆足，登极乐，入净土。”\n" +
            "\n" +
            "不能反问：“杀生不但不能了结因果，反造了更多孽缘业障，这又如何登极乐？”\n" +
            "\n" +
            "不空答：“我不入地狱，谁入地狱。若不杀，便是为旁人遗留祸害，岂非更是缺了福德。”\n" +
            "\n" +
            "不能笑道：“师兄你都说要入地狱了，可见无论如何杀生都不对。说来，好人自有福报，又何须你再多此一举？”\n" +
            "\n" +
            "不空急道：“入地狱只是比喻，本义是替他人受苦受难……”\n" +
            "\n" +
            "不能打断道：“放屁！杀便杀了，还搞这许多弯弯绕绕。师兄，巧立名目，我欲即法，杀生背后的这份装腔作势，才是真正的罪过啊。”\n" +
            "\n" +
            "不空闻言，一时说不出话，似乎想到了什么往事。\n" +
            "\n" +
            "至此之后，两人再也没论过禅。",
        position: "游记位置：位于第三回头目词条【无量蝠】下方。\n" +
            "\n" +
            "具体位置：先传送到土地庙极乐谷的快活林，与下图所示的狐狸对话，接取任务并获得道具【白狐毫】。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-position.png',
        difficulty: 4,
        experience: "法术必带聚形散气，其他加点按照自己喜好来即可。\n" +
            "\n" +
            "不空的攻击方式很单一，除了用拳头间隔极高的攻击外，就是使用法术将下面的经书变成一个球体追逐玩家，如果碰到能对玩家造成持续性伤害。\n" +
            "\n" +
            "因为击败不空的重点是掌握躲避拳击的节奏，然后看到不空准备使用法术直接使用聚形散气或重棍破防对方，然后继续穿插攻击。\n" +
            "\n" +
            "这里建议将变形留到最后时刻，当不空只剩下丝血时攻击欲望明显增强，变形能增加不少容错，一直重复上述流程就能轻松将其击败。",
        reward: "击败不空回去找小狐狸交任务获得【珍玩】白狐毫",
        bossTrick: [
            {
                name: "不空掌",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick1.gif"
            },
            {
                name: "弹反连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick2.gif"
            },
            {
                name: "二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick3.gif"
            },
            {
                name: "聚气",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick4.gif"
            },
            {
                name: "瞬移",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick5.gif"
            },
            {
                name: "五连击一",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick6.gif"
            },
            {
                name: "五连击二",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick7.gif"
            },
            {
                name: "蓄力法球",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick8.gif"
            },
            {
                name: "远程法球",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/不空/bk-trick9.gif"
            },
        ]
    },
    {
        bossId: 30, chapterIndex: 2, name: "黄眉",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/30.png",
        description: "去来自在任优游，也无恐怖也无愁。\n" +
            "\n" +
            "极乐场中俱坦荡，大千之处没春秋。\n" +
            "\n" +
            "西天，灵山，峰顶。\n" +
            "\n" +
            "两人对坐，祥云郁结，气氛肃杀。\n" +
            "\n" +
            "青年僧人抬首望向天空，转而对黄眉僧人合手，行了一礼：“师尊皆已列位，师兄可准备好了？”\n" +
            "\n" +
            "黄眉僧人微笑，还了一礼：“早已好了。”\n" +
            "\n" +
            "盂兰盆会，五百年一度，出师弟子的辩经环节，正式开始。\n" +
            "\n" +
            "青年僧人抬手，示意师兄先发问。\n" +
            "\n" +
            "黄眉僧人问：“请问师弟，何为生命的意义？”\n" +
            "\n" +
            "青年僧人答：“求真。”\n" +
            "\n" +
            "黄眉僧人反问：“真是何物？”\n" +
            "\n" +
            "青年僧人答：“万物运转之道，宇宙本源之法。”\n" +
            "\n" +
            "黄眉僧人不置可否，却从手里拿出一朵花。花瓣起初萎顿，逐渐盛开，娇艳欲滴。\n" +
            "\n" +
            "他低头看着花，道：“你看它，只因随了自性，便生出如此神妙变化。”\n" +
            "\n" +
            "说罢，黄眉僧人低头轻轻一嗅，道：“每朵花盛开，都会散出独一无二的香。那是它为了自身繁衍，迸发出的生命精华。”\n" +
            "\n" +
            "他随手放开，让花飞散开了：“尽情感受这一刻，是为极乐。”\n" +
            "\n" +
            "青年僧人摇了摇头：“须臾满足，恒久痛苦。永无安宁，循环往复。”\n" +
            "\n" +
            "黄眉僧人反驳道：“放屁！”\n" +
            "\n" +
            "青年僧人微微一诧：“放屁？”\n" +
            "\n" +
            "黄眉僧人道：“我这次下山游历，看到有为人父母者，为了生存口欲，易子而食;有富家纨绔者，为了淫心色欲，祸乱人伦。”\n" +
            "\n" +
            "青年僧人蹙起眉来，看着对面的师兄，正逆着鳞片，抚摸这个世道。\n" +
            "\n" +
            "黄眉僧人却越发激昂起来：“有博学多才者，为了青史名欲，诛锄异己;有赫赫战功者，为滔天利欲，屠城灭族。”\n" +
            "\n" +
            "“还有成王作祖者，为了地位永固，不惜伪造偶像，欺天诳上！”\n" +
            "\n" +
            "“这挣扎，这欣喜，这决绝，这快意，这苦乐悲欢的无尽循环，永不知足，永不停息！”\n" +
            "\n" +
            "“而这，正是三千世界繁荣盎然的源起。自然，也是一切生命的真义。”\n" +
            "\n" +
            "青年僧人丝毫不为所动，规矩道：“师兄，你不见那易子的父母，饱餐一顿，悔恨终身。那淫邪的公子，放浪无拘，顷刻暴毙。”\n" +
            "\n" +
            "“那伐异的学士，一朝失势，千夫所指。那好杀的将军，寝不安席，咎由自取。”\n" +
            "\n" +
            "“还有那自封偶像的伪圣，时间一长，必被戳破假相，成了儿歌里的丧家之狗，史书上的跳梁小丑。”\n" +
            "\n" +
            "“师兄，你不求解脱彻悟，反而赞美这报应轮回之苦？”\n" +
            "\n" +
            "黄眉僧人大喝道：“苦即是爱，爱即是苦。无爱无苦，亦无救赎。”",
        position: "游记位置：位于游记第三回妖王词条【青背龙】的下方。\n" +
            "\n" +
            "具体位置：主线必定遇到，第三回最终BOSS。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-position.png',
        difficulty: 8,
        experience: "跟随主线即可遇到，位于游记第三回妖王词条青背龙的下方。\n" +
            "\n" +
            "黄眉不仅有着范围较大的近战攻击手段，也有大量远程法术可用，瞬移、反制玩家法术更是手到擒来，虽然第一阶段的难度偏低，但最后阶段的黄眉难度高的原因便是这些优点的集中体现。\n" +
            "\n" +
            "打黄眉依然建议使用重击流，技能必点：展足、压溃、精壮与断筋，然后开场就直接一边跑一边蓄力棍势，黄眉的攻击只要离他远点就很好躲，在蓄力完成后跑到黄眉旁边来一棍，然后继续远离重新蓄力。\n" +
            "\n" +
            "第一阶段按照这种方式打基本没有难度，只要不贪刀，稳稳的蓄力重棍就能轻松消耗大半管血，后面直接变形贴脸输出，黄眉这时不死也差不多了，如果还没死就看就随便打即可。" +
            "\n" +
            "第二阶段携带禁字法，棍法选择劈棍，点到20激活四棍势，其他加点可以全点到根基，然后开局直接用禁字法，战斗难度会低很多。\n" +
            "\n" +
            "使用禁字法可以直接过，下面将按照正常的打法流程举例：\n" +
            "\n" +
            "黄眉第二阶段难度很高，虽然技能与一阶段相同没有变化，但第二阶段的黄眉可以变成金人，这时黄眉处于无敌状态，我们只能等待黄眉自己解开金身再上前攻击。 \n" +
            "\n" +
            "且据目前观察来看，只要我们使用定身术定住黄眉时，他会直接变成金人，召唤小猴子战斗也会立刻被黄眉策反开始攻击我们，这时最好用的招式是聚形散气。\n" +
            "\n" +
            "过完开场剧情直接跑到黄眉旁边打一套普攻，第一套普通结束黄眉会直接进入金身状态。\n" +
            "\n" +
            "此时不要远离黄眉，一直躲在黄眉身后等待黄眉变出一把大剑挥到地面，待在黄眉身后是绝对不会被这把剑打到的。\n" +
            "\n" +
            "等待黄眉用完这招直接离开黄眉往远处跑，躲避黄眉的远程攻击容错要高很多。\n" +
            "\n" +
            "后面需要一直躲避攻击，直到黄眉站立不动，开始从肚子附近爆出大量雷电，这招结束黄眉会解除金身，我们再冲到黄眉旁边开始攻击，黄眉的近战攻击与第一阶段基本相同。\n" +
            "\n" +
            "在我们将削减了黄眉四分之一的血量会直接进入一个强制投技过场，不用怕，就算你的血量很少系统也会为你保留一丝血。\n" +
            "\n" +
            "第一次投技结束继续输出黄眉，等到下一次变成金身开始躲避技能，流程完全相同，只是拼我们自身的耐性，不要因为着急露出破绽。\n" +
            "\n" +
            "在黄眉的血量仅剩下三分之一时进入第二次强制投技，依然与上次相同，不会直接死亡无论有多少血都会剩下一些。\n" +
            "\n" +
            "黄眉的金身变身频率肯定是有系统判定的，次数有高有低，高频率的变成金身只能提高自身躲技能的容错率，如果发现黄眉的金身频率很低就需要万事小心，因为这是最可能打过的一集。\n" +
            "\n" +
            "而使用定身术会明显的提高黄眉变金身的概率，所以绝对不要在这场战斗使用定身术，而这场战斗也建议不要提前使用变形，一直留到最后黄眉最后一丝血的时候，黄眉最后一丝血有很大概率会强制变金身，而此时玩家也大多是强弩之末，没有更多的容错躲避技能。\n" +
            "\n" +
            "最危急的时候破绽会被无限放大，当看到黄眉剩下一丝血变金身把你机制杀的时候心态直接爆炸，后面就更不要想击败黄眉了，因为黄眉每次金身都有大量的闲逛说话时间，没有耐心很难继续下去。\n" +
            "\n" +
            "因此十分建议将变形留在最后一次金身使用，用变形的额外血量提高我们的容错率。",

        reward: "金身护臂",
        bossTrick: [
            {
                name: "大雷刃",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick1.gif"
            },
            {
                name: "单次戳击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick2.gif"
            },
            {
                name: "困雷击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick3.gif"
            },
            {
                name: "雷暴",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick4.gif"
            },
            {
                name: "两连砸地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick5.gif"
            },
            {
                name: "竖状雷击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick6.gif"
            },
            {
                name: "旋转雷击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick7.gif"
            },
            {
                name: "远程雷击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick8.gif"
            },
            {
                name: "召雷",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黄眉/hm-trick9.gif"
            },
        ]
    },

    // ================== 盘丝岭 (31-41) ==================
    {
        bossId: 31, chapterIndex: 3, name: "二姐",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/31.png",
        description: "粉黛绾青丝，蛮腰缀玉石。\n" +
            "\n" +
            "娇似天台女，最是利害时。\n" +
            "\n" +
            "朱家二姐，自幼假充男儿教养，洞中银钱往来，买卖支应，皆由她一人单管。山外的管事和兰喜村的小妖们，与她往来最多。\n" +
            "\n" +
            "二姐因事务繁忙，做事皆有时辰定规，若出了差错，便有一顿好罚，是以小妖们对她又敬又怕，总觉得自己这位奶奶样样出挑，个性又要强，没准以后能当上洞主娘娘，到时谁若有幸入赘，也能跟着当个便宜大王。这可连累了旅居在此的四位蝎太子，让他们没少受编排。\n" +
            "\n" +
            "二姐却全不在乎，蝎家四子谁愿帮她卖力，她的脸色就对谁好几分。\n" +
            "\n" +
            "前些日子，不知她从何处寻得一颗仙藤种子，栽在了洞中的别院里，找了蝎大替她守着。\n" +
            "\n" +
            "蝎大喜滋滋地应了下来，暗想这必是二姐倾心于他，一头求到魔君跟前，望其帮忙撮合。魔君听罢直摇头，说这般有主见的女子，旁人替你说亲，只会让她愈发瞧不起你，还是靠你自己最稳妥。\n" +
            "\n" +
            "蝎大回洞后，绕着仙藤走了一圈又一圈，至今也没想出个好法子。",
        position: "游记位置：位于第四回头目词条的第一位。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二姐/ej-position.png',
        difficulty: 3,
        experience: "我进入第四章的等级为55级，加点也以55级为标准。\n" +
            "\n" +
            "棍法选择劈棍，点20激活四棍势，身外身法点满与定身术点满，其他加点按照自己喜好来即可。\n" +
            "\n" +
            "法宝选择定风珠，精魄选择幽魂，变身为广智，装备穿最新的。\n" +
            "\n" +
            "开局所有技能扔出去（定身→招猴子→轻棍A到等棍势满了停一下，重棍爆发）。\n" +
            "\n" +
            "等猴子消失了，用变身收尾，一般头目都是顶不住这么一套的。\n" +
            "\n" +
            "打二姐的时候我们还有猪八戒帮忙，用上面的BD可以轻松拿下，基本没有任何难度。\n" +
            "\n" +
            "招式解析——四连击：使用前方的两只手臂有节奏的从上而下的攻击玩家四次，跟着节奏来回翻滚躲避就行。\n" +
            "\n" +
            "招式解析——跳跃重击：蜘蛛短暂停顿一下跳到半空中向玩家袭来，只需要看准落点时机翻滚就能躲避。\n" +
            "\n" +
            "招式解析——翻身重击：蜘蛛能以非常快的速度从上而下的翻身阻挡玩家视野，使用左前臂狠狠的捅向玩家，看到翻身的前摇就要立刻往后翻滚躲避。",
        reward: "灵蕴1926、金趁心1、青丝刺1",
    },
    {
        bossId: 32, chapterIndex: 3, name: "黑手道人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/32.png",
        description: "机关难算大聪明，鲁直冲动是本性。\n" +
            "\n" +
            "犹谢腰间两面刀，一刃断执一刃明。\n" +
            "\n" +
            "山凤细细，野花满地，观后石窟内。\n" +
            "\n" +
            "绛色面庞的道士，温和问道：“你来这观中多少时日了？”\n" +
            "\n" +
            "“...弟子不知，只记得天雷过殿，有百余回了。”黑手道人站在一旁，有些戒备。”\n" +
            "\n" +
            "“那便有百余年了。”\n" +
            "\n" +
            "道士说罢，走至光秃秃的石壁前，正要伸手摸摸。\n" +
            "\n" +
            "“师父。”黑手道人急急唤道。\n" +
            "\n" +
            "“…….弟子来了许久，也来曾得师父传个什么法门，不知师父今日可能乘兴教弟子几招。”\n" +
            "\n" +
            "“你想学？”\n" +
            "\n" +
            "“既来拜师，自是想学的。”\n" +
            "\n" +
            "“我看你根基扎实，气脉调和，自己的功法已然大成了。”\n" +
            "\n" +
            "黑手道人听罢，心下一紧。\n" +
            "\n" +
            "未料那道士又道：“虽无功法可授你，本派却有些练功的奇巧。你若不怕苦磨，我倒能让你试试。\n" +
            "\n" +
            "“不知是怎么个奇巧？”\n" +
            "\n" +
            "“传丹不传火，你若不试，我如何肯说与你听？”\n" +
            "\n" +
            "黑手道人苦思，拿不定主意。\n" +
            "\n" +
            "道士循循善诱：“我这观中不少弟子都练过，你来此这也没学，那也不试，岂非白走一遭？”\n" +
            "\n" +
            "黑手道人一听，想到郎君临行的嘱托，问道：“此法能有多大作为？”\n" +
            "\n" +
            "“精进躯壳，助益神功，登仙不难矣！”\n" +
            "\n" +
            "“竟有这般玄妙？”\n" +
            "\n" +
            "黑手道人心下大动，立时应承：“敬听师父安排。”\n" +
            "\n" +
            "“你随我来。”\n" +
            "\n" +
            "道士又看看那石壁，带着黑手道人离去了。",
        position: "游记位置：第四回的额外BOSS，位于人物词条【猪八戒】的下方。\n" +
            "\n" +
            "具体位置：黑手道人会出现两次，第一次是在盘丝洞的碎玉池，第二次是在黄花观。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑手道人/hsdr-position.png',
        difficulty: 3,
        experience: "第一次不需要BD，主打机制杀。\n" +
            "\n" +
            "第二次：点满【身外身法】【定身术】【变化神力上限】【变化攻击力】，法宝带【定风珠】，其他跟着自己的喜好加点即可。\n" +
            "\n" +
            "第一次遇见黑手道人是在一个卵里，攻击这个卵半管血就会触发与黑手道人的第一次战斗。\n" +
            "\n" +
            "黑手道人此时的攻击方式基本是突进与跳劈，还有一些近战攻击手段，开局先一直躲避攻击，听到或看到“谁的刀快，谁就有理！”这句话就说明黑手道人即将进入招式的后摇。\n" +
            "\n" +
            "我们抓住这个机会直接使用定身术将其定住，然后站在黑手道人的背后输出一套普攻，可以直接打断它一只手，造成大量的伤害。\n" +
            "\n" +
            "这个流程我们还要再重复三次，第一次打断它的手能够听到“如此完美的身躯，竟被你损毁了”这句话。\n" +
            "\n" +
            "因为战斗场景很黑，所以我们尤其要注意黑手道人的跳劈，有时候根本看不清它的动作。\n" +
            "\n" +
            "每次黑手道人突击都会有一个明显的下蹲前摇，通过观察这个姿势即可直接躲避。\n" +
            "\n" +
            "一直躲避到听见或看见“白刀子进，红刀子出！”字幕代表黑手道人即将进入第二次招式后摇，我们抓住这个机会再次打它的背，打断第二只手。\n" +
            "\n" +
            "如果定身术还没好，就直接打，时间是够打断第二只手的，后面的陷入后摇的字幕就不会再变了，不是白刀子就是谁的刀快，中间需要一直躲避。\n" +
            "\n" +
            "打断它四只手臂时，它基本也只剩一个血皮了，所有伤害都是打断它手臂的机制伤害，后面直接变形收尾即可。\n" +
            "\n" +
            "第二次的打法更简单，一阶段的招式与第一次见面时完全相同，按照一阶段的招式背板尽量不要用法术过。\n" +
            "\n" +
            "二阶段开局直接身外身法+定身术，攒四棍势一个重击直接半管血，然后接变身小黄龙开始1轻击2重击的连招收尾即可。",
        reward: "第一次：下毒手；第二次：灵蕴1964、金趁心1",
        bossTrick: [
            {
                name: "剑舞四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑手道人/hsdr-trick1.gif"
            },
            {
                name: "连续突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑手道人/hsdr-trick2.gif"
            },
            {
                name: "瞬移五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑手道人/hsdr-trick3.gif"
            },
            {
                name: "跳劈六连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑手道人/hsdr-trick4.gif"
            },
            {
                name: "旋风突斩",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑手道人/hsdr-trick5.gif"
            },
            {
                name: "掷剑四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/黑手道人/hsdr-trick6.gif"
            },
        ]
    },
    {
        bossId: 33, chapterIndex: 3, name: "百足虫",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/33.png",
        description: "蜷身一滚无首尾，展足扑腾爪似锥。\n" +
            "\n" +
            "螯牙狠毒喷邪风，狭处相逢命无归。\n" +
            "\n" +
            "昔年，有个到盘丝洞寻仇的少年，他大仇尚未得报，就被妖怪捉住，扔进了虫窟之中。他跌落深穴，摔在一团肉虫的尸体上，虽是摔折了腿，却活了下来。少年疼得嗷嗷大叫，支起上身，欲要求救，放眼望去，虫窟之中除了骷髅与尸骸，再无他物。\n" +
            "\n" +
            "少年万念俱灰，忽感腿上钻心一疼，有只一人长短的百足之虫，咬了他一口，还生生扯下块皮肉来吃。少年大惊，急忙从身旁摸起块硬石，疯狂砸在虫子身上，直将其砸得爆裂开来，才怔怔停手。低头一看，手里拿的竟是块人头骨，赶紧将其甩了出去。\n" +
            "\n" +
            "一番周旋后，少年发现受伤的腿竟然不疼了。他沾了沾虫尸淌出的浓汁，涂在擦伤的手臂上，竟也不疼了，想是它的毒液起了麻痹的效果。这给了少年不小的启发，他环视一周，从深穴边的虫茧上，抽下坚韧的丝线，又捡了两根不知是谁的腿骨，用它们将自己摔折的腿扎了起来。\n" +
            "\n" +
            "处理完伤处，少年精疲力竭，可当他安静下来，立时听见些窸窸窣窣的声响。他抬头到处张望，去寻声音的源头，可那响动陡然而停，天上随即砸下来个白色的巨球。那球弹了几下，伸展开来，原也是只百足虫，却比先前那只大上数百倍。少年不敢迟疑，扑身躲到一旁，可他本就折了一条腿，如何能比百足虫还快？他灵机一动，将自己也抱成个球，在地上翻滚起来。那百足虫见少年这般作为，分不清敌我，双方对峙了起来。\n" +
            "\n" +
            "恰巧此时，深穴中又传来坠地之声，少年望过去，有一堆被吃空了的皮囊被扔了下来。其后，坠地声密集而至，扔下来的全是些死物或残骸。许许多多的小百足虫都冲了出来，抢食这些残羹冷炙。它们每每经过抱成球的少年，都将他默认成自己的同类。少年立刻开了窍，他模仿着百足虫的行为，研究百足虫的习性，跟着它们住，跟着它们吃，足足花了一旬的时间，才从盘丝洞里逃到了外面。\n" +
            "\n" +
            "当他迎着天光走出来，终于明白了，人若要好好地活着，就不该执迷于过往。他回到故乡打算好好生活，岂料，织户们知他去过朱家大院，便熙熙攘攘聚在他家门首，逼着他重回山中，带他们去找院中的宝贝。少年只好躲着他们，依然没能过上舒心的日子。",
        position: "游记位置：位于第四回头目词条【琴螂仙】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百足虫/bzc-position.png',
        difficulty: 5,
        experience: "法宝选择定风珠，精魄选择地狼，变身为石头人，装备穿最新的。\n" +
            "\n" +
            "棍法选择劈棍，点20激活四棍势，身外身法点满与定身术点满，根基将棍花点满。\n" +
            "\n" +
            "开局百足虫会直接跳到玩家的位置，先原地躲避一下，立刻接定身术，然后原地开始棍花（使用棍花时要一直往前移动），很轻松就能攒满四棍势。\n" +
            "\n" +
            "百足虫破除定身术会进行数次磕头和一次翻滚，先躲避这些技能，在百足虫进入后摇时消耗四棍势直接劈下去。\n" +
            "\n" +
            "百足虫会直接被我们劈破防，我们自己的后摇结束原地使用身外身法，立刻再接一个地狼的变身技控制百足虫，这里如果慢了会被蜷缩成球的百足虫直接撞开。\n" +
            "\n" +
            "不过无所谓，我们这套打法容错很高，因为身外身法加满的原因，小猴也能使用定身术，还能给我们增加棍势，此时立即使用棍法叠满第二次四棍势重击，立刻打出去。\n" +
            "\n" +
            "这时百足虫的血量已经过半，会强行吼叫召唤出一堆小虫子，我们直接变身石头人，一边抗伤一边攻击百足虫。\n" +
            "\n" +
            "记得一定要紧贴百足虫，在变回来的时候还能给百足虫一个硬直，然后立刻使用法宝定风柱再次控制，使用棍花积攒最后一个四棍势重击，一棒敲下去结束战斗。",
        reward: "【精魄】百足虫，金趁心1、虚空结1",
        bossTrick: [
            {
                name: "单次背面锄地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百足虫/bzc-trick1.gif"
            },
            {
                name: "单次挥击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百足虫/bzc-trick2.gif"
            },
            {
                name: "滚滚球",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百足虫/bzc-trick3.gif"
            },
            {
                name: "突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百足虫/bzc-trick4.gif"
            },
            {
                name: "吐毒",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百足虫/bzc-trick5.gif"
            },
            {
                name: "召唤小虫子",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百足虫/bzc-trick6.gif"
            },
            {
                name: "正面三连锄地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百足虫/bzc-trick7.gif"
            },
        ]
    },
    {
        bossId: 34, chapterIndex: 3, name: "右手虫",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/34.png",
        description: "昨为拈花指，今作零落肢。\n" +
            "\n" +
            "同种不同胎，左右复谁知？\n" +
            "\n" +
            "昔年，盘丝洞里曾有道士抬入了一双巨大的臂膀，小妖们都不知这是从何处得来的，但从这手的仪态推想，必是出自一位高人。百眼魔君亲临此处，将两枚卵状之物放入其中，并嘱咐洞中群妖，必要好生看守。\n" +
            "\n" +
            "初时，这双臂膀往外溢出许多脓血，腥臭难闻。一段时日后，浊物干涸，结作了极厚的血膜，将其包裹当中。\n" +
            "\n" +
            "又过了几年，从远望去，那血膜内蠕蠕涌动，似有什么已在内里育化而成，急待钻出。恰至十年之期，破卵而出两只虫来，身似蜂，尾如手，口喷之毒，鸟兽沾染便死，草木沾染便枯。\n" +
            "\n" +
            "百眼魔君得知这个消息，十分高兴，设宴庆贺，席间他对蜘蛛精道：“师妹有所不知，我在紫云山中也试过一回，不料那仙卵羽化未成，连累我被师父好生责骂。此番我倒是想明白了，师父给的仙卵，命里承不起那般大的缘法，倒是这般，恰巧恰巧。”\n" +
            "\n" +
            "这两只虫，一只其尾为左手，一只其尾为右手。它们极爱倒挂洞顶上，将尾巴垂下，诱猎物前往查看，其后合掌拍来，将其拍做一团劖肉，在将头儿垂下，正好囫囵吞吃。\n" +
            "\n" +
            "\n" +
            "其后，左手虫不知躲到山中何处修行去了，另一只无掌可合，便爱守在狭道里，若有来人，便可占尽地利之险，将其捕食。",
        position: "游记位置：位于第四回头目词条【百足虫】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/右手虫/ysc-position.png',
        difficulty: 4,
        experience: "点满【身外身法】【定身术】【变化神力上限】【变化攻击力】，法宝带【定风珠】，其他跟着自己的喜好加点即可。\n" +
            "\n" +
            "开局所有技能扔出去（定身→招猴子→轻棍A到等棍势满了停一下，重棍爆发），等猴子消失了，用变身收尾，一般头目都是顶不住这么一套的。\n" +
            "\n" +
            "开局就正常打，看到右手虫的手臂贴到墙上时直接上去一套普攻，接定身术再打一套普攻接幽魂的头槌。\n" +
            "\n" +
            "右手虫在后面还会自己使用招式力竭把手垂下来，也是我们输出的最佳时机。\n" +
            "\n" +
            "右手虫的攻击方式分两种，一种就是前后来回挥动攻击，一种就是下图所示的远程攻击，很好躲。\n" +
            "\n" +
            "我们就只管抓右手虫的招式后摇一直输出就可以了，时间可能有点长，但难度很低。\n" +
            "\n" +
            "等待右手虫半血后本体会直接下来，右手其实是右手虫的尾巴，右手虫下来会直接吐出覆盖全图的毒素，我们直接变成石头人往右手虫的位置走。\n" +
            "\n" +
            "通过一个压顶可以直接让右手虫破防，我们这时直接变回猴子先输出一套普攻，看到虫子想起来直接定身术，再输出一套。\n" +
            "\n" +
            "最后使用定风珠打一波控制，一个重击直接结束战斗。",
        reward: "照骨镜、细金线1、灵蕴1920、寒铁叶2，佛手-右",
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
        description: "生来心性拙，进退不得脱。\n" +
            "\n" +
            "戒空难戒色，随性也随佛。\n" +
            "\n" +
            "钉钯筑机缘，獠牙拱因果。\n" +
            "\n" +
            "滚滚浊世里，管他笑与说。\n" +
            "\n" +
            "大罗天，瑶池之上。\n" +
            "\n" +
            "仙娥们往来穿梭，原是王母今日开阁，设了个赏荷宴。\n" +
            "\n" +
            "天蓬进宫门时，见一壮汉堵在门口，被把门的仙娥拦着。那仙娥不冷不热道：“卷帘将，没有王母亲写的请束，池边雅座断然进不去的。一旁侧殿有几个空位，你若不嫌，倒可过去吃杯酒。”那壮汉口里应着，眼晴却仍往里瞅。\n" +
            "\n" +
            "天蓬摇头轻笑，对另一仙娥展露请束，昂首走了进去。\n" +
            "\n" +
            "酒宴早已开始，众仙卿杯益往来，觥筹不断。\n" +
            "\n" +
            "天蓬总管天河水兵，这样的欢场来得不多，但他逢人都要招呼两声，仿佛人人都很熟络，酒却不敢多喝。\n" +
            "\n" +
            "南极仙翁站在王母一侧，捋着胡子，笑道：“今次摆宴排场如此隆重，后面的蟠桃宴还怎么搞？”\n" +
            "\n" +
            "一旁星君打趣道：仙翁多虑了，有那九千年的蟠桃撑场面，哪怕在南天门外随便支几张桌子，三界那些大小尊神，爬也爬过来尝两口。\n" +
            "\n" +
            "又有一赤脸神仙冷笑道：“他们哪里是冲着蟠桃来，多是想来拜拜玉帝三清，见见西天佛老，难得找个由头上来走动走动。\n" +
            "\n" +
            "王母正色道：“蟠桃宴何等大事，今日设宴正是预演，该走的流程，都老老实实走一遍。”\n" +
            "\n" +
            "说罢对太阴君使个眼神，太阴君一拍掌，一队身着素练的嫦娥仙子从后面走入场内。\n" +
            "\n" +
            "那些仙子在瑶池边分好位置，弹的弹，唱的唱，跳的跳。其中又有一领舞仙子，白裙白发，舞姿曼妙，姿容尤其出众。天蓬从未如近地赏过嫦娥们起舞，不由看得痴了。\n" +
            "\n" +
            "一位身着紫纱霓裳的仙娥，奉着酒盏，走到天蓬近前，轻轻唤道：“元帅。”\n" +
            "\n" +
            "天蓬下意识地端起酒益，眼睛却片刻不离台中那缕白虹。\n" +
            "\n" +
            "待一众嫦娥舞毕，天蓬醒了醒神，准备上去给王母敬酒。队伍太长，他一路寻到队尾，竟已走到宫门之外。\n" +
            "\n" +
            "这时忽听到有人大声叫唤：“鞋！鞋！”\n" +
            "\n" +
            "他循声望去。就见两个仙吏。扶着个喝至了的猴子，匆如而过。\n" +
            "\n" +
            "天蓬想，我何时才能像他这般大醉一场？",
        position: "游记位置：第四回的额外BOSS，位于人物词条【小西天土地】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/猪八戒/zbj-position.png',
        difficulty: 2,
        experience: "点满【身外身法】【定身术】【变化神力上限】【变化攻击力】，法宝带【定风珠】，其他跟着自己的喜好加点即可。开局所有技能扔出去（定身→招猴子→轻棍A到等棍势满了停一下，重棍爆发），等猴子消失了，用变身收尾，一般头目都是顶不住这么一套的。\n" +
            "\n" +
            "第一次遇到猪八戒，可以使用我的BD直接将其围殴打死，没有任何难度。\n" +
            "\n" +
            "第二次遇到猪八戒，第一阶段和前面同理的打法。\n" +
            "\n" +
            "第二阶段它会变成鲶鱼，一共变两次，如果不变两次是无法将其击败的。\n" +
            "\n" +
            "所以在他变成鲶鱼的时候，专注躲避技能，其他输出类技能可以省一省。等他变回猪形态，所有输出技能再招呼上去。",
        reward: "[月玉兔]、染血绣针、不净套装",
    },
    {
        bossId: 37, chapterIndex: 3, name: "紫蛛儿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/37.png",
        description: "曾驾云车上高台，今寄幽穴隐山崖。\n" +
            "\n" +
            "小桥风月吹瘦骨，春来嫁衣又新裁。\n" +
            "\n" +
            "话表三藏别了朱紫国，整顿鞍马西进。行至一座庵林，三藏意欲去化些斋吃，走至庄前，却见几个女子在亭下踢气球。三藏随她们入屋，便被掼倒在地，将绳子捆了，悬梁吊了个“仙人指路”\n" +
            "\n" +
            "行者跳树攀枝，见有一片光亮，知师父遇了妖精，唤出土地详问，原是盘丝洞中七个妖精占了天上仙姑的浴池。她们每日洗三次澡，行者即变作个饿老鹰，把他那衣架上搭的七套衣服，尽情叼去。\n" +
            "\n" +
            "八戒见有这许多衣服，一番打听，得知有七个妖精在洗澡，便欢天喜地，径直闹到那里。那呆子不容说，脱了皂锦直裰，扑的跳下水去，变做一个鲇鱼精。那怪就都摸鱼，赶上拿他不住。他却认出一个，原是旧相识，便滑扢薹的，只在那腿裆里乱钻。在水上盘了一会，又盘在水底，只盘得喘噓噓的，精神倦怠。\n" +
            "\n" +
            "妖情们跑回洞里，取了几件旧衣裳，唤出七个义子守家，自己往黄花观而去。八戒找回原路，与师兄弟一同退了虫妖，解下师父，却又奔上大路，到了黄花观。那黄花观主原与那七个妖精同堂学艺，得知唐僧乃十世修行的原体，师妹们受辱于他师徒，做了四杯毒药茶，意欲报仇正好吃了唐僧。\n" +
            "\n" +
            "岂料行者识出端倪，掀翻茶碗，打退了蜘蛛精。魔君上来缠斗，行者便令八戒去灭那七个蜘蛛精。八戒得了师兄的令，拽着钉耙挨个尽情打作则肉，独剩那最后一个，想起在水中有过思欢，竟有些动不下手来。只得一钯筑在地上，教她赶紧逃命去也。\n" +
            "\n",
        position: "游记位置：位于第四回妖王词条的第一位。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-position.png',
        difficulty: 3,
        experience: "点满【身外身法】【定身术】【变化神力上限】【变化攻击力】，法宝带【定风珠】，其他跟着自己的喜好加点即可。\n" +
            "\n" +
            "开局所有技能扔出去（定身→招猴子→轻棍A到等棍势满了停一下，重棍爆发），等猴子消失了，用变身收尾，一般头目都是顶不住这么一套的。\n" +
            "\n" +
            "推荐的BD可以直接把BOSS打到半血以下，她的所有伤害都是毒属性，带好解毒药，她的伤害不高，很容易将其击败。",
        reward: "【连理肢】",
        bossTrick: [
            {
                name: "翻身连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick1.gif"
            },
            {
                name: "连续突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick2.gif"
            },
            {
                name: "前爪攻击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick3.gif"
            },
            {
                name: "三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick4.gif"
            },
            {
                name: "吐毒1",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick5.gif"
            },
            {
                name: "吐毒2",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick6.gif"
            },
            {
                name: "吐毒3",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick7.gif"
            },
            {
                name: "吐丝1",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick8.gif"
            },
            {
                name: "吐丝2",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/紫蛛儿/zze-trick9.gif"
            },
        ]
    },
    {
        bossId: 38, chapterIndex: 3, name: "毒敌大王",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/38.png",
        description: "仙居深处醉愁肠，金甲金螯毒难当。\n" +
            "\n" +
            "鸡鸣泣血身将破，情路如月爱如阳。\n" +
            "\n" +
            "毒敌山近邻西梁女国，山中自也继了西梁女国的传统，以女为尊。\n" +
            "\n" +
            "这山中的魔王乃是个母蝎子精，又唤风月魔，最是生得妖娆貌美。她修的乃是“动”字门中之道，极擅房中术，又会欢好之事，是以有无数同修的道侣。\n" +
            "\n" +
            "那道侣之中，恰有只公蝎子，生得金甲金螯非常雄壮，曾是风月魔心头之好。风月魔与这公蝎子还曾诞过一窝小蝎子，岂奈，这一窝仔蝎中，尽无一只母的，她便无心教他们法门，那金甲金整的公蝎子也连带受了厌弃。\n" +
            "\n" +
            "见风月魔不再找自己同修，那公蝎子倒也十分硬气，领着孩儿们搬去山外居住，不再与其往来。\n" +
            "\n" +
            "其后，取经人途经西梁女国，风月魔劫走唐僧，被悟空请来的星官一声鸡鸣，震死当场。西梁女国被捉来洞中的国民，便都散了去，走时还将洞中所积财物，一并分了干净。悟空又嫌不够，着意添了把火，连那几间房宇也烧没了。\n" +
            "\n" +
            "火起之时，那住在山外的公蝎子有所察觉。待他找去山间，昔日所爱，被人选剥了衣裳，割去了尾巴，捣作一团烂酱，死在坡前。他多方打探，才知是天上昴宿杀了夫人，一心要为她报仇。\n" +
            "\n" +
            "所幸，那风月魔昔日曾点拨过他一些修行的门道，他就在那琵琶洞里住下，重整门楣，潜心修行。但他终究不是个女体，功法难有大成，毒敌山的名号也日渐衰微。后来，他听闻黄花观观主，乃是虫妖中首屈一指的高人，亦与昴日星官有深仇，便带着儿子们投那处去了。",
        position: "游记位置：位于第四回妖王词条【紫珠儿】的下方。\n" +
            "\n" +
            "具体位置：在【盘丝岭-隐·紫云山-绕仙居】篝火右侧屋顶喝酒，如果打破酒坛将会进入战斗，如果不打破，可以等他助战晦月魔君的战斗。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-position.png',
        difficulty: 5,
        experience: "武器：选择当前面板最高的就行。\n" +
            "\n" +
            "宝物：辟火罩。\n" +
            "\n" +
            "精魄：百目真人（升满）\n" +
            "\n" +
            "披挂选择：长嘴脸、金身绣衫、金身护臂。\n" +
            "\n" +
            "珍玩选择：猫晴宝串、虎头牌。\n" +
            "\n" +
            "葫芦：五鬼葫芦\n" +
            "\n" +
            "根器必点：鼻嗅爱（气味相投）、眼看喜（慧眼圆睁）。\n" +
            "\n" +
            "法术携带：定身术、聚形散气、身外身法、赤尻马猴（变身）。\n" +
            "\n" +
            "根基：主加攻击与暴击。\n" +
            "\n" +
            "棍法：选择劈棍，点到三棍势即可。\n" +
            "\n" +
            "身法：点左边的两个技能就行，主要是延长隐身的时间。\n" +
            "\n" +
            "毫毛：身外身法点满。\n" +
            "\n" +
            "变化：将变身后攻击力增加点到最高。\n" +
            "\n" +
            "走到毒敌大王的BOSS战场地，先往右边的小祭坛走，在祭坛前方使用百目真人来提高攻击力。\n" +
            "\n" +
            "完事往毒敌大王的方向走，看到BOSS血条出现后立刻回到祭坛，此时尽量站在祭坛的角落。\n" +
            "\n" +
            "面对毒敌大王，看到敌人冲过来直接使用聚形散气，隐身时先喝葫芦增加攻击力，再使用身外身法召唤猴子。\n" +
            "\n" +
            "看到毒敌大王冲到祭坛角落时立刻使用定身术，将毒敌大王困在角落。\n" +
            "\n" +
            "走到毒敌大王身旁变身马猴，因为我们本来就攒好三棍势了，立刻使用云来技能，然后不停的对着毒敌大王AAA，基本能将毒敌大王困死在祭坛角落。\n" +
            "\n",
        reward: "通天角×1、毒敌钩×1、细金线×2、玲珑内丹×1、彩玉葫芦1",
        bossTrick: [
            {
                name: "近战三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-trick1.gif"
            },
            {
                name: "双爪拍地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-trick2.gif"
            },
            {
                name: "跳跃背摔",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-trick3.gif"
            },
            {
                name: "隐身一击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-trick4.gif"
            },
            {
                name: "近战二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-trick5.gif"
            },
            {
                name: "火焰三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-trick6.gif"
            },
            {
                name: "突进三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-trick7.gif"
            },
            {
                name: "突进三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/毒敌大王/dddw-trick8.gif"
            },
        ]
    },
    {
        bossId: 39, chapterIndex: 3, name: "靡道人",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/39.png",
        description: "访道空山闻落花，闻笛声声有人家。\n" +
            "\n" +
            "穿戴假面如真像，借取他身炼丹砂。\n" +
            "\n" +
            "昔年，有位少年独自来盘丝岭寻仇。不料，他被妖怪所擒，困在洞中历尽艰险磨难，侥幸脱身。待他返回朱紫国，众织户纷纷上门，希望他能引领大家，前往岭上的朱家大院，寻找传说中的玉梭。\n" +
            "\n" +
            "少年心中杂乱，闭门谢客，但他的母亲却无法理解他，逼他率众去岭上除妖救父。可人心何其难测，各怀鬼胎的织户们并未在险境中团结一致，他们内斗不断，最终在朱家大院里，被只青色大蜘蛛悉数剿灭。\n" +
            "\n" +
            "那少年匍匐在地，十分害怕，不想那蜘蛛化出人形，原是洞中，有一面之缘的青衣仙女。少年已对凡人厌倦不已，他痛哭流涕，求仙女留他在岭上修行。青衣仙女痛骂了他一场，将他从院里赶了出去。\n" +
            "\n" +
            "少年流落至岭上的荒村里住下，虫妖们对他多有耳闻，蜻蜓精见他这般凄苦，便引荐他去黄花观，见了自己的师父百眼魔君。\n" +
            "\n" +
            "黄花观中的道士们，皆戴着石质面具，魔君告诉少年，若想修行，就必须断绝世俗因果，戴上石面，了却尘缘。少年犹豫不定，在观中逡巡。\n" +
            "\n" +
            "不料，有位红衣老太，正带着一群花容月貌的仙子们来观中拜访。其中，正有那青衣仙女和黄衣少女。\n" +
            "\n" +
            "其后，观中设宴，请众仙子入座，少年在旁偷看，就见那桌上摆了好些菜肴，有人油炒炼，人肉鲜煮鲜烹，人脑煎作的豆腐块，人肉馅包的荤馍馍。他闻着腥臭，只能看着众妖食人。\n" +
            "\n" +
            "魔君见他撞到这等场面，只淡淡道：“妖怪食人乃天性。凡人寿数有限，即便被我们吃了，也不过是少了十几年寿数，眨眼之间而已。”\n" +
            "\n" +
            "是夜，少年感到无比孤独寂寞，他在月下吹出家乡的小调。他细细反思，问自己究竟是如何走到了今时今日。他哭了很久，最终决定拜师学艺，既然无法改变，那就只能加入他们。\n" +
            "\n" +
            "他彻夜未眠，痛下决心在修行的路上一往无前。他询师父成妖捷径，魔君告诉他：“紫云山中有种异虫，名琴螂。生食其卵，便可飞升成妖……”\n" +
            "\n",
        position: "游记位置：位于第四回头目词条【虫总兵】的下方。\n" +
            "\n" +
            "具体位置：在【隐·紫云山】完成对应支线即可与其战斗",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/靡道人/mdr-position.png',
        difficulty: 2,
        experience: "点满【身外身法】【定身术】【变化神力上限】【变化攻击力】，法宝带【定风珠】，其他跟着自己的喜好加点即可。\n" +
            "\n" +
            "开局所有技能扔出去（定身→招猴子→轻棍A到等棍势满了停一下，重棍爆发），等猴子消失了，用变身收尾，一般头目都是顶不住这么一套的。\n" +
            "\n" +
            "用这套BD基本上可以无伤靡道人，觉得有难度可以在用【百目真人】精魄，增加攻击力，靡道人是顶不住的。",
        reward: "法术变身·藕雹",
    },
    {
        bossId: 40, chapterIndex: 3, name: "晦月魔君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/40.png",
        description: "短歌壮心惊，长啼乌夜明。\n" +
            "\n" +
            "踊跃几升落，浮沉似漂萍。\n" +
            "\n" +
            "他躺倒在地，尚不知自己是如何败的，原先那不入眼的道袍虫妖，如今站在他跟前，竟然在笑。\n" +
            "\n" +
            "见那虫妖手持一支光彩焕烂的金钗，他心下恍然。还待要问，却发不出声来，直觉疼痛难忍，想是那贱虫用金钗，一下就割开了他的喉咙。\n" +
            "\n" +
            "他理应快死了，他闭上眼，不想生前最后一眼，是那张丑恶的嘴脸。\n" +
            "\n" +
            "未期，有人将他翻过身来，还给他细细抹上了膏药。他又能喘上气了，但这并非好事。\n" +
            "\n" +
            "那虫妖嘖啧称奇：“师父给的药，果真了得。这一下竟续上了断处。可惜可惜，用在了这里。”\n" +
            "\n" +
            "他睁开眼，又想发问，虫妖制止道：“莫急，外伤之药，岂有治好内伤的道理？再者，我也不想把你治好。”\n" +
            "\n" +
            "语毕，虫妖招了招手，两个着青杉的假道士抬着一口盖着锦布的玉箱走来。\n" +
            "\n" +
            "虫妖取出一枚金茧，道：“我等山野妖怪，配不上此物，还得是用你试试才好。”\n" +
            "\n" +
            "他心下惊急，咳出一口血，喷在那金茧上。\n" +
            "\n" +
            "那茧遇血而破，钻出条人首金身的虫雾，一下窜入草里不见了。\n" +
            "\n" +
            "虫妖毫不慌张，从玉箱里又掏出了一枚金茧：“还是师父思虑周金，备了两枚金茧。\n" +
            "\n" +
            "他还想挣扎，身上却被蛛丝牢牢掴定。那虫妖喝令道：“灌下去。”\n" +
            "\n" +
            "“几个假道士，真就抬了几桶水，捉住他的头，往他嘴中不知灌了什么汤药。只觉又腥又臭，喉中一哽，似有什么咽了下去。\n" +
            "\n" +
            "自吞下那物，他周身如坠云端，连神魂也迷糊起来。\n" +
            "\n" +
            "除了对母亲的一点牵挂，他似是再难忆起什么。若乾坤真有机缘，他无声念了最后一咒，还请天地将这绝处逢生的运数，留给母亲罢。",
        position: "游记位置：位于第四回妖王词条【敌毒大王】的下方。\n" +
            "\n" +
            "具体位置：【盘丝岭-隐·紫云山】最终BOSS。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/晦月魔君/hymj-position.png',
        difficulty: 3,
        experience: "奇术点满禁字法，然后棍法选择立棍，使用20技能点激活四棍势即可，其他自由选择。\n" +
            "\n" +
            "一阶段几乎没有难度这里就不讲了，如果打不过一阶段可以叫毒敌大王来帮忙。\n" +
            "\n" +
            "二阶段开局使用禁字法，然后躲避它的剑气，蓄力打一下，近身靠近打输出，基本他还没怎么打就半血了。\n" +
            "\n" +
            "其他时候站在它脚下进行攻击，只需要看它的脚什么时候抬起来，抬起来之后闪避躲一下就可以了。\n" +
            "\n" +
            "大部分攻击都很好打。唯一要注意的是三剑大回环，尽量不要怕它的输出，这个BOSS越主动越好打。",
        reward: "【染血绣针】",
    },
    {
        bossId: 41, chapterIndex: 3, name: "百眼魔君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/41.png",
        description: "提罐弄炉火，炼丹修道果。\n" +
            "\n" +
            "眼多心也多，心多必算错。\n" +
            "\n" +
            "“这……能成吗？师兄。”紫衣老妇低头，不敢直视百眼魔君。\n" +
            "\n" +
            "魔君把针递到老妇眼前，软语道：“吞了那猴子留下的东西，再连上这法宝，若还不成，再逃来我处，师兄自会与你撑腰。”\n" +
            "\n" +
            "他似又想到了旁的事，道：“若换我先下手，那只猪，你怕是再也见不到了……\n" +
            "\n" +
            "老妇赶紧接过那根针，行了个谢礼，退下了。\n" +
            "\n" +
            "待门关，上，屏风后，转出来个仙长，是个朱绣顶的白鹤嘴脸，持一柄拂尘，气字昂昂地看着魔君。\n" +
            "\n" +
            "魔君朝他拘着礼，南告道：“拿捏了那猪头。天命人自然翻不起风浪。”\n" +
            "\n" +
            "鹤仙人不置可否，叹道：“你们这点心机，陛下全看在眼里。不曾理会，是给她老人家几分面子。”\n" +
            "\n" +
            "魔君干笑着答道：“娘娘的意思，便宜那边占得太多。这回，正好连本带利收回来。”\n" +
            "\n" +
            "鹤仙人甩了甩拂尘，宛如赶苍蝇一般，闲闲道：“事成了，你走。她们留下。”\n" +
            "\n" +
            "魔君眉头稍展，深深地朝那仙长回了一礼。",
        position: "游记位置：位于第四回妖王词条【小黄龙】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-position.png',
        difficulty: 4,
        experience: "推荐BD：点满【身外身法】【定身术】【变化神力上限】【变化攻击力】，法宝带【绣花针】，其他跟着自己的喜好加点即可。\n" +
            "\n" +
            "开局所有技能扔出去（定身→招猴子→轻棍A到等棍势满了停一下，重棍爆发），等猴子消失了，用变身收尾，一般头目都是顶不住这么一套的。\n" +
            "\n" +
            "打百眼魔君一定要有打【晦月魔君】掉落的法宝【绣花针】，只要进入二阶段开眼，直接释放法宝，然后百眼魔君就只有一阶段了，难度骤减。\n" +
            "\n" +
            "其他打法可以用我推荐的BD，打起来会轻松很多，因为没有二阶段，他的硬直和抗性很差，很容易击败。",
        reward: "武器——昆棍·百眼、防具——羽士套装",
        bossTrick: [
            {
                name: "单次范围打击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick1.gif"
            },
            {
                name: "单次吐毒",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick2.gif"
            },
            {
                name: "符纸四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick3.gif"
            },
            {
                name: "令剑雷击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick4.gif"
            },
            {
                name: "三连剑击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick5.gif"
            },
            {
                name: "蓄力重击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick6.gif"
            },
            {
                name: "旋转四剑击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick7.gif"
            },
            {
                name: "远程符纸攻击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick8.gif"
            },
            {
                name: "掷剑",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick9.gif"
            },
            {
                name: "钻地攻击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick10.gif"
            },
            {
                name: "大范围砸击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick11.gif"
            },
            {
                name: "蓄力回手掏",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick12.gif"
            },
            {
                name: "远程组合连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick13.gif"
            },
            {
                name: "抓投",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick14.gif"
            },
            {
                name: "组合连招1",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick15.gif"
            },
            {
                name: "瞬移重击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick16.gif"
            },
            {
                name: "蓄力法球",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick17.gif"
            },
            {
                name: "召雷",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/百眼魔君/bymj-trick18.gif"
            },
        ]
    },

    // ================== 火焰山 (42-50) ==================
    {
        bossId: 42, chapterIndex: 4, name: "石父",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/42.png",
        description: "山中有山神，休羡难休嗔。\n" +
            "\n" +
            "怀内骷髅骨，曾是花下人。\n" +
            "\n" +
            "一日，黄风岭的磐石谷中，闯入个衣裳破烂的姑娘，她满身伤痕，因路过石精的洞府，见里头有些天然家当，便躲了进去，打算在那里栖身。\n" +
            "\n" +
            "石父归来，见有人在洞中，原要赶她出去，见她一副可怜模样，只好容她休息片时。岂料，这姑娘将洞中的山果野味，炊成一桌可口的菜肴。那石父嘴馋，便留下姑娘来做饭。其后，石父每日负责带回食材，姑娘负责烹制，人与妖，相处极洽，便这样过了两年。\n" +
            "\n" +
            "一次，姑娘外出洗衣裳，在河边遇到了同村的樵夫，回来之后不由大哭起来。原来她常年遭受父母虐待，因要把她嫁与一个傻子换彩礼，这才从家中逃了出来。如今，她十分害怕被捉回去，惶恐不已。\n" +
            "\n" +
            "果然，翌日晌午，村民们都找来了谷中。她的父母因惧怕妖怪，便在洞口苦苦哀求。姑娘拒不从命，他们又转成破口大骂。只有石父冲出山洞大喝一声，他们才赶紧躲藏，待石父回到洞中，又跑出来继续辱骂。\n" +
            "\n" +
            "石父索性坐在了洞口把守，那姑娘的父母就放下狠话，若妖精不还回女儿，便找道士来收他们。\n" +
            "\n" +
            "姑娘害怕连累石精们，趁夜悄悄离开了洞府，结果不慎滚下山崖摔死了。次日当石精们找到她时，尸首都已凉透了。\n" +
            "\n" +
            "他听山间的妖怪们讲，火焰山的铁扇仙极有法力，心也善良。于是石父抱着姑娘的尸首，一路走到火焰山。铁扇仙见过尸首后，说此事难如登天，若强行复活，只能是一副没有灵智的躯壳，不要也罢。\n" +
            "\n" +
            "石父不死心，便日日抱着姑娘的尸首等在火焰山的山道上，希望博得铁扇仙的怜悯，哪怕姑娘的肉身已化为了白骨，仍是没有放弃。",
        position: "游记位置：位于游记第五回头目词条【五行战车】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/石父/sf-position.png',
        difficulty: 4,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "推荐加点主点身外身法，将身外身法点满然后BOSS战开启直接定身术+召唤猴子猴孙。\n" +
            "\n" +
            "因为石父的韧性很低，加上猴子猴孙也会不断续定身术，直接将石父群殴死是没什么问题的。\n" +
            "\n" +
            "石父正常的技能也有明显的前摇后摇，总体来说不是一个很难的BOSS。\n" +
            "\n",
        reward: "1764灵蕴、2个蚕丝、1个寒铁叶",
    },
    {
        bossId: 43, chapterIndex: 4, name: "急如火快如风",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/43.png",
        description: "性烈把命烹，痴狂逞乖能。\n" +
            "\n" +
            "鼻喷炎漠漠，嘴呼焰腾腾。\n" +
            "\n" +
            "举烟风随火，燎原火趁风。\n" +
            "\n" +
            "义气值千金，相辅才相生。\n" +
            "\n" +
            "昔年，有两个泼皮在城里流浪，夜里总是宿在同一片城墙根下，所以交情很好。\n" +
            "\n" +
            "他两个原就没有牵挂，做事不管不顾，下手总没个轻重，一次因抢个富家小公子，不慎将人打死了，便一同判了斩刑，关在牢里，只等秋后问斩。\n" +
            "\n" +
            "关在牢中时，一个泼皮对另一个泼皮道：“此生倒也逍遥，死了便死了罢。可惜，以后无法再一同取乐了。”\n" +
            "\n" +
            "另一个泼皮道：“若想再一道耍子，倒也不难，我乃落头民的后裔，有些傍身的小本事。”于是，便附耳教了他一套功法。\n" +
            "\n" +
            "秋后，二人在市曹被斩首。侩子手将酒一喷，手起刀落，那二人的头顺势落地，却倏地一下飞去了空中，观刑的群众无不叫好连天。\n" +
            "\n" +
            "其后，这两个头颅一起飞去山中做了妖怪，一个名为急如火，一个名为快如风。",
        position: "游记位置：位于游记第五回头目词条【石父】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/急如火快如风/jrhkrf-position.png',
        difficulty: 4,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "急如火与快如风是一个双人BOSS，通过隐藏机制可以很轻易的将其击败，棍法一定要选择劈棍。\n" +
            "\n" +
            "战斗开始后我们要尽量与急如火贴在一起，然后通过不断普攻急如火积攒棍势，当积攒三层棍势后找到急如火停下的时机直接朝着快如风方向重棍劈急如火。\n" +
            "\n" +
            "这时急如火会直接被我们劈飞，受到大量伤害，而快如风如果被急如火的头部击中也会受到大量伤害。\n" +
            "\n" +
            "不过就伤害量与容错率来说，急如火一定是先死的，但就算急如火死了它的头依然会留在原地，我们这时积攒棍势重击头颅依然能敲飞并对快如风造成大量伤害并使其倒地。\n" +
            "\n" +
            "有一点需要注意的是只有积攒三层棍势的重击才能敲飞急如火的头，二层棍势只会造成伤害。",
        reward: "珍玩·满堂红",
        bossTrick: [
            {
                name: "风杨火散",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/急如火快如风/jrhkrf-trick1.gif"
            },
            {
                name: "BOSS机制",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/急如火快如风/jrhkrf-trick2.gif"
            },
            {
                name: "突刺",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/急如火快如风/jrhkrf-trick3.gif"
            },
            {
                name: "吐风",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/急如火快如风/jrhkrf-trick4.gif"
            },
            {
                name: "远程攻击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/急如火快如风/jrhkrf-trick5.gif"
            },
        ]
    },
    {
        bossId: 44, chapterIndex: 4, name: "云里雾雾里云",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/44.png",
        description: "奇的由他奇，怪的由他怪。\n" +
            "\n" +
            "跟着儿皇帝，山场任他坏。\n" +
            "\n" +
            "不去逞刚强，不把雄心赛。\n" +
            "\n" +
            "是非临到耳，抛到云霄外。\n" +
            "\n" +
            "从前有三个鬼，共用一副身躯。他们想挣一个山神的名分，便疏通好门路，瞧准了号山的一个瞎子山神下手。\n" +
            "\n" +
            "却说那位山神虽瞎了眼，但听觉十分敏锐，他极擅烟火之法，能放出烟雾，掩藏行迹。每每这三个鬼来挑衅时，便立刻隐遁了起来。\n" +
            "\n" +
            "一次，三个鬼合力喷出雷光，扫荡开去，将那山神电了出来。山神大叫着，举起香把乱挥乱舞，三鬼却因身形笨拙无法躲避，挨了一下。眼见衣裳被燎着了，三个鬼丢开山神，竟互相骂了起来。\n" +
            "\n" +
            "他二者斗得十分狼狈，山崖上忽传来一阵笑声，只见有个红皮肤白头发的小郎君坐在那处，像看把戏一般望着他们。\n" +
            "\n" +
            "三鬼与山神恼羞成怒，暂且放下恩怨，与那小郎君打了起来。那小郎君甚感很有趣，也使一杆尖枪，和他们过了过招。\n" +
            "\n" +
            "没承想，山神的烟雾正好能遮蔽三鬼笨拙的身躯，三鬼的雷光，正好能诱敌为山神制造进攻机会。如此这般，他二者竟能与那小郎君打个十数合。直至小郎君使出三昧真火，方才倒地求饶。\n" +
            "\n" +
            "红孩儿对他们道：“这六百里山头以后都是我的，你们就跟着我，做我麾下的健将罢。”\n" +
            "\n" +
            "自此，三鬼得了个新名字，唤作云里雾，瞎眼的山神被赐名叫作了雾里云。他们一起共事，服侍红孩儿，不过嫌隙始终难消，到今日还经常闹矛盾哩。",
        position: "游记位置：位于游记第五回头目词条【急如火&快如风】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-position.png',
        difficulty: 5,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "战斗刚开始时只有云里雾会出现在前方，直接定身术+身外身法打一套，大概磨掉三分之一血之后俩BOSS开始互换位置打进攻，这里先以躲技能保状态为主。\n" +
            "\n" +
            "敌人连招结束会暂时以雾里云的攻击为主，而雾里云的攻击能够烧伤我们持续的掉血。\n" +
            "\n" +
            "在我们同样消耗了雾里云三分之一的血量会再次切换回云里雾，俩人除了连招时切换状态，其他时刻均已血量掉三分之一为基准来切人。\n" +
            "\n" +
            "明白了敌人的基础机制后续就好说了，在敌人每次切换人物上场之后的稳定时段是我们输出的主要时段，这时也以个人的攻击为主。\n" +
            "\n" +
            "云里雾主打法术，雾里云主打近战火焰异常，其中对我们威胁最大的时每次切换人物时俩人的瞬移组合连招，只要对这套连招谨慎于对待，就会发现俩人的真面目并没有那么可怕。",
        reward: "特品（紫色）精魄",
        bossTrick: [
            {
                name: "激光三连（直线）",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick1.gif"
            },
            {
                name: "激光三连（横扫）",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick2.gif"
            },
            {
                name: "组合攻击1",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick3.gif"
            },
            {
                name: "组合攻击2",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick4.gif"
            },
            {
                name: "组合攻击3",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick5.gif"
            },
            {
                name: "换人技",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick6.gif"
            },
            {
                name: "瞬移三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick7.gif"
            },
            {
                name: "三连重击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick8.gif"
            },
            {
                name: "突刺三回旋",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/云里雾雾里云/ylwwly-trick9.gif"
            },
        ]
    },
    {
        bossId: 45, chapterIndex: 4, name: "火焰山土地",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/45.png",
        description: "炉倒砖陨遭贬日，却惜红颜难相知。\n" +
            "\n" +
            "一身才学付败子，蓦然回首已成痴。\n" +
            "\n" +
            "银河清亮，玉宇无尘。这夜，小道童坐在丹炉前，打着扇，守着火，正是精神不济，要偷偷眠上一眠时，忽听有声轻笑传来。\n" +
            "\n" +
            "他一抬头，就见师父领着个姑娘，站在了门首，正看着他打瞌睡。他急忙整衣起身，向师父赔礼告罪。师父一反常态并未贵骂，将他招至跟前，向他简单说明了来人，嘱咐他们日后一同看守丹炉。末了，淡淡道：“你可唤她师姐。”\n" +
            "\n" +
            "小道童起初听见有人作伴十分高兴，却听到要叫新弟子作师姐，心下不大欢喜，待师父一走，便意欲刁难刁难她。\n" +
            "\n" +
            "他将扇子往姑娘手里一交，道：“炉子就归你来看了，没有大的休息，让小的做事之理，对罢？师姐。”那姑娘不反驳，只是笑道：“在理。师弟且去休息。”\n" +
            "\n" +
            "次日，师父登坛，姑娘跑至近前，小道童原以为她要告状，没想她却道：“师父，弟子新来，合该由我扇风。只是昨日师弟给我这把扇子，扇面小了些，用着不太趁手。”\n" +
            "\n" +
            "师父瞥了小道童一眼，笑道：“既是如此，我再做一把新的，顺便就算賜你当个法器罢。”\n" +
            "\n" +
            "小道童未想到师父那般严厉之人，对这姑娘却如此和颜悦色，渐渐刮目相看起来。\n" +
            "\n" +
            "此后，二人一道练功修行，他发现这姑娘佛道双修，师父不论讲什么经义，姑娘都能接上几句，反观自己，嘴巴跟不上也罢，心思也落了下乘。\n" +
            "\n" +
            "再后来，因丹炉被人踢翻，他被师父重罚，其他同门冷眼旁观，倒是只有这个便宜师姐，自请下凡，帮衬良多。\n" +
            "\n" +
            "下界后，他才知道师姐原来还有座洞府，有群誓死效忠的随从，师父还格外开恩，为她请了地仙的名分。\n" +
            "\n" +
            "又过了些时日，师父将师姐许给了下界的一位魔王。他虽有些怅然，却也明白自己终究身份不够，不论替师父做了多少脏活，在师父眼里，他始终都配不上她。",
        position: "游记位置:火焰山土地是第五回的额外BOSS，游记位置在人物列表红依的下方。\n" +
            "\n" +
            "具体位置:主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/火焰山土地/hystd-position.png',

        difficulty: 4,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。 \n" +
            "\n" +
            "火焰山土地的BOSS战我们将于猪八戒并肩作战，而火焰山土地则是以法术攻击为主，召唤敌人攻击为辅。\n" +
            "\n" +
            "火焰山土地的攻击欲望很高，释放一段法术再跑的频率也很高，但火焰山土地的法术都很好躲，直接贴脸使用你最常用的手法输出即可。\n" +
            "\n" +
            "在BOSS的血量被消磨三分之一时火焰山土地会召唤两批小怪，一批使用近战攻击一批使用弓箭远程攻击，单个小怪没什么威胁，但多个小怪成堆时就要注意不要被消耗血量了，建议直接远程蓄力棍势再进场重击，以避免这种情况发生。\n" +
            "\n" +
            "此时火焰山土地也是不会攻击的，等到所有小怪被消灭火焰山土地会落到地面，此时上前继续输出，等火焰山土地的血量只剩三分之一时再次召唤敌人。\n" +
            "\n" +
            "第二次召唤的敌人是马天霸，也是我们前面一直能碰到的马哥，马天霸使用长鞭攻击，攻击距离较远，通常以三连击为主。\n" +
            "\n" +
            "想要击败马哥不难，但我们此时的目标不是击败马哥，而是以保存状态以击败后面的阴阳鱼，因此建议最多只能使用两个定身术在马哥身上。\n" +
            "\n" +
            "马哥没有什么难躲的招式，通常一个定身术+猪八戒的削韧就够我们用了。",
        reward: "‌【龙膏】、【瞌睡虫蜕】、【变身马(黯雷)】",
    },
    {
        bossId: 46, chapterIndex: 4, name: "五行战车",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/46.png",
        description: "五辆车儿合五行，五行生化火煎成。\n" +
            "\n" +
            "兽首呼啸急行驰，火轮东西战道平。\n" +
            "\n" +
            "火焰山，红孩儿即将迎来他的百岁生辰。他十分愉悦，对土地道：“马上就是我的生辰了，能让我出去玩一会儿吗？”\n" +
            "\n" +
            "土地道：“你父王让我看着你，让你在此专心修行，不可随意外出。”\n" +
            "\n" +
            "红孩儿道：“我已学会了三昧真火，难道不能歇息些时日？”说罢，他一捶鼻子，喷出一团火焰来。\n" +
            "\n" +
            "土地摇摇头，道：“教你练三昧真火，是希望你能用它来炼制内丹，你这样随意吐火，散了神气，也不过是弄些小把戏。”\n" +
            "\n" +
            "土地又道：“肝属木，木能生火；心属火，火能生土；脾属土，土能生金；肺属金，金能生水；肾属水，水又能生木。五行相生，循环不息。你有了三昧真火，自然是要用它来炼化五脏之气。”\n" +
            "\n" +
            "红孩儿听得不耐烦，道：“罢了罢了，我知道了，我再去修炼。”\n" +
            "\n" +
            "生辰那日，牛魔王在山中摆了宴席，广邀好友来参加。红孩儿命小妖们推出五辆小车来，只见小妖将车子按金、木、水、火、土安下，红孩儿走入场中，念个咒语，口里喷出火来，鼻子里浓烟迸出，闸闸眼，火焰齐生。那五辆车子上，火光涌出。连喷了几口，只见那红焰焰大火烧空。\n" +
            "\n" +
            "土地心中不喜，只觉这孩子玩性太大，爱钻研些奇技淫巧，怕他来日难有出息，耽误了大事。\n" +
            "\n" +
            "牛魔王却很是喜欢，觉得这孩子如今道行不深，却懂炼制器物相助自己，很有巧妙心思，当下便命人为儿子特制了五辆更大的战车。\n" +
            "\n" +
            "自那以后，五行战车便成了红孩儿修行的陪侍，不上百年，这五辆车儿也因他的三昧真火通了灵性，成了山间十分厉害的妖怪。\n" +
            "\n",
        position: "游记位置：位于第五回头目词条第一个。\n" +
            "\n" +
            "具体位置：五行战车共有五个分布在地图，其中前三个都能在流程中碰到，无需寻找。" +
            "\n" +
            "第四个战车位于土地庙谷口附近，从谷口出发一直走到前方开阔区域，然后往右走，跳到右侧岩浆区域继续往右前方走就能看到第四个战车和马天霸。\n" +
            "\n" +
            "第五个赤金战车位于清凉坡，从牛魔王所在的陨砖坑前面一点的位置往右下沿路一直走到通往隐藏区域的门即可看到赤金战车。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/五行战车/wxzc-position.png',
        difficulty: 5,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "褐铁战车可以直接站到下图红圈所示位置，这里战车的火焰吐不到，然后不断使用戳棍原地蓄力重击，直到将褐铁战车的血量磨完。\n" +
            "\n" +
            "灰铜战车位于一个非常狭窄的区域，我们到达战车身旁前需要频繁的通过两边凹进去的区域躲避火焰攻击。\n" +
            "\n" +
            "靠近灰铜战车后灰铜战车的攻击手段很少，无非是向前喷火与合击手掌，直接定身术+身外身法起手群殴灰铜战车，法术失效基本能打三分之二的血条，这时直接变身收尾。\n" +
            "\n" +
            "红银战车先吸引仇恨，然后直接站在下图所示最后一段楼梯下方，等待战车冲过来，然后往我们这里倒车。\n" +
            "\n" +
            "完事直接定身术+身外身法群殴，这块这个战车基本动都没法动，身外身法的时间没过就能直接干掉。\n" +
            "\n" +
            "赤金战车：开局先冲到赤金战车的旁边用定身术，一套普攻最后重击能直接把赤金战车干趴窝，这时使用身外身法开始群殴，然后积攒四层棍势。\n" +
            "\n" +
            "等待赤金战车起身的时候直接四层棍势重击敲下去再次干趴窝，然后群殴到战车半血其他猴子消失。\n" +
            "\n" +
            "接化身技幽魂控制，绕到车轮斜后方积攒三层棍势，如果赤金战车强行转头我们直接聚形散气继续绕到斜后方，再打一个三层棍势的重击，后面直接变身，变身对象可以按照自身喜好选择。\n" +
            "\n" +
            "变身时间再消耗一点血，结束后接第二个定身术最后打一套普攻收尾，如果还没死就再接一个重击。",
    },
    {
        bossId: 47, chapterIndex: 4, name: "火灵元母",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/47.png",
        description: "水有源头木有本，唯有黄金难寻根。\n" +
            "\n" +
            "富贵如云一朝尽，清名如山天地存。\n" +
            "\n" +
            "有个叫成名的采药人，因卖火灵砂而远近闻名。某日，有个方士打扮的壮汉，找来成名的生药铺中。方士从褡裢中，摸出一块手掌大小的金色丹砂。\n" +
            "\n" +
            "成名从未见过这般神奇的东西，问：“这是何物？”方士道：“此乃金丹砂，是火灵元母体内之宝。我听闻你是此处最有名采药人，想要与你合作。”\n" +
            "\n" +
            "成名道：”何为火灵元母？“方士道：”比寻常童子大十倍。此物一件便可卖黄金万两。只是需要许多火灵砂当诱饵。”\n" +
            "\n" +
            "听说要用火灵砂为饵，成名立刻拒绝了方士。但没过多久，方士又背着满满一褡裢火灵砂找来，坦白道：“我实是需要金丹砂炼药。若你能替我捉到火灵元母，我便给你黄金万两，这诱饵也归我来出。”\n" +
            "\n" +
            "见这买卖轻省，成名赶紧答应下来，二人次日就出发了。\n" +
            "\n" +
            "一路上，方士逐渐发现成名根本不会术法，他用着市井浑虫的把戏哄杀精怪。但方士转念一想，君子不拘小节，便也不以此嫌弃成名。最终，他们靠着成名的方法，摸索出火灵童子的巢穴。\n" +
            "\n" +
            "在巢穴里，方士倒出大量的火灵砂，逼出了火灵元母巨大的身躯。见二人到来，火球如雨点砸向他们，二人果然不是敌手。成名不会法术，更是几乎被烧死。见自己难以脱困，方士不愿连累成名，便御剑朝着火灵元母直冲而去，与她同归于尽了。\n" +
            "\n" +
            "随着元母死去，巢穴中的火灵童子也同时软倒在地，一命呜呼。成名割走了元母体内的金丹砂，火灵童子的火灵砂，还收走方士带来当诱饵的火灵砂，可谓大赚一笔。他回去后，还写了《山中记》《观火志》等书来讲述自己当日是如何独自击杀火灵元母的。\n" +
            "\n" +
            "若要问他为何改写书，而不再以采火灵砂为生，他书中有句话或许可以解答：母死子散，火灵元母身殒，此地五百年不出火灵童子。\n" +
            "\n",
        position: "游记位置：位于游记第五回头目词条【燧先锋】的下方。\n" +
            "具体位置：位于清凉坡，从牛魔王所在的陨砖坑前面一点的位置往右下沿路走一会就会触发燧先锋的BOSS战，继续往下走到头可以看到地上有一滩红色的地块，与地块互动交付四个火灵砂触发BOSS战。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/火灵元母/hlym-position.png',
        difficulty: 4,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。 \n" +
            "\n" +
            "火灵元母每次钻出来都会喷出大量的火球，然后直接定身术上去普攻，先不要放身外身法。\n" +
            "\n" +
            "普攻一套立刻离开火灵元母的身边，躲避一波远程飞弹攻击，冲过去打半套普攻将血量削减四分之一后，火灵元母会召唤出许多小怪然后钻入地面。\n" +
            "\n" +
            "将出现的小怪全部干掉才能再次将火灵元母逼出来，我们正好通过这些小怪积攒棍势，火灵元母钻出地面依然会喷出许多火球，等待火灵元母的动作稳定直接消耗棍势重击。\n" +
            "\n" +
            "然后用第二个定身术继续普攻一套，火灵元母的血量降到一半会再次召唤大量小怪，而且这次火灵元母本人会继续待在地面。\n" +
            "\n" +
            "此时使用法宝辟火罩一边躲避远程攻击，一边优先清理周围的小怪。\n" +
            "\n" +
            "这里不确定是不会钻入地面还是因为BUG，打完所有小怪后火灵元母依然有一个钻出地面的动画以及喷出的火球。\n" +
            "\n" +
            "第二波小怪战斗结束继续使用重击给火灵元母一下，这时再使用身外身法召唤猴子开始群殴火灵元母，如果发现自己血条很危险就直接变身。这波身外身法稳收火灵元母",
        reward: "1个业火晶、1764灵蕴、2个蚕丝、一个寒铁叶和火灵元母的精魄",
    },
    {
        bossId: 48, chapterIndex: 4, name: "兴烘掀/掀烘兴",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/48.png",
        description: "貌美娘子恶丑郎，犄角獠牙配浓妆。\n" +
            "\n" +
            "鸳鸯盾里成双对，滚落红尘把命偿。\n" +
            "\n" +
            "这个故事，是听许司徒说的。\n" +
            "\n" +
            "昔年，许司徒因嫌夫人规矩周正，无甚闺房之乐，便讨了个泼辣貌美的小妾。\n" +
            "\n" +
            "这小妾脾气十分大，对许司徒总是颐指气使，对正房夫人也从不敬畏，若有人拿礼法与她说事，她便将来者一通笑骂，只将人搞得灰头土脸才罢休。偏许司徒觉得这般有趣，便处处让着小妾，对她十分宠爱。\n" +
            "\n" +
            "这日，许司徒回京述职，怕马车遭遇盗匪打劫，雇了一艘大船，将财物家人仆役同时带回京城。夜里，船上忽起打斗之声，原是有个妖魔，摸黑上了他们的船。不久，真就有个头长犄角，獠牙参差的怪人走将进来。他腰上别着一块破布，左手持一口锅形刺盾，右手攥一柄铁鞭，凶恶地盯着众人。\n" +
            "\n" +
            "许司徒和夫人怕得瑟瑟发抖，唯有那小妾昂然不惧，大声呵斥妖魔无礼。那妖魔愣了半晌，忽然叹道：“化作人也如此娇纵，不愧是我们夜叉。”\n" +
            "\n" +
            "小妾变色道：“放你的屁！我原想多玩些时日，如今被你坏了好事。罢了罢了，只好杀个干净，一起走了罢。”这才摇身一变，竟化作与那妖魔一样的容貌身形。\n" +
            "\n" +
            "许司徒这才明白，自己识错了人，竟招了个妖怪到家里。\n" +
            "\n" +
            "他两个正待要杀许司徒众人时，忽闻有个女声响起：“你们夜叉国虽灭了，流落至东土，也不该这般没规矩，不如随我入山修行罢。”他两个还想反抗，就见船头落下个女子，手里持一柄宝扇，尽力一扇，就将他们控在风中不可动弹。\n" +
            "\n" +
            "许司徒经过这场虚惊，从此再也不敢纳妾了。",
        position: "游记位置：位于游记第五回头目词条【云里雾&雾里云】的下方。\n" +
            "\n" +
            "具体位置：位于第五回隐藏地图碧水洞，详细进入方法可参考这篇攻略“点此进入”跟着流程走。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-position.png',
        difficulty: 6,
        experience: "兴烘掀&掀烘兴是一个双人BOSS，与前面的双人BOSS不同，兴烘掀与掀烘兴的攻击方式完全相同，俩人的攻击方式就是用相同的套路轮着攻击我们。\n" +
            "\n" +
            "战斗开始时一定要锁定敌人，此战每切换一个人攻击时锁定视角会自动切换到这个人身上。\n" +
            "\n" +
            "外形上俩人都抱着一个半圆铁壳子，攻击这个铁壳子无法对人物造成伤害，必须要打到后面的人才行。\n" +
            "\n" +
            "开局一定要注意躲避敌人的跳跃攻击，这通常也是敌人切换负责攻击人物时的第一手攻击，然后利用敌人使用此招的后摇攻击一套。\n" +
            "\n" +
            "随后第一个冲来的敌人会直接开始挂机，另一个敌人开始攻击我们，攻击方式是坐到铁壳子里面直接转过来。\n" +
            "\n" +
            "敌人的正常攻击就是使用手中的剑与铁壳子挥砍砸地，攻击第二个敌人一套会再次切人，下一个人不是直接砸过来就是转过来，都是可以预测的，躲避难度不大。\n" +
            "\n" +
            "前半管血就是三人转，切人、躲技能打一套再切人，躲技能打一套，将敌人的血量都消磨到一半时触发敌人的特殊攻击。\n" +
            "\n" +
            "俩人的铁壳子合二为一，变成一个完整的铁球攻击我们，这招前半段非常好躲，难点在后半段的连续砸击。\n" +
            "\n" +
            "铁球会飞到半空中连续砸地5次，每次砸地还能引起整个地面的爆炸，需要通过砸地的时机翻滚躲避。\n" +
            "\n" +
            "半场特殊攻击过后，敌人也会在普通的连击中穿插这种砸地攻击，当出现这种砸地攻击的时候另一个敌人会蜷缩在铁壳子里面，也是提前预测的一部分。\n" +
            "\n" +
            "后面依然是俩人之前那个套路，不停的切人穿插攻击，一个一个敌人打就行。\n" +
            "\n",
        reward: "一个金趁心、一个镔铁沙",
        bossTrick: [
            {
                name: "跳摔1",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick1.gif"
            },
            {
                name: "跳摔2",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick2.gif"
            },
            {
                name: "大跳摔连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick3.gif"
            },
            {
                name: "二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick4.gif"
            },
            {
                name: "火剑三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick5.gif"
            },
            {
                name: "碰碰车",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick6.gif"
            },
            {
                name: "扔剑",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick7.gif"
            },
            {
                name: "铁锅二连转",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick8.gif"
            },
            {
                name: "铁锅砸地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/兴烘掀掀烘兴/xhxxhx-trick9.gif"
            },
        ]
    },
    {
        bossId: 49, chapterIndex: 4, name: "碧水金睛兽",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/49.png",
        description: "形似祥瑞绛紫肤，威威凛凛势如虎。\n" +
            "\n" +
            "冰来火去难敌对，热山寒地凄凉路。\n" +
            "\n" +
            "牛魔王坐在山头，精疲力竭，动弹不得。\n" +
            "\n" +
            "他眼见璧水金睛兽瘸瘸拐拐跑离了山场，本想唤两声，再想想，算了。\n" +
            "\n" +
            "骑得最久的坐骑，被自己无情地撵走，头也不回。使得最久的兵器，被自己儿子夺去，不知扔到了哪里。\n" +
            "\n" +
            "牛魔王看了一眼身。上的血痕，旧伤未愈，又添新伤，那臭小子的火尖枪又长进了。\n" +
            "\n" +
            "起先那孩子知了身世，日日嚷着要报仇，牛魔王怕他闯出杀身之祸，锁了他一阵，派了金睛兽看管。不料红孩儿竞逃了出来，金睛兽发觉后一路追咬，与他缠斗许久。待牛魔王赶到时，红孩儿已被它扑在爪下，奄奄一息。\n" +
            "\n" +
            "只怪这畜生不该下那么狠的手，逼他不得不为了救儿子，重重伤了它，这有什么错？\n" +
            "\n" +
            "亏得下手时收住了，让这不知轻重的畜生捡回一条命。可谁知那鬼娃儿的伤，却是装的。\n" +
            "\n" +
            "好了，现下，换儿子囚了老子。报应原来从不在天，只在人与人的寸心之间。\n" +
            "\n" +
            "“想救你的，被你打跑了;想杀你的，你偏偏要救？”\n" +
            "\n" +
            "一个熟悉的声音，从深处幽幽传来。\n" +
            "\n" +
            "是啊，你救我，我救你，可谁来救我们呢？牛魔王的头，又开始痛了。",
        position: "游记位置：位于游记第五回妖王词条【阴阳鱼】的下方。\n" +
            "\n" +
            "具体位置：位于碧水洞的终点，进入碧水洞必定碰到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧水金睛兽/bsjjs-position.png',
        difficulty: 5,
        experience: "棍法点到四棍势，然后棍法选择劈棍与戳棍（战斗时切换），奇术选择安身法，其他随意选择。\n" +
            "\n" +
            "璧水金睛兽一共有三种形态，第一种形态就是玩家一开始遇到的那样，第一场战斗时前方下图画圈所示的冰缝位置，一直躲避敌人的攻击。\n" +
            "\n" +
            "等待璧水金睛兽吐火时即可烧化此处的冰，玩家这时就可以通过冰缝走到下一个区域，然后璧水金睛兽也会追到下一个区域进入第二形态；下面先介绍第一形态的技能。\n" +
            "\n" +
            "璧水金睛兽主要攻击方式是火焰（冰）吐息与前手臂与身体的组合攻击，通常前手臂的攻击都有明显前摇，璧水金睛兽的攻击欲望很高，但强韧一般，因此这场战斗玩家必须要处于主动出招的地位。\n" +
            "\n" +
            "否则会被璧水金睛兽无限压制而降低容错率，而且璧水金睛兽的血条很厚，通常开局定身术+身外身法组合无法对璧水金睛兽造成有效伤害，因此还是以躲避+普攻攒重击的流程为主，底下还会介绍一种逃课方法。\n" +
            "\n" +
            "游民星空\n" +
            "\n" +
            "来到第二个战斗场地可以看到第二次与璧水金睛兽战斗场地的前方被一团火挡住，而璧水金睛兽的第二心态是冰形态的，我们要模仿第一形态那样站在下图画圈的位置，一直躲避璧水金睛兽的技能，等待一个冰形态的吐息浇灭火焰继续沿路走到达下一个场景触发第三形态。\n" +
            "\n" +
            "第二形态璧水金睛兽的速度明显要比第一形态慢很多，吐息也从吐火变成了吐冰，依然是通过翻滚躲避。\n" +
            "\n" +
            "除了吐息之外依然是通过前手臂进行组合攻击，前摇明显而且第二形态璧水金睛兽身上没有了火焰特效覆盖，所以动作也会清楚很多。\n" +
            "\n" +
            "走到最后的场景再次与璧水金睛兽见面，而璧水金睛兽也会转回火形态，攻击模式与初始形态没有差别。\n" +
            "\n" +
            "逃课打法就是回到第一次遇到璧水金睛兽的场地，先切换劈棍，然后跳下前方楼梯一点一点往前走，当BOSS的血条露出来就往后面楼梯走，然后点击跳跃键与重击键组合一个二连跳就能跳回楼梯上面。\n" +
            "\n" +
            "然后在楼梯上方切换戳棍就一直重击蓄力戳戳戳就完了，每次戳玩记得往回走一点，不要把自己戳下去了，璧水金睛兽无法碰到玩家。",
        reward: "大力铁角,兽棍・金睛,法宝芭蕉扇",
    },
    {
        bossId: 50, chapterIndex: 4, name: "红孩儿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/50.png",
        description: "身若涂朱或有才，暴眼晃亮甚张乖。\n" +
            "\n" +
            "炼了真火未炼心，灵山只在寸心开。\n" +
            "\n" +
            "许多年来，红孩儿一直做着同一个垂梦。小时候，他与母亲分享过这个噩梦。\n" +
            "\n" +
            "“母亲，好多人，他们打打杀杀，都是冲着我来！”\n" +
            "\n" +
            "“好孩子，等你再睡着，明日便忘了。”\n" +
            "\n" +
            "但他很振奋：“可我很厉害，我打败了和山一样高的和尚，会飞的怪鸟，吐火的神……我一点也不怕他们。\n" +
            "\n" +
            "“我儿真有本事。”\n" +
            "\n" +
            "他继续说：“我梦见我长成了大人，头上生出很长的角，手上生出很长的刺，一次能打杀好大一片坏人，但他们太多了，我根本杀不完，后来，又来了一些我没见过的怪人，他们静静地挂在天上，不下来，就在天上默默地看着我。”\n" +
            "\n" +
            "母亲将他拦入怀里：“若真有那一日，父亲母亲会与你一道去天上，杀干净他们。”\n" +
            "\n" +
            "“我们会死吗？”\n" +
            "\n" +
            "“……”\n" +
            "\n" +
            "“我梦见我被他们杀死了，变成一朵红莲花，母亲摘下了这朵莲花，我就成了母亲的孩子。”\n" +
            "\n" +
            "“……”\n" +
            "\n" +
            "他继续滔滔不绝：“我若是死了，母亲还愿意再生养我一次吗？”\n" +
            "\n" +
            "“不许再说这种话！”",
        position: "游记位置：位于游记第五回妖王词条【璧水金睛兽】的下方。\n" +
            "\n" +
            "具体位置：主线流程必定解锁。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/红孩儿/hhe-position.png',
        difficulty: 4,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。 \n" +
            "\n" +
            "加点推荐先点全身外身法与变形，开局直接定身术+身外身法，稳定干半管。\n" +
            "\n" +
            "红孩儿在血量掉一半时进入第二阶段，飞天并召唤出无数分身。\n" +
            "\n" +
            "这里建议直接变形，通过额外血条渡过分身的攻击，躲避分身的攻击需要有一定的节奏感，看到红孩儿飞天直接往外围走，直到能看到红孩儿的所有分身。\n" +
            "\n" +
            "每次飞过来一个分身先往后走两秒，然后往前一跳，再往后走两秒往前一跳，保持节奏躲过分身的攻击。\n" +
            "\n" +
            "红孩儿落地且变形结束直接开辟火罩上去和红孩儿硬刚，这里我们还是满状态，通过辟火罩的加成能够最大限度的避免火焰异常伤害。\n" +
            "\n" +
            "这里也不用关心剩余法力多少，定身术或聚形散气也直接堆上去收尾。",
        reward: "《金刚伏魔经》残页、厌火套装",
    },

    // ================== 花果山 (51-62) ==================
    {
        bossId: 51, chapterIndex: 5, name: "王灵官",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/51.png",
        description: "都天纠察大灵官，擅骑火轮镇天关。\n" +
            "\n" +
            "秉公不阿无言语，钢鞭一动心胆战。\n" +
            "\n" +
            "天庭有个神佛共知之事，那便是太乙雷声应化尊，又名王灵官者，乃是玉帝最忠诚的纠察，若被他盯上，定是灭顶之灾。天蓬元帅，就是前车之鉴。那般显耀新贵，经王灵官告上一状，说没就没了。\n" +
            "\n" +
            "起初，王灵官并非如今这般怪模样，虽无天蓬那般俊美，但至少有头有脸。后来玉帝嘉许灵官秉公执法，竟将自己的右手化生在了他的头上，以示王灵官至，犹如玉帝亲临。\n" +
            "\n" +
            "神仙们若遇见王灵官，都会老实行礼，随即远离。更不敢在灵官前高谈阔论，深恐被捉了什么错处去。\n" +
            "\n" +
            "王灵官虽无可结交之人，但那天宫里有个老神仙，辈分极高，除了玉帝，他倒是能跟着这位神仙有些往来。\n" +
            "\n" +
            "有些神仙说，王灵官既然乐意承担如此要职，活该忍受这份孤寂，一利必生一弊。另一些说，王灵官正是不愿与人交往，才领了这份不讨喜的差事，实则如鱼得水，乐在其中。大家议论纷纷，莫衷一是，至于王灵官究竟怎么想，却无人得知。",
        position: "游记位置：王灵官是第六回的额外BOSS，游记位于第六回人物栏【牛魔王】的下方。\n" +
            "\n" +
            "具体位置：位于土地庙青嶂道旁边，主线必定遇到。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/王灵官/wlg-position.png',
        difficulty: 8,
        experience: "棍法选择劈棍，点到四棍势；定身术、聚形散气、身外身法点满，法宝带芭蕉扇，变身带石头人，化身技带幽魂。\n" +
            "\n" +
            "往王灵官位置跑的时候直接蓄力，开打后王灵官百分百会直接冲到玩家旁边，这时直接一个重击敲上去换波血。\n" +
            "\n" +
            "我们利用这段重击硬直原地使用身外身法，然后再使用定身术开始群殴王灵官，快速积攒三层棍势重击敌人。\n" +
            "\n" +
            "第一次重击后王灵官百分百会飞天攻击，在他飞天俯冲下来的时候直接使用聚形散气，让影子吸引注意力然后我们继续蓄力棍势，在王灵官落地后直接上去重击，后面立马接化身技幽魂打硬直和伤害，这么一套下来王灵官的血条基本一半。\n" +
            "\n" +
            "后面会进入王灵官的攻击节奏，对自己身法有信心的可以尝试正常躲避穿插攻击，保持自己状态消磨敌人血量，以换得后面更多容错率，对自己身法不自信的直接变身石头人将王灵官的血量磨到一半以下。\n" +
            "\n" +
            "变身结束王灵官进入单轮车时间，我们直接使用聚形散气吸引仇恨，然后隐身蓄力三棍势找准时机敲上去造成硬直，趁机普攻一套。\n" +
            "\n" +
            "这里开始后退躲一波王灵官的单轮车技能，提前开始蓄力，王灵官用完这套技能会飞到天上，稍等片刻就会落在场地中间，这时我们直接一个三棍势重击敲上去。\n" +
            "\n" +
            "立马接第二个定身术一直普攻到王灵官进入第三阶段的强制过场。\n" +
            "\n" +
            "后面就简单了，第三阶段一开始直接用芭蕉扇控住，上去普攻就行了，王灵官是需要背板的BOSS，难度很高。",
        reward: "法术【筋斗云】",
    },
    {
        bossId: 52, chapterIndex: 5, name: "跳浪蛟",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/52.png",
        description: "钢爪如翠口内红，呼气吹雨啸成风。\n" +
            "\n" +
            "倚水跳浪白练起，生死皆在波涛中。\n" +
            "\n" +
            "古籍载，蛟乃水虫之神者也，能率鱼飞。乘于水，则神立，失于水，则神废。\n" +
            "\n" +
            "却说，陈家村有个渔民，在孙行者拆毁灵感庙时，曾听他说了个蛟能号令河中之鱼的故事。那渔民心念一动，也想去学些蛟的本事，从此便能让鱼儿自己跳入网中，省下大家不少劳力。\n" +
            "\n" +
            "一次，他外出捕鱼，天空乌云密布，未多时，便雨疾风骤，恶浪滚滚。他的渔船被浪头掀翻，一下没了踪影。\n" +
            "\n" +
            "却说他的确有些机缘，沉到河底时，正巧遇到蛟神巡河。蛟神将他救起，他苦苦哀求，要那蛟神传他些本事。蛟神慈心一动，真就教了他些水族的修炼之法。\n" +
            "\n" +
            "其后数日，渔民都未归来，大家都道他已淹死在了浪中，为他买了口薄棺，预备立个衣冠冢。\n" +
            "\n" +
            "出殡那日，暴雨倾盆，河中钻出一条大蛟，长尾一扫，带着许多鱼儿窜上岸来。众人赶至岸边，就见那蛟化成渔民的模样走出河来，大家又惊又喜。\n" +
            "\n" +
            "岂料，那渔民归家后未久，只觉神魂倦怠，将其放回水中，他又立时精神起来。大家这才知道，他已无法待在岸上生活。\n" +
            "\n" +
            "果然，又过几日，渔民跃入浪中，随水而去，没人再见过他。",
        position: "游记位置：位于游记第六回头目词条【水木兽】的下方。\n" +
            "\n" +
            "具体位置：在我们刚打败王灵官获得筋斗云的时候，直接使用筋斗云跳到正下方的小河，落地就能触发与跳浪蛟的BOSS战。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/跳浪蛟/tlj-position.png',
        difficulty: 2,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "跳浪蛟非常好打，触发BOSS战直接原地定身术+身外身法，跟小猴子一起打一套普攻加一个三层棍势重击直接半血。\n" +
            "\n" +
            "继续跟着小猴子打，攒第二次三层棍势，等待小猴子都消失后直接敲上去造成硬直，然后通过聚形散气躲避伤害，破隐一击打硬直，这时第二个定身术也好了，直接干掉即可。",
        reward: "珍玩【辟水珠】、灵蕴2004、寒铁叶1、细金线1、玲珑内丹1",
    },
    {
        bossId: 53, chapterIndex: 5, name: "水木兽",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/53.png",
        description: "祸兮福兮本难料，怨天怨地自难逃。\n" +
            "\n" +
            "不如淡泊图快乐，乘风破浪定有朝。\n" +
            "\n" +
            "昔年，有棵楠木长了千年，正是枝繁叶茂，郁郁苍苍，一朝天灾，将它被连根拔起，掀翻至河中。\n" +
            "\n" +
            "因它枝干巨大，十分沉重，落入又窄又小的河湾里，河水无法载起它，它便只能搁浅在此。数日后，岸上的村民便打算将其拖走，拿去制成木料。那楠木却突然发出声响，扑腾起来，化作一只四足的木头巨兽，潜伏在水中。\n" +
            "\n" +
            "此后，每有心怀不轨的工匠靠近，都会被它喷入水中，吓得三尸神炸，惊魂难定。但若有孩童来河湾里游水戏耍，它非但不吓唬他们，还偶用木枝将溺水者救上岸去。久而久之，村民也习惯了它的存在，唤它作水木兽。\n" +
            "\n" +
            "某年，有个游方的道士途经此地，听人提及水木兽之事，便在岸旁对它大声道：“你困在此间岂不无聊，那外头多有你的同伴哩，快快起行罢。”\n" +
            "\n" +
            "这水木兽丝毫不为所动，如此又过了两年。一次，大雨连绵了数日，河水越长越高，水木兽不住冲撞河岸，将村民全都吓得躲去了邻村。是夜，上游河堤决口，将下游的村庄冲毁了。待大水退去，村民回到村庄，那河湾里的水木兽也不见了踪影。",
        position: "游记位置：位于游记第六回头目词条【毒统领】的下方。\n" +
            "\n" +
            "具体位置：通过地图查看详细位置。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/水木兽/sms-position.png',
        difficulty: 3,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "水木兽的攻击方式很单一，基本就是用头顶、用嘴咬，用莫名的法师驱动水波攻击。\n" +
            "\n" +
            "无论是BOSS血条还是精英怪血条的水木兽都是这一套，打的时候建议待在水木兽的前臂两侧，在这里很多攻击都伤害不到我们。\n" +
            "\n" +
            "最大的问题是水木兽很擅长拉开与玩家之间的距离，通过合理使用聚形散气来适中贴近水木兽的两侧，通过走位一直待在攻击的死角普攻+重击。\n" +
            "\n" +
            "但需要注意水木兽两边一直在跳动的水面，玩家一旦踏入这些区域就会被严重减速，露出巨大破绽，出现这种情况就拉远距离等待水木兽主动追上来就行了。\n" +
            "\n" +
            "除此之外血条降到一半时水木兽会开始潜水，然后从水面突然冲出攻击玩家，通过观察水面的波纹来躲避，后面继续重复上述操作即可。",
        reward: "因为水木兽数量众多，此处不再概述。",
    },
    {
        bossId: 54, chapterIndex: 5, name: "凤翅将军",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/54.png",
        description: "火翎额上簪，山中扑飞乱。\n" +
            "\n" +
            "善争者不争，善战者不战。\n" +
            "\n" +
            "灵明石猴，天性聪慧，登界游方之中，学人礼，学人话，又在灵台方寸山通了法性。今次不表命里的天赋，单说他后来悟彻的经历。\n" +
            "\n" +
            "他在鹰愁涧负气出走，老龙王与他讲了一番道理，便又回去认错，从不专断独行，听得进善言。\n" +
            "\n" +
            "他与妖怪称兄道弟，与神仙们逗趣嬉闹，与菩萨调嘴玩笑，谁都喜欢他，谁都肯帮他。知情识理，懂得进退分寸。\n" +
            "\n" +
            "他遇火呼风，唤雨请龙，打探变小妖，受困借法宝。遇到难解的局面，请高人，搬救兵，外力无所不用，鲜少强攻，从不硬扛。\n" +
            "\n" +
            "这凤翅将军，头生多目，知己知彼，一路跳脱不停，强敌能避则避，倒有那猴子的几分乖觉。不愧是戴在猴头上的冠子，最懂他那些活络心思。\n" +
            "\n",
        position: "游记位置：位于游记第六回头目词条【步云鹿】的下方。\n" +
            "\n" +
            "具体位置：凤翅将军会在地图中的四个位置重复跳跃。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/凤翅将军/fcjj-position.png',
        difficulty: 3,
        experience: "加点只需要将“气海充盈”点满，然后法宝携带辟火罩就行。\n" +
            "\n" +
            "在地图上驾驭筋斗云寻找凤翅将军的位置，看到凤翅将军身体后直接飞到凤翅将军的身上落地。\n" +
            "\n" +
            "根据出现的“提示按键”抓住凤翅将军触须，此时凤翅将军会开始飞跃，我们需要按住按键不松手。\n" +
            "\n" +
            "重复了几次跳跃之后可以看到提示按键再次变成了光点，这时我们打开法宝辟火罩，继续根据按键提示抓住触须，动画结束后成功击败凤翅将军。",
        reward: "【大圣套装】凤翅紫金冠",
    },
    {
        bossId: 55, chapterIndex: 5, name: "金甲犀",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/55.png",
        description: "霹雳为角金做甲，奔走驰迈动地摇。\n" +
            "\n" +
            "身硬何怕诸邪近，初心不折永称豪。\n" +
            "\n" +
            "世人皆知，孙悟空在八卦炉中，经神火锻炼，炼做个金子心肝，银子肺腑，铜头铁背。但世人或许不知，那刀枪不入的身体，受伤也不免会疼。\n" +
            "\n" +
            "他在五行山下被压了五百年，兄弟们未尝来看过他，只有山神土地喂些铁丸铜汁聊以充饥；在黄风岭被三昧神风迷了眼；在平顶山入了金角银角能化人的葫芦；在枯松涧被三昧真火烧得背过气去；在车迟国砍过头；在琵琶洞被蝎子精蛰了脑袋；在小西天被关入金铙；在黄花观被摄在金光罩内；在比丘国剜了心；更不消说，那一路上，被念了十几次紧箍咒，回回把头勒成个亚腰葫芦才罢。\n" +
            "\n" +
            "伤身苦磨，劳心劳力，也只有他，才能领着众人到那灵山脚下。若说这金甲犀是大圣那件黄金甲所化，倒是更像大圣那犟脾气，从来不认输。即便是把角折了，也没断了上阵的勇气，挺一挺，又能战了哩。",
        position: "游记位置：位于游记第六回头目词条【浪波波】的下方。\n" +
            "\n" +
            "具体位置：金甲犀就位于浪波波右下角的一个空地上。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/金甲犀/jjx-position.png',
        difficulty: 4,
        experience: "奇术加一个禁字法就行，棍法劈棍或立棍加到四棍势，其他的都点到根基加属性。\n" +
            "\n" +
            "金甲犀的弱点就是前面发黄光的角，开局直接使用禁字法并蓄力三棍势找准时机直接对着角敲下去，一棒就能把角敲断让其陷入弱势状态。\n" +
            "\n" +
            "看到金甲犀断角倒地后一边后退一边蓄力，找准时机继续敲三棍势重击，打金甲犀不用在旁边普攻打来打去，就一直远离犀牛蓄力，再靠近找机会就行了。\n" +
            "\n" +
            "金甲犀每过一会都能生成一个新的角出来，这时我们就故技重施继续重棍打断，重复这个流程就能轻松将其击败。\n" +
            "\n" +
            "金甲犀只有头上有角时能够使用一些远程闪电攻击或推土攻击，断角状态只能近战，金甲犀比较有威胁的招式是不断冲刺用头顶玩家，冲刺次数较多，掌握好节奏就能躲避，其他招式威胁不大，只要稳健的重复上述流程即可轻松将其击败。",
        reward: "【大圣套装】锁子黄金甲",
    },
    {
        bossId: 56, chapterIndex: 5, name: "浪波波",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/56.png",
        description: "投身仙山随缘宿，因势运化作磐石。\n" +
            "\n" +
            "着意寻真不知远，坚心琢磨是修持。\n" +
            "\n" +
            "昔年，有个道士，他以捉妖为己任，因一次偶遇蛙精，他走遍天涯海角，意欲追寻他们的踪迹。这一路，他得了许多机缘，如今已成了个本事了得的道士，也感受苍生各有生存之道，不再沉迷于捉妖，反倒起好奇他们的生活来。\n" +
            "\n" +
            "这日，他途经花果山，见此处风景极佳，山青水秀，便将葫芦中陪他一路同行的小活师，放回了山涧之中。岂料，他刚放走那小活师，就见落下几道惊雷，电光散去，正是几个披甲执锐的天兵。\n" +
            "\n" +
            "道士以为自己闯了什么祸事，正要告罪一二，天兵们已朝他乱砍乱劈而来，他急忙抽剑招架，终是难敌众人围攻，渐渐露出颓势来。\n" +
            "\n" +
            "正是要伤身遭难之际，从那岸边蹦来只大石蛙，非但不怕那刀光箭雨，连那天将唤起的雷电也丝毫不惧。石蛙助道士将天兵打退，道士走至岸边，才知是自己放生的小活师引来了石蛙相救，心中十分感激。\n" +
            "\n" +
            "自那以后，道士也不再以成仙为念，反倒时常去拜访蛙精，向他们讨要些小活师，散到各个钟灵毓秀的山川之间，世人都称其为蛙仙人。",
        position: "游记位置：位于游记第六回头目词条【跳浪蛟】的下方。\n" +
            "\n" +
            "具体位置：通过地图查看具体位置。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/浪波波/lbb-position.png',
        difficulty: 3,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，法宝携带芭蕉扇，变身选择石头人，其他加点可随自身喜好来。\n" +
            "\n" +
            "BOSS出现后可以看到浪波波有两种皮肤两种形态，红色皮肤就正常的用舌头与腿攻击，黄色形态攻击欲望增加，能够使用大范围的土形态法术。\n" +
            "\n" +
            "战斗开始直接用定身术定住浪波波，先用普攻打一套，然后直接聚形散气攒三层棍势重击，利用重击造成的硬直再普攻一套，这里换血也无所谓。\n" +
            "\n" +
            "完成上述操作浪波波已经被我们磨了三分之一的血，这时它会跳远然后变身黄色皮肤第二形态，这里直接使用芭蕉扇，芭蕉扇能够直接强行将浪波波换回红色皮肤形态。\n" +
            "\n" +
            "趁浪波波被困住使用身外身法开始群殴浪波波，如果血量不健康就在旁边OB积攒棍势趁机重击。\n" +
            "\n" +
            "当浪波波的血条只剩三分之一时，它会再次进入第二形态，这时我们直接变成石头人，开始和它磨，等待它再次破防成为红皮肤。\n" +
            "\n" +
            "这时定身术和聚形散气都能使用，组合起来收尾即可。",
        reward: "珍玩【仙胞石片】、灵蕴2739、寒铁叶2、细金线1、小活师1",
    },
    {
        bossId: 57, chapterIndex: 5, name: "步云鹿",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/57.png",
        description: "风高傲骨远，云低腐肉贱。\n" +
            "\n" +
            "止步青天上，放荡尘浊间。\n" +
            "\n" +
            "孙悟空在斜月三星洞学艺时，菩提祖师不仅授了秘诀，教了地煞数的变化，还传了“筋斗云”。自此，悟空躯体坚牢，身法灵动。但在众人面前逞能显耀之时，祖师算出了他没个坐性，定生不良。\n" +
            "\n" +
            "神仙都说，做猴王时的孙悟空，是他最顽劣凶残的时候。但那时的他，除了与天庭争斗，鲜少打杀其他生灵。倒是后来拜了师父，成了行者，有了方向，才又多出许多霹雳手段。偷抢拐骗，杀人放火，毁山灭洞，通通不在话下。\n" +
            "\n" +
            "说这步云鹿，是孙悟空的步云履所化，能看出他无拘无束的灵动性情，却也暗藏着他心中的那份凶狂。一旦落了下风，本相便显露无遗，再也装不得那份逍遥矣。",
        position: "游记位置：位于游记第六回头目词条【金甲犀】的下方。\n" +
            "\n" +
            "具体位置：花果山有一段非常显眼的枫叶林，步云鹿就位于此处。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/步云鹿/byl-position.png',
        difficulty: 5,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "法宝一定要带定风珠，精魄带幽魂，变身带广智。\n" +
            "\n" +
            "步云鹿有两个形态，两管血条，一阶段能使用大范围的冰封异常攻击和龙卷风攻击，二阶段能够则毒素异常攻击，但猪八戒也会在第二阶段参战。\n" +
            "\n" +
            "触发战斗直接聚形散气吸引敌人仇恨，然后绕到鹿屁股的位置蓄力三棍势重击敲下去，鹿会直接倒地，这时上去打一套普攻。\n" +
            "\n" +
            "在鹿起身立刻接一个定身术继续普攻一套，完事直接被强制吹离战场，鹿会召唤出大量的龙卷风，使用定风珠驱散龙卷风立刻接一个聚形散气吸引鹿的仇恨，我们继续旁边蓄力三棍势找准时机重击再接幽魂的头槌。\n" +
            "\n" +
            "这时鹿会召唤第二波龙卷风，我们直接变广智一直贴着鹿打，不用攒闪避重击，一直用重击“赶月”追着鹿打出一波火焰异常伤害就行。\n" +
            "\n" +
            "变回来聚形散气与定身术基本都好了，使用聚形散气吸引鹿的仇恨，在旁边蓄力三棍势重击把鹿直接打倒地，补一套普攻再接一个定身术即可击败步云鹿的第一阶段。\n" +
            "\n" +
            "虽然第一阶段我们已经将蓝条耗光，鹿的第二阶段难度远远要比第一阶段低，而且有猪八戒的参战，加上我们第一阶段主要使用蓝条打控制，血瓶的状态很好，这阶段我们全程在旁边OB蓄力重击就行。\n" +
            "\n" +
            "如果重击使鹿倒地就补一套普攻，正常就直接跑开，变身的CD在这个时机也基本快好了，后面随机应变就行。",
        reward: "【大圣套装】藕丝步云履",
    },
    {
        bossId: 58, chapterIndex: 5, name: "碧臂螂",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/58.png",
        description: "红眼碧玉妆，舞刀逞凶狂。\n" +
            "\n" +
            "道义若来迟，铁腕不可当。\n" +
            "\n" +
            "唐僧多劝善，悟空多惩恶。\n" +
            "\n" +
            "在奎木狼处，他听闻了百花羞所受的苦楚，又见她为了情分和孩子留恋不舍，索性让八戒将那两个妖儿从天上掼下去，摔成了两个肉坨子。\n" +
            "\n" +
            "在杨老汉家，他听闻了老夫妻不肖儿子的行径，又见他们为了香火纵容他为非作歹，哪怕杨老汉事先求情，他也索性将那儿子的头割了下来。\n" +
            "\n" +
            "凶匪恶徒，他天性不肯姑息；鬼魅妖邪，他乐得斩草除根。西行路上的累累血债，虽各有缘故，却多半都要算在猴子头上。\n" +
            "\n" +
            "世人皆知另外三件披挂，却不知这螳螂是大圣的手甲化生。想来这手甲，必是传承了大圣不为人知的狠辣手段，就连捉弄八戒这件事，也是如出一辙哩。\n" +
            "\n",
        position: "游记位置：位于游记第六回头目词条【凤翅将军】的下方。\n" +
            "\n" +
            "具体位置：将第六回位于前页的BOSS全部击败，然后回到捕螂汀土地庙的位置触发BOSS战。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧臂螂/bbl-position.png',
        difficulty: 5,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "开局碧臂螂会举起前爪直接向我们砸过来，前摇很明显，躲避后跟一套普攻。\n" +
            "\n" +
            "碧臂螂缓过来开始移动时使用聚形散气吸引仇恨，旁边蓄力三棍势直接重击。\n" +
            "\n" +
            "重击查看碧臂螂的状态，如果破防跟一套普攻，如果直接起身就接定身术，依然是跟一套普攻，最后找机会将棍势重击打出去进入过场动画。\n" +
            "\n" +
            "过场动画结束直接变身，用额外血条消耗敌人血量，变回来寻找时机使用法宝芭蕉扇与身外身法开始群殴碧臂螂。\n" +
            "\n" +
            "如果之前有失误在身外身法结束后碧臂螂没死，那聚形散气与定身术的CD也快好了，用这俩组合技收个尾即可。\n" +
            "\n",
        reward: "【大圣套装】点翠飞龙釺",
        bossTrick: [
            {
                name: "单次大范围斩击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧臂螂/bbl-trick1.gif"
            },
            {
                name: "红眼连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧臂螂/bbl-trick2.gif"
            },
            {
                name: "红眼四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧臂螂/bbl-trick3.gif"
            },
            {
                name: "红眼七连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧臂螂/bbl-trick4.gif"
            },
            {
                name: "突刺连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧臂螂/bbl-trick5.gif"
            },
            {
                name: "旋转连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧臂螂/bbl-trick6.gif"
            },
            {
                name: "重影四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/碧臂螂/bbl-trick7.gif"
            },
        ]
    },
    {
        bossId: 59, chapterIndex: 5, name: "大石敢当",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/59.png",
        description: "巧石山峰化灵胎，二心未剪智难开。\n" +
            "\n" +
            "擎天撼地真容易，机关识破运才来。\n" +
            "\n" +
            "却说，那花果山中自灵明石猴诞生之后，所遗仙石又经千年日精月华的滋养，自修自练竟化成个山一般大的精怪。\n" +
            "\n" +
            "这仙石原有无限神力，无奈育化未久，不知何人在他身上，种下了一颗肉佛头。自这肉佛头生出，便无时无刻不汲取仙石体内的灵蕴。\n" +
            "\n" +
            "仙石神魂倦怠，只得伏入地里，吸存天真地秀来补足自身，时日一久，就将那周遭山间的灵蕴俱吸了个干净，导致花残叶凋，生灵皆不可活。\n" +
            "\n" +
            "而那肉佛头自得了滋养，反成了这石身的主人一般，精神饱足，竟在体内孕出识蕴来。若能待它补足其他四蕴，不知会将这仙石精变作个什么怪物哩。\n" +
            "\n" +
            "可惜这块天地孕育的仙石，为这不劳而获的肉佛头做了嫁衣。或许这就是世人常说的，时也，命也。",
        position: "游记位置：位于第六回妖王词条第一个。\n" +
            "具体位置：回到击败头目石子的位置，往深处走，看到右侧的开口直接进去沿路走到头就能触发大石敢当的战斗。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大石敢当/dsgd-position.png',
        difficulty: 3,
        experience: "大头敢当是机制杀，没有流派需求，将棍法点到四棍势就行。\n" +
            "\n" +
            "看到大头敢当不要直接靠近，在稍远一点的地方落地，然后靠近大头敢当触发战斗再立刻往外围跑。\n" +
            "\n" +
            "大头敢当的攻击基本就是用两个手臂横扫或砸地通过冲击波攻击，当我们离的够远时大头敢当的手臂碰不到我们，只需要跳起来躲避冲击波攻击就行。\n" +
            "\n" +
            "连续的冲击波可以通过跳跃+劈棍重击的方式实现二段跳。\n" +
            "\n" +
            "此期间我们不需要靠近攻击大头敢当，一直躲技能就行，在大头敢当进行了一波攻击会自己倒地；这时我们需要跑到大石敢当身旁攻击这种发光的蓝色石头，每破坏一个石头都能让大石敢当掉一大波血。\n" +
            "\n" +
            "看到大石敢当起身继续往地图外围跑，等待下一次倒地，重复这个过程直到敌人血条见底。\n" +
            "\n" +
            "在大石敢当的血量只剩一丝血时会突然狂暴连续砸地四次，造成四次冲击波伤害，一定要注意躲避。\n" +
            "\n" +
            "砸完地直接爬到大石敢当的右手触发剧情即可完成这个BOSS战。",
        reward: "识蕴",
    },
    {
        bossId: 60, chapterIndex: 5, name: "石子",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/60.png",
        description: "小石子，傍山居，出深岭，有奇遇。\n" +
            "\n" +
            "身藏奇能亮晶莹，天真地秀怀内聚。\n" +
            "\n" +
            "天律载，山神不可擅离保生的山场，无故出走，一经发现，革职拿问。\n" +
            "\n" +
            "昔年，石子尚未及冠，无法接替山神一职，石母不能踏出黄风岭，只好让他独自外出寻找石父。因担心儿子在外遭难逢险，石母便将体内石之精魄的神力，分了大半与他，这才放心让他远行。\n" +
            "\n" +
            "无奈，石子出门，就与父亲走反了方向。父亲朝西，他却朝东，一直走到了花果山。\n" +
            "\n" +
            "他原每逢一座山，都会进去寻寻父亲的踪迹，若未能找得，便起行向下一座山去。岂料，花果山中有许多好玩的，好看的，让他一直留在了山中。\n" +
            "\n" +
            "若问他最喜欢何物，当属那只名唤凤翅将军的大蟋蟀。他日日坐在山头，看那蟋蟀冲天而跃，又撼地而落，每每开心就拍起巴掌助兴。日子一久，竟将那寻父之事，抛到脑后去了。",
        position: "游记位置：位于游记第六回头目词条的第一位。\n" +
            "\n" +
            "具体位置：打败王灵官即可获得筋斗云，驾驭筋斗云往地图中间飞就能看到石子坐在一个悬崖边上。",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/石子/sz-position.png',
        difficulty: 3,
        experience: "棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来。\n" +
            "\n" +
            "触发战斗直接使用身外身法+定身术开始群殴，石子的攻击范围不小，伤害也很高，身外身法最多打掉三分之一血。\n" +
            "\n" +
            "后面就专注于躲技能，石子放技能放多之后会自己倒地，这时我们再上去打一套；石子起身后使用第二次定身术再打一套，继续躲技能等下一个倒地。\n" +
            "\n" +
            "打石子要注意的不是多主动的打输出，而是保证自己状态躲技能等待石子自己倒地输出。",
        reward: "2008灵蕴与一个寒铁叶",
    },
    {
        bossId: 61, chapterIndex: 5, name: "大圣残躯",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/61.png",
        description: "三阳交泰产群生，仙石胞含日月精。\n" +
            "\n" +
            "借卵化猴完大道，假他名姓配丹成。\n" +
            "\n" +
            "内观不识因无相，外合明知作有形。\n" +
            "\n" +
            "历代人人皆属此，称王称圣任纵横。\n" +
            "\n" +
            "杯盘狼藉，酒过三巡。对坐的两人，都已大醉。\n" +
            "\n" +
            "“八戒，这斗战胜佛我不做了。谁爱当，就给谁当去。”猴子血气上涌，不知是真醉还是假醉。\n" +
            "\n" +
            "八戒直肠道：“哥呵，我们如今得了正果，无拘无束，大口喝酒，这般美事，应当高兴才对。\n" +
            "\n" +
            "悟空冷笑了几声，道：“是是是，用个佛位换个箍儿，想来还是赚的。”\n" +
            "\n" +
            "正是正是，头上的箍没了，再也不用怕师父念你，还不得多喝两杯？八戒迷迷糊糊，却还不忘劝酒。\n" +
            "\n" +
            "“八戒，你吃酒高兴，别人要吃你的时候，可还能这般高兴？”\n" +
            "\n" +
            "“谁要吃我？我老猪的钉钯，头一个不答应。”八戒一拍桌子。\n" +
            "\n" +
            "“难！难！难！”悟空挥挥手，一脸嫌弃：“他们若要吃你，骨头渣都不剩。\n" +
            "\n" +
            "“他们？他们又是哪路神仙？”\n" +
            "\n" +
            "“我问你，我们当年一路西行，遇到多少妖？又杀了多少怪？”\n" +
            "\n" +
            "“那可太多了！数都数不过来。你每次懒得动手，就支使我去清理这洞那洞的。”\n" +
            "\n" +
            "“不算小妖，那些有道行的，我们杀了几个？”\n" +
            "\n" +
            "“不记得……统统杀了吧。”\n" +
            "\n" +
            "“不算木仙庵的树妖和那七只蜘蛛，我们杀的，不到打过的一半。”\n" +
            "\n" +
            "“七……七只蜘蛛？哦，记得记得。”\n" +
            "\n" +
            "“那一半，我们没动，你可知为何？”\n" +
            "\n" +
            "“为何？”\n" +
            "\n" +
            "“杀不得。”\n" +
            "\n" +
            "“哼，那是以前，我们现在不也是上天了吗？想杀，现在便去杀！”\n" +
            "\n" +
            "悟空叹了口气，道：“八戒，不若我们辞了果位，告老还乡罢。我回花果山，你回高老庄。”\n" +
            "\n" +
            "八戒一愣，没想明白为何大师兄突然换了话头。\n" +
            "\n" +
            "“要回你自己回，我可不回！回了高老庄还得自己种地收菜，现在啥都不用做，就有吃不完的供品。要多少花样，有多少花样。”\n" +
            "\n" +
            "“这供品，本该给那种地收菜的人吃。我们吃了，他们就少吃一点。”\n" +
            "\n" +
            "“你傻了吗？咱们上来不就为了这一天吗？难道要和以前一样，跟着师父去到处化缘？”\n" +
            "\n" +
            "“算了算了，喝酒喝酒。”\n" +
            "\n" +
            "……\n" +
            "\n" +
            "八戒不记得，最后这场酒，大师兄是什么时候走的。\n" +
            "\n" +
            "只记得他昏睡过去前，师兄说的最后一句话是\n" +
            "\n" +
            "“长生不老，长不了。”\n" +
            "\n",
        position: "游记位置：位于游记人物列表【弥勒】的下方。\n" +
            "\n" +
            "具体位置：主线的最后BOSS，必定会遇到！",
        positionImgUrl: 'https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-position.png',
        difficulty: 9,
        experience: "法宝携带芭蕉扇，棍法点到四层棍势，定身法、身外身法与聚形散气都点满，其他加点可随自身喜好来就行。\n" +
            "\n" +
            "加点：奇术只加禁字法，其他都不点，根基与棍法的加点如下：\n" +
            "\n" +
            "武器携带如意金箍棒，披挂头部穿大力王面，身体与手套穿锦鳞套，脚步按照自己喜好选择，珍玩必带金棕衣，辟水珠，第三个可随喜好选择。\n" +
            "\n" +
            "石猿分为两个阶段，一阶段的攻击多数为近战与少数为大范围AOE，第二阶段大范围AOE技能增多，且半血会使用身外身法召唤第二个石猿。\n" +
            "\n" +
            "开局往石猿的位置走，先躲避一个敲，走石猿后面打一套普攻连招，最后一棒可以造成一波硬直，继续输出半套普攻连招，看到石猿缓过来直接定身术再打一套，基本也快把三层棍势攒好了。\n" +
            "\n" +
            "后面石猿会固定使用一套近战连招，完成最后一击时会有一段时间的前摇使用下一个技能，我们抓住这个前摇直接蓄力三棍势重击敲上去。\n" +
            "\n" +
            "然后远离石猿，这时再继续攻击会被石猿弹反，石猿会进行两次抓取，被抓住一次就是大半管血。\n" +
            "\n" +
            "后面石猿大概率身上会出现红线然后开始蓄力砸地，我们抓住这个前摇打一套普攻，再原地躲避四次全图攻击，要注意节奏，砸地流程是双手各砸一次，双手砸一次，最后双手插入地下再进行一波大范围攻击。\n" +
            "\n" +
            "可以翻滚躲避也可以通过跳跃+劈棍重击的方式两链跳，看自己熟练度选择。\n" +
            "\n" +
            "砸完地趁着后摇继续输出一套普攻，如果玩家离敌人比较远则会跳到半空砸过来，就像开局一样也是抓后摇打一套普攻，然后立刻远离石猿。\n" +
            "\n" +
            "石猿这时会疯狂砸地攻击，前面的攻击距离都很近，最后一击是一个中等范围的AOE攻击，通过观察地面上出现的石块确认攻击范围与躲避时间。\n" +
            "\n" +
            "抓住这个招式的后摇继续打一套普攻，我们在第一阶段尽量用普攻或重击来消耗敌人血量，敌人的伤害大头在第二阶段，我们需要为第二阶段留好蓝条。\n" +
            "\n" +
            "这里石猿第一阶段的招式已经介绍完毕，后面只是重复前面的各类招式，而石猿此时的血条基本也不会太多，继续抓招式前摇与后摇通过普攻进入二阶段。\n" +
            "\n" +
            "石猿的二阶段会给自己双手附魔，开局必是一个连续砸地的AOE连招，而且此时绝对不能使用定身术，会被石猿直接反制。\n" +
            "\n" +
            "砸地的流程与第一阶段相同，按照第一阶段的手感躲就行，招式结束后抓住后摇先打一套普攻，然后直接使用定身术+身外身法开始群殴。\n" +
            "\n" +
            "这里基本石猿会被我们控的死死的，直接被打到半管血，中间穿插的重击最好是四棍势。\n" +
            "\n" +
            "半血后石猿也会使用身外身法召唤一个石猿，我们直接幽魂打硬直+芭蕉扇打控制，继续跟着身外身法输出（第二个石猿出来离第一个石猿很近，释放幽魂时选好角度就能命中俩人）。\n" +
            "\n" +
            "等到芭蕉扇的控制结束基本能把另一个石猿直接打死，最后的石猿只剩一点血，我们直接变身收尾即可。\n" +
            "\n" +
            "击败石猿会直接进入大圣残躯的BOSS战，系统会直接恢复我们的状态，大圣残躯同样有两个阶段，两个血条。\n" +
            "\n" +
            "建议第一次先试试大圣残躯的招式，死亡后回到土地庙更换文章上面推荐的第二套装备加点。\n" +
            "\n" +
            "因为BOSS战的地点在水里，这套BD只要血量降到一半以下就会以极快的速度恢复到半管血（披挂一定要升阶升到满级）。\n" +
            "\n" +
            "开局直接使用禁字法，然后上去跟大圣硬刚即可，因为大圣的攻击欲望很高，且大多数攻击通过无脑翻滚就能躲（BD也会延长翻滚的无敌时间）；通过穿插普攻+闪避的方式能以非常快的速度集满棍势，然后直接重击敲下去，继续重复这个流程。\n" +
            "\n" +
            "一个三棍势重击能打出大量伤害，如果血量不健康就离远等待自动回血，如果情况紧急就喝血瓶，因为泡酒物的选择，我们喝酒无法被打断。\n" +
            "\n" +
            "当大圣立棍重击的时候也可以使用重击直接将敌人敲下来，还能造成大量伤害。\n" +
            "\n" +
            "基本一管血通过被动一直恢复就能将通关大圣残躯，进入二阶段。\n" +
            "\n" +
            "大圣二阶段使用的重击多了很多，但我们一个重击劈下去的伤害没有变化，所以打法与第一阶段完全相同。\n" +
            "\n" +
            "我们有大量的减少与自动回血手段，血瓶也很健康，BD也将战斗的难度下调了不少，大圣二阶段也没有什么快慢刀、神经刀这类难躲的招式，通过你全局游戏积攒下来的手法与大圣一对一真男人单挑吧！",
        reward: "神珍珍玩神铁碎片、3个九转还魂丹",
        bossTrick: [
            {
                name: "连续砸地（冰）",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick1.gif"
            },
            {
                name: "连续砸地（金）",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick2.gif"
            },
            {
                name: "连续砸地",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick3.gif"
            },
            {
                name: "属性三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick4.gif"
            },
            {
                name: "跳劈",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick5.gif"
            },
            {
                name: "五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick6.gif"
            },
            {
                name: "抓取",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick7.gif"
            },
            {
                name: "安身法戳棍",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick8.gif"
            },
            {
                name: "戳棍六连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick9.gif"
            },
            {
                name: "棍花连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick10.gif"
            },
            {
                name: "挥棍七连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick11.gif"
            },
            {
                name: "快速五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick12.gif"
            },
            {
                name: "立棍远击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick13.gif"
            },
            {
                name: "两连重击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick14.gif"
            },
            {
                name: "扔棍三连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick15.gif"
            },
            {
                name: "瞬移六连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/大圣残躯/dscq-trick16.gif"
            },
        ]
    },
    {
        bossId: 62, chapterIndex: 5, name: "二郎显圣真君",
        imgUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/62.png",
        description: "诸天显圣称大才，身似梅花欺雪白。\n" +
            "\n" +
            "心高不认天家眷，浩气冲霄浮屠开。\n" +
            "\n" +
            "“都是些猴子，一件像样的玩意也无。”\n" +
            "\n" +
            "天兵甲用枪挑翻一具尸身，向天兵乙抱怨，他们面前是刚刚结束战斗的花果山，处处是被削平缺角的岩石，被雷劈成焦黑的古树，以及满地的尸骸。\n" +
            "\n" +
            "“好的都在水帘洞里，哪轮得到我俩打扫战场的。”天兵乙回道。\n" +
            "\n" +
            "“也是。我们只能干些脏活，灭掉那些没断气的。”天兵甲语毕，一枪戳入一具尸体里，又抽了出来。\n" +
            "\n" +
            "他们一板一眼地干着，直至走到一块巨石前。\n" +
            "\n" +
            "天兵甲敲了敲石头，天兵乙道：“一块石头，你也想榨出油水来？”\n" +
            "\n" +
            "天兵甲道：“你竟不知？这便是孙悟空的尸首。”\n" +
            "\n" +
            "天兵乙道：“瞎扯！他不是没了？”\n" +
            "\n" +
            "“先前他战死，六根被分了去，他生自一块石头，如今没了灵根，死后自然又变回石头了。\n" +
            "\n" +
            "“放屁。”\n" +
            "\n" +
            "天兵甲骄傲道：“列阵时我站排头，看得清楚，他们分尸的时候，连真君也拿了一样。”\n" +
            "\n" +
            "天兵乙奇道：“我记得你不站排头呀……真的假的？真君也拿了？我看那些下界的妖王都来了，还以为只有妖怪会拿妖怪的东西哩。\n" +
            "\n" +
            "“什么妖怪，他可是封过佛位的。”天兵甲纠正道。\n" +
            "\n" +
            "“真君拿那个做什么？也不嫌晦气。”\n" +
            "\n" +
            "“这谁知道。孙悟空也算天地生成的灵物，说不定吃了能大补。”两人说罢大笑起来。\n" +
            "\n" +
            "“诶，你看这是个什么。”天兵乙发现石头旁摆着一抹素白。\n" +
            "\n" +
            "二人拾起一看，原是枝梅花，如玉似雪，朵朵怒放。\n" +
            "\n" +
            "天兵甲奇道：“花果山岂会有梅花？”\n" +
            "\n" +
            "天兵乙道：“这看着，怎么有几分像……”\n" +
            "\n" +
            "话未全完，就见那天兵乙贯胸穿出一枝枪头，金光一射，连盔甲中的魂也散了。\n" +
            "\n" +
            "天兵甲大惊，还来不及多说，金光再次闪灼。\n" +
            "\n" +
            "白云悠悠，花果山又归于了静默。\n" +
            "\n",
        position: "游记位置：位于游记人物列表【弥勒】的下方。\n" +
            "具体位置：位于第三回的隐藏地图梅山，传送到土地庙冲寒道，往前方右边过桥走到头即可进入浮屠塔，完成前五回的所有隐藏地图（第三回是瓜田），回到浮屠塔即可触发剧情，进入隐藏地图梅山。",
        difficulty: 10,
        experience: "武器：昆棍-蛛仙。法宝：芭蕉扇。精魄：幽魂。披挂：金身一套。珍玩：仙胞石片、三清令、猫睛宝串。根基：主加气力与棍花加成的技能。\n" +
            "\n" +
            "棍花能够迅速的恢复精魄与法宝的冷却，也是这套打法的核心技能。\n" +
            "\n" +
            "棍法：选择劈棍，按照下图点就行。奇术：定身法点满。身法：聚形散气点满。变化：此处的加点可选，优先将暗藏神妙点出来。\n" +
            "\n" +
            "打法1：开局走到下图所示位置，直接使用芭蕉扇。\n" +
            "\n" +
            "等待二郎神破防后使用幽魂捶地，芭蕉扇的风消失后立刻接定身术，然后走上去棍花。\n" +
            "\n" +
            "攒到四棍势时二郎神也能够活动了，直接用一个四棍势重击。\n" +
            "\n" +
            "然后立即靠近二郎神再次使用恢复冷却的幽魂捶地，直接把二郎神的二阶段打出来。\n" +
            "\n" +
            "二阶段先躲技能，走到二郎神附近变身石头人，追着二郎神锤，此时二郎神是不会攻击我们的，尽量削弱二郎神的架势条。\n" +
            "\n" +
            "变回来二郎神的架势条所剩无几，简单A几下破防，接定身术，贴上去棍花。\n" +
            "\n" +
            "攒够四棍势直接一个四棍势重击打上去，然后接幽魂头槌，把二郎神打进半血三阶段，如果伤害差了点就打几下普攻。\n" +
            "\n" +
            "先躲二阶段开头的技能，等待定身术的冷却，达到一半以上直接使用芭蕉扇开始吹。\n" +
            "\n" +
            "等芭蕉扇消失，二郎神会再次破防，接定身术继续上去棍花，攒好四棍势重击二郎神，重击结束利用硬直使用幽魂头槌砸下去，二郎神此时固定飞天，躲一波技能。\n" +
            "\n" +
            "等待二郎神放完开始的无敌技能后开始挥动斧子突击时直接使用芭蕉扇，等待二郎神破防继续棍花+四棍势重击+幽魂头槌的组合。\n" +
            "\n" +
            "此时变身技能缓冲好了，直接变身石头人，追着二郎神打到破防，变回来继续定身术+棍花+四棍势重击+幽魂头槌，结束后使用芭蕉扇控住二郎神，这时候怎么打都能赢了！\n" +
            "\n" +
            "打法2：开局走到下图所示的草坪位置使用芭蕉扇，二郎神跳起来会直接被打断破防，我们直接跟上去普攻一套，变地狼冲一波控制打一套。\n" +
            "\n" +
            "后面二郎神恢复行动能力时要继续跟着普攻，适当躲避并配合铜头铁臂来格挡较为明显的攻击，需要一定熟练度，建议多过几次招再正式开始打。\n" +
            "\n" +
            "因为开始已经靠芭蕉扇无伤打了一套，后面普攻不需要打多久，削减四分之一血条的时候二郎神会进入第二阶段。\n" +
            "\n" +
            "通过翻滚躲避斧头，使用铜头铁臂躲避第二次攻击，然后直接变身石头人，这时二郎神是不会攻击你的，一直用石头人消耗二郎神血条上的架势条。\n" +
            "\n" +
            "变回来的时候稍微普攻几下就能让二郎神破防，后面继续普攻一套，使用定身术+身外身法将二郎神打到半管血，进入第三阶段（后面不要再使用定身术，使用一次后再次使用会被反制）。\n" +
            "\n" +
            "第三阶段开始就有一套威胁性极大的连招需要躲避，先离远通过翻滚躲避射线，通过往侧面跑躲避飞刀，使用铜头铁臂躲避最后的冲刺攻击。\n" +
            "\n" +
            "接下来是最困难的时期，我们要一边攻击一边躲避，撑到芭蕉扇的CD结束，需要注意的招式包括：\n" +
            "\n" +
            "夹杂在连招内的射线攻击，二郎神会跳跃到天上，手也会摆好架势，一旦看着这个前摇就要躲避了。\n" +
            "\n" +
            "原地召唤出无数刀剑，在刀剑即将落下时使用铜头铁臂躲避。\n" +
            "\n" +
            "将长矛变大后的多段突刺攻击，每次突刺即将到来时往两边闪避攻击，最后还会带一个快慢刀的突刺攻击，一定要注意。\n" +
            "\n" +
            "等到芭蕉扇的CD结束直接使用芭蕉扇+身外身法与地狼开始群殴，这套基本能将二郎神干到最后一点血。\n" +
            "\n" +
            "最后我们需要等待即将冷却完成的变身技，冷却一旦完成直接变成石头人将二郎神打破防，二郎神看到变石头人是不会攻击我们的，破防后便会猴子用普攻收尾即可。\n" +
            "\n" +
            "后面会进入大场面战斗，但基本没有难度，故不再叙述。",
        reward: "【法术】青穹、虹霓云绦2、先天锟钢1、三尖两刃枪1",
        bossTrick: [
            {
                name: "开弓之箭",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick1.gif"
            },
            {
                name: "掷剑",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick2.gif"
            },
            {
                name: "基础四连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick3.gif"
            },
            {
                name: "单枪五连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick4.gif"
            },
            {
                name: "单枪六连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick5.gif"
            },
            {
                name: "金身反击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick6.gif"
            },
            {
                name: "三连斧击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick7.gif"
            },
            {
                name: "双武六连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick8.gif"
            },
            {
                name: "瞬移二连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick9.gif"
            },
            {
                name: "突刺抓取",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick10.gif"
            },
            {
                name: "转阶段远程攻击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick11.gif"
            },
            {
                name: "二阶段组合连击1",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick12.gif"
            },
            {
                name: "二阶段组合连击2",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick13.gif"
            },
            {
                name: "二阶段斧击八连",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick14.gif"
            },
            {
                name: "远程组合连击",
                gifUrl: "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/BlackMonkey/二郎显圣真君/elxszj-trick15.gif"
            },
        ]
    }
];
