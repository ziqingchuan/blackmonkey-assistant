<template>
  <CustomAlert ref="customAlert" />
  <div class="edit-dialog-overlay" v-if="visible">
    <div class="edit-dialog">
      <div class="dialog-header">
        <h3>纂天·新增成就</h3>
        <div class="cloud-decoration"></div>
      </div>

      <div class="dialog-body">
        <!-- 成就名称 -->
        <div class="form-item">
          <label>成就名称</label>
          <input
              type="text"
              v-model="formData.name"
              class="ancient-input"
              placeholder="请输入成就名称"
              @keyup.enter="handleConfirm"
          >
        </div>

        <!-- 成就描述 -->
        <div class="form-item">
          <label>成就描述</label>
          <textarea
              v-model="formData.description"
              class="ancient-input"
              placeholder="请输入成就详细描述"
          ></textarea>
        </div>

        <!-- 图标URL -->
        <div class="form-item">
          <label>图标URL</label>
          <input
              type="text"
              v-model="formData.icon"
              class="ancient-input"
              placeholder="输入图标URL地址"
          >
        </div>

        <!-- 灰色图标URL -->
        <div class="form-item">
          <label>灰色图标URL</label>
          <input
              type="text"
              v-model="formData.icon_gray"
              class="ancient-input"
              placeholder="输入未完成状态的图标URL"
          >
        </div>

        <!-- 是否隐藏 -->
        <div class="form-item checkbox-item">
          <label>
            <input type="checkbox" v-model="formData.hidden">
            是否隐藏成就
          </label>
        </div>

        <!-- 完成度 -->
        <div class="form-item">
          <label>完成度 (%)</label>
          <input
              type="number"
              v-model.number="formData.complete_percentage"
              class="ancient-input"
              placeholder="0-100"
              min="0"
              max="100"
          >
        </div>

        <!-- 获取方式 -->
        <div class="form-item">
          <label>获取方式</label>
          <input
              type="text"
              v-model="formData.access"
              class="ancient-input"
              placeholder="描述如何获得此成就"
          >
        </div>

        <!-- 关键词 -->
        <div class="form-item">
          <label>关键词 (逗号分隔)</label>
          <input
              type="text"
              v-model="keywordsString"
              class="ancient-input"
              placeholder="例如: 战斗,探索,收集"
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
import { ref, watch, computed } from 'vue';
import type { InsertAchievementsDBInfo } from '../../apis/database.ts';
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

// 使用Achievements数据结构
const formData = ref<InsertAchievementsDBInfo>({
  ID: '', // 通常由后端生成
  name: '',
  description: '',
  icon: '',
  icon_gray: '',
  hidden: false,
  complete_percentage: 0,
  access: '',
  keywords: []
});

// 用于绑定关键词输入框的字符串
const keywordsString = ref('');

// 将逗号分隔的字符串转换为关键词数组
const keywordsArray = computed(() => {
  return keywordsString.value
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);
});

const handleCancel = () => {
  resetForm();
  emit('update:visible', false);
};

const handleConfirm = () => {
  // 更新关键词数组
  formData.value.keywords = keywordsArray.value;

  if (!validateForm()) return;

  // 生成简单ID（实际应用中应由后端生成）
  formData.value.ID = `ach_${Date.now()}`;

  emit('confirm', formData.value);
  resetForm();
  emit('update:visible', false);
};

const validateForm = () => {
  if (!formData.value.name || !formData.value.description) {
    showAlert('成就名称和描述是必填项!', 0);
    return false;
  }

  if (formData.value.complete_percentage < 0 || formData.value.complete_percentage > 100) {
    showAlert('完成度必须在0-100之间!', 0);
    return false;
  }

  return true;
};

const resetForm = () => {
  formData.value = {
    ID: '',
    name: '',
    description: '',
    icon: '',
    icon_gray: '',
    hidden: false,
    complete_percentage: 0,
    access: '',
    keywords: []
  };
  keywordsString.value = '';
};

watch(() => props.visible, (newVal) => {
  if (!newVal) resetForm();
});
</script>

<style scoped lang="scss">
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
  max-height: 80vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Opera */
  }
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
      font-family: 'Ma Shan Zheng', cursive;
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
        font-family: 'Ma Shan Zheng', cursive;

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

      &.checkbox-item {
        label {
          display: flex;
          align-items: center;
          cursor: pointer;

          input[type="checkbox"] {
            margin-right: 8px;
            width: 16px;
            height: 16px;
            accent-color: #d3b479;
          }
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
      font-family: 'Ma Shan Zheng', cursive;

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

.scrollable-text {
  max-height: 200px;
  overflow-y: auto;
  line-height: 1.6;
}
</style>