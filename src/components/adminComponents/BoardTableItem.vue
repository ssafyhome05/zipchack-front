<template>
    <tr 
        class="board-item"
        :class="{ 'clickable': isNotice }" 
        @click="handleRowClick">
        <td v-for="(column, index) in columns" :key="index">
            <template v-if="column.key === 'function'">
                <button @click="handleFunctionButtonClick" class="function-button">관리</button>
            </template>
            <template v-else-if="column.key === 'userId'">
                <div class="social-container">
                    <div class="icon-wrapper">
                        <img 
                            :src="socialIcons[item.socialType ? item.socialPlatform : 'zipchack']" 
                            alt="SNS 아이콘" 
                            class="social-icon"
                        >
                    </div>
                    <span class="user-id">{{ item.socialType ? item.socialPlatform : item.userId }}</span>
                </div>
            </template>
            <template v-else-if="column.key === 'author'">
                {{ item[column.key] || '관리자' }}
            </template>
            <template v-else-if="isDateColumn(column.key)">
                {{ formatDate(item[column.key]) }}
            </template>
            <template v-else>
                {{ item[column.key] }}
            </template>
        </td>
    </tr>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const socialIcons = {
    'kakao': new URL('@/assets/resources/images/kakao_icon.png', import.meta.url).href,
    'naver': new URL('@/assets/resources/images/naver_logo.png', import.meta.url).href,
    'google': new URL('@/assets/resources/images/google_logo.svg', import.meta.url).href,
    'zipchack': new URL('@/assets/resources/images/zipchack_mainlogo.png', import.meta.url).href
};

const router = useRouter();
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    columns: {
        type: Array,
        required: true
    }
});

const isNotice = computed(() => {
    console.log(props.item);
    return props.item.hasOwnProperty('noticeSeq');  // notice 테이블은 title 속성을 가짐
});

const handleRowClick = () => {
    if (isNotice.value) {
        router.push(`/admin/notice_read/${props.item.noticeSeq}`);
    }
};

const handleFunctionButtonClick = () => {
    console.log('관리 버튼 클릭');
};

// 날짜 포맷팅이 필요한 컬럼들을 정의
const dateColumns = ['createdAt', 'modifiedAt'];

// 날짜 컬럼인지 확인하는 함수
const isDateColumn = (key) => dateColumns.includes(key);

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const yy = date.getFullYear().toString().slice(2); // 년도 뒤 2자리
    const MM = String(date.getMonth() + 1).padStart(2, '0'); // 월
    const dd = String(date.getDate()).padStart(2, '0'); // 일
    const hh = String(date.getHours()).padStart(2, '0'); // 시
    const mm = String(date.getMinutes()).padStart(2, '0'); // 분
    
    return `${yy}-${MM}-${dd} ${hh}:${mm}`;
};
</script>

<style scoped>
.board-item td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #dee2e6;
}

.board-item:hover {
    background-color: #f8f9fa;
    cursor: pointer;
}

.title {
    text-align: left !important;
}

.function-button {
    padding: 6px 12px;
    background-color: #dc3545;
    color: white;
    border: 1px solid #dc3545;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.function-button:hover {
    background-color: #c82333;
    border-color: #bd2130;
}

.clickable {
    cursor: pointer;
}

.clickable:hover {
    background-color: #f8f9fa;
}

.social-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 100%;
    width: 100%;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    vertical-align: middle;
}

.user-id {
    display: inline-flex;
    align-items: center;
}
</style>