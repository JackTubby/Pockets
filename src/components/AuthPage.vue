<script setup lang="ts">
import { ref } from "vue"
import SignUpForm from "./forms/SignUpForm.vue"
import SignInForm from "./forms/SignInForm.vue"

const type = ref("signIn")
const changeType = () => {
  type.value = type.value === "signIn" ? "signUp" : "signIn";
  console.log(type.value)
}
</script>
<template>
  <section>
    <div v-if="type === 'signIn'" class="flex flex-col items-center mt-20 gap-y-6">
      <SignInForm />
      <button @click="changeType" class="text-center px-6 py-3 bg-secondary rounded-xl text-secondary-content">Sign Up</button>
    </div>
  
    <div v-else class="flex flex-col items-center mt-20 gap-y-6">
      <SignUpForm />
      <button @click="changeType" class="text-center px-6 py-3 bg-secondary rounded-xl text-secondary-content">Sign In</button>
    </div>
  </section>
</template>