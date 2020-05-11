import React from "react";

const Input = (props) => {
  return (
    <input
      type="text"
      className="form-control"
      value={props.value}
      onChange={props.changed}
    />
  );
};

export default Input;
