<template>
  <!-- This is code for the pocket which has the name, amount, icon and transaction history it will also have a target bar at the bottom -->
  <!-- Should also have a button to add to it -->
  <div class="w-1/4">
    <div
      class="border-2 rounded-2xl flex flex-col gap-y-10 min-h-[16rem] shadow-2xl"
    >
      <!-- Header -->
      <div class="flex justify-between px-4 pt-4 text-center">
        <h3 class="w-1/3 text-xl font-semiBold">Pocket 1</h3>
        <h5 class="w-1/3">£100</h5>
        <i class="w-1/3">ICON</i>
      </div>
      <!-- Transaction -->
      <div>
        <ul class="flex flex-col">
          <div class="relative">
            <div class="bg-green-500 w-[3px] absolute h-6"></div>
          </div>
          <li class="flex text-center">
            <div class="w-1/3 font-bold">£100</div>
            <div class="w-1/3">27/05/23</div>
            <div class="w-1/3">£100</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Target bar -->
    <Target />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Target from "./Target.vue";

export default defineComponent({
  components: {
    Target,
  },
});
</script>
