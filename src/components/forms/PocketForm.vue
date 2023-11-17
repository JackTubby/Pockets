<template>
  <div class="flex flex-col items-center">
    <select class="w-8/12 px-2 py-1 text-lg" name="" id="">
      <option value="test"></option>
    </select>
    <input class="w-8/12 px-2 py-1 text-lg" type="text" placeholder="Card Name">
    <input class="w-8/12 px-2 py-1 text-lg" type="text" placeholder="Last Four Digits">
    <input class="w-8/12 px-2 py-1 text-lg" type="number" placeholder="Balance">
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>