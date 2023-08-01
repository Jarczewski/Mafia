<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useStore, ActionTypes } from '@/store';
const store = useStore();
onMounted(async () => {
  await store.dispatch(ActionTypes.UPDATE_PLAYERS);
  await store.dispatch(ActionTypes.UPDATE_ROLES);
})
</script>

<template>
  <router-view class="h-screen"/>
</template>