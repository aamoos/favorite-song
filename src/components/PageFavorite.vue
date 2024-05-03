<!-- src/components/PostList.vue -->
<template>
  <div class="container mx-auto py-4 mb-16 max-h-screen">
    <h1 class="text-3xl font-semibold text-gray-800 dark:text-white mb-4 text-left">즐겨찾기</h1>
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
      <input type="text" placeholder="검색어를 입력하세요" v-model="search.searchVal" @keyup.enter="handleEnterKeyPress"
        class="flex-1 mb-2 md:mb-0 md:mr-4 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
      <button @click="searchSong" class="flex-shrink-0 px-4 py-2 rounded-md bg-indigo-500 text-white">검색</button>
    </div>
    <div v-if="songs.length > 0" class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <caption class="py-2 text-start text-sm text-gray-600 dark:text-neutral-500">노래 목록</caption>
              <thead>
                <tr>
                  <th scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">번호
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">가수명
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    제목</th>
                  <th scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    작곡가</th>
                  <th scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    작사가</th>
                  <th scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    출시일</th>
                  <th scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">유튜브
                    링크
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">좋아요
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr v-for="song in songs" :key="song.no">
                  <td
                    class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 text-left">
                    {{ song.no }}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">{{
                    song.singer }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">{{
                    song.title }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">{{
                    song.composer }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">{{
                    song.lyricist }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">{{
                    song.release }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-end text-sm font-medium text-left">
                    <button @click="searchYoutube(song)"
                      class="inline-flex items-center gap-1 px-4 py-2 rounded-md bg-red-500 text-white">유튜브</button>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-end text-sm font-medium text-left">
                    <button @click="favoriteSong(song)"
                      class="flex text-red-500 items-center gap-1 bg-gray-200 dark:bg-neutral-800 px-3 py-1 rounded-lg text-sm dark:text-neutral-300 focus:outline-none hover:bg-gray-300 dark:hover:bg-neutral-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M10 18l-1.45-1.33C3.08 11.68 0 8.36 0 5.5 0 2.42 2.42 0 5.5 0c1.68 0 3.25.87 4.5 2.25C10.25 1.87 11.82 1 13.5 1 16.58 1 19 3.42 19 6.5c0 2.86-3.08 6.18-8.55 11.17L10 18z"
                          clip-rule="evenodd" />
                      </svg>
                      <span>Like</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="mt-4">검색 결과가 없습니다.</p>

  </div>
</template>

<script setup>
import { reactive, inject, ref } from 'vue';

const axios = inject('$axios');
const store = inject('store');

const search = reactive({
  brand: 'kumyoung',
  searchType: 'title',
  searchVal: '',
  limit: 50,
  offset: 0,
});

const songs = reactive([]);
const loading = ref(false);

//검색버튼
const searchSong = async () => {

  if (loading.value) return; // 이미 데이터를 불러오고 있는 경우 중복 호출 방지
  loading.value = true; // 데이터를 불러오는 중이라고 플래그 설정
  
  try {
    const response = await axios.post('/api/searchFavoriteSong', {
          brand: search.brand
        , searchType: search.searchType
        , searchVal: search.searchVal
        , limit: search.limit
        , offset: search.offset
        , userId: store.getters.getUser.sub
    });
    console.log(response)
    songs.splice(0, songs.length, ...response.data);
  } catch (error) {
    console.error('Error occurred while saving:', error);
  }
};

//즐겨찾기
const favoriteSong = async (song) => {
  
  try {
    const response = await axios.post('/api/favoriteSong', {
      brand: search.brand
      , no: song.no
      , singer: song.singer
      , title: song.title
      , userId: store.getters.getUser.sub
    });
    console.log(response)
    alert("즐겨찾기가 삭제되었습니다.")
    searchSong();
  } catch (error) {
    console.error('Error occurred while saving:', error);
  } finally {
    loading.value = false; // 데이터 로딩 완료 후 플래그 해제
  }
}

//유튜브검색
const searchYoutube = (song) => {
  const searchVal = song.singer + " " + song.title;
  const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchVal)}`;
  window.open(youtubeLink, '_blank');
};

//enter이벤트
const handleEnterKeyPress = (event) => {
  if (event.key === 'Enter') {
    searchSong();
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
