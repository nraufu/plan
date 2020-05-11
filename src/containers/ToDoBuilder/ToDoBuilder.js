import React, { Component } from "react";
import Layout from "../../Hoc/Layout/Layout";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class ToDoBuilder extends Component {
  state = { userInput: "", valid: false };

  buttonClickHandler = () => {
    console.log(this.state.userInput);
  };

  onInputChangeHandler = (event) => {
    let userInput = event.target.value;
    userInput.length > 10
      ? this.setState({ valid: true })
      : this.setState({ valid: false });
    this.setState({ userInput: userInput });
  };

  render() {
    return (
      <Layout>
        <div className="row no-gutter">
          <div className="col-md-9">
            <Input
              value={this.state.userInput}
              changed={this.onInputChangeHandler}
            />
          </div>
          <div className="col-md-2">
            <Button
              class="info"
              valid={this.state.valid}
              clicked={this.buttonClickHandler}
            >
              Add
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ToDoBuilder;
