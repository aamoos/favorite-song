<template>
  <footer v-if="showFooter" class="bg-blue-500 p-4 mt-8">
    <div class="container mx-auto text-center text-white">
      <p>© Copyright Kim Jae Sung.</p>
    </div>
  </footer>
</template>

<script setup>
import { inject, computed } from 'vue';

const router = inject('router');

const showFooter = computed(() => {
  return !['/', '/join'].includes(router.currentRoute.value.path);
});

</script>