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
import BancosService from "../services/BancosService";
import DespesasDebitoDinheiroService from "../services/DespesasDebitoDinheiroService";
import DespesasCreditoService from "../services/DespesasCreditoService";

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
  const [bancos, setBancos] = useState([]);
  const [bank, setBank] = useState("");
  const [numberInstallments, setNumberInstallments] = useState("");
  const [exibirConta, setExibirConta] = useState(false);
  const [exibirCartaoCredito, setExibirCartaoCredito] = useState(false);
  const [exibirBanco, setExibirBanco] = useState(false);
  const [exibirNumParcelas, setExibirNumParcelas] = useState(false);

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
      const resposta = await CartoesDeCreditoService.getCartoesDeCredito(
        userToken
      );
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
    const fetchBanks = async () => {
      const resposta = await BancosService.getBancos(userToken);
      const result = Object.keys(resposta.data).map((key) => [
        resposta.data[key],
      ]);
      setBancos(result);
    };
    fetchBanks();
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

  const insertExpenseCreditCard = async () => {
    try {
      const resultado = await DespesasCreditoService.insertDespesaCredito(
        userToken,
        value,
        description,
        creditCard,
        numberInstallments,
        category,
        registerDate,
        paymentType,
        currentUser.id
      );
      if (resultado.status === 201) {
        toast.success("Despesa registrada com sucesso.");

        setValue("");
        setDescription("");
        setPaymentType("");
        setCategory("");
        setCreditCard("");
        setNumberInstallments("");
        setRegisterDate("");       
    }else{
      toast.warning(
        "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se o registro foi feito com sucesso."
      );
    }
   }
    catch (error) {
      toast.error(
        `Houve um problema ao registrar a receita. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`
      );
    }
  };

  const insertExpenseDebitCash = async () => {
    try {
      const resultado = await DespesasDebitoDinheiroService.insertDespesaDebitoDinheiro(
        userToken,
        value,
        description,
        account,
        category,
        registerDate,
        paymentType,
        currentUser.id
      );
      if (resultado.status === 201) {
        toast.success("Despesa registrada com sucesso.");

        setValue("");
        setDescription("");
        setPaymentType("");
        setCategory("");
        setRegisterDate("");
        setAccount("");        
    }else{
      toast.warning(
        "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se o registro foi feito com sucesso."
      );
    }
   }
    catch (error) {
      toast.error(
        `Houve um problema ao registrar a receita. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentType === "") {
      toast.error("Todos os campos são de preenchimento obrigatório");
    } else{
      const opcaoFormaPagamento = formasDePagamento[paymentType][0].descricao;
      if(opcaoFormaPagamento === "Dinheiro" || opcaoFormaPagamento === "Débito"){
        if (value !== "" && description !== "" && paymentType !== "" && category !== "" && registerDate !== "" && account !== "" ){
          insertExpenseDebitCash();
        }else{
          toast.error("Todos os campos são de preenchimento obrigatório");
        }
      } else if(opcaoFormaPagamento === "Cartão de Crédito"){
        if (value !== "" && description !== "" && paymentType !== "" && category !== "" && creditCard !== "" && numberInstallments !== "" && registerDate !== "" ){
          insertExpenseCreditCard();
        }else{
          toast.error("Todos os campos são de preenchimento obrigatório");
        }
      } else{
        alert("selecionou financiamento ou empréstimo");
      }
    }
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
      const opcaoFormaPagamento = formasDePagamento[e.target.value][0].descricao;
      if(opcaoFormaPagamento === "Dinheiro" || opcaoFormaPagamento === "Débito"){
        setExibirConta(true);
        setExibirCartaoCredito(false);
        setExibirBanco(false);
        setExibirNumParcelas(false);
      } else if(opcaoFormaPagamento === "Cartão de Crédito"){
        setExibirConta(false);
        setExibirCartaoCredito(true);
        setExibirBanco(false);
        setExibirNumParcelas(true);
      } else{
        setExibirConta(false);
        setExibirCartaoCredito(false);
        setExibirBanco(true);
        setExibirNumParcelas(true);
      }
    }else{
      setExibirConta(false);
      setExibirCartaoCredito(false);
      setExibirBanco(false);
      setExibirNumParcelas(false);
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

  const onChangeBank = (e) => {
    const bank = e.target.value;
    setBank(bank);
  };

  const onChangeNumberInstallments = (e) => {
    const numberInstallments = e.target.value;
    setNumberInstallments(numberInstallments);
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

  function numberFormatter(value) {
    if (!Number(value)) {
      return "";
    } else {
      return value;
    }
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
        {exibirNumParcelas && <div className="row">
          {exibirCartaoCredito && <div className="col s12 l6">
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
          </div>}
          {exibirBanco && <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="bank" name="Banco" />
              <select
                className="browser-default"
                name="bank"
                value={bank}
                onChange={onChangeBank}
              >
                <option value="">Selecione um banco...</option>
                {bancos.map((banco) => (
                  <option key={banco[0].cod} value={banco[0].cod}>
                    {banco[0].descricao}
                  </option>
                ))}
              </select>
            </InputFieldContainer>
          </div>}
          {exibirNumParcelas && 
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="numberInstallments" name="Número de parcelas" />
              <NumberFormat
                name="numberInstallments"
                value={numberInstallments}
                onChange={onChangeNumberInstallments}
                format={numberFormatter}
                placeholder="Digite o número de parcelas da despesa"
              />
            </InputFieldContainer>
          </div>}
        </div>}
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
          {exibirConta && <div className="col s12 l6">
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
          </div>}
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