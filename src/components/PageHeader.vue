<template>
  <header v-if="showHeader" class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-white text-1xl font-bold">Favorite Song</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="javascript:void(0)" @click="release" class="text-white">출시일검색</a></li>
          <li><a href="javascript:void(0)" @click="search" class="text-white">노래찾기</a></li>
          <li><a href="javascript:void(0)" @click="favorite" class="text-white">즐겨찾기</a></li>
          <li><a href="javascript:void(0)" @click="logout" class="text-white">로그아웃</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { inject, computed } from 'vue';
const router = inject('router');
const store = inject('store');

const showHeader = computed(() => {
  return !['/', '/join', '/passwordFind'].includes(router.currentRoute.value.path);
});

const release = () => {
  router.push("/release");
};

const search = () => {
  router.push("/search");
};

const favorite = () => {
  router.push("/favorite");
};

const logout = () => {
  store.dispatch("logout");

  const access_token = localStorage.getItem('accessToken');
  if (access_token == null) {
    // 로그아웃 성공 시 페이지 이동
    router.push("/");
  }
};

</script>
