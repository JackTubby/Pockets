import { get } from "../composables/accountHelpers";

export async function getAccountTotal() {
  let total = 0;
  const getData = await get("bank_account");
  getData.data.forEach((i) => {
    total += i.balance;
  });

  return total;
}
