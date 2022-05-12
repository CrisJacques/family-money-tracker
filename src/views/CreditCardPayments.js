import React from "react";

import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela que irá permitir o cadastro, listagem, edição e exclusão de pagamentos de faturas de cartão de crédito, financiamentos e empréstimos
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const CreditCardPayments = () => (
  <div>
    <PageTitleContainer>Pagamento de parcelas / faturas</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o cadastro, listagem, edição e exclusão de
        pagamentos de faturas de cartão de crédito, financiamentos e
        empréstimos. Usuários comuns poderão cadastrar e listar esses
        pagamentos. Apenas o administrador do grupo poderá editar e excluir tais
        pagamentos.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default CreditCardPayments;
