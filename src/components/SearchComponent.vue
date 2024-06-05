<template>
  <div class=" flex flex-col md:flex-row mb-4">
    <select v-model="search.brand"
      class="mb-2 md:mb-0 md:mr-4 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
      <option value="kumyoung">kumyoung</option>
      <option value="tj">tj</option>
      <option value="dam">dam</option>
      <option value="joysound">joysound</option>
    </select>
    <select v-model="search.searchType"
      class="mb-2 md:mb-0 md:mr-4 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
      <option value="title">제목</option>
      <option value="singer">가수명</option>
      <option value="no">번호</option>
    </select>
    <input v-if="search.searchDateShow" type="month" v-model="search.searchDate"
      class="mb-2 md:mb-0 md:mr-4 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
    <input v-if="search.searchInputShow" @keydown.enter="handleEnterKeyPress" type="text" placeholder="검색어를 입력하세요" v-model="search.searchVal"
      class="flex-1 mb-2 md:mb-0 md:mr-4 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
    <button @click="handleSearch" class="flex-shrink-0 px-4 py-2 rounded-md bg-indigo-500 text-white">검색</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue';

const props = defineProps(['search']);
const emit = defineEmits(['searchSong']);

const search = ref('')
  
onMounted(() => {
  search.value = props.search // vo에 받아온 props 값을 매핑함
})

const handleSearch = () => {
  emit('searchSong');
};

//enter이벤트
const handleEnterKeyPress = (event) => {
  if (event.key === 'Enter') {
    emit('searchSong');
  }
};
</script>