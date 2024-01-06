<template>
  <!-- This uses the reusable modal and adds the form that is required into it -->
  <Modal :show="show" :title="modalTitle" @close="$emit('close')">
    <AccountForm v-if="type === 'account'"></AccountForm>
    <PocketForm v-if="type === 'pocket'"></PocketForm>
  </Modal>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import Modal from "./Modal.vue";
import AccountForm from "../forms/AccountForm.vue";
import PocketForm from "../forms/PocketForm.vue";

// Using defineProps to define the component's props
const props = defineProps({
  show: Boolean,
  type: String,
  accountId: String,
});
watch(() => props.type, () => {
  console.log(props);
});
// Using defineEmits to define the emitted events
defineEmits(["close"]);

// Computing the modalTitle based on the prop 'type'
const modalTitle = computed(() => {
  return props.type === "account" ? "Account Form" : "Pockets Form";
});
</script>
