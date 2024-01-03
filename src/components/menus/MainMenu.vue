<template>
  <div class="absolute right-10 bottom-10">
    <div class="flex flex-col items-end gap-y-4">
      <button v-if="menu" class="z-20 px-6 py-2 bg-primary text-primary-content hover:bg-primary-focus rounded-2xl"
        @click="openCreateModal('account')">Add Account</button>

      <button v-if="menu" class="z-20 px-6 py-2 bg-primary text-primary-content hover:bg-primary-focus rounded-2xl"
        @click="openCreateModal('pocket')">Add Pocket</button>

      <div
        class="z-10 flex items-center justify-center text-4xl transition-all ease-in-out rounded-full cursor-pointer bg-success hover:opacity-50 text-primary-content w-14 h-14"
        @click="showMenu()">
        <span v-if="menu">-</span>
        <span v-else>+</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['menu', 'openCreateModal', 'showMenu'],
}
</script>
