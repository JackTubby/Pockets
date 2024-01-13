import { ref } from "vue";
import firebaseAccountHelpers from "./firebase/accountHelpers";

export function getAccountTotal() {
  const data = ref(null);
  data.value = firebaseAccountHelpers.get();

  console.log('here: ', data)

  return data;
}
