<template>
  <div class="flex flex-col items-center">
    <select class="w-8/12 py-1 text-lg px-2" name="" id="">
      <option value="test"></option>
    </select>
    <input class="w-8/12 py-1 text-lg px-2" type="text" placeholder="Card Name">
    <input class="w-8/12 py-1 text-lg px-2" type="text" placeholder="Last Four Digits">
    <input class="w-8/12 py-1 text-lg px-2" type="number" placeholder="Balance">
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>