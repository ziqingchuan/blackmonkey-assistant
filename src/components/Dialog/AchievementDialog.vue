<template>
  <div class="dialog-overlay" v-if="show" @click.self="close">
    <div class="dialog-container">
      <div class="dialog-header">
        <h3>八十一难问答录</h3>
        <button class="close-button" @click="close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#e7cc80" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="dialog-content" ref="chatContainer">
        <!-- 初始机器人欢迎消息 -->
        <div class="message bot-message">
          <div class="avatar">
            <img src="/chatBot.png" alt="悟空" />
          </div>
          <div class="text">
            天命人，有何困惑？贫僧可为你解惑八十一难之道。
          </div>
        </div>

        <!-- 动态消息列表 -->
        <template v-for="item in messages" :key="index">
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
              <img src="/chatBot.png" alt="悟空" />
            </div>
            <div class="text">
              {{ item.content }}
            </div>
          </div>
        </template>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="message bot-message">
          <div class="avatar">
            <img src="/chatBot.png" alt="悟空" />
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
            placeholder="输入你的问题..."
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
import { ref, nextTick, watch } from 'vue';

defineProps({
  show: Boolean,
  userAvatar: String
});

const emit = defineEmits(['close']);

// 用户输入的问题
const question = ref('');
// 存储所有消息（用户问题+机器人回答）
const messages = ref<Array<{sender: 'user' | 'bot', content: string}>>([]);
// 加载状态
const isLoading = ref(false);
// 聊天容器引用
const chatContainer = ref<HTMLElement | null>(null);

const close = () => {
  emit('close');
};

// 发送问题
const sendQuestion = async () => {
  if (!question.value.trim()) return;

  // 保存用户问题
  const userQuestion = question.value.trim();
  messages.value.push({
    sender: 'user',
    content: userQuestion
  });

  // 清空输入框
  question.value = '';

  // 显示加载状态
  isLoading.value = true;

  // 滚动到底部
  scrollToBottom();

  try {
    // 模拟API调用获取答案
    const answer = await getAnswer(userQuestion);

    // 保存机器人回答
    messages.value.push({
      sender: 'bot',
      content: answer
    });
  } catch (error) {
    console.error('获取答案失败:', error);
    messages.value.push({
      sender: 'bot',
      content: '贫僧修行尚浅，此问题暂未能解，待我西行归来再为你解惑。'
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

// 模拟API获取答案
const getAnswer = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      // mock
      const answers = [
        `欲得"${question}"成就，需历经三劫九难：\n一劫：勇闯南天门\n二劫：力战十万天兵\n三劫：踏碎凌霄殿`,
        `"${question}"乃大造化，需集齐三样法宝：\n• 金箍棒\n• 筋斗云\n• 火眼金睛\n方可证得此道`,
        `此成就需解五行封印：\n金：击败金甲神将\n木：破除蟠桃园结界\n水：渡过天河弱水\n火：炼就三昧真火\n土：翻越五指神山`,
        `"${question}"之道，在乎心性修为：\n• 破妄：识破天宫幻境\n• 明心：坚定本我道心\n• 证果：成就齐天伟业`
      ];

      resolve(answers[Math.floor(Math.random() * answers.length)]);
    }, 1500);
  });
};

// 滚动到聊天底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

// 当消息变化时自动滚动
watch(messages, scrollToBottom, { deep: true });
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');
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