<template>
    <table class="board-table">
        <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>등록일</th>
                <th>만료일</th>
            </tr>
        </thead>
        <tbody>
            <BoardTableItem 
                v-for="item in dummyData" 
                :key="item.id"
                :item="item"
            />
        </tbody>
    </table>
</template>

<script setup>
import BoardTableItem from './BoardTableItem.vue';
import { ref } from 'vue';

const dummyData = ref([
    {
        id: 1,
        title: '2024년 1분기 서비스 점검 안내',
        author: '관리자',
        createdAt: '2024-03-15',
        expiryDate: '2024-04-15'
    },
    {
        id: 2,
        title: '개인정보 처리방침 개정 안내',
        author: '시스템관리자',
        createdAt: '2024-03-10',
        expiryDate: '2024-05-10'
    },
    {
        id: 3,
        title: '신규 기능 업데이트 안내',
        author: '관리자',
        createdAt: '2024-03-05',
        expiryDate: '2024-04-05'
    },
    {
        id: 4,
        title: '서비스 이용약관 변경 안내',
        author: '시스템관리자',
        createdAt: '2024-03-01',
        expiryDate: '2024-04-01'
    },
    {
        id: 5,
        title: '임시 서버 점검 안내',
        author: '관리자',
        createdAt: '2024-02-28',
        expiryDate: '2024-03-28'
    },
    {
        id: 6,
        title: '2024년 설 연휴 고객센터 운영 안내',
        author: '고객지원팀',
        createdAt: '2024-02-25',
        expiryDate: '2024-03-25'
    },
    {
        id: 7,
        title: '앱 버전 업데이트 안내 (v2.0.0)',
        author: '시스템관리자',
        createdAt: '2024-02-20',
        expiryDate: '2024-03-20'
    }
]);

// props 정의는 유지
const props = defineProps({
    items: {
        type: Array,
        required: true,
        default: () => []
    }
});
</script>

<style scoped>
.board-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.board-table th {
    background-color: #f8f9fa;
    padding: 12px;
    text-align: center;
    font-weight: bold;
    border-top: 2px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}

.board-table th:nth-child(1) { width: 10%; }  /* 번호 */
.board-table th:nth-child(2) { width: 40%; }  /* 제목 */
.board-table th:nth-child(3) { width: 15%; }  /* 글쓴이 */
.board-table th:nth-child(4) { width: 17.5%; }  /* 등록일 */
.board-table th:nth-child(5) { width: 17.5%; }  /* 만료일 */
</style>