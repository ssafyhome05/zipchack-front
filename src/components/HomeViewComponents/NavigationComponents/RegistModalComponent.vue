<template>
    <div
    class="modal fade"
    id="regist-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static" 
    data-bs-keyboard="false"
    >

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="exampleModalLabel">Regist</h1>
          <button
            type="button"
            class="btn-close"
            @click="closeRegistModal"
          >
          <!-- data-bs-dismiss="modal"
            aria-label="Close" -->
            
            </button>
        </div>
        <div class="modal-body regist-modal-body">
            <Form id="regist-form" @submit="registUser">
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
                    <span></span>
                    <a class="id-verify-btn" @click="idDuplicateCheck">중복</a>
                    <p v-show="userIdError" class="id-error">{{ userIdError }}</p>
                </div>

                <div class="pw-box input-box">
                    <Field 
                        type="password" 
                        class="password input" 
                        id="user-password"
                        name="userPassword"
                        v-model="userPassword"
                        required
                    />
                    <label for="user-password">Password</label>    
                    <span></span>
                    <p  v-show="userPasswordError"  class="pw-error">{{ userPasswordError }}</p>
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
                    <p v-show="userNameError" class="name-error">{{ userNameError }}</p>
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
                    <a class="email-verify-btn" @click="sendVerifyEmail">전송</a>
                    <p v-show="userEmailError" class="email-error">{{ userEmailError }}</p>
                </div>

                <!-- <div class="verify-email-code code-input-box">
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
                    <a class="email-code-check-btn" >인증</a>
                    <p v-show="emailCodeError" class="email-code-error">{{ emailCodeError }}</p>
                </div> -->

                <div class="tel-box input-box">
                    <Field 
                        type="tel" 
                        class="tel input" 
                        id="user-tel"
                        name="userPhone"
                        v-model="userPhone"
                        required
                    />
                    <label for="user-tel">전화번호 (ex. 010-1234-5678)</label>
                    <span></span>
                    <p v-show="userPhoneError" class="tel-error">{{ userPhoneError }}</p>
                </div>
                
                <div class="post-code-box ">
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
                    <span></span>
                    <a id="postcode" class="post-code-btn" @click="openPostcode">검색</a>
                    <p v-show="userZipcodeError" class="post-code-error">{{ userZipcodeError }}</p>
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
                    <label for="user-main-address">&nbsp;</label>
                    <span></span>
                    <p v-show="userAddressError" class="road-address-error">{{ userAddressError }}</p>
                </div>
                <div class="detail-addr-box input-box">
                    <Field 
                        type="text" 
                        class="detail-address input" 
                        id="user-detail-address"
                        name="userAddress2"
                        v-model="userAddress2"
                        required
                    />
                    <label for="user-detail-address">상세주소</label>
                    <span></span>
                </div>
                <input type="submit" value="Submit" />
            </Form>
          <!-- <form id="regist-form" @submit.prevent="registerUser">
                
                
                
                
                
                
                
                
                
          </form> -->
          
        </div>
        <div class="modal-footer">

          <button type="button" class="btn btn-primary"  @click="goLoginModal">Login</button>
          <button type="button" class="btn btn-primary" @click="registerUser">SignUp</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import RegistModalComponentScript from '@/assets/js/PlatformViewsScript/HomeViewScripts/NavigationComponentScripts/RegistModalComponentScript.js';
import { Field } from 'vee-validate';
export default RegistModalComponentScript;
</script>

<style scoped>
@import '@/assets/css/PlatformViewsStyle/HomeViewStyles/NavigationComponentStyles/RegistModalComponentStyle.css';
</style>