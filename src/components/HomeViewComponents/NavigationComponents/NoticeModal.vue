<template>
    <div class="modal fade" id="notice-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">공지사항</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="notice-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" class="th-num">번호</th>
                  <th scope="col" class="th-title">제목</th>
                  <th scope="col" class="th-createdAt">등록일</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <NoticeItem
                    v-for="(notice, index) in noticeData"
                    :key="notice.noticeSeq"
                    :notice="notice"
                    :is-visible="visibleNoticeSeq === notice.noticeSeq"
                     @toggle="handleToggle"
                />
              </tbody>
            </table>
  
            <div class="pagination-container">
                <button 
                    class="btn btn-primary" 
                    :disabled="currentPage === 1" 
                    @click="changePage(currentPage - 1)">
                    이전
                </button>
                <button 
                    v-for="page in totalPages" 
                    :key="page" 
                    class="btn"
                    :class="{ 'btn-primary': page === currentPage, 'btn-outline-primary': page !== currentPage }"
                    @click="changePage(page)">
                    {{ page }}
                </button>
                <button 
                    class="btn btn-primary" 
                    :disabled="currentPage === totalPages" 
                    @click="changePage(currentPage + 1)">
                    다음 
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useNoticeManageStore } from '@/stores/noticeManageStore';

const store = useNoticeManageStore();
const currentPage = ref(1);
const itemsPerPage = 5;
const noticeData = ref(null);

const paginatedNotices = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return store.noticeData.slice(start, end);
});
  
const totalPages = computed(() => Math.ceil(store.total / itemsPerPage));
  
const changePage = (page) => {
    currentPage.value = page;
    store.axiosGetNoticeData(page, itemsPerPage);
    noticeData.value = store.noticeData;
};


watch(() => store.noticeData, (newData) => {
    noticeData.value = newData; 
},{ immediate: true });

onMounted(() => {
    store.axiosGetNoticeData(currentPage.value, itemsPerPage);
    noticeData.value = store.noticeData;
});

const visibleNoticeSeq = ref(null);

// 클릭 시 상세 내용 보이도록 설정
const handleToggle = ({ noticeSeq }) => {
    // 클릭한 공지사항을 펼치고, 다른 공지사항은 닫기
    visibleNoticeSeq.value = visibleNoticeSeq.value === noticeSeq ? null : noticeSeq;
};
</script>

<style scoped>
.modal-dialog {
    max-width: 80vw;
    max-height: 80vh;
}

.modal-content {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}

.modal-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title{
    width: 100%;
    text-align: center;
    line-height: 1;
}

.notice-body {
    padding: 35px 50px;
    width: 100%;
    overflow-y: auto;
}

.notice-body::-webkit-scrollbar {
  width: 0.5vw;
}

.notice-body::-webkit-scrollbar-thumb {
  background-color: #cacaca;
  border-radius: 10px;
}

.th-num{
    width: 8%;
    font-size: 17px;
    text-align: center;
}

.th-title{
    padding-left: 2%;
    font-size: 17px;
    width: 75%;
}

.th-createdAt{
    width: 15%;
    font-size: 17px;
    text-align: center;
}

.pagination-container {
    /* position: absolute;
    left: 42%;
    bottom: 4%; */
    position: relative;
    /* left: 42%; */
    top: 3.2%;
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 5px;
    margin-top: 5px;
}

.pagination-container button {
    padding: 5px 15px;
}
</style>
