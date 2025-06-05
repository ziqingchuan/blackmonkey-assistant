<template>
  <GlobalLoading :is-loading="isWaiting" />
  <CustomAlert ref="customAlert" />
  <EditWukongDataForm
      v-model:visible="isEditing"
      :editing-data="editingDB"
      @confirm="handleUpdate"
  />
  <!-- 数据库主内容 -->
  <div class="DB-information">
    <!-- 数据表格展示区 -->
    <div class="data-table-container">
      <div class="table-header">
        <div class="header-item" style="width: 55%">文本内容</div>
        <div class="header-item sortable" style="width: 15%">
          数据类别
          <div class="sort-icon" @click="sortBy('category')">
            <UpDownArrow />
          </div>
        </div>
        <div class="header-item sortable" style="width: 15%">
          数据来源
          <div class="sort-icon" @click="sortBy('source')">
            <UpDownArrow />
          </div>
        </div>
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
        <span class="page-info">第
                <input
                    type="number"
                    v-model="currentPage"
                    min="1"
                    :max="totalPages"
                    class="page-input"
                    @keyup.enter="goToPage"
                />
                页 / 共 {{ totalPages }} 页</span>
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
</template>

<script setup lang="ts">
import UpDownArrow from "../../assets/icons/UpDownArrow.vue";
import {computed, ref, watch, defineProps, toRefs} from "vue";
import {customAlert, showAlert} from "../../utils/GlobalFunction.ts";
import CustomAlert from "../Dialog/CustomAlert.vue";
import GlobalLoading from "../Dialog/GlobalLoading.vue";
import type {WukongDBInfo} from "../../apis/database.ts";
import {deleteWukongData, updateWukongData} from '../../apis/database.ts';
import EditWukongDataForm from "../Form/EditWukongDataForm.vue";

const pageInput = ref(1); // 页码输入框的值
const sortField = ref<string | null>(null); // 当前排序字段
const sortDirection = ref<'asc' | 'desc'>(); // 排序方向
const editingDB = ref<WukongDBInfo>(); // 用于存储正在编辑修改的数据
const isEditing = ref(false); // 记录编辑弹窗是否显示
const itemsPerPage = 10;
const isWaiting = ref(false); // 记录加载状态
const currentPage = ref(1);
const props = defineProps<{
  currentDB: WukongDBInfo[];
}>()
const { currentDB } = toRefs(props)
const emit = defineEmits(['confirmDelete']);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return currentDB.value?.slice(start, end) || [];
});

const totalPages = computed(() => {
  return Math.ceil((currentDB.value?.length || 0) / itemsPerPage);
});

// 监听当前页码变化，更新输入框值
watch(currentPage, (newVal) => {
  pageInput.value = newVal;
});


// 跳转到指定页码
const goToPage = () => {
  const pageNum = Number(pageInput.value);
  if (pageNum >= 1 && pageNum <= totalPages.value) {
    currentPage.value = pageNum;
  } else {
    showAlert(`请输入1到${totalPages.value}之间的页码`, 0);
  }
};

// 排序函数
const sortBy = (field: string) => {
  // 如果点击的是同一个字段
  if (sortField.value === field) {
    // 切换排序方向: asc -> desc -> null (恢复原始顺序)
    if (sortDirection.value === 'asc') {
      sortDirection.value = 'desc';
    } else if (sortDirection.value === 'desc') {
      sortDirection.value = 'asc';
    }
  } else {
    // 点击新字段，默认升序
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  // 应用排序
  applySort();
};

// 应用排序
const applySort = () => {
  if (!currentDB.value || !sortField.value || !sortDirection.value) return;

  currentDB.value.sort((a, b) => {
    const aValue = a[sortField.value as keyof WukongDBInfo] || '';
    const bValue = b[sortField.value as keyof WukongDBInfo] || '';
    return sortDirection.value === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
  });
  // 重置当前页
  currentPage.value = 1;
};

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
    window.location.reload();
    showAlert('修改数据成功!', 0);
  } catch (error) {
    console.error('修改失败:', error);
    showAlert('数据修改失败，请稍后再试', 0);
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
    emit('confirmDelete', true);
    showAlert('删除数据成功!', 0);
  } catch (error) {
    console.error('删除失败:', error);
    showAlert('删除失败，请稍后再试', 0);
  } finally {
    isWaiting.value = false;
  }
};

</script>


<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=STKaiti&display=swap');
/* 全局样式 */
input, button {
  font-family: 'STKaiti', cursive;
}

.DB-information {
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
        .sort-icon {
          cursor: pointer;
          border: none;
          width: 18px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .table-body {
      max-height: calc(100% - 100px);
      overflow-y: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */
      &::-webkit-scrollbar {
        display: none; /* Chrome/Safari/Opera */
      }

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
        .page-input {
          width: 30px;
          padding: 5px;
          text-align: center;
          background: rgba(40, 40, 45, 0.8);
          border: 1px solid #c0aa6a33;
          border-radius: 4px;
          color: #e7cc80;

          &::-webkit-inner-spin-button,
          &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>