import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "../../Hoc/Layout/Layout";
import Tasks from "../../components/Tasks/Tasks";
import InputBar from "./../../components/UI/InputBar/InputBar";
import Modal from "../Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../redux/actions/index";

class ToDoBuilder extends Component {
  state = {
    userInput: "",
  };

  componentDidMount() {
    this.props.onTasksFetch(this.props.token, this.props.userId);
  }

  buttonClickedHandler = () => {
    this.props.onAddTask(
      {
        taskToDo: this.state.userInput,
        done: false,
        userId: this.props.userId,
      },
      this.props.token,
      this.props.userId
    );
    this.setState({ userInput: "" });
  };

  onInputChangeHandler = (event) => {
    let userInput = event.target.value;
    this.setState({ userInput: userInput });
  };

  removeTaskHandler = (taskIndex) => {
    this.props.onTaskRemove(taskIndex, this.props.tasks, this.props.token);
  };

  onCompleteHandler = (taskIndex) => {
    this.props.onCompleteToggle(taskIndex, this.props.tasks, this.props.token);
  };

  viewDetailsHandler = (taskIndex) => {
    const tasks = [...this.props.tasks];
    const index = tasks.findIndex((task) => task.id === taskIndex);
    const taskDetails = tasks[index].body;
    this.props.onTaskViewInfo(taskIndex, taskDetails);
  };

  saveChangesHandler = (newChange) => {
    this.props.onSaveEdit(
      this.props.tasks,
      this.props.taskId,
      newChange,
      this.props.token
    );
  };

  render() {
    let tasks = <Spinner />;

    if (!this.props.loading) {
      tasks = (
        <Tasks
          tasks={this.props.tasks}
          onRemove={this.removeTaskHandler}
          onComplete={this.onCompleteHandler}
          onEdit={this.viewDetailsHandler}
        />
      );
    }

    return (
      <Layout>
        <InputBar
          value={this.state.userInput}
          changed={this.onInputChangeHandler}
          btnClicked={this.buttonClickedHandler}
        />
        {tasks}
        <Modal taskInfo={this.props.task} onSave={this.saveChangesHandler} />
      </Layout>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    tasks: state.task.tasks,
    taskId: state.task.taskId,
    task: state.task.taskDetails.taskToDo,
    loading: state.task.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTasksFetch: (token, userId) =>
      dispatch(actions.fetchTasks(token, userId)),
    onAddTask: (newTask, token, userId) =>
      dispatch(actions.addTask(newTask, token, userId)),
    onTaskRemove: (taskId, tasks, token) =>
      dispatch(actions.deleteTask(taskId, tasks, token)),
    onCompleteToggle: (taskId, tasks, token) =>
      dispatch(actions.completeTaskToggle(taskId, tasks, token)),
    onTaskViewInfo: (taskId, taskDetails) =>
      dispatch(actions.viewTaskDetails(taskId, taskDetails)),
    onSaveEdit: (tasks, taskId, changes, token) =>
      dispatch(actions.editTask(tasks, taskId, changes, token)),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(ToDoBuilder);
