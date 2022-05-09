import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageContentSectionContainer from "../styles/PageContentSectionContainer";
import GreetingContainer from "../styles/GreetingContainer";
import SectionTitleContainer from "../styles/SectionTitleContainer";

import QuickAccessButton from "../components/QuickAccessButton";
import TransactionItem from "../components/TransactionItem";
import CategoryItem from "../components/CategoryItem";
import BoldCategoryItem from "../components/BoldCategoryItem";
import GenericPieChart from "../components/GenericPieChart";
import GenericTwoColorsPieChart from "../components/GenericTwoColorsPieChart";
import SectionTitleInitialScreen from "../components/SectionTitleInitialScreen";

import ReceitasService from "../services/ReceitasService";
import DespesasService from "../services/DespesasService";
import TransacoesService from "../services/TransacoesService";

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
  const [totaisPorCategoriaDespesa, setTotaisPorCategoriaDespesa] =
    useState("");
  const [totaisGerais, setTotaisGerais] = useState("");
  const [totaisGeraisComSaldo, setTotaisGeraisComSaldo] = useState("");

  /* ======================== Carregando informações do banco de dados para popular as seções da tela ===================================== */
  /* Carrega os valores totais de despesas e receitas do mês atual e o saldo cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchTotaisGeraisMesAtualComSaldo = async () => {
      try {
        const resposta = await TransacoesService.getTotaisMesAtualComSaldo(
          userToken
        );
        setTotaisGeraisComSaldo(resposta.data);
      } catch (error) {
        toast.error("Sessão expirada. Por favor, faça login novamente.", {
          position: "bottom-center",
        });
      }
    };
    fetchTotaisGeraisMesAtualComSaldo();
  }, [currentUser, userToken]);

  /* Carrega os valores totais de despesas e receitas do mês atual cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchTotaisGeraisMesAtual = async () => {
      const resposta = await TransacoesService.getTotaisMesAtual(userToken);
      setTotaisGerais(resposta.data);
    };
    fetchTotaisGeraisMesAtual();
  }, [currentUser, userToken]);

  /* Carrega a lista de valores totais de despesas por categoria cada vez que a tela é renderizada e quando as variáveis currentUser e userToken mudarem de valor */
  useEffect(() => {
    const fetchTotaisPorCategoriaDespesa = async () => {
      const resposta = await DespesasService.getTotaisPorCategoria(userToken);
      setTotaisPorCategoriaDespesa(resposta.data);
    };
    fetchTotaisPorCategoriaDespesa();
  }, [currentUser, userToken]);

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
      <ToastContainer theme="colored" />
      {!userIsSysAdmin && (
        <div className="row">
          <div className="col s12 l6">
            <PageContentSectionContainer>
              <GreetingContainer>
                {saudacao}, {userName}!
              </GreetingContainer>
              <p style={{ "margin-bottom": "1.85em" }}>
                <b>Perfil:</b> {userProfileLabel} | <b>Nome do grupo:</b>{" "}
                {groupName}
              </p>
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
          <div className="col s12 l6">
            <PageContentSectionContainer>
              <SectionTitleInitialScreen title="Resumo do mês atual" />
              <div className="row" style={{ position: "relative" }}>
                <div className="col s5 l5">
                  <GenericTwoColorsPieChart
                    dados={convertDataToPieChart(totaisGerais)}
                    cores={["#2E8B57", "#D2042D"]}
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
                  {Object.keys(totaisGerais).map((key) => (
                    <CategoryItem category={key} value={totaisGerais[key]} />
                  ))}
                  <BoldCategoryItem
                    category="Saldo"
                    value={totaisGeraisComSaldo["Saldo"]}
                  />
                </div>
              </div>
            </PageContentSectionContainer>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col s12 l6">
          <PageContentSectionContainer>
            <SectionTitleInitialScreen title="Receitas por categoria" />
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
                    category={key}
                    value={totaisPorCategoriaReceita[key]}
                  />
                ))}
              </div>
            </div>
          </PageContentSectionContainer>
        </div>
        <div className="col s12 l6">
          <PageContentSectionContainer>
            <SectionTitleInitialScreen title="Despesas por categoria" />
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
                    category={key}
                    value={totaisPorCategoriaDespesa[key]}
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
            <SectionTitleInitialScreen title="Receitas recentes" />
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
            <SectionTitleInitialScreen title="Despesas recentes" />
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
