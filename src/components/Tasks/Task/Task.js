import React from "react";

import Button from "./../../UI/Button/Button";

const Task = (props) => {
  return (
    <div className="card m-2 bg-light">
      <div className="card-body">
        <p className="card-text text-body">{props.task}</p>
        <div className=" text-center">
          <Button colorType="dark">
            <i className="fa fa-thumbs-o-up"></i>
          </Button>
          <Button colorType="danger" clicked={props.remove}>
            <i className="fa fa-trash"></i>
          </Button>
          <Button colorType="warning">
            <i className="fa fa-pencil"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
