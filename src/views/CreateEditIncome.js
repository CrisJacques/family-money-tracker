import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageTitleContainer from "../styles/PageTitleContainer";
import InputFieldContainer from "../styles/InputFieldContainer";
import PrimaryButtonContainer from "../styles/PrimaryButtonContainer";
import SecondaryButtonContainer from "../styles/SecondaryButtonContainer";

import InputLabel from "../components/InputLabel";

import ContasService from "../services/ContasService";
import CategoriasReceitasService from "../services/CategoriasReceitasService";
import ReceitasService from "../services/ReceitasService";

/* Tela que permite o cadastro de receitas */
const CreateEditIncome = (props) => {
  /*Referência para o formulário de cadastro de receitas */
  const form = useRef();

  /* Variáveis de estado para os componentes da tela */
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");

  /* Armazenando em variáveis de estado informações vindas do backend para exibir nos comboboxes */
  const [categoriasReceitas, setCategoriasReceitas] = useState([]);
  const [contas, setContas] = useState([]);

  /* Obtendo o usuário da store e armazenando seu token para poder passar no header das requisições que serão feitas ao backend */
  const { user: currentUser } = useSelector((state) => state.auth);
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  /* ======================== Carregando informações do banco de dados para popular os comboboxes ===================================== */
  /* Carrega a lista de contas cadastradas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchAccounts = async () => {
      const resposta = await ContasService.getContas(userToken);
      setContas(resposta.data);
    };
    fetchAccounts();
  }, [currentUser, userToken]);

  /* Carrega a lista de categorias de receitas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchIncomeCategories = async () => {
      const resposta = await CategoriasReceitasService.getCategoriasReceitas(
        userToken
      );
      setCategoriasReceitas(resposta.data);
    };
    fetchIncomeCategories();
  }, [currentUser, userToken]);

  /* ======================== Cadastrando receitas através de requisições à API ===================================== */
  const insertIncome = async () => {
    try {
      const resultado = await ReceitasService.insertReceita(
        userToken,
        value,
        description,
        account,
        category,
        registerDate,
        currentUser.id
      );
      if (resultado.status === 201) {
        console.log(registerDate);
        toast.success("Receita registrada com sucesso.");

        setValue("");
        setDescription("");
        setAccount("");
        setCategory("");
        setRegisterDate("");
      } else {
        toast.warning(
          "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se o registro foi feito com sucesso."
        );
      }
    } catch (error) {
      toast.error(
        `Houve um problema ao registrar a receita. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`
      );
    }
  };

  /* ======================== Chamando a função de cadastro de receita quando usuário clica em Salvar ===================================== */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      value !== "" &&
      description !== "" &&
      registerDate !== "" &&
      account !== "" &&
      category !== ""
    ) {
      insertIncome();
    } else {
      toast.error("Todos os campos são de preenchimento obrigatório");
    }
  };

  /* ====================== Atualizando o estado dos componentes na tela quando usuário interage com eles ========================================== */
  /* Campo valor */
  const onChangeValue = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  /* Campo descrição */
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  /* Campo data */
  const onChangeRegisterDate = (e) => {
    const registerDate = e.target.value;
    setRegisterDate(registerDate);
  };

  /* Campo categoria */
  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  /* Campo conta */
  const onChangeAccount = (e) => {
    const account = e.target.value;
    setAccount(account);
  };

  /* ====================== Redirecionando para a tela inicial quando usuário clica em Cancelar ========================================== */
  const onClickCancelButton = () => {
    props.history.push("/");
    window.location.reload();
  };

  /* ====================== Inserindo lógicas de validação e formatação de campos numéricos ========================================== */
  /* Validações para campo valor, já formatando como um campo monetário, para facilitar o input pelo usuário */
  function currencyFormatter(value) {
    if (!Number(value)) return "";

    const amount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);

    return `${amount}`;
  }

  /* ====================== Construção da tela de cadastro de receitas ========================================== */
  return (
    <div>
      <PageTitleContainer>Cadastrar Receita</PageTitleContainer>
      <ToastContainer theme="colored" />
      <form onSubmit={handleSubmit} ref={form}>
        <div className="row">
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="value" name="Valor" />
              <NumberFormat
                name="value"
                value={value}
                onChange={onChangeValue}
                format={currencyFormatter}
                placeholder="Valor da receita"
              />
            </InputFieldContainer>
          </div>
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="description" name="Descrição" />
              <input
                type="text"
                name="description"
                value={description}
                onChange={onChangeDescription}
                placeholder="Descrição da receita"
              />
            </InputFieldContainer>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="account" name="Conta" />
              <select
                className="browser-default"
                name="account"
                value={account}
                onChange={onChangeAccount}
              >
                <option value="">Selecione uma conta...</option>
                {contas.map((conta) => (
                  <option key={conta.id} value={conta.id}>
                    {conta.nome}
                  </option>
                ))}
              </select>
            </InputFieldContainer>
          </div>
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="category" name="Categoria" />
              <select
                className="browser-default"
                name="category"
                value={category}
                onChange={onChangeCategory}
              >
                <option value="">Selecione uma categoria...</option>
                {categoriasReceitas.map((categoriaReceita) => (
                  <option key={categoriaReceita.id} value={categoriaReceita.id}>
                    {categoriaReceita.nome}
                  </option>
                ))}
              </select>
            </InputFieldContainer>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="registerDate" name="Data" />
              <input
                type="date"
                name="registerDate"
                value={registerDate}
                onChange={onChangeRegisterDate}
              />
            </InputFieldContainer>
          </div>
          <div className="col s12" style={{ "text-align": "right" }}>
            <SecondaryButtonContainer
              type="button"
              onClick={onClickCancelButton}
            >
              Cancelar
            </SecondaryButtonContainer>
            <PrimaryButtonContainer type="submit">
              Salvar
            </PrimaryButtonContainer>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEditIncome;
