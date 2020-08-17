import React from "react";
import { Label, Segment, Grid } from "semantic-ui-react";
import ConfirmAccountDelete from "../Components/ConfirmAccountDelete.Component";

function SingleAccount(account) {
  return (
    <Segment color="violet">
      <ConfirmAccountDelete id={account.id} />
      <Label size="large" ribbon color="violet">
        {account.accountLabel}
      </Label>
      <Grid columns="equal" divided padded>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment.Group stacked>
              <Segment color="violet" className="header" textAlign="right">
                Account API Key
              </Segment>
              <Segment color="violet" className="header" textAlign="right">
                Account API Secret
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group stacked>
              <Segment>{account.accountAPIKey}</Segment>
              <Segment>{account.accountAPISecret}</Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default SingleAccount;
