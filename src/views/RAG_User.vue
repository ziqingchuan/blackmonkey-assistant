<template>
  <div class="page-container">
    <!-- 玄铁侧栏 -->
    <div class="sidebar">
      <Logo/>
      <CloudUnderLogo />
      <div class="btn-group">
        <button class="btn" @click="showCreate" title="新建对话">开劫</button>
        <button class="btn" @click="showConfig" title="高级设置">造化</button>
        <button class="btn" @click="router.push('/account')" title="退出">归尘</button>
      </div>
    </div>

    <!-- 三界主体 -->
    <div class="main-container">
      <!-- 往生名录 -->
      <div class="dialog-list">
        <div
            v-for="dialog in dialogList"
            :key="dialog.id"
            class="dialog-item"
            :class="{ active: currentDialog?.id === dialog.id }"
            @click="loadDialog(dialog.id)"
        >
          <div class="dialog-title">{{ dialog.title }}</div>
          <div class="dialog-time">
            {{ dialog.createTime.toLocaleDateString() }}
          </div>
        </div>
        <div v-if="dialogList.length === 0" class="empty-tip">
          无往生记录，请开启新劫难
        </div>
      </div>

      <!-- 问道之境 -->
      <div class="dialog-container">
        <div class="dialog-header">
          <CloudBeforeTitle />
          <span class="dialog-title">{{ currentDialog?.title || "新劫难" }}</span>
        </div>
        <div class="dialog-content">
          <template v-if="currentDialog">
            <div
                v-for="(content, index) in currentDialog.contentList"
                :key="index"
                :class="[
                'message-bubble',
                content.role === 'USER' ? 'user' : 'rag'
              ]"
            >
              <div class="message-content">{{ content.text }}</div>
              <div class="message-role">
                {{ content.role === 'USER' ? '天命人' : '造化玉碟' }}
              </div>
            </div>
          </template>
          <div v-else class="empty-dialog">请选择或开启新的劫难</div>
          <div v-if="isLoading" class="loading-container">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
          </div>
        </div>
        <div class="dialog-input">
          <input
              v-model.trim="question"
              type="text"
              class="input-text"
              placeholder="请输入你的劫难..."
              :disabled="isLoading"
              @keyup.enter="sendQuestion"
          />
          <button
              class="btn-send"
              :disabled="isLoading || !question"
              @click="sendQuestion"
          >
            <span class="icon-container">
              <Send />
            </span>
            <span class="text-container">求问</span>
          </button>
        </div>
        <div class="footer">
          <CloudUnderInput />
          <span> 历劫证道 · 天机自现 </span>
          <CloudUnderInput />
        </div>
      </div>
    </div>
  </div>

  <!-- 新建对话弹窗 -->
  <div v-if="showCreateDialog" class="xuan-window">
    <div class="xuan-content">
      <h3 class="xuan-title">开劫度人</h3>
      <p>点击开劫，创建一条新的求问之路！</p>
      <p>若尚未决断，就请遁去吧......</p>
      <input
          v-model="newDialogTitle"
          class="xuan-input"
          placeholder="输入劫难名..."
      />
      <div class="xuan-button-group">
        <button
            class="xuan-btn"
            @click="createDialog(newDialogTitle, 1).then(() => {
            showCreateDialog = false
            newDialogTitle = ''
          })"
        >
          开劫
        </button>
        <button class="xuan-btn" @click="showCreateDialog = false">遁去</button>
      </div>
    </div>
  </div>

  <!-- 参数设置弹窗 -->
  <div v-if="showConfigDialog" class="xuan-window">
    <div class="xuan-content">
      <h3 class="xuan-title">造化玉碟</h3>

      <div class="xuan-config-item">
        <span class="xuan-label">寻法之道：</span>
        <div class="strategy-switch">
          <button
              :class="['xuan-switch-btn', configParams.searchStrategy === 0 && 'active']"
              @click="configParams.searchStrategy = 0"
          >
            混元无极
            (混合检索)
          </button>
          <button
              :class="['xuan-switch-btn', configParams.searchStrategy === 1 && 'active']"
              @click="configParams.searchStrategy = 1"
          >
            虚空造化
            (向量检索)
          </button>
        </div>
      </div>

      <div class="xuan-config-item">
        <span class="xuan-label">显化之数：</span>
        <input
            v-model.number="configParams.resultCount"
            type="number"
            min="1"
            max="10"
            class="xuan-number-input"
        />
      </div>

      <div class="xuan-config-item">
        <span class="xuan-label">道韵相似：{{ configParams.similarity }}</span>
        <input
            v-model.number="configParams.similarity"
            type="range"
            min="0"
            max="1"
            step="0.05"
            class="xuan-slider"
        />
      </div>

      <div class="xuan-button-group">
        <button class="xuan-btn" @click="showConfigDialog = false">合道</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '../assets/icons/logo.vue';
import Send from "../assets/icons/send.vue";
import { type UserInfo } from '../apis/user.ts';
import type { Dialog, QueryInfo, ConfigParams } from '../apis/rag.ts';
import CloudUnderLogo from "../assets/icons/Cloud-under-logo.vue";
import CloudUnderInput from "../assets/icons/Cloud-under-input.vue";
import CloudBeforeTitle from "../assets/icons/Cloud-before-title.vue";
import Dragon from "../assets/icons/Dragon.vue";
import Xianyunshan1 from "../assets/icons/xianyunshan1.vue";
// ==================== Mock数据 ====================
const mockUser: UserInfo = {
  userName: '齐天大圣',
  password: 'wukong2024'
};

const mockDialogs: Dialog[] = [
  {
    id: 1,
    userId: 1,
    title: '蟠桃园之劫',
    createTime: new Date('2024-05-20'),
    contentList: [
      {
        text: '如何辨认九千年蟠桃？',
        role: 'USER'
      },
      {
        text: '九千年蟠桃紫纹缃核，食之与天地齐寿日月同庚',
        role: 'RAG'
      }
    ]
  },
  {
    id: 2,
    userId: 1,
    title: '炼丹炉问答',
    createTime: new Date('2024-05-21'),
    contentList: [
      {
        text: '三昧真火如何修炼？',
        role: 'USER'
      },
      {
        text: '需集精气神三昧炼成，非大罗金仙不可妄修',
        role: 'RAG'
      }
    ]
  },

];

const createDialog = async (title: string, userId: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newDialog = {
        id: Date.now(),
        userId,
        title,
        createTime: new Date(),
        contentList: []
      }
      mockDialogs.unshift(newDialog)
      resolve(true)
    }, 500)
  })
}

// ==================== 接口实现 ====================
const login = async (user: UserInfo): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
          user.userName === mockUser.userName &&
          user.password === mockUser.password
      );
    }, 500);
  });
};

const register = async (user: UserInfo): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      mockUser.userName = user.userName;
      mockUser.password = user.password;
      resolve(true);
    }, 500);
  });
};

const getAllhistory = async (user: UserInfo): Promise<Dialog[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(user.userName === mockUser.userName ? mockDialogs : []);
    }, 800);
  });
};

const getDialogDetail = async (id: number): Promise<Dialog | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockDialogs.find(dialog => dialog.id === id));
    }, 500);
  });
};

const getAnswer = async (info: QueryInfo): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const answers = [
        '此乃天地玄机，需渡九九八十一劫方可知晓',
        '大道无形，生育天地；大道无情，运行日月',
        '金箍棒重一万三千五百斤，可大可小随心变化'
      ];
      resolve(answers[Math.floor(Math.random() * answers.length)]);
    }, 1000);
  });
};

// ==================== 组件逻辑 ====================
const currentUser = ref<UserInfo>({ userName: '', password: '' });
const dialogList = ref<Dialog[]>([]);
const currentDialog = ref<Dialog>();
const question = ref('');
const isLoading = ref(false);
const router = useRouter()
const showCreateDialog = ref(false)
const showConfigDialog = ref(false)
const newDialogTitle = ref('')
const configParams = ref<ConfigParams>({
  searchStrategy: 0,
  resultCount: 5,
  similarity: 0.7
})

// 初始化加载
onMounted(async () => {
  try {
    isLoading.value = true;
    if (await login(mockUser)) {
      dialogList.value = await getAllhistory(mockUser);
      if (dialogList.value.length > 0) {
        currentDialog.value = await getDialogDetail(dialogList.value[0].id);
      }
    }
  } finally {
    isLoading.value = false;
  }
});

// 加载具体对话
const loadDialog = async (id: number) => {
  try {
    isLoading.value = true;
    currentDialog.value = await getDialogDetail(id);
  } finally {
    isLoading.value = false;
  }
};

//处理弹窗逻辑
function showCreate() {
  showCreateDialog.value = true
  showConfigDialog.value = false
}

function showConfig() {
  showCreateDialog.value = false
  showConfigDialog.value = true
}

// 发送问题处理
const sendQuestion = async () => {
  if (!question.value.trim()) return;

  // 初始化新对话
  if (!currentDialog.value) {
    currentDialog.value = {
      id: Date.now(),
      userId: 1,
      title: question.value.substring(0, 12) + '...',
      createTime: new Date(),
      contentList: []
    };
    dialogList.value.unshift(currentDialog.value);
  }

  // 添加用户问题
  currentDialog.value.contentList.push({
    text: question.value,
    role: 'USER'
  });

  // 获取回答
  try {
    isLoading.value = true;
    const answer = await getAnswer({
      question: question.value,
      searchStrategy: 0,
      resultCount: 5,
      similarity: 0.7
    });

    currentDialog.value.contentList.push({
      text: answer,
      role: 'RAG'
    });
  } finally {
    isLoading.value = false;
    question.value = '';
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  background: linear-gradient(to right, #1a1a1d 0%, #0a0a0c 100%);
  font-family: 'Ma Shan Zheng', cursive;
  height: 100vh;
}

.sidebar {
  width: 80px;
  background: rgba(18, 18, 20, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-shadow: 3px 0 15px rgba(0,0,0,0.5);
}

.btn-group {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 62vh;
}

.btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #37373d url("public/xianyunshan.png");
  font-family: 'Ma Shan Zheng', cursive;
  color: #e7cc80;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid #3a3a3f;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

button {
  font-family: 'Ma Shan Zheng', cursive;
}

.btn:hover {
  transform: scale(1.1);
  border-color: #c0aa6a;
}

.main-container {
  flex: 1;
  display: flex;
}

.dialog-list {
  overflow-y: auto;
  width: 250px;
  background: rgba(28, 28, 31, 0.95);
  border-right: 1px solid #3a3a3f;
  padding: 20px;
}

.dialog-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;
}

.dialog-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.dialog-title {
  font-size: 18px;
  letter-spacing: 2px;
  color: #d3b479;
  border-bottom: 2px solid #c0aa6a;
  padding-bottom: 10px;
}

.dialog-content {
  background-image: url('public/wukong.png');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  overflow-y: auto;
  flex: 1;
  border: 1px solid #3a3a3f;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

input {
  font-family: 'Ma Shan Zheng', cursive;
}

.dialog-input {
  display: flex;
  gap: 15px;
}

.input-text {
  flex: 1;
  background: rgba(28, 28, 31, 0.95);
  border: 1px solid #3a3a3f;
  border-radius: 25px;
  padding: 15px 25px;
  color: #c0aa6a;
  font-size: 16px;
}

.btn-send {
  width: 50px;
  height: 50px;
  font-family: 'Ma Shan Zheng', cursive;
  color: #c0aa6a;
  border-radius: 50%;
  background: #2d2d32;
  border: 1px solid #3a3a3f;
  cursor: pointer;
  transition: all 0.3s;
  position: relative; /* 用于定位图标和文字 */
  overflow: hidden; /* 确保内容不超出按钮范围 */
}

.btn-send:hover {
  background: #37373d;
  border-color: #c0aa6a;
}

.icon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
}

.text-container {
  font-size: 16px;
  color: #d3b479;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-family: 'Ma Shan Zheng', cursive;
}

.btn-send:hover .icon-container {
  opacity: 0;
}

.btn-send:hover .text-container {
  opacity: 1;
}

.dialog-item {
  padding: 12px;
  margin: 8px 0;
  background: rgba(40, 40, 45, 0.8);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.dialog-item:hover {
  background: rgba(50, 50, 55, 0.9);
  border-color: #c0aa6a33;
}

.dialog-item.active {
  background: rgba(60, 60, 65, 0.9);
  border-color: #c0aa6a;
}

.dialog-time {
  font-size: 16px;
  color: #a9956a;
  margin-top: 10px;
  margin-left: 150px;
}

.empty-tip {
  text-align: center;
  padding: 20px;
  color: #7a6a4a;
}

.message-bubble {
  margin: 12px 0;
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 80%;
  position: relative;
}

.message-bubble.user {
  background: rgba(79, 79, 84, 0.9);
  margin-left: auto;
  border: 1px solid #3a3a3f;
}

.message-bubble.rag {
  background: rgba(40, 40, 45, 0.9);
  border: 1px solid #3a3a3f;
}

.message-content {
  font-size: 18px;
  color: #d3b479;
  line-height: 1.6;
}

.message-role {
  font-size: 15px;
  color: #a99369;
  text-align: right;
  margin-top: 8px;
}

.loading-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 20px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  background: #c0aa6a;
  border-radius: 50%;
  animation: pulse 1.4s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.empty-dialog {
  text-align: center;
  padding: 40px 20px;
  color: #7a6a4a;
}

.footer {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 15px;
  font-size: 14px;
  color: #a48c5e;
  letter-spacing: 1px;
  border-top: 1px solid #3a3a3f;
  margin-top: 20px;
}

/* 弹窗样式 */
.xuan-window {
  width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(18, 18, 20, 0.95);
  border: 2px solid #c0aa6a;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(192, 170, 106, 0.2);
  z-index: 999;
  color: #c0aa6a;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 16px;
}

.xuan-title {
  font-size: 24px;
  color: #c0aa6a;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.xuan-input {
  background: rgba(28, 28, 31, 0.95);
  border: 1px solid #3a3a3f;
  border-radius: 4px;
  padding: 10px;
  color: #c0aa6a;
  width: 90%;
  margin: 10px 0;
  font-family: 'Ma Shan Zheng', cursive;
}

.xuan-config-item {
  margin: 15px 0;
}

.strategy-switch {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.xuan-switch-btn {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  background: rgba(40, 40, 45, 0.8);
  border: 1px solid #3a3a3f;
  color: #7a6a4a;
  cursor: pointer;
  transition: all 0.3s;
}

.xuan-switch-btn.active {
  border-color: #c0aa6a;
  color: #c0aa6a;
  background: rgba(60, 60, 65, 0.9);
}

.xuan-number-input {
  background: rgba(28, 28, 31, 0.95);
  border: 1px solid #3a3a3f;
  color: #c0aa6a;
  padding: 8px;
  width: 80px;
  margin-left: 10px;
}

.xuan-slider {
  width: 100%;
  margin-top: 10px;
  -webkit-appearance: none;
  background: rgba(40, 40, 45, 0.8);
  height: 4px;
  border-radius: 2px;
}

.xuan-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #c0aa6a;
  border-radius: 50%;
  cursor: pointer;
}

.xuan-button-group {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.xuan-btn {
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  background: rgba(40, 40, 45, 0.8);
  border: 1px solid #3a3a3f;
  color: #e7cc80;
  cursor: pointer;
  transition: all 0.3s;
}

.xuan-btn:hover {
  border-color: #c0aa6a;
  color: #c0aa6a;
}
</style>