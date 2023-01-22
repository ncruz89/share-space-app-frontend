import React, { useEffect, useState, useContext, Fragment } from "react";
import Button from "../../../shared/components/FormElements/Button/Button.component";
import Input from "../../../shared/components/FormElements/Input/Input.component.";
import Card from "../../../shared/components/UIElements/Card/Card.component";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal.component";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner.component";
import ImageUploader from "../../../shared/components/FormElements/ImageUpload/ImageUpload.components";

import { AuthContext } from "../../../shared/Context/auth.context";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import "./Auth.styles.css";

const INITIAL_STATE = {
  email: {
    value: "",
    isValid: false,
  },
  password: {
    value: "",
    isValid: false,
  },
};

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(INITIAL_STATE, false);

  useEffect(() => {
    setFormData(
      { ...formState.inputs, email: { value: undefined, isValid: true } },
      false
    );
  }, []);

  if (isLoginMode) {
  } else {
  }
  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const userData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(userData);
        login(userData.userId, userData.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("username", formState.inputs.username.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        console.log(formData);
        const userData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );
        login(userData.userId, userData.token);
      } catch (error) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          email: { value: undefined, isValid: true },
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <Spinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={loginSubmitHandler}>
          <Input
            elementType="input"
            id="username"
            type="text"
            label="Username"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter username"
            onInput={inputHandler}
          />

          {!isLoginMode && (
            <Input
              id="email"
              elementType="input"
              type="email"
              label="Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email"
              onInput={inputHandler}
            />
          )}

          <Input
            id="password"
            elementType="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter valid password. Must be at least 6 characters long"
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <ImageUploader
              id="image"
              center
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {!isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </Card>
    </Fragment>
  );
};

export default Auth;
