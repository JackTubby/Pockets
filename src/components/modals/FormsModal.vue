<template>
  <!-- This usees the reusable modal and adds the form that is required into it -->
  <Modal :show="show" :title="modalTitle" @close="$emit('close')">
    <AccountForm></AccountForm>
  </Modal>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Modal from "./Modal.vue";
import AccountForm from "../forms/AccountForm.vue";

export default defineComponent({
  components: {
    Modal,
    AccountForm,
  },
  props: {
    show: Boolean,
    type: String,
  },
  emits: ["close"],
  setup() {
    const modalTitle = ref("Account Details");
    return {
      modalTitle,
    };
  },
});
</script>
