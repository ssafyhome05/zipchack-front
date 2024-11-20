<template>
    <div class="required-login-message">
        로그인 후 이용가능합니다.
    </div>
    <div class="do-kakao-login">
        <a id="simple-kakao-login" class="button" :href="`${serverUrl}/oauth2/authorization/kakao`">
            <img src="@/assets/resources/images/kakao_icon.png">
            <span>카카오톡으로 3초만에 로그인</span>
        </a>
    </div>
</template>

<script setup>
import { SERVER_URL } from '@/assets/resources/configs/config';

const serverUrl = SERVER_URL;
</script>
<style scoped>
.required-login-message{
    font-size: 17px;
    font-weight: bold;
}

.do-kakao-login{
    margin-top: 20px;
    width: 75%;
}
</style>