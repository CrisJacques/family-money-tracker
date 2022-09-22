import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PageContentSectionContainer from "../styles/PageContentSectionContainer";

import TransactionListHeader from "../components/TransactionListHeader";
import TransactionListRow from "../components/TransactionListRow";
import PageTitleWithButton from "../components/PageTitleWithButton";
import DateFilterSelector from "../components/DateFilterSelector";

import DespesasService from "../services/DespesasService";

import convertDateFormat from "../helpers/convertDateFormat";

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
        <table className="responsive-table">
          <TransactionListHeader />
          {despesas.map((d) => (
            <TransactionListRow
              date={d.stringData}
              description={d.descricao}
              category={d.nomeCategoriaDespesa}
              value={d.valor}
              transactionType="despesa"
            />
          ))}
          <tbody></tbody>
        </table>
      </PageContentSectionContainer>
    </div>
  );
};

export default ExpensesList;
