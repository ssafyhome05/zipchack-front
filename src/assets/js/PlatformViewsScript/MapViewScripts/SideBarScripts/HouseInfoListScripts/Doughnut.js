import { useHouseListStore } from '@/stores/houseListStore';
import { ref, onMounted, watch, nextTick } from 'vue';
import { Doughnut } from 'vue-chartjs';
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    plugins,
  } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

export default{
    components: {
        Doughnut
    },
    setup() {
        // Reactive chart data using ref
        const houseListStore = useHouseListStore();
        const dongName = ref(houseListStore.dongName);
        const gugunName = ref(houseListStore.gugunName);
        const dongCode = ref(houseListStore.dongCode);
        const chartData = ref({
            labels: [],
            datasets: []
        });
        const chartOptions = ref({});
        const populationRatio = ref([]);
        const dataLoaded = ref(false);
          
        watch(() => houseListStore.gugunName, (newVal) => {
            gugunName.value = newVal;
            setChartOptions();
            console.log("name", gugunName.value)
        }, {deep: true});

        watch(() => houseListStore.dongCode, (newVal) => {
            dongCode.value = newVal;
            loadDoughnutGraphData(dongCode.value);
            setChartOptions();
        }, {deep: true});

        onMounted(async () => {
            const dongCode = houseListStore.dongCode;
            gugunName.value = houseListStore.gugunName;
            await loadDoughnutGraphData(dongCode);
            setChartOptions();
            console.log("mount", gugunName.value)
            dataLoaded.value = true;
        });

        const loadDoughnutGraphData = async (dongCode) => {
            await houseListStore.setDongPopInfo(dongCode);
            const data = houseListStore.dongPopInfo.generations;
            populationRatio.value = data.map(item => item.ratio)
            updateChartData();
        };

        const updateChartData = () => {
            chartData.value = {
                labels: ['~20대', '20 ~ 30대', '40 ~ 60대', '70대 ~'],
                datasets: [
                    {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    data: populationRatio.value,
                    datalabels: {
                        display: true, // datalabels 표시 유무
                        align: "center", // labels 위치
                        color: '#fff',
                        font: { 
                            weight: 'bold',
                            size: 12 
                        },
                        // value는 default(%값)
                        formatter: function (value) {
                        return `${value}%`;
                        },
                    }
                    },
                ],
            };

        }
        const setChartOptions = () => {
            chartOptions.value = {
                responsive: true,
                maintainAspectRatio: false,
                // cutout: '80%', // 도넛의 두께 조절
                plugins: {
                    ChartDataLabels,
                  legend: {
                    display: true,
                    position: 'top',
                    align: 'center',
                  },
                },
              };

        }

        return {
            chartData,
            chartOptions,
            dataLoaded,
            gugunName
        }
    },
}