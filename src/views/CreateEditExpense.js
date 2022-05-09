import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageTitleContainer from "../styles/PageTitleContainer";
import InputFieldContainer from "../styles/InputFieldContainer";
import PrimaryButtonContainer from "../styles/PrimaryButtonContainer";
import SecondaryButtonContainer from "../styles/SecondaryButtonContainer";
import WholePageContainer from "../styles/WholePageContainer";

import InputLabel from "../components/InputLabel";
import LoadingMask from "../components/LoadingMask";

import CategoriasDespesasService from "../services/CategoriasDespesasService";
import FormasDePagamentoService from "../services/FormasDePagamentoService";
import ContasService from "../services/ContasService";
import CartoesDeCreditoService from "../services/CartoesDeCreditoService";
import BancosService from "../services/BancosService";
import DespesasDebitoDinheiroService from "../services/DespesasDebitoDinheiroService";
import DespesasCreditoService from "../services/DespesasCreditoService";
import DespesasFinanciamentoEmprestimoService from "../services/DespesasFinanciamentoEmprestimoService";

/* Tela que permite o cadastro de despesas */
const CreateEditExpense = (props) => {
  /*Referência para o formulário de cadastro de despesas */
  const form = useRef();

  /* Variáveis de estado para os componentes da tela */
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [account, setAccount] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [bank, setBank] = useState("");
  const [numberInstallments, setNumberInstallments] = useState("");

  /* Variável de estado para controlar a exibição da máscara de carregamento da tela quando usuário salva um novo registro */
  const [loading, setLoading] = useState(false);

  /* Armazenando em variáveis de estado informações vindas do backend para exibir nos comboboxes */
  const [categoriasDespesas, setCategoriasDespesas] = useState([]);
  const [formasDePagamento, setFormasDePagamento] = useState([]);
  const [contas, setContas] = useState([]);
  const [cartoesDeCredito, setCartoesDeCredito] = useState([]);
  const [bancos, setBancos] = useState([]);

  /* Criando variáveis de estado para armazenar a decisão de quando exibir ou não determinados campos do formulário, de acordo com a forma de pagamento escolhida */
  const [exibirConta, setExibirConta] = useState(false);
  const [exibirCartaoCredito, setExibirCartaoCredito] = useState(false);
  const [exibirBanco, setExibirBanco] = useState(false);
  const [exibirNumParcelas, setExibirNumParcelas] = useState(false);

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

  /* Carrega a lista de cartões de crédito cadastrados cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchCreditCards = async () => {
      const resposta = await CartoesDeCreditoService.getCartoesDeCredito(
        userToken
      );
      setCartoesDeCredito(resposta.data);
    };
    fetchCreditCards();
  }, [currentUser, userToken]);

  /* Carrega a lista de formas de pagamento cadastradas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const resposta = await FormasDePagamentoService.getFormasDePagamento(
          userToken
        );
        const result = Object.keys(resposta.data).map((key) => [
          resposta.data[key],
        ]);
        setFormasDePagamento(result);
      } catch (error) { // Só é preciso fazer a verificação de sessão expirada no carregamento de um dos comboboxes, pois se der erro em um, dará em todos. Assim, é evitada a exibição de vários toasts com o mesmo erro para o usuário. Foi escolhido o combobox de forma de pagamento pois ele sempre está presente logo que a tela é carregada, independentemente da forma de pagamento escolhida.
        toast.error("Sessão expirada. Por favor, faça login novamente.", {
          position: "bottom-center",
        });
      }
    };
    fetchPaymentTypes();
  }, [currentUser, userToken]);

  /* Carrega a lista de bancos cadastrados cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
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

  /* Carrega a lista de categorias de despesas cadastradas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchExpenseCategories = async () => {
      const resposta = await CategoriasDespesasService.getCategoriasDespesas(
        userToken
      );
      setCategoriasDespesas(resposta.data);
    };
    fetchExpenseCategories();
  }, [currentUser, userToken]);

  /* ======================== Cadastrando despesas através de requisições à API ===================================== */
  /* Cadastra uma nova despesa cuja forma de pagamento é financiamento ou empréstimo */
  const insertExpenseFinancingLoan = async () => {
    try {
      setLoading(true);
      const resultado =
        await DespesasFinanciamentoEmprestimoService.insertDespesaFinanciamentoEmprestimo(
          userToken,
          value,
          description,
          bank,
          numberInstallments,
          category,
          registerDate,
          paymentType,
          currentUser.id
        );
      if (resultado.status === 201) {
        setLoading(false);
        toast.success("Despesa registrada com sucesso.", {
          position: "bottom-center",
        });

        /* Se despesa é registrada com sucesso, limpa todos os campos da tela para facilitar a inserção de novas despesas */
        setValue("");
        setDescription("");
        setPaymentType("");
        setCategory("");
        setBank("");
        setNumberInstallments("");
        setRegisterDate("");

        /* Esconde novamente os campos específicos desta forma de pagamento, voltando o formulário ao estado original */
        setExibirNumParcelas(false);
        setExibirBanco(false);
      } else {
        setLoading(false);
        toast.warning(
          "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se o registro foi feito com sucesso.",
          {
            position: "bottom-center",
          }
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        `Houve um problema ao registrar a despesa. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`,
        {
          position: "bottom-center",
        }
      );
    }
  };

  /* Cadastra uma nova despesa cuja forma de pagamento é cartão de crédito */
  const insertExpenseCreditCard = async () => {
    try {
      setLoading(true);
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
        setLoading(false);
        toast.success("Despesa registrada com sucesso.", {
          position: "bottom-center",
        });

        /* Se despesa é registrada com sucesso, limpa todos os campos da tela para facilitar a inserção de novas despesas */
        setValue("");
        setDescription("");
        setPaymentType("");
        setCategory("");
        setCreditCard("");
        setNumberInstallments("");
        setRegisterDate("");

        /* Esconde novamente os campos específicos desta forma de pagamento, voltando o formulário ao estado original */
        setExibirNumParcelas(false);
        setExibirCartaoCredito(false);
      } else {
        setLoading(false);
        toast.warning(
          "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se o registro foi feito com sucesso.",
          {
            position: "bottom-center",
          }
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        `Houve um problema ao registrar a despesa. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`,
        {
          position: "bottom-center",
        }
      );
    }
  };

  /* Cadastra uma nova despesa cuja forma de pagamento é dinheiro ou débito */
  const insertExpenseDebitCash = async () => {
    try {
      setLoading(true);
      const resultado =
        await DespesasDebitoDinheiroService.insertDespesaDebitoDinheiro(
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
        setLoading(false);
        toast.success("Despesa registrada com sucesso.", {
          position: "bottom-center",
        });

        /* Se despesa é registrada com sucesso, limpa todos os campos da tela para facilitar a inserção de novas despesas */
        setValue("");
        setDescription("");
        setPaymentType("");
        setCategory("");
        setRegisterDate("");
        setAccount("");

        /* Esconde novamente o campo específico desta forma de pagamento, voltando o formulário ao estado original */
        setExibirConta(false);
      } else {
        setLoading(false);
        toast.warning(
          "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se o registro foi feito com sucesso.",
          {
            position: "bottom-center",
          }
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        `Houve um problema ao registrar a despesa. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`,
        {
          position: "bottom-center",
        }
      );
    }
  };

  /* ================ Chamando a função de cadastro de despesa de acordo com a forma de pagamento escolhida quando usuário clica em Salvar ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentType === "") {
      toast.error("Todos os campos são de preenchimento obrigatório", {
        position: "bottom-center",
      });
    } else {
      const opcaoFormaPagamento = formasDePagamento[paymentType][0].descricao;
      if (
        opcaoFormaPagamento === "Dinheiro" ||
        opcaoFormaPagamento === "Débito"
      ) {
        if (
          value !== "" &&
          description !== "" &&
          paymentType !== "" &&
          category !== "" &&
          registerDate !== "" &&
          account !== ""
        ) {
          insertExpenseDebitCash();
        } else {
          toast.error("Todos os campos são de preenchimento obrigatório", {
            position: "bottom-center",
          });
        }
      } else if (opcaoFormaPagamento === "Cartão de Crédito") {
        if (
          value !== "" &&
          description !== "" &&
          paymentType !== "" &&
          category !== "" &&
          creditCard !== "" &&
          numberInstallments !== "" &&
          registerDate !== ""
        ) {
          insertExpenseCreditCard();
        } else {
          toast.error("Todos os campos são de preenchimento obrigatório", {
            position: "bottom-center",
          });
        }
      } else {
        if (
          value !== "" &&
          description !== "" &&
          paymentType !== "" &&
          category !== "" &&
          bank !== "" &&
          numberInstallments !== "" &&
          registerDate !== ""
        ) {
          insertExpenseFinancingLoan();
        } else {
          toast.error("Todos os campos são de preenchimento obrigatório", {
            position: "bottom-center",
          });
        }
      }
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

  /* Campo forma de pagamento, que contém lógica para esconder e exibir campos de formulário de acordo com a forma de pagamento selecionada */
  const onChangePaymentType = (e) => {
    const paymentType = e.target.value;
    if (e.target.value !== "") {
      const opcaoFormaPagamento =
        formasDePagamento[e.target.value][0].descricao;
      if (
        opcaoFormaPagamento === "Dinheiro" ||
        opcaoFormaPagamento === "Débito"
      ) {
        setExibirConta(true);
        setExibirCartaoCredito(false);
        setExibirBanco(false);
        setExibirNumParcelas(false);
      } else if (opcaoFormaPagamento === "Cartão de Crédito") {
        setExibirConta(false);
        setExibirCartaoCredito(true);
        setExibirBanco(false);
        setExibirNumParcelas(true);
      } else {
        setExibirConta(false);
        setExibirCartaoCredito(false);
        setExibirBanco(true);
        setExibirNumParcelas(true);
      }
    } else {
      setExibirConta(false);
      setExibirCartaoCredito(false);
      setExibirBanco(false);
      setExibirNumParcelas(false);
    }
    setPaymentType(paymentType);
  };

  /* Campo cartão de crédito */
  const onChangeCreditCard = (e) => {
    const creditCard = e.target.value;
    setCreditCard(creditCard);
  };

  /* Campo conta */
  const onChangeAccount = (e) => {
    const account = e.target.value;
    setAccount(account);
  };

  /* Campo banco */
  const onChangeBank = (e) => {
    const bank = e.target.value;
    setBank(bank);
  };

  /* Campo número de parcelas */
  const onChangeNumberInstallments = (e) => {
    const numberInstallments = e.target.value;
    setNumberInstallments(numberInstallments);
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

  /* Validação para aceitar apenas números inteiros, no campo número de parcelas */
  function numberFormatter(value) {
    if (!Number(value)) {
      return "";
    } else {
      return value;
    }
  }

  /* ====================== Construção da tela de cadastro de despesas ========================================== */
  return (
    <div>
      <WholePageContainer>
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
                >
                  <option value="">Selecione uma categoria...</option>
                  {categoriasDespesas.map((categoriaDespesa) => (
                    <option
                      key={categoriaDespesa.id}
                      value={categoriaDespesa.id}
                    >
                      {categoriaDespesa.nome}
                    </option>
                  ))}
                </select>
              </InputFieldContainer>
            </div>
          </div>
          {exibirNumParcelas && (
            <div className="row">
              {exibirCartaoCredito && (
                <div className="col s12 l6">
                  <InputFieldContainer>
                    <InputLabel id="creditCard" name="Cartão de Crédito" />
                    <select
                      className="browser-default"
                      name="creditCard"
                      value={creditCard}
                      onChange={onChangeCreditCard}
                    >
                      <option value="">
                        Selecione um cartão de crédito...
                      </option>
                      {cartoesDeCredito.map((cartaoDeCredito) => (
                        <option
                          key={cartaoDeCredito.id}
                          value={cartaoDeCredito.id}
                        >
                          {cartaoDeCredito.nome}
                        </option>
                      ))}
                    </select>
                  </InputFieldContainer>
                </div>
              )}
              {exibirBanco && (
                <div className="col s12 l6">
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
                </div>
              )}
              {exibirNumParcelas && (
                <div className="col s12 l6">
                  <InputFieldContainer>
                    <InputLabel
                      id="numberInstallments"
                      name="Número de parcelas"
                    />
                    <NumberFormat
                      name="numberInstallments"
                      value={numberInstallments}
                      onChange={onChangeNumberInstallments}
                      format={numberFormatter}
                      placeholder="Digite o número de parcelas da despesa"
                    />
                  </InputFieldContainer>
                </div>
              )}
            </div>
          )}
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
            {exibirConta && (
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
            )}
          </div>
          <div className="row">
            <div className="col s12" style={{ "text-align": "right" }}>
              <SecondaryButtonContainer>
                <Link to={"/"} style={{ color: "#00675b" }}>
                  Cancelar
                </Link>
              </SecondaryButtonContainer>
              <PrimaryButtonContainer type="submit">
                Salvar
              </PrimaryButtonContainer>
            </div>
          </div>
        </form>
      </WholePageContainer>
      <div>{loading === true ? <LoadingMask /> : ""}</div>
    </div>
  );
};

export default CreateEditExpense;
