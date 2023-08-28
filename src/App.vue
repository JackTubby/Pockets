<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const pocket = ref({
        title: null,
        description: null,
        totalValue: null,
      })
      return {
        pocket,
      }
    },
  }
</script>

<template>
  <main class="container mx-auto">
    <div class="text-center">
      <h1>Pockets</h1>
    </div>
  </main>
</template>
