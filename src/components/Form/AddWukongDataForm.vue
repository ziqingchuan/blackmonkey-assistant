<template>
  <CustomAlert ref="customAlert" />
  <div class="edit-dialog-overlay" v-if="visible">
    <div class="edit-dialog">
      <div class="dialog-header">
        <h3>纂天·新增天机</h3>
        <div class="cloud-decoration"></div>
      </div>

      <div class="dialog-body">
        <!-- 文件上传 -->
        <div class="form-item">
          <label>上传文件</label>
          <div class="file-upload-box">
            <input
                type="file"
                ref="fileInput"
                accept=".html,.md,.pdf,.txt,.doc,.docx"
                @change="handleFileUpload"
            >
            <div class="upload-tip">
              <span v-if="!fileName">点击选择要上传的文件</span>
              <span v-else class="file-name">{{ fileName }}</span>
            </div>
          </div>
        </div>

        <!-- 文本内容 -->
        <div class="form-item">
          <label>文本内容</label>
          <textarea
              v-model="formData.text"
              class="ancient-input scrollable-text"
              placeholder="上传的文件内容会自动解析并显示在此处..."
          ></textarea>
        </div>
        <!-- 数据类别 -->
        <div class="form-item">
          <label>数据类别</label>
          <input
              type="text"
              v-model="formData.category"
              class="ancient-input"
              placeholder="请填写例如：游戏背景、游戏奖项、游戏玩法等"
              @keyup.enter="handleConfirm"
          >
        </div>
        <!-- 数据来源 -->
        <div class="form-item">
          <label>数据来源</label>
          <input
              type="text"
              v-model="formData.source"
              class="ancient-input"
              placeholder="请填写例如：百度百科、知乎、游民星空等"
              @keyup.enter="handleConfirm"
          >
        </div>
      </div>

      <div class="dialog-footer">
        <button class="cancel-btn" @click="handleCancel">取消</button>
        <button class="confirm-btn" @click="handleConfirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FileHandler } from '../../utils/fileHandlers.ts';
import type { InsertWukongDBInfo } from '../../apis/database.ts';
import CustomAlert from "../Dialog/CustomAlert.vue";
const customAlert = ref(); // 获取弹窗组件的引用
const props = defineProps({
  visible: Boolean,
});

// 显示弹窗
const showAlert = (message: string, type: number) => {
  return customAlert.value.show(message, type);
};


const emit = defineEmits(['update:visible', 'confirm']);

const formData = ref<InsertWukongDBInfo>({
  text: '',
  source: '',
  category: ''
});

const fileInput = ref<HTMLInputElement>();
const fileName = ref('');

const handleFileUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  fileName.value = file.name;

  try {
    formData.value.text = await FileHandler.handleFile(file);
  } catch (error) {
    console.error('文件解析失败:', error);
    showAlert('文件解析失败，请检查文件格式!', 0)
  }
};

const handleCancel = () => {
  resetForm();
  emit('update:visible', false);
};

const handleConfirm = () => {
  if (!validateForm()) return;
  emit('confirm', formData.value);
  resetForm();
  emit('update:visible', false);
};

const validateForm = () => {
  if (!formData.value.text || !formData.value.source || !formData.value.category) {
    showAlert('请填写完整的内容!', 0);
    return false;
  }
  return true;
};

const resetForm = () => {
  formData.value = { text: '', source: '', category: '' };
  fileName.value = '';
  if (fileInput.value) fileInput.value.value = '';
};

watch(() => props.visible, (newVal) => {
  if (!newVal) resetForm();
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=STKaiti&display=swap');

.edit-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-dialog {
  width: 500px;
  background: #1a1a1d;
  border: 2px solid #d3b479;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(211, 180, 121, 0.3);

  .dialog-header {
    text-align: center;
    margin-bottom: 20px;

    h3 {
      color: #d3b479;
      font-family: 'STKaiti', cursive;
      font-size: 24px;
      margin: 0;
    }

  }

  .dialog-body {
    .form-item {
      margin-bottom: 15px;

      label {
        display: block;
        color: #c0aa6a;
        margin-bottom: 5px;
        font-size: 16px;
      }

      .ancient-input {
        width: 96%;
        padding: 8px;
        background: rgba(40, 40, 45, 0.8);
        border: 1px solid #c0aa6a;
        color: #e7cc80;
        border-radius: 4px;
        font-family: 'STKaiti', cursive;

        &:focus {
          outline: none;
          box-shadow: 0 0 5px rgba(192, 170, 106, 0.5);
        }
      }

      textarea {
        height: 100px;
        resize: vertical;
        width: 96%;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */

        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;

    button {
      padding: 8px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'STKaiti', cursive;

      &.cancel-btn {
        background: rgba(192, 106, 106, 0.15);
        color: #c06a6a;
        border: 1px solid #c06a6a;

        &:hover {
          background: rgba(192, 106, 106, 0.25);
        }
      }

      &.confirm-btn {
        background: rgba(106, 170, 192, 0.15);
        color: #6aaac0;
        border: 1px solid #6aaac0;

        &:hover {
          background: rgba(106, 170, 192, 0.25);
        }
      }
    }
  }
}

.file-upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px dashed #e7cc80;
  border-radius: 4px;
  height: 100px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(40, 40, 45, 0.8);
  }

  input[type="file"] {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 9999;
  }

  .upload-tip {
    position: absolute;
    color: #e7cc80;
    font-size: 16px;

    .file-name {
      color: #d3b479;
      font-weight: bold;
    }
  }
}

.scrollable-text {
  max-height: 200px;
  overflow-y: auto;
  line-height: 1.6;
}
</style>