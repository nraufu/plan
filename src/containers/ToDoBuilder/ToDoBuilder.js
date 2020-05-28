import React, { Component } from "react";

import Layout from "../../Hoc/Layout/Layout";
import Tasks from "../../components/Tasks/Tasks";
import InputBar from "./../../components/UI/InputBar/InputBar";
import Modal from "../Modal/Modal";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";

class ToDoBuilder extends Component {
  state = {
    userInput: "",
    tasks: [],
    valid: false,
    modalId: "",
    modalDetail: "",
    loading: true,
  };

  getTasks = async () => {
    const response = await axios.get("/tasks.json");
    const tasks = [];
    for (const key in response.data) {
      tasks.unshift({ id: key, body: response.data[key] });
    }
    return tasks;
  };

  async componentDidMount() {
    const tasks = await this.getTasks();
    this.setState({ tasks: tasks, loading: false });
  }

  buttonClickedHandler = async () => {
    await axios.post("/tasks.json", {
      taskToDo: this.state.userInput,
      done: false,
    });
    const tasks = await this.getTasks();
    this.setState({ userInput: "", tasks: tasks });
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
      (task) => task.id !== taskIndex
    );
    axios.delete(`/tasks/${taskIndex}.json`);
    this.setState({ tasks: updatedTasks });
  };

  onCompleteHandler = (taskIndex) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex((task) => task.id === taskIndex);
    tasks[index] = { ...tasks[index] };
    tasks[index].body.done = !tasks[index].body.done;
    const { body } = tasks[index];
    axios.put(`/tasks/${tasks[index].id}.json`, body);
    this.setState({ tasks: tasks });
  };

  viewDetailsHandler = (taskIndex) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex((task) => task.id === taskIndex);
    this.setState({
      modalDetail: tasks[index].body.taskToDo,
      modalId: taskIndex,
    });
  };

  saveChangesHandler = (newChange) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex((task) => task.id === this.state.modalId);
    tasks[index] = { ...tasks[index] };
    tasks[index].body.taskToDo = newChange;
    const { body } = tasks[index];
    axios.put(`/tasks/${tasks[index].id}.json`, body);
    this.setState({ tasks: tasks });
  };

  render() {
    let tasks = <Spinner />;
    if (!this.state.loading) {
      tasks = (
        <Tasks
          tasks={this.state.tasks}
          onRemove={this.removeTaskHandler}
          onComplete={this.onCompleteHandler}
          onEdit={this.viewDetailsHandler}
        />
      );
    }

    return (
      <Layout tasks={this.state.tasks}>
        <InputBar
          value={this.state.userInput}
          changed={this.onInputChangeHandler}
          btnClicked={this.buttonClickedHandler}
          valid={this.state.valid}
        />
        {tasks}
        <Modal
          taskInfo={this.state.modalDetail}
          onSave={this.saveChangesHandler}
        />
      </Layout>
    );
  }
}

export default ToDoBuilder;
