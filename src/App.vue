<template>
  <main class="container mx-auto">
    <div class="flex flex-col mb-20 text-center gap-y-2">
      <h2>Accounts</h2>
      <div class="mb-6">

      </div>
      <div class="flex gap-x-8">
        <Accounts v-for="account in accounts" v-if="accounts.length > 0" :key="account.id" :bank="account.bank"
          :balance="account.balance" :currency="'GBP'" :digits="account.digits" :name="account.name" />
        <div class="mx-auto" v-else>No account data available</div>
      </div>
    </div>
    <div class="flex flex-col text-center gap-y-2">
      <h2>Pockets</h2>
      <div>

      </div>
    </div>
    <div>
      <Pockets />
    </div>
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
    <FormsModal :show="showModal" @close="showModal = false" :type="modalType"></FormsModal>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Accounts from './components/Accounts.vue'
import Pockets from './components/Pockets.vue'
import FormsModal from './components/modals/FormsModal.vue'
import firebaseAccountHelpers from "./firebase/accountHelpers";

interface AccountData {
  id?: string;
  bank?: string;
  balance?: string;
  digits?: string;
  name?: string;
}

export default defineComponent({
  components: {
    Pockets,
    FormsModal,
    Accounts,
  },
  setup() {
    // Modal
    const showModal = ref(false);
    const modalType = ref('');
    const openCreateModal = (type: string) => {
      modalType.value = type;
      showModal.value = true;
      console.log(`Opening Modal for ${type}`);
    }

    // Menu
    const menu = ref(false)
    const showMenu = () => {
      menu.value = !menu.value;
    }

    // Accounts
    const accounts = ref<AccountData[]>([]);

    const getAccountData = async () => {
      try {
        accounts.value = await firebaseAccountHelpers.get();
      } catch (err) {
        console.error("Failed to fetch account data", err);
      }
    }
    onMounted(() => {
      getAccountData()
    })
    return { openCreateModal, showModal, modalType, getAccountData, accounts, menu, showMenu };
  }
})
</script>

