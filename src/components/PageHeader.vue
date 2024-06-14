<template>
  <header v-if="showHeader" class="bg-blue-500 p-4 relative z-10">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <h1 class="text-white text-2xl font-bold">Favorite Song</h1>
      </div>
      <button @click="toggleMenu" class="text-white md:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <nav :class="{ 'hidden': !isMenuOpen, 'block': isMenuOpen }"
        class="md:flex md:items-center md:space-x-4 absolute top-16 left-0 w-full bg-blue-500 md:bg-transparent md:relative md:w-auto md:p-0 p-4 z-20">
        <ul class="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-2">
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
import { ref, computed, inject } from 'vue';

const isMenuOpen = ref(false);

const router = inject('router');
const store = inject('store');

const showHeader = computed(() => {
  return !['/', '/join', '/passwordFind'].includes(router.currentRoute.value.path);
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

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

<style scoped>
/* Add any additional styling if needed */
@media (min-width: 768px) {
  .md:hidden {
    display: none !important;
  }
}
</style>
