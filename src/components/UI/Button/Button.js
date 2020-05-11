import React from "react";

const Button = (props) => {
  return (
    <button
      type="button"
      className={`btn btn-` + props.class}
      onClick={props.clicked}
      disabled={!props.valid}
    >
      {props.children}
    </button>
  );
};

export default Button;
