<template>
  <div class="w-1/4 border-2 border-primary rounded-lg px-4 py-8 flex gap-y-6 flex-col">
    <div>
      <h2 class="text-left">{{ bank }}</h2>
    </div>
    <div class="flex justify-center items-end gap-x-2">
      <p class="text-3xl">{{ balance }}</p>
      <p class="text-sm">{{ currency }}</p>
    </div>
    <div class="flex">
      <p class="w-1/2 break-words text-sm">****************{{ digits }}</p>
      <p class="w-1/2 text-sm">{{ name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    bank: String,
    balance: Number,
    currency: String,
    digits: Number,
    name: String,
  },
  setup() {

    return {};
  },
});
</script>
