<!-- src/components/ListComponent.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="song in songs" :key="song.no" class="p-4 bg-white shadow-md rounded-md">
      <div class="mb-2">
        <span class="text-sm text-gray-500 dark:text-neutral-400">곡번호: {{ song.no }}</span>
      </div>
      <div class="mb-2">
        <div class="font-medium text-gray-800 dark:text-neutral-500">{{ song.title }}</div>
        <div class="text-sm text-gray-600 dark:text-neutral-400">{{ song.singer }}</div>
      </div>
      <div class="flex justify-center gap-2 mt-4"> <!-- 가운데 정렬 -->
        <button @click="searchYoutube(song)"
          class="inline-flex items-center gap-1 px-4 py-2 rounded-md bg-red-500 text-white">유튜브
        </button>
        <button @click="favoriteSong(song)" :class="{
      'text-red-500': song.liked,
      'text-gray-700': !song.liked
    }"
          class="flex items-center gap-1 bg-gray-200 dark:bg-neutral-800 px-3 py-1 rounded-lg text-sm dark:text-neutral-300 focus:outline-none hover:bg-gray-300 dark:hover:bg-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18l-1.45-1.33C3.08 11.68 0 8.36 0 5.5 0 2.42 2.42 0 5.5 0c1.68 0 3.25.87 4.5 2.25C10.25 1.87 11.82 1 13.5 1 16.58 1 19 3.42 19 6.5c0 2.86-3.08 6.18-8.55 11.17L10 18z"
              clip-rule="evenodd" />
          </svg>
          <span>Like</span>
        </button>
      </div>
    </div>
  </div>
  <!-- <p v-if="songs.length === 0" class="mt-4">검색 결과가 없습니다.</p> -->
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
        emit('favoriteSong', song, axios, store, router);
    };

</script>
