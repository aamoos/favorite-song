<template>
    <div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';

const router = inject('router');
const store = inject('store');
const jwtDecode = inject('jwtDecode');

onMounted(() => {
    const token = router.currentRoute.value.query.token
    const refreshToken = router.currentRoute.value.query.refreshToken

    if (token) {
        store.commit('setToken', token);
        store.commit('setUser', jwtDecode.decode(token));

        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        router.push("/search");
    } else {
        window.alert('로그인에 실패하였습니다.')
        router.push("/");
    }
});
</script>

<style scoped></style>