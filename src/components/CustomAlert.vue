<template>
  <div v-if="isVisible" class="custom-alert-overlay">
    <div class="custom-alert">
      <!-- 头部提示 -->
      <div class="custom-alert-header">
        <RedCloudLeft/>
        <div class="header-title">提示</div>
        <RedCloudRight/>
      </div>

      <!-- 主内容 -->
      <div class="custom-alert-content">
        {{ message }}
      </div>

      <!-- 底部按钮 -->
      <div class="custom-alert-footer">
        <button
            v-if="type === 1"
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
import RedCloudLeft from "../assets/icons/RedCloud-Left.vue";
import RedCloudRight from "../assets/icons/RedCloud-Right.vue";

const isVisible = ref(false);
const message = ref('');
const type = ref(0); // 0：普通弹窗，1：带取消按钮弹窗
const resolvePromise = ref<((value: boolean) => void) | null>(null);

const show = (msg: string, alertType: number = 0): Promise<boolean> => {
  message.value = msg;
  type.value = alertType;
  isVisible.value = true;

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
};

const handleConfirm = () => {
  isVisible.value = false;
  if (resolvePromise.value) {
    resolvePromise.value(true);
  }
};

const handleCancel = () => {
  isVisible.value = false;
  if (resolvePromise.value) {
    resolvePromise.value(false);
  }
};

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
  z-index: 1000;

  .custom-alert {
    width: 380px;
    min-height: 280px;
    background: rgba(18, 18, 20, 0.95);
    border-radius: 12px;
    border: 1px solid #e7cc80;
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
      gap: 30px;

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
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 18px;
      padding: 30px 30px 0;
      line-height: 1.6;
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