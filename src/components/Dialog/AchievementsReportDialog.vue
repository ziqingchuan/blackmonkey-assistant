<template>
  <div v-if="show" class="report-dialog-overlay">
    <div class="report-dialog">
      <div class="dialog-header">
        <h3>成就报告分析</h3>
        <div class="cloud-decoration"></div>
      </div>

      <div class="dialog-body">
        <!-- 加载状态 -->
        <div v-if="isLoading && !content" class="loading-container">
          <div class="loading-spinner">
            <div class="spinner"></div>
            <p>正在分析您的游戏成就数据...</p>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMessage" class="error-message">
          <div class="error-icon">⚠️</div>
          <p>{{ errorMessage }}</p>
          <button class="retry-btn" @click="processStream">重试</button>
        </div>

        <!-- 内容区域 -->
        <div
            v-if="content"
            class="report-content scrollable-content"
            v-html="renderedContent"
        ></div>

        <!-- 完成状态 -->
        <div v-if="isComplete" class="completion-status">
          <div class="success-icon">✅</div>
          <p>报告生成完成</p>
        </div>
      </div>

      <div class="dialog-footer">
        <button class="cancel-btn" @click="closeDialog">关闭</button>
        <button
            v-if="isComplete && !errorMessage"
            class="download-btn"
            @click="downloadReport"
        >
          下载报告
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onBeforeUnmount, computed, onMounted} from 'vue';
import MarkdownIt from 'markdown-it';
import {scrollToBottom} from "../../utils/GlobalFunction.ts";

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['close']);

// 创建 Markdown 解析器实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// 组件状态
const content = ref('');
const isLoading = ref(false);
const isComplete = ref(false);
const errorMessage = ref('');
const abortController = ref<AbortController | null>(null);

// 处理流式数据
const processStream = async () => {
  if (!props.show) return;

  // 重置状态
  content.value = '';
  isLoading.value = true;
  isComplete.value = false;
  errorMessage.value = '';

  try {
    // 创建AbortController以便取消请求
    abortController.value = new AbortController();
    const signal = abortController.value.signal;

    // 获取认证token（根据实际项目调整）
    const token = localStorage.getItem('token') || '';

    // 使用fetch API发起请求
    const url = 'http://101.37.171.135:8000/api/ach/report';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      signal
    });

    if (!response.ok || !response.body) {
      console.error(`请求失败: ${response.status} ${response.statusText}`);
      return;
    }

    // 创建流读取器
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let partialData = '';

    // 开始读取流数据
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        isComplete.value = true;
        break;
      }

      // 解码并处理数据块
      const chunk = decoder.decode(value, { stream: true });
      partialData += chunk;

      // 处理完整的SSE事件
      while (partialData.includes('\n\n')) {
        const eventEndIndex = partialData.indexOf('\n\n');
        const eventData = partialData.substring(0, eventEndIndex);
        partialData = partialData.substring(eventEndIndex + 2);

        // 解析SSE事件
        if (eventData.startsWith('data: ')) {
          const jsonData = eventData.replace('data: ', '');
          try {
            const data = JSON.parse(jsonData);
            handleStreamEvent(data);
          } catch (error) {
            console.error('解析JSON失败:', error);
          }
        }
      }
    }
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      errorMessage.value = err.message || '请求失败';
      console.error('流式请求错误:', err);
    }
  } finally {
    isLoading.value = false;
    abortController.value = null;
  }
};

// 处理流事件
const handleStreamEvent = (data: any) => {
  switch (data.type) {
    case 'start':
      break;
    case 'content':
      content.value += data.content;
      scrollToBottom('.report-content')
      break;
    case 'error':
      errorMessage.value = data.error || '生成报告时出错';
      break;
    case 'done':
      isComplete.value = true;
      localStorage.setItem('report', content.value);
      break;
  }
};

// 下载报告功能
const downloadReport = () => {
  if (!content.value) {
    console.error('没有内容可下载');
    return;
  }

  try {
    // 创建Blob对象
    const blob = new Blob([content.value], { type: 'text/markdown;charset=utf-8' });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // 生成文件名：成就报告_年月日_时分秒.md
    const now = new Date();
    const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    const filename = `成就报告_${timestamp}.md`;

    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    // 添加到文档并触发点击
    document.body.appendChild(link);
    link.click();

    // 清理资源
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('下载报告失败:', error);
    errorMessage.value = '下载报告时出错，请稍后再试';
  }
};

// 关闭连接
const closeConnection = () => {
  if (abortController.value) {
    abortController.value.abort();
    abortController.value = null;
  }
  isLoading.value = false;
};

// 关闭对话框
const closeDialog = () => {
  closeConnection();
  emit('close');
};

// 将Markdown转换为HTML
const renderedContent = computed(() => {
  return md.render(content.value);
});

// 监听show属性变化
watch(() => props.show, (newVal) => {
  if (newVal && content.value === '') {
    processStream();
  } else {
    closeConnection();
  }
});

onMounted(() => {
  content.value = localStorage.getItem('report') || "";
  isComplete.value = true;
});

// 组件卸载时关闭连接
onBeforeUnmount(() => {
  closeConnection();
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=STKaiti&display=swap');

.report-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}

.report-dialog {
  width: 800px;
  max-height: 80vh;
  background: #1a1a1d;
  border: 2px solid #d3b479;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 0 30px rgba(211, 180, 121, 0.4);
  display: flex;
  flex-direction: column;
  position: relative;

  .dialog-header {
    text-align: center;
    margin-bottom: 20px;
    position: relative;

    h3 {
      color: #d3b479;
      font-family: 'STKaiti', cursive;
      font-size: 28px;
      margin: 0;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(211, 180, 121, 0.7);
    }

    .cloud-decoration {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 15px;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 20"><path fill="none" stroke="%23d3b479" stroke-width="2" stroke-opacity="0.3" d="M0,10 Q30,0 60,10 T120,10" /></svg>') no-repeat center;
      background-size: contain;
    }
  }

  .dialog-body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;

      .loading-spinner {
        text-align: center;

        .spinner {
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          border: 5px solid rgba(211, 180, 121, 0.2);
          border-top: 5px solid #d3b479;
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        p {
          color: #c0aa6a;
          font-size: 18px;
        }
      }
    }

    .error-message {
      background: rgba(192, 106, 106, 0.15);
      border: 1px solid #c06a6a;
      border-radius: 8px;
      padding: 20px;
      text-align: center;

      .error-icon {
        font-size: 40px;
        margin-bottom: 15px;
      }

      p {
        color: #e7cc80;
        margin-bottom: 20px;
      }

      .retry-btn {
        background: rgba(106, 170, 192, 0.15);
        color: #6aaac0;
        border: 1px solid #6aaac0;
        border-radius: 4px;
        padding: 8px 20px;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'STKaiti', cursive;

        &:hover {
          background: rgba(106, 170, 192, 0.25);
        }
      }
    }

    .report-content {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
      background: rgba(40, 40, 45, 0.8);
      border-radius: 8px;
      border: 1px solid #c0aa6a;
      color: #e7cc80;
      line-height: 1.6;
      font-size: 16px;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */
      &::-webkit-scrollbar {
        display: none; /* Chrome/Safari/Opera */
      }
    }

    .completion-status {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
      padding: 10px;
      background: rgba(106, 192, 106, 0.15);
      border: 1px solid #6ac06a;
      border-radius: 8px;

      .success-icon {
        font-size: 24px;
        margin-right: 10px;
      }

      p {
        color: #e7cc80;
        font-size: 16px;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 25px;

    button {
      padding: 10px 25px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'STKaiti', cursive;
      font-size: 18px;
      border: none;
      min-width: 120px;

      &.cancel-btn {
        background: linear-gradient(145deg, #c06a6a, #a05555);
        color: #fff;
        box-shadow: 0 4px 8px rgba(192, 106, 106, 0.3);

        &:hover {
          background: linear-gradient(145deg, #d17575, #b05e5e);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(192, 106, 106, 0.4);
        }
      }

      &.download-btn {
        background: linear-gradient(145deg, #6aaac0, #558fa3);
        color: #fff;
        box-shadow: 0 4px 8px rgba(106, 170, 192, 0.3);

        &:hover {
          background: linear-gradient(145deg, #7bbbd1, #66a0b4);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(106, 170, 192, 0.4);
        }
      }
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 850px) {
  .report-dialog {
    width: 90%;
    max-height: 85vh;
  }
}

@media (max-width: 600px) {
  .report-dialog {
    padding: 15px;

    .dialog-header h3 {
      font-size: 24px;
    }

    .dialog-footer {
      flex-direction: column;
      gap: 10px;

      button {
        width: 100%;
      }
    }
  }
}
</style>

<style>
/* Markdown内容样式 */
.report-content h1,
.report-content h2,
.report-content h3 {
  color: #d3b479;
  border-bottom: 1px solid rgba(211, 180, 121, 0.3);
  padding-bottom: 8px;
  margin-top: 20px;
  margin-bottom: 15px;
}

.report-content h1 {
  font-size: 28px;
}

.report-content h2 {
  font-size: 24px;
}

.report-content h3 {
  font-size: 20px;
}

.report-content p {
  margin-bottom: 15px;
}

.report-content ul,
.report-content ol {
  margin: 15px 0;
  padding-left: 30px;
}

.report-content li {
  margin-bottom: 8px;
}

.report-content blockquote {
  border-left: 4px solid #d3b479;
  background: rgba(211, 180, 121, 0.1);
  padding: 10px 15px;
  margin: 15px 0;
  border-radius: 0 8px 8px 0;
}

.report-content pre {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  margin: 15px 0;
  border: 1px solid #444;
}

.report-content code {
  background: rgba(40, 40, 45, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
  color: #e7cc80;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
}

.report-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.report-content th,
.report-content td {
  border: 1px solid #c0aa6a;
  padding: 10px;
  text-align: left;
}

.report-content th {
  background: rgba(211, 180, 121, 0.2);
  color: #d3b479;
}

.report-content tr:nth-child(even) {
  background: rgba(40, 40, 45, 0.5);
}

.report-content a {
  color: #6aaac0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #7bbbd1;
  }
}
</style>