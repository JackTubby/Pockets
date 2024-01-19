<template>
  <!-- <main v-if="!isLoading" class="container mx-auto mt-4"> -->
  <main class="container mx-auto mt-4">
    <div class="flex flex-col mb-20 text-center gap-y-2">
      <h2 class="text-3xl mb-6">Accounts</h2>
      <div v-if="accounts.length > 0">
        <div class="flex gap-x-8">
          <Accounts v-for="item in accounts" :key="item.id" :id="item.id" :bank="item.bank" :balance="item.balance"
            :currency="'GBP'" :digits="item.digits" :name="item.name" @updateData="updateData"
            :isActiveMenu="activeMenuId === item.id" @toggleMenu="handleToggleMenu" />
        </div>
        <h2 class="text-2xl mt-10">
          <span>Account Total: </span>
          <span>£{{ accountTotal }}</span>
        </h2>
      </div>
      <div class="mx-auto" v-else>No account data available</div>
    </div>
    <div class="flex flex-col text-center gap-y-2">
      <h2 class="text-3xl">Pockets</h2>
      <div></div>
    </div>
    <div>
      <Pockets />
    </div>
    <MainMenu :menu="menu" :openModal="openModal" :showMenu="showMenu"></MainMenu>
    <FormsModal :show="showModal" @close="showModal = false" :type="modalType" @updateData="updateData"></FormsModal>
  </main>

  <!-- <div v-else class="w-full h-full red-300 absolute">
    <LoadingScreen />
  </div> -->
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Accounts from "./components/Accounts.vue";
import Pockets from "./components/pockets/Pockets.vue";
import FormsModal from "./components/modals/FormsModal.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import MainMenu from "./components/menus/MainMenu.vue";
import { get } from "./composables/accountHelpers";
import { getAccountTotal } from "./composables/accountTotal.js"

interface AccountData {
  id?: string;
  bank?: string;
  balance?: number;
  digits?: string;
  name?: string;
}

// Menu
const menu = ref(false);
const showMenu = () => {
  menu.value = !menu.value;
};

// Modal
const showModal = ref(false);
const modalType = ref("");
const openModal = (type: string) => {
  modalType.value = type;
  showModal.value = true;
  console.log(`Opening Modal for ${type}`);
};

const updateData = async () => {
  getAccountData()
  accountTotal.value = await getAccountTotal();
}

// Accounts
const accounts = ref<AccountData[]>([]);
const isLoading = ref(false)
const flipIsLoading = () => {
  setTimeout(() => {
    isLoading.value = !isLoading.value
  }, 1000)
}
const getAccountData = async () => {
  try {
    isLoading.value = true
    const { data, error } = await get("bank_account");
    if (error.value) {
      console.error("Error fetching accounts:", error.value);
      flipIsLoading()
      // Handle error appropriately
    } else {
      accounts.value = data;
      flipIsLoading()
    }
  } catch (err) {
    console.error("Error:", err);
    flipIsLoading()
    // Handle error appropriately
  }
};

const accountTotal = ref(0);
onMounted(async () => {
  await getAccountData();
  accountTotal.value = await getAccountTotal();
});

const activeMenuId = ref(null);
const handleToggleMenu = (menuId: any) => {
  if (activeMenuId.value === menuId) {
    activeMenuId.value = null; // Close the menu if it's already open
  } else {
    activeMenuId.value = menuId; // Open the clicked menu
  }
};
</script>