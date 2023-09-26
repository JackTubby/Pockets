<template>
  <form class="flex flex-col items-center gap-y-4" @submit.prevent="handleSubmit">
    <select class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" name="" id="" placeholder="Select Bank">
      <option value="test">NatWest</option>
      <option value="test">Nation Wide</option>
    </select>
    <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="text" placeholder="Card Name" v-model="formData.name">
    <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="text" placeholder="Last Four Digits" v-model="formData.digits">
    <input class="w-8/12 p-2 text-lg border border-gray-300 rounded-md" type="number" placeholder="Balance" v-model="formData.balance">
    <button class="bg-green-500 text-white font-semibold py-2 px-6 rounded-md text-xl hover:bg-green-400 shadow-md" type="submit">Create Pocket</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const formData = ref({
      name: '',
      digits: '',
      balance: '',
    })
    // Handle form submission
    const handleSubmit = () => {
      console.log(formData.value)
    }
    return {
      formData,
      handleSubmit
    }
  }
});
</script>