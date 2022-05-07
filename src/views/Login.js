import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "../actions/auth";

import LoginPageContainer from "../styles/LoginPageContainer";
import LoginFormContainer from "../styles/LoginFormContainer";
import InputFieldContainer from "../styles/InputFieldContainer";
import PrimaryButtonContainer from "../styles/PrimaryButtonContainer";

import LoginHeader from "../components/LoginHeader";
import RequiredFieldAlert from "../components/RequiredFieldAlert";
import InputLabel from "../components/InputLabel";
import LoadingMask from "../components/LoadingMask";

/* Validação que exibe uma mensagem quando o usuário deixa de preencher algum campo e clica em Entrar */
const required = (value) => {
  if (!value) {
    return <RequiredFieldAlert />;
  }
};

/* Tela de login */
const Login = () => {
  /* Referência para o formulário de login */
  const form = useRef();

  /* Referência para o checkBtn, que armazena mensagens de erro no preenchimento dos campos de login */
  const checkBtn = useRef();

  /* Variáveis de estado para os componentes da tela */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Variável de estado para controlar a exibição da máscara de carregamento da tela quando usuário solicita o login */
  const [loading, setLoading] = useState(false);

  /* Obtendo da store a informação de que se o usuário está logado e armazenando em uma variável */
  const { isLoggedIn } = useSelector((state) => state.auth);

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
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      setLoading(true);
      dispatch(login(email, password))
        .then(() => {
          setLoading(false);
        })
        .catch((message) => {
          setLoading(false);
          showToastMessage(message);
        });
    }
  };

  /* ======================= Traduzindo mensagens de erro no login para textos amigáveis em toasts ============================ */
  const showToastMessage = (errorMessage) => {
    if (errorMessage === "Request failed with status code 401") {
      toast.error(
        "Usuário e/ou senha incorretos. Por favor, tente novamente.",
        {
          position: "bottom-center",
        }
      );
    } else if (errorMessage === "Network Error") {
      toast.error(
        "Aplicação está indisponível no momento. Por favor, tente novamente mais tarde.",
        {
          position: "bottom-center",
        }
      );
    } else {
      toast.error(
        "Erro desconhecido no login. Por favor, verifique usuário e senha inseridos e tente novamente.",
        {
          position: "bottom-center",
        }
      );
    }
  };

  /* ====================== Redirecionando para a página de perfil do usuário se ele estiver logado ========================================== */
  if (isLoggedIn) {
    return <Navigate to="/meu_perfil" />;
  }

  /* ====================== Construção da tela de login ========================================== */
  return (
    <LoginPageContainer>
      <ToastContainer theme="colored" />
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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </LoginFormContainer>
      <div>{loading === true ? <LoadingMask /> : ""}</div>
    </LoginPageContainer>
  );
};

export default Login;
