<template>
    <div v-if="user">{{ user.userName }}</div>
    <div v-else class="none-user">
       <RequiredLogin />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { reissueAccessToken, test } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';
import axios from 'axios';

const userInfoStore = useUserInfoStore();
const user = ref(null);

onMounted(() => {
    if(userInfoStore.user){
        user.value = userInfoStore.user.data;
        getBookmarkList(userInfoStore.access_token);
    }else{
        user.value = null;
    }
});

const getBookmarkList = async (access_token) => {
    // console.log(access_token)
    await axios.get(`${SERVER_URL}/api/bookmark/house`, 
        {
            headers: {
                "Authorization": `${access_token}`,
            }
        }).then(async (res) => {
            if(res.data.code === 401012){
                console.log("재발급하셈");
                await test();
            }else{
                console.log("됨?")
            }
        }).catch(err => {
            console.log(error);
        });
};

</script>
<style scoped>
.none-user{
    width: 425px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>