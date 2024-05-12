<!-- src/components/ListComponent.vue -->
<template>
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
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">
                    {{song.singer }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">
                    {{song.title }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">
                    {{song.composer }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">
                    {{song.lyricist }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-left">
                    {{song.release }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-end text-sm font-medium text-left">
                    <button @click="searchYoutube(song)"
                      class="inline-flex items-center gap-1 px-4 py-2 rounded-md bg-red-500 text-white">유튜브</button>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-end text-sm font-medium text-left">
                    <button @click="favoriteSong(song)" :class="{
                        'text-red-500': song.liked, // Change to your preferred color class when liked
                        'text-gray-700': !song.liked // Default color class
                      }"
                      class="flex items-center gap-1 bg-gray-200 dark:bg-neutral-800 px-3 py-1 rounded-lg text-sm dark:text-neutral-300 focus:outline-none hover:bg-gray-300 dark:hover:bg-neutral-700">
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
</template>

<script setup>
    import { defineProps, defineEmits, onMounted, ref, inject } from 'vue';

    const props = defineProps(['songs']);
    const emit = defineEmits(['searchYoutube', 'favoriteSong']);

    const songs = ref([]);

    const axios = inject('$axios');
    const store = inject('store');
    const router = inject('router');
    
    onMounted(() => {
        songs.value = props.songs // vo에 받아온 props 값을 매핑함
    })

    const searchYoutube = (song) => {
        emit('searchYoutube', song);
    };

    const favoriteSong = (song) => {
      console.log("===========")
      console.log(song);
      console.log("===========")
        emit('favoriteSong', song, axios, store, router);
    };

</script>
