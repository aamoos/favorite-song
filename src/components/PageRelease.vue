<!-- src/components/PageRelease.vue -->
<template>
  <div class="container mx-auto py-4 mb-16 max-h-screen">
    <h1 class="text-3xl font-semibold text-gray-800 dark:text-white mb-4 text-left">출시일검색</h1>
    <SearchComponent :search="search" @searchSong="searchSong" />
    <ListComponent :songs="songs" @favoriteSong="favoriteSong" @searchYoutube="searchYoutube" />
  </div>
</template>

<script setup>
import { reactive, inject, ref } from 'vue';
import SearchComponent from '@/components/SearchComponent.vue';
import ListComponent from '@/components/ListComponent.vue';
import { favoriteSong, searchYoutube } from '@/utils/songUtils.js';

const axios = inject('$axios');
const store = inject('store');

const currentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

const search = reactive({
  brand: 'kumyoung',
  searchType: 'title',
  searchVal: '',
  searchDate: currentDate(),
  limit: 50,
  offset: 0,
  searchDateShow: true,
});

const songs = reactive([]);
const loading = ref(false);

//검색버튼
const searchSong = async () => {

  if (loading.value) return; // 이미 데이터를 불러오고 있는 경우 중복 호출 방지
  loading.value = true; // 데이터를 불러오는 중이라고 플래그 설정

  // if (search.searchVal.trim() == ""){
  //   alert("검색어를 입력해주세요");
  //   return false;
  // }
  try {
    const response = await axios.post('/api/searchSong', {
          brand: search.brand
        , searchType: search.searchType
        , searchVal: search.searchVal
        , searchDate: search.searchDate.replaceAll('-', '')
        , limit: search.limit
        , offset: search.offset
        , userId: store.getters.getUser.sub
        , urlTarget: 'release'
    });
    console.log(response)
    songs.splice(0, songs.length, ...response.data.body.data);
  } catch (error) {
    console.error('Error occurred while saving:', error);
  } finally {
    loading.value = false; // 데이터 로딩 완료 후 플래그 해제
  }
};

// 추가로 불러올 데이터가 있는지 확인하고, 있다면 검색 함수 호출
const checkAndLoadMoreData = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const documentHeight = document.documentElement.offsetHeight;
  if (scrollPosition >= documentHeight) {
    console.log("스크롤맨밑");
    // 변경된 부분: 오프셋을 증가시키고 검색 함수 호출
    search.limit += 10;
    searchSong();
  }
};

// 페이지 로드 시 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', checkAndLoadMoreData);



</script>
