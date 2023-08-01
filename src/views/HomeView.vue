<script setup lang="ts">
import { useStore } from '@/store';
import { computed } from 'vue';

const store = useStore();
const players = computed(() => store.state.players);
const roles = computed(() => store.state.roles);

</script>

<template>
    <div v-for="player in players" class="">{{ player.id }} - {{ player.nick }}</div>
    <hr>
    <div v-for="role in roles" class="">{{ role.id }} - {{ role.name }} - {{ role.description }} - {{ role.faction }}</div>
</template>
