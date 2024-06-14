<template>
  <PageHeader/> <!-- 헤더 컴포넌트 -->
  <div class="parent-container">
    
    <router-view/>  <!-- 페이지 이동이 표시될 곳 -->
  </div>
  <PageFooter/> <!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'App',
  components: {
    PageFooter,
    PageHeader
  }
}
</script>

<style>
.parent-container {
  height: 100vh; /* 부모 요소의 높이를 화면의 전체 높이로 설정합니다. */
  min-height: calc(100vh - 64px);
  padding: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
