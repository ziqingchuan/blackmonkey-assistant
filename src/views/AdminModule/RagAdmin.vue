<template>
  <GlobalLoading :is-loading="isWaiting" />
  <CustomAlert ref="customAlert" />
  <AddWukongDataForm
      v-model:visible="isWukongUploading"
      @confirm="handleWukongInsert"
  />
  <AddAchievementsDataForm
      v-model:visible="isAchievementsUploading"
      @confirm="handleAchievementsInsert"
  />
  <AddCombatKnowledgeDataForm
      v-model:visible="isCombatKnowledgeUploading"
      @confirm="handleCombatKnowledgeInsert"
  />
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
            @click="toggleSidebar"
        />
      </div>
      <div class="btn-group">
        <button class="btn" @click="openFormDialog" title="添加数据" v-if="!isDialogView">
          <span class="btn-origin-text">纂天</span>
          <span class="btn-new-text">添加数据</span>
        </button>
        <button class="btn switch-btn" @click="switchToDialogView" title="查看对话" v-if="!isDialogView">
          <span class="btn-origin-text">问录</span>
          <span class="btn-new-text">查看对话</span>
        </button>
        <button class="btn switch-btn" @click="switchToDBView" title="查看数据" v-if="isDialogView">
          <span class="btn-origin-text">天机</span>
          <span class="btn-new-text">查看数据</span>
        </button>
        <button class="btn" @click="logout(router)" title="退出">
          <span class="btn-origin-text">归尘</span>
          <span class="btn-new-text">退出登录</span>
        </button>
      </div>
    </div>

    <!-- 主体 -->
    <div class="main-container">
      <!-- 数据库管理视图 -->
      <div v-if="!isDialogView" class="db-management-view">
        <!-- 数据库列表 -->
        <div class="DB-list" v-if="isDBListVisible">
          <div class="list-title">
            <CloudBeforeList class="cloud-decoration" />
            <span class="title-text">数据库列表</span>
          </div>
          <div class="DB-list-wrapper">
            <div
                v-if=" DBlist.length > 0"
                v-for="DBitem in DBlist"
                :key="DBitem.id"
                class="database-item"
                :class="{ active: currentDB?.id === DBitem.id }"
                @click="loadDataBase(DBitem.id)"
            >
              <div class="database-name">{{ DBitem.name.length > 20 ? DBitem.name.slice(0, 20) + '...' : DBitem.name }}</div>
            </div>
            <div v-if="DBlist.length === 0" class="empty-tip">
              暂无数据库
            </div>
          </div>
        </div>

        <!-- 数据库信息 -->
        <div class="database-container">
          <!-- 头部 -->
          <div class="database-header">
            <div class="header-container">
              <CloudBeforeTitle />
              <span class="database-title">数据库: {{ currentDB?.name || "请选择数据库" }},&nbsp;&nbsp;共{{ currentDB?.database.length || 0 }}条数据</span>
            </div>
          </div>
          <WukongDB
              v-if="currentDB?.name === 'wukong'"
              :currentDB="currentDB?.database as WukongDBInfo[]"
              @confirmDelete="handleConfirmDeleteWukongData"
          />
          <AchievementsDB
              v-else-if="currentDB?.name === 'achievements'"
              :currentDB="currentDB?.database as AchievementsDBInfo[]"
              @confirmDelete="handleConfirmDeleteAchievementsData"
          />
          <CombatKnowledgeDB
              v-else-if="currentDB?.name === 'combatKnowledge'"
              :currentDB="currentDB?.database as CombatKnowledgeDBInfo[]"
              @confirmDelete="handleConfirmDeleteCombatKnowledgeData"
          />
          <!-- 底部 -->
          <div class="footer">
            <RedCloudLeft />
            <span> 玄铁锻锋 · 天书易篆 </span>
            <RedCloudRight />
          </div>
        </div>
      </div>

      <!-- 对话管理视图 -->
      <div v-if="isDialogView" class="dialog-management-view">
        <ExportDialogInfoForm :sidebarVisible="isDialogSidebarVisible" />
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
import {
  type DataBase,
  type InsertWukongDBInfo,
  type WukongDBInfo,
  type AchievementsDBInfo,
  type CombatKnowledgeDBInfo,
  type InsertAchievementsDBInfo,
  insertAchievementsData,
  getAllCombatKnowledgeData,
  type InsertCombatKnowledgeDBInfo,
  insertCombatKnowledgeData
} from "../../apis/database.ts";
import {customAlert, logout, showAlert} from "../../utils/GlobalFunction.ts";
import {getAllWukongData, getAllAchievementsData, insertWukongData} from '../../apis/database.ts';
import WukongDB from "../../components/DataBase/WukongDB.vue";
import AchievementsDB from "../../components/DataBase/AchievementsDB.vue";
import AddWukongDataForm from "../../components/Form/AddWukongDataForm.vue";
import AddAchievementsDataForm from "../../components/Form/AddAchievementsDataForm.vue";
import ExportDialogInfoForm from "../../components/Form/ExportDialogInfoForm.vue";
import CombatKnowledgeDB from "../../components/DataBase/CombatKnowledgeDB.vue";
import AddCombatKnowledgeDataForm from "../../components/Form/AddCombatKnowledgeDataForm.vue";

// ==================== 变量声明 ====================
const currentUser = ref<any>([]);  // 当前用户信息
const token = ref(''); // 用户登录token
const currentDB = ref<DataBase>(); // 当前操纵的数据库
const isWaiting = ref(false); // 记录加载状态
const router = useRouter()
const isLogoHovered = ref(false); // 记录展开目录图标是否被鼠标悬停
const isDBListVisible = ref(false); // 记录数据库列表的显示状态
const wukongDB = ref<WukongDBInfo[]>([]); // 用于存储wukong数据库信息，后续会添加其他xxxDB
const achievementsDB = ref<AchievementsDBInfo[]>([]); // 用于存储achievements数据库信息
const combatKnowledgeDB = ref<CombatKnowledgeDBInfo[]>([]); // 用于存储combatKnowledge数据库信息
const isWukongUploading = ref(false); // 记录新增数据弹窗是否显示
const isAchievementsUploading = ref(false);
const isCombatKnowledgeUploading = ref(false);
const DBlist = ref<DataBase[]>([
  {
    id: 0,
    name: 'wukong',
    database: wukongDB.value
  },
  {
    id: 1,
    name: 'achievements',
    database: achievementsDB.value
  },
  {
    id: 2,
    name: 'combatKnowledge',
    database: combatKnowledgeDB.value
  },
])
const isDialogView = ref(false); // 记录是否为对话管理视图
const isDialogSidebarVisible = ref(true); // 记录对话管理视图侧边栏的显示状态

// 切换侧边栏显示状态
const toggleSidebar = () => {
  if (isDialogView.value) {
    // 在对话管理视图中，切换对话侧边栏显示
    isDialogSidebarVisible.value = !isDialogSidebarVisible.value;
  } else {
    // 在数据库管理视图中，切换数据库列表显示
    isDBListVisible.value = !isDBListVisible.value;
  }
};

// 加载具体数据库
const loadDataBase = (id: number) => {
  try {
    isWaiting.value = true;
    currentDB.value = DBlist.value[id];

  } catch (error) {
    showAlert("加载失败，请稍后再试", 0);
    console.log(error);
  } finally {
    isWaiting.value = false;
  }
};

const fetchAllWukongData = async () => {
  try {
    DBlist.value[0].database = await getAllWukongData();
    currentDB.value = DBlist.value[0];
  } catch (error) {
    console.error('数据获取失败:', error);
    showAlert('获取数据失败，请稍后再试', 0);
    throw error;  // 保持错误传递
  }
};

const fetchAllAchievementsData = async () => {
  try {
    DBlist.value[1].database = await getAllAchievementsData();
  } catch (error) {
    console.error('数据获取失败:', error);
    showAlert('获取数据失败，请稍后再试', 0);
    throw error;  // 保持错误传递
  }
};

const fetchAllCombatKnowledgeData = async () => {
  try {
    DBlist.value[2].database = await getAllCombatKnowledgeData();
  } catch (error) {
    console.error('数据获取失败:', error);
    showAlert('获取数据失败，请稍后再试', 0);
    throw error;  // 保持错误传递
  }
}

// 新增wukong数据库内容
const handleWukongInsert = async (data: InsertWukongDBInfo) => {
  try {
    isWaiting.value = true;
    await insertWukongData(data);
    await fetchAllWukongData();
    showAlert('数据导入成功！', 0);
  } catch (error) {
    showAlert('数据导入失败，请稍后再试', 0);
  } finally {
    isWaiting.value = false;
  }
};

const handleAchievementsInsert = async (data: InsertAchievementsDBInfo) => {
  try {
    isWaiting.value = true;
    await insertAchievementsData(data);
    await fetchAllAchievementsData();
    showAlert('数据导入成功！', 0);
  } catch (error) {
    showAlert('数据导入失败，请稍后再试', 0);
  } finally {
    isWaiting.value = false;
  }
};

const handleCombatKnowledgeInsert = async (data: InsertCombatKnowledgeDBInfo) => {
  try {
    isWaiting.value = true;
    await insertCombatKnowledgeData(data);
    await fetchAllCombatKnowledgeData();
    showAlert('数据导入成功！', 0);
  } catch (error) {
    showAlert('数据导入失败，请稍后再试', 0);
  } finally {
    isWaiting.value = false;
  }
};

const handleConfirmDeleteWukongData = async (isDeleted: boolean) => {
  try {
    if(isDeleted) {
      isWaiting.value = true;
      await fetchAllWukongData();
    }
  } catch (error) {
    console.error('数据删除失败:', error);
  } finally {
    isWaiting.value = false;
  }
}

const handleConfirmDeleteAchievementsData = async (isDeleted: boolean) => {
  try {
    if (isDeleted) {
      isWaiting.value = true;
      await fetchAllAchievementsData();
    }
  } catch (error) {
    console.error('数据删除失败:', error);
  } finally {
    isWaiting.value = false;
  }
}

const handleConfirmDeleteCombatKnowledgeData = async (isDeleted: boolean) => {
  try {
    if (isDeleted) {
      isWaiting.value = true;
      await fetchAllCombatKnowledgeData();
    }
  } catch (error) {
    console.error('数据删除失败:', error);
  } finally {
    isWaiting.value = false;
  }
}

const openFormDialog = () => {
  if (currentDB.value?.name === 'wukong') {
    isWukongUploading.value = true;
    isAchievementsUploading.value = false;
    isCombatKnowledgeUploading.value = false;
  } else if (currentDB.value?.name === 'achievements') {
    isWukongUploading.value = false;
    isAchievementsUploading.value = true;
    isCombatKnowledgeUploading.value = false;
  } else if (currentDB.value?.name === 'combatKnowledge') {
    isWukongUploading.value = false;
    isAchievementsUploading.value = false;
    isCombatKnowledgeUploading.value = true;
  }
}

// 切换到对话管理视图
const switchToDialogView = () => {
  isDialogView.value = true;
  isDBListVisible.value = false;
};

// 切换到数据库管理视图
const switchToDBView = () => {
  isDialogView.value = false;
  isDBListVisible.value = true;
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
      // 默认加载wukong数据库
      await fetchAllWukongData();
      await fetchAllAchievementsData();
      await fetchAllCombatKnowledgeData();
    } else {
      showAlert('管理员，请您先去登录，再来查看数据库', 0).then(() => {
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
@import url('https://fonts.googleapis.com/css2?family=STKaiti&display=swap');
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
    .DB-list {
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
          font-family: 'Ma Shan Zheng', cursive;
        }
      }
      .DB-list-wrapper {
        overflow-y: auto;
        height: 90%;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */

        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
        .database-item {
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
          .database-name {
            font-size: 18px;
            letter-spacing: 2px;
            color: #d3b479;
            padding-bottom: 10px;
          }
        }
        .database-item.active {
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

    .db-management-view {
      flex: 1;
      display: flex;
    }

    .dialog-management-view {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    .database-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 30px;

      .database-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .header-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          .database-title {
            font-size: 18px;
            letter-spacing: 2px;
            color: #d3b479;
            border-bottom: 2px solid #c0aa6a;
            padding-bottom: 10px;
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