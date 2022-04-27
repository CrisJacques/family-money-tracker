import React from "react";

import PageContentSectionContainer from "../styles/PageContentSectionContainer";
import GreetingContainer from "../styles/GreetingContainer";
import SectionTitleContainer from "../styles/SectionTitleContainer";

import QuickAccessButton from "../components/QuickAccessButton";

let userProfileLabel = "";
let saudacao = "";

/* Tela inicial da aplicação */
const Welcome = ({ userName, userProfile, groupName, userIsSysAdmin }) => {
  var today = new Date();
  var time = today.getHours();

  /* Lógica para definir qual saudação exibir ao usuário de acordo com o horário do dia em que ele acessa o sistema */
  if (time < 12) {
    saudacao = "Bom dia";
  } else if (12 < time && time < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }

  /* Lógica para definir um texto amigável para o usuário para informar qual o perfil do usuário que está logado */
  if (userProfile === "ADMIN_GRUPO") {
    userProfileLabel = "Administrador de Grupo";
  } else if (userProfile === "ADMIN_SISTEMA") {
    userProfileLabel = "Administrador do Sistema";
  } else {
    userProfileLabel = "Usuário Comum";
  }

  /* Construção da tela de boas vindas */
  return (
    <div>
      <PageContentSectionContainer>
        <GreetingContainer>
          {saudacao}, {userName}!
        </GreetingContainer>
        <p>
          <b>Perfil:</b> {userProfileLabel} | <b>Nome do grupo:</b> {groupName}
        </p>
      </PageContentSectionContainer>
      {!userIsSysAdmin &&<div className="row">
        <div className="col s12 l6">
          <PageContentSectionContainer>
            <SectionTitleContainer>Acesso rápido</SectionTitleContainer>
            <QuickAccessButton
              name="Nova Despesa"
              addressPage="despesas"
              iconName="trending_down"
            />
            <QuickAccessButton
              name="Nova Receita"
              addressPage="receitas"
              iconName="trending_up"
            />
            <QuickAccessButton
              name="Resumo"
              addressPage="relatorio_resumo"
              iconName="table_chart"
            />
          </PageContentSectionContainer>
        </div>
      </div>}
    </div>
  );
};
export default Welcome;
