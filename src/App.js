import React from "react";
import NavigationMenu from "./Components/NavigationMenu.Component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountAPIs from "./Pages/AccountAPIs.Page";
import Dashboard from "./Pages/Dashboard.Page";
import Orders from "./Pages/Orders.Page";
import Help from "./Pages/Help.Page";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationMenu />
        <Container style={{ paddingTop: "6em", paddingBottom: "2em" }}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/Orders" component={Orders} />
            <Route exact path="/AccountAPIs" component={AccountAPIs} />
            <Route exact path="/Help" component={Help} />
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
