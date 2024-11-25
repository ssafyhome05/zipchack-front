<template>
  <div
    class="modal fade"
    id="user-info-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-6" id="exampleModalLabel">회원 정보</h1>
          <button
            type="button"
            class="btn-close"
            @click="closeUserInfoModal"
          ></button>
        </div>
        <div class="modal-body">
          <Form id="regist-form" @submit="registUser">
            <div class="id-box input-box">
              <Field
                type="text"
                class="id input"
                id="user-id"
                name="userId"
                v-model="userId"
                readonly
                required
              />
              <label for="user-id">Id</label>
            </div>

            <transition name="fade-slide">
              <div v-if="isEditing" class="pw-box input-box">
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
                <p v-show="userPwError" class="pw-error">{{ userPwError }}</p>
              </div>
            </transition>

            <transition name="fade-slide">
              <div v-if="isEditing" class="pwcomfirm-box input-box">
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
                <p v-show="userPasswordConfirmError" class="pwcomfirm-error">
                  {{ userPasswordConfirmError }}
                </p>
              </div>
            </transition>

            <div class="name-box input-box">
              <Field
                type="text"
                class="name input"
                id="user-name"
                name="userName"
                v-model="userName"
                :readonly="!isEditing"
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
                readonly
                required
              />
              <label for="user-email">Email</label>
              <span></span>
              <p v-show="userEmailError" class="email-error">
                {{ userEmailError }}
              </p>
            </div>


            <div class="tel-box input-box">
              <Field
                type="tel"
                class="tel input"
                id="user-tel"
                name="userPhone"
                v-model="userPhone"
                :readonly="!isEditing"
                required
              />
              <label for="user-tel">전화번호</label>
              <span></span>
              <p v-show="userPhoneError" class="tel-error">
                {{ userPhoneError }}
              </p>
            </div>

            <div v-if="isEditing" class="post-code-box">
              <Field
                type="text"
                class="post-code-input"
                id="user-post-code"
                name="userZipcode"
                v-model="userZipcode"
                placeholder="우편번호"
                required
                readonly
              />

              <a id="postcode" class="post-code-btn" @click="openPostcode"
                >검색</a
              >
              <p v-show="userZipcodeError" class="post-code-error">
                {{ userZipcodeError }}
              </p>
            </div>
            <div class="main-addr-box input-box">
              <Field
                type="text"
                v-model="userAddress"
                name="userAddress"
                id="user-main-address"
                class="main-address input"
                placeholder="주소"
                readonly
                required
              />
              <label for="user-main-address">주소</label>
              <span></span>
              <p v-show="userAddressError" class="road-address-error">
                {{ userAddressError }}
              </p>
            </div>
            <div class="detail-addr-box input-box">
              <Field
                type="text"
                class="detail-address input"
                id="user-detail-address"
                name="userAddress2"
                v-model="userAddress2"
                :readonly="!isEditing"
                required
              />
              <label for="user-detail-address">상세주소</label>
              <span></span>
            </div>
          </Form>

          <!-- 수정/삭제 버튼 (조회 모드에서만 표시) -->
          <div class="action-buttons">
            <div v-if="!isEditing" class="view-mode-buttons">
              <button
                class="go-regist mt-1 update-button"
                @click="startEdit"
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
                회원정보 수정하기
              </button>
              <button
                class="go-regist mt-1 update-button"
                @click="updatePassword(3)"
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

            <div v-if="isEditing" class="edit-mode-buttons">
              <button
                class="go-regist mt-1 save-button"
                type="submit"
                form="regist-form"
                @click="updateUserInfo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-check-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"
                  />
                </svg>
                수정완료
              </button>
              <button class="go-regist mt-1 cancel-button" @click="cancelEdit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                  />
                </svg>
                취소하기
              </button>
            </div>

            <button
              class="go-regist mt-1 delete-button"
              @click="deleteUserInfo"
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
              회원탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfoModalComponentScript from "@/assets/js/PlatformViewsScript/HomeViewScripts/NavigationComponentScripts/UserInfoModalComponentScript.js";
export default UserInfoModalComponentScript;
</script>

<style scoped>
@import "@/assets/css/PlatformViewsStyle/HomeViewStyles/NavigationComponentStyles/UserInfoModalComponentStyle.css";
</style>
