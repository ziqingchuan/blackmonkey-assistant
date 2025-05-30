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
          <div class="header-container">
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
              <div class="boss-image-container">
                <img :src="boss.imgUrl" :alt="boss.name" class="boss-image" />
              </div>
              <div class="boss-name">{{ boss.name }}</div>
            </div>
          </div>

          <!-- Boss详细信息 -->
          <div v-else class="boss-detail">
            <div class="detail-header">
              <div class="boss-name">{{ currentBoss?.name }}</div>
              <div class="boss-position">位置: {{ currentBoss?.position }}</div>
            </div>

            <div class="detail-content">
              <div class="image-container">
                <img :src="currentBoss?.imgUrl" :alt="currentBoss?.name" class="detail-image" />
              </div>

              <div class="info-section">
                <div class="difficulty">
                  <span>难度:</span>
                  <div class="stars">
                    <span v-for="i in 5" :key="i" class="star" :class="{ 'active': i <= Math.ceil((currentBoss?.difficulty || 0)/2) }">★</span>
                  </div>
                </div>

                <div class="description">
                  <h3>描述</h3>
                  <p>{{ currentBoss?.description }}</p>
                </div>

                <div class="tricks">
                  <h3>招式</h3>
                  <ul>
                    <li v-for="(trick, index) in currentBoss?.bossTrick" :key="index">{{ trick }}</li>
                  </ul>
                </div>

                <div class="experience">
                  <h3>打法经验</h3>
                  <p>{{ currentBoss?.experience }}</p>
                </div>

                <div class="rewards">
                  <h3>掉落奖励</h3>
                  <p>{{ currentBoss?.reward }}</p>
                </div>
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
import {bossInfo, chapterName, type TipInfo, type BossInfo} from "../../consts/bossData";
// ==================== 变量声明 ====================
const currentUser = ref<any>([]);  // 当前用户信息
const token = ref(''); // 用户登录token
const currentChapter = ref<TipInfo>();
const isWaiting = ref(false); // 记录加载状态
const router = useRouter()
const isLogoHovered = ref(false); // 记录展开目录图标是否被鼠标悬停
const isBossTipsListVisible = ref(true); // 记录列表的显示状态
const showBossDetail = ref(false); // 是否显示boss详情
const currentBoss = ref<BossInfo>(); // 当前选中的boss
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
    .bossTips-list {
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
      .bossTips-list-wrapper {
        overflow-y: auto;
        height: 90%;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */

        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
        .bossTip-item {
          padding: 12px;
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
        .header-container {
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
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              color: #f0d9a0;
              text-shadow: 0 0 10px rgba(192, 170, 106, 0.5);
            }
          }
        }
      }
      .bossTip-information {
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

        /* Boss网格布局 */
        .boss-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 25px;
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
              transform: translateY(-5px);
              border-color: #c0aa6a;
              box-shadow: 0 8px 20px rgba(192, 170, 106, 0.2);

              .boss-name {
                background: rgba(192, 170, 106, 0.2);
                color: #f0d9a0;
              }
            }

            .boss-image-container {
              height: 160px;
              overflow: hidden;

              .boss-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
              }
            }

            .boss-name {
              padding: 12px;
              text-align: center;
              font-size: 18px;
              color: #d3b479;
              background: rgba(40, 40, 45, 0.9);
              transition: all 0.3s ease;
            }
          }
        }

        /* Boss详情样式 */
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

            .boss-position {
              font-size: 18px;
              color: #b0a070;
              margin-top: 8px;
            }
          }

          .detail-content {
            display: flex;
            gap: 30px;

            .image-container {
              flex: 1;
              max-width: 350px;

              .detail-image {
                width: 100%;
                border-radius: 8px;
                border: 2px solid #5a5a5f;
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
              }
            }

            .info-section {
              flex: 2;

              > div {
                margin-bottom: 25px;
              }

              h3 {
                color: #e7cc80;
                border-left: 3px solid #c0aa6a;
                padding-left: 12px;
                margin-bottom: 12px;
                font-size: 22px;
              }

              p, li {
                color: #d0d0d0;
                line-height: 1.7;
                font-size: 18px;
              }

              .difficulty {
                display: flex;
                align-items: center;
                gap: 15px;

                span {
                  color: #d3b479;
                  font-size: 20px;
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

              .tricks {
                ul {
                  list-style-type: none;
                  padding-left: 0;

                  li {
                    position: relative;
                    padding-left: 25px;
                    margin-bottom: 10px;

                    &::before {
                      content: "•";
                      color: #c0aa6a;
                      font-size: 24px;
                      position: absolute;
                      left: 0;
                      top: -3px;
                    }
                  }
                }
              }
            }
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
</style>