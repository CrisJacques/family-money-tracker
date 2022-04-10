import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

import LoginContainer from "../styles/LoginContainer";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";

const required = (value) => {
  if (!value) {
    return (
      <div role="alert">
        This field is required!
      </div>
    );
  }
};

const Login2 = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

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
    } 
    else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/meu_perfil" />;
  }

  return (
    <LoginContainer>
      <div className="row">
        <PrimaryButton name="Login"/>
        <SecondaryButton name="Cadastrar"/>
      </div>
        <div className="row">
          <form className="col s12" onSubmit={handleLogin}>
            <div className="row">
              <InputField name="Username" id="username" type="text" placeholder="Username Here" htmlFor="username"/>
            </div>
            <div className="row">
              <InputField name="Password" id="password" type="password" placeholder="Password Here" htmlFor="password"/>
            </div>
            <div>
              <PrimaryButton name="Entrar"/>
            </div>
            {message && (
              <div>
                <div role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
    </LoginContainer>
  );
};

export default Login2;
