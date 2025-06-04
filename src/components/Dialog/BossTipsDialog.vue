<template>
  <div class="dialog-overlay" v-if="show" @click.self="close">
    <div class="dialog-container">
      <div class="dialog-header">
        <h3>引路人</h3>
        <button class="close-button" @click="close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#e7cc80" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="dialog-content">
        <!-- 初始机器人欢迎消息 -->
        <div class="message bot-message">
          <div class="avatar">
            <img :src="chatBotAvatar" alt="chatBot" />
          </div>
          <div class="text">
            {{ welcomeMessage }}
          </div>
        </div>

        <!-- 动态消息列表 -->
        <template v-for="item in messages">
          <!-- 用户消息 -->
          <div v-if="item.sender === 'user'" class="message user-message">
            <div class="text">
              {{ item.content }}
            </div>
            <div class="avatar">
              <img :src="userAvatar" alt="用户" />
            </div>
          </div>

          <!-- 机器人消息 -->
          <div v-else class="message bot-message">
            <div class="avatar">
              <img :src="chatBotAvatar" alt="chatBot" />
            </div>
            <div class="text">
              {{ item.content }}
            </div>
          </div>
        </template>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="message bot-message">
          <div class="avatar">
            <img :src="chatBotAvatar" alt="chatBot" />
          </div>
          <div class="text loading">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <div class="dialog-input">
        <input
            type="text"
            placeholder="请输入地点或Boss名称"
            v-model="question"
            :disabled="isLoading"
            @keyup.enter="sendQuestion"
        />
        <button class="send-button" :disabled="isLoading || !question" @click="sendQuestion">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2Z" stroke="#e7cc80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { scrollToBottom } from "../../utils/GlobalFunction.ts";

const chatBotAvatar = "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/chatBot.png";

defineProps({
  show: Boolean,
  userAvatar: String
});

const emit = defineEmits(['close']);

// 用户输入的问题
const question = ref('');
// 存储所有消息
const messages = ref<Array<{ sender: 'user' | 'bot', content: string }>>([]);
// 加载状态
const isLoading = ref(false);

// 固定欢迎消息
const welcomeMessage = ref('你好，天命人！西行路上遇到困难了？来，告诉老夫，是谁拦住了你的去路？或者，你在哪个地方遇到了未知的强敌呢？');

// 位置与Boss的映射数据
const locationBossMap = {
  "黑风山": ["广智", "幽魂", "灵虚子", "广谋", "白衣秀士", "金池长老", "黑风大王", "黑熊精"],
  "黄风岭": ["沙国王父子", "沙大郎", "虎先锋", "虎伥", "石先锋", "百目真人", "疯虎", "石中人", "石敢当", "小骊龙", "蝜蝂", "黄风大圣"],
  "小西天": ["亢金龙", "魔将·莲眼", "魔将·妙音", "赤尻马猴", "亢金星君", "青背龙", "不白", "不能", "魔将·劫波", "不空", "黄眉"],
  "盘丝岭": ["二姐", "黑手道人", "百足虫", "右手虫", "小黄龙", "猪八戒", "紫蛛儿", "毒敌大王", "靡道人", "晦月魔君", "百眼魔君"],
  "火焰山": ["石父", "急如火快如风", "云里雾雾里云", "火焰山土地", "五行战车", "火灵元母", "兴烘掀掀烘兴", "碧水金睛兽", "红孩儿"],
  "花果山": ["王灵官", "跳浪蛟", "水木兽", "凤翅将军", "金甲犀", "浪波波", "步云鹿", "碧臂螂", "大石敢当", "石猿", "大圣残躯", "二郎显圣真君"]
};

// 同义词映射
const synonymMap = {
  "沙国王/沙二郎": "沙国王父子",
  "大头": "幽魂",
  "犀牛": "金甲犀",
  "龙": "小黄龙",
  "蝎子": "百眼魔君",
  "熊": "黑熊精",
  "螳螂": "碧臂螂",
  "鹿": "步云鹿",
  "老虎": "虎先锋",
  "虫子": "百足虫",
  "狼": "灵虚子",
  "黑手": "黑手道人",
  "白衣": "白衣秀士",
  "金星": "亢金星君",
  "无头": "黄风大圣",
  "沙二郎": "沙国王父子",
  "急如火": "急如火快如风",
  "快如风": "急如火快如风",
  "云里雾": "云里雾雾里云",
  "雾里云": "云里雾雾里云",
  "兴烘掀": "兴烘掀掀烘兴",
  "掀烘兴": "兴烘掀掀烘兴",
  "五行车": "五行战车",
  "褐铁战车": "五行战车",
  "灰铜战车": "五行战车",
  "红银战车": "五行战车",
  "赤金战车": "五行战车",
  "无名战车": "五行战车",
  "褐铁车": "五行战车",
  "灰铜车": "五行战车",
  "红银车": "五行战车",
  "赤金车": "五行战车",
  "无名车": "五行战车",
  "火灵母": "火灵元母",
  "石猿": "大圣残躯",
  "石猴": "大圣残躯",
  "二郎神": "二郎显圣真君",
  "杨戬": "二郎显圣真君"
};

// 创建Boss到位置的映射
const bossLocationMap: Record<string, string> = {};
Object.entries(locationBossMap).forEach(([location, bosses]) => {
  bosses.forEach(boss => {
    bossLocationMap[boss] = location;
  });
});

// 所有位置名称（按长度降序排序，优先匹配长名称）
const locations = Object.keys(locationBossMap).sort((a, b) => b.length - a.length);
// 所有Boss名称（按长度降序排序）
const allBosses = Object.values(locationBossMap).flat().sort((a, b) => b.length - a.length);

// 清洗输入文本
const cleanInput = (text: string): string => {
  // 转换为小写，去除标点、空格和特殊字符
  return text
      .toLowerCase()
      .replace(/[.,\/#!$%^&*;:{}=\-_`~()\s·、，。？；：'"《》【】]/g, '')
      .replace(/\s+/g, '');
};

// 计算编辑距离（Levenshtein距离）
const calculateEditDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // 替换
            matrix[i][j - 1] + 1,    // 插入
            matrix[i - 1][j] + 1     // 删除
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

// 计算相似度（0-1之间）
const calculateSimilarity = (a: string, b: string): number => {
  const distance = calculateEditDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
};

// 模糊匹配函数
const fuzzyMatch = (input: string, options: string[], threshold = 0.7): string | null => {
  const cleanedInput = cleanInput(input);

  // 1. 首先尝试完全匹配（考虑同义词）
  for (const option of options) {
    const cleanedOption = cleanInput(option);
    if (cleanedInput === cleanedOption) return option;
  }

  // 2. 尝试同义词匹配
  for (const [synonym, original] of Object.entries(synonymMap)) {
    const cleanedSynonym = cleanInput(synonym);
    if (cleanedInput === cleanedSynonym) {
      return original;
    }
  }

  // 3. 尝试部分匹配（输入是选项的一部分）
  for (const option of options) {
    const cleanedOption = cleanInput(option);
    if (cleanedOption.includes(cleanedInput) && cleanedInput.length >= 2) {
      return option;
    }
  }

  // 4. 尝试选项是输入的一部分
  for (const option of options) {
    const cleanedOption = cleanInput(option);
    if (cleanedInput.includes(cleanedOption) && cleanedOption.length >= 2) {
      return option;
    }
  }

  // 5. 使用编辑距离进行模糊匹配
  let bestMatch: string | null = null;
  let highestSimilarity = 0;

  for (const option of options) {
    const cleanedOption = cleanInput(option);
    const similarity = calculateSimilarity(cleanedInput, cleanedOption);

    if (similarity > highestSimilarity && similarity >= threshold) {
      highestSimilarity = similarity;
      bestMatch = option;
    }
  }

  return bestMatch;
};

const close = () => {
  emit('close');
};

// 发送问题 - 增强的模糊匹配逻辑
const sendQuestion = async () => {
  if (!question.value.trim()) return;

  const userQuestion = question.value.trim();
  messages.value.push({
    sender: 'user',
    content: userQuestion
  });

  question.value = '';
  isLoading.value = true;
  await nextTick(() => scrollToBottom('.dialog-content'));

  // 模拟网络延迟
  setTimeout(() => {
    let botResponse: string;

    try {
      // 模糊匹配Boss名称
      const matchedBoss = fuzzyMatch(userQuestion, allBosses);

      // 模糊匹配位置名称
      const matchedLocation = fuzzyMatch(userQuestion, locations);

      if (matchedBoss) {
        // 匹配Boss但不匹配位置
        const location = bossLocationMap[matchedBoss];
        botResponse = `哦，${matchedBoss}啊，他在${location}呢，点击左侧目录中对应的章节，去找寻克敌制胜的奥秘吧！`;
      } else if (matchedLocation && !matchedBoss) {
        // 匹配位置但不匹配Boss
        const bosses = locationBossMap[matchedLocation as keyof typeof locationBossMap].join('、');
        botResponse = `你说的${matchedLocation}，据老夫所知，有${bosses}，他们个个都是神通广大啊，不妨点击左侧目录对应章节，一一寻找克敌之术吧！`;
      } else {
        // 两者都不匹配
        botResponse = '抱歉，天命人，老夫没有理解你的问题，要想打探更深奥的天机，不妨回到主页面求问，他可比老夫聪明多了。';
      }
    } catch (error) {
      console.error('匹配错误:', error);
      botResponse = '抱歉，天命人，老夫一时糊涂没能理解你的问题，请再问一次吧。';
    }

    messages.value.push({
      sender: 'bot',
      content: botResponse
    });

    isLoading.value = false;
    nextTick(() => scrollToBottom('.dialog-content'));
  }, 800); // 模拟网络延迟
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=STKaiti&display=swap');
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.dialog-container {
  width: 90%;
  max-width: 500px;
  background: linear-gradient(to bottom, #2a2118, #1a1510);
  border: 2px solid #d3b479;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: #202021FF;
    border-bottom: 1px solid #d3b479;

    h3 {
      color: #e7cc80;
      margin: 0;
      font-size: 18px;
    }

    .close-button {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 5px;

      svg {
        width: 16px;
        height: 16px;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .dialog-content {
    height: 350px;
    padding: 20px;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari/Opera */
    }
    background: #202021FF;

    .message {
      display: flex;
      margin-bottom: 20px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .text {
        max-width: 80%;
        padding: 12px 15px;
        border-radius: 10px;
        font-size: 16px;
        line-height: 1.5;
      }
    }

    .bot-message {
      .text {
        background: rgba(211, 180, 121, 0.2);
        border: 1px solid #d3b479;
        color: #e7cc80;
        margin-left: 15px;
        border-top-left-radius: 0;
      }
    }

    .user-message {
      justify-content: flex-end;

      .text {
        background: rgba(57, 57, 59, 0.88);
        border: 1px solid #909094;
        color: #c9b787;
        margin-right: 15px;
        border-top-right-radius: 0;
      }
    }
  }

  .dialog-input {
    display: flex;
    padding: 15px 20px;
    background: #202021FF;
    border-top: 1px solid #d3b479;

    input {
      flex: 1;
      padding: 12px 15px;
      font-family: 'Ma Shan Zheng', cursive;
      background: #202021FF;
      border: 1px solid #d3b479;
      border-radius: 8px;
      color: #e7cc80;
      font-size: 16px;

      &::placeholder {
        color: #a89c7c;
      }
    }
    .send-button {
      margin-left: 10px;
      background: rgba(211, 180, 121, 0.2);
      border: 1px solid #d3b479;
      border-radius: 45%;
      width: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: rgba(211, 180, 121, 0.3);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}
/* 加载动画样式 */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;

  .dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #e7cc80;
    margin: 0 4px;
    animation: pulse 1.5s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>