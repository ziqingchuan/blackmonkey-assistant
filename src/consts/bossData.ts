export interface BossInfo {
    bossId: number; // boss的id(0-62)
    chapterIndex: number; // 章节索引(0-5)
    name: string; // boss名字
    imgUrl: string; // boss图片的url
    description: string; // boss描述
    position: string; // boss出现位置
    difficulty: number; // boss难度(1-5)
    experience: string; // boss打法经验
    reward: string; // boss掉落奖励
    bossTrick: string[]; // boss的招式
}

/**
 * 单独记录小黄龙的BossInfo，其他的后续再加，先模拟数据
 */

/**
 * 黑风山： "广智","幽魂","灵虚子","广谋","白衣秀士","金池长老","黑风大王","黑熊精"
 * 黄风岭："沙国王/沙二郎","沙大郎","虎先锋","虎伥","石先锋","百目真人","疯虎","石中人","石敢当","小骊龙","蝜蝂","黄风大圣"
 */

export const chapterName: string[] = ["黑风山", "黄风岭", "小西天", "盘丝岭", "火焰山", "花果山"];

export const bossName: string[] = [
    "广智","幽魂","灵虚子","广谋","白衣秀士","金池长老","黑风大王","黑熊精",
    "沙国王/沙二郎","沙大郎", "虎先锋","虎伥","石先锋","百目真人","疯虎","石中人","石敢当","小骊龙","蝜蝂","黄风大圣",
    "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",];