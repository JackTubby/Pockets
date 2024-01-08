// https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "./init";

const create = async (data: any) => {
  try {
    const collectionRef = collection(db, "bank_account");
    const documentRef = await addDoc(collectionRef, data);
    console.log("Document was created with ID: ", documentRef.id);
  } catch (err) {
    console.log("Error creating document: ", err);
    throw err;
  }
};

const update = async (id: string, data: any) => {
  try {
    const collectionRef = doc(db, "bank_account", id);
    await updateDoc(collectionRef, {
      ...data
    })
  } catch (err) {}
};

const get = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "bank_account"));
    const documents = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return documents;
  } catch (err) {
    console.log("Error fetching documents", err);
    throw err;
  }
};

const getOne = async (id: string) => {
  try {
    const docRef = await doc(db, "bank_account", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.log("Error fetching documents", err);
    throw err;
  }
};

const remove = async (id: string) => {
  return await deleteDoc(doc(db, "bank_account", id))
};

export default {
  create,
  get,
  update,
  remove,
  getOne,
};
