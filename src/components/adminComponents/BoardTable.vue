<template>
    <div class="table-container">
        <div class="table-wrapper">
            <table class="board-table">
                <thead>
                    <tr>
                        <th v-for="(column, index) in columns" 
                            :key="index" 
                            :style="{ width: column.width }">
                            {{ column.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <BoardTableItem 
                        v-for="item in displayItems" 
                        :key="item.id"
                        :item="item"
                        :columns="columns"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import BoardTableItem from './BoardTableItem.vue';
import { computed, watch, onMounted } from 'vue';
import { useUserManageStore } from '@/stores/userManageStore';
import { useNoticeManageStore } from '@/stores/noticeManageStore';

const userManageStore = useUserManageStore();
const noticeManageStore = useNoticeManageStore();

const props = defineProps({
    tableType: {
        type: String,
        required: true,
        validator: (value) => ['notice', 'user'].includes(value)
    },
    pageSize: {
        type: Number,
        default: 5
    },
    isPaginated: {
        type: Boolean,
        default: false
    },
    currentPage: {
        type: Number,
        default: 1
    }
});

// 컬럼 설정
const columns = computed(() => {
    if (props.tableType === 'notice') {
        return [
            { key: 'noticeSeq', title: '번호', width: '10%' },
            { key: 'noticeTitle', title: '제목', width: '40%' },
            { key: 'author', title: '글쓴이', width: '15%' },
            { key: 'createdAt', title: '등록일', width: '17.5%' },
            { key: 'modifiedAt', title: '수정일', width: '17.5%' }
        ];
    } else {
        return [
            { key: 'userSeq', title: '번호', width: '10%' },
            { key: 'userName', title: '이름', width: '18%' },
            { key: 'userId', title: '아이디/SNS분류', width: '18%' },
            { key: 'userEmail', title: '이메일', width: '25%' },
            { key: 'createdAt', title: '가입일자', width: '11%' },
            { key: 'function', title: '기능', width: '18%' }
        ];
    }
});

// 데이터를 저장할 ref 추가
const displayItems = computed(() => {
  if (props.tableType === 'notice') {
    return noticeManageStore.getNoticeData;
  } else {
    return userManageStore.getUserData;
  }
});

// watch 수정
watch(
  [() => props.currentPage, () => props.pageSize],
  async ([newPage, newPageSize], [oldPage, oldPageSize]) => {  // 이전 값과 새로운 값을 받아옴
    try {
      if (props.tableType === 'notice') {
        await noticeManageStore.axiosGetNoticeData(newPage, newPageSize);
      } else {
        await userManageStore.axiosGetUserData(newPage, newPageSize);
      }
    } catch (error) {
      console.error('데이터 로딩 중 오류 발생:', error);
    }
  },
  {
    immediate: true,  // 컴포넌트 마운트 시 즉시 실행
    deep: true       // 깊은 감시
  }
);

// displayItems의 실제 개수를 기반으로 행 높이를 계산하기 위한 computed 속성 추가
const rowCount = computed(() => displayItems.value.length);

// 테이블 높이 계산을 위한 computed 속성 수정
const tableHeight = computed(() => {
    if (props.isPagination) {
        return 'calc(100vh - 320px)'; // 상단 여백(20px) + 하단 여백(20px) + 헤더(84px) + 푸터(156px)
    }
    return '100%';
});

const rowHeight = computed(() => {
    const headerHeight = 47; // th의 높이(padding 12px * 2 + border 1px + 기본 높이)
    return `calc((${tableHeight.value} - ${headerHeight}px) / ${rowCount.value})`;
});
</script>

<style scoped>
.table-container {
    height: v-bind('tableHeight');
    display: flex;
    flex-direction: column;
}

.table-wrapper {
    flex: 1;
    overflow-y: auto;
    border-top: 2px solid #dee2e6;
}

.board-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    height: 100%;
}

.board-table th {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
    padding: 12px;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #dee2e6;
    z-index: 1;
}

.board-table th:nth-child(1) { width: 10%; }  /* 번호 */
.board-table th:nth-child(2) { width: 40%; }  /* 제목 */
.board-table th:nth-child(3) { width: 15%; }  /* 글쓴이 */
.board-table th:nth-child(4) { width: 17.5%; }  /* 등록일 */
.board-table th:nth-child(5) { width: 17.5%; }  /* 만료일 */

.board-table tbody tr {
    height: v-bind('rowHeight');
}

.board-table td {
    padding: 12px;
    vertical-align: middle;
    border-bottom: 1px solid #dee2e6;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding-right: 10px;
}

.register-button {
    padding: 8px 20px;
    border: 1px solid #0D6BFF;
    border-radius: 6px;
    background-color: #0D6BFF;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.register-button:hover {
    background-color: white;
    color: #0D6BFF;
}

.social-icon {
    width: 20px;  /* 원하는 크기로 조정 */
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
}

</style>