import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela de gerenciamento de contas por parte do administrador do grupo
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const Accounts = () => (
  <div>
    <PageTitleContainer>Contas</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o gerenciamento de contas por parte do
        administrador do grupo. Será possível cadastrar, listar, editar e
        excluir contas. Uma conta é qualquer lugar onde o usuário guarde
        dinheiro (conta corrente, investimento, carteira, etc).
      </p>
    </PageContentSectionContainer>
  </div>
);

export default Accounts;
