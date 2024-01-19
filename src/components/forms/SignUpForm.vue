<script setup lang="ts">
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface FormData {
  email: string;
  password: string;
}

const formData = ref<FormData>({
  email: "",
  password: ""
})
const auth = getAuth();
const error = ref(null)
if (error.value !== null) {
  console.log("Error: ", error.value)
}

const handleFormSubmit = () => {
  createUserWithEmailAndPassword(auth, formData.value.email, formData.value.email)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("USER: ", user)
      // ...
    })
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      error.value = errorCode + errorMessage
      console.log("ERROR: ", errorCode, errorMessage)
      // ..
    });
}
</script>
<template>
  <section>
    <h1>Sign Up</h1>
    <form class="flex flex-col items-center gap-y-4" @submit.prevent="handleFormSubmit">
      <input type="email" placeholder="Email" v-model="formData.email" requird
        class="border border-primary py-3 w-auto px-1">
      <input type="password" placeholder="Password" v-model="formData.password" required
        class="border border-primary py-3 w-auto px-1">
      <button type="submit" class="px-10 py-4 bg-primary text-white">Sign Up</button>
    </form>
  </section>
</template>