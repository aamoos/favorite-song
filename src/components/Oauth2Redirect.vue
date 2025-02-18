<template>

  <div></div>
</template>

<script setup>
import { inject, onMounted } from 'vue';
const jwtDecode = inject('jwtDecode'); 

const router = inject('router');
const store = inject('store');

onMounted(() => {
  let token = router.currentRoute.value.query.token
  let refreshToken = router.currentRoute.value.query.refreshToken
  
  if(token === undefined){
    token = localStorage.getItem('accessToken');
    refreshToken = localStorage.getItem('refreshToken');
  }

  if (token) {
    store.commit('setToken', token);
    store.commit('setUser', jwtDecode.decode(token));

    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    router.push("/search");
  } else {
    router.push("/");
  }
});


</script>