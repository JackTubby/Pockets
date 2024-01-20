<template>
  <AuthPage v-if="!isSignedIn" />
  <main v-else>
    <!-- <div v-if="!isLoading" class="container mx-auto mt-4"> -->
    <section class="container mx-auto mt-4">
      <button v-if="isSignedIn" @click="handleSignOut">Sign Out</button>
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
    </section>

    <!-- <div v-else class="w-full h-full red-300 absolute">
      <LoadingScreen />
    </div> -->
  </main>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Accounts from "./components/Accounts.vue";
import Pockets from "./components/pockets/Pockets.vue";
import FormsModal from "./components/modals/FormsModal.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import MainMenu from "./components/menus/MainMenu.vue";
import AuthPage from "./components/AuthPage.vue";
import { get } from "./composables/accountHelpers";
import { getAccountTotal } from "./composables/accountTotal.js"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

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
};

const updateData = async () => {
  getAccountData()
  accountTotal.value = await getAccountTotal();
}

// Accounts
const accounts = ref<AccountData[]>([]);
const isLoading = ref(false)
const error = ref()
const getAccountData = async () => {
  try {
    isLoading.value = true;
    const result = await get("bank_account");

    if (!result) throw new Error("No result returned from get function");

    if (result.error) {
      console.error("Error fetching accounts:", result.error);
    } else {
      accounts.value = result.data;
    }
  } catch (err) {
    console.error("Error:", err);
    error.value = err;
  } finally {
    isLoading.value = false;
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

const isSignedIn = ref(false);
onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      isSignedIn.value = true;
      firebaseUser.getIdToken().then((accessToken) => {
        // Do something with the accessToken
      });
    } else {
      isSignedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("Successfully signed out!")
  }).catch((error) => {
    console.error(error)
  });
}
</script>