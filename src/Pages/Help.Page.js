import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

function Help() {
  return (
    <React.Fragment>
      <Segment.Group raised>
        <Segment color="red" secondary>
          <Header as="h1">
            <Icon name="question" color="red" />
            <Header.Content>
              Help
              <Header.Subheader>
                Everything you need to know about MexMan
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
        <Segment color="grey">
          <Segment.Group>
            <Segment></Segment>
          </Segment.Group>
        </Segment>
      </Segment.Group>
    </React.Fragment>
  );
}

export default Help;
