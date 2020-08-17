import React from "react";
import { useSelector } from "react-redux";
import {
  Segment,
  Header,
  Icon,
  Statistic,
  Placeholder,
  Grid,
} from "semantic-ui-react";

function Dashboard() {
  const state = useSelector((state) => state);

  return (
    <React.Fragment>
      <Segment.Group raised>
        <Segment color="blue" secondary>
          <Header as="h1">
            <Icon name="computer" color="blue" />
            <Header.Content>
              Dashboard
              <Header.Subheader>
                Overview of all account activities
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
        <Segment color="grey">
          <Segment.Group>
            <Segment padded color="blue">
              <Header size="huge">First Account Name</Header>
            </Segment>
            <Segment.Group>
              <Segment padded color="blue">
                <Statistic.Group widths="3">
                  <Statistic>
                    <Statistic.Label>Wallet Balance</Statistic.Label>
                    <Statistic.Value>
                      4<small>.6787</small>
                    </Statistic.Value>
                    <Statistic.Label>XBT</Statistic.Label>
                  </Statistic>
                  <Statistic color="green" size="large">
                    <Statistic.Label>Lifetime</Statistic.Label>
                    <Statistic.Value>+130%</Statistic.Value>
                    <Statistic.Label>PNL</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Label>Orders</Statistic.Label>
                    <Statistic.Value>4</Statistic.Value>
                    <Statistic.Label>Active</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Segment>
              <Segment color="grey">
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
              <Segment color="grey">
                <Grid columns={3} stackable divided>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>

                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>

                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment.Group>
          </Segment.Group>
          <Segment.Group>
            <Segment padded color="blue">
              <Header size="huge">Second Account Name</Header>
            </Segment>
            <Segment.Group>
              <Segment padded color="blue">
                <Statistic.Group widths="3">
                  <Statistic>
                    <Statistic.Label>Wallet Balance</Statistic.Label>
                    <Statistic.Value>
                      11<small>.6651</small>
                    </Statistic.Value>
                    <Statistic.Label>XBT</Statistic.Label>
                  </Statistic>
                  <Statistic color="red" size="large">
                    <Statistic.Label>Lifetime</Statistic.Label>
                    <Statistic.Value>-16%</Statistic.Value>
                    <Statistic.Label>PNL</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Label>Orders</Statistic.Label>
                    <Statistic.Value>3</Statistic.Value>
                    <Statistic.Label>Active</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Segment>
              <Segment color="grey">
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
              <Segment color="grey">
                <Grid columns={3} stackable divided>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>

                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>

                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment.Group>
          </Segment.Group>
        </Segment>
      </Segment.Group>
    </React.Fragment>
  );
}

export default Dashboard;
