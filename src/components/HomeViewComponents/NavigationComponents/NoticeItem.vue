<template>
    <tr @click="toggleDetails">
        <td scope="row" class="notice-num">{{ notice.noticeSeq }}</td>
        <td class="notice-title">
            {{ notice.noticeTitle }}
            <span v-if="notice.modifiedAt">(수정: {{ formatDate(notice.modifiedAt) }})</span>
        </td>
        <td class="notice-createdAt">{{ formatDate(notice.createdAt) }}</td>
    </tr>
    <Transition name="display"  mode="out-in" >
        <tr v-show="isVisible">
            <td class="notice-content-title">내용</td>
            <td colspan="3">
                <div class="notice-content">
                    {{ notice.noticeContent }}
                </div>
            </td>
        </tr>
    </Transition>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const emit = defineEmits(['toggle']);
const props = defineProps({
    notice: {
        type: Object,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true
    },
});

const isDetailsVisible = ref(false); // 현재 행의 상세 내용 펼침 여부

// 날짜 형식 변환 함수
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

// 클릭 시 상세 내용 토글
const toggleDetails = () => {
    isDetailsVisible.value = !isDetailsVisible.value;
    const notice = props.notice;
    emit('toggle', { noticeSeq: props.notice.noticeSeq });
};
</script>

<style scoped>
td {
    vertical-align: middle;
    height: 10.5vh;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
}

.notice-num, .notice-createdAt {
    text-align: center;
}

.notice-content-title{
    text-align: center;
    font-size: 16px;
    /* font-weight: normal; */
}

.notice-content{
    font-weight: normal;
    font-size: 16px;
}

tr td[colspan="4"] {
    font-size: 16px;
    padding: 30px 9%;
    min-height: 20vh;
    max-height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

.display-enter-active{
    transition: all 0.3s ease-in-out;
    transform: translateY(0px);
}
.display-leave-active {
  /* transition: all 0.3s ease-in-out;
  transform: translateY(0px); */
}

.display-enter-from{
    opacity: 0;
    transform: translateY(-10px);
}
.display-leave-to {
  /* opacity: 0;
  transform: translateY(-30px); */
}
</style>
