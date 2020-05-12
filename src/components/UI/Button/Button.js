import React from "react";

const Button = (props) => {
  return (
    <button
      type="button"
      className={`m-1 btn btn-outline-` + props.colorType}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
