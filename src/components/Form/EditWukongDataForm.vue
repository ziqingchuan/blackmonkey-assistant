<template>
  <CustomAlert ref="customAlert" />
  <div class="edit-dialog-overlay" v-if="visible">
    <div class="edit-dialog">
      <div class="dialog-header">
        <h3>修改数据</h3>
      </div>

      <div class="dialog-body">
        <div class="form-item">
          <label>文本内容</label>
          <textarea v-model="formData.text" class="ancient-input"></textarea>
        </div>
        <div class="form-item">
          <label>数据类别</label>
          <input type="text" v-model="formData.category" class="ancient-input">
        </div>
        <div class="form-item">
          <label>数据来源</label>
          <input type="text" v-model="formData.source" class="ancient-input">
        </div>
      </div>

      <div class="dialog-footer">
        <button class="cancel-btn" @click="handleCancel">取消</button>
        <button class="confirm-btn" @click="handleConfirm">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { WukongDBInfo } from '../../apis/database.ts';
import CustomAlert from "../Dialog/CustomAlert.vue";
const customAlert = ref(); // 获取弹窗组件的引用
const props = defineProps({
  visible: Boolean,
  editingData: {
    type: Object as () => WukongDBInfo | null,
    default: null
  }
});

// 显示弹窗
const showAlert = (message: string, type: number) => {
  return customAlert.value.show(message, type);
};


const emit = defineEmits(['update:visible', 'confirm']);

const formData = ref({
  text: '',
  category: '',
  source: ''
});

// 监听编辑数据变化
watch(() => props.editingData, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
  }
});

const handleCancel = () => {
  emit('update:visible', false);
};

const handleConfirm = () => {
  if (!formData.value.text || !formData.value.category || !formData.value.source) {
    showAlert('请填写完整的内容!', 0);
    return;
  }
  emit('confirm', formData.value);
  emit('update:visible', false);
};
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
        font-size: 14px;
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
</style>