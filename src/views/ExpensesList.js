import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

import TransactionListHeader from "../components/TransactionListHeader";
import TransactionListRow from "../components/TransactionListRow";

import DespesasService from "../services/DespesasService";

/**
 * Tela que irá permitir a listagem, edição e remoção de despesas
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const ExpensesList = () => {
  /**
   * Armazenando as informações do usuário logado em uma variável
   */
  const { user: currentUser } = useSelector((state) => state.auth);

  /**
   * Unindo o tipo do token com o seu valor para ser utilizado no header das requisições
   */
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  /**
   * Lista de despesas
   */
  const [despesas, setDespesas] = useState([]);

  /**
   * Carrega a lista de despesas recentes cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor
   */
  useEffect(() => {
    const fetchDespesas = async () => {
      const resposta = await DespesasService.getDespesasRecentes(userToken);
      setDespesas(resposta.data);
    };
    fetchDespesas();
  }, [currentUser, userToken]);

  return (
    <div>
      <PageTitleContainer>Lista de Despesas</PageTitleContainer>
      <PageContentSectionContainer>
        <table className="responsive-table">
          <TransactionListHeader />
          {despesas.map((d) => (
            <TransactionListRow
              date={d.stringData}
              description={d.descricao}
              category={d.nomeCategoriaDespesa}
              value={d.valor}
            />
          ))}
          <tbody></tbody>
        </table>
      </PageContentSectionContainer>
    </div>
  );
};

export default ExpensesList;
