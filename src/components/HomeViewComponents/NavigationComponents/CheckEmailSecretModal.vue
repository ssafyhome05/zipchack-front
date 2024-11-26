<template>
    <div
    class="modal fade"
    id="check-email-secret-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static" 
    data-bs-keyboard="false"
    >

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="exampleModalLabel">이메일 인증</h1>
          <button
            type="button"
            class="btn-close"
            @click="closeCheckEmailSecretModal"
          >
          <!-- data-bs-dismiss="modal"
            aria-label="Close" -->
            
          </button>
        </div>
        <div class="modal-body mb-5 mt-5">
            <Form id="regist-form">
                <div class="verify-email-code code-input-box">
                    <Field 
                        type="text" 
                        class="email-code-input" 
                        id="user-email-code"
                        name="emailCode"
                        v-model="emailCode"
                        placeholder="인증코드"
                        required
                    />
                    <span></span>
                    <p class="timer" v-text="TimeStr"></p>
                </div>         
            </Form>
                <button class="go-regist mt-1" @click="goChangePasswordModal">
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
                이메일 인증하기
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckEmailSecretModalComponentScript from '@/assets/js/PlatformViewsScript/HomeViewScripts/NavigationComponentScripts/CheckEmailSecretModalComponentScript.js';
export default CheckEmailSecretModalComponentScript;
</script>

<style scoped>
@import '@/assets/css/PlatformViewsStyle/HomeViewStyles/NavigationComponentStyles/CheckEmailSecretModalComponentStyle.css';
</style>
