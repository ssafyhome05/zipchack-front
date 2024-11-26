<template>
  <div
    class="modal fade"
    id="change-password-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-6" id="exampleModalLabel">비밀번호 변경</h1>
          <button
            type="button"
            class="btn-close"
            @click="closeChangePasswordModal"
          ></button>
        </div>
        <div class="modal-body mb-5 mt-5">
            <Form id="regist-form">
                <div class="pw-box input-box">
                    <Field 
                        type="password" 
                        class="password input" 
                        id="user-password"
                        name="userPw"
                        v-model="userPw"
                        required
                    />
                    <label for="user-password">Password</label>    
                    <span></span>
                    <p  v-show="userPwError"  class="pw-error">{{ userPwError }}</p>
                </div>

                <div class="pwcomfirm-box input-box">
                    <Field 
                        type="password" 
                        class="conform-password input" 
                        id="user-password-confirm"
                        name="userPasswordConfirm"
                        v-model="userPasswordConfirm"
                        required
                    />
                    <label for="user-password-confirm">Comfirm password</label>
                    <span></span>
                    <p v-show="userPasswordConfirmError" class="pwcomfirm-error">{{ userPasswordConfirmError }}</p>
                </div>
            </Form>
          <!-- </form> -->
          <button class="go-regist mt-1" @click="goLoginModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
            비밀번호 변경하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChangePasswordModalComponentScript from '@/assets/js/PlatformViewsScript/HomeViewScripts/NavigationComponentScripts/ChangePasswordModalComponentScript.js';
export default ChangePasswordModalComponentScript;
</script>

<style scoped>
@import '@/assets/css/PlatformViewsStyle/HomeViewStyles/NavigationComponentStyles/ChangePasswordModalComponentStyle.css';
</style>
