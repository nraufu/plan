import React from "react";

import Button from "./../../UI/Button/Button";

const Task = (props) => {
  let doneClasses = "fa fa-thumbs-up";
  if (!props.done) doneClasses = "fa fa-thumbs-o-up";

  return (
    <div className="card m-2 bg-light">
      <div className="card-body">
        <p className="card-text text-body">{props.task}</p>
        <div className=" text-center">
          <Button colorType="info" clicked={props.complete}>
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
