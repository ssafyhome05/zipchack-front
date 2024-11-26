<template>
   <div
    class="modal fade"
    id="find-pw-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-6" id="exampleModalLabel">비밀번호 찾기</h1>
          <button
            type="button"
            class="btn-close"
            @click="closeUserInfoModal"
          ></button>
        </div>
        <div class="modal-body mt-5 mb-5">
          <Form id="regist-form">
            <div class="id-box input-box">
              <Field
                type="text"
                class="id input"
                id="user-id"
                name="userId"
                v-model="userId"
                required
              />
              <label for="user-id">Id</label>
            </div>

            <div class="name-box input-box">
              <Field
                type="text"
                class="name input"
                id="user-name"
                name="userName"
                v-model="userName"
                required
              />
              <label for="user-name">Name</label>
              <span></span>
              <p v-show="userNameError" class="name-error">
                {{ userNameError }}
              </p>
            </div>

            <div class="email-box input-box">
              <Field
                type="email"
                class="email input"
                id="user-email"
                name="userEmail"
                v-model="userEmail"
                required
              />
              <label for="user-email">Email</label>
              <span></span>
              <p v-show="userEmailError" class="email-error">
                {{ userEmailError }}
              </p>
            </div>
          </Form>

          <div class="action-buttons">
            <button
              class="go-regist mt-1"
              @click="goCheckEmailSecret"
            >
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
  </div>
</template>

<script>
import FindPasswordModalComponentScript from "@/assets/js/PlatformViewsScript/HomeViewScripts/NavigationComponentScripts/FindPasswordModalComponentScript.js";
export default FindPasswordModalComponentScript;
</script>

<style scoped>
@import "@/assets/css/PlatformViewsStyle/HomeViewStyles/NavigationComponentStyles/FindPasswordModalComponentStyle.css";
</style>