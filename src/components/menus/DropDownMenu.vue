<template>
  <div class="absolute ml-auto">
    <div>
      <div @click="showMenu()">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2311/2311524.png"
          width="20"
          height="20"
          alt="menu icon"
          class="mb-3 ml-auto cursor-pointer img-small"
        />
      </div>
      <div class="absolute">
        <button
          v-if="menu"
          class="z-20 px-6 py-2 mb-4 bg-primary text-primary-content hover:bg-primary-focus rounded-2xl"
          @click="openModal('editAccount', accountId)"
        >
          Edit Account
        </button>
        <button
          v-if="menu"
          class="z-20 px-6 py-2 bg-primary text-primary-content hover:bg-primary-focus rounded-2xl"
          @click="openModal('delete', accountId)"
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
