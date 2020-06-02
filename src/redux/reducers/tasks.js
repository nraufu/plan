import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tasks: [],
  taskId: "",
  taskDetails: {},
  loading: false,
  error: null,
};

const viewTaskInfo = (state, action) => {
  return {
    ...state,
    taskId: action.taskId,
    taskDetails: action.taskDetails,
  };
};

const editTaskComplete = (state, action) => {
  return {
    ...state,
    tasks: action.tasks,
  };
};

const deleteTask = (state, action) => {
  return {
    ...state,
    tasks: action.tasks,
  };
};

const taskCompleteToggle = (state, action) => {
  return {
    ...state,
    tasks: action.tasks,
  };
};

const fetchTasksStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchTasksSuccess = (state, action) => {
  return {
    ...state,
    tasks: action.tasks,
    loading: false,
  };
};

const queryStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const requestFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return queryStart(state, action);

    case actionTypes.DELETE_TASK:
      return deleteTask(state, action);

    case actionTypes.EDIT_TASK:
      return editTaskComplete(state, action);

    case actionTypes.TASK_COMPLETED_TOGGLE:
      return taskCompleteToggle(state, action);

    case actionTypes.VIEW_TASK_INFO:
      return viewTaskInfo(state, action);

    case actionTypes.FETCH_TASKS_START:
      return fetchTasksStart(state, action);

    case actionTypes.FETCH_TASKS_SUCCESS:
      return fetchTasksSuccess(state, action);

    case actionTypes.FETCH_TASKS_FAIL:
      return requestFail(state, action);

    default:
      return state;
  }
};

export default reducer;