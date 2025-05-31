<template>
  <GlobalLoading :is-loading="isWaiting" />
  <CustomAlert ref="customAlert" />
  <div class="page-container">
    <!-- 玄铁侧栏 -->
    <div class="sidebar">
      <div class="logo-container">
        <Logo/>
        <CloudUnderLogo style="margin-top: -25px;"/>
        <MenuBtn
            class="menu-btn"
            :class="{ 'hovered': isLogoHovered }"
            @mouseenter="isLogoHovered = true"
            @mouseleave="isLogoHovered = false"
            @click="toggleMethodsList"
        />
      </div>
      <div class="btn-group">
        <button class="btn" @click="resetConversation" title="重新开始">
          <span class="btn-origin-text">重劫</span>
          <span class="btn-new-text">重新开始</span>
        </button>
        <button class="btn" @click="router.back()" title="返回">
          <span class="btn-origin-text">遁形</span>
          <span class="btn-new-text">返回上页</span>
        </button>
        <button class="btn" @click="logout(router)" title="退出">
          <span class="btn-origin-text">归尘</span>
          <span class="btn-new-text">退出登录</span>
        </button>
      </div>
    </div>

    <!-- 主体 -->
    <div class="main-container">
      <!-- 打法历程列表 -->
      <div class="methods-list" v-if="isMethodsListVisible">
        <div class="list-title">
          <CloudBeforeList class="cloud-decoration" />
          <span class="title-text">修行历程</span>
        </div>
        <div class="methods-list-wrapper">
          <div class="progress-item" :class="{ active: !hasChosenStick }" @click="backToBasics">
            <div class="progress-title">棍法入门</div>
            <div class="progress-desc">基础三式选择</div>
          </div>
          <div class="progress-item" :class="{ active: hasChosenStick && !hasChosenSchool }" v-if="hasChosenStick" @click="backToStickSelection">
            <div class="progress-title">{{ chosenStickType }}修炼</div>
            <div class="progress-desc">流派传承学习</div>
          </div>
          <div class="progress-item" :class="{ active: hasChosenSchool && !hasStartedCombat }" v-if="hasChosenSchool" @click="backToSchoolTraining">
            <div class="progress-title">{{ chosenSchoolName }}</div>
            <div class="progress-desc">流派详解分析</div>
          </div>
           <div class="progress-item" :class="{ active: hasStartedCombat && !hasReachedAdvanced }" v-if="hasStartedCombat" @click="backToCombatTraining">
            <div class="progress-title">实战传授</div>
            <div class="progress-desc">招式技巧指导</div>
          </div>
          <div class="progress-item" :class="{ active: hasReachedAdvanced && !hasSelectedAdvancedSchool }" v-if="hasReachedAdvanced" @click="backToAdvancedSchools">
            <div class="progress-title">上层流派</div>
            <div class="progress-desc">高深武学研习</div>
          </div>
          <div class="progress-item" :class="{ active: hasSelectedAdvancedSchool }" v-if="hasSelectedAdvancedSchool" @click="backToAdvancedSchoolDetails">
            <div class="progress-title">{{ selectedAdvancedSchool }}</div>
            <div class="progress-desc">上层流派详解</div>
          </div>
        </div>
      </div>

      <!-- 打法对话区域 -->
      <div class="dialog-container">
        <!-- 头部 -->
        <div class="dialog-header">
          <div class="header-left">
            <CloudBeforeTitle />
            <span class="dialog-title">{{ dynamicTitle }}</span>
          </div>
        </div>

        <!-- 对话内容 -->
        <div class="dialog-content">
          <div
              v-for="(message, index) in conversationMessages"
              :key="index"
              :class="['message-container', message.role === 'USER' ? 'user' : 'rag']"
          >
            <!-- 头像 -->
            <div class="role-avatar">
              <Taiji v-if="message.role === 'RAG'" />
              <Jingu v-if="message.role === 'USER'" />
            </div>
            
            <!-- 消息内容 -->
            <div class="message-content-wrapper">
              <div class="message-bubble">
                <div class="message-text">
                  <span v-html="message.content"></span>
                  <span v-if="index === streamingMessageIndex && message.role === 'RAG'" class="streaming-cursor">|</span>
                </div>
                
                <!-- 功能选项区域 - 只在最后一条系统消息且显示完成后显示 -->
                <div v-if="message.role === 'RAG' && streamingMessageIndex === -1" class="action-options">
                  <div class="option-buttons">
                    <button class="option-btn" @click="openScripturePanel(index)">
                      <span class="option-text">查阅武学典籍秘录</span>
                      <span class="option-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="footer">
          <RedCloudLeft />
          <span> 如意随心 · 战法无双 </span>
          <RedCloudRight />
        </div>
      </div>
    </div>
        </div>

  <!-- 追问对话弹窗 -->
  <AchievementDialog
      :show="showQuestionDialog"
      :userAvatar="currentUser.avatarUrl || '/defaultAvatar.png'"
      @close="closeQuestionDialog"
  />

  <!-- 经书参悟右侧弹窗 -->
  <div class="scripture-panel-overlay" v-if="showScripturePanel" @click.self="closeScripturePanel">
    <div class="scripture-panel">
      <div class="scripture-header">
        <h3>武学经书 · 棍法秘籍</h3>
        <button class="close-button" @click="closeScripturePanel">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#e7cc80" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      
      <div class="scripture-content">
        <div class="scripture-scroll">
          <div v-if="scriptureContent" class="methods-container">
            <!-- 显示基础棍法打法 -->
            <div v-if="scriptureContent.messageType === 'welcome'" class="stick-method-section" v-for="method in scriptureContent.methods" :key="method.title">
              <h4>{{ method.title }}</h4>
              <div class="method-content">
                <div class="method-text">
                  <p>{{ method.description }}</p>
                  <p>{{ method.techniques }}</p>
                </div>
                <div class="method-video">
                  <video controls>
                    <source :src="method.videoUrl" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                </div>
    </div>
  </div>

            <!-- 显示流派说明 -->
            <div v-if="scriptureContent.messageType === 'school_recommendation'" class="school-detail-section" v-for="school in scriptureContent.schools" :key="school.name">
              <h4>{{ school.title }}</h4>
              <div class="school-content">
                <div class="school-text">
                  <p><strong>{{ school.name }}</strong></p>
                  <p>{{ school.description }}</p>
                  <div class="school-strategy">
                    <h5>修炼要诀：</h5>
                    <p>{{ school.strategy }}</p>
                  </div>
                </div>
                <div class="school-video">
                  <video controls>
                    <source :src="school.videoUrl" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              </div>
            </div>

            <!-- 显示流派攻略 -->
            <div v-if="scriptureContent.messageType === 'training_progress'" class="strategy-section" v-for="strategy in scriptureContent.strategies" :key="strategy.name">
              <h4>{{ strategy.title }}</h4>
              <div class="strategy-content">
                <div class="strategy-item">
                  <div class="strategy-text" v-html="strategy.talentPoints"></div>
                </div>
                <div class="strategy-item">
                  <div class="strategy-text" v-html="strategy.equipment"></div>
                </div>
                <div class="strategy-item">
                  <div class="strategy-text" v-html="strategy.operation"></div>
                </div>
                <div class="strategy-item">
                  <div class="strategy-text" v-html="strategy.tips"></div>
                </div>
              </div>
            </div>

            <!-- 显示实战演示 -->
            <div v-if="scriptureContent.messageType === 'combat_training'" class="combat-demo-section" v-for="demo in scriptureContent.combatDemos" :key="demo.name">
              <h4>{{ demo.title }}</h4>
              <div class="demo-content">
                <div class="demo-description">
                  <p><strong>{{ demo.name }}</strong></p>
                  <p>{{ demo.description }}</p>
                </div>
                
                <!-- 视频演示 -->
                <div class="demo-video">
                  <h5>实战演示视频</h5>
                  <video controls>
                    <source :src="demo.videoUrl" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              </div>
              
              <!-- 操作步骤 -->
              <div class="demo-steps">
                <h5>详细操作步骤</h5>
                <div class="steps-content" v-html="demo.operationSteps"></div>
              </div>
            </div>

            <!-- 显示上层流派秘籍 -->
            <div v-if="scriptureContent.messageType === 'advanced_schools'" class="advanced-school-section" v-for="method in scriptureContent.methods" :key="method.title">
              <h4>{{ method.title }}</h4>
              <div class="advanced-method-content">
                <!-- 修炼要诀和进阶心法并排显示 -->
                <div class="advanced-method-text-row">
                  <div class="description-section">
                    <h5>修炼要诀：</h5>
                    <div v-html="method.description.replace(/\n/g, '<br>')"></div>
                  </div>
                  <div class="techniques-section">
                    <h5>进阶心法：</h5>
                    <div v-html="method.techniques.replace(/\n/g, '<br>')"></div>
                  </div>
                </div>
                <!-- 视频单独一行 -->
                <div v-if="method.videoUrl" class="advanced-method-video-row">
                  <h5>实战演示视频</h5>
                  <video controls>
                    <source :src="method.videoUrl" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              </div>
            </div>

            <!-- 显示师父传承的最终秘籍 -->
            <div v-if="scriptureContent.messageType === 'advanced_school_details'" class="master-final-section" v-for="method in scriptureContent.methods" :key="method.title">
              <h4>{{ method.title }}</h4>
              <div class="master-final-description">
                <p>{{ method.description }}</p>
              </div>
              <div class="master-final-content" v-html="method.techniques"></div>
            </div>
          </div>
          <div v-else class="loading-content">
            <p>正在加载武学秘籍...</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 右下角固定按钮 -->
  <div class="floating-buttons">
    <button class="floating-button" title="返回顶部" @click="scrollToTop">
      <ScrollToTopIcon />
    </button>
    <button class="floating-button" title="问答助手" @click="openQuestionDialog">
      <ChatBot />
    </button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import Logo from '../../assets/icons/Logo.vue';
import CloudUnderLogo from "../../assets/icons/Clouds/Cloud-under-logo.vue";
import RedCloudLeft from "../../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../../assets/icons/Clouds/RedCloud-Right.vue";
import CloudBeforeTitle from "../../assets/icons/Clouds/Cloud-before-title.vue";
import CloudBeforeList from "../../assets/icons/Clouds/Cloud-before-list.vue";
import CustomAlert from "../../components/Dialog/CustomAlert.vue";
import GlobalLoading from '../../components/Dialog/GlobalLoading.vue';
import AchievementDialog from "../../components/Dialog/AchievementDialog.vue";
import MenuBtn from "../../assets/icons/MenuBtn.vue";
import Taiji from "../../assets/icons/Taiji.vue";
import Jingu from "../../assets/icons/Jingu.vue";
import {logout, showAlert} from "../../utils/GlobalFunction.ts";
import ScrollToTopIcon from "../../assets/icons/ScrollToTop.vue";
import ChatBot from "../../assets/icons/ChatBot.vue";
import {
  getWelcomeMessage,
  getSchoolRecommendation,
  isValidStickType,
  getScriptureContent,
  getAdvancedSchoolsContent,
  getAdvancedSchoolDetails,
  getDynamicTitle,
  type StickType,
  type ScriptureResponse,
  type MessageType,
  type ConversationMessage // 新增导入
} from "../../apis/playMethods.ts";

// ==================== 接口定义 ====================
interface ConversationMessage {
  role: 'RAG' | 'USER';
  content: string;
  timestamp: number;
  messageType?: 'welcome' | 'school_recommendation' | 'training_progress' | 'combat_training' | 'advanced_schools' | 'advanced_school_details'; // 新增：消息类型
  stickType?: StickType; // 新增：关联的棍法类型
}

// ==================== 变量声明 ====================
const currentUser = ref<any>([]);
const token = ref('');
const isWaiting = ref(false);
const router = useRouter();
const isLogoHovered = ref(false);
const isMethodsListVisible = ref(false);
const streamingMessageIndex = ref(-1);
const conversationMessages = ref<ConversationMessage[]>([]);
const customAlert = ref<any>(null);
const hasChosenStick = ref(false); // 是否已选择棍法
const chosenStickType = ref<StickType | ''>(''); // 选择的棍法类型
const hasChosenSchool = ref(false); // 是否已选择流派
const chosenSchoolName = ref(''); // 选择的流派名称
const hasStartedCombat = ref(false); // 是否已开始实战教学
const hasReachedAdvanced = ref(false); // 是否已进入上层流派阶段
const hasSelectedAdvancedSchool = ref(false); // 是否已选择上层流派
const selectedAdvancedSchool = ref(''); // 选择的上层流派名称

// 追问对话相关
const showQuestionDialog = ref(false);

// 经书参悟相关
const showScripturePanel = ref(false);
const scriptureContent = ref<ScriptureResponse['data'] | null>(null);

// ==================== 计算属性 ====================

/**
 * 动态标题
 */
const dynamicTitle = computed(() => {
  return getDynamicTitle(
    hasChosenStick.value,
    chosenStickType.value,
    hasChosenSchool.value,
    chosenSchoolName.value,
    hasStartedCombat.value,
    hasReachedAdvanced.value,
    hasSelectedAdvancedSchool.value,
    selectedAdvancedSchool.value
  );
});

// ==================== 函数声明 ====================

/**
 * 切换侧边栏显示状态
 */
const toggleMethodsList = () => {
  isMethodsListVisible.value = !isMethodsListVisible.value;
};

/**
 * 重置对话，重新开始
 */
const resetConversation = async () => {
  const confirmed = await customAlert.value?.show('天命人，是否确定重新开始修炼？此举将清除当前进度。', 1);
  if (confirmed) {
    conversationMessages.value = [];
    hasChosenStick.value = false;
    chosenStickType.value = '';
    hasChosenSchool.value = false;
    chosenSchoolName.value = '';
    hasStartedCombat.value = false;
    hasReachedAdvanced.value = false;
    hasSelectedAdvancedSchool.value = false;
    selectedAdvancedSchool.value = '';
    await startConversation();
  }
};

/**
 * 返回棍法入门阶段
 */
const backToBasics = async () => {
  const confirmed = await customAlert.value?.show('天命人，是否确定返回棍法入门重新修炼？', 1);
  if (confirmed) {
    // 重置所有状态
    hasChosenStick.value = false;
    chosenStickType.value = '';
    hasChosenSchool.value = false;
    chosenSchoolName.value = '';
    hasStartedCombat.value = false;
    
    // 找到欢迎消息，保留到那条消息
    const welcomeIndex = conversationMessages.value.findIndex(
      msg => msg.role === 'RAG' && msg.content.includes('你来了，天命人')
    );
    
    if (welcomeIndex !== -1) {
      // 保留到欢迎消息
      conversationMessages.value = conversationMessages.value.slice(0, welcomeIndex + 1);
    } else {
      // 如果没找到，重新开始
      conversationMessages.value = [];
      await startConversation();
    }
    
    scrollToBottom();
  }
};

/**
 * 返回到棍法选择阶段
 */
const backToStickSelection = async () => {
  const confirmed = await customAlert.value?.show(`天命人，是否确定返回${chosenStickType.value}修炼阶段？`, 1);
  if (confirmed) {
    // 重置流派选择状态
    hasChosenSchool.value = false;
    chosenSchoolName.value = '';
    hasStartedCombat.value = false;
    hasReachedAdvanced.value = false;
    hasSelectedAdvancedSchool.value = false;
    selectedAdvancedSchool.value = '';
    
    // 找到流派推荐消息，保留到那条消息
    const schoolRecommendationIndex = conversationMessages.value.findIndex(
      msg => msg.role === 'RAG' && (
        msg.content.includes('善哉！劈棍乃天罡正法') ||
        msg.content.includes('妙哉！立棍乃中庸至道') ||
        msg.content.includes('奇哉！截棍乃灵巧变化')
      )
    );
    
    if (schoolRecommendationIndex !== -1) {
      // 保留到流派推荐消息
      conversationMessages.value = conversationMessages.value.slice(0, schoolRecommendationIndex + 1);
    }
    
    scrollToBottom();
  }
};

/**
 * 返回到流派训练阶段
 */
const backToSchoolTraining = async () => {
  const confirmed = await customAlert.value?.show(`天命人，是否确定重新查看${chosenSchoolName.value}的修炼指导？`, 1);
  if (confirmed) {
    // 重置实战教学状态
    hasStartedCombat.value = false;
    hasReachedAdvanced.value = false;
    hasSelectedAdvancedSchool.value = false;
    selectedAdvancedSchool.value = '';
    
    // 找到修炼指导消息，保留到那条消息
    const trainingGuideIndex = conversationMessages.value.findIndex(
      msg => msg.role === 'RAG' && msg.content.includes('流派详解 ·')
    );
    
    if (trainingGuideIndex !== -1) {
      // 保留到修炼指导消息
      conversationMessages.value = conversationMessages.value.slice(0, trainingGuideIndex + 1);
    }
    
    scrollToBottom();
  }
};

/**
 * 返回到实战教学阶段
 */
const backToCombatTraining = async () => {
  const confirmed = await customAlert.value?.show(`天命人，是否确定重新查看${chosenSchoolName.value}的实战传授？`, 1);
  if (confirmed) {
    // 重置上层流派状态
    hasReachedAdvanced.value = false;
    hasSelectedAdvancedSchool.value = false;
    selectedAdvancedSchool.value = '';
    
    // 找到实战教学消息，保留到那条消息
    const combatTrainingIndex = conversationMessages.value.findIndex(
      msg => msg.role === 'RAG' && msg.content.includes('实战传授 ·')
    );
    
    if (combatTrainingIndex !== -1) {
      // 保留到实战教学消息
      conversationMessages.value = conversationMessages.value.slice(0, combatTrainingIndex + 1);
    }
    
    scrollToBottom();
  }
};

/**
 * 流式显示文字效果
 * @param text 要显示的文本
 * @param speed 显示速度（毫秒）
 * @param messageType 消息类型
 * @param stickType 棍法类型
 */
const typewriterEffect = (text: string, speed: number = 30, messageType?: MessageType, stickType?: StickType): Promise<void> => {
  return new Promise((resolve) => {
    // 添加新的系统消息
    const newMessage: ConversationMessage = {
      role: 'RAG',
      content: '',
      timestamp: Date.now(),
      messageType: messageType,
      stickType: stickType
    };
    
    conversationMessages.value.push(newMessage);
    const messageIndex = conversationMessages.value.length - 1;
    streamingMessageIndex.value = messageIndex;
    
    // 滚动到底部
    scrollToBottom();
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        conversationMessages.value[messageIndex].content += text[currentIndex];
        currentIndex++;
        // 每次更新内容后滚动到底部
        scrollToBottom();
      } else {
        clearInterval(timer);
        streamingMessageIndex.value = -1;
        scrollToBottom();
        resolve();
      }
    }, speed);
  });
};

/**
 * 处理棍法选择
 * @param choice 用户选择的棍法类型
 */
const handleStickChoice = async (choice: string) => {
  if (hasChosenStick.value) return; // 如果已选择，不允许重复选择
  
  if (!isValidStickType(choice)) {
    showAlert('无效的棍法选择', 0);
    return;
  }
  
  // 添加用户选择消息
  const userMessage: ConversationMessage = {
    role: 'USER',
    content: choice,
    timestamp: Date.now()
  };
  
  conversationMessages.value.push(userMessage);
  scrollToBottom();
  hasChosenStick.value = true;
  chosenStickType.value = choice;
  
  // 等待一下，然后获取流派推荐
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    const response = await getSchoolRecommendation(choice, hasChosenSchool.value, chosenSchoolName.value);
    if (response.success) {
      await typewriterEffect(response.data.content, 25, 'school_recommendation', choice);
    } else {
      showAlert('获取流派推荐失败，请重试', 0);
    }
  } catch (error) {
    console.error('获取流派推荐失败:', error);
    showAlert('系统繁忙，请稍后重试', 0);
  }
};

/**
 * 开始对话流程
 */
const startConversation = async () => {
  try {
    // 获取欢迎消息
    const response = await getWelcomeMessage(hasChosenStick.value);
    if (response.success) {
      await typewriterEffect(response.data.content, 25, response.data.messageType, chosenStickType.value as StickType);
    } else {
      showAlert('获取系统消息失败，请重试', 0);
    }
  } catch (error) {
    console.error('开始对话失败:', error);
    showAlert('系统繁忙，请稍后重试', 0);
  }
};

/**
 * 打开追问对话框
 */
const openQuestionDialog = () => {
  showQuestionDialog.value = true;
};

/**
 * 关闭追问对话框
 */
const closeQuestionDialog = () => {
  showQuestionDialog.value = false;
};

/**
 * 打开经书参悟面板
 * @param messageIndex 点击的消息索引，用于确定显示哪种秘籍
 */
const openScripturePanel = async (messageIndex?: number) => {
  showScripturePanel.value = true;
  
  try {
    let response: ScriptureResponse;
    
    if (messageIndex !== undefined && messageIndex < conversationMessages.value.length) {
      // 根据点击的消息类型获取对应的秘籍内容
      const message = conversationMessages.value[messageIndex];
      const messageType = message.messageType || 'welcome';
      const stickType = message.stickType;
      
      // 如果是第三阶段（training_progress）或第四阶段（combat_training），需要传递流派名称
      if ((messageType === 'training_progress' || messageType === 'combat_training') && chosenSchoolName.value) {
        response = await getScriptureContent(messageType, stickType, chosenSchoolName.value);
      } else {
        response = await getScriptureContent(messageType, stickType);
      }
    } else {
      // 默认获取基础秘籍
      response = await getScriptureContent('welcome');
    }
    
    if (response.success) {
      scriptureContent.value = response.data;
    } else {
      showAlert('获取武学秘籍失败，请重试', 0);
    }
  } catch (error) {
    console.error('获取武学秘籍失败:', error);
    showAlert('获取武学秘籍失败，请重试', 0);
  }
};

/**
 * 关闭经书参悟面板
 */
const closeScripturePanel = () => {
  showScripturePanel.value = false;
};

/**
 * 滚动到顶部
 */
const scrollToTop = () => {
  const dialogContent = document.querySelector('.dialog-content');
  if (dialogContent) {
    dialogContent.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

/**
 * 自动滚动到底部
 */
const scrollToBottom = () => {
  const dialogContent = document.querySelector('.dialog-content');
  if (dialogContent) {
    setTimeout(() => {
      dialogContent.scrollTo({
        top: dialogContent.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }
};

/**
 * 处理流派选择
 * @param schoolName 选择的流派名称
 */
const handleSchoolChoice = async (schoolName: string) => {
  if (hasChosenSchool.value) return; // 如果已选择，不允许重复选择
  
  // 添加用户选择消息
  const userMessage: ConversationMessage = {
    role: 'USER',
    content: schoolName,
    timestamp: Date.now()
  };
  
  conversationMessages.value.push(userMessage);
  scrollToBottom();
  hasChosenSchool.value = true;
  chosenSchoolName.value = schoolName;
  
  // 等待一下，然后显示合并的回复（确认+流派详解）
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const trainingGuide = getTrainingGuide(schoolName);
  const combinedText = `极好！你已选择修炼 ${schoolName}。此流派精深莫测，需日夜苦练方可有成。记住，武学修行在于悟性，不在于速度。<br><br>现在，你的修炼之路正式开始！愿你能在此道上有所突破，成就一代宗师！<br><br>${trainingGuide}`;
  
  await typewriterEffect(combinedText, 25, 'training_progress', chosenStickType.value);
};

/**
 * 开始实战教学
 * @param schoolName 流派名称
 */
const startCombatTraining = async (schoolName: string) => {
  if (hasStartedCombat.value) return; // 如果已开始，不允许重复开始
  
  // 添加用户选择消息
  const userMessage: ConversationMessage = {
    role: 'USER',
    content: '开始实战传授',
    timestamp: Date.now()
  };
  
  conversationMessages.value.push(userMessage);
  scrollToBottom();
  hasStartedCombat.value = true;
  
  // 等待一下，然后开始实战教学
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const combatText = getCombatTrainingContent(schoolName);
  await typewriterEffect(combatText, 25, 'combat_training', chosenStickType.value);
};

/**
 * 获取实战教学内容
 * @param schoolName 流派名称
 * @returns 实战教学内容
 */
const getCombatTrainingContent = (schoolName: string): string => {
  const combatGuides: Record<string, string> = {
    '禁字劈棍流': `
      <strong>实战传授 · 禁字劈棍流</strong><br><br>
      
      老夫现在亲自传授你禁字劈棍的实战技巧：<br><br>
      
      <strong>秒杀boss具体操作方法：</strong><br>
      在开启禁字诀前装备所有加法力的装备（百目真人、雷火印、定颜珠）把法力堆到最高，然后开启禁字诀转化属性，再穿上加暴击、攻击和伤害的（不能、兽与佛、白贝腰链、猫晴宝串）然后喝酒触发毒伤效果。此时我的面板来到了攻击435，暴击率95%，暴击伤害210%，接下来就可以去尽情的秒杀boss啦！<br><br>
      
      <strong>详细操作流程：</strong><br>
      先喝药触发中毒配合蘑菇头实现自杀触发救命毫毛增伤以及定颜珠的返魂加三维然后服用朝元膏，益气膏，聚珍伏虎丸和龙光倍力丸，随后等死开不屈复活，然后喝掉一口药，触发五鬼葫芦，又喝完妙仙葫芦剩一口，触发乾坤彩葫芦，开背包五鬼葫芦换妙仙葫芦，朝元膏换加味参势丸开百目加蓝上限，触发金身两件套吃加味参势丸。<br><br>
      
      再开背包，蘑菇头换长嘴脸金身绣衫，换严火绣衫金身护臂，换厌火护臂，喝药触发妙仙葫芦禁字法，三个雷火印朝元膏定颜珠，加的蓝量上限全部转化为攻击力的同时，触发气味相投，百目换不能长嘴脸，换夜叉面三个雷火印，换三个兽与佛定颜珠，换白贝腰链。<br><br>
      
      <strong>最终步骤：</strong><br>
      最后一口药触发乾坤彩葫芦和龙膏，使用四段蓄力，释放劈棍，反复练习直到熟练为止。<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成${schoolName}的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.restartFromFoundation()">重铸根基</span>
      <span class="advanced-school-btn" onclick="window.exploreAdvancedSchools()">研习上层流派</span>
    `,
    '隐身劈棍流': `
      <strong>实战传授 · 隐身劈棍流</strong><br><br>
      
      老夫现在亲自传授你隐身劈棍的实战技巧：<br><br>
      
      <strong>第一式 - 隐身潜行：</strong><br>
      战斗开始即刻隐身，绕到敌人身后。如鬼魅般无声无息，让敌人摸不着你的位置。<br><br>
      
      <strong>第二式 - 暗袭重击：</strong><br>
      趁敌不备，从暗中发动致命一击。背刺暴击，一击毙命！<br><br>
      
      <strong>第三式 - 影分身术：</strong><br>
      若一击未果，立即分身迷惑敌人，再次寻找机会。身形如风，变化莫测！<br><br>
      
      <strong>实战要诀：</strong><br>
      暗影中的猎手，永远不要正面硬刚。刺客的荣耀在于一击必杀！<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成${schoolName}的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.restartFromFoundation()">重铸根基</span>
      <span class="advanced-school-btn" onclick="window.exploreAdvancedSchools()">研习上层流派</span>
    `,
    '花棍劈棍流': `
      <strong>实战传授 · 花棍劈棍流</strong><br><br>
      
      老夫现在亲自传授你花棍劈棍的实战技巧：<br><br>
      
      <strong>第一式 - 花棍开场：</strong><br>
      以华丽的棍花开场，迷惑敌人视线。让敌人分不清哪一击是真，哪一击是假。<br><br>
      
      <strong>第二式 - 连环劈砸：</strong><br>
      趁敌人眼花缭乱之际，发动连续劈击。虽单次伤害不高，但连击可观！<br><br>
      
      <strong>第三式 - 眩晕终结：</strong><br>
      在连击的最后，施展"眩晕劈击"，让敌人短暂失去战斗能力。<br><br>
      
      <strong>实战要诀：</strong><br>
      华丽即是力量！让你的招式如花般绚烂，如雷般威猛！<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成${schoolName}的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.restartFromFoundation()">重铸根基</span>
      <span class="advanced-school-btn" onclick="window.exploreAdvancedSchools()">研习上层流派</span>
    `,
    '安身立棍流': `
      <strong>实战传授 · 安身立棍流</strong><br><br>
      
      老夫现在亲自传授你安身立棍的实战技巧：<br><br>
      
      <strong>第一式 - 铁壁防御：</strong><br>
      战斗中保持防御姿态，如山岳般不动。让敌人的攻击如泥牛入海。<br><br>
      
      <strong>第二式 - 回血养生：</strong><br>
      在防御的同时运转内功，持续恢复生命力。时间是你的盟友！<br><br>
      
      <strong>第三式 - 反击立击：</strong><br>
      待敌人力竭之时，发动强力反击。以静制动，后发制人！<br><br>
      
      <strong>实战要诀：</strong><br>
      稳如泰山，动如雷震！防守反击，是为王道！<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成${schoolName}的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.restartFromFoundation()">重铸根基</span>
      <span class="advanced-school-btn" onclick="window.exploreAdvancedSchools()">研习上层流派</span>
    `,
    '隐身立棍流': `
      <strong>实战传授 · 隐身立棍流</strong><br><br>
      
      老夫现在亲自传授你隐身立棍的实战技巧：<br><br>
      
      <strong>第一式 - 隐身防御：</strong><br>
      在隐身状态下保持防御，敌人无法锁定你的位置，攻击自然落空。<br><br>
      
      <strong>第二式 - 幻影立击：</strong><br>
      瞬间现身发动立棍攻击，然后立即隐身。让敌人防不胜防！<br><br>
      
      <strong>第三式 - 分身立阵：</strong><br>
      召唤分身形成防御阵型，本体隐身伺机而动。虚实难辨！<br><br>
      
      <strong>实战要诀：</strong><br>
      虚无缥缈，攻守兼备。让敌人永远猜不透你的下一步！<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成${schoolName}的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.restartFromFoundation()">重铸根基</span>
      <span class="advanced-school-btn" onclick="window.exploreAdvancedSchools()">研习上层流派</span>
    `,
    '戳棍搅棍流': `
      <strong>实战传授 · 戳棍搅棍流</strong><br><br>
      
      老夫现在亲自传授你戳棍搅棍的实战技巧：<br><br>
      
      <strong>第一式 - 连环戳击：</strong><br>
      如疾风骤雨般的连续戳击，速度即是力量！不给敌人任何喘息机会。<br><br>
      
      <strong>第二式 - 搅棍旋风：</strong><br>
      棍身旋转形成范围攻击，清扫周围敌人。一棍横扫八方！<br><br>
      
      <strong>第三式 - 穿刺突进：</strong><br>
      积满棍势后发动穿刺突进，如赵云般七进七出，势不可挡！<br><br>
      
      <strong>实战要诀：</strong><br>
      快如闪电，猛如龙卷！在敌人反应过来之前就结束战斗！<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成${schoolName}的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.restartFromFoundation()">重铸根基</span>
      <span class="advanced-school-btn" onclick="window.exploreAdvancedSchools()">研习上层流派</span>
    `,
    '退寸进尺流': `
      <strong>实战传授 · 退寸进尺流</strong><br><br>
      
      老夫现在亲自传授你退寸进尺的实战技巧：<br><br>
      
      <strong>第一式 - 闪避后退：</strong><br>
      精准预判敌人攻击，提前后撤闪避。让敌人的攻击扑空！<br><br>
      
      <strong>第二式 - 距离控制：</strong><br>
      始终保持最佳战斗距离，既不被近身，也不失去攻击机会。<br><br>
      
      <strong>第三式 - 进尺反击：</strong><br>
      在敌人攻击落空的瞬间，立即进攻反击。以退为进，后发制人！<br><br>
      
      <strong>实战要诀：</strong><br>
      退一寸是为了进一尺！时机就是一切，把握住每一个反击机会！<br><br>
      
      <em style="color: #c0aa6a;">恭喜！你已完成${schoolName}的完整修炼！</em><br><br>
      
      <span class="foundation-btn" onclick="window.restartFromFoundation()">重铸根基</span>
      <span class="advanced-school-btn" onclick="window.exploreAdvancedSchools()">研习上层流派</span>
    `
  };
  
  return combatGuides[schoolName] || '此流派的实战传授暂未收录，请向师父请教。';
};

/**
 * 获取具体流派的修炼指导
 * @param schoolName 流派名称
 * @returns 修炼指导内容
 */
const getTrainingGuide = (schoolName: string): string => {
  const trainingGuides: Record<string, string> = {
    '禁字劈棍流': `
      <strong>流派详解 · 禁字劈棍流</strong><br><br>
      
      <strong>难度系数：</strong> ⭐⭐⭐⭐ (较高)<br>
      <strong>修炼效率：</strong> ⭐⭐⭐⭐⭐ (极高)<br><br>
      
      <strong>流派优点：</strong><br>
      • 用机制换数值，低周目boss血皮薄，很容易被这套乱拳打死<br><br>
      
      <strong>流派缺点：</strong><br>
      •失去大部分保命手段，自身非常脆<br>
      • 打高周目boss时，无法莽死boss，又没在低周目吸取足够经验，会导致容易坐牢<br><br>
      
      <strong>具体功法：</strong><br>
      详细招式秘要请查阅《禁字劈棍心法》密卷<br><br>
      
      <span class="combat-training-btn" onclick="window.startCombatTraining('禁字劈棍流')">开始实战传授</span>
    `,
    '隐身劈棍流': `
      <strong>流派详解 · 隐身劈棍流</strong><br><br>
      
      <strong>难度系数：</strong> ⭐⭐⭐⭐⭐ (极高)<br>
      <strong>修炼效率：</strong> ⭐⭐⭐⭐ (高)<br><br>
      
      <strong>流派优点：</strong><br>
      • 身法诡异，难以捉摸<br>
      • 偷袭能力强，暴击率高<br>
      • 逃脱能力出众<br><br>
      
      <strong>流派缺点：</strong><br>
      • 修炼难度极高<br>
      • 正面硬刚能力不足<br>
      • 对心法要求严苛<br><br>
      
      <strong>具体功法：</strong><br>
      详细招式秘要请查阅《隐身劈棍心法》密卷<br><br>
      
      <span class="combat-training-btn" onclick="window.startCombatTraining('隐身劈棍流')">开始实战传授</span>
    `,
    '花棍劈棍流': `
      <strong>流派详解 · 花棍劈棍流</strong><br><br>
      
      <strong>难度系数：</strong> ⭐⭐⭐ (中等)<br>
      <strong>修炼效率：</strong> ⭐⭐⭐ (中等)<br><br>
      
      <strong>流派优点：</strong><br>
      • 招式华丽，观赏性强<br>
      • 连击能力出色<br>
      • 上手相对容易<br><br>
      
      <strong>流派缺点：</strong><br>
      • 华而不实，杀伤力一般<br>
      • 容易被看破招式<br>
      • 消耗体力较大<br><br>
      
      <strong>具体功法：</strong><br>
      详细招式秘要请查阅《花棍劈棍心法》密卷<br><br>
      
      <span class="combat-training-btn" onclick="window.startCombatTraining('花棍劈棍流')">开始实战传授</span>
    `,
    '安身立棍流': `
      <strong>流派详解 · 安身立棍流</strong><br><br>
      
      <strong>难度系数：</strong> ⭐⭐ (较低)<br>
      <strong>修炼效率：</strong> ⭐⭐⭐⭐ (高)<br><br>
      
      <strong>流派优点：</strong><br>
      • 防御力强，生存能力出众<br>
      • 回血能力强，持续作战佳<br>
      • 适合新手，稳扎稳打<br><br>
      
      <strong>流派缺点：</strong><br>
      • 攻击力相对较低<br>
      • 战斗节奏较慢<br>
      • 缺乏爆发力<br><br>
      
      <strong>具体功法：</strong><br>
      详细招式秘要请查阅《安身立棍心法》密卷<br><br>
      
      <span class="combat-training-btn" onclick="window.startCombatTraining('安身立棍流')">开始实战传授</span>
    `,
    '隐身立棍流': `
      <strong>流派详解 · 隐身立棍流</strong><br><br>
      
      <strong>难度系数：</strong> ⭐⭐⭐⭐ (较高)<br>
      <strong>修炼效率：</strong> ⭐⭐⭐⭐ (高)<br><br>
      
      <strong>流派优点：</strong><br>
      • 攻守兼备，变化莫测<br>
      • 隐身能力强，战术灵活<br>
      • 反击伤害高<br><br>
      
      <strong>流派缺点：</strong><br>
      • 修炼难度较高<br>
      • 需要时机把握准确<br>
      • 法力消耗较大<br><br>
      
      <strong>具体功法：</strong><br>
      详细招式秘要请查阅《隐身立棍心法》密卷<br><br>
      
      <span class="combat-training-btn" onclick="window.startCombatTraining('隐身立棍流')">开始实战传授</span>
    `,
    '戳棍搅棍流': `
      <strong>流派详解 · 戳棍搅棍流</strong><br><br>
      
      <strong>难度系数：</strong> ⭐⭐⭐ (中等)<br>
      <strong>修炼效率：</strong> ⭐⭐⭐⭐⭐ (极高)<br><br>
      
      <strong>流派优点：</strong><br>
      • 攻速极快，连击能力强<br>
      • 机动性强，进退自如<br>
      • 棍势积累快<br><br>
      
      <strong>流派缺点：</strong><br>
      • 单次伤害较低<br>
      • 需要贴身作战<br>
      • 对走位要求高<br><br>
      
      <strong>具体功法：</strong><br>
      详细招式秘要请查阅《戳棍搅棍心法》密卷<br><br>
      
      <span class="combat-training-btn" onclick="window.startCombatTraining('戳棍搅棍流')">开始实战传授</span>
    `,
    '退寸进尺流': `
      <strong>流派详解 · 退寸进尺流</strong><br><br>
      
      <strong>难度系数：</strong> ⭐⭐⭐⭐ (较高)<br>
      <strong>修炼效率：</strong> ⭐⭐⭐ (中等)<br><br>
      
      <strong>流派优点：</strong><br>
      • 闪避能力强，不易受伤<br>
      • 反击伤害高<br>
      • 距离控制精准<br><br>
      
      <strong>流派缺点：</strong><br>
      • 需要精准时机判断<br>
      • 主动攻击能力弱<br>
      • 对反应速度要求高<br><br>
      
      <strong>具体功法：</strong><br>
      详细招式秘要请查阅《退寸进尺心法》密卷<br><br>
      
      <span class="combat-training-btn" onclick="window.startCombatTraining('退寸进尺流')">开始实战传授</span>
    `
  };
  
  return trainingGuides[schoolName] || '此流派的修炼指导暂未收录，请向师父请教。';
};

/**
 * 重铸根基，返回第一阶段
 */
const restartFromFoundation = async () => {
  const confirmed = await customAlert.value?.show('天命人，是否确定重铸根基？这将清除所有修炼进度，从基础棍法重新开始。', 1);
  if (confirmed) {
    // 重置所有状态
    hasChosenStick.value = false;
    chosenStickType.value = '';
    hasChosenSchool.value = false;
    chosenSchoolName.value = '';
    hasStartedCombat.value = false;
    hasReachedAdvanced.value = false;
    hasSelectedAdvancedSchool.value = false;
    selectedAdvancedSchool.value = '';
    
    // 找到欢迎消息，保留到那条消息
    const welcomeIndex = conversationMessages.value.findIndex(
      msg => msg.role === 'RAG' && msg.content.includes('你来了，天命人')
    );
    
    if (welcomeIndex !== -1) {
      // 保留到欢迎消息
      conversationMessages.value = conversationMessages.value.slice(0, welcomeIndex + 1);
    } else {
      // 如果没找到，重新开始
      conversationMessages.value = [];
      await startConversation();
    }
    
    scrollToBottom();
  }
};

/**
 * 获取上层流派介绍内容
 */
const getAdvancedSchoolsContent = (): string => {
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
 * 返回到上层流派阶段
 */
const backToAdvancedSchools = async () => {
  const confirmed = await customAlert.value?.show('天命人，是否确定重新查看上层流派的介绍？', 1);
  if (confirmed) {
    // 重置第六阶段状态
    hasSelectedAdvancedSchool.value = false;
    selectedAdvancedSchool.value = '';
    
    // 找到上层流派消息，保留到那条消息
    const advancedSchoolsIndex = conversationMessages.value.findIndex(
      msg => msg.role === 'RAG' && msg.content.includes('上层流派传承')
    );
    
    if (advancedSchoolsIndex !== -1) {
      // 保留到上层流派消息
      conversationMessages.value = conversationMessages.value.slice(0, advancedSchoolsIndex + 1);
    }
    
    scrollToBottom();
  }
};

/**
 * 研习上层流派，进入第五阶段
 */
const exploreAdvancedSchools = async () => {
  if (hasReachedAdvanced.value) return; // 如果已进入，不允许重复进入
  
  // 添加用户选择消息
  const userMessage: ConversationMessage = {
    role: 'USER',
    content: '研习上层流派',
    timestamp: Date.now()
  };
  
  conversationMessages.value.push(userMessage);
  scrollToBottom();
  hasReachedAdvanced.value = true;
  
  // 等待一下，然后显示上层流派介绍
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const advancedSchoolsContent = getAdvancedSchoolsContent();
  await typewriterEffect(advancedSchoolsContent, 25, 'advanced_schools', chosenStickType.value);
};

/**
 * 选择上层流派，进入第六阶段
 * @param schoolName 选择的上层流派名称
 */
const selectAdvancedSchool = async (schoolName: string) => {
  if (hasSelectedAdvancedSchool.value) return; // 如果已选择，不允许重复选择
  
  // 添加用户选择消息
  const userMessage: ConversationMessage = {
    role: 'USER',
    content: schoolName,
    timestamp: Date.now()
  };
  
  conversationMessages.value.push(userMessage);
  scrollToBottom();
  hasSelectedAdvancedSchool.value = true;
  selectedAdvancedSchool.value = schoolName;
  
  // 等待一下，然后显示上层流派详情
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const advancedSchoolDetails = getAdvancedSchoolDetails(schoolName);
  await typewriterEffect(advancedSchoolDetails, 25, 'advanced_school_details', chosenStickType.value);
};

/**
 * 获取上层流派详情
 * @param schoolName 流派名称
 * @returns 流派详情内容
 */
const getAdvancedSchoolDetails = (schoolName: string): string => {
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
 * 返回到上层流派详情
 */
const backToAdvancedSchoolDetails = async () => {
  const confirmed = await customAlert.value?.show(`天命人，是否确定重新查看${selectedAdvancedSchool.value}的详细介绍？`, 1);
  if (confirmed) {
    // 找到上层流派详情消息，保留到那条消息
    const advancedSchoolDetailsIndex = conversationMessages.value.findIndex(
      msg => msg.role === 'RAG' && msg.content.includes('上层流派详解 ·')
    );
    
    if (advancedSchoolDetailsIndex !== -1) {
      // 保留到上层流派详情消息
      conversationMessages.value = conversationMessages.value.slice(0, advancedSchoolDetailsIndex + 1);
    }
    
    scrollToBottom();
  }
};

/**
 * 开启二周目，回到第一阶段
 */
const startNewCycle = async () => {
  const confirmed = await customAlert.value?.show('天命人，武学已达巅峰，是否开启二周目重新修炼？此举将清除所有修炼进度，从棍法入门重新开始。', 1);
  if (confirmed) {
    // 重置所有状态到初始状态
    conversationMessages.value = [];
    hasChosenStick.value = false;
    chosenStickType.value = '';
    hasChosenSchool.value = false;
    chosenSchoolName.value = '';
    hasStartedCombat.value = false;
    hasReachedAdvanced.value = false;
    hasSelectedAdvancedSchool.value = false;
    selectedAdvancedSchool.value = '';
    
    // 重新开始对话
    await startConversation();
  }
};

/**
 * 功成身退，返回主页面
 */
const returnToMainPage = async () => {
  const confirmed = await customAlert.value?.show('天命人，武学修炼已臻化境，是否功成身退返回江湖？', 1);
  if (confirmed) {
    router.push('/rag-user');
  }
};

// 界面初始化加载
onMounted(async () => {
  try {
    // 判断用户是否登录
    if (localStorage.getItem('userProfile')) {
      currentUser.value = JSON.parse(localStorage.getItem('userProfile') || '');
      token.value = localStorage.getItem('token') || '';
      
      // 将选择处理函数挂载到window对象，供HTML调用
      (window as any).handleStickChoice = handleStickChoice;
      (window as any).handleSchoolChoice = handleSchoolChoice;
      (window as any).startCombatTraining = startCombatTraining;
      (window as any).restartFromFoundation = restartFromFoundation;
      (window as any).exploreAdvancedSchools = exploreAdvancedSchools;
      (window as any).selectAdvancedSchool = selectAdvancedSchool;
      (window as any).startNewCycle = startNewCycle;
      (window as any).returnToMainPage = returnToMainPage;
      
      // 直接开始对话，不需要加载动画
      await startConversation();
      
    } else {
      showAlert('天命人，请您先去登录，再来修行武学吧', 0).then(() => {
        router.push('/account');
      });
    }
  } catch(error) {
    console.error(error);
    showAlert('初始化失败，请重试', 0);
  }
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');

/* 全局样式 */
input, button {
  font-family: 'Ma Shan Zheng', cursive;
}

/* 页面整体样式 */
.page-container {
  display: flex;
  background: linear-gradient(to right, #1a1a1d 0%, #0a0a0c 100%);
  font-family: 'Ma Shan Zheng', cursive;
  height: 100vh;
  overflow: hidden;

  /* 侧边栏样式 */
  .sidebar {
    width: 80px;
    background: rgba(18, 18, 20, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-right: 1px solid #3a3a3f;
    box-shadow: 3px 0 15px rgba(0,0,0,0.5);

    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .menu-btn {
        background: #37373d;
        border: #d3b479 1.5px solid;
        padding: 10px;
        border-radius: 30%;
        cursor: pointer;
        margin-top: 30px;

        :deep(path) {
          transition: fill 0.3s ease;
          fill: #d3b479;
        }

        &.hovered :deep(path) {
          fill: white;
        }
      }
    }

    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 25px;

      .btn {
        width: 50px;
        height: 50px;
        border-radius: 30%;
        background: #37373d;
        font-family: 'Ma Shan Zheng', cursive;
        color: #e7cc80;
        font-size: 14px;
        font-weight: bold;
        border: 1.5px solid #d3b479;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;

        &:hover {
          transform: scale(1.2);
          border-color: #c0aa6a;
        }

        &:hover .btn-origin-text {
          opacity: 0;
        }

        &:hover .btn-new-text {
          opacity: 1;
        }

        .btn-new-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.1s ease;
          font-size: 11px;
        }
      }
    }
  }

  /* 主容器样式 */
  .main-container {
    flex: 1;
    display: flex;

    /* 侧边列表样式 */
    .methods-list {
      width: 250px;
      background-image: url('/dragon.png');
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: 50px;
      border-right: 1px solid #3a3a3f;
      padding: 15px 20px 20px;

      .list-title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        position: relative;
        padding: 12px 0;
        border-bottom: 2px solid #c0aa6a;

        .title-text {
          font-size: 20px;
          color: #d3b479;
          text-shadow: 0 0 8px rgba(192, 170, 106, 0.3);
          margin: 0 10px;
          position: relative;
          font-family: 'Ma Shan Zheng', cursive;
        }
      }

      .methods-list-wrapper {
        .progress-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          margin-bottom: 10px;
          background: rgba(40, 40, 45, 0.8);
          border: 1px solid #5a5a5f;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background: rgba(80, 80, 85, 0.8);
            transform: translateY(-2px);
          }

          &.active {
            background: rgba(192, 170, 106, 0.2);
            border-color: #c0aa6a;

            .progress-title {
            color: #d3b479;
            }

            .progress-desc {
              color: #d3b479;
            }
          }

          .progress-title {
            font-size: 18px;
            color: #8a8a8f;
            margin-bottom: 5px;
          }

          .progress-desc {
            font-size: 14px;
            color: #7a7a7f;
          }
        }
      }
    }

    /* 对话容器样式 */
    .dialog-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 30px;

      /* 对话头部 */
      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .header-left {
          display: flex;
          align-items: center;
          gap: 10px;

          .dialog-title {
            font-size: 22px;
            letter-spacing: 2px;
            color: #d3b479;
            border-bottom: 2px solid #c0aa6a;
            padding-bottom: 10px;
            text-shadow: 0 0 10px rgba(192, 170, 106, 0.4);
          }
        }
      }

      /* 对话内容区域 */
      .dialog-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        border: 1px solid #3a3a3f;
        border-radius: 8px;
        background: rgba(20, 20, 25, 0.6);
        margin-bottom: 20px;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }

        /* 消息容器 */
        .message-container {
          display: flex;
          margin-bottom: 30px;
          align-items: flex-start;

          /* 用户消息靠右 */
          &.user {
            flex-direction: row-reverse;

            .message-content-wrapper {
              margin-right: 15px;
              margin-left: 60px;

              .message-bubble {
                background: rgba(192, 170, 106, 0.2);
                border: 1px solid #c0aa6a;
              }
            }
          }

          /* 系统消息靠左 */
          &.rag {
            .message-content-wrapper {
              margin-left: 15px;
              margin-right: 60px;

              .message-bubble {
                background: rgba(60, 60, 65, 0.8);
        border: 1px solid #3a3a3f;
              }
            }
          }

          /* 角色头像 */
          .role-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(145deg, #c0aa6a 20%, #7a6a4a 80%);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #3a3a3f;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            flex-shrink: 0;
          }

          /* 消息内容包装器 */
          .message-content-wrapper {
            flex: 1;

            .message-bubble {
              padding: 15px 20px;
              border-radius: 15px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.3);

              .message-text {
                color: #d3b479;
                font-size: 16px;
                line-height: 1.6;
                word-break: break-word;

                /* 流式光标 */
                .streaming-cursor {
                  animation: blink 1s infinite;
                  color: #c0aa6a;
                  font-weight: bold;
                }

                /* 选择选项样式 */
                :deep(.choice-option) {
                  color: #f6d596;
                  font-weight: bold;
                  font-size: 18px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  text-shadow: 0 0 5px rgba(246, 213, 150, 0.5);
                  border-bottom: 2px solid #f6d596;
                  padding: 2px 8px;
                  margin: 0 5px;
                  border-radius: 4px;

                  &:hover {
                    color: #ffffff;
                    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
                    background: rgba(246, 213, 150, 0.2);
                    border-bottom-color: #ffffff;
                    transform: scale(1.05);
                  }

                  &.disabled {
                    color: #a89c7c;
                    cursor: not-allowed;
                    text-shadow: none;
                    opacity: 0.6;
                    border-bottom-color: #a89c7c;

                    &:hover {
                      color: #a89c7c;
                      text-shadow: none;
                      background: none;
                      border-bottom-color: #a89c7c;
                      transform: none;
                    }
                  }
                }

                /* 流派选择按钮样式 */
                :deep(.school-option) {
                  color: #e7cc80;
                  font-weight: bold;
                  font-size: 16px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  text-shadow: 0 0 5px rgba(231, 204, 128, 0.5);
                  border-bottom: 2px solid #e7cc80;
                  padding: 2px 6px;
                  margin: 0 3px;
                  border-radius: 3px;

                  &:hover {
                    color: #fada9b;
                    text-shadow: 0 0 12px rgba(250, 218, 155, 0.8);
                    background: rgba(231, 204, 128, 0.2);
                    border-bottom-color: #fada9b;
                    transform: scale(1.05);
                  }

                  &.disabled {
                    color: #a89c7c;
                    cursor: not-allowed;
                    text-shadow: none;
                    opacity: 0.6;
                    border-bottom-color: #a89c7c;

                    &:hover {
                      color: #a89c7c;
                      text-shadow: none;
                      background: none;
                      border-bottom-color: #a89c7c;
                      transform: none;
                    }
                  }
                }

                /* 实战教学按钮样式 */
                :deep(.combat-training-btn) {
                  display: inline-block;
                  color: #fada9b;
                  font-weight: bold;
                  font-size: 16px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  text-shadow: 0 0 8px rgba(250, 218, 155, 0.6);
                  background: linear-gradient(145deg, rgba(192, 170, 106, 0.3), rgba(250, 218, 155, 0.2));
                  border: 2px solid #fada9b;
                  padding: 8px 16px;
        border-radius: 8px;
                  margin-top: 10px;

                  &:hover {
                    color: #ffffff;
                    text-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
                    background: linear-gradient(145deg, rgba(250, 218, 155, 0.4), rgba(255, 255, 255, 0.2));
                    border-color: #ffffff;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(250, 218, 155, 0.3);
                  }
                }

                /* 重铸根基按钮样式 */
                :deep(.foundation-btn) {
                  display: inline-block;
                  color: #e7cc80;
                  font-weight: bold;
                  font-size: 14px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  text-shadow: 0 0 6px rgba(231, 204, 128, 0.5);
                  background: linear-gradient(145deg, rgba(180, 150, 90, 0.3), rgba(200, 170, 110, 0.2));
                  border: 2px solid #e7cc80;
                  padding: 6px 12px;
                  border-radius: 6px;
                  margin: 0 8px 0 0;

                  &:hover {
                    color: #f5e1a8;
                    text-shadow: 0 0 12px rgba(245, 225, 168, 0.8);
                    background: linear-gradient(145deg, rgba(200, 170, 110, 0.4), rgba(220, 190, 130, 0.2));
                    border-color: #f5e1a8;
                    transform: translateY(-1px);
                    box-shadow: 0 3px 8px rgba(231, 204, 128, 0.3);
                  }
                }

                /* 研习上层流派按钮样式 */
                :deep(.advanced-school-btn) {
                  display: inline-block;
                  color: #fada9b;
                  font-weight: bold;
                  font-size: 14px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  text-shadow: 0 0 8px rgba(250, 218, 155, 0.6);
                  background: linear-gradient(145deg, rgba(220, 190, 130, 0.3), rgba(250, 218, 155, 0.2));
                  border: 2px solid #fada9b;
                  padding: 6px 12px;
                  border-radius: 6px;

                  &:hover {
                    color: #ffffff;
                    text-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
                    background: linear-gradient(145deg, rgba(250, 218, 155, 0.4), rgba(255, 255, 255, 0.2));
                    border-color: #ffffff;
                    transform: translateY(-1px);
                    box-shadow: 0 3px 10px rgba(250, 218, 155, 0.4);
                  }
                }

                /* 上层流派选择按钮样式 */
                :deep(.advanced-school-option) {
                  color: #f6d596;
                  font-weight: bold;
                  font-size: 18px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  text-shadow: 0 0 6px rgba(246, 213, 150, 0.6);
                  border-bottom: 2px solid #f6d596;
                  padding: 3px 8px;
                  margin: 0 5px;
                  border-radius: 4px;
                  display: inline-block;

                  &:hover {
                    color: #ffffff;
                    text-shadow: 0 0 18px rgba(255, 255, 255, 0.9);
                    background: rgba(246, 213, 150, 0.3);
                    border-bottom-color: #ffffff;
                    transform: scale(1.08);
                    box-shadow: 0 2px 8px rgba(246, 213, 150, 0.4);
                  }
                }
              }
            }
          }
        }

        /* 功能选项区域 */
        .action-options {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid rgba(211, 180, 121, 0.3);

          .option-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .option-btn {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 8px 12px;
              background: rgba(211, 180, 121, 0.1);
              border: 1px solid rgba(211, 180, 121, 0.3);
              border-radius: 15px;
              cursor: pointer;
              transition: all 0.3s ease;
              font-family: 'Ma Shan Zheng', cursive;
              font-size: 14px;
              color: #d3b479;

              .option-text {
                flex: 1;
                text-align: left;
              }

              .option-arrow {
                font-size: 12px;
                transition: transform 0.3s ease;
              }

              &:hover {
                background: rgba(211, 180, 121, 0.2);
                border-color: #d3b479;
                transform: translateX(5px);
                
                .option-arrow {
                  transform: translateX(3px);
                }
              }
            }
          }
        }
      }

      /* 底部样式 */
      .footer {
        display: flex;
        flex-direction: row;
        text-align: center;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-top: 15px;
        font-size: 16px;
        color: #c0aa6a;
        letter-spacing: 1px;
        border-top: 1px solid #3a3a3f;
      }
    }
  }
}

/* 追问对话弹窗样式 */
.question-dialog-overlay {
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

.question-dialog-container {
  width: 90%;
  max-width: 500px;
  height: 600px;
  background: linear-gradient(to bottom, #2a2118, #1a1510);
  border: 2px solid #d3b479;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;

  .question-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: rgba(45, 35, 25, 0.9);
    border-bottom: 1px solid #5d4b32;

    h3 {
      color: #fada9b;
      margin: 0;
      font-size: 18px;
      font-family: 'Ma Shan Zheng', cursive;
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
      transition: background 0.3s;

      &:hover {
        background: rgba(231, 204, 128, 0.1);
      }
    }
  }

  .question-dialog-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #d3b479 transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #d3b479;
      border-radius: 3px;
    }

    .message {
      display: flex;
      margin-bottom: 20px;
      align-items: flex-start;

      &.user-message {
        flex-direction: row-reverse;

        .text {
          background: rgba(192, 170, 106, 0.2);
          border: 1px solid #c0aa6a;
          margin-right: 15px;
          margin-left: 60px;
        }
      }

      &.bot-message {
        .text {
          background: rgba(60, 60, 65, 0.8);
          border: 1px solid #3a3a3f;
          margin-left: 15px;
          margin-right: 60px;
        }
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(40, 40, 45, 0.8);
        border: 2px solid #d3b479;
        flex-shrink: 0;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }

      .text {
        flex: 1;
        padding: 12px 15px;
        border-radius: 12px;
        color: #e7cc80;
        font-size: 14px;
        line-height: 1.5;
        word-break: break-word;

        &.loading {
          display: flex;
          align-items: center;
          gap: 4px;

          .dot {
            width: 6px;
            height: 6px;
            background: #d3b479;
            border-radius: 50%;
            animation: blink 1s infinite ease-in-out both;

            &:nth-child(1) { animation-delay: -0.32s; }
            &:nth-child(2) { animation-delay: -0.16s; }
            &:nth-child(3) { animation-delay: 0s; }
          }
        }
      }
    }
  }

  .question-dialog-input {
    display: flex;
    padding: 20px;
    background: rgba(35, 28, 20, 0.9);
    border-top: 1px solid #5d4b32;
    gap: 10px;

    input {
      flex: 1;
      padding: 12px 15px;
      background: rgba(40, 35, 28, 0.8);
      border: 1px solid #5d4b32;
      border-radius: 25px;
      color: #e7cc80;
      font-size: 14px;
      outline: none;

      &::placeholder {
        color: #7a6a4a;
      }

      &:focus {
        border-color: #d3b479;
        box-shadow: 0 0 5px rgba(211, 180, 121, 0.3);
      }
    }

    .send-button {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: rgba(211, 180, 121, 0.2);
      border: 1px solid #d3b479;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;

      &:hover:not(:disabled) {
        background: rgba(211, 180, 121, 0.4);
        transform: scale(1.05);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

/* 经书参悟面板样式 */
.scripture-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}

.scripture-panel {
  width: 50vw;
  height: 100vh;
  background: linear-gradient(to left, #2a2118, #1a1510);
  border-left: 2px solid #d3b479;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease-out;

  .scripture-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px;
    background: rgba(45, 35, 25, 0.9);
    border-bottom: 2px solid #5d4b32;

    h3 {
      color: #fada9b;
      margin: 0;
      font-size: 24px;
      font-family: 'Ma Shan Zheng', cursive;
      text-shadow: 0 0 10px rgba(250, 218, 155, 0.3);
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background 0.3s;

      &:hover {
        background: rgba(231, 204, 128, 0.1);
      }
    }
  }

  .scripture-content {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #d3b479 transparent;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #d3b479;
      border-radius: 4px;
    }

    .scripture-scroll {
      background: rgba(40, 35, 28, 0.6);
      padding: 30px;
      border-radius: 15px;
      border: 1px solid #5d4b32;
      color: #e7cc80;
      line-height: 1.8;
      font-size: 16px;

      h4 {
        color: #fada9b;
        font-size: 20px;
        margin-top: 30px;
        margin-bottom: 15px;
        text-align: center;
        border-bottom: 1px solid #5d4b32;
        padding-bottom: 10px;
        text-shadow: 0 0 8px rgba(250, 218, 155, 0.4);

        &:first-child {
          margin-top: 0;
        }
      }

      p {
        margin-bottom: 15px;
        text-indent: 2em;
        color: #d3b479;
      }

      .stick-method-section {
        margin-bottom: 40px;
        
        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 20px;
        }

        .method-content {
          display: flex;
          gap: 20px;
          align-items: flex-start;

          .method-text {
            flex: 1;
            
            p {
              text-indent: 0;
              margin-bottom: 12px;
              line-height: 1.6;
              color: #d3b479;
            }
          }

          .method-video {
            flex: 0 0 300px;
            
            video {
              width: 100%;
              height: auto;
              border-radius: 8px;
              border: 2px solid #5d4b32;
              background: #000;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              
              &:hover {
                border-color: #d3b479;
                box-shadow: 0 4px 16px rgba(211, 180, 121, 0.2);
              }
            }
          }

          @media (max-width: 768px) {
            flex-direction: column;
            
            .method-video {
              flex: none;
              width: 100%;
            }
          }
        }
      }
      
      .school-detail-section {
        margin-bottom: 40px;
        
        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 20px;
        }

        .school-content {
          display: flex;
          gap: 20px;
          align-items: flex-start;

          .school-text {
            flex: 1;
            
            p {
              text-indent: 0;
              margin-bottom: 12px;
              line-height: 1.6;
              color: #d3b479;
              
              strong {
                color: #fada9b;
                font-size: 18px;
                text-shadow: 0 0 6px rgba(250, 218, 155, 0.3);
              }
            }
            
            .school-strategy {
              margin-top: 15px;
              padding: 15px;
              background: rgba(45, 35, 25, 0.6);
              border-left: 3px solid #d3b479;
              border-radius: 6px;
              
              h5 {
                color: #fada9b;
                margin: 0 0 8px 0;
                font-size: 16px;
                font-weight: bold;
              }
              
              p {
                margin: 0;
                color: #e7cc80;
                text-indent: 0;
                line-height: 1.6;
              }
            }
          }

          .school-video {
            flex: 0 0 300px;
            
            video {
              width: 100%;
              height: auto;
              border-radius: 8px;
              border: 2px solid #5d4b32;
              background: #000;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              
              &:hover {
                border-color: #d3b479;
                box-shadow: 0 4px 16px rgba(211, 180, 121, 0.2);
              }
            }
          }

          @media (max-width: 768px) {
            flex-direction: column;
            
            .school-video {
              flex: none;
              width: 100%;
            }
          }
        }
      }

      .strategy-section {
        margin-bottom: 40px;
        
        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 25px;
          font-size: 22px;
          text-align: center;
          color: #fada9b;
          text-shadow: 0 0 10px rgba(250, 218, 155, 0.4);
        }

        .strategy-content {
          display: flex;
          flex-direction: column;
          gap: 20px;

          .strategy-item {
            background: rgba(45, 35, 25, 0.6);
            border: 1px solid #5d4b32;
            border-radius: 10px;
            padding: 20px;
            transition: all 0.3s;
            
            &:hover {
              background: rgba(45, 35, 25, 0.8);
              border-color: #d3b479;
              box-shadow: 0 4px 12px rgba(211, 180, 121, 0.1);
            }

            .strategy-text {
              color: #e7cc80;
              line-height: 1.8;
              
              strong {
                color: #fada9b;
                font-size: 18px;
                text-shadow: 0 0 6px rgba(250, 218, 155, 0.3);
                display: block;
                margin-bottom: 10px;
                border-bottom: 1px solid #5d4b32;
                padding-bottom: 8px;
              }
              
              br {
                line-height: 2.2;
              }
              
              p {
                margin: 8px 0;
                text-indent: 0;
              }
            }
          }
        }
      }

      .combat-demo-section {
        margin-bottom: 40px;
        
        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 22px;
          text-align: center;
          color: #fada9b;
          text-shadow: 0 0 10px rgba(250, 218, 155, 0.4);
        }

        .demo-content {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 20px;

          .demo-description {
            flex: 1;
            
            p {
              text-indent: 0;
              margin-bottom: 12px;
              line-height: 1.6;
              color: #d3b479;
              
              strong {
                color: #fada9b;
                font-size: 18px;
                text-shadow: 0 0 6px rgba(250, 218, 155, 0.3);
              }
            }
          }

          .demo-video {
            flex: 0 0 300px;
            
            h5 {
              margin-bottom: 10px;
              color: #fada9b;
              font-size: 16px;
              text-align: center;
            }
            
            video {
              width: 100%;
              height: auto;
              border-radius: 8px;
              border: 2px solid #5d4b32;
              background: #000;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              
              &:hover {
                border-color: #d3b479;
                box-shadow: 0 4px 16px rgba(211, 180, 121, 0.2);
              }
            }
          }

          @media (max-width: 768px) {
            flex-direction: column;
            
            .demo-video {
              flex: none;
              width: 100%;
            }
          }
        }

        .demo-steps {
          h5 {
            margin-bottom: 15px;
            color: #fada9b;
            font-size: 18px;
            text-shadow: 0 0 6px rgba(250, 218, 155, 0.3);
          }
          
          .steps-content {
            background: rgba(61, 45, 30, 0.6);
            border: 1px solid #5d4b32;
            border-radius: 8px;
            padding: 20px;
            line-height: 1.8;
            color: #d3b479;
            
            ::v-deep(strong) {
              color: #fada9b;
              font-size: 16px;
              margin-bottom: 8px;
              display: block;
            }
            
            ::v-deep(br) {
              margin-bottom: 6px;
            }
          }
        }
      }

      .loading-content {
        text-align: center;
        padding: 40px 0;
        color: #d3b479;
        font-size: 16px;

        p {
          margin: 0;
          text-indent: 0;
        }
      }

      .advanced-school-section {
        margin-bottom: 40px;
        
        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 25px;
          font-size: 24px;
          text-align: center;
          color: #fada9b;
          text-shadow: 0 0 12px rgba(250, 218, 155, 0.5);
          background: linear-gradient(45deg, #d3b479 0%, #fada9b 50%, #d3b479 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .advanced-method-content {
          display: flex;
          flex-direction: column;
          gap: 25px;

          .advanced-method-text-row {
            display: flex;
            gap: 20px;

            .description-section,
            .techniques-section {
              flex: 1;
              background: rgba(45, 35, 25, 0.7);
              border: 1px solid #5d4b32;
              border-radius: 12px;
              padding: 20px;
              transition: all 0.3s;
              
              &:hover {
                background: rgba(45, 35, 25, 0.9);
                border-color: #d3b479;
                box-shadow: 0 6px 20px rgba(211, 180, 121, 0.15);
              }

              h5 {
                margin-top: 0;
                margin-bottom: 15px;
                color: #fada9b;
                font-size: 18px;
                text-shadow: 0 0 8px rgba(250, 218, 155, 0.4);
                border-bottom: 2px solid #5d4b32;
                padding-bottom: 8px;
                text-align: center;
              }
              
              div {
                color: #e7cc80;
                line-height: 1.8;
                
                ::v-deep(br) {
                  line-height: 2.2;
                  margin-bottom: 8px;
                }
              }
            }

            @media (max-width: 768px) {
              flex-direction: column;
              gap: 15px;
            }
          }

          .advanced-method-video-row {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            h5 {
              margin-bottom: 15px;
              color: #fada9b;
              font-size: 18px;
              text-align: center;
              text-shadow: 0 0 8px rgba(250, 218, 155, 0.4);
            }
            
            video {
              width: 100%;
              max-width: 600px;
              height: auto;
              border-radius: 12px;
              border: 3px solid #5d4b32;
              background: #000;
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
              transition: all 0.3s;
              
              &:hover {
                border-color: #d3b479;
                box-shadow: 0 8px 25px rgba(211, 180, 121, 0.3);
                transform: scale(1.02);
              }
            }
          }
        }
      }

      // 师父传承最终秘籍样式
      .master-final-section {
        margin-bottom: 40px;
        
        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 25px;
          font-size: 28px;
          text-align: center;
          color: #fada9b;
          text-shadow: 0 0 15px rgba(250, 218, 155, 0.8);
          background: linear-gradient(45deg, #d3b479 0%, #fada9b 30%, #e6d48f 70%, #d3b479 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #d3b479, transparent);
          }
        }

        .master-final-description {
          text-align: center;
          margin-bottom: 30px;
          
          p {
            color: #e7cc80;
            font-size: 18px;
            font-style: italic;
            text-shadow: 0 0 5px rgba(231, 204, 128, 0.3);
            margin: 0;
          }
        }

        .master-final-content {
          background: rgba(40, 30, 20, 0.8);
          border: 2px solid #d3b479;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 8px 25px rgba(211, 180, 121, 0.2), inset 0 0 20px rgba(211, 180, 121, 0.1);
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(211, 180, 121, 0.05) 50%, transparent 70%);
            pointer-events: none;
          }

          ::v-deep(.master-final-section) {
            h3 {
              color: #fada9b;
              font-size: 20px;
              margin-bottom: 15px;
              margin-top: 25px;
              text-shadow: 0 0 8px rgba(250, 218, 155, 0.4);
              position: relative;
              
              &:first-child {
                margin-top: 0;
              }

              &::before {
                content: '◆';
                color: #d3b479;
                margin-right: 8px;
                text-shadow: 0 0 5px rgba(211, 180, 121, 0.5);
              }
            }

            p {
              color: #e7cc80;
              line-height: 1.8;
              margin-bottom: 12px;
              text-indent: 2em;

              &:last-child {
                margin-bottom: 0;
              }
            }

            p[style*="color: #d3b479"] {
              text-indent: 0;
              text-align: center;
              font-size: 18px;
              line-height: 1.6;
              margin: 20px 0;
              padding: 15px;
              background: rgba(211, 180, 121, 0.1);
              border-radius: 8px;
              border: 1px solid rgba(211, 180, 121, 0.3);
            }

            p[style*="italic"] {
              text-indent: 0;
              text-align: center;
              font-size: 16px;
              margin-top: 25px;
              padding-top: 20px;
              border-top: 1px solid rgba(192, 170, 106, 0.3);
            }
          }
        }
      }
    }
  }
}

/* 动画定义 */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* 浮动按钮样式 */
.floating-buttons {
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;

  .floating-button {
    width: 50px;
    height: 50px;
    border-radius: 30%;
    background: rgba(40, 40, 45, 0.9);
    border: 2px solid #d3b479;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    transition: all 0.3s;

    &:hover {
      background: rgba(211, 180, 121, 0.2);
      transform: translateY(-3px);
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>