import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";
import ListItemContainer from "../styles/ListItemContainer";

export const ManagementReports = () => (
  <div>
    <PageTitleContainer>Relatórios gerenciais</PageTitleContainer>
    <PageContentSectionContainer>
      <ListItemContainer>
        Esta página irá permitir o acesso aos relatórios gerenciais por parte do
        administrador do grupo:
        <li>Itens da fatura de um cartão de crédito em um mês selecionado;</li>
        <li>
          Lista de entradas e saídas de uma ou mais contas, bem como seu saldo
          dentro de um período;
        </li>
        <li>
          Soma das despesas e receitas (e os valores por categoria), e o saldo
          restante para cada mês de um ano selecionado;
        </li>
        <li>
          Resumo da situação financeira atual do grupo, contendo a soma do saldo
          atual de todas as contas cadastradas, o valor atual de cada uma delas
          e quanto está sendo utilizado do limite de cada um dos cartões de
          crédito cadastrados;
        </li>
        <li>
          Listagem de despesas por forma de pagamento para um período
          selecionado;
        </li>
        <li>
          Lista de transações feitas em um determinado período de acordo com
          filtros configurados (categoria, descrição, conta, etc);
        </li>
        <li>
          Histórico de ações feitas no sistema por todos os usuários do grupo
          (cadastro de transações, categorias, etc) dentro de um período
          selecionado;
        </li>
      </ListItemContainer>
    </PageContentSectionContainer>
  </div>
);