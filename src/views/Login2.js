import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

import LoginPageContainer from "../styles/LoginPageContainer";
import LoginFormContainer from "../styles/LoginFormContainer";

import InputFieldContainer from "../styles/InputFieldContainer";
import PrimaryButtonContainer from '../styles/PrimaryButtonContainer';
import SecondaryButtonContainer from '../styles/SecondaryButtonContainer';

import LoginHeader from "../components/LoginHeader";
import RequiredFieldAlert from "../components/RequiredFieldAlert";
import InputLabel from "../components/InputLabel";
import { alphanumeric } from "validator/lib/alpha";

const required = (value) => {
  if (!value) {
    return (
      <RequiredFieldAlert />
    );
  }
};

const Login2 = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/meu_perfil");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/meu_perfil" />;
  }

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginHeader />
        <div style={{ "text-align": "center" }}>
          <PrimaryButtonContainer>Login</PrimaryButtonContainer>
          <SecondaryButtonContainer>Cadastrar</SecondaryButtonContainer>
        </div>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="row">
            <div className="input-field col s12">
              <InputLabel id="username" name="E-mail" />
              <InputFieldContainer>
                <Input
                  type="text"
                  className="validate"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </InputFieldContainer>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <InputLabel id="password" name="Senha" />
              <InputFieldContainer>
                <Input
                  type="password"
                  className="validate"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </InputFieldContainer>
            </div>
          </div>
          <div style={{ "text-align": "center" }}>
            <PrimaryButtonContainer>Entrar</PrimaryButtonContainer>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default Login2;