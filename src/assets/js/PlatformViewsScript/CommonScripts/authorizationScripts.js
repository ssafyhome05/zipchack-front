import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/userInfoStore';

export default function AuthorizationScripts() {
  const route = useRoute()
  const router = useRouter()
  const token = ref(null)
  
  // OAuth2 로 리다이렉트 되어 들어왔을 때 토큰을 받아오는 스크립트
  // 쿼리스트링을 통해서 토큰을 받아오도록 했고 uri에 쿼리 남아있으면 그러니까 바로 갱신
  watch(() => route.query, (newQuery) => {
    token.value = newQuery.token
    if (token.value) {
      useUserInfoStore().setUser(`Bearer ${token.value}`)
      router.replace({ path: route.path })
    }
  }, { immediate: true })
}