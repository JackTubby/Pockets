<template>
  <!-- This is code for the accounts containing all the bank account information -->
  <div
    class="flex flex-col w-1/4 px-4 py-8 border-2 rounded-lg border-primary gap-y-6"
  >
    <div class="flex">
      <h2 class="text-left">{{ bank }}</h2>
      <div class="ml-auto mr-5">
        <DropDownMenu
          :accountId="id"
          :menu="menu"
          :openModal="() => openModal(modalType, id)"
          :showMenu="showMenu"
          @close="showModal = false"
        />
      </div>
    </div>
    <div class="flex items-end justify-center gap-x-2">
      <p class="text-3xl">{{ balance }}</p>
      <p class="text-sm">{{ currency }}</p>
    </div>
    <div class="flex">
      <p class="w-1/2 text-sm break-words">****************{{ digits }}</p>
      <p class="w-1/2 text-sm">{{ name }}</p>
    </div>
  </div>
  <AlterModal :show="showModal" @close="showModal = false" :type="modalType" :accountId="accountId"></AlterModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DropDownMenu from "./menus/DropDownMenu.vue";
import AlterModal from "./modals/AlterModal.vue";

// props from app.vue from the fetch account data req
defineProps({
  id: String,
  bank: String,
  balance: Number,
  currency: String,
  digits: String,
  name: String,
});

// Handle opening & closing menu
const menu = ref(false);
const showMenu = () => {
  menu.value = !menu.value;
};

const showModal = ref(false); // if show or hide
const modalType = ref(""); // what modal to show
const accountId = ref("");// store the clicked account
const openModal = (type: string, accountIdParam: string) => {
  console.log(accountId.value, modalType.value, showModal.value)
  accountId.value = accountIdParam;
  modalType.value = type;
  showModal.value = true;
};

// Make the dropdown menu work
// Create the edit/delete modal
// functionality to edit/delete - decide if I should put logic in the edit/delete modal or keep here (prob better here)
// need to make sure when the edit/delete modal is opened the id is passed
</script>
