<template>
  <!-- This is code for the accounts containing all the bank account information -->
  <div class="flex flex-col w-1/4 px-4 py-8 border-2 rounded-lg border-primary gap-y-6">
    <div>
      <h2 class="text-left">{{ bank }}</h2>
    </div>
    <div class="flex items-end justify-center gap-x-2">
      <p class="text-3xl">{{ balance }}</p>
      <p class="text-sm">{{ currency }}</p>
    </div>
    <div class="flex">
      <p class="w-1/2 text-sm break-words">****************{{ digits }}</p>
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
