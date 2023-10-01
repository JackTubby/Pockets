<template>
  <div>
    <button @click="run" class="p-2 text-white bg-green-500 font-xl">
      HERE
    </button>
    <div>
      <p></p>
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
