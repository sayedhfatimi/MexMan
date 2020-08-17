import React from "react";
import { Segment, Header, Icon, Image } from "semantic-ui-react";

function Orders() {
  return (
    <React.Fragment>
      <Segment.Group raised>
        <Segment color="teal" secondary>
          <Header as="h1">
            <Icon name="unordered list" color="teal" />
            <Header.Content>
              Orders
              <Header.Subheader>
                View and Set orders for accounts
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
        <Segment color="grey">
          <Segment.Group>
            <Segment loading>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          </Segment.Group>
        </Segment>
      </Segment.Group>
    </React.Fragment>
  );
}

export default Orders;
