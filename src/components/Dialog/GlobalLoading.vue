<template>
  <div v-if="isLoading" class="global-loading-overlay">
    <div class="loading-content">
      <!-- 金箍棒旋转动画 -->
      <div class="golden-stick"></div>
      <!-- 文字提示 -->
      <div class="loading-text">天机推演中...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>

<style lang="scss" scoped>

.global-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 10, 12, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 确保最高层级 */
  backdrop-filter: blur(3px);

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .golden-stick {
      width: 100px;
      height: 10px;
      background: linear-gradient(90deg, #d3b479, #f0d699, #d3b479);
      border-radius: 5px;
      box-shadow: 0 0 15px rgba(211, 180, 121, 0.7);
      animation: rotate 1.5s linear infinite;
    }

    @keyframes rotate {
      0% { transform: rotate(0deg) scaleX(1); }
      50% { transform: rotate(180deg) scaleX(1.2); }
      100% { transform: rotate(360deg) scaleX(1); }
    }

    .loading-text {
      color: #d3b479;
      font-size: 18px;
      font-family: 'STKaiti', cursive;
      text-shadow: 0 0 8px rgba(211, 180, 121, 0.5);
      letter-spacing: 2px;
      margin-top: 40px;
    }

  }
}

</style>