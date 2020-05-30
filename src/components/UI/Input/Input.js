import React from "react";

const Input = (props) => {
  let inputClass = ["form-control shadow-none"];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClass.push("border-danger");
  }

  return (
    <div className="form-group">
      <input
        className={inputClass.join(" ")}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
    </div>
  );
};

export default Input;
