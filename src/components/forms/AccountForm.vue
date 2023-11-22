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

<script lang="ts">
import { defineComponent, ref } from "vue";
import firebaseAccountHelpers from "../../firebase/accountHelpers";

interface FormData {
  bank: string;
  name: string;
  digits: string;
  balance: string;
}

export default defineComponent({
  emits: ["formSubmitted"],
  setup(_, { emit }) {
    const formData = ref<FormData>({
      bank: "",
      name: "",
      digits: "",
      balance: "",
    });
    const createUser = async () => {
      try {
        const data = {
          bank: formData.value.bank,
          name: formData.value.name,
          digits: formData.value.digits,
          balance: formData.value.balance,
        };
        await firebaseAccountHelpers.create(data);
        emit("formSubmitted");
      } catch (error) {
        console.error("Error creating account:", error);
      }
    };

    return {
      formData,
      createUser,
    };
  },
});
</script>
