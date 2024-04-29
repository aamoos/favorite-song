<template>
  <footer v-if="showFooter" class="fixed bottom-0 w-full bg-blue-500 p-4">
    <div class="container mx-auto text-center text-white">
      <p>© Copyright Kim Jae Sung.</p>
    </div>
  </footer>
</template>

<script setup>
import { inject, computed } from 'vue';

const router = inject('router');

const showFooter = computed(() => {
  return !['/', '/join', '/passwordFind'].includes(router.currentRoute.value.path);
});

</script>