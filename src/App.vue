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
  <div class="h-screen flex flex-col p-6 gap-6">
    <h1 class="font-semibold text-3xl">Mafyjka</h1>
    <router-view class="grow"/>
  </div>
</template>