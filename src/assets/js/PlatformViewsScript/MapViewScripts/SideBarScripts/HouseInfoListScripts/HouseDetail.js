import { KAKAO_API_KEY } from '@/assets/resources/configs/config.js';
import { useHouseDetailStore } from '@/stores/houseDetailStore.js';
import { ref, onMounted, watch, onUpdated } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: {
        Bar
    },
    setup() {
        const houseDetailStore = useHouseDetailStore();
        const houseDetail = ref(null);
        const address = ref(null);
        const chartData = ref(null);
        const chartOptions = ref(null);

        onMounted(() => {
            houseDetail.value = houseDetailStore.getHouseDetail;
            address.value = houseDetailStore.getAddress;
        });

        watch(() => houseDetailStore.houseDetail, (newVal) => {
            houseDetail.value = newVal;
            address.value = houseDetailStore.getAddress;
        }, { deep: true});


        const addRoadviewToInfowindow = () => {
            const roadviewContainer = document.getElementById("load-view-container");
            const roadview = new window.kakao.maps.Roadview(roadviewContainer);
            const roadviewClient = new window.kakao.maps.RoadviewClient();

            // 로드뷰 위치 설정
            const position = new window.kakao.maps.LatLng(37.57436026492034, 126.96884987829033);
            roadviewClient.getNearestPanoId(position, 50, (panoId) => {
                if (panoId) {
                    roadview.setPanoId(panoId, position);
                }
            });
        };
        chartData.value = {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],  // 연도별 레이블
            datasets: [
                {
                    label: '2024년 월별 거래량',
                    data: [100, 35, 50, 60, 55, 70, 80, 90, 100, 110, 120, 130], // 연도별 데이터
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',   // 빨강
                        'rgba(54, 162, 235, 0.6)',   // 파랑
                        'rgba(255, 206, 86, 0.6)',   // 노랑
                        'rgba(75, 192, 192, 0.6)',   // 초록
                        'rgba(153, 102, 255, 0.6)',  // 보라
                        'rgba(255, 99, 132, 0.6)',   // 빨강
                        'rgba(54, 162, 235, 0.6)',   // 파랑
                        'rgba(255, 206, 86, 0.6)',   // 노랑
                        'rgba(75, 192, 192, 0.6)',   // 초록
                        'rgba(153, 102, 255, 0.6)',  // 보라
                        'rgba(255, 99, 132, 0.6)',   // 빨강
                        'rgba(54, 162, 235, 0.6)',   // 파랑
                        'rgba(255, 206, 86, 0.6)',   // 노랑
                        'rgba(75, 192, 192, 0.6)',   // 초록
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        };
        chartOptions.value = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    type: 'category',  // X축을 카테고리로 설정
                    title: {
                        display: true,
                        text: '단위: 만원',
                        align: 'end',
                        font: {
                            size: 12,
                            weight: 'bold',
                            color: '#CCCCCC',
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '금액 (만원)',
                        font: {
                            size: 12,
                            weight: 'bold',
                            color: '#CCCCCC',
                        }
                    }
                }
            }
        }
        return {
            houseDetail,
            address,
            chartData,
            chartOptions,
        };
    },
};
