<template>
  <footer v-if="showFooter" class="parent-container relative pb-16">
    <div class=" container mx-auto text-center text-white">
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