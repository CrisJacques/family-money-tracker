import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

import DateFilterSelectorBox from "../components/DateFilterSelectorBox";
import TransactionItem from "../components/TransactionItem";
import CategoryItem from "../components/CategoryItem";
import BoldCategoryItem from "../components/BoldCategoryItem";
import GenericPieChart from "../components/GenericPieChart";
import LoadingSectionMask from "../components/LoadingSectionMask";

import ReceitasService from "../services/ReceitasService";
import DespesasService from "../services/DespesasService";
import TransacoesService from "../services/TransacoesService";

import convertDataToPieChart from "../helpers/convertDataToPieChart";
import convertDateFormat from "../helpers/convertDateFormat";

/**
 * Tela de relatório de resumo de despesas e receitas
 * @returns Tela que exibe um relatório de resumo de despesas e receitas para um período selecionado pelo usuário
 */
const SummaryReport = () => {
  /**
   * Definindo o período padrão que será buscado ao abrir a tela (data atual - 5 dias)
   */
  var today = new Date().toISOString().substring(0, 10); // dia atual, formatado para ser usado no input de data (formato aaaa-mm-dd)
  var lastFiveDays = new Date(new Date().setDate(new Date().getDate() - 5))
    .toISOString()
    .substring(0, 10); // 5 dias atrás, formatado para ser usado no input de data (formato aaaa-mm-dd)

  /* ==== Obtendo o usuário da store e armazenando seu token para poder passar no header das requisições que serão feitas ao backend ===== */

  /**
   * Armazenando as informações do usuário logado em uma variável
   */
  const { user: currentUser } = useSelector((state) => state.auth);

  /**
   * Unindo o tipo do token com o seu valor para ser utilizado no header das requisições
   */
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  /* ======================== Variáveis de estado para os componentes da tela ===================================== */

  /**
   * Campo da data de início do período a ser buscado
   */
  const [startDatePeriod, setStartDatePeriod] = useState(lastFiveDays);

  /**
   * Campo da data de final do período a ser buscado
   */
  const [endDatePeriod, setEndDatePeriod] = useState(today);

  /* ============= Armazenando em variáveis de estado informações vindas do backend para exibir nas seções da tela =============== */

  /**
   * Lista de receitas
   */
  const [receitas, setReceitas] = useState([]);

  /**
   * Lista de despesas
   */
  const [despesas, setDespesas] = useState([]);

  /**
   * Totais de receitas por categoria
   */
  const [totaisPorCategoriaReceita, setTotaisPorCategoriaReceita] =
    useState("");

  /**
   * Totais de despesas por categoria
   */
  const [totaisPorCategoriaDespesa, setTotaisPorCategoriaDespesa] =
    useState("");

  /**
   * Totais gerais de despesas e receitas, incluindo o saldo resultante
   */
  const [totaisGeraisComSaldo, setTotaisGeraisComSaldo] = useState("");

  /* ============= Variáveis de estado para controlar a exibição de máscaras de carregamento da tela =============== */

  /**
   * Carregamento da seção "Receitas por categoria" (é utilizada para carregar a mask de toda a tela: se terminou o carregamento das informações desta seção, provavelmente terminou também o das demais, nesse momento a máscara deixa de ser exibida)
   */
  const [loadingReceitasPorCategoria, setLoadingReceitasPorCategoria] =
    useState(false);

  /* ====================== Atualizando o estado dos componentes na tela quando usuário interage com eles ========================================== */

  /**
   * Atualiza a variável de estado do campo do início do período com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o campo
   */
  const onChangeStartDatePeriod = (e) => {
    const startDatePeriod = e.target.value;
    setStartDatePeriod(startDatePeriod);
  };

  /**
   * Atualiza a variável de estado do campo do final do período com a nova entrada do usuário
   * @param {Event} e - Evento de interação do usuário com o campo
   */
  const onChangeEndDatePeriod = (e) => {
    const endDatePeriod = e.target.value;
    setEndDatePeriod(endDatePeriod);
  };

  /* ======================== Atualizando informações quando usuário clica em OK ===================================== */

  /**
   * Atualiza as informnações do período selecionado pelo usuário
   */
  const fetchTransacoesDoPeriodo = async () => {
    setLoadingReceitasPorCategoria(true);
    const respostaDespesas = await DespesasService.getDespesasPorPeriodo(
      userToken,
      convertDateFormat(startDatePeriod),
      convertDateFormat(endDatePeriod)
    );
    const respostaReceitas = await ReceitasService.getReceitasPorPeriodo(
      userToken,
      convertDateFormat(startDatePeriod),
      convertDateFormat(endDatePeriod)
    );
    const respostaTotais =
      await TransacoesService.getTotaisPeriodoSelecionadoComSaldo(
        userToken,
        convertDateFormat(startDatePeriod),
        convertDateFormat(endDatePeriod)
      );
    const respostaCategoriaDespesa =
      await DespesasService.getTotaisPorCategoriaPeriodoSelecionado(
        userToken,
        convertDateFormat(startDatePeriod),
        convertDateFormat(endDatePeriod)
      );
    const respostaCategoriaReceita =
      await ReceitasService.getTotaisPorCategoriaPeriodoSelecionado(
        userToken,
        convertDateFormat(startDatePeriod),
        convertDateFormat(endDatePeriod)
      );
    setTotaisPorCategoriaReceita(respostaCategoriaReceita.data);
    setTotaisPorCategoriaDespesa(respostaCategoriaDespesa.data);
    setTotaisGeraisComSaldo(respostaTotais.data);
    setDespesas(respostaDespesas.data);
    setReceitas(respostaReceitas.data);
    setLoadingReceitasPorCategoria(false);
  };

  /* ======================== Carregando informações do banco de dados para popular as seções da tela ===================================== */

  /**
   * Carrega os valores totais de despesas e receitas do período selecionado e o saldo cada vez que a tela é renderizada e quando as variáveis passadas por parâmetro mudarem de valor
   */
  useEffect(() => {
    const fetchTotaisGeraisPeríodoSelecionadoComSaldo = async () => {
      setLoadingReceitasPorCategoria(true);
      try {
        const resposta =
          await TransacoesService.getTotaisPeriodoSelecionadoComSaldo(
            userToken,
            convertDateFormat(lastFiveDays),
            convertDateFormat(today)
          );
        setTotaisGeraisComSaldo(resposta.data);
        setLoadingReceitasPorCategoria(false);
      } catch (error) {
        toast.error("Sessão expirada. Por favor, faça login novamente.", {
          position: "bottom-center",
        });
        setLoadingReceitasPorCategoria(false);
      }
    };
    fetchTotaisGeraisPeríodoSelecionadoComSaldo();
  }, [currentUser, userToken, lastFiveDays, today]);

  /**
   * Carrega a lista de valores totais de despesas por categoria cada vez que a tela é renderizada e quando as variáveis passadas por parâmetro mudarem de valor
   */
  useEffect(() => {
    const fetchTotaisPorCategoriaDespesaPeriodoSelecionado = async () => {
      const resposta =
        await DespesasService.getTotaisPorCategoriaPeriodoSelecionado(
          userToken,
          convertDateFormat(lastFiveDays),
          convertDateFormat(today)
        );
      setTotaisPorCategoriaDespesa(resposta.data);
    };
    fetchTotaisPorCategoriaDespesaPeriodoSelecionado();
  }, [currentUser, userToken, lastFiveDays, today]);

  /**
   * Carrega a lista de valores totais de receitas por categoria cada vez que a tela é renderizada e quando as variáveis passadas por parâmetro mudarem de valor
   */
  useEffect(() => {
    const fetchTotaisPorCategoriaReceitaPeriodoSelecionado = async () => {
      const resposta =
        await ReceitasService.getTotaisPorCategoriaPeriodoSelecionado(
          userToken,
          convertDateFormat(lastFiveDays),
          convertDateFormat(today)
        );
      setTotaisPorCategoriaReceita(resposta.data);
    };
    fetchTotaisPorCategoriaReceitaPeriodoSelecionado();
  }, [currentUser, userToken, lastFiveDays, today]);

  /**
   * Carrega a lista de receitas do período padrão cada vez que a tela é renderizada e quando as variáveis passadas por parâmetro mudarem de valor
   */
  useEffect(() => {
    const fetchReceitasPeriodoSelecionado = async () => {
      const resposta = await ReceitasService.getReceitasPorPeriodo(
        userToken,
        convertDateFormat(lastFiveDays),
        convertDateFormat(today)
      );
      setReceitas(resposta.data);
    };
    fetchReceitasPeriodoSelecionado();
  }, [currentUser, userToken, lastFiveDays, today]);

  /**
   * Carrega a lista de despesas do período padrão cada vez que a tela é renderizada e quando as variáveis passadas por parâmetro mudarem de valor
   */
  useEffect(() => {
    const fetchDespesasPeriodoSelecionado = async () => {
      const resposta = await DespesasService.getDespesasPorPeriodo(
        userToken,
        convertDateFormat(lastFiveDays),
        convertDateFormat(today)
      );
      setDespesas(resposta.data);
    };
    fetchDespesasPeriodoSelecionado();
  }, [currentUser, userToken, lastFiveDays, today]);

  /* ======================== Construção da tela de de resumo de despesas e receitas ===================================== */
  return (
    <div>
      {loadingReceitasPorCategoria && (
        <div>
          <LoadingSectionMask />{" "}
          {/*Mostra uma máscara de carregamento sobre toda a tela inicial enquanto não terminar de carregar as informações da seção "Receitas por categoria". Se terminou o carregamento desta seção, provavelmente já terminou também o das demais, e a máscara deixa de ser exibida. Foi inserida esta máscara para contemplar o caso em que a API demorar mais do que o normal para responder, garantindo uma experiência melhor ao usuário.*/}
        </div>
      )}
      {!loadingReceitasPorCategoria && (
        <div>
          <div>
            <PageTitleContainer>Relatório de Resumo</PageTitleContainer>
            <ToastContainer theme="colored" />
            <div
              style={{ display: "flex", "justify-content": "space-between" }}
            >
              <DateFilterSelectorBox
                startValue={startDatePeriod}
                startOnChange={onChangeStartDatePeriod}
                endValue={endDatePeriod}
                endOnChange={onChangeEndDatePeriod}
                onClickOk={fetchTransacoesDoPeriodo}
              />
              <h6>
                <b>Saldo do período: R$ {totaisGeraisComSaldo["Saldo"]}</b>
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col s12 l6">
              <PageContentSectionContainer>
                <h5 style={{ "margin-bottom": "1em" }}>
                  Receitas por categoria
                </h5>
                <div className="row" style={{ position: "relative" }}>
                  <div className="col s5 l5">
                    <GenericPieChart
                      dados={convertDataToPieChart(totaisPorCategoriaReceita)}
                      cor="#2E8B57"
                    />
                  </div>
                  <div
                    className="col s7 l7"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "40%",
                      "-ms-transform": "translateY(-50%)",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {Object.keys(totaisPorCategoriaReceita).map((key) => (
                      <CategoryItem
                        key={key}
                        category={key}
                        value={totaisPorCategoriaReceita[key]}
                      />
                    ))}
                    <BoldCategoryItem
                      category="Total"
                      value={totaisGeraisComSaldo["Receitas"]}
                    />
                  </div>
                </div>
              </PageContentSectionContainer>
            </div>
            <div className="col s12 l6">
              <PageContentSectionContainer>
                <h5 style={{ "margin-bottom": "1em" }}>
                  Despesas por categoria
                </h5>
                <div className="row" style={{ position: "relative" }}>
                  <div className="col s5 l5">
                    <GenericPieChart
                      dados={convertDataToPieChart(totaisPorCategoriaDespesa)}
                      cor="#D2042D"
                    />
                  </div>
                  <div
                    className="col s7 l7"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "40%",
                      "-ms-transform": "translateY(-50%)",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {Object.keys(totaisPorCategoriaDespesa).map((key) => (
                      <CategoryItem
                        key={key}
                        category={key}
                        value={totaisPorCategoriaDespesa[key]}
                      />
                    ))}
                    <BoldCategoryItem
                      category="Total"
                      value={totaisGeraisComSaldo["Despesas"]}
                    />
                  </div>
                </div>
              </PageContentSectionContainer>
            </div>
          </div>
          <div className="row">
            <div className="col s12 l6">
              <PageContentSectionContainer>
                <h5>Receitas do período</h5>
                {receitas.map((r) => (
                  <TransactionItem
                    key={r.descricao}
                    description={r.descricao}
                    value={r.valor}
                    category={r.nomeCategoriaReceita}
                    date={r.data}
                  />
                ))}
              </PageContentSectionContainer>
            </div>
            <div className="col s12 l6">
              <PageContentSectionContainer>
                <h5>Despesas do período</h5>
                {despesas.map((d) => (
                  <TransactionItem
                    key={d.descricao}
                    description={d.descricao}
                    value={d.valor}
                    category={d.nomeCategoriaDespesa}
                    date={d.stringData}
                  />
                ))}
              </PageContentSectionContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SummaryReport;
