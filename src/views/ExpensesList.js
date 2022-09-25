import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TransactionListHeader from "../components/TransactionListHeader";
import PageTitleWithButton from "../components/PageTitleWithButton";
import DateFilterSelector from "../components/DateFilterSelector";
import ExpensesListRow from "../components/ExpensesListRow";

import convertDateFormat from "../helpers/convertDateFormat";

import DespesasService from "../services/DespesasService";

import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela que irá permitir a listagem, edição e remoção de despesas
 * @returns Tela que lista as despesas de um período selecionado, além de permitir a alteração do período a ser buscado
 */
const ExpensesList = () => {
  /**
   * Definindo o período padrão que será buscado ao abrir a tela (data atual - 5 dias)
   */
  var today = new Date().toISOString().substring(0, 10); // dia atual, formatado para ser usado no input de data (formato aaaa-mm-dd)
  var lastFiveDays = new Date(new Date().setDate(new Date().getDate() - 5))
    .toISOString()
    .substring(0, 10); // 5 dias atrás, formatado para ser usado no input de data (formato aaaa-mm-dd)

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

  /* ======================== Armazenando em variáveis de estado informações vindas do backend para exibir na tela ===================================== */
  /**
   * Lista de despesas
   */
  const [despesas, setDespesas] = useState([]);

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

  /* ====================== Funções que populam a tabela de transações e que executam as ações dos botões de cada transação ========================================== */

  /**
   * Carrega a lista de despesas do período padrão cada vez que a tela é renderizada e quando as variáveis currentUser, userToken, lastFiveDays e today mudarem de valor
   */
  useEffect(() => {
    const fetchDespesas = async () => {
      const resposta = await DespesasService.getDespesasPorPeriodo(
        userToken,
        convertDateFormat(lastFiveDays),
        convertDateFormat(today)
      );
      setDespesas(resposta.data);
    };
    fetchDespesas();
  }, [currentUser, userToken, lastFiveDays, today]);

  /**
   * Carrega a lista de despesas do período selecionado pelo usuário
   */
  const fetchDespesasDoPeriodo = async () => {
    const resposta = await DespesasService.getDespesasPorPeriodo(
      userToken,
      convertDateFormat(startDatePeriod),
      convertDateFormat(endDatePeriod)
    );
    setDespesas(resposta.data);
  };

  /**
   * Remove a transação solicitada pelo usuário e atualiza a lista de transações
   * @param {Event} e - Evento de clique no botão
   */
  const deleteExpenses = async (e) => {
    const resultado = await DespesasService.removeDespesa(
      userToken,
      e.target.id.split("-")[0], // os parâmetros são passados dessa forma porque o id do botão está no formato: idDespesa-formaDePagamento
      e.target.id.split("-")[1]
    );
    if (resultado.status === 204) {
      toast.success("Despesa removida com sucesso.", {
        position: "bottom-center",
      });
      fetchDespesasDoPeriodo();
    } else {
      toast.error("Houve um problema ao remover a despesa.", {
        position: "bottom-center",
      });
    }
  };

  /* ====================== Construção da tela de lista de despesas ========================================== */
  return (
    <div>
      <PageTitleWithButton
        title="Lista de Despesas"
        buttonName="Nova Despesa"
        addressPage="despesas"
      />
      <DateFilterSelector
        startValue={startDatePeriod}
        startOnChange={onChangeStartDatePeriod}
        endValue={endDatePeriod}
        endOnChange={onChangeEndDatePeriod}
        onClickOk={fetchDespesasDoPeriodo}
      />
      <PageContentSectionContainer>
        <ToastContainer theme="colored" />
        <table className="responsive-table">
          <TransactionListHeader />
          <tbody>
            {despesas.map((d) => (
              <ExpensesListRow
                id={d.id}
                key={d.id}
                data={d.data}
                descricao={d.descricao}
                valor={d.valor}
                nomeCategoriaDespesa={d.nomeCategoriaDespesa}
                formaDePagamentoName={d.formaDePagamentoName}
                formaDePagamentoDesc={d.formaDePagamentoDesc}
                deleteExpenses={deleteExpenses}
              />
            ))}
          </tbody>
        </table>
      </PageContentSectionContainer>
    </div>
  );
};

export default ExpensesList;
