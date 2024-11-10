<template>
    <div
    class="modal fade"
    id="login-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static" 
    data-bs-keyboard="false"
    >

    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-6" id="exampleModalLabel">Login</h1>
          <button
            type="button"
            class="btn-close"
            @click="closeLoginModal"
          >
            </button>
        </div>
        <div class="modal-body mb-5 mt-5">

            <form id="login-form" @submit.prevent="login">
              <!-- id -->
              <div class="id-box login-input-box">
                    <input type="text" name="username" class="id login-input" />
                    <label>Id</label>
                    <span></span>
              </div>
              <!-- password -->
              <div class="pw-box login-input-box">
                    <input type="password" name="password" class="pw login-input" />
                    <label>Password</label>
                    <span></span>
              </div>

              <div v-if="!isAuthorized" class="login-error">
                아이디 및 비밀번호를 확인해주세요.
              </div>

              <!-- login button -->
              <input type="submit" class="login button" value="LOGIN" /> 
              <!-- <button @click="login" class="login button">LOGIN</button> -->

              <!-- kakao login -->
              <a id="kakao-login" class="button">
                  <img src="@/assets/resources/images/kakaologin.png">
              </a>

              <!-- google login -->
              <a id="google-login" class="button">
                  <!-- <img :src="google"> -->
                  <!-- <img src="../assets/images/google_logo.svg"> -->
                  <img src="@/assets/resources/images/google_logo.svg">
                  <span>SIGN IN WITH GOOGLE</span>
              </a>

              <!-- naver login -->
              <a id="naver-login" class="button">
                  <img src="@/assets/resources/images/naver_logo.png">
                  <span>네이버 로그인</span>
              </a>
            </form>
          <!-- </form> -->
          <button class="go-regist mt-1" @click="openRegistModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
            </svg>
            Regist
          </button>
          <br/>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginModalComponentScript from '@/assets/js/PlatformViewsScript/HomeViewScripts/NavigationComponentScripts/LoginModalComponentScript.js';
export default LoginModalComponentScript;
</script>

<style scoped>
@import '@/assets/css/PlatformViewsStyle/HomeViewStyles/NavigationComponentStyles/LoginModalComponentStyle.css';
</style>