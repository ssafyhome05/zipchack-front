import { defineStore } from 'pinia'

const testData1 = [
  {rank: 1, dongName: '강남구', changed: -1, dongcode: 'code1'},
  {rank: 2, dongName: '서초구', changed: 2, dongcode: 'code2'},
  {rank: 3, dongName: '송파구', changed: 3, dongcode: 'code3'},
  {rank: 4, dongName: '마포구', changed: -3, dongcode: 'code4'},
  {rank: 5, dongName: '용산구', changed: 5, dongcode: 'code5'},
  {rank: 6, dongName: '성동구', changed: 0, dongcode: 'code6'},
  {rank: 7, dongName: '영등포구', changed: 7, dongcode: 'code7'},
  {rank: 8, dongName: '강서구', changed: 8, dongcode: 'code8'},
  {rank: 9, dongName: '동작구', changed: 9, dongcode: 'code9'},
  {rank: 10, dongName: '관악구', changed: 99, dongcode: 'code10'}
]

const testData2 = [
  {rank: 1, dongName: '서초구', changed: 1, dongcode: 'code2'},
  {rank: 2, dongName: '송파구', changed: 1, dongcode: 'code3'},
  {rank: 3, dongName: '강남구', changed: -2, dongcode: 'code1'},
  {rank: 4, dongName: '용산구', changed: 1, dongcode: 'code5'},
  {rank: 5, dongName: '마포구', changed: -1, dongcode: 'code4'},
  {rank: 6, dongName: '영등포구', changed: 1, dongcode: 'code7'},
  {rank: 7, dongName: '성동구', changed: -1, dongcode: 'code6'},
  {rank: 8, dongName: '동작구', changed: 1, dongcode: 'code9'},
  {rank: 9, dongName: '강서구', changed: -1, dongcode: 'code8'},
  {rank: 10, dongName: '중구', changed: 99, dongcode: 'code11'}
]

export const useTopTenStore = defineStore('topTen', {
  state: () => ({
    listData: [...testData1],
    loadData: [...testData2],
    isExpanded: false,
    isFirstData: true,
  }),

  getters: {
    displayedItems: (state) => {
      return state.listData.slice(0, state.isExpanded ? 10 : 3)
    }
  },

  actions: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },

    startTestInterval() {
      setInterval(() => {
        this.isFirstData = !this.isFirstData
        this.loadData = this.isFirstData ? [...testData1] : [...testData2]
      }, 60000)
    },

    changeData(rank) {
      console.log(this.loadData)
      if (this.loadData[rank -1]) {
        this.listData[rank -1] = this.loadData[rank - 1]
        this.loadData[rank -1] = null
      }
      if (!this.isExpanded && rank === 3 && this.loadData == Array(10).fill(null)) {
        this.listData.splice(3, this.listData.length - 3, ...this.loadData.slice(3))
        this.loadData = Array(10).fill(null)
      }
    }
  }
}) 