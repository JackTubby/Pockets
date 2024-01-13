<template>
  <div class="absolute ml-auto">
    <div>
      <div v-if="!menu" @click="showMenu()">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2311/2311524.png"
          width="20"
          height="20"
          alt="menu icon"
          class="mb-3 ml-auto cursor-pointer img-small"
        />
      </div>
      <img v-if="menu" @click="showMenu()" class="cursor-pointer" src="https://img.icons8.com/?size=256&amp;id=82771&amp;format=png" width="20" height="20" alt="Close icon">
      <div v-if="menu" class="absolute bg-base-100 rounded-2xl border border-primary">
        <button
          class="z-20 text-primary hover:bg-primary-focus rounded-t-2xl p-4 hover:text-secondary-content"
          @click="openModal('editAccount', accountId)"
        >
          Edit Account
        </button>
        <button
          class="z-20 text-primary hover:bg-primary-focus rounded-b-2xl p-4 hover:text-secondary-content"
          @click="openModal('deleteAccount', accountId)"
        >
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["menu", "openModal", "showMenu", "accountId"]);
</script>