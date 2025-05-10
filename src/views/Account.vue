<template>
  <div class="body">
    <div class="container" id="container" :class="{ 'right-panel-active': rightPanelActive }">
      <div class="form-container sign-up-container">
        <div class="form">
          <h1>凝聚元神，重铸法身</h1>
          <input
              v-model="formData.userName"
              type="text"
              required
              placeholder="汝之仙讳，报上名来" />
          <input
              v-model="formData.password"
              type="password"
              maxlength="6"
              required
              placeholder="六道轮回，密令自显"
          >
          <button class="ghost" @click="handleRegister">缔结仙缘</button>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="form">
          <h1>大圣归来，再战苍穹</h1>
          <input
              v-model="formData.userName"
              type="text"
              required
              placeholder="何方神圣，速通法号" />
          <input
              v-model="formData.password"
              type="password"
              required
              placeholder="法宝秘钥，谨记于心"
          >
          <button class="ghost" @click="handleLogin">元神归位</button>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>劫波渡尽，故人依旧</h1>
            <p>已有元神印记？此去灵山十万路，且凭金身踏祥云</p>
            <button class="ghost" id="signIn" @click="signIn">返本归真</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>初入三界，造化新生</h1>
            <p>尚无功德文牒？此间因果待书写，且结善缘证菩提</p>
            <button class="ghost" id="signUp" @click="signUp">点化元神</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, register, type UserInfo } from '../apis/user'

const rightPanelActive = ref(false);

const router = useRouter();

const formData = ref<UserInfo>({
  userName: '',
  password: '',
});

const handleLogin = async () => {
  try {
    // console.log("缓存的登录信息：", localStorage.getItem('userProfile'));
    // console.log("要传递的登录信息：", formData.value);
    console.log(formData.value);
    await login(formData.value).then(res => {
      console.log("登录返回信息:", res.data)
      // profile.value = res.data;
      console.log(res.data.result)
      const token = res.data.result
      localStorage.setItem('token', token)
      localStorage.setItem('userProfile', JSON.stringify(formData.value));
      alert('登录成功！');
      // TODO： 根据返回的身份选择跳转的页面 rag-user | rag-admin
      router.push({name: 'rag-user'});
    });
  } catch (error) {
    console.log(error);
    alert('登录失败');
  }
};
const handleRegister = async () => {
  try {
    console.log("要传递的注册信息：",formData.value);
    await register(formData.value).then(res => {
      console.log("注册返回信息：",res.data);
    });
    alert('注册成功！');
  } catch (error) {
    alert('注册失败');
  }
};
const signUp = () => {
  rightPanelActive.value = true;
};

const signIn = () => {
  rightPanelActive.value = false;
};
</script>

<style scoped>

* {
  box-sizing: border-box;
}

.body {
  display: flex;
  background: linear-gradient(to right, #484849, #0f0f10);
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
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
  margin-top: 20px;
  cursor: pointer;
  font-family: 'Ma Shan Zheng', cursive;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: rgba(63, 62, 62, 0.44);
  border-color: #FFFFFF;
  &:hover {
    background-color: rgba(145, 143, 143, 0.18);
  }
}

.form {
  background-image: url('public/form-bkg.jpg');
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
}

input {
  background-color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 15px;
  margin: 20px 0 20px;
  width: 100%;
  height: 40px;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 18px;
}

.container {
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
  0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 24px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
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

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background-image: url('public/login-bkg.jpg');
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
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

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
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

</style>