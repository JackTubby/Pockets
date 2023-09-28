<template>
  <Modal :show="show" :title="modalTitle" @close="$emit('close')">
    <!-- <div v-if="type === 'account'"> -->
    <AccountForm></AccountForm>
    <!-- </div>
    <div v-if="type === 'pocket'">
      <h2>POCKET</h2>
    </div> -->
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
