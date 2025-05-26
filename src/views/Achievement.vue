<template>
  <GlobalLoading :is-loading="isWaiting" />
  <CustomAlert ref="customAlert" />
  <div class="page-container">
    <!-- 玄铁侧栏 -->
    <div class="sidebar">
      <div class="logo-container">
        <Logo />
        <CloudUnderLogo style="margin-top: -25px;" />
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

    <!-- 主体内容 -->
    <div class="main-container">
      <div class="achievement-container">
        <div class="achievement-data">
          <!-- 用户信息区块 -->
          <div class="user-container">
            <div class="user-info">
              <div class="avatar-section">
                <img :src="steamUser.user.avatar" alt="用户头像" class="user-avatar" />
                <div class="user-meta">
                  <h2 class="user-name">{{ steamUser.user.name }}</h2>
                  <p class="play-time">
                    <span class="label">历劫时长：</span>
                    {{ steamUser.game.playtime_hours }}时辰
                  </p>
                  <p class="last-played">
                    <span class="label">末次问道：</span>
                    {{ steamUser.game.last_played }}
                  </p>
                </div>
              </div>

              <!-- 圆环进度条 -->
              <div class="progress-ring">
                <svg width="120" height="120">
                  <defs>
                    <!-- 定义环形渐变 -->
                    <linearGradient id="progressGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(90, 60, 60)">
                      <stop offset="0%" stop-color="#fff" />
                      <stop offset="100%" stop-color="#fada9b" />
                    </linearGradient>
                  </defs>
                  <!-- 背景圆环 -->
                  <circle class="ring-bg" cx="60" cy="60" r="54" />
                  <!-- 渐变圆环 -->
                  <circle
                      class="ring-progress"
                      cx="60"
                      cy="60"
                      r="54"
                      :stroke-dasharray="`${achievedPercent * 3.39} 339`"
                      stroke="url(#progressGradient)"
                  />
                </svg>
                <div class="progress-stats">
                  破难 {{ achieved }}/{{ totalAchievements }}难
                </div>
              </div>
            </div>
            <div class="user-achievement-summary">
              <!-- 最近完成的一个成就 -->
              <div v-if="recentAchievement" class="recent-achievement">
                <h3>最近完成</h3>
                <img
                    :src="recentAchievement.icon"
                    alt="最近完成的成就图标"
                    class="achievement-icon"
                />
                <div class="achievement-details">
                  <h4 class="achievement-title">{{ recentAchievement.name }}</h4>
                  <p class="achievement-desc">{{ recentAchievement.description }}</p>
                  <p class="unlock-time">
                    完成时间：{{ recentAchievement.unlock_time }}
                  </p>
                </div>
              </div>

              <!-- 即将完成的一个成就 -->
              <div v-if="upcomingAchievement" class="upcoming-achievement">
                <h3>即将完成</h3>
                <img
                    :src="upcomingAchievement.icon"
                    alt="即将完成的成就图标"
                    class="achievement-icon"
                />
                <div class="achievement-details">
                  <h4 class="achievement-title">{{ upcomingAchievement.name }}</h4>
                  <p class="achievement-desc">{{ upcomingAchievement.description }}</p>
                  <p class="completion-percentage">
                    当前进度：{{ upcomingAchievement.completion_percentage }}%
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="achievement-title">
            <h1> 《 八十一难 》</h1>
          </div>

          <!-- 成就列表 -->
          <div class="achievement-list">
            <div
                v-for="(achievement, index) in visibleAchievements"
                :key="index"
                class="achievement-item"
                :class="{ achieved: achievement.achieved }"
            >
              <img
                  :src="achievement.achieved ? achievement.icon : achievement.icon_gray"
                  alt="成就图标"
                  class="achievement-icon"
              />

              <div class="achievement-details">
                <h3 class="achievement-title">{{ achievement.name }}</h3>
                <p class="achievement-desc">{{ achievement.description }}</p>
                <div v-if="achievement.unlock_time" class="unlock-time">
                  证道时辰：{{ achievement.unlock_time }}
                </div>
              </div>
              <div class="completion-bar">
                <div
                    class="bar-progress"
                    :style="{ width: achievement.completion_percentage + '%' }"
                ></div>
                <span class="percentage">{{ achievement.completion_percentage }}%</span>
              </div>
            </div>
          </div>

          <!-- 切换按钮 -->
          <button class="toggle-btn" @click="toggleAchievementsView">
            {{ showAllAchievements ? '收归本源' : '观尽八十一难' }}
          </button>
        </div>

        <div class="footer">
          <RedCloudLeft />
          <span> 八十一难 · 七十二变 </span>
          <RedCloudRight />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '../assets/icons/Logo.vue'; // 左上角悟空logo
import CloudUnderLogo from "../assets/icons/Clouds/Cloud-under-logo.vue"; // 左上角logo下方祥云
import RedCloudLeft from "../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../assets/icons/Clouds/RedCloud-Right.vue";
import CustomAlert from "../components/CustomAlert.vue"; // 自定义弹窗组件
import GlobalLoading from "../components/GlobalLoading.vue";
import {type SteamUser, type Achievement, getSteamUserInfo, getUserAchievements} from "../apis/steam.ts";
import {logout, showAlert, customAlert} from "../utils/GlobalFunction.ts";

// ==================== 变量声明 ====================
const currentUser = ref<any>([]);  // 当前用户信息
const token = ref(''); // 用户登录token
const isWaiting = ref(false); // 记录等待状态
const router = useRouter()
const showAllAchievements = ref(false); // 显示所有成就列表
const steamUser = ref<SteamUser>({
    game: {
      last_played: '',
      playtime_hours: 0
    },
    user: {
      avatar: '',
      name: ''
    }
}); // steam用户信息
const achievements = ref<Achievement[]>([]); // 成就列表
// ==================== 函数声明 ====================
// 计算属性
const achieved = computed(() =>
    achievements.value.filter(a => a.achieved).length
);

const totalAchievements = computed(() => achievements.value.length);

const achievedPercent = computed(() =>
    Math.round((achieved.value / totalAchievements.value) * 100)
);

const visibleAchievements = computed(() =>
    showAllAchievements.value
        ? achievements.value
        : achievements.value.slice(0, 9)
);

// 最近完成的成就
const validAchievements = computed(() => {
  return achievements.value
      .filter(a => a.achieved && a.unlock_time) // 确保 unlock_time 存在
      .map(a => ({ ...a, unlock_time: a.unlock_time! })); // 类型断言，确保 unlock_time 为 string
});

const recentAchievement = computed(() => {
  return validAchievements.value
      .sort((a, b) => new Date(b.unlock_time).getTime() - new Date(a.unlock_time).getTime())[0];
});
// 即将完成的成就
const upcomingAchievement = computed(() => {
  return achievements.value
      .sort((a, b) => b.completion_percentage - a.completion_percentage)[0]; // 进度最大的一个
});

// 切换视图
const toggleAchievementsView = () => {
  showAllAchievements.value = !showAllAchievements.value;
};


// 界面初始化加载
onMounted(async () => {
  try {
    isWaiting.value = true;
    // 判断用户是否登录
    if (localStorage.getItem('userProfile')) {
      currentUser.value = JSON.parse(localStorage.getItem('userProfile') || '');
      token.value = localStorage.getItem('token') || '';
    } else {
      showAlert('天命人，请您先去登录，再来求问', 0).then(() => {
        router.push('/account'); // 跳转到登录页面
      });
    }

    if(!localStorage.getItem('name') || !localStorage.getItem('achievements')) {
      if(localStorage.getItem('achievements')) {
        achievements.value = JSON.parse(localStorage.getItem('achievements') || '[]');
        await getSteamUserInfo()
            .then(userInfo => {
              //console.log('获取用户信息成功:', userInfo);
              localStorage.setItem('last_played', userInfo.game.last_played);
              localStorage.setItem('playtime_hours', userInfo.game.playtime_hours);
              localStorage.setItem('avatar', userInfo.user.avatar);
              localStorage.setItem('name', userInfo.user.name);
              steamUser.value = userInfo;
              //console.log('本地存储用户信息:', steamUser.value);
            })
            .catch(error => {
              //console.error('获取用户信息失败:', error.response?.data || error.message);
            });
      } else {
        steamUser.value.game.last_played = localStorage.getItem('last_played') || '';
        steamUser.value.game.playtime_hours = Number(localStorage.getItem('playtime_hours') || '');
        steamUser.value.user.avatar = localStorage.getItem('avatar') || '';
        steamUser.value.user.name = localStorage.getItem('name') || '';
        await getUserAchievements()
            .then(response => {
              localStorage.setItem('achievements', JSON.stringify(response.achievements));
              //console.log('本地存储用户成就信息:', JSON.parse(localStorage.getItem('achievements') || '[]'));
              achievements.value = response.achievements;
            })
            .catch(error => {
              console.error('获取成就信息失败:', error.response?.data || error.message);
            });
      }

    } else { // 直接获取本地存储的用户信息
      steamUser.value.game.last_played = localStorage.getItem('last_played') || '';
      steamUser.value.game.playtime_hours = Number(localStorage.getItem('playtime_hours') || '');
      steamUser.value.user.avatar = localStorage.getItem('avatar') || '';
      steamUser.value.user.name = localStorage.getItem('name') || '';
      achievements.value = JSON.parse(localStorage.getItem('achievements') || '[]');
      //console.log('用户信息:', steamUser.value);
      //console.log('用户成就信息:', achievements.value);
    }

  } catch(error) {
    console.error(error);
  } finally {
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
  width: 100%;
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

    .achievement-container {
      width: 96%;
      margin-left: 2%;
      margin-top: 2%;
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;


      .achievement-data {
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
        .user-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          .user-info {
            flex: 1;
            height: 180px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            padding: 30px;
            background: rgba(40, 40, 45, 0.8);
            border-radius: 20px;

            .avatar-section {
              display: flex;
              align-items: center;
              gap: 20px;

              .user-avatar {
                width: 120px;
                height: 120px;
                border-radius: 30%;
                border: 2px solid #d3b479;
              }

              .user-meta {
                .user-name {
                  color: #d3b479;
                  font-size: 32px;
                  margin: 0;
                }

                .play-time, .last-played {
                  color: #a89c7c;
                  margin-bottom: 5px;
                  margin-top: 5px;
                  font-size: 18px;

                  .label {
                    color: #c0aa6a;
                  }
                }
              }
            }

            .progress-ring {
              position: relative;
              display: flex;
              flex-direction: row;
              justify-content: end;
              align-items: center;

              svg {
                position: absolute;
                transform: rotate(-90deg);

                circle {
                  fill: none;
                  stroke-width: 10;
                  stroke-linecap: round;

                  &.ring-bg {
                    stroke: #3a3a3f;
                  }

                  &.ring-progress {
                    stroke: url(#progressGradient);
                    transition: stroke-dasharray 0.5s ease;
                  }
                }
              }

              .progress-stats {
                margin-right: 150px;
                color: #c0aa6a;
                font-size: 24px;
              }
            }
          }
          .user-achievement-summary {
            display: flex;
            flex-direction: column;
            gap: 20px;
            background: rgba(50, 50, 55, 0.6);
            border-radius: 20px;
            padding: 20px;
            .recent-achievement,.upcoming-achievement {
              display: flex;
              flex-direction: row;
              justify-content: start;
              align-items: center;
              gap: 15px;
              h3 {
                font-size: 20px;
                color: #e7cc80;
                margin-bottom: 10px;
              }

              .achievement-icon {
                width: 64px;
                height: 64px;
                border-radius: 8px;
                margin-bottom: 10px;
              }

              .achievement-details {
                .achievement-title {
                  font-size: 18px;
                  color: #d3b479;
                  margin: 0 0 5px;
                }

                .achievement-desc {
                  font-size: 16px;
                  color: #a89c7c;
                  margin: 0 0 5px;
                }

                .unlock-time, .completion-percentage {
                  font-size: 14px;
                  color: #c0aa6a;
                }
              }
            }
          }
        }
        .achievement-title {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: start;
          h1 {
            font-size: 24px;
            color: #e7cc80;
            width: 100%;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(231, 204, 128, 0.5);
          }
        }

        .achievement-list {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 三列布局 */
          gap: 15px; /* 列间距 */

          .achievement-item {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: rgba(50, 50, 55, 0.6);
            border: 1px solid #3a3a3f;
            border-radius: 10px;
            transition: transform 0.3s;
            cursor: pointer;

            &:hover {
              transform: translateY(-5px);
            }

            &.achieved {
              border-color: #d3b479;
            }

            .achievement-icon {
              width: 64px;
              height: 64px;
              border-radius: 8px;
            }

            .achievement-details {
              width: 200px;

              .achievement-title {
                margin: 0;
                font-size: 20px;
                color: #e7cc80;
              }

              .achievement-desc {
                color: #a89c7c;
                font-size: 14px;
                margin-bottom: 5px;
                margin-top: 5px;
              }

              .unlock-time {
                color: #6aaac0;
                font-size: 12px;
                margin-bottom: 10px;
              }


            }
            .completion-bar {
              width: 150px;
              height: 6px;
              background: #3a3a3f;
              border-radius: 3px;

              .bar-progress {
                height: 100%;
                background: linear-gradient(to right, #4b3e26, #fada9b);
                border-radius: 3px;
                transition: width 0.5s ease;
              }

              .percentage {
                color: #c0aa6a;
                font-size: 16px;
              }
            }
          }
        }

        .toggle-btn {
          display: block;
          margin: 20px auto 0;
          padding: 8px 25px;
          background: rgba(192, 170, 106, 0.1);
          color: #d3b479;
          border: 1px solid #c0aa6a33;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background: rgba(192, 170, 106, 0.2);
            border-color: #c0aa6a;
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