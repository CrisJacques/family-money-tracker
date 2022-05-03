import React, { useState, useEffect, PureComponent } from "react";
import { useSelector } from "react-redux";

import PageContentSectionContainer from "../styles/PageContentSectionContainer";
import GreetingContainer from "../styles/GreetingContainer";
import SectionTitleContainer from "../styles/SectionTitleContainer";

import QuickAccessButton from "../components/QuickAccessButton";
import TransactionItem from "../components/TransactionItem";
import CategoryItem from "../components/CategoryItem";
import GenericPieChart from "../components/GenericPieChart";

import ReceitasService from "../services/ReceitasService";
import DespesasService from "../services/DespesasService";

import convertDataToPieChart from "../helpers/convertDataToPieChart";

let userProfileLabel = "";
let saudacao = "";

/* Tela inicial da aplicação */
const Welcome = ({ userName, userProfile, groupName, userIsSysAdmin }) => {
  var today = new Date();
  var time = today.getHours();

  /* Obtendo o usuário da store e armazenando seu token para poder passar no header das requisições que serão feitas ao backend */
  const { user: currentUser } = useSelector((state) => state.auth);
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  /* Armazenando em variáveis de estado informações vindas do backend para exibir nas seções da tela */
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [totaisPorCategoriaReceita, setTotaisPorCategoriaReceita] =
    useState("");

  /* ======================== Carregando informações do banco de dados para popular as seções da tela ===================================== */
  /* Carrega a lista de valores totais de receitas por categoria cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchTotaisPorCategoriaReceita = async () => {
      const resposta = await ReceitasService.getTotaisPorCategoria(userToken);
      setTotaisPorCategoriaReceita(resposta.data);
    };
    fetchTotaisPorCategoriaReceita();
  }, [currentUser, userToken]);

  /* Carrega a lista de receitas recentes cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchReceitas = async () => {
      const resposta = await ReceitasService.getReceitasRecentes(userToken);
      setReceitas(resposta.data);
    };
    fetchReceitas();
  }, [currentUser, userToken]);

  /* Carrega a lista de despesas recentes cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchDespesas = async () => {
      const resposta = await DespesasService.getDespesasRecentes(userToken);
      setDespesas(resposta.data);
    };
    fetchDespesas();
  }, [currentUser, userToken]);

  /* ======================== Lógicas para exibir textos amigáveis para o usuário ===================================== */
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

  /* ======================== Construção da tela de boas vindas ===================================== */
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
      {!userIsSysAdmin && (
        <div className="row">
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
        </div>
      )}
      <div className="row">
        <div className="col s12 l6">
          <PageContentSectionContainer>
            <SectionTitleContainer>
              Receitas por categoria
            </SectionTitleContainer>
            <div className="row" style={{"position":"relative"}}>
              <div className="col s5 l5">
                <GenericPieChart dados={convertDataToPieChart(totaisPorCategoriaReceita)}/>
              </div>
              <div className="col s7 l7" style={{"position":"absolute", "top":"50%", "left": "40%","-ms-transform": "translateY(-50%)", "transform": "translateY(-50%)"}}>
                {Object.keys(totaisPorCategoriaReceita).map((key) => (
                  <CategoryItem
                    category={key}
                    value={totaisPorCategoriaReceita[key]}
                  />
                ))}
              </div>
            </div>
          </PageContentSectionContainer>
        </div>
      </div>
      <div className="row">
        <div className="col s12 l6">
          <PageContentSectionContainer>
            <SectionTitleContainer>Receitas recentes</SectionTitleContainer>
            {receitas.map((r) => (
              <TransactionItem
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
            <SectionTitleContainer>Despesas recentes</SectionTitleContainer>
            {despesas.map((d) => (
              <TransactionItem
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
  );
};
export default Welcome;
