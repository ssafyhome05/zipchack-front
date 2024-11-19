<template>
  <div 
    class="topten-item" 
    :class="{ 
      'fade-animation': shouldRotate,
      'changed': item.changed !== 0 
    }"
    @animationstart="handleAnimationStart"
    @animationend="handleAnimationEnd"
  >
    <div class="topten-item-rank" :class="`rank-${item.rank}`">
      {{ item.rank }}
    </div>
    <div class="topten-item-dongname">{{ item.dongName }}</div>
    <div class="topten-item-changed">
      <template v-if="item.changed === 99">
        <span class="new-label">NEW</span>
      </template>
      <template v-else>
        <span :class="getChangeClass">
          {{ getChangeIcon }}
          {{ item.changed !== 0 ? Math.abs(item.changed) : '' }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import { useTopTenStore } from '/stores/topTenStore';

let currentRotatingRank = 1;

export default {
  name: 'ToptenItem',
  props: {
    item: Object,
    showAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      shouldRotate: false,
      store: null
    }
  },
  created() {
    this.store = useTopTenStore();
    this.checkRotation();
  },
  computed: {
    getChangeIcon() {
      if (this.item.changed > 0) return '▲'
      if (this.item.changed < 0) return '▼'
      return '-'
    },
    getChangeClass() {
      if (this.item.changed > 0) return 'increase'
      if (this.item.changed < 0) return 'decrease'
      return 'no-change'
    }
  },
  methods: {
    checkRotation() {
      const check = () => {
        const maxRank = this.showAll ? 10 : 3;
        
        // 현재 아이템이 회전 대상인지 확인
        this.shouldRotate = this.item.rank === currentRotatingRank;
        
        // 더보기 상태가 아닐 때 maxRank 이상은 회전하지 않음
        if (!this.showAll && this.item.rank > maxRank) {
          this.shouldRotate = false;
        }
      };

      // 초기 체크
      check();
      
      // 100ms 간격으로 상태 체크
      const intervalId = setInterval(check, 100);
      
      // cleanup function을 beforeUnmount에서 처리
      return () => {
        clearInterval(intervalId);
      };
    },
    handleAnimationStart() {
      this.store.changeData(this.item.rank);
    },
    handleAnimationEnd() {
      const maxRank = this.showAll ? 10 : 3;    
      currentRotatingRank = currentRotatingRank >= maxRank ? 1 : currentRotatingRank + 1;
    },
  },
  watch: {
    showAll() {
      currentRotatingRank = 1;
    }
  }
}
</script>

<style scoped>
.topten-item {
  display: flex;
  gap: 10px;
  padding: 8px 15px;
  align-items: center;
  margin-bottom: 2px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.changed {
  background-color: rgba(255, 255, 255, 0.1);
}

.fade-animation {
  animation: fade 1.5s ease-in-out forwards;
}

@keyframes fade {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.topten-item-rank {
  width: 30px;
}

.topten-item-dongname {
  flex: 1;
  text-align: left;
  padding-left: 5px;
}

.topten-item-changed {
  min-width: 50px;
  text-align: right;
  padding-right: 10px;
  margin-left: auto;
}

.new-label {
  color: #FFD700;
  font-weight: bold;
}

.increase {
  color: #ff0000;
}
.decrease {
  color: #0000ff;
}
.no-change {
  color: #808080;
}

/* 1,2,3등 특별 배경색 */
.topten-item:has(.rank-1) {
  background-color: rgba(255, 249, 230, 0.9);
}

.topten-item:has(.rank-2) {
  background-color: rgba(245, 245, 245, 0.9);
}

.topten-item:has(.rank-3) {
  background-color: rgba(255, 241, 230, 0.9);
}

/* hover 효과도 약간 더 진하게 */
.topten-item:has(.rank-1):hover {
  background-color: rgba(255, 245, 214, 0.95);
}

.topten-item:has(.rank-2):hover {
  background-color: rgba(235, 235, 235, 0.95);
}

.topten-item:has(.rank-3):hover {
  background-color: rgba(255, 233, 214, 0.95);
}
</style> 