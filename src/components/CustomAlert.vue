<template>
  <div v-if="isVisible" class="custom-alert-overlay">
    <div class="custom-alert">
      <!-- 新增头部区域 -->
      <div class="custom-alert-header">
        <CloudUnderInput/>
        <div class="header-title">提示</div>
        <CloudUnderInput/>
        <div class="header-ornament left"></div>
        <div class="header-ornament right"></div>
      </div>

      <!-- 内容区域 -->
      <div class="custom-alert-content">
        {{ message }}
      </div>

      <!-- 底部按钮 -->
      <div class="custom-alert-footer">
        <button class="custom-alert-button" @click="close">
          <span class="button-text">确 认</span>
          <span class="button-decoration"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CloudUnderInput from "../assets/icons/Cloud-under-input.vue";

const isVisible = ref(false);
const message = ref('');

const show = (msg: string) => {
  message.value = msg;
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

defineExpose({ show });
</script>

<style lang="scss" scoped>

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
    background: linear-gradient(to bottom, #1a1a1a, #0a0a0a);
    border-radius: 12px;
    border: 1px solid #8a6d3b;
    box-shadow:
        0 0 30px rgba(231, 204, 128, 0.3),
        inset 0 0 10px rgba(138, 109, 59, 0.3);
    display: flex;
    flex-direction: column;
    padding: 0;
    color: #e7cc80;
    font-family: 'Ma Shan Zheng', cursive;
    position: relative;
    overflow: hidden;

    .custom-alert-header {
      height: 50px;
      background: linear-gradient(to bottom, #3a2a0f, #1a1408);
      border-bottom: 1px solid #8a6d3b;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .header-title {
        font-size: 22px;
        letter-spacing: 2px;
        text-shadow: 0 0 8px rgba(231, 204, 128, 0.7);
        position: relative;
        z-index: 1;
        padding: 10px;
      }

      .header-ornament {
        position: absolute;
        top: 0;
        width: 60px;
        height: 100%;

        &.left {
          left: 20px;
          transform: scaleX(-1);
        }

        &.right {
          right: 20px;
        }
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
      background-image:
          radial-gradient(circle at 10% 20%, rgba(138, 109, 59, 0.1) 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, rgba(138, 109, 59, 0.1) 0%, transparent 20%);
    }

    .custom-alert-footer {
      padding: 20px;
      display: flex;
      justify-content: center;

      .custom-alert-button {
        background: linear-gradient(to bottom, #3a2a0f, #1a1408);
        border: 1px solid #8a6d3b;
        color: #e7cc80;
        padding: 8px 40px;
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
          background: linear-gradient(to bottom, #4a3a1f, #2a2408);
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