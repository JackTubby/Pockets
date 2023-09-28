<template>
  <div
    v-if="show"
    class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    @click="closeOnOutsideClick"
  >
    <div
      class="flex flex-col w-4/12 p-8 bg-white rounded gap-y-6"
      ref="modalContent"
    >
      <div class="flex items-center justify-between">
        <h2>{{ title }}</h2>
        <button
          class="p-2 bg-red-300 rounded-lg hover:bg-red-400"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    // Reactive ref to hold modal's content element.
    const modalContent = ref(null);

    // Close modal if clicked outside of it.
    const closeOnOutsideClick = (event) => {
      if (modalContent.value && !modalContent.value.contains(event.target)) {
        emit("close"); // Emit close event
      }
    };

    // Expose ref and function for template use.
    return {
      modalContent,
      closeOnOutsideClick,
    };
  },
});
</script>
