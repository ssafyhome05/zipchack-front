<template>
    <div class="pagination-buttons">
        <button @click="pageGroup -= 1" class="pagination-button" :disabled="pageGroup === 1">이전</button>
        <div class="page-numbers">
            <button 
                v-for="page in displayPages" 
                :key="page"
                class="page-number"
                :class="{ active: currentPage === page }"
                @click="$emit('update:currentPage', page)"
            >
                {{ page }}
            </button>
        </div>
        <button @click="pageGroup += 1" class="pagination-button" :disabled="pageGroup === Math.ceil(totalPages / 5)">다음</button>
    </div>
</template>

<script setup>
import { watch, computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 5
    },
    totalItems: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['update:currentPage']);

const totalPages = computed(() => {
    if (props.tableType === 'notice') {
        return Math.ceil(props.totalItems / props.pageSize);
    } else {
        return Math.ceil(props.totalItems / props.pageSize);
    }
});
const pageGroup = Math.ceil(props.currentPage / 5);
const displayPages = computed(() => {
    const startPage = (pageGroup - 1) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages.value);
    return [...Array(endPage - startPage + 1).keys()].map(num => num + startPage);
});

const handleItemsPerPageChange = () => {
    emit('update:currentPage', Number(props.pageSize));
};

// props 변경 시 로컬 상태 업데이트
watch(() => props.pageSize, () => {
    console.log(props.currentPage, totalPages.value);
    if (props.currentPage > totalPages.value) {
        emit('update:currentPage', totalPages.value);
    }
});
</script>

<style scoped>
.pagination-buttons {
    display: flex;
    align-items: center;
    gap: 20px;
}

.pagination-button {
    padding: 8px 20px;
    border: 1px solid #0D6BFF;
    border-radius: 6px;
    background-color: #0D6BFF;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.pagination-button:hover:not(:disabled) {
    background-color: white;
    color: #0D6BFF;
}

.pagination-button:disabled {
    background-color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
}

.page-numbers {
    display: flex;
    gap: 15px;
    min-width: 200px;
    justify-content: center;
}

.page-number {
    padding: 8px 12px;
    border: none;
    background-color: transparent;
    color: #666;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.page-number:hover {
    color: #0D6BFF;
}

.page-number.active {
    color: #0D6BFF;
}
</style>