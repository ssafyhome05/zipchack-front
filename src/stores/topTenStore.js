import { defineStore } from 'pinia'
import axios from 'axios'
import { SERVER_URL } from '@/assets/resources/configs/config'

const defaultListData = [
  {rank: 1, dongName: '-', changed: -1, dongcode: 'DEFAULT'},
  {rank: 2, dongName: '-', changed: 2, dongcode: 'DEFAULT'},
  {rank: 3, dongName: '-', changed: 3, dongcode: 'DEFAULT'},
  {rank: 4, dongName: '-', changed: -3, dongcode: 'DEFAULT'},
  {rank: 5, dongName: '-', changed: 5, dongcode: 'DEFAULT'},
  {rank: 6, dongName: '-', changed: 0, dongcode: 'DEFAULT'},
  {rank: 7, dongName: '-', changed: 7, dongcode: 'DEFAULT'},
  {rank: 8, dongName: '-', changed: 8, dongcode: 'DEFAULT'},
  {rank: 9, dongName: '-', changed: 9, dongcode: 'DEFAULT'},
  {rank: 10, dongName: '-', changed: 99, dongcode: 'DEFAULT'}
]

export const useTopTenStore = defineStore('topTen', {
  state: () => ({
    listData: [],
    loadData: [],
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

    async getLoadDataBy5minutes() {
      setInterval(async () => {
        const now = new Date()
        const minutes = now.getMinutes()
        if (minutes % 5 === 1) {
          try {
            const response = await axios.get(`${SERVER_URL}/api/house/topten`)
            this.loadData = response.data
          } catch (error) {
            this.loadData = Array(10).fill(null)
          }
        }
      }, 30000)
    },

    async getListData() {
      try {
        // const response = await axios.get(`${SERVER_URL}/api/house/topten`)
        // this.listData = response.data
        const response = await axios.get(`${SERVER_URL}/api/house/topten`)
        this.listData = response.data
      } catch (error) {
        this.listData = [...defaultListData]
      }
    },

    changeData(rank) {
      console.log(this.loadData)
      if (this.loadData[rank -1]) {
        this.listData[rank -1] = this.loadData[rank - 1]
        this.loadData[rank -1] = null
      }
      if (!this.isExpanded && rank === 3 && this.loadData == Array(10).fill(null)) {
        this.listData.splice(3, this.listData.length - 3, ...this.loadData.slice(3));
        this.loadData = Array(10).fill(null);
      }
    }
  }
}) 