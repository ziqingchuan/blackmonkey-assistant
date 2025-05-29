<template>
  <GlobalLoading :is-loading="isWaiting" />
  <CustomAlert ref="customAlert" />
  <EditWukongDataForm
      v-model:visible="isEditing"
      :editing-data="editingDB"
      @confirm="handleUpdate"
  />
  <AddWukongDataForm
      v-model:visible="isUploading"
      @confirm="handleInsert"
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
            @click="isDBListVisible = !isDBListVisible"
        />
      </div>
      <div class="btn-group">
        <button class="btn" @click="isUploading = true" title="上传数据">
          <span class="btn-origin-text">纂天</span>
          <span class="btn-new-text">上传数据</span>
        </button>
        <button class="btn" @click="logout(router)" title="退出">
          <span class="btn-origin-text">归尘</span>
          <span class="btn-new-text">退出登录</span>
        </button>
      </div>
    </div>

    <!-- 主体 -->
    <div class="main-container">
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
            <div class="database-name">{{ DBitem.name.length > 9 ? DBitem.name.slice(0, 9) + '...' : DBitem.name }}</div>
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

        <!-- 数据库主内容 -->
        <div class="DB-information">
          <!-- 数据表格展示区 -->
          <div class="data-table-container">
            <div class="table-header">
              <div class="header-item" style="width: 55%">文本内容</div>
              <div class="header-item" style="width: 15%">数据类别</div>
              <div class="header-item" style="width: 15%">数据来源</div>
              <div class="header-item" style="width: 15%">操作</div>
            </div>

            <div class="table-body">
              <div
                  v-for="(item, index) in paginatedData"
                  :key="index"
                  class="data-row"
                  :class="{ 'odd-row': index % 2 === 0 }"
              >
                <div class="data-cell" style="width: 55%">
                  <div class="scrollable-text">{{ item.text }}</div>
                </div>
                <div class="data-cell" style="width: 15%">
                  <span class="category-tag">{{ item.category }}</span>
                </div>
                <div class="data-cell" style="width: 15%">
                  <span class="source-text">{{ item.source }}</span>
                </div>
                <div class="data-cell operations" style="width: 15%">
                  <button
                      class="operation-btn edit-btn"
                      @click="editItem(item)"
                      title="修改天机"
                  >
                    修改
                  </button>
                  <button
                      class="operation-btn delete-btn"
                      @click="deleteItem(item)"
                      title="删除数据"
                  >
                    删除
                  </button>
                </div>
              </div>
              <div v-if="paginatedData.length === 0" class="empty-tip">
                暂无数据
              </div>
            </div>

            <!-- 分页控制器 -->
            <div class="pagination-container">
              <button
                  class="pagination-btn"
                  :disabled="currentPage === 1"
                  @click="currentPage--"
              >
                ‹ 前页
              </button>

              <span class="page-info">
        第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
      </span>

              <button
                  class="pagination-btn"
                  :disabled="currentPage >= totalPages"
                  @click="currentPage++"
              >
                后页 ›
              </button>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="footer">
          <RedCloudLeft />
          <span> 玄铁锻锋 · 天书易篆 </span>
          <RedCloudRight />
        </div>

      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import Logo from '../assets/icons/Logo.vue'; // 左上角悟空logo
import CloudUnderLogo from "../assets/icons/Clouds/Cloud-under-logo.vue"; // 左上角logo下方祥云
import RedCloudLeft from "../assets/icons/Clouds/RedCloud-Left.vue";
import RedCloudRight from "../assets/icons/Clouds/RedCloud-Right.vue";
import CloudBeforeTitle from "../assets/icons/Clouds/Cloud-before-title.vue"; // 对话标题前的祥云
import CloudBeforeList from "../assets/icons/Clouds/Cloud-before-list.vue"; // 对话列表前的祥云
import CustomAlert from "../components/CustomAlert.vue"; // 自定义弹窗组件
import GlobalLoading from '../components/GlobalLoading.vue'; // 全局加载组件
import EditWukongDataForm from "../components/EditWukongDataForm.vue";
import AddWukongDataForm from "../components/AddWukongDataForm.vue";
import MenuBtn from "../assets/icons/MenuBtn.vue"; // 目录按钮
import type {DataBase, InsertWukongDBInfo, WukongDBInfo} from "../apis/database.ts";
import {customAlert, logout, showAlert} from "../utils/GlobalFunction.ts";
import {deleteWukongData, getAllWukongData, insertWukongData, updateWukongData} from '../apis/database.ts';
// ==================== 模拟数据相关功能导入 ==========
// import {deleteWukongData, getAllWukongData, insertWukongData, updateWukongData} from '../mocks/ragAdmin.ts';

// ==================== 变量声明 ====================
const currentUser = ref<any>([]);  // 当前用户信息
const token = ref(''); // 用户登录token
const currentDB = ref<DataBase>(); // 当前操纵的数据库
const isWaiting = ref(false); // 记录加载状态
const router = useRouter()
const isLogoHovered = ref(false); // 记录展开目录图标是否被鼠标悬停
const isDBListVisible = ref(false); // 记录数据库列表的显示状态
const wukongDB = ref<WukongDBInfo[]>([]); // 用于存储wukong数据库信息，后续会添加其他xxxDB
const editingDB = ref<WukongDBInfo>(); // 用于存储正在编辑修改的数据
const isEditing = ref(false); // 记录编辑弹窗是否显示
const isUploading = ref(false); // 记录新增数据弹窗是否显示
const DBlist = ref<DataBase[]>([
  {
    id: 0,
    name: 'wukong',
    database: wukongDB.value
  },
  // {
  //   id: 1,
  //   name: 'wukong2',
  //   database: []
  // },
])
// 分页相关逻辑
const currentPage = ref(1);
const itemsPerPage = 10;

// ==================== 函数声明 ====================

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return currentDB.value?.database.slice(start, end) || [];
});

const totalPages = computed(() => {
  return Math.ceil((currentDB.value?.database.length || 0) / itemsPerPage);
});

// 操作函数
const editItem = (item: WukongDBInfo) => {
  editingDB.value = item;
  isEditing.value = true; // 打开编辑弹窗
};

// 修改wukong数据库内容
const handleUpdate = async (data: WukongDBInfo) => {
  try {
    isWaiting.value = true;
    await updateWukongData(data);
    await fetchAllWukongData();
    showAlert('修改数据成功!', 0);
  } catch (error) {
    console.error('修改失败:', error);
    showAlert('数据修改失败，请稍后再试', 0);
  } finally {
    isWaiting.value = false;
  }
};

// 新增wukong数据库内容
const handleInsert = async (data: InsertWukongDBInfo) => {
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


// 删除函数
const deleteItem = async (item: WukongDBInfo) => {
  const confirmed = await showAlert(`确定要删除该条数据吗？`, 1);
  if (!confirmed) return;

  try {
    isWaiting.value = true;
    await deleteWukongData(item.pk);
    await fetchAllWukongData();

    showAlert('删除数据成功!', 0);
  } catch (error) {
    console.error('删除失败:', error);
    showAlert('删除失败，请稍后再试', 0);
  } finally {
    isWaiting.value = false;
  }
};

// 加载具体数据库
const loadDataBase = (id: number) => {
  currentPage.value = 1; // 重置分页
  try {
    // 进入等待状态
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
    //console.log('获取数据结果:', res);
    DBlist.value[0].database = await getAllWukongData();
    currentDB.value = DBlist.value[0];
    // console.log('当前显示的数据库:', DBlist.value[0].database)
  } catch (error) {
    console.error('数据获取失败:', error);
    showAlert('获取数据失败，请稍后再试', 0);
    throw error;  // 保持错误传递
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
      //console.log('当前用户信息：', currentUser.value, token.value)
      // 默认加载wukong数据库
      await fetchAllWukongData();
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
      .DB-information {
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

        .data-table-container {
          width: 100%;
          height: 100%;
          background: rgba(30, 30, 35, 0.7);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

          .table-header {
            display: flex;
            padding: 12px 15px;
            background: linear-gradient(to right, #2a1e10 0%, #3a2a14 100%);
            border-bottom: 1px solid #c0aa6a;

            .header-item {
              color: #d3b479;
              font-size: 16px;
              letter-spacing: 1px;
              text-shadow: 0 0 5px rgba(211, 180, 128, 0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
            }
          }

          .table-body {
            max-height: calc(100% - 100px);
            overflow-y: auto;

            .data-row {
              display: flex;
              padding: 12px 15px;
              border-bottom: 1px solid #3a3a3f;
              transition: background 0.3s;
              cursor: pointer;
              &:hover {
                background: rgba(60, 55, 45, 0.3);
              }


              .data-cell {
                color: #e7cc80;
                font-size: 14px;
                display: flex;
                justify-content: center;
                text-align: center;
                align-items: center;

                .scrollable-text {
                  max-height: 60px;
                  overflow-y: auto;
                  line-height: 1.5;
                  scrollbar-width: thin;
                  scrollbar-color: #c0aa6a transparent;
                  text-align: left;
                  justify-content: flex-start;

                  &::-webkit-scrollbar {
                    width: 4px;
                  }

                  &::-webkit-scrollbar-thumb {
                    background-color: #c0aa6a;
                    border-radius: 2px;
                  }
                }

                .category-tag {
                  background: rgba(192, 170, 106, 0.15);
                  padding: 4px 8px;
                  border-radius: 4px;
                  border: 1px solid #c0aa6a33;
                }

                .source-text {
                  font-style: italic;
                  color: #a89c7c;
                }

                &.operations {
                  justify-content: center;
                  gap: 8px;

                  .operation-btn {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;

                    &.edit-btn {
                      background: rgba(106, 170, 192, 0.15);
                      color: #6aaac0;

                      &:hover {
                        border-color: #6aaac0;
                        background: rgba(106, 170, 192, 0.25);
                      }
                    }

                    &.delete-btn {
                      background: rgba(192, 106, 106, 0.15);
                      color: #c06a6a;

                      &:hover {
                        border-color: #c06a6a;
                        background: rgba(192, 106, 106, 0.25);
                      }
                    }
                  }
                }
              }
            }

            .empty-tip {
              text-align: center;
              padding: 20px;
              color: #7a6a4a;
              font-size: 16px;
            }
          }

          .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;
            gap: 20px;
            border-top: 1px solid #3a3a3f;

            .pagination-btn {
              background: rgba(192, 170, 106, 0.1);
              color: #d3b479;
              border: 1px solid #c0aa6a33;
              padding: 6px 12px;
              border-radius: 4px;
              cursor: pointer;
              transition: all 0.2s;

              &:hover:not(:disabled) {
                background: rgba(192, 170, 106, 0.2);
                border-color: #c0aa6a;
              }

              &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }
            }

            .page-info {
              color: #a89c7c;
              font-size: 14px;
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