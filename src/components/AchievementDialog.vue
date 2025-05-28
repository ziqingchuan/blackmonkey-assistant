<template>
  <div class="dialog-overlay" v-if="show" @click.self="close">
    <div class="dialog-container">
      <div class="dialog-header">
        <h3>八十一难问答录</h3>
        <button class="close-button" @click="close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#e7cc80" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="dialog-content">
        <div class="message bot-message">
          <div class="avatar">
            <img src="/chatBot.png" alt="悟空" />
          </div>
          <div class="text">
            天命人，有何困惑？贫僧可为你解惑八十一难之道。
          </div>
        </div>

        <div class="message user-message">
          <div class="text">
            如何获得"大闹天宫"成就？
          </div>
          <div class="avatar">
            <img :src="userAvatar" alt="用户" />
          </div>
        </div>
      </div>

      <div class="dialog-input">
        <input type="text" placeholder="输入你的问题..." v-model="question" />
        <button class="send-button" @click="sendQuestion">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2Z" stroke="#e7cc80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

defineProps({
  show: Boolean,
  userAvatar: String
});

const emit = defineEmits(['close']);

const question = ref('');

const close = () => {
  emit('close');
};

const sendQuestion = () => {
  // 发送问题的逻辑
  if (question.value.trim()) {
    console.log('发送问题:', question.value);
    question.value = '';
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.dialog-container {
  width: 90%;
  max-width: 500px;
  background: linear-gradient(to bottom, #2a2118, #1a1510);
  border: 2px solid #d3b479;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: rgba(40, 40, 45, 0.8);
    border-bottom: 1px solid #d3b479;

    h3 {
      color: #e7cc80;
      margin: 0;
      font-size: 18px;
    }

    .close-button {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 5px;

      svg {
        width: 16px;
        height: 16px;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .dialog-content {
    height: 350px;
    padding: 20px;
    overflow-y: auto;
    background: rgba(40, 40, 45, 0.8);

    .message {
      display: flex;
      margin-bottom: 20px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .text {
        max-width: 80%;
        padding: 12px 15px;
        border-radius: 10px;
        font-size: 16px;
        line-height: 1.5;
      }
    }

    .bot-message {
      .text {
        background: rgba(211, 180, 121, 0.2);
        border: 1px solid #d3b479;
        color: #e7cc80;
        margin-left: 15px;
        border-top-left-radius: 0;
      }
    }

    .user-message {
      justify-content: flex-end;

      .text {
        background: rgba(40, 40, 45, 0.6);
        border: 1px solid #3a3a3f;
        color: #a89c7c;
        margin-right: 15px;
        border-top-right-radius: 0;
      }
    }
  }

  .dialog-input {
    display: flex;
    padding: 15px 20px;
    background: rgba(40, 40, 45, 0.8);
    border-top: 1px solid #d3b479;

    input {
      flex: 1;
      padding: 12px 15px;
      font-family: 'Ma Shan Zheng', cursive;
      background: rgba(40, 40, 45, 0.8);
      border: 1px solid #d3b479;
      border-radius: 8px;
      color: #e7cc80;
      font-size: 16px;

      &::placeholder {
        color: #a89c7c;
      }
    }
    .send-button {
      margin-left: 10px;
      background: rgba(211, 180, 121, 0.2);
      border: 1px solid #d3b479;
      border-radius: 45%;
      width: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: rgba(211, 180, 121, 0.3);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>