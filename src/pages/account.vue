<template>
  <MyAccountView />
</template>

<script lang="ts" setup>
import MyAccountView from '@/components/MyAccountView.vue';

// defineOptions is a compiler macro and does not need to be explicitly imported.
// It's used to set component options in <script setup>.
defineOptions({
  name: 'MyAccountPage',
});
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
