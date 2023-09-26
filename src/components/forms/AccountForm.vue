<template>
  <div>
    <form class="flex flex-col items-center gap-y-4" @submit.prevent="handleSubmit">
      <select class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" name="" id="" placeholder="Select Bank"
        v-model="formData.bank">
        <option value="NatWest">NatWest</option>
        <option value="NationWide">Nation Wide</option>
      </select>
      <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="text" placeholder="Card Name"
        v-model="formData.name">
      <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="text" placeholder="Last Four Digits"
        v-model="formData.digits">
      <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="number" placeholder="Balance"
        v-model="formData.balance">
      <button class="px-6 py-2 text-xl font-semibold text-white bg-green-500 rounded-md shadow-md hover:bg-green-400"
        type="submit">Create Pocket</button>
    </form>
    <div>
      <h2>Saved Pockets:</h2>
      <ul>
        <li v-for="(savedData, index) in savedFormData" :key="index">
          {{ savedData.name }} - {{ savedData.bank }} - {{ savedData.digits }} - {{ savedData.balance }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface FormData {
  bank: string;
  name: string;
  digits: string;
  balance: string;
}

export default defineComponent({
  setup() {
    const formData = ref<FormData>({
      bank: '',
      name: '',
      digits: '',
      balance: '',
    });

    const savedFormData = ref<FormData[]>([]);

    // Handle form submission
    const handleSubmit = () => {
      // Save the current form data to local storage
      const currentData = { ...formData.value };
      savedFormData.value.push(currentData);
      localStorage.setItem('formData', JSON.stringify(savedFormData.value));
      formData.value = {
        bank: '',
        name: '',
        digits: '',
        balance: '',
      };
    };
    // Load saved data from local storage on component mount
    const loadDataFromLocalStorage = () => {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        savedFormData.value = JSON.parse(storedData);
      }
    };

    // Load data from local storage when the component is mounted
    onMounted(loadDataFromLocalStorage);
    return {
      formData,
      savedFormData,
      handleSubmit,
    };
  },
});
</script>
