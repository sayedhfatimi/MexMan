import React, { useState } from "react";
import { Button, Form, Transition, Segment, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addAccount } from "../store/accounts";

let AddAccountForm = () => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);

  let accountLabel, accountAPIKey, accountAPISecret;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !accountLabel.value ||
      !accountAPIKey.value ||
      !accountAPISecret.value
    ) {
      console.error("All or some fields empty!");
      return;
    }

    dispatch(
      addAccount({
        accountLabel: accountLabel.value,
        accountAPIKey: accountAPIKey.value,
        accountAPISecret: accountAPISecret.value,
      })
    );

    accountLabel.value = accountAPIKey.value = accountAPISecret.value = "";

    setVisibility(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <React.Fragment>
      <Button color="violet" fluid onClick={handleClick}>
        <Icon name={visibility ? "minus" : "plus"} />
        {visibility ? "Hide Form" : "Add Account"}
      </Button>
      <Transition visible={visibility} animation="fade" duration={0}>
        <Segment color="violet" padded>
          <Form onSubmit={handleSubmit}>
            <Form.Field required>
              <label>Account Label</label>
              <input
                name="accountLabel"
                placeholder="Enter a name to identify the Account"
                ref={(node) => (accountLabel = node)}
              />
            </Form.Field>
            <Form.Field required>
              <label>Account API Key</label>
              <input
                name="accountAPIKey"
                placeholder="Enter the Account API Key from BitMex here"
                ref={(node) => (accountAPIKey = node)}
              />
            </Form.Field>
            <Form.Field required>
              <label>Account API Secret</label>
              <input
                name="accountAPISecret"
                placeholder="Enter the Account API Secret from BitMex here"
                ref={(node) => (accountAPISecret = node)}
              />
            </Form.Field>
            <Form.Button type="submit" positive fluid>
              <Icon name="plus" />
              Add Account
            </Form.Button>
          </Form>
        </Segment>
      </Transition>
    </React.Fragment>
  );
};

export default AddAccountForm;
