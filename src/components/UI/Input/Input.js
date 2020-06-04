import React from "react";

const Input = (props) => {
  let validationError = null;
  let inputClass = ["form-control shadow-none"];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClass.push("border-danger");
    validationError = (
      <p className="text-center text-danger">
        Please Enter a valid {props.valueType}
      </p>
    );
  }

  return (
    <div className="form-group">
      <input
        className={inputClass.join(" ")}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      {validationError}
    </div>
  );
};

export default Input;
