<template>
    <div class="board-container">
        <BoardTable 
            :tableType="tableType" 
            :pageSize="pageSize"
            :isPaginated="isPaginated"
            :currentPage="currentPage"
            class="table-section"
        />
        <TableFooter
            v-if="isPaginated"
            :tableType="tableType"
            :totalItems="totalItems"
            :currentPage="currentPage"
            :pageSize="pageSize"
            @update:pageSize="handlePageSizeChange"
            @update:currentPage="handlePageChange"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BoardTable from './BoardTable.vue';
import TableFooter from './TableFooter.vue';
import { useNoticeManageStore } from '@/stores/noticeManageStore';
import { useUserManageStore } from '@/stores/userManageStore';

const noticeStore = useNoticeManageStore();
const userStore = useUserManageStore();

const totalItems = computed(() => {
    if (props.tableType === 'notice') {
        return noticeStore.getTotal;
    } else {
        return userStore.getTotal;
    }
});

const props = defineProps({
    tableType: {
        type: String,
        required: true,
        validator: (value) => ['notice', 'user'].includes(value)
    },
    isPaginated: Boolean
});

const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    console.log(currentPage.value);
};

const handlePageSizeChange = (newPageSize) => {
    pageSize.value = newPageSize;
    console.log(pageSize.value);
};

const pageSize = ref(5);
const currentPage = ref(1);
</script>

<style scoped>
.board-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.table-section {
    flex: 1;
    min-height: 0;
    overflow: hidden;
}
</style>