<template>
    <tr class="board-item">
        <td>{{ item.id }}</td>
        <td class="title">{{ item.title }}</td>
        <td>{{ item.author }}</td>
        <td>{{ item.createdAt }}</td>
        <td>{{ item.expiryDate }}</td>
    </tr>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
        default: () => ({
            id: '',
            title: '',
            author: '',
            createdAt: '',
            expiryDate: ''
        })
    }
});
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
</style>