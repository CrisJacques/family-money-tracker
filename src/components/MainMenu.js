import React from "react";
import MenuItem from "./MenuItem";

/* Componente que tem a responsabilidade de ser o menu lateral, que aparece à esquerda de todas as páginas da aplicação. 
   Inclui lógicas para mostrar opções de acordo com o perfil de usuário que está logado no sistema */
const MainMenu = ({ userIsAdmin, userIsSysAdmin }) => (
  <div>
    {!userIsSysAdmin && (
      <div className="section">
        <MenuItem name="Início" addressPage="" iconName="home" />
      </div>
    )}
    {!userIsSysAdmin && <div className="divider"></div>}
    {!userIsSysAdmin && (
      <div className="section">
        <MenuItem
          name="Despesas"
          addressPage="despesas"
          iconName="trending_down"
        />
        <MenuItem
          name="Receitas"
          addressPage="receitas"
          iconName="trending_up"
        />
        <MenuItem
          name="Pagamento de parcelas / faturas"
          addressPage="pagamento_parcelas"
          iconName="credit_score"
        />
        <MenuItem
          name="Itens recorrentes"
          addressPage="itens_recorrentes"
          iconName="history"
        />
        <MenuItem
          name="Relatório de Resumo"
          addressPage="relatorio_resumo"
          iconName="table_chart"
        />
      </div>
    )}
    {!userIsSysAdmin && userIsAdmin && <div className="divider"></div>}
    {!userIsSysAdmin && userIsAdmin && (
      <div className="section">
        <MenuItem
          name="Contas"
          addressPage="contas"
          iconName="account_balance"
        />
        <MenuItem
          name="Cartões de Crédito"
          addressPage="cartoes_credito"
          iconName="payment"
        />
        <MenuItem
          name="Categorias"
          addressPage="categorias"
          iconName="format_list_bulleted"
        />
        <MenuItem
          name="Contas a pagar futuras"
          addressPage="contas_a_pagar_futuras"
          iconName="pending_actions"
        />
        <MenuItem
          name="Relatórios gerenciais"
          addressPage="relatorios_gerenciais"
          iconName="assessment"
        />
      </div>
    )}
    {!userIsSysAdmin && <div className="divider"></div>}
    {!userIsSysAdmin && (
      <div className="section">
        <MenuItem
          name="Meu perfil"
          addressPage="meu_perfil"
          iconName="account_circle"
        />
        <MenuItem name="Ajuda e feedback" addressPage="ajuda" iconName="help" />
      </div>
    )}
    {!userIsSysAdmin && <div className="divider"></div>}
    {userIsSysAdmin && (
      <div className="section">
        <MenuItem
          name="Engajamento dos usuários"
          addressPage="engajamento_usuarios"
          iconName="assignment"
        />
        <MenuItem
          name="Perfil dos usuários"
          addressPage="perfis_usuarios"
          iconName="assignment_ind"
        />
        <MenuItem
          name="Feedbacks"
          addressPage="feedbacks"
          iconName="assignment_return"
        />
      </div>
    )}
    {userIsSysAdmin && <div className="divider"></div>}
  </div>
);

export default MainMenu;
