<template>
    <div class="admin-base-container">
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
import BoardComponent from '@/components/adminComponents/AdminBoard.vue';
import TaskProgressCircle from '@/components/adminComponents/AdminTaskProgress.vue';
import TaskBasic from '@/components/adminComponents/AdminTaskStatus.vue';

const sectionList = ref([
    {
        title: '최근 공지사항',
        component: BoardComponent,
        props: {
            tableType: 'notice'
        },
        pagenation: false
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
.bottom-container {
    display: flex;
    gap: 20px;
    height: calc((100% - 20px) / 2);
}

.admin-base-container > .section-container {
    height: calc((100% - 20px) / 2);
}

.bottom-container > .section-container {
    width: 50%;
    height: 100%;
}
</style>