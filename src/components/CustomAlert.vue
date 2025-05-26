<template>
  <div v-if="isVisible" class="custom-alert-overlay">
    <div class="custom-alert">
      <!-- 头部提示 -->
      <div class="custom-alert-header">
        <RedCloudLeft />
        <div class="header-title">提示</div>
        <RedCloudRight />
      </div>

      <!-- 主内容 -->
      <div class="custom-alert-content">
        <div>{{ message }}</div>
        <div v-if="type === 2" class="input-container">
          <input
              v-model="inputValue"
              type="text"
              class="custom-input"
              placeholder="请输入内容"
          />
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="custom-alert-footer">
        <button
            v-if="type === 1 || type === 2"
            class="custom-alert-button cancel-button"
            @click="handleCancel"
        >
          <span class="button-text">取 消</span>
          <span class="button-decoration"></span>
        </button>
        <button
            class="custom-alert-button"
            @click="handleConfirm"
            :class="{ 'single-button': type === 0 }"
        >
          <span class="button-text">确 认</span>
          <span class="button-decoration"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RedCloudLeft from "../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../assets/icons/Clouds/RedCloud-Right.vue";

// 弹窗相关状态
const isVisible = ref(false);
const message = ref('');
const type = ref(0); // 0: 普通弹窗, 1: 带取消按钮弹窗, 2: 带输入框弹窗
const inputValue = ref(''); // 用户输入框内容
const resolvePromise = ref<((value: string | boolean) => void) | null>(null);

/**
 * 显示弹窗
 * @param msg - 提示信息
 * @param alertType - 弹窗类型 (0: 普通, 1: 带取消按钮, 2: 带输入框)
 * @returns Promise<boolean | string> - 确认返回 true (type 0/1) 或输入框内容 (type 2)，取消返回 false
 */
const show = (msg: string, alertType: number = 0): Promise<boolean | string> => {
  message.value = msg;
  type.value = alertType;
  inputValue.value = ''; // 清空输入框内容
  isVisible.value = true;

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
};

// 确认按钮回调
const handleConfirm = () => {
  isVisible.value = false;
  if (resolvePromise.value) {
    const result = type.value === 2 ? inputValue.value : true;
    resolvePromise.value(result); // 返回输入框内容或 true
  }
};

// 取消按钮回调
const handleCancel = () => {
  isVisible.value = false;
  if (resolvePromise.value) {
    resolvePromise.value(false); // 返回 false
  }
};

// 暴露方法供外部调用
defineExpose({ show });
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');
.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;

  .custom-alert {
    width: 380px;
    min-height: 280px;
    background: rgba(18, 18, 20, 0.95);
    border-radius: 12px;
    border: 2px solid #c0aa6a;
    box-shadow: 0 0 20px rgba(192, 170, 106, 0.2);
    display: flex;
    flex-direction: column;
    padding: 0;
    color: #e7cc80;
    font-family: 'Ma Shan Zheng', cursive;
    position: relative;
    overflow: hidden;

    .custom-alert-header {
      height: 50px;
      background: rgba(18, 18, 20, 0.95);
      border-bottom: 1px solid #e7cc80;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      gap: 20px;

      .header-title {
        font-size: 22px;
        letter-spacing: 2px;
        text-shadow: 0 0 8px rgba(231, 204, 128, 0.7);
        position: relative;
        z-index: 1;
        padding: 10px;
      }
    }

    .custom-alert-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 18px;
      padding: 30px 30px 0;
      line-height: 1.6;

      .input-container {
        margin-top: 20px;

        .custom-input {
          width: 96%;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #e7cc80;
          border-radius: 6px;
          background: rgba(40, 40, 45, 0.8);
          color: #e7cc80;
          font-family: 'Ma Shan Zheng', cursive;
          outline: none;
          transition: border-color 0.3s;

          &:focus {
            border-color: #c0aa6a;
          }
        }
      }
    }

    .custom-alert-footer {
      padding: 20px;
      display: flex;
      justify-content: center;
      gap: 20px;

      .custom-alert-button {
        background: linear-gradient(to bottom, #2d2517, rgba(40, 40, 45, 0.8));
        border: 1px solid #e7cc80;
        width: 120px;
        color: #e7cc80;
        padding: 8px 20px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Ma Shan Zheng', cursive;
        font-size: 18px;
        position: relative;
        overflow: hidden;
        outline: none;
        display: flex;
        flex-direction: column;
        align-items: center;

        &.single-button {
          width: 300px;
        }

        &.cancel-button {
          background: linear-gradient(to bottom, rgba(40, 40, 45, 0.8), #2d1717);
        }

        .button-text {
          position: relative;
          z-index: 1;
          letter-spacing: 2px;
        }

        .button-decoration {
          position: absolute;
          bottom: 0;
          width: 0;
          height: 1px;
          background: #e7cc80;
          transition: all 0.3s;
        }

        &:hover {
          box-shadow: 0 0 8px rgba(231, 204, 128, 0.7);

          .button-decoration {
            width: 80%;
          }
        }

        &:active {
          transform: translateY(1px);
        }
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(to right, transparent, #e7cc80, transparent);
      animation: glow 3s infinite;
    }
  }
}

@keyframes glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
</style>