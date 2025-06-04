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
        <button class="btn" @click="showReport = !showReport" title="查看报告">
          <span class="btn-origin-text">功勋</span>
          <span class="btn-new-text">分析报告</span>
        </button>
        <button class="btn" @click="router.back()" title="上一页">
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
        <div class="achievement-data" ref="achievementDataRef">
          <div class="title">
            <h1 class="float-up"> 用户数据</h1>
          </div>
          <!-- 用户信息区块 -->
          <div class="user-container">
            <div class="user-info float-up float-delay-2">
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
                      :stroke-dasharray="`${Math.round(achievementsAnalysis.achievementCount / 81 * 100) * 3.39} 339`"
                      stroke="url(#progressGradient)"
                  />
                </svg>
                <div class="progress-stats">
                  破难 {{ achievementsAnalysis.achievementCount }}/81难
                </div>
              </div>
            </div>
            <div class="user-info-analysis float-up float-delay-2">
              <div>
                您总共游玩了
                <span class="highlight-text">{{ steamUser.game.playtime_hours }}</span> 小时，
                属于<span class="highlight-text">{{ userInfoAnalysis.playerType }}</span> 玩家
              </div>
              <div>
                <span class="highlight-text">{{ userInfoAnalysis.lastTime }}</span>，您最后一棒荡平妖氛，扫灭心魔
              </div>
              <div>
                这 <span class="highlight-text">{{ userInfoAnalysis.dayDiff }}</span> 天，黑风山又生新魔，可要再试如意金箍棒？
            </div>
          </div>
          </div>
          <div class="title float-up float-delay-5">
            <h1> 成就数据分析</h1>
          </div>
          <!-- 数据分析 -->
          <div class="analysis-section float-up">
            <div class="whole-analysis float-up float-delay-1">
              <h3 class="float-up float-delay-2">证道历程</h3>
              <div class="whole-analysis-content">
                <div class="text-content">
                  <div v-if="achievementsAnalysis.firstAchievement">
                    <p class="float-up float-delay-3">您首次证道于 <span class="highlight">{{ achievementsAnalysis.firstAchievementTime }}</span>，</p>
                    <p class="float-up float-delay-3">还记得那天，您初踏西行路，于混沌中开天辟地，证得「<span class="achievement-name">{{ achievementsAnalysis.firstAchievement.name }}</span>」,</p>
                    <p class="achievement-desc float-up float-delay-3">{{ achievementsAnalysis.firstAchievement.description }}</p>
                  </div>
                  <div v-else>
                    <p>您尚未证得任何成就</p>
                  </div>

                  <div v-if="achievementsAnalysis.lastAchievement" class="last-achievement">
                    <p class="float-up float-delay-3">最近证道于 <span class="highlight">{{ achievementsAnalysis.lastAchievementTime }}</span>，</p>
                    <p class="float-up float-delay-3">还记得那天，您挥动如意金箍棒，扫尽八荒妖氛，证得「<span class="achievement-name">{{ achievementsAnalysis.lastAchievement.name }}</span>」,</p>
                    <p class="achievement-desc float-up float-delay-3">{{ achievementsAnalysis.lastAchievement.description }}</p>
                  </div>
                  <div v-else>
                    <p>您尚未证得任何成就</p>
                  </div>

                  <p class="achievement-desc float-up float-delay-4">您的证道速度平均为 <span class="highlight">{{ achievementsAnalysis.achievingSpeed.toFixed(2) }}</span> 难/日。</p>
                </div>
                <!-- 日历组件 -->
                <div class="calendar-container float-up float-delay-3">
                  <div class="calendar-header-controls">
                    <button class="calendar-nav-btn" @click="prevMonth" title="上一月">
                      <ArrowLeftIcon />
                    </button>
                    <h3 class="calendar-title">{{ calendarTitle }}</h3>
                    <button class="calendar-nav-btn" @click="nextMonth" title="下一月">
                      <ArrowRightIcon />
                    </button>
                  </div>
                  <div class="calendar">
                    <div class="calendar-header">
                      <div v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day" class="calendar-day-name">
                        {{ day }}
                      </div>
                    </div>
                    <div class="calendar-body">
                      <div
                          v-for="(day, index) in calendarDays"
                          :key="index"
                          class="calendar-day"
                          :class="{
                            'has-achievements': day.achievementCount > 0,
                            'current-month': day.inMonth
                          }"
                          :style="{
                            '--achievement-count': day.achievementCount,
                            'background-color': day.achievementCount > 0 ? `rgba(218, 185, 123, ${day.achievementCount / 20})` : 'transparent'
                          }"
                          @mouseover="hoveredDay = day"
                          @mouseleave="hoveredDay = undefined"
                      >
                        <div class="day-number">{{ day.date }}</div>
                        <div v-if="day.achievementCount > 0" class="achievement-dot"></div>
                      </div>
                    </div>
                  </div>

                  <!-- 日历提示信息 -->
                  <div v-if="hoveredDay" class="calendar-tooltip">
                    于{{ hoveredDay.fullDate }}证得
                    <span class="highlight">{{ hoveredDay.achievementCount }}难</span>
                  </div>
                  <div v-else class="calendar-tooltip">
                    鼠标悬浮于日期查看详情
                  </div>
                </div>
              </div>

            </div>

            <!-- 稀有与隐藏成就 -->
            <div class="rare-achievements-section">
              <h3 class="float-up float-delay-1">稀有与隐藏成就</h3>
              <div class="rare-cards-container">
                <!-- 稀有成就卡片 -->
                <div class="rare-card">
                  <div class="rare-icon rare-icon-gold"></div>
                  <h4 class="float-up float-delay-2">稀有成就</h4>
                  <div class="rare-progress float-up float-delay-3">
                    <div class="progress-bar">
                      <div class="progress-fill"
                           :style="{ width: (achievementsAnalysis.achievedRareAchievementCount / achievementsAnalysis.rareAchievementTotal * 100) + '%' }"></div>
                    </div>
                    <div class="rare-stats">
                      {{ achievementsAnalysis.achievedRareAchievementCount }}/{{ achievementsAnalysis.rareAchievementTotal }}
                      <span class="rare-percent">
                        {{ Math.round(achievementsAnalysis.achievedRareAchievementCount / achievementsAnalysis.rareAchievementTotal * 100) || 0 }}%
                      </span>
                    </div>
                  </div>
                  <p class="float-up float-delay-3">20%~50%玩家达成</p>
                </div>

                <!-- 超稀有成就卡片 -->
                <div class="rare-card">
                  <div class="rare-icon rare-icon-diamond"></div>
                  <h4 class="float-up float-delay-2">超稀有成就</h4>
                  <div class="rare-progress float-up float-delay-3">
                    <div class="progress-bar">
                      <div class="progress-fill"
                           :style="{ width: (achievementsAnalysis.achievedSuperRareAchievementCount / achievementsAnalysis.superRareAchievementTotal * 100) + '%' }"></div>
                    </div>
                    <div class="rare-stats">
                      {{ achievementsAnalysis.achievedSuperRareAchievementCount }}/{{ achievementsAnalysis.superRareAchievementTotal }}
                      <span class="rare-percent">
                        {{ Math.round(achievementsAnalysis.achievedSuperRareAchievementCount / achievementsAnalysis.superRareAchievementTotal * 100) || 0 }}%
                      </span>
                    </div>
                  </div>
                  <p class="float-up float-delay-3">少于20%玩家达成</p>
                </div>

                <!-- 隐藏成就卡片 -->
                <div class="rare-card">
                  <div class="rare-icon rare-icon-secret"></div>
                  <h4 class="float-up float-delay-2">隐藏成就</h4>
                  <div class="rare-progress float-up float-delay-3">
                    <div class="progress-bar">
                      <div class="progress-fill"
                           :style="{ width: (achievementsAnalysis.achievedHiddenAchievementCount / achievementsAnalysis.hiddenAchievementCount * 100) + '%' }"></div>
                    </div>
                    <div class="rare-stats">
                      {{ achievementsAnalysis.achievedHiddenAchievementCount }}/{{ achievementsAnalysis.hiddenAchievementCount }}
                      <span class="rare-percent">
                        {{ Math.round(achievementsAnalysis.achievedHiddenAchievementCount / achievementsAnalysis.hiddenAchievementCount * 100) || 0 }}%
                      </span>
                    </div>
                  </div>
                  <p class="float-up float-delay-3">需要特殊条件解锁</p>
                </div>
              </div>
            </div>

            <div class="analysis-description float-up">
              <div class="analysis-item float-up float-delay-1">
                <h3 class="float-up float-delay-2">月度证道分布</h3>
                <p class="float-up float-delay-3">左侧图表展示您各月证道数量分布。</p>
                <p class="float-up float-delay-3">证道数量最多的月份是 <span class="highlight">{{
                    pieChartData.reduce((max, curr) => curr.value > max.value ? curr : max, {name: '', value: 0}).name
                  }}</span>。</p>
              </div>

              <div class="analysis-item">
                <h3 class="float-up float-delay-2">证道趋势</h3>
                <p class="float-up float-delay-3">右侧图表展示您每日证道数量变化趋势。</p>
                <p class="float-up float-delay-3">证道最多的日子是 <span class="highlight">{{
                    lineChartData.reduce((max, curr) => curr.count > max.count ? curr : max, {date: '', count: 0}).date
                  }}</span>。</p>
              </div>
            </div>

            <div class="charts-container">
              <div id="pieChart" class="chart float-up float-delay-3"></div>
              <div id="lineChart" class="chart float-up float-delay-3"></div>
            </div>
          </div>

          <div class="title float-up float-delay-1">
            <h1> 《 八十一难 》</h1>
          </div>
          <!-- 成就列表 -->
          <div class="achievement-list float-up float-delay-2">
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
                <span class="percentage">{{ achievement.completion_percentage }}%的玩家达成</span>
              </div>
            </div>
          </div>
          <!-- 切换按钮 -->
          <div class="float-up float-delay-2">
            <button class="toggle-btn" @click="toggleAchievementsView">
              {{ showAllAchievements ? '收归本源' : '观尽八十一难' }}
            </button>
          </div>

        </div>

        <div class="footer">
          <RedCloudLeft />
          <span> 八十一难 · 七十二变 </span>
          <RedCloudRight />
        </div>
      </div>
    </div>
  </div>
  <!-- 右下角固定按钮 -->
  <div class="floating-buttons">
    <button class="floating-button" title="返回顶部" @click="scrollToTop('.achievement-data')">
      <ScrollToTopIcon />
    </button>
    <button class="floating-button" title="问答助手" @click="toggleDialog">
      <ChatBot />
    </button>
  </div>

  <!-- 问答助手对话框 -->
  <RagChatBotDialog
    :show="showDialog" 
    :userAvatar="steamUser.user.avatar" 
    :userAchievements="achievements"
    @close="toggleDialog" />
  <AchievementsReportDialog
      :show="showReport"
      @close="showReport = false" />
</template>
<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import Logo from '../../assets/icons/Logo.vue';
import CloudUnderLogo from "../../assets/icons/Clouds/Cloud-under-logo.vue";
import RedCloudLeft from "../../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../../assets/icons/Clouds/RedCloud-Right.vue";
import CustomAlert from "../../components/Dialog/CustomAlert.vue";
import GlobalLoading from "../../components/Dialog/GlobalLoading.vue";
import {
  type SteamUser,
  type Achievement,
  type CalendarDay,
  getSteamUserInfo,
  getUserAchievements,
  type UserInfoAnalysis,
  type AchievementInfoAnalysis,
  type AchievementsMonthMap,
  type AchievementsDayMap
} from "../../apis/steam.ts";
import {logout, showAlert, customAlert} from "../../utils/GlobalFunction.ts";
import { onBeforeUnmount, nextTick } from 'vue';
import RagChatBotDialog from "../../components/Dialog/RagChatBotDialog.vue";
import ScrollToTopIcon from "../../assets/icons/ScrollToTop.vue";
import ChatBot from "../../assets/icons/ChatBot.vue";
import { setupFloatAnimation, formatDate, initLineChart, initPieChart, destroyLineChart, destroyPieChart,
  lineChartData, pieChartData, scrollToTop } from "../../utils/GlobalFunction.ts";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon.vue";
import AchievementsReportDialog from "../../components/Dialog/AchievementsReportDialog.vue";
// ==================== 变量声明 ====================
const currentUser = ref<any>([]);  // 当前用户信息
const token = ref(''); // 用户登录token
const isWaiting = ref(false); // 记录等待状态
const showReport = ref(false);
const router = useRouter();
const achievementDataRef = ref<HTMLElement | null>(null); // 对.achievement-data容器的引用
const showAllAchievements = ref(false); // 显示所有成就列表
const hoveredDay = ref<CalendarDay>(); // 当前悬停的日期
const calendarDays = ref<CalendarDay[]>([]); // 日历日期数据
const currentMonth = ref(''); // 当前显示的月份 (格式: YYYY-MM)
const calendarTitle = ref(''); // 日历标题 (格式: YYYY年MM月)
const achievedMonths = ref<string[]>([]); // 所有有成就的月份
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
const userInfoAnalysis = ref<UserInfoAnalysis>({
  playerType: '',
  lastTime: '',
  dayDiff: 0,
});
const achievementsAnalysis = ref<AchievementInfoAnalysis>(<AchievementInfoAnalysis>{
  achievementCount: 0,
  rareAchievementTotal: 0,
  superRareAchievementTotal: 0,
  achievedRareAchievementCount: 0,
  achievedSuperRareAchievementCount: 0,
  hiddenAchievementCount: 0,
  achievedHiddenAchievementCount: 0,
  firstAchievementTime: '',
  firstAchievement: {},
  lastAchievementTime: '',
  lastAchievement: {},
  achievingSpeed: 0,
})
const achievementsTimeMap = ref<AchievementsMonthMap[]>([]); // 每月达成成就的详细信息
const showDialog = ref(false); // 对话框状态

// ==================== 函数声明 ====================
// 展示的成就数量
const visibleAchievements = computed(() =>
    showAllAchievements.value
        ? achievements.value
        : achievements.value.slice(0, 9)
);

function AnalyzeAchievementInfo() {
  // 获取各种成就
  const unlockedAchievements = achievements.value.filter(a => a.achieved && a.unlock_time);
  const rareAchievements = achievements.value.filter(a => a.completion_percentage >= 20 && a.completion_percentage <= 50);
  const superRareAchievements = achievements.value.filter(a => a.completion_percentage < 20);
  const achievedRareAchievements = unlockedAchievements.filter(a => a.completion_percentage >= 20 && a.completion_percentage <= 50);
  const achievedSuperRareAchievements = unlockedAchievements.filter(a => a.completion_percentage < 20);
  const hiddenAchievements = achievements.value.filter(a => a.hidden);
  const achievedHiddenAchievements = unlockedAchievements.filter(a => a.hidden);
  // 计算各类成就数量
  achievementsAnalysis.value.achievementCount = unlockedAchievements.length;
  achievementsAnalysis.value.rareAchievementTotal = rareAchievements.length;
  achievementsAnalysis.value.superRareAchievementTotal = superRareAchievements.length;
  achievementsAnalysis.value.achievedRareAchievementCount = achievedRareAchievements.length;
  achievementsAnalysis.value.achievedSuperRareAchievementCount = achievedSuperRareAchievements.length;
  achievementsAnalysis.value.hiddenAchievementCount = hiddenAchievements.length;
  achievementsAnalysis.value.achievedHiddenAchievementCount = achievedHiddenAchievements.length;

  if (unlockedAchievements.length > 0) {
    // 提取所有解锁时间并转换为Date对象
    const unlockDates = unlockedAchievements
        .map(a => ({
          date: new Date(a.unlock_time!),
          achievement: a
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    // 第一次和最后一次成就解锁时间
    achievementsAnalysis.value.firstAchievementTime = formatDate(unlockDates[0].date);
    achievementsAnalysis.value.firstAchievement = unlockDates[0].achievement;

    achievementsAnalysis.value.lastAchievementTime = formatDate(unlockDates[unlockDates.length - 1].date);
    achievementsAnalysis.value.lastAchievement = unlockDates[unlockDates.length - 1].achievement;

    // 计算成就解锁时间跨度（单位：天）
    const timeSpanDays = (unlockDates[unlockDates.length - 1].date.getTime() - unlockDates[0].date.getTime()) / (1000 * 3600 * 24);

    // 计算平均每天解锁成就数量（避免除以0）
    achievementsAnalysis.value.achievingSpeed = timeSpanDays > 0
        ? parseFloat((unlockedAchievements.length / timeSpanDays).toFixed(2))
        : unlockedAchievements.length;
  } else {
    // 没有解锁成就时的默认值
    achievementsAnalysis.value.firstAchievementTime = '尚未证道';
    achievementsAnalysis.value.lastAchievementTime = '尚未证道';
    achievementsAnalysis.value.achievingSpeed = 0;
  }
  //console.log(achievementsAnalysis.value)
}

function AnalyzeUserInfo() {
  const hours = steamUser.value.game.playtime_hours;
  if(hours < 30){
    userInfoAnalysis.value.playerType = '轻度体验';
  } else if (hours >= 30 && hours <= 40) {
    userInfoAnalysis.value.playerType = '主流节奏';
  } else {
    userInfoAnalysis.value.playerType = '深度探索';
  }
  const lastPlayedDate = new Date(steamUser.value.game.last_played);
  if (isNaN(lastPlayedDate.getTime())) return '';

  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - lastPlayedDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  // 格式化日期为中文
  const year = lastPlayedDate.getFullYear();
  const month = (lastPlayedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = lastPlayedDate.getDate().toString().padStart(2, '0');

  userInfoAnalysis.value.lastTime = `${year}年${month}月${day}日`;
  userInfoAnalysis.value.dayDiff = daysDiff;
}

function CalculateAchievementsTimeMap() {
  // 初始化一个空的 Map 来存储每月的成就信息
  const monthlyMap = new Map<string, AchievementsDayMap[]>();

  // 遍历所有成就
  achievements.value.forEach((achievement) => {
    if (achievement.achieved && achievement.unlock_time) {
      // 解析解锁时间
      const unlockDate = new Date(achievement.unlock_time);
      const yearMonth = `${unlockDate.getFullYear()}-${String(unlockDate.getMonth() + 1).padStart(2, '0')}`; // 格式化为 YYYY-MM
      const day = `${yearMonth}-${String(unlockDate.getDate()).padStart(2, '0')}`; // 格式化为 YYYY-MM-DD

      // 如果该月份未初始化，则初始化一个空数组
      if (!monthlyMap.has(yearMonth)) {
        monthlyMap.set(yearMonth, []);
      }
      // 获取当前月份的天数统计
      const dayMap = monthlyMap.get(yearMonth)!;
      // 查找是否存在当天的统计
      const dayEntry = dayMap.find((entry) => entry.day === day);

      if (dayEntry) {
        // 如果存在，则增加当天的成就数量
        dayEntry.count += 1;
      } else {
        // 如果不存在，则创建新的当天统计
        dayMap.push({ day, count: 1 });
      }
    }
  });

  // 将 Map 转换为数组并存储到 achievementsTimeMap 中
  achievementsTimeMap.value = Array.from(monthlyMap.entries()).map(([month, dayAndCount]) => ({
    month,
    dayAndCount,
  }));

  //console.log("AchievementsTimeMap:", achievementsTimeMap.value); // 控制台输出结果
}
// 切换视图
const toggleAchievementsView = () => {
  showAllAchievements.value = !showAllAchievements.value;
};

// 计算饼图数据
function calculatePieChartData() {
  pieChartData.value = achievementsTimeMap.value.map(month => {
    const total = month.dayAndCount.reduce((sum, day) => sum + day.count, 0);
    return {
      name: month.month,
      value: total
    };
  });
}

// 计算折线图数据
function calculateLineChartData() {
  // 从月度数据中提取所有天数据
  const allDays: AchievementsDayMap[] = [];
  achievementsTimeMap.value.forEach(month => {
    allDays.push(...month.dayAndCount);
  });

  // 按日期排序
  allDays.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

  lineChartData.value = allDays.map(day => ({
    date: day.day,
    count: day.count
  }));
}

// 初始化月份数据
function initCalendarData() {
  // 提取所有有成就的月份
  achievedMonths.value = [...new Set(
      achievements.value
          .filter(a => a.achieved && a.unlock_time)
          .map(a => a.unlock_time!.substring(0, 7))
  )].sort();

  // 设置初始月份 (使用最近有成就的月份或当前月)
  if (achievedMonths.value.length > 0) {
    currentMonth.value = achievedMonths.value[achievedMonths.value.length - 1];
  } else {
    const today = new Date();
    currentMonth.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  }

  // 更新日历标题
  updateCalendarTitle();
}

// 更新日历标题
function updateCalendarTitle() {
  const [year, month] = currentMonth.value.split('-');
  calendarTitle.value = `${year}年${month}月`;
}

// 生成日历
function generateCalendar() {
  calendarDays.value = [];
  const [yearStr, monthStr] = currentMonth.value.split('-');
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);

  // 获取当月第一天和最后一天
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  // 计算日历需要显示的前后空白天数
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 添加上个月的几天
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = prevMonthLastDay - i;
    calendarDays.value.push({
      date,
      inMonth: false,
      achievementCount: 0,
      fullDate: `${year}-${String(month - 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    });
  }

  // 添加当月的天数
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${monthStr}-${String(i).padStart(2, '0')}`;
    const achievementDay = achievementsTimeMap.value
        .flatMap(m => m.dayAndCount)
        .find(d => d.day === dateStr);

    calendarDays.value.push({
      date: i,
      inMonth: true,
      achievementCount: achievementDay ? achievementDay.count : 0,
      fullDate: dateStr
    });
  }
  const totalCells = 42; // 6行x7天
  const nextMonthDays = totalCells - calendarDays.value.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    calendarDays.value.push({
      date: i,
      inMonth: false,
      achievementCount: 0,
      fullDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    });
  }
}

// 切换到上一个月
function prevMonth() {
  const currentDate = new Date(`${currentMonth.value}-01`);
  currentDate.setMonth(currentDate.getMonth() - 1);

  currentMonth.value = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  updateCalendarTitle();
  generateCalendar();
}

// 切换到下一个月
function nextMonth() {
  const currentDate = new Date(`${currentMonth.value}-01`);
  currentDate.setMonth(currentDate.getMonth() + 1);

  currentMonth.value = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  updateCalendarTitle();
  generateCalendar();
}


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

    if (localStorage.getItem('name') && localStorage.getItem('achievements')) { // 直接获取本地存储的用户信息
      steamUser.value.game.last_played = localStorage.getItem('last_played') || '';
      steamUser.value.game.playtime_hours = Number(localStorage.getItem('playtime_hours') || '');
      steamUser.value.user.avatar = localStorage.getItem('avatar') || '';
      steamUser.value.user.name = localStorage.getItem('name') || '';
      achievements.value = JSON.parse(localStorage.getItem('achievements') || '[]');
      //console.log('用户信息:', steamUser.value);
      //console.log('用户成就信息:', achievements.value);
    } else {
      await getSteamUserInfo()
          .then(userInfo => {
            //console.log('获取用户信息成功:', userInfo);
            localStorage.setItem('last_played', userInfo.game.last_played);
            localStorage.setItem('playtime_hours', userInfo.game.playtime_hours);
            localStorage.setItem('avatar', userInfo.user.avatar);
            localStorage.setItem('name', userInfo.user.name);
            steamUser.value = userInfo;
          })
          .catch(error => {
            console.error('获取用户信息失败:', error.response?.data || error.message);
          });
      await getUserAchievements()
          .then(response => {
            //console.log('获取成就信息成功:', response);
            localStorage.setItem('achievements', JSON.stringify(response));
            achievements.value = response;
          })
          .catch(error => {
            console.error('获取成就信息失败:', error.response?.data || error.message);
          });
    }
    setupFloatAnimation(); // 设置浮动动画
    AnalyzeUserInfo(); // 分析用户信息
    AnalyzeAchievementInfo(); // 分析成就信息
    CalculateAchievementsTimeMap(); // 计算成就时间分布
    // 计算图表数据
    calculatePieChartData();
    calculateLineChartData();
    // 设置容器引用
    achievementDataRef.value = document.querySelector('.achievement-data');
    // 等待DOM更新后初始化图表
    await nextTick();
    initPieChart(); // 初始化饼图
    initLineChart(); // 初始化折线图
    initCalendarData();
    generateCalendar();

  } catch(error) {
    console.error(error);
  } finally {
    isWaiting.value = false;
  }
});

// 组件卸载前销毁图表实例
onBeforeUnmount(() => {
  destroyLineChart();
  destroyPieChart();
});

// 切换对话框显示状态
const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=STKaiti&display=swap');
/* 全局样式 */
input, button {
  font-family: 'Ma Shan Zheng', cursive;
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
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 30px;

      .achievement-data {
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
        .user-container {
          display: flex;
          flex-direction: row;
          gap: 30px;
          .user-info {
            width: 60%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 50px;
            background: rgba(40, 40, 45, 0.8) url("https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_2_a.png") no-repeat center;
            background-size: cover;
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

                .player-type, .return-tip {
                  color: #a89c7c;
                  margin-bottom: 5px;
                  margin-top: 5px;
                  font-size: 18px;

                  .label {
                    color: #c0aa6a;
                  }
                }

                .return-tip {
                  color: #e7cc80;
                  font-style: italic;
                  margin-top: 10px;
                  line-height: 1.4;
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
          .user-info-analysis {
            background: rgba(40, 40, 45, 0.8) url("https://black-monkey-resource.oss-cn-hangzhou.aliyuncs.com/asserts/BlackMonkey/img_bg_introduce_1_a.png") no-repeat right;
            background-size: contain;
            width: 40%;
            gap: 30px;
            padding: 50px;
            border-radius: 20px;
            color: #d3b479;
            font-size: 18px;
            line-height: 2;
            .highlight-text {
              font-size: 22px;
              font-style: italic;
              font-weight: bold;
              color: #fcf7ec;
            }
          }
        }

        .title {
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
          background: rgba(40, 40, 45, 0.8);
          padding: 20px 50px;
          border-radius: 20px;
          display: grid;
          justify-self: center;
          grid-template-columns: repeat(3, 1fr); /* 三列布局 */
          gap: 30px; /* 列间距 */

          .achievement-item {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            gap: 15px;
            padding: 30px;
            background: rgba(50, 50, 55, 0.6);
            border: 1px solid #3a3a3f;
            border-radius: 20px;
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
              flex: 1;
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
                font-size: 12px;
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

        .analysis-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          background: rgba(40, 40, 45, 0.8);
          background-size: cover;
          border-radius: 15px;
          margin-top: 20px;

          .whole-analysis {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 15px;
            text-align: center;
            font-size: 20px;
            h3 {
              color: #e7cc80;
              margin-top: 0;
              border-bottom: 1px solid rgba(231, 204, 128, 0.3);
              padding-bottom: 8px;
            }
            .whole-analysis-content {
              display: flex;
              flex-direction: row;
              gap: 200px;
              padding-top: 30px;
              justify-content: center;
              align-items: center;

              .text-content {

                p {
                  color: #a89c7c;
                  line-height: 2;
                  margin: 10px 0;
                }

                .highlight {
                  color: #fcf7ec;
                  font-weight: bold;
                  font-style: italic;
                }

                .achievement-name {
                  color: #fdfbf6;
                  font-weight: bold;
                  font-style: italic;
                }

                .achievement-desc {
                  color: #a89c7c;
                  font-style: italic;
                  padding-left: 20px;
                  margin: 8px 0;
                }

                .last-achievement {
                  margin-top: 20px;
                }
              }

              .calendar-container {
                width: 300px;
                background: rgba(45, 40, 35, 0.7);
                border: 1px solid #5d4b32;
                border-radius: 15px;
                padding: 15px;
                display: flex;
                flex-direction: column;
                .calendar-header-controls {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-bottom: 15px;

                  .calendar-nav-btn {
                    background: rgba(218, 185, 123, 0.2);
                    border: 1px solid #d3b479;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;

                    &:hover {
                      background: rgba(218, 185, 123, 0.4);
                      transform: scale(1.1);
                    }

                    svg {
                      width: 18px;
                      height: 18px;
                      fill: #e7cc80;
                    }
                  }

                  .calendar-title {
                    color: #fada9b;
                    font-size: 18px;
                    margin: 0;
                  }
                }
                .calendar-title {
                  color: #fada9b;
                  text-align: center;
                  margin-bottom: 15px;
                  border-bottom: 1px solid rgba(218, 185, 123, 0.3);
                  padding-bottom: 8px;
                }

                .calendar {
                  display: flex;
                  flex-direction: column;

                  .calendar-header {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    margin-bottom: 10px;

                    .calendar-day-name {
                      text-align: center;
                      color: #d3b479;
                      font-size: 14px;
                    }
                  }

                  .calendar-body {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 4px;

                    .calendar-day {
                      height: 35px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      position: relative;
                      border-radius: 4px;
                      cursor: pointer;
                      transition: all 0.3s;

                      &.current-month {
                        background: rgba(40, 37, 32, 0.6);
                      }

                      &.has-achievements {
                        box-shadow: 0 0 5px rgba(218, 185, 123, 0.5);

                        .achievement-dot {
                          position: absolute;
                          bottom: 3px;
                          width: 5px;
                          height: 5px;
                          border-radius: 50%;
                          background: #fada9b;
                        }
                      }

                      .day-number {
                        font-size: 14px;
                        color: #f3e3b8;
                        z-index: 1;
                      }

                      &:hover {
                        transform: scale(1.1);
                        z-index: 2;
                        box-shadow: 0 0 10px rgba(218, 185, 123, 0.8);
                      }
                    }
                  }
                }

                .calendar-tooltip {
                  margin-top: 15px;
                  padding: 8px;
                  text-align: center;
                  background: rgba(35, 32, 28, 0.8);
                  border-radius: 8px;
                  color: #d3b479;
                  font-size: 14px;
                  border: 1px solid #5d4b32;

                  .highlight {
                    color: #fcf7ec;
                    font-weight: bold;
                  }
                }
              }

              @media (max-width: 1200px) {
                .whole-analysis {
                  flex-direction: column;

                  .calendar-container {
                    width: 100%;
                    margin-top: 20px;
                  }
                }
              }
            }
          }

          .rare-achievements-section {
            margin-top: 10px;
            padding: 20px;
            border-radius: 15px;

            h3 {
              color: #e7cc80;
              text-align: center;
              font-size: 24px;
              margin-bottom: 25px;
              border-bottom: 1px solid rgba(231, 204, 128, 0.3);
              padding-bottom: 15px;
            }

            .rare-cards-container {
              display: flex;
              justify-content: space-around;
              gap: 20px;

              @media (max-width: 768px) {
                flex-direction: column;
              }

              .rare-card {
                flex: 1;
                background: rgba(44, 43, 43, 0.76);
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                border: 1px solid #5d4b32;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s;

                &:hover {
                  transform: translateY(-5px);
                  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
                }

                h4 {
                  color: #e7cc80;
                  margin-top: 15px;
                  margin-bottom: 15px;
                  font-size: 20px;
                }

                p {
                  color: #a89c7c;
                  font-size: 14px;
                  margin-top: 10px;
                }

                .rare-icon {
                  width: 60px;
                  height: 60px;
                  margin: 0 auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;

                  &::before {
                    content: "";
                    display: block;
                  }

                  &-gold {
                    background: linear-gradient(135deg, #d7b15b 0%, #f8e08e 100%);
                    box-shadow: 0 0 10px rgba(215, 177, 91, 0.5);

                    &::before {
                      width: 40px;
                      height: 40px;
                      background: #4a3e2d;
                      clip-path: polygon(
                              50% 0%,
                              61% 35%,
                              98% 35%,
                              68% 57%,
                              79% 91%,
                              50% 70%,
                              21% 91%,
                              32% 57%,
                              2% 35%,
                              39% 35%
                      );
                    }
                  }

                  &-diamond {
                    background: linear-gradient(135deg, #6a9ebd 0%, #a4d4f0 100%);
                    box-shadow: 0 0 10px rgba(106, 158, 189, 0.5);

                    &::before {
                      width: 25px;
                      height: 25px;
                      background: #2c3e50;
                      transform: rotate(45deg);
                    }
                  }

                  &-secret {
                    background: linear-gradient(135deg, #9b6eb0 0%, #d4b1e6 100%);
                    box-shadow: 0 0 10px rgba(155, 110, 176, 0.5);

                    &::before {
                      width: 25px;
                      height: 25px;
                      background: #4a235a;
                      border-radius: 50% 50% 0 0;
                      position: relative;

                      &::after {
                        content: "";
                        position: absolute;
                        width: 15px;
                        height: 10px;
                        background: #4a235a;
                        top: 15px;
                        left: 5px;
                        border-radius: 0 0 5px 5px;
                      }
                    }
                  }
                }

                .rare-progress {
                  margin-top: 15px;
                  .progress-bar {
                    height: 10px;
                    background: #3a352c;
                    border-radius: 5px;
                    overflow: hidden;
                    margin-bottom: 8px;
                    .progress-fill {
                      height: 100%;
                      border-radius: 5px;
                      transition: width 0.8s ease;
                    }
                  }
                  .rare-stats {
                    color: #fcf7ec;
                    font-size: 18px;
                    display: flex;
                    justify-content: space-between;

                    .rare-percent {
                      color: #fada9b;
                      font-weight: bold;
                    }
                  }
                }
              }

              .rare-card:nth-child(1) .progress-fill {
                background: linear-gradient(to right, #d7b15b, #f8e08e);
              }

              .rare-card:nth-child(2) .progress-fill {
                background: linear-gradient(to right, #6a9ebd, #a4d4f0);
              }

              .rare-card:nth-child(3) .progress-fill {
                background: linear-gradient(to right, #9b6eb0, #d4b1e6);
              }
            }
          }

          .analysis-description {
            display: flex;
            justify-content: space-between;
            gap: 20px;

            .analysis-item {
              flex: 1;
              padding-left: 10px;
              padding-right: 10px;
              text-align: center;
              border-radius: 10px;
              font-size: 18px;

              h3 {
                color: #e7cc80;
                margin-top: 0;
                border-bottom: 1px solid rgba(231, 204, 128, 0.3);
                padding-bottom: 8px;
              }

              p {
                color: #a89c7c;
                line-height: 1.6;
                margin: 10px 0;
              }

              .highlight {
                color: #fcf7ec;
                font-weight: bold;
                font-style: italic;
              }
            }
          }

          .charts-container {
            display: flex;
            gap: 20px;
            height: 400px;

            .chart {
              flex: 1;
              background: rgba(30, 30, 35, 0.7);
              border-radius: 10px;
              border: 1px solid #3a3a3f;
            }
          }
        }

        /* 响应式调整 */
        @media (max-width: 1200px) {
          .analysis-description {
            flex-direction: column;
          }

          .charts-container {
            flex-direction: column;
            height: 800px !important;
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

