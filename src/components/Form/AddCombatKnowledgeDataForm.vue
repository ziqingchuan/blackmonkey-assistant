<template>
  <CustomAlert ref="customAlert" />
  <div class="edit-dialog-overlay" v-if="visible">
    <div class="edit-dialog">
      <div class="dialog-header">
        <h3>纂天·新增打法推荐</h3>
        <div class="cloud-decoration"></div>
      </div>

      <div class="dialog-body">
        <!-- 标题 -->
        <div class="form-item">
          <label>标题</label>
          <input
              type="text"
              v-model="formData.title"
              class="ancient-input"
              @keyup.enter="handleConfirm"
          >
        </div>

        <!-- 内容 -->
        <div class="form-item">
          <label>内容</label>
          <textarea
              v-model="formData.content"
              class="ancient-input"
          ></textarea>
        </div>

        <!-- 分类 -->
        <div class="form-item">
          <label>类别</label>
          <input
              type="text"
              v-model="formData.category"
              class="ancient-input"
          >
        </div>

        <!-- 关键词 -->
        <div class="form-item">
          <label>关键词 (逗号分隔)</label>
          <input
              type="text"
              v-model="keywordsString"
              class="ancient-input"
          >
        </div>

        <!-- 评分 -->
        <div class="form-item">
          <label>评分 (1-10)</label>
          <input
              type="number"
              v-model.number="formData.rating"
              class="ancient-input"
              placeholder="1-10"
              min="1"
              max="10"
          >
        </div>

        <!-- 难度等级 -->
        <div class="form-item">
          <label>难度系数</label>
          <input
              type="text"
              v-model="formData.difficulty_level"
              class="ancient-input"
          >
        </div>

        <!-- 战斗类型 -->
        <div class="form-item">
          <label>战斗类型</label>
          <input
              type="text"
              v-model="formData.combat_type"
              class="ancient-input"
          >
        </div>

        <!-- 消耗物品 -->
        <div class="form-item">
          <label>消耗物品</label>
          <input
              type="text"
              v-model="formData.cost_type"
              class="ancient-input"
          >
        </div>

        <!-- 使用场景 -->
        <div class="form-item">
          <label>使用场景</label>
          <input
              type="text"
              v-model="formData.usage_scenario"
              class="ancient-input"
          >
        </div>

        <!-- 前置要求 -->
        <div class="form-item">
          <label>前置要求 (逗号分隔)</label>
          <input
              type="text"
              v-model="prerequisitesString"
              class="ancient-input"
          >
        </div>

        <!-- 相关技能 -->
        <div class="form-item">
          <label>相关技能 (逗号分隔)</label>
          <input
              type="text"
              v-model="relatedSkillsString"
              class="ancient-input"
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
import type { InsertCombatKnowledgeDBInfo } from '../../apis/database.ts';
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

// 使用CombatKnowledge数据结构
const formData = ref<InsertCombatKnowledgeDBInfo>({
  title: '',
  content: '',
  category: '',
  keywords: [],
  rating: 5,
  difficulty_level: '',
  combat_type: '',
  cost_type: '',
  usage_scenario: '',
  prerequisites: [],
  related_skills: [],
});

// 用于绑定关键词输入框的字符串
const keywordsString = ref('');
// 用于绑定前置条件的字符串
const prerequisitesString = ref('');
// 用于绑定相关技能的字符串
const relatedSkillsString = ref('');

// 将逗号分隔的字符串转换为数组
const toArray = (str: string) => {
  return str
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);
};

const handleCancel = () => {
  resetForm();
  emit('update:visible', false);
};

const handleConfirm = () => {
  // 更新数组字段
  formData.value.keywords = toArray(keywordsString.value);
  formData.value.prerequisites = toArray(prerequisitesString.value);
  formData.value.related_skills = toArray(relatedSkillsString.value);

  if (!validateForm()) return;

  console.log('formData:', formData.value);
  emit('confirm', formData.value);
  resetForm();
  emit('update:visible', false);
};

const validateForm = () => {
  if (!formData.value.title || !formData.value.content) {
    showAlert('标题和详细内容是必填项!', 0);
    return false;
  }

  if (formData.value.rating < 1 || formData.value.rating > 10) {
    showAlert('评分必须在1-10之间!', 0);
    return false;
  }

  return true;
};

const resetForm = () => {
  formData.value = {
    title: '',
    content: '',
    category: '',
    keywords: [],
    rating: 5,
    difficulty_level: '',
    combat_type: '',
    cost_type: '',
    usage_scenario: '',
    prerequisites: [],
    related_skills: [],
  };
  keywordsString.value = '';
  prerequisitesString.value = '';
  relatedSkillsString.value = '';
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