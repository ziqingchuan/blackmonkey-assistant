<template>
  <GlobalLoading :is-loading="isWaiting" />
  <CustomAlert ref="customAlert" />
  <!-- 追问对话弹窗 -->
  <RagChatBotDialog
      :show="showQuestionDialog"
      :userAvatar="avatar"
      mode="combat"
      @close="closeQuestionDialog"
  />

  <!--  经书参悟右侧弹窗 -->
  <ScripturePanelDialog
      :scripture-content="scriptureContent"
      v-if="showScripturePanel"
      @click.self="closeScripturePanel"
      @close-dialog="closeScripturePanel"
  />
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
          <span class="btn-origin-text">重塑</span>
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
          <button class="progress-item"
                  :class="{ active: !hasChosenStick }"
                  @click="backToBasics"
                  :disabled="disableBtns">
            <span class="progress-title">棍法入门</span>
            <span class="progress-desc">基础三式选择</span>
          </button>
          <button class="progress-item"
                  :class="{ active: hasChosenStick && !hasChosenSchool }"
                  v-if="hasChosenStick"
                  @click="backToStickSelection"
                  :disabled="disableBtns"
          >
            <span class="progress-title">{{ chosenStickType }}修炼</span>
            <span class="progress-desc">流派传承学习</span>
          </button>
          <button class="progress-item"
                  :class="{ active: hasChosenSchool && !hasStartedCombat }"
                  v-if="hasChosenSchool"
                  @click="backToSchoolTraining"
                  :disabled="disableBtns"
          >
            <span class="progress-title">{{ chosenSchoolName }}</span>
            <span class="progress-desc">流派详解分析</span>
          </button>
           <button class="progress-item"
                   :class="{ active: hasStartedCombat && !hasReachedAdvanced }" v-if="hasStartedCombat"
                   @click="backToCombatTraining"
                   :disabled="disableBtns"
           >
            <span class="progress-title">实战传授</span>
            <span class="progress-desc">招式技巧指导</span>
          </button>
          <button class="progress-item"
                  :class="{ active: hasReachedAdvanced && !hasSelectedAdvancedSchool }"
                  v-if="hasReachedAdvanced"
                  @click="backToAdvancedSchools"
                  :disabled="disableBtns"
          >
            <span class="progress-title">上层流派</span>
            <span class="progress-desc">高深武学研习</span>
          </button>
          <button class="progress-item"
                  :class="{ active: hasSelectedAdvancedSchool }"
                  v-if="hasSelectedAdvancedSchool"
                  @click="backToAdvancedSchoolDetails"
                  :disabled="disableBtns"
          >
            <span class="progress-title">{{ selectedAdvancedSchool }}</span>
            <span class="progress-desc">上层流派详解</span>
          </button>
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
                  <span
                      v-if="index === streamingMessageIndex && message.role === 'RAG'"
                      class="streaming-cursor">
                    |
                  </span>
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
  <!-- 右下角固定按钮 -->
  <div class="floating-buttons">
    <button class="floating-button" title="返回顶部" @click="scrollToTop('.dialog-content')">
      <ScrollToTopIcon />
    </button>
    <button class="floating-button" title="问答助手" @click="openQuestionDialog">
      <ChatBot />
    </button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, computed, nextTick} from 'vue';
import {useRouter} from 'vue-router';
import Logo from '../../assets/icons/Logo.vue';
import CloudUnderLogo from "../../assets/icons/Clouds/Cloud-under-logo.vue";
import RedCloudLeft from "../../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../../assets/icons/Clouds/RedCloud-Right.vue";
import CloudBeforeTitle from "../../assets/icons/Clouds/Cloud-before-title.vue";
import CloudBeforeList from "../../assets/icons/Clouds/Cloud-before-list.vue";
import CustomAlert from "../../components/Dialog/CustomAlert.vue";
import GlobalLoading from '../../components/Dialog/GlobalLoading.vue';
import RagChatBotDialog from "../../components/Dialog/RagChatBotDialog.vue";
import MenuBtn from "../../assets/icons/MenuBtn.vue";
import Taiji from "../../assets/icons/Taiji.vue";
import Jingu from "../../assets/icons/Jingu.vue";
import {customAlert, logout, scrollToBottom, showAlert, scrollToTop} from "../../utils/GlobalFunction.ts";
import ScrollToTopIcon from "../../assets/icons/ScrollToTop.vue";
import ChatBot from "../../assets/icons/ChatBot.vue";
import {
  getWelcomeMessage,
  getSchoolRecommendation,
  isValidStickType,
  getScriptureContent,
  getAdvancedSchoolDetails,
  getDynamicTitle,
  getAdvancedSchoolsContent,
  type StickType,
  type ScriptureResponse,
  type MessageType,
  type ConversationMessage
} from "../../apis/playMethods.ts";
import {getCombatTrainingContent, getTrainingGuide} from "../../consts/methodsData.ts";
import ScripturePanelDialog from "../../components/Dialog/ScripturePanelDialog.vue";
// ==================== 接口定义 ====================


// ==================== 变量声明 ====================
const currentUser = ref<any>([]);
const avatar = "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/avatar.png";
const token = ref('');
const isWaiting = ref(false);
const router = useRouter();
const isLogoHovered = ref(false);
const isMethodsListVisible = ref(false);
const streamingMessageIndex = ref(-1);
const conversationMessages = ref<ConversationMessage[]>([]);
const hasChosenStick = ref(false); // 是否已选择棍法
const chosenStickType = ref<StickType>(); // 选择的棍法类型
const hasChosenSchool = ref(false); // 是否已选择流派
const chosenSchoolName = ref(''); // 选择的流派名称
const hasStartedCombat = ref(false); // 是否已开始实战教学
const hasReachedAdvanced = ref(false); // 是否已进入上层流派阶段
const hasSelectedAdvancedSchool = ref(false); // 是否已选择上层流派
const selectedAdvancedSchool = ref(''); // 选择的上层流派名称
const disableBtns = ref(false); // 按钮禁用状态

// 追问对话相关
const showQuestionDialog = ref(false);

// 经书参悟相关
const showScripturePanel = ref(false);
const scriptureContent = ref<ScriptureResponse['data']>({ methods: [], messageType: 'welcome' });

// ==================== 计算属性 ====================

/**
 * 动态标题
 */
const dynamicTitle = computed(() => {
  return getDynamicTitle(
    hasChosenStick.value,
    chosenStickType.value ? chosenStickType.value : '',
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
 * 重置对话，重新开始
 */
const resetConversation = async () => {
  const confirmed = await showAlert('天命人，是否确定重新开始修炼？此举将清除当前进度。', 1);
  if (confirmed) {
    conversationMessages.value = [];
    hasChosenStick.value = false;
    chosenStickType.value = undefined;
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
  const confirmed = await showAlert('天命人，是否确定返回棍法入门重新修炼？', 1);
  if (confirmed) {
    // 重置所有状态
    hasChosenStick.value = false;
    chosenStickType.value = undefined;
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

    await nextTick(() => scrollToBottom('.dialog-content'));
  }
};

/**
 * 返回到棍法选择阶段
 */
const backToStickSelection = async () => {
  const confirmed = await showAlert(`天命人，是否确定返回${chosenStickType.value}修炼阶段？`, 1);
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

    await nextTick(() => scrollToBottom('.dialog-content'));
  }
};

/**
 * 返回到流派训练阶段
 */
const backToSchoolTraining = async () => {
  const confirmed = await showAlert(`天命人，是否确定重新查看${chosenSchoolName.value}的修炼指导？`, 1);
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

    await nextTick(() => scrollToBottom('.dialog-content'));
  }
};

/**
 * 返回到实战教学阶段
 */
const backToCombatTraining = async () => {
  const confirmed = await showAlert(`天命人，是否确定重新查看${chosenSchoolName.value}的实战传授？`, 1);
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

    await nextTick(() => scrollToBottom('.dialog-content'));
  }
};

/**
 * 流式显示文字效果
 * @param text 要显示的文本
 * @param speed 显示速度（毫秒）
 * @param messageType 消息类型
 * @param stickType 棍法类型
 */
const typewriterEffect = (
    text: string,
    speed: number = 5,
    messageType?: MessageType, stickType?: StickType
): Promise<void> => {
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
    nextTick(() => scrollToBottom('.dialog-content'));
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        disableBtns.value = true;
        conversationMessages.value[messageIndex].content += text[currentIndex];
        currentIndex++;
        // 每次更新内容后滚动到底部
        nextTick(() => scrollToBottom('.dialog-content'));
      } else {
        clearInterval(timer);
        streamingMessageIndex.value = -1;
        nextTick(() => scrollToBottom('.dialog-content'));
        disableBtns.value = false;
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
  await nextTick(() => scrollToBottom('.dialog-content'));
  hasChosenStick.value = true;
  chosenStickType.value = choice;
  
  // 等待一下，然后获取流派推荐
  await new Promise(resolve => setTimeout(resolve, 100));
  
  try {
    const response = await getSchoolRecommendation(choice, hasChosenSchool.value, chosenSchoolName.value);
    if (response.success) {
      await typewriterEffect(response.data.content, 35, 'school_recommendation', choice);
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
      await typewriterEffect(response.data.content, 35, response.data.messageType, chosenStickType.value as StickType);
    } else {
      showAlert('获取系统消息失败，请重试', 0);
    }
  } catch (error) {
    console.error('开始对话失败:', error);
    showAlert('系统繁忙，请稍后重试', 0);
  }
};


/**
 * 打开经书参悟面板
 * @param messageIndex 点击的消息索引，用于确定显示哪种秘籍
 */
const openScripturePanel = async (messageIndex?: number) => {
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
      showScripturePanel.value = true;
    } else {
      showAlert('获取武学秘籍失败，请重试', 0);
    }
  } catch (error) {
    console.error('获取武学秘籍失败:', error);
    showAlert('获取武学秘籍失败，请重试', 0);
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
  await nextTick(() => scrollToBottom('.dialog-content'));
  hasChosenSchool.value = true;
  chosenSchoolName.value = schoolName;
  
  // 等待一下，然后显示合并的回复（确认+流派详解）
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const trainingGuide = getTrainingGuide(schoolName);
  const combinedText = `极好！你已选择修炼 ${schoolName}。此流派精深莫测，需日夜苦练方可有成。记住，武学修行在于悟性，不在于速度。<br><br>现在，你的修炼之路正式开始！愿你能在此道上有所突破，成就一代宗师！<br><br>${trainingGuide}`;
  
  await typewriterEffect(combinedText, 35, 'training_progress', chosenStickType.value);
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
  await nextTick(() => scrollToBottom('.dialog-content'));
  hasStartedCombat.value = true;
  
  // 等待一下，然后开始实战教学
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const combatText = getCombatTrainingContent(schoolName);
  await typewriterEffect(combatText, 35, 'combat_training', chosenStickType.value);
};

/**
 * 重铸根基，返回第一阶段
 */
const restartFromFoundation = async () => {
  const confirmed = await showAlert('天命人，是否确定重铸根基？这将清除所有修炼进度，从基础棍法重新开始。', 1);
  if (confirmed) {
    // 重置所有状态
    hasChosenStick.value = false;
    chosenStickType.value = undefined;
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

    await nextTick(() => scrollToBottom('.dialog-content'));
  }
};

/**
 * 返回到上层流派阶段
 */
const backToAdvancedSchools = async () => {
  const confirmed = await showAlert('天命人，是否确定重新查看上层流派的介绍？', 1);
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

    await nextTick(() => scrollToBottom('.dialog-content'));
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
  await nextTick(() => scrollToBottom('.dialog-content'));
  hasReachedAdvanced.value = true;
  
  // 等待一下，然后显示上层流派介绍
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const advancedSchoolsContent = getAdvancedSchoolsContent();
  await typewriterEffect(advancedSchoolsContent, 35, 'advanced_schools', chosenStickType.value);
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
  await nextTick(() => scrollToBottom('.dialog-content'));
  hasSelectedAdvancedSchool.value = true;
  selectedAdvancedSchool.value = schoolName;
  
  // 等待一下，然后显示上层流派详情
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const advancedSchoolDetails = getAdvancedSchoolDetails(schoolName);
  await typewriterEffect(advancedSchoolDetails, 35, 'advanced_school_details', chosenStickType.value);
};
/**
 * 返回到上层流派详情
 */
const backToAdvancedSchoolDetails = async () => {
  const confirmed = await showAlert(`天命人，是否确定重新查看${selectedAdvancedSchool.value}的详细介绍？`, 1);
  if (confirmed) {
    // 找到上层流派详情消息，保留到那条消息
    const advancedSchoolDetailsIndex = conversationMessages.value.findIndex(
      msg => msg.role === 'RAG' && msg.content.includes('上层流派详解 ·')
    );
    
    if (advancedSchoolDetailsIndex !== -1) {
      // 保留到上层流派详情消息
      conversationMessages.value = conversationMessages.value.slice(0, advancedSchoolDetailsIndex + 1);
    }

    await nextTick(() => scrollToBottom('.dialog-content'));
  }
};

/**
 * 开启二周目，回到第一阶段
 */
const startNewCycle = async () => {
  const confirmed = await showAlert('天命人，武学已达巅峰，是否开启二周目重新修炼？此举将清除所有修炼进度，从棍法入门重新开始。', 1);
  if (confirmed) {
    // 重置所有状态到初始状态
    conversationMessages.value = [];
    hasChosenStick.value = false;
    chosenStickType.value = undefined;
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
  const confirmed = await showAlert('天命人，武学修炼已臻化境，是否功成身退返回江湖？', 1);
  if (confirmed) {
    await router.push('/rag-user');
  }
};

/**
 * 切换侧边栏显示状态
 */
const toggleMethodsList = () => {
  isMethodsListVisible.value = !isMethodsListVisible.value;
};

/**
 * 关闭经书参悟面板
 */
const closeScripturePanel = () => {
  showScripturePanel.value = false;
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

/* 全局样式 */
input, button {
  font-family: 'STKaiti', cursive;
}

/* 页面整体样式 */
.page-container {
  display: flex;
  background: linear-gradient(to right, #1a1a1d 0%, #0a0a0c 100%);
  font-family: 'STKaiti', cursive;
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
        font-family: 'STKaiti', cursive;
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
      background-image: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/dragon.png');
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
          font-family: 'STKaiti', cursive;
        }
      }

      .methods-list-wrapper {
        .progress-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          margin-bottom: 10px;
          width: 100%;
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

        .header-left {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          gap: 10px;

          .dialog-title {
            font-size: 18px;
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
              font-family: 'STKaiti', cursive;
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
      font-family: 'STKaiti', cursive;
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