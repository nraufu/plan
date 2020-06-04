import React from "react";

import Button from "./../../UI/Button/Button";

const Task = (props) => {
  let doneClasses = "fa fa-check-circle";
  let strikeThroughClass = "strikeThrough";
  if (!props.taskDetails.done) {
    doneClasses = "fa fa-check-circle-o";
    strikeThroughClass = "";
  }

  return (
    <div className="card mb-3 bg-light">
      <div className="card-body">
        <p className="card-text text-body">
          <span className={strikeThroughClass}>
            {props.taskDetails.taskToDo}
          </span>
        </p>
        <div className=" text-center">
          <Button colorType="dark" clicked={props.complete}>
            <i className={doneClasses}></i>
          </Button>
          <Button colorType="danger" clicked={props.remove}>
            <i className="fa fa-trash"></i>
          </Button>
          <Button
            clicked={props.edit}
            colorType="warning"
            modalToggler="modal"
            target="#staticBackdrop"
          >
            <i className="fa fa-pencil"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
