<template>
  <main class="container mx-auto">
    <div class="flex flex-col mb-20 text-center gap-y-2">
      <h2>Accounts</h2>
      <div class="mb-6">
        <button class="px-6 py-2 bg-primary text-primary-content hover:bg-primary-focus rounded-2xl"
          @click="openCreateModal('account')">Add Account</button>
      </div>
      <div>
        <Accounts 
          v-for="account in accounts" 
          :key="account.id" 
          :bank="account.bank" 
          :balance="account.balance"
          :currency="'GBP'" 
          :digits="account.digits"
          :name="account.name" />
      </div>
    </div>
    <div class="flex flex-col text-center gap-y-2">
      <h2>Pockets</h2>
      <div>
        <button class="px-6 py-2 bg-primary text-primary-content hover:bg-primary-focus rounded-2xl"
          @click="openCreateModal('pocket')">Add Pocket</button>
      </div>
    </div>
    <div>
      <Pockets />
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
  id: string;
  bank: string;
  balance: number;
  digits: number;
  name: string;
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
    return { openCreateModal, showModal, modalType, getAccountData, accounts };
  }
})
</script>

