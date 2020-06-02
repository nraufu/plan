import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addTaskStart = () => {
  return {
    type: actionTypes.ADD_TASK,
  };
};

export const addTask = (newTask, token, userId) => {
  return (dispatch) => {
    dispatch(addTaskStart());
    axios
      .post("/tasks.json?auth=" + token, newTask)
      .then((res) => {
        dispatch(fetchTasks(token, userId));
      })
      .catch((err) => dispatch(requestFail(err)));
  };
};

export const deleteTaskSuccess = (newTasksArray) => {
  return {
    type: actionTypes.DELETE_TASK,
    tasks: newTasksArray,
  };
};

export const deleteTask = (taskId, tasks, token) => {
  return (dispatch) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    axios
      .delete(`/tasks/${taskId}.json?auth=` + token)
      .then((res) => {
        dispatch(deleteTaskSuccess(updatedTasks));
      })
      .catch((err) => dispatch(requestFail(err)));
  };
};

export const editTaskComplete = (newTasksArray) => {
  return {
    type: actionTypes.EDIT_TASK,
    tasks: newTasksArray,
  };
};

export const editTask = (tasks, taskId, changes, token) => {
  return (dispatch) => {
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex((task) => task.id === taskId);
    updatedTasks[index] = {
      ...updatedTasks[index]
    };
    updatedTasks[index].body.taskToDo = changes;
    const {
      body
    } = updatedTasks[index];
    axios
      .put(`/tasks/${taskId}.json?auth=` + token, body)
      .then((res) => dispatch(editTaskComplete(updatedTasks)))
      .catch((err) => dispatch(requestFail(err)));
  };
};

export const viewTaskDetails = (taskId, taskDetails) => {
  return {
    type: actionTypes.VIEW_TASK_INFO,
    taskId: taskId,
    taskDetails: taskDetails,
  };
};

export const completeTaskAction = (newTasksArray) => {
  return {
    type: actionTypes.TASK_COMPLETED_TOGGLE,
    tasks: newTasksArray,
  };
};

export const completeTaskToggle = (taskId, tasks, token) => {
  return (dispatch) => {
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex((task) => task.id === taskId);
    updatedTasks[index] = {
      ...updatedTasks[index]
    };
    updatedTasks[index].body.done = !updatedTasks[index].body.done;
    const {
      body
    } = tasks[index];
    axios
      .put(`/tasks/${taskId}.json?auth=` + token, body)
      .then((res) => {
        dispatch(completeTaskAction(updatedTasks));
      })
      .catch((err) => dispatch(requestFail(err)));
  };
};

export const fetchTasksStart = () => {
  return {
    type: actionTypes.FETCH_TASKS_START,
  };
};

export const fetchTasksSuccess = (tasks) => {
  return {
    type: actionTypes.FETCH_TASKS_SUCCESS,
    tasks: tasks,
  };
};

export const requestFail = (error) => {
  return {
    type: actionTypes.FETCH_TASKS_FAIL,
    error: error,
  };
};

export const fetchTasks = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchTasksStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get(`/tasks.json${queryParams}`)
      .then((res) => {
        const fetchedTasks = [];
        for (const key in res.data) {
          fetchedTasks.unshift({
            id: key,
            body: res.data[key]
          });
        }
        console.log(res.data)
        dispatch(fetchTasksSuccess(fetchedTasks));
      })
      .catch((err) => {
        console.log(err.response.data.error);
        dispatch(requestFail(err));
      });
  };
};