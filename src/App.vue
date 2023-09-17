<template>
  <main class="container mx-auto">
    <div class="text-center mb-20 flex flex-col gap-y-2">
      <h2>Accounts</h2>
      <div>
        <button class="bg-green-400 px-6 py-2 rounded-2xl" @click="openCreateModal('account')">Add Account</button>
      </div>
    </div>
    <div class="text-center flex flex-col gap-y-2">
      <h2>Pockets</h2>
      <div>
        <button class="bg-green-400 px-6 py-2 rounded-2xl" @click="openCreateModal('pocket')">Add Pocket</button>
      </div>
    </div>
    <div>
      <Pockets />
    </div>
    <FormsModal :show="showModal" @close="showModal = false" :type="modalType" ></FormsModal>
  </main>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Pockets from './components/Pockets.vue'
  import FormsModal from './components/modals/FormsModal.vue'

  export default defineComponent({
    components: {
      Pockets,
      FormsModal,
    },
    setup() {
      const showModal = ref(false)
      const modalType = ref('')
      const openCreateModal = (type: string) => {
        modalType.value = type
        showModal.value = true
        console.log(`Opening Modal for ${type}`)
      }
      return { openCreateModal, showModal, modalType }
    }
  })
</script>
