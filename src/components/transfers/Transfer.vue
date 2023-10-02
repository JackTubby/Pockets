<template>
  <Modal :show="show" @close="$emit('close')">
    <h1>Transfer</h1>
  </Modal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Modal from "../modals/Modal.vue";

export default defineComponent({
  components: {
    Modal,
  },
  props: {
    show: Boolean,
    type: String,
  },
  emits: ["close"],
  setup(){}
});
</script>
