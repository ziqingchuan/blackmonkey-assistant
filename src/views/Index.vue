<template>
  <div class="home-page">
    <!-- 页头 -->
    <header class="header">
      <div class="header-container">
        <div class="logo">
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
          <button @click="navigateToAccount">注册 / 登录</button>
        </div>
      </div>
    </header>
    <!-- 欢迎横幅 -->
    <div class="banner">
      <div class="banner-text">
        <h1 class="float-up float-delay-1">黑神话：悟空 · 玄机问答</h1>
        <p class="float-up float-delay-2">
          踏破三界迷雾，参透西游真谛。<br>
          此间问答，专为求道者解惑而生。<br>
          从五行山下到灵山佛境，从七十二变到八十一难，<br>
          无论是妖魔图鉴、法宝妙用；<br>
          亦或是关卡玄机、隐藏机缘，<br>
          皆可在此寻得真解。
        </p>
        <button class="float-up float-delay-3" @click="navigateToAccount">即刻问道</button>
      </div>
      <video autoplay loop muted playsinline disablePictureInPicture>
        <source src="https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/wukong.mp4" type="video/mp4">
        您的浏览器不支持播放该视频
      </video>
    </div>
    <!-- 功能介绍部分 -->
    <div class="feature-container" style="background: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_1_b.png') no-repeat center center; background-size: cover;">
      <div class="feature-text" style="background: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_1_a.png') no-repeat center center; background-size: cover;">
        <div class="text1-container">
          <h1 class="float-up">三界问答</h1>
          <p class="float-up float-delay-1">解答游戏中的一切疑难<br>从基础操作到高阶技巧<br>从主线剧情到隐藏支线<br>助天命人参透游戏玄机</p>
        </div>
      </div>
    </div>

    <div class="feature-container" style="background: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_3_b.png') no-repeat center center; background-size: cover;">
      <div class="feature-text" style="background: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_3_a.png') no-repeat center center; background-size: cover;">
        <div class="text2-container">
          <h1 class="float-up">功德成就</h1>
          <p class="float-up float-delay-1">查看游戏全成就系统<br>追踪天命人修行进度<br>了解解锁条件与奖励<br>助早日圆满功德金身</p>
        </div>
      </div>
    </div>

    <div class="feature-container" style="background: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_4_b.png') no-repeat center center; background-size: cover;">
      <div class="feature-text" style="background: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_4_a.png') no-repeat center center; background-size: cover;">
        <div class="text3-container">
          <h1 class="float-up">神通攻略</h1>
          <p class="float-up float-delay-1">独家游戏闯关指南<br>解析关卡设计玄机<br>传授高效通关秘诀<br>最终修得无上神通</p>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer>
      <div class="footer-container">
        <FooterCloudLeft/>
        <!-- 左侧二维码容器 -->
        <div class="qrcode-container qrcode-left">
          <div class="qrcode-card">
            <div class="qrcode-title">加入我们的团队</div>
            <div class="qrcode-placeholder"
                 style="background: url('/img.jpg') no-repeat center center;
                 background-size: contain;">
            </div>
          </div>
        </div>
        <div class="footer-section">
          <h2>联系我们</h2>
          <p>邮箱: 221250108@smail.nju.edu.cn &nbsp; &nbsp; &nbsp;电话: 182-4518-7102</p>
          <p>地址: 南京市 鼓楼区 汉口路 22号</p>
        </div>
        <!-- 右侧二维码容器 -->
        <div class="qrcode-container qrcode-right">
          <div class="qrcode-card">
            <div class="qrcode-title">支持我们的团队</div>
            <div class="qrcode-placeholder"
                 style="background: url('/111.jpg') no-repeat center center;
                 background-size: contain;">
            </div>
          </div>
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
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import RedCloudLeft from "../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../assets/icons/Clouds/RedCloud-Right.vue";
import CloudOfIndexHeader from "../assets/icons/Clouds/CloudOfIndexHeader.vue";
import FooterCloudLeft from "../assets/icons/Clouds/FooterCloudLeft.vue";
import FooterCloudRight from "../assets/icons/Clouds/FooterCloudRight.vue";
import { setupFloatAnimation } from "../utils/GlobalFunction.ts";
const isLogoHovered = ref(false);
const router = useRouter();
// 页面跳转
const navigateToAccount = () => {
  router.push("/account");
};

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

// 获取随机文案
const getHeaderText = () => {
  const randomIndex = Math.floor(Math.random() * headerTexts.length);
  currentHeaderText.value = headerTexts[randomIndex];
  return currentHeaderText.value;
};
// 组件挂载时获取一次随机文案
onMounted(() => {
  localStorage.setItem('hasBindSteam', 'false');
  getHeaderText();
  setupFloatAnimation()
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
button {
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

.home-page {
  font-family: "STKaiti", cursive;
  color: #d3b479;
  background: #1a1a1d;
  margin: 0;
  padding: 0;
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

  /* 主内容样式 */
  .banner {
    background: linear-gradient(to right, #1a1a1a, #050506);
    display: flex;
    align-items: center;
    justify-content: start;
    position: relative;
    height: 100%;

    .banner-text {
      background: rgba(0, 0, 0, 0.5);
      padding-left: 50px;
      padding-right: 50px;
      height: 100vh;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 50%;
      h1 {
        font-size: 40px;
        color: #d3bb74;
        text-shadow: 1px 1px 15px #f3dcad;
        letter-spacing: 1px;
      }

      p {
        font-size: 28px;
        color: #d3bb74;
        text-shadow: 1px 1px 15px #f3dcad;
        margin-top: 10px;
        text-align: center;
      }
      button {
        height: 40px;
        width: 150px;
        font-size: 18px;
        font-weight: bold;
        background: rgba(255, 255, 255, 0.17);
        color: #c0aa6a;
        &:hover {
          background: rgba(246, 213, 150, 0.29);
        }
        border: 1px solid #c0aa6a;
      }
    }
    video {
      position: absolute;
      z-index: 1;
      height: 100%;
    }
  }

  .feature-container {
    width: 100%;
    height: 100%;


    .feature-text {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .text1-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 15%;
        h1 {
          font-size: 52px;
          color: #d3bb74;
          text-shadow: 1px 1px 15px #f3dcad;
          letter-spacing: 1px;
        }

        p {
          font-size: 34px;
          color: #d3bb74;
          text-shadow: 1px 1px 15px #f3dcad;
          margin-top: 10px;
        }
      }
      .text2-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 65%;
        h1 {
          font-size: 50px;
          color: #d3bb74;
          text-shadow: 1px 1px 15px #f3dcad;
          letter-spacing: 1px;
        }

        p {
          font-size: 34px;
          color: #d3bb74;
          text-shadow: 1px 1px 15px #f3dcad;
          margin-top: 10px;
        }
      }
      .text3-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 15%;
        h1 {
          font-size: 50px;
          color: #d3bb74;
          text-shadow: 1px 1px 15px #f3dcad;
          letter-spacing: 1px;
        }

        p {
          font-size: 34px;
          color: #d3bb74;
          text-shadow: 1px 1px 15px #f3dcad;
          margin-top: 10px;
        }
      }
    }
  }

  /* 页脚样式 */
  footer {
    background: #1a1a1a;
    padding: 30px 30px 20px;
    color: #d3b479;
    border-top: 2px solid #c0aa6a;
    position: relative;
    overflow: hidden;

    .footer-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;

      .qrcode-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 10;
        width: 150px;

        &.qrcode-left {
          margin-left: 90px;
        }

        &.qrcode-right {
          margin-right: 90px;
        }

        .qrcode-card {
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #c0aa6a;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          box-shadow: 0 5px 25px rgba(195, 161, 106, 0.3);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;

          &::before {
            content: "";
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #c0aa6a, #d3b479, #8a7c55, #d3b479);
            z-index: -1;
            border-radius: 12px;
            animation: border-glow 3s linear infinite;
            background-size: 400%;
          }

          .qrcode-placeholder {
            z-index: 9999;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #c0aa6a;
            position: relative;
            overflow: hidden;
          }

          .qrcode-title {
            font-size: 18px;
            color: #d3b479;
            margin-bottom: 10px;
            text-align: center;
            text-shadow: 0 0 10px rgba(211, 180, 121, 0.5);
            position: relative;

            &::after {
              content: "";
              display: block;
              width: 80%;
              height: 2px;
              background: linear-gradient(90deg, transparent, #c0aa6a, transparent);
              margin: 8px auto;
            }
          }
        }
      }

      .footer-section {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        z-index: 10;

        h2 {
          color: #c0aa6a;
          width: 70%;
          border-bottom: 1px solid #c0aa6a;
          padding-bottom: 10px;
          margin-bottom: 15px;
          font-size: 28px;
          text-shadow: 0 0 8px rgba(195, 161, 106, 0.5);
        }

        p {
          font-size: 18px;
          margin: 8px 0;
          color: #a9956a;
          line-height: 1.6;
        }
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
      position: relative;
      z-index: 10;

      h3 {
        font-size: 18px;
        letter-spacing: 1px;
        text-shadow: 0 0 5px rgba(169, 149, 106, 0.5);
      }
    }
  }

  @keyframes border-glow {
    0% { background-position: 0 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }
}
</style>