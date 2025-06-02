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
            @click="isDialogListVisible = !isDialogListVisible"
        />
      </div>
      <div class="btn-group">
        <button class="btn" @click="showCreate" title="新建对话">
          <span class="btn-origin-text">开劫</span>
          <span class="btn-new-text">新建对话</span>
        </button>
        <button class="btn" @click="showConfig" title="参数设置">
          <span class="btn-origin-text">造化</span>
          <span class="btn-new-text">参数设置</span>
        </button>
        <button class="btn" @click="logout(router)" title="退出">
          <span class="btn-origin-text">归尘</span>
          <span class="btn-new-text">退出登录</span>
        </button>
      </div>
    </div>

    <!-- 三界主体 -->
    <div class="main-container">
      <!-- 千劫万难 -->
      <div class="dialog-list" v-if="isDialogListVisible">
        <div class="list-title">
          <CloudBeforeList class="cloud-decoration" />
          <span class="title-text">千劫万难</span>
        </div>
        <div class="dialog-list-container">
          <div
              v-if="dialogList.length > 0"
              v-for="dialog in dialogList"
              :key="dialog.id"
              class="dialog-item"
              :class="{ active: currentDialog?.id === dialog.id }"
              @click="loadDialog(dialog.id)"
          >
            <div class="dialog-title">{{ dialog.title.length > 9 ? dialog.title.slice(0, 9) + '...' : dialog.title }}</div>
            <div class="dialog-time">
              {{ formatTime(dialog.createTime.toString()) }}
            </div>
          </div>
          <div v-if="dialogList.length === 0" class="empty-tip">
            无往生记录，请开启新劫难
          </div>
        </div>
      </div>

      <!-- 问道之境 -->
      <div class="dialog-container">
        <div class="dialog-header">

          <!-- 头部左侧 -->
          <div class="header-left">
            <CloudBeforeTitle />
            <span class="dialog-title">{{ currentDialog?.title || "一段新的劫难" }}</span>
          </div>

          <!-- 右侧按钮 -->
          <div class="header-right">
            <!-- 成就页面按钮 -->
            <button class="achieve-btn" @click="toAchievementPage">
              <span class="text-container">功德成就</span>
            </button>
            <button class="achieve-btn" @click="toPlayMethodsPage">
              <span class="text-container">打法推荐</span>
            </button>
            <button class="achieve-btn" @click="toBossTipsPage">
              <span class="text-container">BOSS攻略</span>
            </button>
          </div>
        </div>

        <!-- 对话内容 -->
        <div class="dialog-content">
          <template v-if="currentDialog">
            <div
                v-for="(content, index) in displayContentList"
                :key="index"
                :class="['message-container', content.role === 'USER' ? 'user' : 'rag']"
            >
              <!-- 头像 -->
              <div class="role-avatar">
                <Taiji v-if="content.role === 'RAG'" />
                <Jingu v-if="content.role === 'USER'" />
              </div>
              <!-- 消息内容 -->
              <div class="message-content-wrapper">
                <div class="message-bubble">
                  <div class="message-text">
                    {{ content.text }}
                    <span v-if="index === streamingMessageIndex && content.role === 'RAG'" class="streaming-cursor">|</span>
                  </div>

                  <!-- SourceDoc下拉区域 -->
                  <div v-if="!streamingMessageIndex && content.role === 'RAG' && content.sourceDoc" class="source-doc-container">
                    <button
                        class="source-toggle"
                        @click="toggleSourceDoc(index)"
                    >
                      <span>天机来源</span>
                      <span :class="['arrow', sourceDocVisibility[index] && 'open']">▼</span>
                    </button>

                    <!--天机来源组件-->
                    <transition name="slide">
                      <div v-show="sourceDocVisibility[index]" class="source-doc-content">
                        <div v-for="(doc, docIndex) in content?.sourceDoc || []" :key="docIndex" class="doc-item">
                          <div class="doc-header">
                            <span class="doc-source">{{ doc.source }}</span>
                            <span class="doc-category">{{ doc.category }}</span>
                          </div>
                          <div class="doc-content">{{ doc.content }}</div>
                          <div v-if="docIndex < content.sourceDoc.length - 1" class="doc-divider"></div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
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
              v-model.trim="inputValue"
              type="text"
              class="input-text"
              placeholder="请输入你的劫难..."
              :disabled="isLoading"
              @keyup.enter="sendQuestion"
          />
          <button
              class="btn-send"
              :disabled="isLoading || !inputValue"
              @click="sendQuestion"
          >
            <span class="icon-container">
              <Send />
            </span>
            <span class="text-container">求问</span>
          </button>
        </div>
        <div class="footer">
          <RedCloudLeft />
          <span> 历劫证道 · 天机自现 </span>
          <RedCloudRight />
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
          maxlength="20"
          placeholder="输入劫难名..."
          @keyup.enter="createNewDialog(newDialogTitle)"
      />
      <div class="xuan-button-group">
        <button class="xuan-btn" @click="createNewDialog(newDialogTitle)">开劫</button>
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
        <span class="xuan-label">参考天机：</span>
        <input
            v-model.number="configParams.resultCount"
            type="number"
            min="1"
            max="10"
            class="xuan-number-input"
        />
        条
      </div>

      <div class="xuan-config-item">
        <span class="xuan-label">道韵相似：{{ (configParams.similarity * 100).toFixed(0) }} % </span>
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
import {ref, onMounted, nextTick} from 'vue';
import { useRouter } from 'vue-router';
import Logo from '../../assets/icons/Logo.vue';
import Send from "../../assets/icons/Send.vue";
import CloudUnderLogo from "../../assets/icons/Clouds/Cloud-under-logo.vue";
import RedCloudLeft from "../../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../../assets/icons/Clouds/RedCloud-Right.vue";
import CloudBeforeTitle from "../../assets/icons/Clouds/Cloud-before-title.vue";
import CloudBeforeList from "../../assets/icons/Clouds/Cloud-before-list.vue";
import Taiji from "../../assets/icons/Taiji.vue";
import Jingu from "../../assets/icons/Jingu.vue";
import CustomAlert from "../../components/Dialog/CustomAlert.vue";
import MenuBtn from "../../assets/icons/MenuBtn.vue";
import {type CommonQuestion, type ConfigParams} from '../../apis/rag.ts';
import { getDialogDetail, createDialog, getAllHistory, type Dialog, type DisplayContent, type Content } from '../../apis/dialog.ts';
import {bindSteamAccount} from "../../apis/steam.ts";
import GlobalLoading from "../../components/Dialog/GlobalLoading.vue";
import {customAlert, showAlert, formatTime, logout, scrollToBottom} from "../../utils/GlobalFunction.ts";

// ==================== 变量声明 ====================
const currentUser = ref<any>([]);  // 当前用户信息
const token = ref(''); // 用户登录token
const dialogList = ref<Dialog[]>([]); // 存储全部对话列表
const displayContentList = ref<DisplayContent[]>([]); // 用于存储转换结构后的对话列表
const currentDialog = ref<Dialog>(); // 当前对话信息
const inputValue = ref(''); // 用于绑定输入框
const question = ref(''); // 记录用户输入的问题
const isLoading = ref(false); // 记录加载状态
const isWaiting = ref(false); // 全局等待状态
const router = useRouter()
const showCreateDialog = ref(false) // 控制新建对话弹窗的显示
const showConfigDialog = ref(false) // 控制参数设置弹窗的显示
const newDialogTitle = ref('') // 新建对话的标题
const isLogoHovered = ref(false); // 记录左上角logo是否被鼠标悬停
const isDialogListVisible = ref(false); // 记录对话列表的显示状态
const sourceDocVisibility = ref<Record<number, boolean>>({}); // 记录SourceDoc的显示状态（折叠与收起）
const streamingMessageIndex = ref<number | null>(null); // 记录正在流式接收的消息索引
const configParams = ref<ConfigParams>({ // 初始化参数配置信息
  searchStrategy: 0,
  resultCount: 5,
  similarity: 0.7
})

// ==================== 函数声明 ====================
// 创建新对话
const createNewDialog = async (title: string) => {
  try {
    if(title.trim() === '') {
      title = '一段新的劫难';
    }
    const createSuccessfully = await createDialog(title);
    // 刷新对话列表
    if(createSuccessfully) {
      showCreateDialog.value = false; // 关闭新建对话弹窗
      newDialogTitle.value   = ''; // 清空新建对话标题
      isDialogListVisible.value = true; // 显示对话列表
      dialogList.value = await getAllHistory(currentUser.value);
      await loadDialog(dialogList.value[0].id); // 加载最新的对话
    }
    return createSuccessfully
  } catch (error) {
    showAlert("创建失败，请稍后再试", 0);
    console.error(error);
    return false;
  } finally {
    showConfigDialog.value = false;
  }
};

// 加载具体对话
const loadDialog = async (id: number) => {
  try {
    // 进入加载状态
    isLoading.value = true;
    // 获取对话详情
    currentDialog.value = await getDialogDetail(id);
    displayContentList.value = convertToDisplayFormat(currentDialog.value.contentList); // 转换数据格式
  } catch (error) {
    showAlert("加载失败，请稍后再试", 0);
    console.log(error);
  } finally {
    await nextTick(() => scrollToBottom('.dialog-content'));
    isLoading.value = false;
  }
};

// 将后端数据转换为前端显示格式
const convertToDisplayFormat = (contentList: Content[]) => {
  return contentList.reduce((acc: DisplayContent[], content) => {
    // 将每个QA对转换为两条消息（用户问题和RAG回答）
    acc.push({
      text: content.question,
      role: 'USER'
    });
    acc.push({
      text: content.answer,
      role: 'RAG',
      sourceDoc: content.sourceDoc
    });
    return acc;
  }, []);
};

// 处理用户发送新问题
const sendQuestion = async () => {
  if (!inputValue.value.trim()) return;

  // 将输入框的值赋给 question
  question.value = inputValue.value;
  // 立即清空输入框
  inputValue.value = '';

  // 如果该用户没有任何对话记录，自动创建一个
  if (dialogList.value.length === 0) {
    try {
      await createNewDialog('一段新的劫难');
    } catch (error) {
      showAlert("求问失败，请稍后再试", 0);
      console.error(error);
      return;
    }
  }

  if (!currentDialog.value) {
    showAlert("请先选择或开启新的劫难", 0);
    return;
  }

  // 添加用户问题到显示列表
  displayContentList.value.push({
    text: question.value,
    role: 'USER'
  });

  await nextTick(() => scrollToBottom('.dialog-content'));

  // 为RAG回答预留位置
  const ragMessageIndex = displayContentList.value.length;
  displayContentList.value.push({
    text: '',
    role: 'RAG',
    sourceDoc: []
  });

  try {
    isLoading.value = true;
    streamingMessageIndex.value = ragMessageIndex; // 标记正在流式接收的消息

    const commonQuestion: CommonQuestion = {
      dialogId: currentDialog.value.id,
      question: question.value,
      searchStrategy: configParams.value.searchStrategy,
      resultCount: configParams.value.resultCount,
      similarity: configParams.value.similarity
    }
    // 使用流式传输获取回答
    await getStreamingAnswer(commonQuestion, ragMessageIndex);

  } catch (error) {
    console.error('发送问题失败:', error);
    showAlert("系统繁忙，请稍后再试", 0);
    // 移除失败的RAG消息
    if (displayContentList.value.length > ragMessageIndex) {
      displayContentList.value.splice(ragMessageIndex, 1);
    }
  } finally {
    isLoading.value = false;
    streamingMessageIndex.value = null; // 清除流式接收标记
    question.value = ''; // 清空问题内容
  }
};

// 流式获取答案
const getStreamingAnswer = async (params: CommonQuestion, messageIndex: number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('未登录');
  }

  return new Promise<void>((resolve, reject) => {
    // 构造URL
    const url = `${window.location.origin}/api/rag/get`;

    // 设置超时控制
    const timeoutId = setTimeout(() => {
      reject(new Error('请求超时，请稍后重试'));
    }, 60000); // 60秒超时

    // 使用fetch进行POST请求来建立SSE连接
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(params)
    }).then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
        });
      }

      if (!response.body) {
        throw new Error('响应体为空');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const readStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // 处理缓冲区中剩余的数据
              if (buffer.trim()) {
                processBuffer(buffer, messageIndex);
              }
              break;
            }

            buffer += decoder.decode(value, { stream: true });

            // 处理完整的行
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // 保留不完整的行在缓冲区

            for (const line of lines) {
              if (line.trim() && line.startsWith('data: ')) {
                try {
                  const dataStr = line.slice(6).trim();
                  if (dataStr) {
                    const data = JSON.parse(dataStr);
                    const shouldContinue = handleStreamMessage(data, messageIndex);
                    if (!shouldContinue) {
                      clearTimeout(timeoutId);
                      resolve();
                      return;
                    }
                  }
                } catch (parseError) {
                  console.warn('解析SSE数据失败:', parseError, 'Line:', line);
                }
              }
            }
          }
          clearTimeout(timeoutId);
          resolve();
        } catch (streamError) {
          console.error('读取流数据失败:', streamError);
          clearTimeout(timeoutId);
          reject(streamError);
        } finally {
          reader.releaseLock();
        }
      };

      readStream(response);
    }).catch(error => {
      console.error('建立SSE连接失败:', error);
      clearTimeout(timeoutId);
      reject(error);
    });
  });
};

// 处理缓冲区数据
const processBuffer = (buffer: string, messageIndex: number) => {
  const lines = buffer.split('\n');
  for (const line of lines) {
    if (line.trim() && line.startsWith('data: ')) {
      try {
        const dataStr = line.slice(6).trim();
        if (dataStr) {
          const data = JSON.parse(dataStr);
          handleStreamMessage(data, messageIndex);
        }
      } catch (parseError) {
        console.warn('处理缓冲区数据失败:', parseError);
      }
    }
  }
};

// 处理流式消息
const handleStreamMessage = (data: any, messageIndex: number): boolean => {
  const ragMessage = displayContentList.value[messageIndex];
  if (!ragMessage) return true;

  switch (data.type) {
    case 'start':
      break;

    case 'documents':
      // 设置参考文档
      if (data.documents && Array.isArray(data.documents)) {
        ragMessage.sourceDoc = data.documents;
      }
      break;

    case 'content':
      // 逐步添加内容
      if (data.content) {
        ragMessage.text += data.content;
        // 自动滚动到底部显示最新内容
        scrollToBottom('.dialog-content');
      }
      break;

    case 'error':
      console.error('流式响应错误:', data.error);
      ragMessage.text = ragMessage.text || '抱歉，处理您的问题时出现了错误。';
      showAlert(data.error || "系统繁忙，请稍后再试", 0);
      streamingMessageIndex.value = null; // 清除流式状态
      return false; // 遇到错误时停止处理

    case 'done':
      streamingMessageIndex.value = null; // 清除流式状态
      return false; // 完成时停止处理

    default:
      console.warn('未知的消息类型:', data.type, data);
  }

  return true; // 继续处理后续消息
};

// 切换SourceDoc的显示状态
const toggleSourceDoc = (index: number) => {
  sourceDocVisibility.value = {
    ...sourceDocVisibility.value,
    [index]: !sourceDocVisibility.value[index]
  };
};

//处理新建对话弹窗逻辑
function showCreate() {
  showCreateDialog.value = true
  showConfigDialog.value = false
}

//处理参数设置弹窗逻辑
function showConfig() {
  showCreateDialog.value = false
  showConfigDialog.value = true
}

// 进入成就页面
const toAchievementPage = async () => {
  //console.log(localStorage.getItem('hasBindSteam'));
  if(localStorage.getItem('hasBindSteam') === 'false') {
    const steamId = await showAlert('天命人，请输入SteamID后再查看成就', 2);
    if(steamId) {
      isWaiting.value = true;
      await bindSteamAccount(steamId)
          .then(response => {
            if(response) {
              isWaiting.value = false;
              localStorage.setItem('hasBindSteam', 'true');
              router.push('/achievement');
            }
          })
          .catch(error => {
            showAlert('绑定Steam账号失败，请稍后再试', 0);
            isWaiting.value = false;
            console.error('获取成就信息失败:', error.response?.data || error.message);
          });
    }
  } else { // 已经绑定了steam
    await router.push('/achievement');
  }
}

const toPlayMethodsPage = async () => {
  await router.push('/play-methods');
}

const toBossTipsPage = async () => {
  await router.push('/boss-tips');
}

// 界面初始化加载
onMounted(async () => {
  try {
    // 进入加载状态
    isLoading.value = true;
    // 判断用户是否登录
    if (localStorage.getItem('userProfile')) {
      currentUser.value = JSON.parse(localStorage.getItem('userProfile') || '');
      token.value = localStorage.getItem('token') || '';
      // 获取全部的对话信息
      dialogList.value = await getAllHistory(currentUser.value);
      if (dialogList.value.length > 0) {
        // 初始化默认的对话
        currentDialog.value = await getDialogDetail(dialogList.value[0].id);
        displayContentList.value = convertToDisplayFormat(currentDialog.value.contentList); // 转换数据格式
      }
      await nextTick(() => scrollToBottom('.dialog-content'));
    } else {
      showAlert('天命人，请您先去登录，再来求问', 0).then(() => {
        router.push('/account'); // 跳转到登录页面
      });
    }
  } catch(error) {
    console.error(error);
  } finally {
    // 取消加载状态
    isLoading.value = false;
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
  overflow-x: auto;
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
  .main-container {
    flex: 1;
    display: flex;
    .dialog-list {
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
          font-family: 'Ma Shan Zheng', cursive;
        }
      }
      .dialog-list-container {
        overflow-y: auto;
        height: 90%;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */

        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
        .dialog-item {
          padding: 12px;
          margin: 8px 0;
          background: rgba(40, 40, 45, 0.8);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
          &:hover {
            background: rgba(50, 50, 55, 0.9);
            border-color: #c0aa6a33;
          }
          .dialog-title {
            font-size: 18px;
            letter-spacing: 2px;
            color: #d3b479;
            border-bottom: 2px solid #c0aa6a;
            padding-bottom: 10px;
          }
          .dialog-time {
            font-size: 16px;
            color: #a9956a;
            margin-top: 10px;
            text-align: end;
          }
        }
        .dialog-item.active {
          background: rgba(60, 60, 65, 0.9);
          border-color: #c0aa6a;
        }
        .empty-tip {
          text-align: center;
          padding: 20px;
          color: #7a6a4a;
        }
      }
    }

    .dialog-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px 30px 30px;

      .dialog-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .header-left {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          .dialog-title {
            font-size: 18px;
            letter-spacing: 2px;
            color: #d3b479;
            border-bottom: 2px solid #c0aa6a;
            padding-bottom: 10px;
          }
        }
        .header-right {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          letter-spacing: 2px;
          color: #d3b479;
          margin-bottom: 10px;
          .achieve-btn {
            width: 50px;
            height: 50px;
            font-family: 'Ma Shan Zheng', cursive;
            color: #c0aa6a;
            border-radius: 10%;
            background: #0e0e11;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
            .text-container {
              font-size: 16px;
              font-weight: bold;
              color: #d3b479;
              font-family: 'Ma Shan Zheng', cursive;
            }
            &:hover {
              transform: scale(1.2);
            }
          }
        }
      }
      .dialog-content {
        background-image: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/wukong.png');
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
        flex: 1;
        border: 1px solid #3a3a3f;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        /* 消息容器 */
        .message-container {
          display: flex;
          gap: 15px;
          margin: 20px 0;
          max-width: 90%;
          /* 头像样式 */
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

          /* 消息内容容器 */
          .message-content-wrapper {
            max-width: calc(100% - 50px);
            display: flex;
            flex-direction: column;
            gap: 8px;
            /* 消息气泡 */
            .message-bubble {
              padding: 15px 20px;
              border-radius: 12px;
              position: relative;
              max-width: 900px;
              .message-text {
                font-size: 18px;
                color: #d3b479;
                line-height: 1.6;
                /* 新增换行处理 */
                word-wrap: break-word;
                white-space: pre-wrap;
              }

              /* SourceDoc样式 */
              .source-doc-container {
                margin-top: 15px;
                border-top: 1px solid #3a3a3f;
                padding-top: 12px;

                .source-toggle {
                  background: none;
                  border: none;
                  color: #a99369;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 4px 8px;
                  font-family: 'Ma Shan Zheng', cursive;
                  transition: all 0.3s;
                  &:hover {
                    color: #c0aa6a;
                  }

                  .arrow {
                    font-size: 0.8em;
                    transition: transform 0.3s;
                  }

                  .arrow.open {
                    transform: rotate(180deg);
                  }
                }

                .source-doc-content {
                  margin-top: 10px;
                  background: rgba(28, 28, 31, 0.9);
                  border-radius: 6px;
                  padding: 12px;
                  border: 1px solid #3a3a3f;
                  .doc-item {
                    padding: 8px 0;
                    .doc-header {
                      display: flex;
                      gap: 15px;
                      margin-bottom: 8px;
                      .doc-source {
                        color: #c0aa6a;
                        font-size: 0.9em;
                      }

                      .doc-category {
                        color: #7a6a4a;
                        font-size: 0.8em;
                      }
                    }

                    .doc-content {
                      color: #d3b479;
                      font-size: 0.9em;
                      line-height: 1.4;
                    }

                    .doc-divider {
                      height: 1px;
                      background: #3a3a3f;
                      margin: 12px 0;
                    }

                    .slide-enter-active, .slide-leave-active {
                      transition: all 0.3s ease;
                      max-height: 500px;
                      overflow: hidden;
                    }

                    .slide-enter-from, .slide-leave-to {
                      max-height: 0;
                      opacity: 0;
                      padding: 0 12px;
                    }
                  }
                }
              }
            }
          }
        }

        /* 用户消息居右 */
        .user {
          flex-direction: row-reverse;
          margin-left: auto;
        }

        /* 用户气泡 */
        .user .message-bubble {
          background: rgba(79, 79, 84, 0.9);
          border-top-right-radius: 4px;
        }
        /* 系统气泡 */
        .rag .message-bubble {
          background: #333336;
          border-top-left-radius: 4px;
        }

        /* 用户消息气泡箭头（居右） */
        .user .message-bubble::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 15px;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-left-color: rgba(79, 79, 84, 0.9);
          border-right: 0;
        }

        /* 系统消息气泡箭头（居左） */
        .rag .message-bubble::after {
          content: '';
          position: absolute;
          left: -8px;
          top: 15px;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-right-color: #333336;
          border-left: 0;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 20px;
          .loading-dot {
            width: 8px;
            height: 8px;
            background: #c0aa6a;
            border-radius: 50%;
            animation: pulse 1.4s infinite ease-in-out;
          }
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

        // 流式输入光标样式
        .streaming-cursor {
          color: #c0aa6a;
          font-weight: bold;
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      }
      .dialog-input {
        display: flex;
        gap: 15px;
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
          position: relative;
          overflow: hidden;
          &:hover {
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

          &:hover .icon-container {
            opacity: 0;
          }

          &:hover .text-container {
            opacity: 1;
          }

        }
      }
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
        margin-top: 20px;
      }
    }
  }
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

  .xuan-button-group {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    .xuan-btn {
      flex: 1;
      padding: 8px 0;
      border-radius: 8px;
      background: rgba(40, 40, 45, 0.8);
      border: 1px solid #3a3a3f;
      color: #e7cc80;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: #c0aa6a;
        color: #c0aa6a;
      }
    }
  }

  .xuan-config-item {
    margin: 15px 0;

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
  }
}

</style>
