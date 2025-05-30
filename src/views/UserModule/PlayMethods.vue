<template>
  <GlobalLoading :is-loading="isWaiting" />
  <CustomAlert ref="customAlert" />
  <div class="page-container">
    <!-- 玄铁侧栏 -->
    <div class="sidebar">
      <div class="logo-container">
        <Logo/>
        <CloudUnderLogo style="margin-top: -25px;"/>
        <MenuBtn
            class="menu-btn"
            :class="{ 'hovered': isLogoHovered }"
            @mouseenter="isLogoHovered = true"
            @mouseleave="isLogoHovered = false"
            @click="isMethodsListVisible = !isMethodsListVisible"
        />
      </div>
      <div class="btn-group">
        <button class="btn" @click="router.back()" title="退出">
          <span class="btn-origin-text">遁形</span>
          <span class="btn-new-text">返回上页</span>
        </button>
        <button class="btn" @click="logout(router)" title="退出">
          <span class="btn-origin-text">归尘</span>
          <span class="btn-new-text">退出登录</span>
        </button>
      </div>
    </div>

    <!-- 主体 -->
    <div class="main-container">
      <!-- 打法列表 -->
      <div class="methods-list" v-if="isMethodsListVisible">
        <div class="list-title">
          <CloudBeforeList class="cloud-decoration" />
          <span class="title-text">打法推荐</span>
        </div>
        <div class="methods-list-wrapper">
          <div
              v-if=" MethodsList.length > 0"
              v-for="MethodItem in MethodsList"
              :key="MethodItem.id"
              class="method-item"
              :class="{ active: currentMethod?.id === MethodItem.id }"
              @click="loadMethod(MethodItem.id)"
          >
            <div class="method-name">xxxx</div>
          </div>
          <div v-if="MethodsList.length === 0" class="empty-tip">
            暂无打法数据
          </div>
        </div>
      </div>

      <!-- 打法信息 -->
      <div class="method-container">
        <!-- 头部 -->
        <div class="method-header">
          <div class="header-container">
            <CloudBeforeTitle />
            <span class="method-title">xxxxxxxx</span>
          </div>
        </div>

        <!-- 主内容 -->
        <div class="method-information">

        </div>

        <!-- 底部 -->
        <div class="footer">
          <RedCloudLeft />
          <span> 如意随心 · 战法无双 </span>
          <RedCloudRight />
        </div>

      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import Logo from '../../assets/icons/Logo.vue';
import CloudUnderLogo from "../../assets/icons/Clouds/Cloud-under-logo.vue";
import RedCloudLeft from "../../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../../assets/icons/Clouds/RedCloud-Right.vue";
import CloudBeforeTitle from "../../assets/icons/Clouds/Cloud-before-title.vue";
import CloudBeforeList from "../../assets/icons/Clouds/Cloud-before-list.vue";
import CustomAlert from "../../components/Dialog/CustomAlert.vue";
import GlobalLoading from '../../components/Dialog/GlobalLoading.vue';
import MenuBtn from "../../assets/icons/MenuBtn.vue";
import {customAlert, logout, showAlert} from "../../utils/GlobalFunction.ts";
// ==================== 变量声明 ====================
const currentUser = ref<any>([]);  // 当前用户信息
const token = ref(''); // 用户登录token
const currentMethod = ref<any>();
const isWaiting = ref(false); // 记录加载状态
const router = useRouter()
const isLogoHovered = ref(false); // 记录展开目录图标是否被鼠标悬停
const isMethodsListVisible = ref(false); // 记录列表的显示状态
const MethodsList = ref<any[]>([]);

// ==================== 函数声明 ====================

const loadMethod = (id: number) => {
  try {
    isWaiting.value = true;
    currentMethod.value = MethodsList.value[id];
  } catch (error) {
    showAlert("加载失败，请稍后再试", 0);
    console.log(error);
  } finally {
    isWaiting.value = false;
  }
};

const fetchAllMethods = async () => {
  try {
  } catch (error) {
    console.error('数据获取失败:', error);
    showAlert('获取数据失败，请稍后再试', 0);
    throw error;
  }
};

// 界面初始化加载
onMounted(async () => {
  try {
    // 进入加载状态
    isWaiting.value = true;
    // 判断用户是否登录
    if (localStorage.getItem('userProfile')) {
      currentUser.value = JSON.parse(localStorage.getItem('userProfile') || '');
      token.value = localStorage.getItem('token') || '';
      await fetchAllMethods();
    } else {
      showAlert('天命人，请您先去登录，再来查看打法吧', 0).then(() => {
        router.push('/account'); // 跳转到登录页面
      });
    }

  } catch(error) {
    console.error(error);
  } finally {
    // 取消加载状态
    isWaiting.value = false;
  }
});

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');
/* 全局样式 */
input, button {
  font-family: 'Ma Shan Zheng', cursive;
}
/* 页面整体样式 */
.page-container {
  display: flex;
  background: linear-gradient(to right, #1a1a1d 0%, #0a0a0c 100%);
  font-family: 'Ma Shan Zheng', cursive;
  height: 100vh;
  overflow-x: auto;
  .sidebar {
    width: 80px;
    background: rgba(18, 18, 20, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-right: 1px solid #3a3a3f;
    box-shadow: 3px 0 15px rgba(0,0,0,0.5);
    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .menu-btn {
        background: #37373d;
        border: #d3b479 1.5px solid;
        padding: 10px;
        border-radius: 30%;
        cursor: pointer;
        margin-top: 30px;
        :deep(path) {
          transition: fill 0.3s ease;
          fill: #d3b479;
        }

        &.hovered :deep(path) {
          fill: white;
        }
      }
    }
    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 25px;
      .btn {
        width: 50px;
        height: 50px;
        border-radius: 30%;
        background: #37373d;
        font-family: 'Ma Shan Zheng', cursive;
        color: #e7cc80;
        font-size: 14px;
        font-weight: bold;
        border: 1.5px solid #d3b479;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        &:hover {
          transform: scale(1.2);
          border-color: #c0aa6a;
        }
        &:hover .btn-origin-text {
          opacity: 0;
        }

        &:hover .btn-new-text {
          opacity: 1;
        }
        .btn-new-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.1s ease;
          font-size: 11px;
        }
      }
    }
  }
  .main-container {
    flex: 1;
    display: flex;
    .methods-list {
      width: 250px;
      background-image: url('/dragon.png');
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: 50px;
      border-right: 1px solid #3a3a3f;
      padding: 15px 20px 20px;
      .list-title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        position: relative;
        padding: 12px 0;
        border-bottom: 2px solid #c0aa6a;
        .title-text {
          font-size: 20px;
          color: #d3b479;
          text-shadow: 0 0 8px rgba(192, 170, 106, 0.3);
          margin: 0 10px;
          position: relative;
          font-family: 'Ma Shan Zheng', cursive;
        }
      }
      .methods-list-wrapper {
        overflow-y: auto;
        height: 90%;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */

        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
        .method-item {
          padding: 12px;
          margin: 8px 0;
          background: rgba(40, 40, 45, 0.8);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
          &:hover {
            background: rgba(50, 50, 55, 0.9);
            border-color: #c0aa6a33;
          }
          .method-name {
            font-size: 18px;
            letter-spacing: 2px;
            color: #d3b479;
            padding-bottom: 10px;
          }
        }
        .method-item.active {
          background: rgba(60, 60, 65, 0.9);
          border-color: #c0aa6a;
        }
        .empty-tip {
          text-align: center;
          padding: 20px;
          color: #7a6a4a;
        }
      }
    }

    .method-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 30px;

      .method-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .header-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 10px;
          .method-title {
            font-size: 18px;
            letter-spacing: 2px;
            color: #d3b479;
            border-bottom: 2px solid #c0aa6a;
            padding-bottom: 10px;
          }
        }
      }
      .method-information {
        background-image: url('/wukong.png');
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
        flex: 1;
        border: 1px solid #3a3a3f;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
      }

      .footer {
        display: flex;
        flex-direction: row;
        text-align: center;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-top: 15px;
        font-size: 16px;
        color: #c0aa6a;
        letter-spacing: 1px;
        border-top: 1px solid #3a3a3f;
        margin-top: 20px;
      }
    }
  }
}
</style>