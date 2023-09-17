<template>
  <div class="flex flex-col items-center gap-y-4">
    <select class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" name="" id="" placeholder="Select Bank">
      <option value="test">Test</option>
    </select>
    <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="text" placeholder="Card Name">
    <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="text" placeholder="Last Four Digits">
    <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="number" placeholder="Balance">
    <button class="bg-green-500 text-white font-semibold py-2 px-6 rounded-md text-xl hover:bg-green-400 shadow-md" type="submit">Create Pocket</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>