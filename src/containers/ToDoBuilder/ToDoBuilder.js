import React, { Component } from "react";

import Layout from "../../Hoc/Layout/Layout";
import Tasks from "../../components/Tasks/Tasks";
import InputBar from "./../../components/UI/InputBar/InputBar";

class ToDoBuilder extends Component {
  state = { userInput: "", tasks: [], valid: false };

  buttonClickedHandler = () => {
    const tasks = this.state.tasks;
    tasks.push({ id: tasks.length + 1, taskToDo: this.state.userInput });
    this.setState({ tasks: tasks, userInput: "" });
  };

  onInputChangeHandler = (event) => {
    let userInput = event.target.value;
    userInput.length > 5
      ? this.setState({ valid: true })
      : this.setState({ valid: false });
    this.setState({ userInput: userInput });
  };

  render() {
    return (
      <Layout>
        <InputBar
          value={this.state.userInput}
          changed={this.onInputChangeHandler}
          btnClicked={this.buttonClickedHandler}
          valid={this.state.valid}
          taskLength={this.state.tasks.length}
        />
        <Tasks tasks={this.state.tasks} />
      </Layout>
    );
  }
}

export default ToDoBuilder;
