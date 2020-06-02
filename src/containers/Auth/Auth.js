import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../redux/actions/index";

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

    this.props.onAuth(data, this.state.isSignup);
    this.props.onSetPath("/");
  };

  switchModeHandler = () => {
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
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

        <p style={{ textAlign: "center", color: "red" }}>
          {this.props.error ? this.props.error.message : null}
        </p>
      </div>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div>
        {authRedirect}
        <form className="col-md-6 mx-auto">{form}</form>;
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (authData, isSignup) => dispatch(actions.auth(authData, isSignup)),
    onSetPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
