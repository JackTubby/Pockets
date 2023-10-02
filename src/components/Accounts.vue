<template>
  <div class="container w-full">
    <div class="w-1/4 border-2 border-primary rounded-lg px-4 py-8 flex gap-y-6 flex-col">
      <div>
        <h2 class="text-left">NatWest</h2>
      </div>
      <div class="flex justify-center items-end gap-x-2">
        <p class="text-3xl">£1,242.93</p>
        <p class="text-sm">GBP</p>
      </div>
      <div class="flex">
        <p class="w-1/2 break-words text-sm">****************6472</p>
        <p class="w-1/2 text-sm">MR JACK TUBBY</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import accountHelpers from "../firebase/accountHelpers";

export default defineComponent({
  setup() {
    const run = accountHelpers.get;

    return {
      run,
    };
  },
});
</script>
