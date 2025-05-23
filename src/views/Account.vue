<template>
  <CustomAlert ref="customAlert" />
  <!-- 主体 -->
  <div class="body">
    <div class="container" id="container" :class="{ 'right-panel-active': rightPanelActive }">
      <div class="form-container sign-up-container">
        <div class="form">
          <h1>凝聚元神，重铸法身</h1>
          <div class="input-container">
            <div class="input-tips">邮&nbsp;箱：</div>
            <input
                v-model="formData.email"
                type="email"
                required
                placeholder="玉简传讯，留尔天机"
                @input="validateEmail"
            />
            <button
                class="send-code-btn"
                :disabled="!isEmailValid || isCountingDown"
                @click="sendValidCode"
            >
              {{ countdown > 0 ? `${countdown}秒后重试` : '获取仙符' }}
            </button>
          </div>
          <div class="input-container">
            <div class="input-tips">验证码：</div>
            <input
                v-model="formData.validCode"
                type="text"
                maxlength="6"
                placeholder="仙符验证，输入天机"
            />
          </div>
          <div class="input-container">
            <div class="input-tips">密&nbsp;码：</div>
            <input
                v-model="formData.password"
                type="password"
                maxlength="20"
                required
                placeholder="六道轮回，密令自显"
            />
          </div>
          <button class="ghost" @click="handleRegister">注册</button>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="form">
          <h1>大圣归来，再战苍穹</h1>
          <div class="input-container">
            <div class="input-tips">邮&nbsp;箱：</div>
            <input
                v-model="formData.email"
                type="email"
                required
                placeholder="元神印记，显化真形"
            />
          </div>
          <div class="input-container">
            <div class="input-tips">密&nbsp;码：</div>
            <input
                v-model="formData.password"
                type="password"
                required
                placeholder="法宝秘钥，谨记于心"
            />
          </div>
          <button class="ghost" @click="handleLogin">登录</button>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>劫波渡尽，故人依旧</h1>
            <p>已有元神印记？此去灵山十万路，且凭金身踏祥云</p>
            <button class="ghost" id="signIn" @click="signIn">去登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>初入三界，造化新生</h1>
            <p>尚无功德文牒？此间因果待书写，且结善缘证菩提</p>
            <button class="ghost" id="signUp" @click="signUp">去注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { login, register, getSalt, getValidCode, type RegisterInfo, type LoginInfo } from '../apis/user';
import sha256 from 'crypto-js/sha256'; // 用来加密的库
import { genSaltSync } from 'bcryptjs';// 用来生成盐值的库
import CustomAlert from "../components/CustomAlert.vue";// 自定义弹窗组件

// ==================== 变量声明 ====================
const rightPanelActive = ref(false);
const router = useRouter();
const isEmailValid = ref(false);
const isCountingDown = ref(false);
const countdown = ref(0);
let countdownTimer: number | null = null;
const customAlert = ref(); // 获取弹窗组件的引用
const formData = ref<RegisterInfo>({
  email: '',
  validCode: '',
  password: '',
  salt: ''
});

const loginInfo = ref<LoginInfo>({
  email: '',
  password: ''
});

// ==================== 函数声明 ====================
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailRegex.test(formData.value.email);
};

// 显示弹窗
const showAlert = (message: string, type: number) => {
  customAlert.value.show(message, type);
};

const sendValidCode = async () => {
  if (!isEmailValid.value) return;

  try {
    await getValidCode(formData.value.email);
    startCountdown();
    showAlert('仙符已发送至玉简，请查收', 0);
  } catch (error) {
    console.error(error);
    showAlert('仙符发送失败，请稍后再试', 0);
  }
};

const startCountdown = () => {
  isCountingDown.value = true;
  countdown.value = 60;

  countdownTimer = window.setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      isCountingDown.value = false;
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    }
  }, 1000);
};

const handleLogin = async () => {
  try {
    const saltResponse = await getSalt(formData.value.email);
    const salt = saltResponse.data.salt;
    console.log("获取到的salt:", salt);
    const hashedPassword = sha256(`${formData.value.password}${salt}`).toString();
    console.log("登录加密后的密码:", hashedPassword);

    loginInfo.value = {
      email: formData.value.email,
      password: hashedPassword
    }

    await login(loginInfo.value).then((res) => {
      console.log("登录返回信息:", res.data);
      const token = res.data.token.access_token;
      localStorage.setItem('token', token);
      localStorage.setItem('userProfile', JSON.stringify(res.data));
      router.push({ name: 'rag-user' });
    });
  } catch (error) {
    console.error(error);
    showAlert('登录失败，请检查邮箱或密码是否正确', 0);
  }
};

const handleRegister = async () => {
  try {
    formData.value.salt = genSaltSync(10);
    console.log("生成的salt:", formData.value.salt);
    await register({
      email: formData.value.email,
      salt: formData.value.salt,
      password: sha256(`${formData.value.password}${formData.value.salt}`).toString(),
      validCode: formData.value.validCode
    }).then((res) => {
      console.log("注册返回信息:", res.data);
    });
    showAlert('注册成功！请登录', 0);
    signIn();
  } catch (error) {
    console.error(error);
    showAlert('注册失败，邮箱可能已被注册或验证码错误', 0);
  }
};

const signUp = () => {
  rightPanelActive.value = true;
};

const signIn = () => {
  rightPanelActive.value = false;
};

onBeforeUnmount(() => {
  // 清除定时器
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');
/* 全局样式 */
input {
  background-color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 15px;
  margin: 20px 0 20px;
  width: 100%;
  height: 20px;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 18px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 18px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  font-family: 'Ma Shan Zheng', cursive;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
}

button.ghost {
  background-color: rgba(63, 62, 62, 0.44);
  border-color: #FFFFFF;
  &:hover {
    background-color: rgba(145, 143, 143, 0.18);
  }
}

/* 主体样式 */
.body {
  display: flex;
  background: linear-gradient(to right, #484849, #1d1d1e);
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;

  .container {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 98%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Ma Shan Zheng', cursive;
    font-size: 24px;
    border-radius: 20px;

    .form {
      background-image: url('/form-bkg.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 50px;
      height: 100%;
      text-align: center;
      color: white;
      font-family: 'Ma Shan Zheng', cursive;
      font-size: 24px;

      .input-container {
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        width: 100%;
        .input-tips {
          width: 130px;
        }
        .send-code-btn {
          border-radius: 20px;
          height: 40px;
          position: absolute;
          margin-right: 2px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.65);
          background-color: rgb(79, 104, 124);
          color: #FFFFFF;
          font-size: 16px;
          cursor: pointer;
          font-family: 'Ma Shan Zheng', cursive;
          transition: all 0.3s;

          &:hover:not(:disabled) {
            background-color: rgb(132, 152, 169);
          }

          &:disabled {
            background-color: rgba(58, 57, 57, 0.65);
            opacity: 0.6;
            cursor: not-allowed;
          }
        }
      }
    }

    .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .sign-up-container {
      left: 0;
      width: 50%;
      opacity: 0;
      z-index: 1;
    }
    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;
    }

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 100;
      .overlay {
        background-image: url('/login-bkg.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
        color: #FFFFFF;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;

        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .overlay-left {
          transform: translateX(-10%);
        }

        .overlay-right {
          right: 0;
          transform: translateX(0);
        }
      }
    }

  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }
  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }
  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }
  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }
  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }
}
</style>