<script lang="ts">
  import { ref, defineComponent } from 'vue'

  interface Pocket {
    title: string | null,
    description: string | null,
    totalValue: number | null,
  }

  export default defineComponent({
    setup() {
      const pocket = ref<Pocket>({
        title: null,
        description: null,
        totalValue: null,
      })
      
      return {
        pocket,
      }
    },
  })
</script>

<template>
  <main class="container mx-auto">
    <div class="text-center">
      <h1>Pockets</h1>
    </div>
  </main>
</template>
