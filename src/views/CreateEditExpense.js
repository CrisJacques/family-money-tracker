import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';

import PageTitleContainer from "../styles/PageTitleContainer";
import InputFieldContainer from "../styles/InputFieldContainer";
import PrimaryButtonContainer from '../styles/PrimaryButtonContainer';
import SecondaryButtonContainer from '../styles/SecondaryButtonContainer';

import InputLabel from "../components/InputLabel";

import requiredValidation from "../helpers/requiredValidation";

import CategoriasDespesasService from "../services/CategoriasDespesasService";
import FormasDePagamentoService from "../services/FormasDePagamentoService";
import ContasService from "../services/ContasService";
import CartoesDeCreditoService from "../services/CartoesDeCreditoService";

const CreateEditExpense = (props) => {
  const form = useRef();

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [categoriasDespesas, setCategoriasDespesas] = useState([]);
  const [formasDePagamento, setFormasDePagamento] = useState([]);
  const [account, setAccount] = useState("");
  const [contas, setContas] = useState([]);
  const [cartoesDeCredito, setCartoesDeCredito] = useState([]);
  const [creditCard, setCreditCard] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  useEffect(() => {
    const fetchAccounts = async () => {
      const resposta = await ContasService.getContas(userToken);
      setContas(resposta.data);
    };
    fetchAccounts();
  }, [currentUser, userToken]);

  useEffect(() => {
    const fetchCreditCards = async () => {
      const resposta = await CartoesDeCreditoService.getCartoesDeCredito(userToken);
      setCartoesDeCredito(resposta.data);
    };
    fetchCreditCards();
  }, [currentUser, userToken]);

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      const resposta = await FormasDePagamentoService.getFormasDePagamento(
        userToken
      );
      const result = Object.keys(resposta.data).map((key) => [
        resposta.data[key],
      ]);
      setFormasDePagamento(result);
    };
    fetchPaymentTypes();
  }, [currentUser, userToken]);

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      const resposta = await CategoriasDespesasService.getCategoriasDespesas(
        userToken
      );
      setCategoriasDespesas(resposta.data);
    };
    fetchExpenseCategories();
  }, [currentUser, userToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.current.validateAll();
    alert(value);
    alert(description);
  };

  const onChangeValue = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onChangeRegisterDate = (e) => {
    const registerDate = e.target.value;
    setRegisterDate(registerDate);
  };

  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const onChangePaymentType = (e) => {
    const paymentType = e.target.value;
    if (e.target.value !== "") {
      console.log(formasDePagamento[e.target.value][0].descricao);
    }
    setPaymentType(paymentType);
  };

  const onChangeCreditCard = (e) => {
    const creditCard = e.target.value;
    setCreditCard(creditCard);
  };

  const onChangeAccount = (e) => {
    const account = e.target.value;
    setAccount(account);
  };

  const onClickCancelButton = () => {
    props.history.push("/");
    window.location.reload();
  };

  function currencyFormatter(value) {
    if (!Number(value)) return "";

    const amount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);

    return `${amount}`;
  }

  return (
    <div>
      <PageTitleContainer>Cadastrar Despesa</PageTitleContainer>
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
                placeholder="Valor da despesa"
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
                placeholder="Descrição da despesa"
              />
            </InputFieldContainer>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="paymentType" name="Forma de pagamento" />
              <select
                className="browser-default"
                name="paymentType"
                value={paymentType}
                onChange={onChangePaymentType}
              >
                <option value="">Selecione uma forma de pagamento...</option>
                {formasDePagamento.map((formaDePagamento) => (
                  <option
                    key={formaDePagamento[0].cod}
                    value={formaDePagamento[0].cod}
                  >
                    {formaDePagamento[0].descricao}
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
                validations={[requiredValidation]}
              >
                <option value="">Selecione uma categoria...</option>
                {categoriasDespesas.map((categoriaDespesa) => (
                  <option key={categoriaDespesa.id} value={categoriaDespesa.id}>
                    {categoriaDespesa.nome}
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
        </div>
        <div className="row">
        <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="creditCard" name="Cartão de Crédito" />
              <select
                className="browser-default"
                name="creditCard"
                value={creditCard}
                onChange={onChangeCreditCard}
              >
                <option value="">Selecione um cartão de crédito...</option>
                {cartoesDeCredito.map((cartaoDeCredito) => (
                  <option key={cartaoDeCredito.id} value={cartaoDeCredito.id}>
                    {cartaoDeCredito.nome}
                  </option>
                ))}
              </select>
            </InputFieldContainer>
          </div>
        </div>
        <div className="row">
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

export default CreateEditExpense;