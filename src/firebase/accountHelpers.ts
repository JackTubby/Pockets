import { collection, addDoc } from "firebase/firestore"
import db from "./init"

const create = async (data) => {
  try {
    const collectionRef = collection(db, "bank_account")
    const documentRef = await addDoc(collectionRef, data)
    console.log("Document was created with ID: ", documentRef.id)
  }
  catch (err) {
    console.log("Error creating document: ", err)
  }
}

const getData = () => {}

const updateData = () => {}

const deleteData = () => {}

export default {
  create,
  getData,
  updateData,
  deleteData,
}