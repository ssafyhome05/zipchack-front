<template>
  <div>
    <div class="card">
      <h3>인구 현황</h3>
      <slot>
        <div v-if="!bookmarkLocationList.length" class="empty-location">
          <p>즐겨찾기된 지역이 없습니다.</p>
        </div>
        <div v-else class="population-graph">
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
        label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()}`
      }
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        callback: function(value) {
          return value.toLocaleString() + ' 명'; 
        }
      }
    },
  },
};

const processData = (locations) => {
  const labels = [];
  const generationsData = {
    under_20: [],
    "20_30": [],
    "40_60": [],
    over_70: [],
  };

  locations.forEach((bookmark) => {
    labels.push(bookmark.location.gugunName);

    bookmark.population.generations.forEach(({ generation, population }) => {
      if (generationsData[generation]) {
        generationsData[generation].push(population);
      }
    });
  });

  const datasets = [
    {
      label: "20대 이하",
      data: generationsData.under_20,
      backgroundColor: "#FFB3B3",
    },
    {
      label: "20~30대",
      data: generationsData["20_30"],
      backgroundColor: "#FFEB99",
    },
    {
      label: "40~60대",
      data: generationsData["40_60"],
      backgroundColor: "#B3E6B3",
    },
    {
      label: "70대 이상",
      data: generationsData.over_70,
      backgroundColor: "#99CCFF",
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
  margin: 5px 0;
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

.population-graph{
  width: 100%; 
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-location p{
  font-weight: bold;
  font-size: 17px;
}
</style>