<template>
    <div>
    <div class="card">
      <h3>사업체 현황</h3>
      <slot>
        <div v-if="!bookmarkLocationList.length" class="empty-location">
          <p>즐겨찾기된 지역이 없습니다.</p>
        </div>
        <div class="corp-graph">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </slot>
    </div>
</div>
</template>

<script setup>
import { ref, watch, computed  } from 'vue';
import { useLocationInfoStore } from '@/stores/LocationInfo';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const locationInfoStore = useLocationInfoStore();

const locationInfo = ref([]);
const bookmarkLocationList = ref([]);
// const selectedLocation = ref(null);

watch(
  () => locationInfoStore.locationInfo,
  (newVal) => {
    locationInfo.value = newVal;
    console.log(locationInfo.value)
  },
  { deep: true, immediate: true }
);

watch(
  () => locationInfoStore.bookmarkLocationList,
  (newVal) => {
    bookmarkLocationList.value = newVal.length ? newVal : locationInfo.value;
  },
  { deep: true, immediate: true }
);

const chartData = computed(() => {
  return processData(bookmarkLocationList.value);
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()} 개`
      }
    }
  },
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
      ticks: {
        callback: function(value) {
          return value.toLocaleString() + ' 개';
        }
      }
    },
  },
};


const processData = (locations) => {
  const labels = [];
  const corpData = [];

  locations.forEach((location) => {
    const matchedLocation = locationInfo.value.find(item => item.dongCode.slice(0, 5) === location.dongCode.slice(0, 5));

    if (matchedLocation) {

      labels.push(location.gugunName);

      corpData.push(matchedLocation.corpCnt || 0);
    }
  });

  const datasets = [
    {
      label: '사업체 수',
      data: corpData,
      backgroundColor: '#F6B7B1',
    },
  ];

  return { labels, datasets };
};

</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card h3 {
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
}

.empty-location{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  border: 1px solid #66666646;
  border-radius: 3px;
}

.corp-graph{
  width: 100%; 
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-location p{
  font-weight: bold;
  font-size: 17px;
}
</style>