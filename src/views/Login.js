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
import PrimaryButtonContainer from "../styles/PrimaryButtonContainer";
import SecondaryButtonContainer from "../styles/SecondaryButtonContainer";

import LoginHeader from "../components/LoginHeader";
import RequiredFieldAlert from "../components/RequiredFieldAlert";
import InputLabel from "../components/InputLabel";

/* Validação que exibe uma mensagem quando o usuário deixa de preencher algum campo e clica em Entrar */
const required = (value) => {
  if (!value) {
    return <RequiredFieldAlert />;
  }
};

/* Tela de login */
const Login = (props) => {
  /* Referência para o formulário de login */
  const form = useRef();

  /* Referência para o checkBtn, que armazena mensagens de erro no preenchimento dos campos de login */
  const checkBtn = useRef();

  /* Variáveis de estado para os componentes da tela */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* Obtendo da store a informação de que se o usuário está logado e armazenando em uma variável */
  const { isLoggedIn } = useSelector((state) => state.auth);

  /* Obtendo da store a mensagem mais recente e armazenando em uma variável */
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  /* ====================== Atualizando o estado dos componentes na tela quando usuário interage com eles ========================================== */
  /* Campo email */
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  /* Campo senha */
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  /* =============================== Tentando fazer o login quando usuário clica em Entrar ========================================== */
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

  /* ====================== Redirecionando para a página de perfil do usuário se ele estiver logado ========================================== */
  if (isLoggedIn) {
    return <Navigate to="/meu_perfil" />;
  }

  /* ====================== Construção da tela de login ========================================== */
  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginHeader />
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

export default Login;
