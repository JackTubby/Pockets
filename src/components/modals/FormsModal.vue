<template>
  <!-- This uses the reusable modal and adds the form that is required into it -->
  <Modal :show="show" :title="modalTitle" @close="$emit('close')">
    <AccountForm v-if="type === 'account'" :type="type" @formSubmitted="handleDataChange"></AccountForm>
    <AccountForm v-if="type === 'editAccount'" :accountId="accountId" :type="type" @formSubmitted="handleDataChange">
    </AccountForm>
    <AccountForm v-if="type === 'deleteAccount'" :accountId="accountId" :type="type" @formSubmitted="handleDataChange">
    </AccountForm>
    <PocketForm v-if="type === 'pocket'"></PocketForm>
  </Modal>
</template>

<script setup lang="ts">
import { computed, defineEmits } from "vue";
import Modal from "./Modal.vue";
import AccountForm from "../forms/AccountForm.vue";
import PocketForm from "../forms/PocketForm.vue";

const props = defineProps({
  show: Boolean,
  type: String,
  accountId: String,
});

const emit = defineEmits(['close', 'updateData']);

// Computing the modalTitle based on the prop 'type'
const modalTitle = computed(() => {
  if (props.type === "account") {
    return "Add Account";
  } else if (props.type === "pocket") {
    return "Add Pocket";
  } else if (props.type === "editAccount") {
    return "Edit Account";
  } else if (props.type === "deleteAccount") {
    return "Delete Account";
  } else {
  }
});

const handleDataChange = () => {
  emit('updateData');
};
</script>
