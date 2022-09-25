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

import ContasService from "../services/ContasService";
import CategoriasReceitasService from "../services/CategoriasReceitasService";
import ReceitasService from "../services/ReceitasService";

import { MAX_DESCRIPTION_LENGTH } from "../helpers/generalRules";

/**
 * Tela que permite o cadastro e edição de receitas (quando tela for carregada no modo edição, os valores a serem exibidos serão passados pela tela que estiver fazendo a chamada)
 * @returns Formulário de cadastro ou edição de receitas, com os botões "Salvar" e "Cancelar"
 */
const CreateEditIncome = () => {
  /* ======================== Configurando o valor inicial dos campos quando tela é aberta ===================================== */
  var valorInicial = ""; //Valor da receita
  var descricaoInicial = ""; //Descrição da receita
  var dataInicial = ""; //Data da receita
  var categoriaInicial = ""; //Categoria da receita
  var contaInicial = ""; //Conta na qual o valor da receita está entrando

  /**
   * Se o valor do location.state não for null, siginifica que a tela está sendo aberta no modo edição (pois o location.state armazena as informações da receita que deve ser editada)
   */
  const location = useLocation();
  if (location.state != null) {
    valorInicial = currencyFormatter(location.state.valorTela*100); // é preciso multiplicar por 100 porque o currencyFormatter divide o valor passado por parâmetro por 100
    descricaoInicial = location.state.descricaoTela;

    var dia = location.state.dataTela.split("-")[0];
    var mes = location.state.dataTela.split("-")[1];
    var ano = location.state.dataTela.split("-")[2];
    dataInicial = `${ano}-${mes}-${dia}`;

    categoriaInicial = location.state.idCategoriaTela;
    contaInicial = location.state.idContaTela;

    var id = location.state.idReceita;
  }

  /* ======================== Variáveis de estado para os componentes da tela ===================================== */
  /**
   * Referência para o formulário de cadastro de receitas
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
   * Combobox "Conta"
   */
  const [account, setAccount] = useState(contaInicial);

  /**
   * Variável de estado para controlar a exibição da máscara de carregamento da tela quando usuário salva um novo registro
   */
  const [loading, setLoading] = useState(false);

  /* ============= Armazenando em variáveis de estado informações vindas do backend para exibir nos comboboxes ========================== */
  /**
   * Lista de categorias de receitas
   */
  const [categoriasReceitas, setCategoriasReceitas] = useState([]);

  /**
   * Lista de contas
   */
  const [contas, setContas] = useState([]);

  /* ==== Obtendo o usuário da store e armazenando seu token para poder passar no header das requisições que serão feitas ao backend ===== */

  /**
   * Armazenando as informações do usuário logado em uma variável
   */
  const { user: currentUser } = useSelector((state) => state.auth);

  /**
   * Unindo o tipo do token com o seu valor para ser utilizado no header das requisições
   */
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  /* ======================== Carregando informações do banco de dados para popular os comboboxes ===================================== */

  /**
   * Carrega a lista de contas cadastradas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor
   */
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const resposta = await ContasService.getContas(userToken);
        setContas(resposta.data);
      } catch (error) {
        // Só é preciso fazer a verificação de sessão expirada no carregamento de um dos comboboxes, pois se der erro em um, dará em todos. Assim, é evitada a exibição de vários toasts com o mesmo erro para o usuário.
        toast.error("Sessão expirada. Por favor, faça login novamente.", {
          position: "bottom-center",
        });
      }
    };
    fetchAccounts();
  }, [currentUser, userToken]);

  /**
   * Carrega a lista de categorias de receitas cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor
   */
  useEffect(() => {
    const fetchIncomeCategories = async () => {
      const resposta = await CategoriasReceitasService.getCategoriasReceitas(
        userToken
      );
      setCategoriasReceitas(resposta.data);
    };
    fetchIncomeCategories();
  }, [currentUser, userToken]);

  /* ======================== Cadastrando e editando receitas através de requisições à API ===================================== */

  /**
   * Cadastra uma receita
   */
  const insertIncome = async () => {
    try {
      setLoading(true);
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
        setLoading(false);
        toast.success("Receita registrada com sucesso.", {
          position: "bottom-center",
        });

        setValue("");
        setDescription("");
        setAccount("");
        setCategory("");
        setRegisterDate("");
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
        `Houve um problema ao registrar a receita. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`,
        {
          position: "bottom-center",
        }
      );
    }
  };

  /**
   * Edita uma receita
   */
  const editIncome = async () => {
    try {
      setLoading(true);
      const resultado = await ReceitasService.editReceita(
        userToken,
        id,
        value,
        description,
        account,
        category,
        registerDate,
        currentUser.id
      );
      if (resultado.status === 204) {
        setLoading(false);
        toast.success("Receita alterada com sucesso.", {
          position: "bottom-center",
        });

        location.state = null; //esvaziando o location.state para que a tela entre no modo de cadastro de nova receita

        setValue("");
        setDescription("");
        setAccount("");
        setCategory("");
        setRegisterDate("");
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
        `Houve um problema ao alterar a receita. Por favor, revise as informações inseridas e tente novamente. (Erro: ${error.message})`,
        {
          position: "bottom-center",
        }
      );
    }
  };

  /* ======================== Chamando a função de cadastro ou edição de receita quando usuário clica em Salvar ===================================== */

  /**
   * Solicita o cadastro ou edição da receita, caso não haja problemas no preenchimento do formulário. Se algum campo estiver com problemas no preenchimento, será exibido um toast alertando o usuário
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
    } else if (
      value !== "" &&
      description !== "" &&
      registerDate !== "" &&
      account !== "" &&
      category !== ""
    ) {
      if (location.state != null) {
        // se location.state for diferente de null, significa que a tela foi aberta no modo edição (pois o location.state armazena as informações da receita que deve ser editada)
        editIncome();
      } else {
        // se location.state for null, significa que a tela foi aberta no modo cadastro de nova receita
        insertIncome();
      }
    } else {
      toast.error("Todos os campos são de preenchimento obrigatório", {
        position: "bottom-center",
      });
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
   * Atualiza a variável de estado do combobox "Conta" com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o combobox
   */
  const onChangeAccount = (e) => {
    const account = e.target.value;
    setAccount(account);
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

  /* ====================== Construção da tela de cadastro de receitas ========================================== */

  /**
   * Formulário de cadastro de receitas com os botões Salvar e Cancelar
   */
  return (
    <div>
      <WholePageContainer>
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
                  id="account"
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
                  id="category"
                  value={category}
                  onChange={onChangeCategory}
                >
                  <option value="">Selecione uma categoria...</option>
                  {categoriasReceitas.map((categoriaReceita) => (
                    <option
                      key={categoriaReceita.id}
                      value={categoriaReceita.id}
                    >
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

export default CreateEditIncome;
