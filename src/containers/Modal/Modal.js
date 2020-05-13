import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";

class Modal extends Component {
  state = { taskInfo: "" };

  componentWillReceiveProps(nextProps) {
    if (nextProps.taskInfo !== this.props.taskInfo) {
      this.setState({ taskInfo: nextProps.taskInfo });
    }
  }

  modifyTaskHandler = (event) => {
    this.setState({ taskInfo: event.target.value });
  };

  handleSave = () => {
    const { taskInfo } = this.state;
    this.props.onSave(taskInfo);
  };

  render() {
    return (
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                <i className="fa fa-tasks"></i>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Input
                value={this.state.taskInfo}
                changed={this.modifyTaskHandler}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-primary"
                onClick={this.handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
