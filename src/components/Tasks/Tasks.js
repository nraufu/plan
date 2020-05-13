import React from "react";

import Task from "./Task/Task";

const Tasks = (props) => {
  return (
    <div className="col-12 mx-auto mt-5">
      {props.tasks.map((task, index) => (
        <Task
          key={index}
          task={task.taskToDo}
          remove={() => props.onRemove(index)}
          complete={() => props.onComplete(index)}
          edit={() => props.onEdit(index)}
          done={task.done}
        />
      ))}
    </div>
  );
};

export default Tasks;
