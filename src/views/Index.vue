<template>
  <div class="home-page">
    <!-- 页头 -->
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <img src="/wukong-header.png" alt="黑神话悟空" />
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
    <div  class="banner">
      <div class="banner-text">
        <h1>黑神话：悟空 · 玄机问答</h1>
        <p>
          踏破三界迷雾，参透西游真谛。此间问答，专为求道者解惑而生。<br>
          从五行山下到灵山佛境，从七十二变到八十一难，<br>
          无论是妖魔图鉴、法宝妙用，还是关卡玄机、隐藏机缘，<br>
          皆可在此寻得真解。
        </p>
        <button @click="navigateToAccount">即刻问道</button>
      </div>
      <div class="video-container">
        <video autoplay loop muted playsinline>
          <source src="/index.mp4" type="video/mp4">
          您的浏览器不支持HTML5视频
        </video>
      </div>
    </div>
    <!-- 功能介绍 -->
    <div class="features">
      <h2>我们能为天命人提供什么？</h2>
      <div class="features-container">
        <div class="feature-item">
          <img src="/scene1.jpg" alt="智能问答" />
          <h3>三界问答</h3>
          <p>
            解答游戏中的一切疑难<br>
            从基础操作到高阶技巧<br>
            从主线剧情到隐藏支线<br>
            助你参透游戏玄机
          </p>
        </div>
        <div class="feature-item">
          <img src="/scene2.jpg" alt="游戏成就" />
          <h3>功德成就</h3>
          <p>
            查看游戏全成就系统<br>
            追踪你的修行进度<br>
            了解解锁条件与奖励<br>
            助你圆满功德金身
          </p>
        </div>
        <div class="feature-item">
          <img src="/scene3.jpg" alt="平台管理" />
          <h3>玄门法度</h3>
          <p>
            管理员专用通道<br>
            维护知识库清净<br>
            更新游戏新内容<br>
            确保解答如法如律
          </p>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer>
      <div class="footer-container">
        <div class="footer-section">
          <h2>联系我们</h2>
          <p>邮箱: 221250108@smail.nju.edu.cn &nbsp; &nbsp; &nbsp;电话: 182-4518-7102</p>
          <p>地址: 南京市 鼓楼区 汉口路 22号</p>
        </div>
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
import RedCloudLeft from "../assets/icons/RedCloud-Left.vue";
import RedCloudRight from "../assets/icons/RedCloud-Right.vue";
import CloudOfIndexHeader from "../assets/icons/CloudOfIndexHeader.vue";
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
  getHeaderText();
});
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');
/* 全局样式 */
button {
  padding: 8px 16px;
  background: rgba(159, 157, 153, 0.2);
  border: 1px solid #c0aa6a;
  border-radius: 20px;
  cursor: pointer;
  color: #d3b479;
  font-family: "Ma Shan Zheng", cursive;
  transition: background 0.3s;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background: rgba(246, 213, 150, 0.34);
  }
}

.home-page {
  font-family: "Ma Shan Zheng", cursive;
  color: #d3b479;
  background: #1a1a1d;
  margin: 0;
  padding: 0;
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
        font-size: 18px;
        text-shadow: 2px 2px 5px #f6d596;
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
        font-size: 24px;
        font-weight: bold;
      }
    }

    .nav ul {
      display: flex;
      gap: 20px;
      list-style: none;
    }
  }

  /* 主内容样式 */
  .banner {
    background-image:
        linear-gradient(to bottom, #1a1a1a, rgba(47, 47, 47, 0.98)),
        url("/wukong.png");
    border-bottom: 1px solid #c0aa6a;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding-left: 50px;
    padding-right: 50px;
    height: 600px;

    .banner-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        font-size: 36px;
        color: #c0aa6a;
      }

      p {
        margin-top: 10px;
        font-size: 18px;
        line-height: 2;
        color: #a9956a;
      }
      button {
        height: 40px;
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
    .video-container {
      width: 60%;
      video {
        border-radius: 10px;
        width: 100%;
      }
    }
  }

  .features {
    background: linear-gradient(to top, #1a1a1a, rgba(47, 47, 47, 0.98));
    padding: 50px 20px;

    h2 {
      text-align: center;
      margin-bottom: 40px;
      font-size: 28px;
      color: #c0aa6a;
    }

    .features-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 100px;

      .feature-item {
        text-align: center;
        max-width: 400px;

        img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        h3 {
          margin-top: 10px;
          color: #d3b479;
          font-size: 24px;
        }

        p {
          font-size: 18px;
          color: #a9956a;
          line-height: 2;
        }
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
      width: 100%;
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