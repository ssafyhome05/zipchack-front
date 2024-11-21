<template>
    <aside class="admin-sidebar">
      <header>
        Zip-Chack Admin
      </header>
      <div class="admin-info">
        <div class="admin-info-item">송준형 님</div>
        <div class="admin-info-item">관리자 권한</div>
      </div>
      <div class="nav-header">
        사이트 관리
      </div>
      <nav>
        <router-link to="/admin/dashboard" class="nav-item"><img src="@/assets/imgs/admin/dashboard-icon.png" alt="대시보드" class="nav-item-img">대시보드</router-link>
        <router-link to="/admin/notice_manage" class="nav-item"><img src="@/assets/imgs/admin/user-manage-icon.png" alt="사용자 관리" class="nav-item-img">사용자 관리</router-link>
        <router-link to="/admin/user_manage" class="nav-item"><img src="@/assets/imgs/admin/notice-icon.png" alt="공지사항" class="nav-item-img">공지사항</router-link>
      </nav>
    </aside>
</template>

<script>
export default {

}
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
  z-index: 3;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.admin-sidebar * {
  z-index: 3;
}

header{
  font-size: 2rem;
  font-weight: bold;
  padding: 20px 20px;
}

.admin-info{
  font-size: 1.5rem;
  padding: 20px 20px;
  border-top: 0.3px solid #fff;
  border-bottom: 0.3px solid #fff;
}

.admin-info-item{
  padding: 10px 0;
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