<template>
  <div class=" w-1/4">
    <div class="border-2 rounded-2xl p-4 flex flex-col gap-y-10 min-h-[16rem] bg-blue-600 border-blue-600 shadow-2xl text-white">
      <!-- Header -->
      <div class="flex justify-between text-center">
        <h3 class="text-xl font-semiBold w-1/3">Pocket 1</h3>
        <h5 class="w-1/3">£100</h5>
        <i class="w-1/3">ICON</i>
      </div>
      <!-- Transaction -->
      <div>
        <h4 class="text-sm italic">Transactions</h4>
        <ul class="flex flex-col">
          <li class="flex bg-gray-200 bg-opacity-30 rounded-2xl items-center">
            <svg class="w-1/4" fill="green" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            <div class="w-1/4 text-right">17/05/23</div>
            <div class="w-1/4 text-center">£100</div>
            <div class="w-1/4 text-left">£100</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Target bar -->
    <Target />
  </div>
</template>
<script lang="ts">
  import { defineComponent} from 'vue'
  import Target from './Target.vue'

  export default defineComponent({
    components: {
      Target,
    }
  })
</script>