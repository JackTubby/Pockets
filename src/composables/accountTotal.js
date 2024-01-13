import firebaseAccountHelpers from "../firebase/accountHelpers";

export async function getAccountTotal() {
  let total = 0;
  const getData = await firebaseAccountHelpers.get();
  getData.forEach((i) => {
    total += i.balance;
  });

  return total;
}
