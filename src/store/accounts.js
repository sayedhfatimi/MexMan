import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "accounts",
  initialState: [],
  reducers: {
    // action => action handler
    addAccount: (accounts, action) => {
      accounts.push({
        id: ++lastId,
        accountLabel: action.payload.accountLabel,
        accountAPIKey: action.payload.accountAPIKey,
        accountAPISecret: action.payload.accountAPISecret,
      });
    },
    removeAccount: (accounts, action) => {
      return accounts.filter((account) => account.id !== action.payload.id);
    },
  },
});

export const { addAccount, removeAccount } = slice.actions;
export default slice.reducer;
