<template>
    <div class="dashboard-container">
        <SectionContainer :item="sectionList[0]" />
        <div class="bottom-container">
            <SectionContainer :item="sectionList[1]" />
            <SectionContainer :item="sectionList[2]" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionContainer from '@/components/adminComponents/SectionContainer.vue';
import BoardTable from '@/components/adminComponents/BoardTable.vue';
import TaskProgressCircle from '@/components/adminComponents/TaskProgressCircle.vue';
import TaskBasic from '@/components/adminComponents/TaskBasic.vue';

const sectionList = ref([
    {
        title: '공지사항',
        component: BoardTable
    },
    {
        title: '매물 거래내역 갱신',
        component: TaskProgressCircle
    },
    {
        title: '지역 별 통계 정보 갱신',
        component: TaskBasic
    }
])

</script>

<style scoped>
.dashboard-container {
    padding: 20px;
    background-color: #f5f5f5;
    height: calc(100vh - 84px);
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.bottom-container {
    display: flex;
    gap: 20px;
    height: calc((100% - 20px) / 2); /* 상단 컨테이너와 동일한 높이 */
}

/* 상단 테이블 컨테이너 */
.dashboard-container > .section-container {
    height: calc((100% - 20px) / 2);
}

/* 하단 테이블 컨테이너들 */
.bottom-container > .section-container {
    width: 50%;
    height: 100%;
}
</style>