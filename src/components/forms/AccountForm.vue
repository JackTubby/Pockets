<template>
  <!-- This is the form to add an account -->
  <div>
    <form class="flex flex-col items-center gap-y-4" @submit.prevent="handleFormSubmit">
      <div v-if="type !== 'deleteAccount'" class="flex flex-col gap-y-4 w-full items-center">
        <select class="w-8/12 p-2 text-lg border rounded-md cursor-pointer select select-bordered"
          v-model="formData.bank">
          <option value="" disabled selected class="cursor-pointer text-neutral">
            Select Bank
          </option>
          <option value="NatWest" class="cursor-pointer">NatWest</option>
          <option value="Nationwide" class="cursor-pointer">Nation Wide</option>
        </select>
        <input class="w-8/12 p-2 text-lg border rounded-md input input-bordered" type="text" placeholder="Card Name"
          v-model="formData.name" />
        <input class="w-8/12 p-2 text-lg border rounded-md input input-bordered" type="text"
          placeholder="Last Four Digits" v-model="formData.digits" />
        <input class="w-8/12 p-2 text-lg border rounded-md input input-bordered" type="number" placeholder="Balance"
          v-model="formData.balance" />
      </div>
      <button class="px-6 py-2 text-xl font-semibold rounded-md shadow-md text-neutral bg-success" type="submit">
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed } from "vue";
import { create, update, getOne, remove } from "../../composables/accountHelpers";

interface FormData {
  bank: string;
  name: string;
  digits: string;
  balance: string;
}

const emit = defineEmits(["formSubmitted"]);
const formData = ref<FormData>({
  bank: "",
  name: "",
  digits: "",
  balance: "",
});

const props = defineProps({
  accountId: String,
  type: String,
});

const accountId = ref(props.accountId);

const createUser = async () => {
  try {
    await create(formData.value, "bank_account");
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

const editAccount = async (accountId: string) => {
  try {
    await update(accountId, formData.value, "bank_account");
  } catch (error) {
    console.error("Error editing account:", error);
  }
};

const getAccount = async (id: string) => {
  try {
    return await getOne(id, "bank_account");
  } catch (error) {
    console.error("Failed to fetch account data", error);
  }
};

onMounted(async () => {
  if (props.type === "editAccount" && props.accountId) {
    try {
      const getAccDetails = await getAccount(props.accountId);
      if (getAccDetails) {
        formData.value = { ...getAccDetails };
      }
    } catch (error) {
      console.error("Error in fetching account:", error);
    }
  }
});

const handleFormSubmit = async () => {
  switch (props.type) {
    case "editAccount":
      await editAccount(props.accountId);
      break;
    case "deleteAccount":
      await deleteAccount(props.accountId);
      break;
    case "account":
      await createUser();
      break;
    default:
      console.error("No method exists on this type");
  }
  emit("formSubmitted");
};

const deleteAccount = async (id: string) => {
  try {
    return await remove(id, "bank_account");
  } catch (error) {
    console.log("Failed to delete account", error);
  }
};

const buttonText = computed(() => {
  console.log(props.type);
  switch (props.type) {
    case "editAccount":
      return "Edit Account";
    case "deleteAccount":
      return "Delete Account";
    case "account":
      return "Add Account";
    default:
      return "Submit";
  }
});
</script>
../../composables/accountHelpers