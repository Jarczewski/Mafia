<script setup lang="ts">
import { useStore } from '@/store';
import { type UUID, uuid } from 'vue-uuid';
import { ref, computed } from 'vue'
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    ComboboxButton,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const store = useStore();
const players = computed(() => store.state.players);
const roles = computed(() => store.state.roles);

class Named {
    id: string;
    name: string;

    constructor(name: string) {
        this.id = uuid.v4();
        this.name = name;
    }
}

class Player extends Named {
    role: string;

    constructor(name: string) {
        super(name);
        this.role = '';
    }
}

const items = [
    new Player('Jan'),
    new Player('Kasia'),
    new Player('Marek'),
    new Player('Zosia'),
    new Player('Piotr'),
]

const selected = ref([] as any[]);

const removePlayer = (item: Named) => {
    const index = selected.value.indexOf(item);
    if (index > -1) {
        selected.value.splice(index, 1);
    }
}

const isItemInSelected = (item: Named) => {
  return selected.value.some((x) => x.id === item.id);
};

const remainingItems = computed(() => {
  return items.filter((item) => !isItemInSelected(item));
});

</script>

<template>
    <div v-for="player in players" class="">{{ player.id }} - {{ player.nick }}</div>
    <hr>
    <div v-for="role in roles" class="">{{ role.id }} - {{ role.name }} - {{ role.description }} - {{ role.faction }}</div>
    <main>
        <div class="p-6 rounded-md border border-gray-200 flex flex-col gap-2">
            <ul class="flex gap-2">
                <li v-for="item in selected" :key="item.id" class="px-2 py-0.5 rounded-md border border-gray-200 cursor-pointer" @click="removePlayer(item)">
                    {{ item.name }} <span class="text-gray-400">x</span>
                </li>
            </ul>

            <Combobox v-model="selected" multiple class="relative">
                <div class="relative">

                    <div class="px-2 py-0.5 rounded-md border border-gray-200 flex w-min">
                        <ComboboxInput class="grow"/>
                        <ComboboxButton class="flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </ComboboxButton>
                    </div>
                    
                    <!-- <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"> -->
                        <ComboboxOptions class="absolute px-2 py-0.5 rounded-md border border-gray-200 bg-white">
                            <ComboboxOption v-for="item in remainingItems" :key="item.id" :value="item" class="cursor-pointer">
                                {{ item.name }}
                            </ComboboxOption>
                        </ComboboxOptions>
                    <!-- </TransitionRoot> -->
                </div>

            </Combobox>
        </div>
    </main>
</template>
