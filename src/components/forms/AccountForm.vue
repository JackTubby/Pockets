<template>
  <!-- This is the form to add an account -->
  <div>
    <form
      class="flex flex-col items-center gap-y-4"
      @submit.prevent="createUser"
    >
      <select
        class="w-8/12 p-2 text-lg border rounded-md cursor-pointer select select-bordered"
        v-model="formData.bank"
      >
        <option value="" disabled selected class="cursor-pointer text-base-300">
          Select Bank
        </option>
        <option value="NatWest" class="cursor-pointer">NatWest</option>
        <option value="NationWide" class="cursor-pointer">Nation Wide</option>
      </select>
      <input
        class="w-8/12 p-2 text-lg border rounded-md input input-bordered"
        type="text"
        placeholder="Card Name"
        v-model="formData.name"
      />
      <input
        class="w-8/12 p-2 text-lg border rounded-md input input-bordered"
        type="text"
        placeholder="Last Four Digits"
        v-model="formData.digits"
      />
      <input
        class="w-8/12 p-2 text-lg border rounded-md input input-bordered"
        type="number"
        placeholder="Balance"
        v-model="formData.balance"
      />
      <button
        class="px-6 py-2 text-xl font-semibold rounded-md shadow-md text-primary-content bg-success"
        type="submit"
      >
        Add Account
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import firebaseAccountHelpers from "../../firebase/accountHelpers";

interface FormData {
  bank: string;
  name: string;
  digits: string;
  balance: string;
}

interface AccountData {
  id?: string;
  bank?: string;
  balance?: number;
  digits?: string;
  name?: string;
}

const emit = defineEmits(["formSubmitted"]);
const formData = ref<FormData>({
  bank: "",
  name: "",
  digits: "",
  balance: "",
});

const accounts = ref<AccountData[]>([]);

const createUser = async () => {
  try {
    await firebaseAccountHelpers.create(formData.value);
    emit("formSubmitted");
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

const editAccount = async () => {
  try {
    await firebaseAccountHelpers.edit(formData.value);
    emit("formSubmitted");
  } catch (error) {
    console.error("Error editing account:", error);
  }
};

const getAccount = async () => {
  try {
    accounts.value = await firebaseAccountHelpers.get();
  } catch (error) {
    console.error("Failed to fetch account data", error);
  }
};

</script>
