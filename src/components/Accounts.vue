<template>
  <!-- This is code for the accounts containing all the bank account information -->
  <div class="flex flex-col w-1/4 px-4 py-8 border-2 rounded-lg border-primary shadow-2xl gap-y-6">
    <div class="flex">
      <span class="flex gap-x-3 items-center">
        <img class="rounded-full" :src="setBankImg" alt="" height="30" width="30">
        <h2 class="text-left">{{ bank }}</h2>
      </span>
      <div class="ml-auto mr-5">
        <DropDownMenu :accountId="id" :menu="isActiveMenu" :openModal="openModal" :showMenu="showMenu"
          @close="showModal = false" @click="emit('toggleMenu', id)" />
      </div>
    </div>
    <div class="flex items-end justify-center gap-x-2">
      <p class="text-3xl">£{{ balance }}</p>
    </div>
    <div class="flex">
      <p class="w-1/2 text-sm break-words">****************{{ digits }}</p>
      <p class="w-1/2 text-sm">{{ name }}</p>
    </div>
  </div>
  <FormsModal :show="showModal" @close="showModal = false" :type="modalType" :accountId="accountId"
    @updateData="refreshData"></FormsModal>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from "vue";
import DropDownMenu from "./menus/DropDownMenu.vue";
import FormsModal from "./modals/FormsModal.vue";

const emit = defineEmits(['updateData', 'toggleMenu']);

// props from app.vue from the fetch account data req
const props = defineProps({
  id: String,
  bank: String,
  balance: Number,
  currency: String,
  digits: String,
  name: String,
  isActiveMenu: Boolean,
});

// Handle opening & closing menu
const menu = ref(false);
const showMenu = () => {
  menu.value = !menu.value;
};

const showModal = ref(false); // if show or hide
const modalType = ref(""); // what modal to show
const accountId = ref(""); // store the clicked account
const openModal = (type: string, accountIdParam: string) => {
  accountId.value = accountIdParam;
  modalType.value = type;
  showModal.value = true;
};

const refreshData = () => {
  emit('updateData')
  showModal.value = false; // close the modal
};

const setBankImg = computed(() => {
  switch (props.bank) {
    case 'Nationwide':
      return new URL('../assets/images/nationwide-logo.png', import.meta.url).href;
    case 'NatWest':
      return new URL('../assets/images/natwest-logo.png', import.meta.url).href;
    default:
      return ''
  }
})
</script>
