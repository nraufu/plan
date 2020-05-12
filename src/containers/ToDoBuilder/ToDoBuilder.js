import React, { Component } from "react";

import Layout from "../../Hoc/Layout/Layout";
import Tasks from "../../components/Tasks/Tasks";
import InputBar from "./../../components/UI/InputBar/InputBar";

class ToDoBuilder extends Component {
  state = { userInput: "", tasks: [], valid: false };

  buttonClickedHandler = () => {
    const tasks = this.state.tasks;
    tasks.push({
      id: Math.random() * 1000,
      taskToDo: this.state.userInput,
      done: false,
    });
    this.setState({ tasks: tasks, userInput: "" });
  };

  onInputChangeHandler = (event) => {
    let userInput = event.target.value;
    userInput.length > 5
      ? this.setState({ valid: true })
      : this.setState({ valid: false });
    this.setState({ userInput: userInput });
  };

  removeTaskHandler = (taskId) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: updatedTasks });
  };

  onCompleteHandler = (taskId) => {
    const tasks = [...this.state.tasks];
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    tasks[taskIndex] = { ...tasks[taskIndex] };
    tasks[taskIndex].done = !tasks[taskIndex].done;
    this.setState({ tasks: tasks });
  };

  render() {
    return (
      <Layout tasks={this.state.tasks}>
        <InputBar
          value={this.state.userInput}
          changed={this.onInputChangeHandler}
          btnClicked={this.buttonClickedHandler}
          valid={this.state.valid}
          taskLength={this.state.tasks.length}
        />
        <Tasks
          tasks={this.state.tasks}
          onRemove={this.removeTaskHandler}
          onComplete={this.onCompleteHandler}
        />
      </Layout>
    );
  }
}

export default ToDoBuilder;
