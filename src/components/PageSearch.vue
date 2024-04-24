<!-- src/components/PostList.vue -->
<template>
  <div class="container mx-auto py-4">
    <div class="flex mb-4">
      <select
        class="px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
        <option value="ky">금영노래방</option>
        <option value="tj">TJ미디어</option>
      </select>
      <input type="text" placeholder="검색어를 입력하세요"
        class="flex-1 ml-2 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
      <button @click="search" class="ml-2 bg-indigo-500 text-white px-4 py-2 rounded-md">검색</button>
    </div>
    <ul class="mt-4">
      <li class="border-b py-2">
        <h2 class="text-lg font-semibold"></h2>
        <p class="text-gray-600"></p>
      </li>
    </ul>
    <p class="mt-4">검색 결과가 없습니다.</p>
  </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';

const store = inject('store');

const search = () => {

};

onMounted(() => {
  console.log(store);
  // console.log(store.state.auth.user);
});

</script>
