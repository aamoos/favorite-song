<!-- src/components/PostList.vue -->
<template>
  <div class="container mx-auto py-4">
    <div class="flex mb-4">
      <select v-model="selectedCompany" class="px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
        <option value="ky">금영노래방</option>
        <option value="tj">TJ미디어</option>
      </select>
      <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요" class="flex-1 ml-2 px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500">
      <button @click="search" class="ml-2 bg-indigo-500 text-white px-4 py-2 rounded-md">검색</button>
    </div>
    <ul v-if="filteredPosts.length > 0" class="mt-4">
      <li v-for="post in filteredPosts" :key="post.id" class="border-b py-2">
        <h2 class="text-lg font-semibold">{{ post.title }}</h2>
        <p class="text-gray-600">{{ post.body }}</p>
      </li>
    </ul>
    <p v-else class="mt-4">검색 결과가 없습니다.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: '첫 번째 게시물', body: '이것은 첫 번째 게시물입니다.' },
        { id: 2, title: '두 번째 게시물', body: '이것은 두 번째 게시물입니다.' },
        { id: 3, title: '세 번째 게시물', body: '이것은 세 번째 게시물입니다.' },
        // 필요한 만큼 게시물을 추가하세요
      ],
      searchQuery: '',
      filteredPosts: [],
      selectedCompany: 'ky'
    }
  },
  methods: {
    search() {
      let filtered = this.posts;
    
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      
      this.filteredPosts = filtered;
    }
  }
}
</script>
