import React from "react";
import SingleAccount from "./SingleAccount.Component";

const AccountList = (state) => {
  return state.map((account) => {
    return (
      <SingleAccount
        key={account.id}
        id={account.id}
        accountLabel={account.accountLabel}
        accountAPIKey={account.accountAPIKey}
        accountAPISecret={account.accountAPISecret}
      />
    );
  });
};

export default AccountList;
