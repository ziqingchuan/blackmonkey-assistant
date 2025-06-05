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
            @click="isBossTipsListVisible = !isBossTipsListVisible"
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
      <div class="bossTips-list" v-if="isBossTipsListVisible">
        <div class="list-title">
          <CloudBeforeList class="cloud-decoration" />
          <span class="title-text">章节</span>
        </div>
        <div class="bossTips-list-wrapper">
          <div
              v-if=" BossTipsList.length > 0"
              v-for="TipItem in BossTipsList"
              :key="TipItem.id"
              class="bossTip-item"
              :class="{ active: currentChapter?.id === TipItem.id }"
              @click="loadTip(TipItem.id)"
          >
            <div class="bossTip-name">{{TipItem.chapterName}}</div>
          </div>
          <div v-if="BossTipsList.length === 0" class="empty-tip">
            暂无数据
          </div>
        </div>
      </div>

      <!-- 打法信息 -->
      <div class="bossTip-container">
        <!-- 头部 -->
        <div class="bossTip-header">
            <!-- 头部左侧 -->
            <div class="header-left">
              <CloudBeforeTitle />
              <span class="bossTip-title" @click="backToChapter">{{currentChapter?.chapterName}}</span>
            </div>
          </div>

        <!-- 主内容 -->
        <div class="bossTip-information">
          <!-- 章节内的Boss卡片网格 -->
          <div v-if="!showBossDetail" class="boss-grid">
            <div
                v-for="boss in currentChapter?.bossTips"
                :key="boss.bossId"
                class="boss-card"
                @click="showBossDetailHandler(boss)"
            >
              <div class="boss-image-container" :style="{ backgroundImage: `url(${boss.imgUrl})` }">
                <div class="shadow"></div>
              </div>
            </div>
          </div>

          <!-- Boss详细信息 -->
          <div v-else class="boss-detail">
            <div class="detail-header">
              <div class="boss-name">{{ currentBoss?.name }}</div>
            </div>

            <div class="detail-content">
              <div class="image-info-container">
                <div class="image-container">
                  <img :src="currentBoss?.imgUrl" :alt="currentBoss?.name" class="detail-image" />
                </div>

                <div class="info-panel">
                  <div class="difficulty">
                    <span>难度:</span>
                    <div class="stars">
                      <span v-for="i in 10" :key="i" class="star" :class="{ 'active': i <= (currentBoss?.difficulty || 0) }">★</span>
                    </div>
                  </div>

                  <div class="rewards" v-if="currentBoss?.reward">
                    <h3>掉落奖励</h3>
                    <p>{{ currentBoss?.reward }}</p>
                  </div>

                  <div class="position-info">
                    <h3>位置</h3>
                    <p>{{ currentBoss?.position }}</p>
                    <a v-if="currentBoss?.positionImgUrl" href="#" class="map-link" @click.prevent="showPositionMap">
                      <i class="map-icon"></i> 点击查看地图信息
                    </a>
                  </div>
                </div>
              </div>

              <div class="description-container" v-if="currentBoss?.description">
                <h3>背景故事介绍</h3>
                <p>{{ currentBoss?.description }}</p>
              </div>

              <div class="experience">
                <h3>打法经验</h3>
                <p>{{ currentBoss?.experience }}</p>
              </div>

              <div class="tricks" v-if="currentBoss?.bossTrick">
                <h3>招式</h3>
                <div class="tricks-container">
                  <div v-for="(trick, index) in currentBoss?.bossTrick" :key="index" class="trick-card">
                    <div class="trick-name">{{ trick.name }}</div>
                    <img :src="trick.gifUrl" :alt="trick.name" class="trick-gif" />
                  </div>
                </div>
              </div>

              <div class="encouragement" v-if="currentBoss?.encouragement">
                <p>{{ currentBoss?.encouragement }}</p>
              </div>
            </div>

            <!-- 位置地图弹窗 -->
            <div v-if="showMapModal" class="map-modal" @click.self="closeMapModal">
              <div class="modal-content">
                <button class="close-btn" @click="closeMapModal">×</button>
                <img :src="currentBoss?.positionImgUrl" alt="位置地图" class="map-image" />
              </div>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="footer">
          <RedCloudLeft />
          <span> 天机尽览 · 魔主伏诛 </span>
          <RedCloudRight />
        </div>

      </div>
    </div>
  </div>
  <!-- 右下角固定按钮 -->
  <div class="floating-buttons">
    <button class="floating-button" title="返回顶部" @click="scrollToTop('.bossTip-information')">
      <ScrollToTopIcon />
    </button>
    <button class="floating-button" title="问答助手" @click="showDialog = !showDialog">
      <ChatBot />
    </button>
  </div>
  <BossTipsDialog
    :show="showDialog"
    :userAvatar="avatar"
    @close="showDialog = false"
  />
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
import {customAlert, logout, scrollToTop, showAlert} from "../../utils/GlobalFunction.ts";
import {bossInfo, chapterName, type TipInfo, type BossInfo} from "../../consts/bossData";
import ScrollToTopIcon from "../../assets/icons/ScrollToTop.vue";
import ChatBot from "../../assets/icons/ChatBot.vue";
import BossTipsDialog from "../../components/Dialog/BossTipsDialog.vue";
// ==================== 变量声明 ====================
const currentUser = ref<any>([]);  // 当前用户信息
const avatar = "https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/avatar.png";
const token = ref(''); // 用户登录token
const currentChapter = ref<TipInfo>();
const isWaiting = ref(false); // 记录加载状态
const router = useRouter()
const isLogoHovered = ref(false); // 记录展开目录图标是否被鼠标悬停
const isBossTipsListVisible = ref(true); // 记录列表的显示状态
const showBossDetail = ref(false); // 是否显示boss详情
const currentBoss = ref<BossInfo>(); // 当前选中的boss
const showDialog = ref(false); // 问答助手弹窗状态
const BossTipsList = ref<TipInfo[]>([
    {
        id: 0,
        chapterName: chapterName[0],
        bossTips: bossInfo.slice(0, 8)
    },
    {
        id: 1,
        chapterName: chapterName[1],
        bossTips: bossInfo.slice(8, 20)
    },
    {
        id: 2,
        chapterName: chapterName[2],
        bossTips: bossInfo.slice(20, 31)
    },
    {
        id: 3,
        chapterName: chapterName[3],
        bossTips: bossInfo.slice(31, 42)
    },
    {
        id: 4,
        chapterName: chapterName[4],
        bossTips: bossInfo.slice(42, 51)
    },
    {
        id: 5,
        chapterName: chapterName[5],
        bossTips: bossInfo.slice(51, 63)
    },
  ]);
const showMapModal = ref(false);// 地图弹窗相关状态

// ==================== 函数声明 ====================

// 显示boss详细信息
const showBossDetailHandler = (boss: BossInfo) => {
  currentBoss.value = boss;
  showBossDetail.value = true;
};

// 返回章节列表（点击标题时调用）
const backToChapter = () => {
  if (showBossDetail.value) {
    showBossDetail.value = false;
  }
};

// 显示位置地图
const showPositionMap = () => {
  showMapModal.value = true;
};

// 关闭地图弹窗
const closeMapModal = () => {
  showMapModal.value = false;
};

const loadTip = (id: number) => {
  try {
    isWaiting.value = true;
    currentChapter.value = BossTipsList.value[id];
    // 重置详情状态
    showBossDetail.value = false;
  } catch (error) {
    showAlert("加载失败，请稍后再试", 0);
    console.log(error);
  } finally {
    isWaiting.value = false;
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
    } else {
      showAlert('天命人，请您先去登录，再来查看Boss攻略吧', 0).then(() => {
        router.push('/account'); // 跳转到登录页面
      });
    }
    currentChapter.value = BossTipsList.value[0];
  } catch(error) {
    console.error(error);
  } finally {
    // 取消加载状态
    isWaiting.value = false;
  }
});

</script>

<style lang="scss" scoped>
/* 全局样式 */
input, button {
  font-family: 'STKaiti', cursive;
}
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
/* 页面整体样式 */
.page-container {
  display: flex;
  background: linear-gradient(to right, #1a1a1d 0%, #0a0a0c 100%);
  font-family: 'STKaiti', cursive;
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
        font-family: 'STKaiti', cursive;
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
    .bossTips-list {
      width: 250px;
      background-image: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/dragon.png');
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
          font-family: 'STKaiti', cursive;
        }
      }
      .bossTips-list-wrapper {
        overflow-y: auto;
        height: 90%;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */

        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
        .bossTip-item {
          padding: 20px;
          margin: 8px 0;
          background: rgba(40, 40, 45, 0.8);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
          text-align: center;
          &:hover {
            background: rgba(50, 50, 55, 0.9);
            border-color: #c0aa6a33;
          }
          .bossTip-name {
            font-size: 22px;
            letter-spacing: 2px;
            color: #d3b479;
            padding: 20px;
          }
        }
        .bossTip-item.active {
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

    .bossTip-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 30px;

      .bossTip-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .header-left {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 10px;
            .bossTip-title {
              font-size: 18px;
              letter-spacing: 2px;
              color: #d3b479;
              border-bottom: 2px solid #c0aa6a;
              padding-bottom: 10px;
            }
          }
      }
      .bossTip-information {
        background-image: url('https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/public/wukong.png');
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

        /* Boss网格布局 */
        .boss-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 50px;
          padding: 15px;

          .boss-card {
            background: rgba(30, 30, 35, 0.8);
            border: 1px solid #4a4a4f;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

            &:hover {
              transform: translateY(-10px);
              border-color: #c0aa6a;
              box-shadow: 0 8px 20px rgba(192, 170, 106, 0.2);
            }

            .boss-image-container {
              width: 240px;
              height: 336px;
              overflow: hidden;
              background-size: contain;
              .shadow {
                background-color: rgba(80, 62, 23, 0.24);
                width: 100%;
                height: 100%;
                &:hover {
                  background-color: rgba(192, 170, 106, 0.35);
                }
              }
            }
          }
        }

        .boss-detail {
          background: rgba(25, 25, 30, 0.85);
          border: 1px solid #4a4a4f;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);

          .detail-header {
            border-bottom: 2px solid #c0aa6a;
            padding-bottom: 15px;
            margin-bottom: 25px;
            text-align: center;

            .boss-name {
              font-size: 32px;
              color: #e7cc80;
              letter-spacing: 2px;
              text-shadow: 0 0 10px rgba(192, 170, 106, 0.4);
            }
          }

          .detail-content {
            display: flex;
            flex-direction: column;
            gap: 30px;

            .image-info-container {
              display: flex;
              gap: 30px;
              margin-bottom: 20px;

              .image-container {
                flex: 1;
                max-width: 350px;
                height: 465px;

                .detail-image {
                  width: 100%;
                  height: 465px;
                  border-radius: 8px;
                  border: 2px solid #5a5a5f;
                  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
                }
              }

              .info-panel {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-self: center;
                gap: 20px;
                background: rgba(40, 40, 45, 0.6);
                border-radius: 8px;
                border: 1px solid #5a5a5f;
                padding: 20px;

                .difficulty {
                  display: flex;
                  align-items: center;
                  gap: 15px;

                  span {
                    color: #e7cc80;
                    font-size: 24px;
                    font-weight: bold;
                  }

                  .stars {
                    display: flex;

                    .star {
                      color: #5a5a5f;
                      font-size: 24px;
                      margin-right: 5px;

                      &.active {
                        color: #ffd700;
                        text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
                      }
                    }
                  }
                }

                .rewards {
                  h3 {
                    color: #e7cc80;
                    margin-bottom: 10px;
                    font-size: 22px;
                  }

                  p {
                    color: #d0d0d0;
                    line-height: 1.7;
                    font-size: 18px;
                  }
                }

                .position-info {
                  h3 {
                    color: #e7cc80;
                    margin: 0;
                    font-size: 22px;
                  }

                  p {
                    color: #d0d0d0;
                    line-height: 1.7;
                    font-size: 18px;
                    margin-bottom: 15px;
                    white-space: pre-line;
                  }

                  .map-link {
                    display: inline-flex;
                    align-items: center;
                    color: #c0aa6a;
                    font-size: 16px;
                    text-decoration: none;
                    transition: color 0.3s;

                    &:hover {
                      color: #e7cc80;
                      text-decoration: underline;
                    }

                    .map-icon {
                      display: inline-block;
                      width: 20px;
                      height: 20px;
                      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23c0aa6a"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>');
                      background-repeat: no-repeat;
                      background-size: contain;
                      margin-right: 8px;
                    }
                  }
                }
              }
            }

            .description-container {
              padding: 15px;
              background: rgba(40, 40, 45, 0.6);
              border-radius: 8px;
              border: 1px solid #5a5a5f;

              h3 {
                color: #e7cc80;
                border-left: 3px solid #c0aa6a;
                padding-left: 12px;
                margin-bottom: 15px;
                font-size: 22px;
              }

              p {
                text-align: center;
                color: #d0d0d0;
                line-height: 1.7;
                font-size: 18px;
                white-space: pre-line;
              }
            }

            .experience {
              padding: 15px;
              background: rgba(40, 40, 45, 0.6);
              border-radius: 8px;
              border: 1px solid #5a5a5f;

              h3 {
                color: #e7cc80;
                border-left: 3px solid #c0aa6a;
                padding-left: 12px;
                margin-bottom: 15px;
                font-size: 22px;
              }

              p {
                color: #d0d0d0;
                line-height: 1.7;
                font-size: 18px;
                white-space: pre-line;
                text-align: center;
              }
            }

            .tricks {
              padding: 15px;
              background: rgba(40, 40, 45, 0.6);
              border-radius: 8px;
              border: 1px solid #5a5a5f;
              h3 {
                color: #e7cc80;
                border-left: 3px solid #c0aa6a;
                padding-left: 12px;
                margin-bottom: 15px;
                font-size: 22px;
              }

              .tricks-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 50px;
                margin-top: 15px;

                .trick-card {
                  background: rgba(50, 50, 55, 0.8);
                  border: 1px solid #5a5a5f;
                  border-radius: 8px;
                  padding: 15px;
                  text-align: center;
                  cursor: pointer;
                  width: 300px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                  transition: transform 0.3s ease;

                  &:hover {
                    transform: translateY(-5px);
                    border-color: #c0aa6a;
                  }

                  .trick-name {
                    color: #e7cc80;
                    margin-bottom: 10px;
                    font-size: 18px;
                  }

                  .trick-gif {
                    width: 100%;
                    border-radius: 4px;
                  }
                }
              }
            }
          }

          .encouragement {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p {
              text-align: center;
              color: #f6dc94;
              line-height: 1.2;
              font-size: 20px;
              white-space: pre-line;
            }
          }

          /* 地图弹窗样式 */
          .map-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;

            .modal-content {
              position: relative;
              background: rgba(30, 30, 35, 0.95);
              border: 2px solid #c0aa6a;
              border-radius: 10px;
              padding: 40px;
              max-width:90%;
              max-height: 90%;
              overflow: auto;

              .close-btn {
                position: absolute;
                top: 10px;
                right: 15px;
                background: transparent;
                border: none;
                color: #c0aa6a;
                font-size: 28px;
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                  color: #e7cc80;
                }
              }

              .map-image {
                max-width: 100%;
                max-height: 80vh;
                border-radius: 8px;
              }
            }
          }
        }

        /* 响应式调整 */
        @media (max-width: 1024px) {
          .image-info-container {
            flex-direction: column !important;

            .image-container, .info-panel {
              max-width: 100% !important;
            }
          }

          .trick-card {
            width: 250px !important;
          }
        }

        @media (max-width: 768px) {
          .trick-card {
            width: 200px !important;
            padding: 10px !important;
          }
        }
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
/* 浮动按钮样式 */
.floating-buttons {
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;

  .floating-button {
    width: 50px;
    height: 50px;
    border-radius: 30%;
    background: rgba(40, 40, 45, 0.9);
    border: 2px solid #d3b479;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    transition: all 0.3s;

    &:hover {
      background: rgba(211, 180, 121, 0.2);
      transform: translateY(-3px);
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>