import React from "react";

import Button from "./../../UI/Button/Button";

const Task = (props) => {
  return (
    <div className="card m-2 bg-light">
      <div className="card-body">
        <p className="card-text text-body">{props.task}</p>
        <Button colorType="dark">
          <i className="fa fa-thumbs-o-up"></i>
        </Button>
        <Button colorType="danger">
          <i className="fa fa-trash"></i>
        </Button>
        <Button colorType="warning">
          <i className="fa fa-pencil"></i>
        </Button>
      </div>
    </div>
  );
};

export default Task;
