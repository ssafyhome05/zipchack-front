<template>
  <div class="menu">
    <nav class="clearfix">
      <ul class="clearfix">
        <li>
          <a href="#">
            <img :src="logo" class="logo" />
          </a>
        </li>
        <li><a @click="openNoticeModal">Notice</a></li>
        <li><a @click="">About</a></li>
      </ul>
    </nav>

    <div class="auth-box">
      <div v-if="!user">
        <button
          type="button"
          class="btn btn-primary"
          @click="openLoginModal"
          id="login-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
            />
          </svg>

          Login
        </button>
      </div>

      <div v-else>
        <button
          type="button"
          id="user-info-button"
          class="btn btn-primary"
          @click="openUserInfoModal"
        >
          <i class="bi bi-person-fill"></i>
          {{ user.userEmail }} 님
        </button>
        <button class="logout-button" @click="logout">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>

  <LoginModalComponent />
  <RegistModalComponent />
  <NoticeModal />
  <UserInfoModal />
</template>

<script>
import NavigationComponentScript from "@/assets/js/PlatformViewsScript/HomeViewScripts/NavgationComponentScript.js";
export default NavigationComponentScript;
</script>

<style>
@import "@/assets/css/PlatformViewsStyle/HomeViewStyles/NavigationComponentStyle.css";
</style>
