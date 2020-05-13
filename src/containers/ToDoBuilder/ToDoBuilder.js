import React, { Component } from "react";

import Layout from "../../Hoc/Layout/Layout";
import Tasks from "../../components/Tasks/Tasks";
import InputBar from "./../../components/UI/InputBar/InputBar";
import Modal from "../Modal/Modal";

class ToDoBuilder extends Component {
  state = {
    userInput: "",
    tasks: [],
    valid: false,
    modalId: "",
    modalDetail: "",
  };

  buttonClickedHandler = () => {
    const tasks = this.state.tasks;
    tasks.push({
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

  removeTaskHandler = (taskIndex) => {
    const updatedTasks = this.state.tasks.filter(
      (task, index) => index !== taskIndex
    );
    this.setState({ tasks: updatedTasks });
  };

  onCompleteHandler = (taskIndex) => {
    const tasks = [...this.state.tasks];
    tasks[taskIndex] = { ...tasks[taskIndex] };
    tasks[taskIndex].done = !tasks[taskIndex].done;
    this.setState({ tasks: tasks });
  };

  viewDetailsHandler = (taskIndex) => {
    const tasks = [...this.state.tasks];
    this.setState({
      modalDetail: tasks[taskIndex].taskToDo,
      modalId: taskIndex,
    });
  };

  saveChangesHandler = (newChange) => {
    let tasks = [...this.state.tasks];
    tasks[this.state.modalId] = { ...tasks[this.state.modalId] };
    tasks[this.state.modalId].taskToDo = newChange;
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
          onEdit={this.viewDetailsHandler}
        />
        <Modal
          taskInfo={this.state.modalDetail}
          onSave={this.saveChangesHandler}
        />
      </Layout>
    );
  }
}

export default ToDoBuilder;
