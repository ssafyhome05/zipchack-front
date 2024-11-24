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
import { useTopTenStore } from '@/stores/topTenStore';

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
/* 기본 아이템 스타일 */
.topten-item {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0px 3px 3px rgba(160, 160, 160, 0.42);
  transform: perspective(800px) rotateX(5deg);
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.topten-item:hover {
  transform: perspective(800px) rotateX(0deg) translateY(-5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

/* 아이템 내부 요소 스타일 */
.topten-item-rank {
  width: 30px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topten-item-dongname {
  flex: 1;
  text-align: left;
  padding-left: 5px;
  font-size: 15px;
  font-weight: bold;
}

.topten-item-changed {
  min-width: 50px;
  text-align: right;
  padding-right: 10px;
  margin-left: auto;
}

/* 순위별 스타일 */
.rank-1 {
  font-size: 1.5rem;
  background: linear-gradient(to bottom, #FFD700, #FFA500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.rank-2 {
  font-size: 1.4rem;
  background: linear-gradient(to bottom, #E8E8E8, #C0C0C0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.rank-3 {
  font-size: 1.3rem;
  background: linear-gradient(to bottom, #CD7F32, #8B4513);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

/* 순위별 배경색 */
.topten-item:has(.rank-1) {
  background-color: rgba(255, 249, 230, 0.9);
}

.topten-item:has(.rank-2) {
  background-color: rgba(245, 245, 245, 0.9);
}

.topten-item:has(.rank-3) {
  background-color: rgba(255, 241, 230, 0.9);
}

.topten-item:has(.rank-1):hover {
  background-color: rgba(255, 245, 214, 0.95);
}

.topten-item:has(.rank-2):hover {
  background-color: rgba(235, 235, 235, 0.95);
}

.topten-item:has(.rank-3):hover {
  background-color: rgba(255, 233, 214, 0.95);
}

/* 변화 상태 스타일 */
.changed {
  background-color: rgba(255, 255, 255, 0.1);
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

.new-label {
  color: #FFD700;
  font-weight: bold;
}

/* 애니메이션 */
.fade-animation {
  animation: fade 1.5s ease-in-out forwards;
}

@keyframes fade {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

/* 트랜지션 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style> 