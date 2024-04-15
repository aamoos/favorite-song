<template>
  <footer v-if="showFooter" class="bg-blue-500 p-4 mt-8">
    <div class="container mx-auto text-center text-white">
      <p>© Copyright Kim Jae Sung.</p>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    showFooter(){
      return this.$route.path !== '/';
    }
  },
  methods: {

  }
}
</script>