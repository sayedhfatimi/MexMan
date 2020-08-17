import React, { Component } from "react";
import { Menu, Container, Icon, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default class NavigationMenu extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as="h3">
            <Image
              size="mini"
              src="logo.png"
              style={{ marginRight: "1.5em" }}
            />
            MexMan
          </Menu.Item>

          <Menu.Item
            name="Dashboard"
            active={activeItem === "Dashboard"}
            color="blue"
            onClick={this.handleItemClick}
            as={NavLink}
            to="/"
            exact
          >
            <Icon name="computer" />
            Dashboard
          </Menu.Item>
          <Menu.Item
            name="Orders"
            active={activeItem === "Orders"}
            color="teal"
            onClick={this.handleItemClick}
            as={NavLink}
            to="/Orders"
          >
            <Icon name="unordered list" />
            Orders
          </Menu.Item>

          <Menu.Item
            name="Account APIs"
            active={activeItem === "Account APIs"}
            color="violet"
            onClick={this.handleItemClick}
            as={NavLink}
            to="/AccountAPIs"
          >
            <Icon name="cog" />
            Account APIs
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item
              name="Help"
              active={activeItem === "Help"}
              color="red"
              onClick={this.handleItemClick}
              as={NavLink}
              to="/Help"
            >
              <Icon name="question" />
              Help
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
