import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ToDoBuilder from "./containers/ToDoBuilder/ToDoBuilder";
import Auth from "./containers/Auth/Auth";
import Navbar from "./components/UI/Navbar/Navbar";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./redux/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={ToDoBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <React.Fragment>
        <Navbar
          tasks={this.props.tasks}
          isAuthenticated={this.props.isAuthenticated}
        />
        {routes}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.task.tasks,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
