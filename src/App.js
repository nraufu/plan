import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ToDoBuilder from "./containers/ToDoBuilder/ToDoBuilder";
import Auth from "./containers/Auth/Auth";
import Navbar from "./components/UI/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar token="token" />
        <Switch>
          <Route path="/toDo" component={ToDoBuilder} />
          <Route path="/" exact component={Auth} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
