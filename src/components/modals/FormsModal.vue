<template>
  <!-- This usees the reusable modal and adds the form that is required into it -->
  <Modal :show="show" :title="modalTitle" @close="$emit('close')">
    <AccountForm v-if="type === 'account'"></AccountForm>
    <PocketForm v-if="type === 'pocket'"></PocketForm>
  </Modal>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
import Modal from "./Modal.vue";
import AccountForm from "../forms/AccountForm.vue";
import PocketForm from "../forms/PocketForm.vue";

export default defineComponent({
  components: {
    Modal,
    AccountForm,
    PocketForm,
  },
  props: {
    show: Boolean,
    type: String,
  },
  emits: ["close"],
  setup(props) {
    const { type } = toRefs(props);

    const modalTitle = computed(() =>
      type.value === "account" ? "Account Form" : "Pockets Form"
    );

    return {
      modalTitle,
    };
  },
});
</script>