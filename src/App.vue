<template>
  <main class="container mx-auto">
    <div class="text-center flex flex-col gap-y-4">
      <h1>Pockets</h1>
      <div>
        <button @click="openCreateModal" class="bg-green-400 px-6 py-2 rounded-2xl">Add Pocket</button>
      </div>
    </div>
    <div>
      <Pockets />
    </div>
    <Modal :show="showModal" @close="showModal = false" >
        
    </Modal>
  </main>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Pockets from './components/Pockets.vue'
  import Modal from './components/Modal.vue'

  export default defineComponent({
    components: {
      Pockets,
      Modal,
    },
    setup() {
      const showModal = ref(false)
      const openCreateModal = () => {
        showModal.value = true
        console.log('Opening Modal')
      }
      return { openCreateModal, showModal }
    }
  })
</script>
