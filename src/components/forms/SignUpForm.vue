<script setup lang="ts">
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc, getFirestore } from "firebase/firestore";
import db from "../../firebase/init";


interface FormData {
  email: string;
  password: string;
  fName: string,
  lName: string,
}

const formData = ref<FormData>({
  email: "",
  password: "",
  fName: "",
  lName: "",
})
const auth = getAuth();
const error = ref(null)
if (error.value !== null) {
  console.log("Error: ", error.value)
}

const handleFormSubmit = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password);
    const user = userCredential.user;
    console.log("USER: ", user);

    await createUserDoc(user.uid, formData.value, 'users');
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    error.value = errorCode + errorMessage;
    console.log("ERROR: ", errorCode, errorMessage);
  }
}

const createUserDoc = async (uid: string, data: object, collectionType: string) => {
  try {
    const docRef = doc(db, collectionType, uid); // Create a reference with UID as the document ID
    await setDoc(docRef, data); // Set the document data
    console.log("Document was created with ID: ", uid);
  } catch (err) {
    console.log("Error creating document: ", err);
    throw err;
  }
};
</script>
<template>
  <section>
    <h1 class="text-center pb-6 text-2xl">Sign Up</h1>
    <form class="flex flex-col items-center gap-y-4" @submit.prevent="handleFormSubmit">
      <input type="name" placeholder="First Name" v-model="formData.fName" requird
        class="border border-primary py-3 w-auto px-1 rounded-md">
      <input type="name" placeholder="Last Name" v-model="formData.lName" requird
        class="border border-primary py-3 w-auto px-1 rounded-md">
      <input type="email" placeholder="Email" v-model="formData.email" requird
        class="border border-primary py-3 w-auto px-1 rounded-md">
      <input type="password" placeholder="Password" v-model="formData.password" required
        class="border border-primary py-3 w-auto px-1 rounded-md">
      <button type="submit" class="px-10 py-4 bg-primary text-white rounded-xl">Sign Up</button>
    </form>
  </section>
</template>