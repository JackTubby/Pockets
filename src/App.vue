<template>
  <main class="container mx-auto mt-4">
    <div class="flex flex-col mb-20 text-center gap-y-2">
      <h2 class="text-3xl mb-6">Accounts</h2>
      <div v-if="accounts.length > 0">
        <div class="flex gap-x-8">
          <Accounts v-for="account in accounts" :key="account.id" :id="account.id" :bank="account.bank"
            :balance="account.balance" :currency="'GBP'" :digits="account.digits" :name="account.name"
            @updateData="updateData" />
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
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Accounts from "./components/Accounts.vue";
import Pockets from "./components/Pockets.vue";
import FormsModal from "./components/modals/FormsModal.vue";
import MainMenu from "./components/menus/MainMenu.vue";
import firebaseAccountHelpers from "./firebase/accountHelpers";
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

const updateData = () => {
  getAccountData()
}

// Accounts
const accounts = ref<AccountData[]>([]);

const getAccountData = async () => {
  try {
    accounts.value = await firebaseAccountHelpers.get();
  } catch (err) {
    console.error("Failed to fetch account data", err);
  }
};

const accountTotal = ref(0);
onMounted(async () => {
  getAccountData();
  accountTotal.value = await getAccountTotal();
});
</script>