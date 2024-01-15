// https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../firebase/init";
import { ref } from "vue"

export const create = async (data: object, collectionType: string) => {
  try {
    const collectionRef = collection(db, collectionType);
    const documentRef = await addDoc(collectionRef, data);
    console.log("Document was created with ID: ", documentRef.id);
  } catch (err) {
    console.log("Error creating document: ", err);
    throw err;
  }
};

export const update = async (id: string, data: object, collectionType: string) => {
  try {
    const collectionRef = doc(db, collectionType, id);
    await updateDoc(collectionRef, {
      ...data
    })
  } catch (err) { }
};

export const get = async (collectionType: string) => {
  const data = ref([])
  const error = ref(null)
  try {
    const querySnapshot = await getDocs(collection(db, collectionType));
    data.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (err) {
    console.log("Error fetching documents", err);
    error.value = err;
  }
  return { data: data.value, error }
};

export const getOne = async (id: string, collectionType: string) => {
  try {
    const docRef = await doc(db, collectionType, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document exists!");
    }
  } catch (err) {
    console.log("Error fetching documents", err);
    throw err;
  }
};

export const remove = async (id: string, collectionType: string) => {
  return await deleteDoc(doc(db, collectionType, id))
};