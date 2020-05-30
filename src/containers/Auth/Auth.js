import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    userForm: {
      userName: {
        elementConfig: {
          type: "text",
          placeholder: "Enter Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },

      password: {
        elementConfig: {
          type: "password",
          placeholder: "Enter Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
    isFormValid: false,
    isSignup: true,
    error: "",
    loading: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedUserForm = { ...this.state.userForm };
    const updatedFormElement = { ...updatedUserForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedUserForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedUserForm) {
      formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ userForm: updatedUserForm, isFormValid: formIsValid });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userData = {};
    for (let formElementIdentifier in this.state.userForm) {
      userData[formElementIdentifier] = this.state.userForm[
        formElementIdentifier
      ].value;
    }
    const data = {
      email: userData.userName,
      password: userData.password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBocpT4UTOvMtflk3PhCCAPi7DAA5oMz6E";
    if (!this.state.isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBocpT4UTOvMtflk3PhCCAPi7DAA5oMz6E";
    }

    axios
      .post(url, data)
      .then((response) => {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        this.props.history.replace("/toDo");
      })
      .catch((err) =>
        this.setState({
          error: err.response.data.error.message,
          loading: false,
        })
      );
  };

  switchModeHandler = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.userForm) {
      formElementsArray.push({
        id: key,
        config: this.state.userForm[key],
      });
    }

    let form = (
      <div>
        <p
          onClick={this.switchModeHandler}
          style={{
            textAlign: "center",
            cursor: "pointer",
            color: "#edc13b",
          }}
        >
          {this.state.isSignup ? "Switch To SignIn" : "Switch To SignUp"}
        </p>

        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button
          colorType="primary"
          clicked={this.formSubmitHandler}
          disabled={!this.state.isFormValid}
        >
          Submit
        </Button>

        <p style={{ textAlign: "center", color: "red" }}>{this.state.error}</p>
      </div>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return <form className="col-md-6 mx-auto">{form}</form>;
  }
}

export default Auth;
