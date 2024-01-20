// https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../firebase/init";
import { ref } from "vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const create = (data: object, collectionType: string) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const uid = user.uid;
        const accountsCollectionRef = collection(db, 'users', uid, collectionType);
        const docRef = await addDoc(accountsCollectionRef, data);
        console.log("Document was created with ID: ", docRef.id);
      } catch (err) {
        console.log("Error creating document: ", err);
        throw err;
      }
    }
  });
};

export const update = async (id: string, data: object, collectionType: string) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(id)
      try {
        const uid = user.uid;
        const collectionRef = doc(db, 'users', uid, collectionType, id);
        await updateDoc(collectionRef, data);
        console.log("Document updated successfully");
      } catch (err) {
        console.error("Error updating document: ", err);
      }
    }
  });
};

export const get = (collectionType: string) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const querySnapshot = await getDocs(collection(db, 'users', uid, collectionType));
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          resolve({ data, error: null });
        } catch (err) {
          console.error("Error fetching documents", err);
          reject({ data: [], error: err });
        }
      } else {
        reject({ data: [], error: new Error("No authenticated user") });
      }
    });
  });
};

export const getOne = (id: string, collectionType: string) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const docRef = doc(db, 'users', uid, collectionType, id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            resolve(docSnap.data());
          } else {
            console.log("No such document exists!");
            resolve(null); // or reject("No such document exists!");
          }
        } catch (err) {
          console.error("Error fetching documents", err);
          reject(err);
        }
      } else {
        reject("User is not authenticated");
      }
    });
  });
};

export const remove = async (id: string, collectionType: string) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const uid = user.uid
        return await deleteDoc(doc(db, 'users', uid, collectionType, id))
      } catch (err) {
        console.log(err)
      }
    }
  })
};