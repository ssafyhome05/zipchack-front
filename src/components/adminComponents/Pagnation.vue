<template>
    <div class="pagination-buttons">
        <button class="pagination-button" :disabled="currentPage === 1">이전</button>
        <div class="page-numbers">
            <button 
                v-for="page in displayPages" 
                :key="page"
                class="page-number"
                :class="{ active: currentPage === page }"
            >
                {{ page }}
            </button>
        </div>
        <button class="pagination-button" :disabled="currentPage === totalPages">다음</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Number,
        default: 5
    }
});

const emit = defineEmits(['update:modelValue']);

const selectedItemsPerPage = ref(props.modelValue);
const currentPage = ref(1);
const totalPages = ref(5);
const displayPages = [1, 2, 3, 4, 5];

const handleItemsPerPageChange = () => {
    emit('update:modelValue', Number(selectedItemsPerPage.value));
};

// props 변경 시 로컬 상태 업데이트
watch(() => props.modelValue, (newValue) => {
    selectedItemsPerPage.value = newValue;
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