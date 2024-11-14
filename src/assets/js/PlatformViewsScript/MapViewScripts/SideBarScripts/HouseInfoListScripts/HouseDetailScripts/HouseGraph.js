import { ref, onMounted, nextTick, watch } from 'vue';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { useHouseDetailStore } from '@/stores/houseDetailStore';
import axios from 'axios';  // axios 임포트
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, LineController } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, LineController);

export default {
    name: 'HouseGraph',
    components: {
        Bar
    },
    setup() {
        const houseDetailStore = useHouseDetailStore();
        const houseSeq = ref("");
        const chartData = ref({
            labels: [],
            datasets: []
        });
        const chartOptions = ref({});
        const dealCnt = ref([]);
        const avgAreaAmount = ref([]);
        const dataLoaded = ref(false);

        const updateChartData = () => {
            chartData.value = {
                labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                datasets: [
                    {
                        label: '2024년 월별 평당 거래가',
                        type: 'line',
                        fill: false,
                        borderColor: '#007bff',
                        borderWidth: 1,
                        tension: 0.4,
                        data: avgAreaAmount.value,
                        yAxisID: 'y1'  // 오른쪽 y축
                    },
                    {
                        label: '2024년 월별 거래량',
                        data: dealCnt.value,
                        backgroundColor: [
                            'rgba(255, 179, 186, 0.8)', 
                            'rgba(255, 204, 153, 0.8)', 
                            'rgba(204, 255, 204, 0.8)', 
                            'rgba(204, 204, 255, 0.8)', 
                            'rgba(255, 204, 255, 0.8)', 
                            'rgba(204, 255, 255, 0.8)', 
                            'rgba(255, 230, 153, 0.8)', 
                            'rgba(255, 223, 186, 0.8)', 
                            'rgba(224, 204, 255, 0.8)', 
                            'rgba(178, 255, 204, 0.8)', 
                            'rgba(255, 210, 210, 0.8)', 
                            'rgba(240, 240, 240, 0.8)', 
                        ],
                        borderColor: [
                            'rgba(255, 179, 186, 1)', 
                            'rgba(255, 204, 153, 1)', 
                            'rgba(204, 255, 204, 1)', 
                            'rgba(204, 204, 255, 1)', 
                            'rgba(255, 204, 255, 1)', 
                            'rgba(204, 255, 255, 1)', 
                            'rgba(255, 230, 153, 1)', 
                            'rgba(255, 223, 186, 1)', 
                            'rgba(224, 204, 255, 1)', 
                            'rgba(178, 255, 204, 1)', 
                            'rgba(255, 210, 210, 1)', 
                            'rgba(240, 240, 240, 1)', 
                        ],                    
                        borderWidth: 1,
                        yAxisID: 'y'  // 왼쪽 y축
                    },
                ]
            };
        };

        const loadGraphData = async (houseSeq) => {
            const response = await axios.get(`${SERVER_URL}/api/house/detail/status`, {
                params: {
                    "houseSeq": houseSeq,
                    "year": 2020,
                }
            });
            dealCnt.value = response.data.map(item => item.dealCnt);
            avgAreaAmount.value = response.data.map(item => item.avgAreaPrice);
            updateChartData();
        };

        watch(() => houseDetailStore.houseDetail, (newVal) => {
            const houseSeq = newVal.aptSeq;
            loadGraphData(houseSeq);
        }, { deep: true });

        onMounted(async () => {
            setChartOptions();
            const houseSeq = houseDetailStore.getHouseDetail.aptSeq;
            await loadGraphData(houseSeq);
            dataLoaded.value = true;
        });

        const setChartOptions = () => {
            chartOptions.value = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: '거래 횟수',
                            font: {
                                size: 12,
                                weight: 'bold',
                                color: '#CCCCCC',
                            }
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: '평당 평균 거래가 (단위; 만 원)',
                            font: {
                                size: 12,
                                weight: 'bold',
                                color: '#CCCCCC',
                            }
                        },
                        grid: {
                            drawOnChartArea: false  // 오른쪽 축의 그리드 선을 제거
                        }
                    }
                }
            };
        };

        return {
            chartData,
            chartOptions,
            dataLoaded,
            key: dataLoaded.value // key 속성을 dataLoaded에 의존하게 설정
        };
    }
};
