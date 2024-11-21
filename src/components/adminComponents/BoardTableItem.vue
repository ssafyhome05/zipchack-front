<template>
    <tr 
        class="board-item"
        :class="{ 'clickable': isNotice }" 
        @click="handleRowClick">
        <td v-for="(column, index) in columns" :key="index">
            <template v-if="column.key === 'function'">
                <button class="function-button">관리</button>
            </template>
            <template v-else-if="column.key === 'isSNS'">
                {{ item[column.key] ? 'SNS' : '일반' }}
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
    return props.item.hasOwnProperty('title');  // notice 테이블은 title 속성을 가짐
});

const handleRowClick = () => {
    if (isNotice.value) {
        router.push(`/admin/notice_read/${props.item.id}`);
    }
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
</style>