<template>
  <div v-if="isVisible" class="custom-alert-overlay">
    <div class="custom-alert">
      <div class="custom-alert-content">
        {{ message }}
      </div>
      <button class="custom-alert-button" @click="close">确认</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');

const show = (msg: string) => {
  message.value = msg;
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

// 暴露方法给父组件
defineExpose({ show });
</script>

<style lang="scss" scoped>
.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-alert {
  width: 300px;
  height: 200px;
  background: linear-gradient(to bottom, #3a3a3f, #1a1a1d);
  border-radius: 10px;
  border: 1px solid #c0aa6a;
  box-shadow: 0 0 20px rgba(192, 170, 106, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  color: #d3b479;
  font-family: 'Ma Shan Zheng', cursive;
}

.custom-alert-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
}

.custom-alert-button {
  background-color: rgba(192, 170, 106, 0.2);
  border: 1px solid #c0aa6a;
  color: #d3b479;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Ma Shan Zheng', cursive;
}

.custom-alert-button:hover {
  background-color: rgba(192, 170, 106, 0.4);
}
</style>