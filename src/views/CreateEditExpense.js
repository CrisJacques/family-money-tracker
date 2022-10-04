import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
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

import { MAX_DESCRIPTION_LENGTH } from "../helpers/generalRules";

/**
 * Tela que permite o cadastro e edição de despesas (quando tela for carregada no modo edição, parte dos valores a serem exibidos serão passados pela tela que estiver fazendo a chamada)
 * @returns Formulário de cadastro ou edição de despesas, com os botões "Salvar" e "Cancelar"
 */
const CreateEditExpense = () => {
  /* =========== Obtendo o usuário da store e armazenando seu token para poder passar no header das requisições que serão feitas ao backend =============== */

  /**
   * Armazenando as informações do usuário logado em uma variável
   */
  const { user: currentUser } = useSelector((state) => state.auth);

  /**
   * Unindo o tipo do token com o seu valor para ser utilizado no header das requisições
   */
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  /* ======================== Configurando o valor inicial dos campos quando tela é aberta ===================================== */
  // Campos que existem em qualquer tipo de despesa
  var valorInicial = ""; //Valor da despesa
  var descricaoInicial = ""; //Descrição da despesa
  var dataInicial = ""; //Data da despesa
  var categoriaInicial = ""; //Categoria da despesa
  var formaDePagamentoInicial = ""; //Forma de pagamento da despesa

  // Campos que só existem em tipos de despesa específicos
  var contaInicial = ""; // Forma de pagamento débito ou dinheiro
  var cartaoDeCreditoInicial = ""; // Forma de pagamento cartão de crédito
  var bancoInicial = ""; // Forma de pagamento financiamento ou empréstimo
  var numParcelasInicial = ""; // Forma de pagamento cartão de crédito, financiamento ou empréstimo

  // Decidindo que campos devem ser exibidos quando a tela é aberta
  var exibirContaQuandoAbreTela = false;
  var exibirCartaoCreditoQuandoAbreTela = false;
  var exibirBancoQuandoAbreTela = false;
  var exibirNumParcelasQuandoAbreTela = false;

  /**
   * Se o valor do location.state não for null, siginifica que a tela está sendo aberta no modo edição (pois o location.state armazena parte das informações da despesa que deve ser editada)
   */
  const location = useLocation();
  if (location.state != null) {
    valorInicial = currencyFormatter(location.state.valorTela * 100); // é preciso multiplicar por 100 porque o currencyFormatter divide o valor passado por parâmetro por 100
    descricaoInicial = location.state.descricaoTela;

    var dia = location.state.dataTela.split("-")[0];
    var mes = location.state.dataTela.split("-")[1];
    var ano = location.state.dataTela.split("-")[2];
    dataInicial = `${ano}-${mes}-${dia}`;

    categoriaInicial = location.state.idCategoriaTela;
    formaDePagamentoInicial = location.state.idFormaDePagamentoTela;

    var id = location.state.idDespesa;
  }

  /* ======================== Variáveis de estado para os componentes da tela ===================================== */

  /**
   * Referência para o formulário de cadastro de despesas
   */
  const form = useRef();

  /**
   * Campo "Valor"
   */
  const [value, setValue] = useState(valorInicial);

  /**
   * Campo "Descrição"
   */
  const [description, setDescription] = useState(descricaoInicial);

  /**
   * Campo "Data"
   */
  const [registerDate, setRegisterDate] = useState(dataInicial);

  /**
   * Combobox "Categoria"
   */
  const [category, setCategory] = useState(categoriaInicial);

  /**
   * Combobox "Forma de Pagamento"
   */
  const [paymentType, setPaymentType] = useState(formaDePagamentoInicial);

  /**
   * Combobox "Conta"
   */
  const [account, setAccount] = useState(contaInicial);

  /**
   * Combobox "Cartão de crédito"
   */
  const [creditCard, setCreditCard] = useState(cartaoDeCreditoInicial);

  /**
   * Combobox "Banco"
   */
  const [bank, setBank] = useState(bancoInicial);

  /**
   * Campo "Número de parcelas"
   */
  const [numberInstallments, setNumberInstallments] =
    useState(numParcelasInicial);

  /**
   * Variável de estado para controlar a exibição da máscara de carregamento da tela quando usuário salva um novo registro
   */
  const [loading, setLoading] = useState(false);

  /* ======================== Armazenando em variáveis de estado informações vindas do backend para exibir nos comboboxes ===================================== */

  /**
   * Lista de categorias de despesas
   */
  const [categoriasDespesas, setCategoriasDespesas] = useState([]);

  /**
   * Lista de formas de pagamento
   */
  const [formasDePagamento, setFormasDePagamento] = useState([]);

  /**
   * Lista de contas
   */
  const [contas, setContas] = useState([]);

  /**
   * Lista de cartões de crédito
   */
  const [cartoesDeCredito, setCartoesDeCredito] = useState([]);

  /**
   * Lista de bancos
   */
  const [bancos, setBancos] = useState([]);

  /* ==== Criando variáveis de estado para armazenar a decisão de quando exibir ou não determinados campos do formulário, de acordo com a forma de pagamento escolhida ===== */

  /**
   * Exibir ou não o campo "Conta"
   */
  const [exibirConta, setExibirConta] = useState(exibirContaQuandoAbreTela);

  /**
   * Exibir ou não o campo "Cartão de crédito"
   */
  const [exibirCartaoCredito, setExibirCartaoCredito] = useState(
    exibirCartaoCreditoQuandoAbreTela
  );

  /**
   * Exibir ou não o campo "Banco"
   */
  const [exibirBanco, setExibirBanco] = useState(exibirBancoQuandoAbreTela);

  /**
   * Exibir ou não o campo "Número de parcelas"
   */
  const [exibirNumParcelas, setExibirNumParcelas] = useState(
    exibirNumParcelasQuandoAbreTela
  );

  /* ==================== Decidindo que campos devem ser exibidos de acordo com o tipo de despesa quando a tela é aberta em modo de edição ================================= */
  // Se o valor do location.state não for null, siginifica que a tela está sendo aberta no modo edição (pois o location.state armazena parte das informações da despesa que deve ser editada)
  useEffect(() => {
    if (location.state != null) {
      switch (location.state.nomeFormaDePagamentoTela) {
        case "DINHEIRO":
          setExibirConta(true);
          const fetchDespesaDinheiro = async () => {
            const respostaDespesa =
              await DespesasDebitoDinheiroService.getDespesaDebitoDinheiro(
                userToken,
                id
              );
            setAccount(respostaDespesa.data.conta.id); // selecionando no combobox "Conta" a opção de conta da despesa que está sendo editada
          };
          fetchDespesaDinheiro();
          break;
        case "DEBITO":
          setExibirConta(true);
          const fetchDespesaDebito = async () => {
            const respostaDespesa =
              await DespesasDebitoDinheiroService.getDespesaDebitoDinheiro(
                userToken,
                id
              );
            setAccount(respostaDespesa.data.conta.id); // selecionando no combobox "Conta" a opção de conta da despesa que está sendo editada
          };
          fetchDespesaDebito();
          break;
        case "CARTAO_DE_CREDITO":
          setExibirCartaoCredito(true);
          setExibirNumParcelas(true);
          const fetchDespesaCredito = async () => {
            const respostaDespesa =
              await DespesasCreditoService.getDespesaCredito(userToken, id);
            setCreditCard(respostaDespesa.data.cartaoDeCredito.id); // selecionando no combobox "Cartão de Crédito" a opção de cartão de crédito da despesa que está sendo editada
            setNumberInstallments(respostaDespesa.data.numeroParcelas); // inserindo no campo "Número de parcelas" o número de parcelas da despesa que está sendo editada
          };
          fetchDespesaCredito();
          break;
        case "FINANCIAMENTO":
          setExibirBanco(true);
          setExibirNumParcelas(true);
          const fetchDespesaFinanciamento = async () => {
            const respostaDespesa =
              await DespesasFinanciamentoEmprestimoService.getDespesaFinanciamentoEmprestimo(
                userToken,
                id
              );
            setNumberInstallments(respostaDespesa.data.numeroParcelas); // inserindo no campo "Número de parcelas" o número de parcelas da despesa que está sendo editada
            switch (respostaDespesa.data.banco) {
              case "BANCO_DO_BRASIL":
                setBank(0);
                break;
              case "CAIXA":
                setBank(1);
                break;
              case "ITAU":
                setBank(2);
                break;
              case "SANTANDER":
                setBank(3);
                break;
              case "BRADESCO":
                setBank(4);
                break;
              default:
                setBank(5);
            }
          };
          fetchDespesaFinanciamento();
          break;
        case "EMPRESTIMO":
          setExibirBanco(true);
          setExibirNumParcelas(true);
          const fetchDespesaEmprestimo = async () => {
            const respostaDespesa =
              await DespesasFinanciamentoEmprestimoService.getDespesaFinanciamentoEmprestimo(
                userToken,
                id
              );
            setNumberInstallments(respostaDespesa.data.numeroParcelas); // inserindo no campo "Número de parcelas" o número de parcelas da despesa que está sendo editada
            switch (respostaDespesa.data.banco) {
              case "BANCO_DO_BRASIL":
                setBank(0);
                break;
              case "CAIXA":
                setBank(1);
                break;
              case "ITAU":
                setBank(2);
                break;
              case "SANTANDER":
                setBank(3);
                break;
              case "BRADESCO":
                setBank(4);
                break;
              default:
                setBank(5);
            }
          };
          fetchDespesaEmprestimo();
          break;
        default:
      }
    }
  }, [location.state, id, userToken]);

  /* ======================== Carregando informações do banco de dados para popular os comboboxes ===================================== */

  /**
   * Carrega a lista de contas cadastradas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor
   */
  useEffect(() => {
    const fetchAccounts = async () => {
      const resposta = await ContasService.getContas(userToken);
      setContas(resposta.data);
    };
    fetchAccounts();
  }, [currentUser, userToken]);

  /**
   * Carrega a lista de cartões de crédito cadastrados cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor
   */
  useEffect(() => {
    const fetchCreditCards = async () => {
      const resposta = await CartoesDeCreditoService.getCartoesDeCredito(
        userToken
      );
      setCartoesDeCredito(resposta.data);
    };
    fetchCreditCards();
  }, [currentUser, userToken]);

  /**
   * Carrega a lista de formas de pagamento cadastradas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor
   */
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
      } catch (error) {
        // Só é preciso fazer a verificação de sessão expirada no carregamento de um dos comboboxes, pois se der erro em um, dará em todos. Assim, é evitada a exibição de vários toasts com o mesmo erro para o usuário. Foi escolhido o combobox de forma de pagamento pois ele sempre está presente logo que a tela é carregada, independentemente da forma de pagamento escolhida.
        toast.error("Sessão expirada. Por favor, faça login novamente.", {
          position: "bottom-center",
        });
      }
    };
    fetchPaymentTypes();
  }, [currentUser, userToken]);

  /**
   * Carrega a lista de bancos cadastrados cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor
   */
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

  /**
   * Carrega a lista de categorias de despesas cadastradas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor
   */
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

  /**
   * Cadastra uma despesa cuja forma de pagamento é financiamento ou empréstimo
   */
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

  /**
   * Cadastra uma despesa cuja forma de pagamento é cartão de crédito
   */
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

  /**
   * Cadastra uma despesa cuja forma de pagamento é dinheiro ou débito
   */
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

  /**
   * Edita uma despesa cuja forma de pagamento é dinheiro ou débito
   */
  const editExpenseDebitCash = async () => {
    try {
      setLoading(true);
      const resultado =
        await DespesasDebitoDinheiroService.updateDespesaDebitoDinheiro(
          id,
          userToken,
          value,
          description,
          account,
          category,
          registerDate,
          paymentType,
          location.state.nomeFormaDePagamentoTela,
          currentUser.id
        );
      if (resultado.status === 204 || resultado.status === 201) {
        setLoading(false);
        toast.success("Despesa alterada com sucesso.", {
          position: "bottom-center",
        });

        /* Se despesa é alterada com sucesso, limpa todos os campos da tela para facilitar a inserção de novas despesas */
        setValue("");
        setDescription("");
        setPaymentType("");
        setCategory("");
        setRegisterDate("");
        setAccount("");

        /* Esconde novamente o campo específico desta forma de pagamento, voltando o formulário ao estado original */
        setExibirConta(false);
        location.state = null; //esvaziando o location.state para que a tela entre no modo de cadastro de nova despesa
      } else {
        setLoading(false);
        toast.warning(
          "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se a alteração foi feita com sucesso.",
          {
            position: "bottom-center",
          }
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        `Houve um problema ao alterar a despesa. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`,
        {
          position: "bottom-center",
        }
      );
    }
  };

  /**
   * Edita uma despesa cuja forma de pagamento é Financiamento ou Empréstimo
   */
  const editExpenseFinancingLoan = async () => {
    try {
      setLoading(true);
      const resultado =
        await DespesasFinanciamentoEmprestimoService.updateDespesaFinanciamentoEmprestimo(
          id,
          userToken,
          value,
          description,
          bank,
          numberInstallments,
          category,
          registerDate,
          paymentType,
          location.state.nomeFormaDePagamentoTela,
          currentUser.id
        );
      if (resultado.status === 204 || resultado.status === 201) {
        setLoading(false);
        toast.success("Despesa alterada com sucesso.", {
          position: "bottom-center",
        });

        /* Se despesa é alterada com sucesso, limpa todos os campos da tela para facilitar a inserção de novas despesas */
        setValue("");
        setDescription("");
        setPaymentType("");
        setCategory("");
        setRegisterDate("");
        setBank("");
        setNumberInstallments("");

        /* Esconde novamente os campos específicos desta forma de pagamento, voltando o formulário ao estado original */
        setExibirBanco(false);
        setExibirNumParcelas(false);
        location.state = null; //esvaziando o location.state para que a tela entre no modo de cadastro de nova despesa
      } else {
        setLoading(false);
        toast.warning(
          "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se a alteração foi feita com sucesso.",
          {
            position: "bottom-center",
          }
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        `Houve um problema ao alterar a despesa. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`,
        {
          position: "bottom-center",
        }
      );
    }
  };
  /**
   * Edita uma despesa cuja forma de pagamento é cartão de crédito
   */
  const editExpenseCredit = async () => {
    try {
      setLoading(true);
      const resultado = await DespesasCreditoService.updateDespesaCredito(
        id,
        userToken,
        value,
        description,
        creditCard,
        numberInstallments,
        category,
        registerDate,
        paymentType,
        location.state.nomeFormaDePagamentoTela,
        currentUser.id
      );
      if (resultado.status === 204 || resultado.status === 201) {
        setLoading(false);
        toast.success("Despesa alterada com sucesso.", {
          position: "bottom-center",
        });

        /* Se despesa é alterada com sucesso, limpa todos os campos da tela para facilitar a inserção de novas despesas */
        setValue("");
        setDescription("");
        setPaymentType("");
        setCategory("");
        setRegisterDate("");
        setCreditCard("");
        setNumberInstallments("");

        /* Esconde novamente os campos específicos desta forma de pagamento, voltando o formulário ao estado original */
        setExibirCartaoCredito(false);
        setExibirNumParcelas(false);
        location.state = null; //esvaziando o location.state para que a tela entre no modo de cadastro de nova despesa
      } else {
        setLoading(false);
        toast.warning(
          "Requisição foi enviada, mas status de retorno não foi o esperado. Por favor, verifique se a alteração foi feita com sucesso.",
          {
            position: "bottom-center",
          }
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        `Houve um problema ao alterar a despesa. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`,
        {
          position: "bottom-center",
        }
      );
    }
  };

  /* ================ Chamando a função de cadastro de despesa de acordo com a forma de pagamento escolhida quando usuário clica em Salvar ========================= */

  /**
   * Solicita o cadastro da despesa de acordo com a forma de pagamento escolhida, caso não haja problemas no preenchimento do formulário. Se algum campo estiver com problemas no preenchimento, será exibido um toast alertando o usuário
   * @param {Event} e - Evento de clique do usuário
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      toast.error(
        `Campo descrição não pode conter mais do que ${MAX_DESCRIPTION_LENGTH} caracteres`,
        {
          position: "bottom-center",
        }
      );
    } else {
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
            if (location.state != null) {
              // se location.state for diferente de null, significa que a tela está sendo aberta no modo edição de despesa
              editExpenseDebitCash();
            } else {
              insertExpenseDebitCash();
            }
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
            if (location.state != null) {
              // se location.state for diferente de null, significa que a tela está sendo aberta no modo edição de despesa
              editExpenseCredit();
            } else {
              insertExpenseCreditCard();
            }
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
            if (location.state != null) {
              // se location.state for diferente de null, significa que a tela está sendo aberta no modo edição de despesa
              editExpenseFinancingLoan();
            } else {
              insertExpenseFinancingLoan();
            }
          } else {
            toast.error("Todos os campos são de preenchimento obrigatório", {
              position: "bottom-center",
            });
          }
        }
      }
    }
  };

  /* ====================== Atualizando o estado dos componentes na tela quando usuário interage com eles ========================================== */

  /**
   * Atualiza a variável de estado do campo "Valor" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o campo
   */
  const onChangeValue = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  /**
   * Atualiza a variável de estado do campo "Descrição" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o campo
   */
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  /**
   * Atualiza a variável de estado do campo "Data" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o campo
   */
  const onChangeRegisterDate = (e) => {
    const registerDate = e.target.value;
    setRegisterDate(registerDate);
  };

  /**
   * Atualiza a variável de estado do combobox "Categoria" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o combobox
   */
  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  /**
   * Atualiza a variável de estado do combobox "Forma de pagamento" e implementa lógica para esconder e exibir campos de formulário de acordo com a forma de pagamento selecionada
   * @param {Event} e - Evento de interação do usuário com o combobox
   */
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

  /**
   * Atualiza a variável de estado do combobox "Cartão de crédito" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o combobox
   */
  const onChangeCreditCard = (e) => {
    const creditCard = e.target.value;
    setCreditCard(creditCard);
  };

  /**
   * Atualiza a variável de estado do combobox "Conta" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o combobox
   */
  const onChangeAccount = (e) => {
    const account = e.target.value;
    setAccount(account);
  };

  /**
   * Atualiza a variável de estado do combobox "Banco" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o combobox
   */
  const onChangeBank = (e) => {
    const bank = e.target.value;
    setBank(bank);
  };

  /**
   * Atualiza a variável de estado do campo "Número de parcelas" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o campo
   */
  const onChangeNumberInstallments = (e) => {
    const numberInstallments = e.target.value;
    setNumberInstallments(numberInstallments);
  };

  /* ====================== Inserindo lógicas de validação e formatação de campos numéricos ========================================== */

  /**
   * Formata o campo "Valor" como monetário, para facilitar o input pelo usuário
   * @param {String} value - Valor inserido pelo usuário no campo "Valor"
   * @returns {String} Valor formatado como monetário, com moeda do Brasil
   */
  function currencyFormatter(value) {
    if (!Number(value)) return "";

    const amount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);

    return `${amount}`;
  }

  /**
   * Validação para aceitar apenas números inteiros
   * @param {*} value - Valor inserido pelo usuário no campo
   * @returns {String} Retorna uma string vazia se a entrada não for numérica; retorna a própria entrada caso ela seja numérica
   */
  function numberFormatter(value) {
    if (!Number(value)) {
      return "";
    } else {
      return value;
    }
  }

  /* ====================== Construção da tela de cadastro de despesas ========================================== */

  /**
   * Formulário de cadastro de despesas com os botões Salvar e Cancelar
   */
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
