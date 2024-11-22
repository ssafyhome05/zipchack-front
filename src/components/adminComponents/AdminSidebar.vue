<template>
    <aside class="admin-sidebar">
      <header>
        <img src="@/assets/imgs/ssafyhome_logo.png" alt="Zip-Chack Logo" class="logo">
        <span class="header-text">Zip-Chack</span> 관리자페이지
      </header>
      <div class="admin-info">
        <table>
          <tbody>
            <tr class="info-row">
                <td class="label">관리자</td>
                <td class="divider">:</td>
                <td class="value"><b>`ADMIN_{{ adminUserStore.user.seq }}``</b>님</td>
            </tr>
            <tr class="info-row">
                <td class="label">권한</td>
                <td class="divider">:</td>
                <td class="value">{{ adminUserStore.getUser.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="nav-header">
        사이트 관리
      </div>
      <nav>
        <router-link to="/admin/dashboard" class="nav-item"><img src="@/assets/imgs/admin/dashboard-icon.png" alt="대시보드" class="nav-item-img">대시보드</router-link>
        <router-link to="/admin/user_manage" class="nav-item"><img src="@/assets/imgs/admin/user-manage-icon.png" alt="사용자 관리" class="nav-item-img">사용자 관리</router-link>
        <router-link to="/admin/notice_manage" class="nav-item" active-class="" :class="{ 'router-link-active': isNoticeRoute }">
            <img src="@/assets/imgs/admin/notice-icon.png" alt="공지사항" class="nav-item-img">공지사항
        </router-link>
      </nav>
    </aside>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserInfoStore } from '@/stores/userInfoStore';

const route = useRoute();
const adminUserStore = useUserInfoStore();

const isNoticeRoute = computed(() => {
    return route.path.includes('/admin/notice');
});

onMounted(() => {
  adminUserStore.getUserInfo;
  console.log(adminUserStore);

})
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 20vw;
  height: 100vh;
  background-color: #353535;
  color: #fff;
  z-index: 3 !important;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.admin-sidebar * {
  z-index: 3 !important;
}

header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 20px;
}

.header-text {
  font-size: 1.8rem;
}

.logo {
  height: 30px;  /* 로고 크기 조정 */
  width: auto;
  object-fit: contain;
}

.admin-info {
    padding: 15px 25px;  /* 상하 15px, 좌우 25px 패딩 */
    font-size: 1.2rem;   /* 글씨 크기 증가 */
    border-top: 0.3px solid #fff;
    border-bottom: 0.3px solid #fff;
}

.admin-info table {
    width: 100%;
    border-spacing: 0;
    
    padding: 10px 0;
}

.info-row td {
    padding: 8px 0;  /* 행간 간격 증가 */
}

.label {
    color: #ccc;
    width: 80px;    /* 레이블 영역 너비 증가 */
}

.divider {
    color: #ccc;
    width: 20px;
    text-align: center;
}

.value {
    color: #fff;
    padding-left: 15px;  /* 값 영역 왼쪽 패딩 증가 */
}

.nav-header{
  font-size: 1.5rem;
  padding: 20px 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  padding: 30px 20px;
  font-size: 1.3rem;
  text-align: center;
  transition: background-color 0.3s ease;
}

/* 호버 효과 */
.nav-item:hover {
  background-color: #4d4d4d;
  cursor: pointer;
}

/* 활성화된 라우터 링크는 호버 효과와 다르게 */
.router-link-active {
  background-color: #0D6BFF;
}

.nav-item-img {
  width: 1.3rem;  /* 글씨 크기와 동일하게 설정 */
  height: 1.3rem;
  margin-right: 10px;  /* 아이콘과 텍스트 사이 간격 */
  object-fit: contain;  /* 이미지 비율 유지 */
}
</style>