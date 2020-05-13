import React from "react";

const Button = (props) => {
  return (
    <button
      type="button"
      className={`m-1 shadow-none btn btn-outline-` + props.colorType}
      onClick={props.clicked}
      data-toggle={props.modalToggler}
      data-target={props.target}
    >
      {props.children}
    </button>
  );
};

export default Button;
