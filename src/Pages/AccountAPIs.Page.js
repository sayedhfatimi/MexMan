import React from "react";
import { Segment, Header, Icon, Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
import AddAccountForm from "../Components/AddAccountForm.Component";
import AccountList from "../Components/AccountList.Component";

function AccountAPIs() {
  const state = useSelector((state) => state);

  return (
    <React.Fragment>
      <Segment.Group raised>
        <Segment color="violet" secondary>
          <Header as="h1">
            <Icon name="cog" color="violet" />
            <Header.Content>
              Account APIs
              <Header.Subheader>Manage your API Keys</Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>

        <Segment color="grey" tertiary>
          <AddAccountForm />
        </Segment>

        <Segment color="grey">
          {state.length === 0 ? (
            <Message
              info
              icon="question"
              header="You have not added any account APIs yet"
              list={[
                "To add a BitMex account API Key, click on the 'Add Account' button above.",
                "Alternatively go to the 'Help' section, from the menu, and follow the instructions to find out how to get your API Keys from BitMex.",
              ]}
              size="huge"
            />
          ) : (
            AccountList(state)
          )}
        </Segment>
      </Segment.Group>
    </React.Fragment>
  );
}

export default AccountAPIs;
