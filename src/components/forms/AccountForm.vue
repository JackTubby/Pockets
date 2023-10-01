<template>
  <div>
    <form
      class="flex flex-col items-center gap-y-4"
      @submit.prevent="createUser"
    >
      <select
        class="w-8/12 p-2 text-lg border border-gray-300 rounded-md"
        name=""
        id=""
        placeholder="Select Bank"
        v-model="formData.bank"
      >
        <option value="NatWest">NatWest</option>
        <option value="NationWide">Nation Wide</option>
      </select>
      <input
        class="w-8/12 p-2 text-lg border border-gray-300 rounded-md"
        type="text"
        placeholder="Card Name"
        v-model="formData.name"
      />
      <input
        class="w-8/12 p-2 text-lg border border-gray-300 rounded-md"
        type="text"
        placeholder="Last Four Digits"
        v-model="formData.digits"
      />
      <input
        class="w-8/12 p-2 text-lg border border-gray-300 rounded-md"
        type="number"
        placeholder="Balance"
        v-model="formData.balance"
      />
      <button
        class="px-6 py-2 text-xl font-semibold text-white bg-green-500 rounded-md shadow-md hover:bg-green-400"
        type="submit"
      >
        Add Account
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import firebaseAccountHelpers from "../../firebase/helpers";

interface FormData {
  bank: string;
  name: string;
  digits: string;
  balance: string;
}

export default defineComponent({
  setup() {
    const formData = ref<FormData>({
      bank: "",
      name: "",
      digits: "",
      balance: "",
    });
    const createUser = async () => {
      const data = {
        bank: formData.value.bank,
        name: formData.value.name,
        digits: formData.value.digits,
        balance: formData.value.balance,
      };
      firebaseAccountHelpers.create(data);
      return;
    };

    return {
      formData,
      createUser,
    };
  },
});
</script>
