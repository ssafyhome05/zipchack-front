<template>
  <div class="table-footer">
    <div class="items-per-page">
      <select v-model="selectedPageSize" @change="handlePageSizeChange">
        <option v-for="n in [5, 10, 15, 20]" :key="n" :value="n">
          {{ n }}개씩 보기
        </option>
      </select>
    </div>
    <div class="pagination-wrapper">
      <PaginationComponent
        :current-page="currentPage"
        :page-size="selectedPageSize"
        :total-items="totalItems"
        @update:currentPage="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PaginationComponent from '@/components/adminComponents/Pagnation.vue';

const props = defineProps({
  tableType: {
    type: String,
    required: true,
  },
  totalItems: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['update:pageSize', 'update:currentPage']);

const router = useRouter();
const selectedPageSize = ref(5);

const handlePageSizeChange = () => {
  emit('update:pageSize', selectedPageSize.value);
};

const handlePageChange = (newPage) => {
  emit('update:currentPage', newPage);
};

const goToNoticeWrite = () => {
  router.push('/admin/notice_write');
};
</script>

<style scoped>
.table-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #dee2e6;
}

.items-per-page {
  justify-self: start;
}

.pagination-wrapper {
  justify-self: center;
}

.right-section {
  justify-self: end;
}

.items-per-page select {
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: white;
}

.items-per-page select:focus {
  outline: none;
  border-color: #0D6BFF;
}

.register-button {
  padding: 10px 20px;
  background-color: #0D6BFF;
  color: white;
  border: 1px solid #0D6BFF;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.register-button:hover {
  background-color: white;
  color: #0D6BFF;
}
</style> 