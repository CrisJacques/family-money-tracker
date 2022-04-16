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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
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
      dispatch(login(email, password))
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
            <div className="col s12">
              <InputFieldContainer>
                <InputLabel id="email" name="E-mail" />
                <Input
                  type="email"
                  className="validate"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]}
                />
              </InputFieldContainer>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <InputFieldContainer>
                <InputLabel id="password" name="Senha" />
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