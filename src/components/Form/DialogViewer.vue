<template>
  <CustomAlert ref="customAlert" />
  <GlobalLoading :is-loading="isLoading" />
  
  <div class="dialog-viewer-container">
    <!-- 左侧对话列表（侧边栏） -->
    <div class="dialog-sidebar" v-show="props.sidebarVisible">
      <div class="sidebar-header">
        <CloudBeforeList class="cloud-decoration" />
        <span class="sidebar-title">对话列表</span>
      </div>
      
      <div class="dialog-list">
        <div v-if="!dialogList || dialogList.length === 0" class="empty-tip">
          暂无对话记录
        </div>
        
        <div 
          v-for="dialog in dialogList"
          :key="dialog.id"
          class="dialog-item"
          :class="{ active: selectedDialog?.id === dialog.id }"
          @click="selectDialog(dialog)"
        >
          <div class="dialog-item-header">
            <div class="dialog-title-text">{{ dialog.title?.length > 15 ? dialog.title.slice(0, 15) + '...' : dialog.title }}</div>
            <div class="dialog-meta">
              <span class="dialog-time">{{ formatTime(dialog.createTime) }}</span>
              <span class="dialog-count">{{ dialog.contentList?.length || 0 }}条</span>
            </div>
          </div>
          <div class="dialog-user-id">用户: {{ dialog.userId.slice(-6) || 'Unknown' }}</div>
        </div>
      </div>
      
      <!-- 导出按钮 -->
      <div class="export-section">
        <button 
          class="export-btn"
          @click="handleExport"
          :disabled="selectedQAPairs.length === 0"
          :title="selectedQAPairs.length === 0 ? '请先选择要导出的问答对' : `导出选定的${selectedQAPairs.length}条数据`"
        >
          <span class="export-text">导出数据</span>
          <span class="export-count" v-if="selectedQAPairs.length > 0">({{ selectedQAPairs.length }})</span>
        </button>
      </div>
    </div>

    <!-- 右侧对话详情 -->
    <div class="dialog-detail-container">
      <div v-if="!selectedDialog" class="no-selection">
        <div class="selection-tip">
          <h3>请选择一个对话查看详情</h3>
          <p>从左侧列表中点击任意对话即可查看完整内容</p>
        </div>
      </div>
      
      <div v-else class="dialog-detail">
        <div class="detail-header">
          <div class="header-info">
            <CloudBeforeTitle />
            <div class="header-content">
              <h3>{{ selectedDialog.title }}</h3>
              <div class="detail-meta">
                <span>用户ID: {{ selectedDialog.userId }}</span>
                <span>创建时间: {{ formatTime(selectedDialog.createTime) }}</span>
                <span>消息数量: {{ selectedDialog.contentList?.length || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="content-list">
          <div v-if="!selectedDialog.contentList || selectedDialog.contentList.length === 0" class="empty-content">
            此对话暂无消息内容
          </div>
          
          <div 
            v-for="(content, index) in selectedDialog.contentList"
            :key="index"
            class="content-item"
          >
            <!-- 问答对容器 -->
            <div class="qa-pair">
              <div class="qa-checkbox">
                <input 
                  type="checkbox" 
                  :id="`qa-${selectedDialog.id}-${index}`"
                  v-model="content.selected"
                  @change="handleQASelection(content, index)"
                  class="qa-checkbox-input"
                >
                <label :for="`qa-${selectedDialog.id}-${index}`" class="qa-checkbox-label"></label>
              </div>
              
              <div class="qa-content">
                <!-- 用户问题部分 -->
                <div class="question-section">
                  <div class="message-header">
                    <span class="message-label">用户提问</span>
                    <span class="message-time">{{ formatTime(content.createTime) }}</span>
                  </div>
                  <div class="message-content">{{ content.question }}</div>
                </div>
                
                <!-- 分隔线 -->
                <div class="qa-divider"></div>
                
                <!-- AI回答部分 -->
                <div class="answer-section">
                  <div class="message-header">
                    <span class="message-label">AI回答</span>
                    <span class="source-count" v-if="content.sourceDoc && content.sourceDoc.length > 0">
                      {{ content.sourceDoc.length }}个参考文档
                    </span>
                  </div>
                  <div class="message-content">{{ content.answer }}</div>
                  
                  <!-- 参考文档 -->
                  <div v-if="content.sourceDoc && content.sourceDoc.length > 0" class="source-docs">
                    <div class="source-header">参考文档:</div>
                    <div 
                      v-for="(doc, docIndex) in content.sourceDoc" 
                      :key="docIndex"
                      class="source-doc"
                    >
                      <div class="source-info">
                        <span class="source-category">{{ doc.category }}</span>
                        <span class="source-name">{{ doc.source }}</span>
                      </div>
                      <div class="source-content">{{ doc.content.slice(0, 200) }}...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {type Dialog, getAllUserDialogs} from '../../apis/dialog.ts';
import CustomAlert from '../Dialog/CustomAlert.vue';
import GlobalLoading from '../Dialog/GlobalLoading.vue';
import CloudBeforeTitle from '../../assets/icons/Clouds/Cloud-before-title.vue';
import CloudBeforeList from '../../assets/icons/Clouds/Cloud-before-list.vue';

// 定义props
const props = defineProps<{
  sidebarVisible?: boolean;
}>();

const customAlert = ref();
const isLoading = ref(false);
const dialogList = ref<Dialog[]>([]);
const selectedDialog = ref<Dialog>({
  id: 0,
  userId: 0,
  title: '',
  createTime: '',
  contentList: [],
});
const selectedQAPairs = ref<Array<{dialogId: string, index: number, content: any}>>([]);

// 显示弹窗
const showAlert = (message: string, type: number) => {
  return customAlert.value.show(message, type);
};

// 格式化时间
const formatTime = (time: Date | string) => {
  if (!time) return '未知时间';
  const date = new Date(time);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 选择对话
const selectDialog = (dialog: Dialog) => {
  selectedDialog.value = dialog;
  
  // 恢复这个对话中的选择状态
  if (selectedDialog.value?.contentList) {
    selectedDialog.value.contentList.forEach((content, index) => {
      // 检查这个问答对是否在全局选中列表中
      content.selected = selectedQAPairs.value.some(
          item => item.dialogId === selectedDialog.value?.id && item.index === index
      );
    });
  }
};

// 处理问答对的选择
const handleQASelection = (content: any, index: number) => {
  if (!selectedDialog.value) return;
  
  const qaItem = {
    dialogId: selectedDialog.value.id,
    dialogTitle: selectedDialog.value.title,
    index: index,
    content: content,
    question: content.question,
    answer: content.answer,
    createTime: content.createTime,
    sourceDoc: content.sourceDoc || []
  };
  
  if (content.selected) {
    // 添加到选中列表（检查是否已存在）
    const existingIndex = selectedQAPairs.value.findIndex(
      item => item.dialogId === selectedDialog.value?.id && item.index === index
    );
    if (existingIndex === -1) {
      selectedQAPairs.value.push(qaItem);
    }
    console.log('选中问答对:', qaItem);
  } else {
    // 从选中列表移除
    const removeIndex = selectedQAPairs.value.findIndex(
      item => item.dialogId === selectedDialog.value?.id && item.index === index
    );
    if (removeIndex > -1) {
      selectedQAPairs.value.splice(removeIndex, 1);
    }
    console.log('取消选中问答对');
  }
  
  console.log('当前选中的问答对数量:', selectedQAPairs.value.length);
  console.log('选中列表:', selectedQAPairs.value);
};

// 处理CSV导出
const handleExport = async () => {
  if (selectedQAPairs.value.length === 0) {
    showAlert('请先选择要导出的问答对', 0);
    return;
  }
  
  console.log('导出前选中的数据数量:', selectedQAPairs.value.length);
  console.log('导出前选中的数据:', selectedQAPairs.value);
  
  try {
    const confirmed = await showAlert(
      `是否确定导出选定的${selectedQAPairs.value.length}条数据？`, 
      1
    );
    
    console.log('用户确认结果:', confirmed);
    console.log('确认后选中的数据数量:', selectedQAPairs.value.length);
    
    if (confirmed === true) {
      exportToCSV();
    } else {
      console.log('用户取消了导出操作');
    }
  } catch (error) {
    console.error('确认对话框错误:', error);
    // 如果确认对话框有问题，直接导出
    exportToCSV();
  }
};

// 导出为CSV文件
const exportToCSV = () => {
  try {
    // CSV头部
    const headers = ['prompt', 'response', 'reference', 'retrievedContexts'];
    
    // 构建CSV数据
    const csvData = selectedQAPairs.value.map(item => {
      // 处理引用资料，将多个文档合并为一个字符串
      const retrievedContexts = item.sourceDoc && item.sourceDoc.length > 0 
        ? item.sourceDoc.map(doc => `[${doc.category}] ${doc.source}: ${doc.content}`).join(' | ')
        : '';
      
      // 清理和转义文本内容
      const cleanText = (text) => {
        if (!text) return '';
        return text.toString()
          .replace(/\r\n/g, ' ')  // 替换回车换行
          .replace(/\n/g, ' ')    // 替换换行
          .replace(/\r/g, ' ')    // 替换回车
          .replace(/"/g, '""')    // 转义双引号
          .trim();
      };
      
      return [
        `"${cleanText(item.question)}"`,      // 用户提问
        `"${cleanText(item.answer)}"`,        // AI回答  
        '""',                                 // reference字段为空
        `"${cleanText(retrievedContexts)}"`   // 引用资料
      ];
    });
    
    // 合并头部和数据
    const allRows = [headers, ...csvData];
    const csvContent = allRows.map(row => row.join(',')).join('\r\n');
    
    // 添加UTF-8 BOM来确保中文正确显示
    const BOM = '\uFEFF';
    const csvContentWithBOM = BOM + csvContent;
    
    console.log('CSV内容预览:', csvContent.substring(0, 500) + '...');
    
    // 创建并下载文件
    const blob = new Blob([csvContentWithBOM], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `对话导出_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 清理URL对象
    URL.revokeObjectURL(url);
    
    showAlert(`成功导出${selectedQAPairs.value.length}条数据`, 1);
    
  } catch (error) {
    console.error('导出失败:', error);
    showAlert('导出失败，请稍后重试', 0);
  }
};

// 获取对话列表
const fetchDialogs = async () => {
  try {
    isLoading.value = true;
    dialogList.value = await getAllUserDialogs();
    if(dialogList.value.length > 0) {
      selectedDialog.value = dialogList.value[0];
    }
  } catch (error: any) {
    console.error('获取对话列表失败:', error);
    dialogList.value = [];
    
    let errorMessage = '获取对话列表失败';
    if (error.response?.status === 403) {
      errorMessage = '权限不足，无法访问对话列表';
    } else if (error.response?.status === 401) {
      errorMessage = '未登录或登录已过期';
    } else if (error.message) {
      errorMessage = `获取失败: ${error.message}`;
    }
    
    showAlert(errorMessage, 0);
  } finally {
    isLoading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchDialogs();
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');

.dialog-viewer-container {
  display: flex;
  height: 100%;
  font-family: 'Ma Shan Zheng', cursive;
  
  .dialog-sidebar {
    width: 250px;
    background-image: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/dragon.png');
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 50px;
    border-right: 1px solid #3a3a3f;
    padding: 15px 20px 15px 20px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
    
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      position: relative;
      padding: 10px 0;
      border-bottom: 2px solid #c0aa6a;
      flex-shrink: 0;
      
      .sidebar-title {
        font-size: 20px;
        color: #d3b479;
        text-shadow: 0 0 8px rgba(192, 170, 106, 0.3);
        margin: 0 10px;
        position: relative;
        font-family: 'Ma Shan Zheng', cursive;
      }
    }
    
    .dialog-list {
      flex: 1;
      overflow-y: auto;
      margin-bottom: 5px;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */

      &::-webkit-scrollbar {
        display: none; /* Chrome/Safari/Opera */
      }
      
      .empty-tip {
        text-align: center;
        padding: 20px;
        color: #7a6a4a;
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
        
        &.active {
          background: rgba(60, 60, 65, 0.9);
          border-color: #c0aa6a;
        }
        
        .dialog-item-header {
          .dialog-title-text {
            font-size: 18px;
            letter-spacing: 2px;
            color: #d3b479;
            padding-bottom: 10px;
            line-height: 1.3;
          }
          
          .dialog-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #c0aa6a;
            
            .dialog-time {
              opacity: 0.8;
              flex: 1;
            }
            
            .dialog-count {
              background: rgba(211, 180, 121, 0.2);
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 11px;
            }
          }
        }
        
        .dialog-user-id {
          margin-top: 8px;
          font-size: 11px;
          color: #888;
          opacity: 0.7;
        }
      }
    }
  }
  
  .dialog-detail-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .no-selection {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      
      .selection-tip {
        text-align: center;
        padding: 40px;
        color: #7a6a4a;
        
        h3 {
          color: #d3b479;
          font-size: 24px;
          margin-bottom: 15px;
          font-family: 'Ma Shan Zheng', cursive;
        }
        
        p {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.8;
        }
      }
    }
    
    .dialog-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      
      .detail-header {
        margin-bottom: 20px;
        padding: 20px 20px 15px;
        border-bottom: 1px solid #3a3a3f;
        
        .header-info {
          display: flex;
          align-items: center;
          gap: 15px;
          
          .header-content {
            display: flex;
            flex-direction: row;
            h3 {
              color: #d3b479;
              font-size: 22px;
              font-family: 'Ma Shan Zheng', cursive;
            }
            
            .detail-meta {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              font-size: 14px;
              color: #c0aa6a;
              
              span {
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(192, 170, 106, 0.1);
                border-radius: 4px;
                border: 1px solid rgba(192, 170, 106, 0.2);
              }
            }
          }
        }
      }
      
      .content-list {
        flex: 1;
        overflow-y: auto;
        padding: 0 20px 20px;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */

        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
        
        .empty-content {
          text-align: center;
          padding: 60px 40px;
          color: #7a6a4a;
          font-size: 18px;
        }
        
        .content-item {
          margin-bottom: 30px;
          
          .qa-pair {
            display: flex;
            align-items: flex-start;
            padding: 18px;
            background: rgba(40, 40, 45, 0.6);
            border-radius: 8px;
            border: 1px solid rgba(60, 60, 65, 0.3);
            transition: all 0.3s;
            
            &:hover {
              background: rgba(50, 50, 55, 0.7);
              border-color: rgba(192, 170, 106, 0.3);
            }
            
            .qa-checkbox {
              margin-right: 15px;
              margin-top: 2px;
              
              .qa-checkbox-input {
                display: none;
                
                &:checked + .qa-checkbox-label {
                  background: #c0aa6a;
                  border-color: #d3b479;
                  
                  &::after {
                    content: '✓';
                    display: block;
                    color: #1a1a1d;
                    font-size: 12px;
                    font-weight: bold;
                    text-align: center;
                    line-height: 14px;
                  }
                }
              }
              
              .qa-checkbox-label {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 1px solid #c0aa6a;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s;
                
                &:hover {
                  border-color: #d3b479;
                  background: rgba(192, 170, 106, 0.1);
                }
              }
            }
            
            .qa-content {
              flex: 1;
              
              .question-section {
                margin-bottom: 15px;
                
                .message-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 8px;
                  
                  .message-label {
                    font-weight: bold;
                    font-size: 15px;
                    color: #4682b4;
                  }
                  
                  .message-time {
                    font-size: 12px;
                    opacity: 0.7;
                    color: #c0aa6a;
                  }
                }
                
                .message-content {
                  line-height: 1.6;
                  color: #e7cc80;
                  font-size: 15px;
                }
              }
              
              .qa-divider {
                height: 1px;
                background: linear-gradient(to right, transparent, #3a3a3f, transparent);
                margin: 15px 0;
              }
              
              .answer-section {
                margin-bottom: 10px;
                
                .message-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 8px;
                  
                  .message-label {
                    font-weight: bold;
                    font-size: 15px;
                    color: #6aaac0;
                  }
                  
                  .source-count {
                    font-size: 12px;
                    opacity: 0.7;
                    color: #c0aa6a;
                  }
                }
                
                .message-content {
                  line-height: 1.6;
                  color: #e7cc80;
                  font-size: 15px;
                  margin-bottom: 10px;
                }
              }
              
              .source-docs {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #3a3a3f;
                
                .source-header {
                  font-size: 14px;
                  color: #c0aa6a;
                  margin-bottom: 10px;
                  font-weight: bold;
                }
                
                .source-doc {
                  margin-bottom: 10px;
                  padding: 12px;
                  background: rgba(30, 30, 35, 0.5);
                  border-radius: 6px;
                  border: 1px solid rgba(60, 60, 65, 0.3);
                  
                  .source-info {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 8px;
                    
                    .source-category {
                      background: rgba(211, 180, 121, 0.2);
                      color: #d3b479;
                      padding: 3px 8px;
                      border-radius: 4px;
                      font-size: 12px;
                      border: 1px solid rgba(211, 180, 121, 0.3);
                    }
                    
                    .source-name {
                      color: #c0aa6a;
                      font-size: 12px;
                    }
                  }
                  
                  .source-content {
                    font-size: 13px;
                    color: #999;
                    line-height: 1.5;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  .export-section {
    margin-top: 8px;
    padding: 15px 0;
    border-top: 1px solid #3a3a3f;
    flex-shrink: 0;
    min-height: 80px;
    
    .export-btn {
      width: 100%;
      padding: 14px 16px;
      background: rgba(192, 170, 106, 0.1);
      border: 1px solid #c0aa6a;
      border-radius: 6px;
      color: #d3b479;
      font-family: 'Ma Shan Zheng', cursive;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 50px;
      
      &:hover:not(:disabled) {
        background: rgba(192, 170, 106, 0.2);
        border-color: #d3b479;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(192, 170, 106, 0.3);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        color: #7a6a4a;
        border-color: #7a6a4a;
      }
      
      .export-text {
        font-weight: bold;
      }
      
      .export-count {
        background: rgba(211, 180, 121, 0.3);
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
}
</style> 