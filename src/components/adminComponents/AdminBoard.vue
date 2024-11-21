<template>
    <div class="board-container">
        <BoardTable 
            :tableType="tableType" 
            :itemsPerPage="itemsPerPage"
            :hasPagination="pagenation"
            class="table-section"
        />
        <TableFooter
            v-if="pagenation"
            :tableType="tableType"
            v-model:itemsPerPage="itemsPerPage"
            v-model:currentPage="currentPage"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BoardTable from './BoardTable.vue';
import TableFooter from './TableFooter.vue';

const props = defineProps({
    tableType: {
        type: String,
        required: true,
        validator: (value) => ['notice', 'user'].includes(value)
    },
    pagenation: Boolean
});

const itemsPerPage = ref(5);
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