<template>
  <CustomAlert ref="customAlert" />
  <div class="account-page">
    <!-- 页头 -->
    <header class="header">
      <div class="header-container">
        <div class="logo" @click="router.push('/index')">
          <img src="https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/wukong-header.png" alt="黑神话悟空" />
          <span>问答助手</span>
        </div>
        <div class="header-right">
          <CloudOfIndexHeader
              class="cloud"
              :class="{ 'hovered': isLogoHovered }"
              @mouseenter="isLogoHovered = true"
              @mouseleave="isLogoHovered = false"
              @click="getHeaderText"
          />
          <span class="welcome-text">{{ currentHeaderText  }}</span>
          <button class="header-btn" @click="router.push('/index')">返回首页</button>
        </div>
      </div>
    </header>
    <!-- 主体 -->
    <div class="body">
      <div class="container" id="container" :class="{ 'right-panel-active': rightPanelActive }">
        <div class="form-container sign-up-container">
          <div class="form" style="background-image: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/sing-up-bkg.jpg')">
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
            <button @click="handleRegister">注册</button>
          </div>
        </div>
        <div class="form-container sign-in-container">
          <div class="form" style="background-image: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/sing-in-bkg.jpg')">
            <h1 class="float-up float-delay-1">大圣归来，再战苍穹</h1>
            <div class="input-container float-up float-delay-2">
              <div class="input-tips">邮&nbsp;箱：</div>
              <input
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="元神印记，显化真形"
              />
            </div>
            <div class="input-container float-up float-delay-3">
              <div class="input-tips">密&nbsp;码：</div>
              <input
                  v-model="formData.password"
                  type="password"
                  required
                  placeholder="法宝秘钥，谨记于心"
              />
            </div>
            <div class="float-up float-delay-4"><button @click="handleLogin">登录</button></div>
          </div>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>劫波渡尽，故人依旧</h1>
              <p>已有元神印记？此去灵山十万路，且凭金身踏祥云</p>
              <button @click="signIn">去登录</button>
            </div>
            <div class="overlay-panel overlay-right float-up float-delay-1">
              <h1 class="float-up float-delay-2">初入三界，造化新生</h1>
              <p class="float-up float-delay-3">尚无功德文牒？此间因果待书写，且结善缘证菩提</p>
              <div class="float-up float-delay-4"><button @click="signUp">去注册</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <footer>
      <div class="footer-container">
        <FooterCloudLeft/>
        <div class="footer-section">
          <h2>联系我们</h2>
          <p>邮箱: 221250108@smail.nju.edu.cn &nbsp; &nbsp; &nbsp;电话: 182-4518-7102</p>
          <p>地址: 南京市 鼓楼区 汉口路 22号</p>
        </div>
        <FooterCloudRight/>
      </div>
      <div class="footer-bottom">
        <RedCloudLeft/>
        <h3>&copy; 2025 黑神话悟空问答助手. 版权所有 | 玄门证道</h3>
        <RedCloudRight/>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeUnmount, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { login, register, getSalt, getValidCode, type RegisterInfo, type LoginInfo } from '../apis/user';
import {showAlert, customAlert} from "../utils/GlobalFunction.ts";
import { setupFloatAnimation } from "../utils/GlobalFunction.ts";
import CryptoJS from 'crypto-js';
import { genSaltSync } from 'bcryptjs';
import CustomAlert from "../components/Dialog/CustomAlert.vue";
import CloudOfIndexHeader from "../assets/icons/Clouds/CloudOfIndexHeader.vue";
import RedCloudLeft from "../assets/icons/Clouds/RedCloud-Left.vue";
import FooterCloudRight from "../assets/icons/Clouds/FooterCloudRight.vue";
import FooterCloudLeft from "../assets/icons/Clouds/FooterCloudLeft.vue";
import RedCloudRight from "../assets/icons/Clouds/RedCloud-Right.vue";

// ==================== 变量声明 ====================
const isLogoHovered = ref(false);
const rightPanelActive = ref(false);
const router = useRouter();
const isEmailValid = ref(false);
const isCountingDown = ref(false);
const countdown = ref(0);
let countdownTimer: number | null = null;
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
// 备选文案数组
const headerTexts = [
  "「心生，则种种魔生」",
  "「苦海无边，问即回头」",
  "「你来了，因果早定」",
  "「这一棒，教你灰飞烟灭」",
  "「念念回首处，即是灵山」",
  "「劫火燃尽，问答始生」",
  "「汝之疑问，可是天命？」",
  "「八万四千法门，此间可问」",
  "「前路妖雾重，何不问老孙？」"
];

// 当前显示的文案
const currentHeaderText = ref("");


// ==================== 函数声明 ====================
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailRegex.test(formData.value.email);
};

// 获取随机文案
const getHeaderText = () => {
  const randomIndex = Math.floor(Math.random() * headerTexts.length);
  currentHeaderText.value = headerTexts[randomIndex];
  return currentHeaderText.value;
};


const sendValidCode = async () => {
  if (!isEmailValid.value) return;

  try {
    startCountdown();
    await getValidCode(formData.value.email);
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
    //console.log("获取到的salt:", salt);
    const hashedPassword = CryptoJS.SHA256(`${formData.value.password}${salt}`).toString();
    //console.log("登录加密后的密码:", hashedPassword);

    loginInfo.value = {
      email: formData.value.email,
      password: hashedPassword
    }

    await login(loginInfo.value).then((res: any) => {
      //console.log("登录返回信息:", res.data);
      if (res.data.steam_id) {
        localStorage.setItem('hasBindSteam', 'true');
        //console.log("已绑定steam");
      } else {
        localStorage.setItem('hasBindSteam', 'false');
        //console.log("未绑定steam");
      }
      const token = res.data.token.access_token;
      localStorage.setItem('token', token);
      localStorage.setItem('userProfile', JSON.stringify(res.data));
      if(res.data.user_type === 'user'){
        router.push({ name: 'rag-user' });
      } else {
        router.push({ name: 'rag-admin' });
      }
    });
  } catch (error) {
    console.error(error);
    localStorage.setItem('hasBindSteam', 'false');
    showAlert('登录失败，请检查邮箱或密码是否正确', 0);
  }
};

const handleRegister = async () => {
  try {
    formData.value.salt = genSaltSync(10);
    //console.log("生成的salt:", formData.value.salt);
    await register({
      email: formData.value.email,
      salt: formData.value.salt,
      password: CryptoJS.SHA256(`${formData.value.password}${formData.value.salt}`).toString(),
      validCode: formData.value.validCode
    }).then(() => {
      //console.log("注册返回信息:", res.data);
      localStorage.setItem('hasBindSteam', 'false');
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

onMounted(() => {
  // 获取随机文案
  getHeaderText();
  setupFloatAnimation();
})

onBeforeUnmount(() => {
  // 清除定时器
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});
</script>

<style lang="scss" scoped>
/* 全局样式 */
.float-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 为不同元素设置不同的延迟 */
.float-delay-1 { transition-delay: 0.2s; }
.float-delay-2 { transition-delay: 0.4s; }
.float-delay-3 { transition-delay: 0.6s; }
.float-delay-4 { transition-delay: 0.8s; }
.float-delay-5 { transition-delay: 1s; }

input {
  background-color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 15px;
  margin: 20px 0 20px;
  width: 100%;
  height: 20px;
  font-family: 'STKaiti', cursive;
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
  font-size: 18px;
  font-weight: bold;
  padding: 12px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: background 0.3s;
  cursor: pointer;
  font-family: 'STKaiti', cursive;
  color: #f1cb82;
  background: rgba(159, 157, 153, 0.2);
  border: 1px solid #f1cb82;
  z-index: 1;
  &:hover {
    background: rgba(246, 213, 150, 0.34);
  }
}


.account-page {
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Opera */
  }

  /* 页头样式 */
  .header {
    background: #1a1a1a;
    color: #d3b479;
    padding: 20px 100px;
    border-bottom: 2px solid #c0aa6a;
    .header-btn {
      padding: 8px 16px;
      background: rgba(159, 157, 153, 0.2);
      border: 1px solid #c0aa6a;
      border-radius: 20px;
      cursor: pointer;
      color: #d3b479;
      font-family: "STKaiti", cursive;
      transition: background 0.3s;
      font-size: 18px;
      font-weight: bold;

      &:hover {
        background: rgba(246, 213, 150, 0.34);
      }
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 5px;
      .cloud {
        cursor: pointer;
        :deep(path) {
          transition: fill 0.3s ease;
        }

        &.hovered :deep(path) {
          fill: #FFFFFF;
        }
      }
      .welcome-text {
        color: #d3b479;
        font-size: 22px;
        text-shadow: 2px 2px 9px #f6d596;
        letter-spacing: 1px;
      }
    }
    .logo {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 50px;
      }

      span {
        font-size: 30px;
        text-shadow: 3px 3px 2px #504632;
        font-weight: bold;
      }
    }
  }
  /* 主体样式 */
  .body {
    display: flex;
    background: linear-gradient(to bottom, #1a1a1a, rgba(47, 47, 47, 0.98), #1a1a1a);
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    padding: 10px 10px;

    .container {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 75vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'STKaiti', cursive;
      font-size: 24px;
      border-radius: 5px;

      .form {
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
        font-family: 'STKaiti', cursive;
        font-size: 24px;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(79, 78, 78, 0.6);
          z-index: 0;
        }

        h1 {
          z-index: 1;
          color: #f1cb82;
          text-shadow: 3px 3px 2px #2d2a22;
        }

        .input-container {
          display: flex;
          flex-direction: row;
          justify-content: end;
          align-items: center;
          width: 100%;
          z-index: 1;
          input {
            background-color: #fff;
            border: 2px solid #f1cb82;
          }
          .input-tips {
            width: 130px;
            color: #f1cb82;
            text-shadow: 3px 3px 2px #2d2a22;
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
            font-family: 'STKaiti', cursive;
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
        transition: all 0.3s ease-in-out;
      }

      .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform 0.3s ease-in-out;
        z-index: 100;
        .overlay {
          background-size: cover;
          background: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_4_b.png') no-repeat center;
          color: #d3b479;
          text-shadow: 3px 3px 2px #5d523c;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.3s ease-in-out;

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
            transition: transform 0.3s ease-in-out;
          }

          .overlay-left {
            transform: translateX(0);
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
      animation: show 0.3s;
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
  /* 页脚样式 */
  footer {
    background: #1a1a1a;
    padding: 0 30px 30px;
    color: #d3b479;
    border-top: 2px solid #c0aa6a;

    .footer-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .footer-section {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h2 {
        color: #c0aa6a;
        width: 50%;
        border-bottom: 1px solid #c0aa6a;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
    }

    .footer-bottom {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 14px;
      color: #a9956a;
      gap: 20px;
    }
  }
}
</style>