import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Field, reduxForm } from 'redux-form';

import { login } from "../actions/auth";

import LoginPageContainer from "../styles/LoginPageContainer";
import LoginFormContainer from "../styles/LoginFormContainer";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { AppHeader } from "../components/AppHeader";



const Login2 = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login("mod", "12345678")) //username e password não estão sendo passados aqui, por isso o login não funciona
      .then(() => {
        props.history.push("/meu_perfil");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/meu_perfil" />;
  }

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <AppHeader />
        <div style={{ "text-align": "center" }}>
          <PrimaryButton name="Login" />
          <SecondaryButton name="Cadastrar" />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="firstName"
              htmlFor="firstName"
              fieldName="First Name 1"
              component={InputField}
              type="text"
              placeholder="First Name"
            />
          </div>
          <div>
            <Field
              name="lastName"
              htmlFor="firstName"
              fieldName="Last Name 1"
              component={InputField}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div style={{ "text-align": "center" }}>
            <PrimaryButton name="Entrar" />
          </div>
          {message && (
            <div>
              <div role="alert">{message}</div>
            </div>
          )}
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </form>
      </LoginFormContainer>
    </LoginPageContainer>
    
  );
};


export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(Login2);
