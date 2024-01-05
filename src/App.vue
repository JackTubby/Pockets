<template>
  <main class="container mx-auto">
    <div class="flex flex-col mb-20 text-center gap-y-2">
      <h2>Accounts</h2>
      <div class="mb-6"></div>
      <div class="flex gap-x-8" v-if="accounts.length > 0">
        <Accounts
          v-for="account in accounts"
          :key="account.id"
          :id="account.id"
          :bank="account.bank"
          :balance="account.balance"
          :currency="'GBP'"
          :digits="account.digits"
          :name="account.name"
        />
      </div>
      <div class="mx-auto" v-else>No account data available</div>
    </div>
    <div class="flex flex-col text-center gap-y-2">
      <h2>Pockets</h2>
      <div></div>
    </div>
    <div>
      <Pockets />
    </div>
    <MainMenu
      :menu="menu"
      :openCreateModal="openCreateModal"
      :showMenu="showMenu"
    ></MainMenu>
    <FormsModal
      :show="showModal"
      @close="showModal = false"
      :type="modalType"
    ></FormsModal>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Accounts from "./components/Accounts.vue";
import Pockets from "./components/Pockets.vue";
import FormsModal from "./components/modals/FormsModal.vue";
import MainMenu from "./components/menus/MainMenu.vue";
import firebaseAccountHelpers from "./firebase/accountHelpers";

interface AccountData {
  id?: string;
  bank?: string;
  balance?: number;
  digits?: string;
  name?: string;
}

export default defineComponent({
  components: {
    Pockets,
    FormsModal,
    Accounts,
    MainMenu,
  },
  setup() {
    // Menu
    const menu = ref(false);
    const showMenu = () => {
      menu.value = !menu.value;
    };

    // Modal
    const showModal = ref(false);
    const modalType = ref("");
    const openCreateModal = (type: string) => {
      modalType.value = type;
      showModal.value = true;
      console.log(`Opening Modal for ${type}`);
    };


    // Accounts
    const accounts = ref<AccountData[]>([]);

    const getAccountData = async () => {
      try {
        accounts.value = await firebaseAccountHelpers.get();
      } catch (err) {
        console.error("Failed to fetch account data", err);
      }
    };
    onMounted(() => {
      getAccountData();
    });
    return {
      openCreateModal,
      showModal,
      modalType,
      getAccountData,
      accounts,
      menu,
      showMenu,
    };
  },
});
</script>
