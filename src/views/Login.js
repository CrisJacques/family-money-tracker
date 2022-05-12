import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
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
import LoadingLoginMask from "../components/LoadingLoginMask";

/**
 * Validação que exibe uma mensagem quando o usuário deixa de preencher algum campo e clica em Entrar
 * @param {String} value - Valor preenchido no campo
 * @returns Componente com uma mensagem alertando que o campo é obrigatório (caso ele esteja vazio)
 */
const required = (value) => {
  if (!value) {
    return <RequiredFieldAlert />;
  }
};

/**
 * Tela de login
 * @returns Formulário com campos para inserir o usuário e a senha e o botão "Entrar"
 */
const Login = () => {
  /**
   * Referência para o formulário de login
   */
  const form = useRef();

  /**
   * Referência para o checkBtn, que armazena mensagens de erro no preenchimento dos campos de login
   */
  const checkBtn = useRef();

  /* ====================== Variáveis de estado para os componentes da tela ========================================== */
  /**
   * Campo "E-mail"
   */
  const [email, setEmail] = useState("");

  /**
   * Campo "Senha"
   */
  const [password, setPassword] = useState("");

  /**
   * Variável de estado para controlar a exibição da máscara de carregamento da tela quando usuário solicita o login
   */
  const [loading, setLoading] = useState(false);

  /* ====================== Dispatch das actions necessárias ========================================== */

  /**
   * Responsável por fazer o dispatch das actions relacionadas ao login
   */
  const dispatch = useDispatch();

  /* ====================== Atualizando o estado dos componentes na tela quando usuário interage com eles ========================================== */

  /**
   * Atualiza a variável de estado do campo "E-mail" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o campo
   */
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  /**
   * Atualiza a variável de estado do campo "Senha" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o campo
   */
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  /* =============================== Tentando fazer o login quando usuário clica em Entrar ========================================== */

  /**
   * Tenta fazer o login, caso não haja problemas no preenchimento do formulário. Se algum campo estiver com problemas no preenchimento, usuário será alertado. Se login não for bem sucedido, usuário também será alertado.
   * @param {Event} e - Evento de clique do usuário
   */
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

  /**
   * Gera toasts com mensagens mais amigáveis em caso de falha no login
   * @param {String} errorMessage - Mensagem de erro resultante da requisição de login
   */
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

  /* ====================== Construção da tela de login ========================================== */

  /**
   * Formulário de login com o botão "Entrar"
   */
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
      <div>{loading === true ? <LoadingLoginMask height="100vh" /> : ""}</div>
    </LoginPageContainer>
  );
};

export default Login;
