import React from "react";

const InputBar = (props) => {
  return (
    <div className="input-group input-group-lg">
      <input
        type="text"
        className="form-control shadow-none"
        placeholder="Add the task you plan to do"
        onChange={props.changed}
        value={props.value}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-primary shadow-none"
          type="button"
          onClick={props.btnClicked}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default InputBar;
