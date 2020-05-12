import React from "react";

import Task from "./Task/Task";

const Tasks = (props) => {
  return (
    <div className="col-12 mx-auto mt-5">
      {props.tasks.map((task) => (
        <Task
          key={task.id}
          task={task.taskToDo}
          remove={() => props.onRemove(task.id)}
        />
      ))}
    </div>
  );
};

export default Tasks;
