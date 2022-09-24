import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TransactionListHeader from "../components/TransactionListHeader";
import PageTitleWithButton from "../components/PageTitleWithButton";
import DateFilterSelector from "../components/DateFilterSelector";

import convertDateFormat from "../helpers/convertDateFormat";

import ReceitasService from "../services/ReceitasService";

import PrimaryButtonRowContainer from "../styles/PrimaryButtonRowContainer";
import SecondaryButtonRowContainer from "../styles/SecondaryButtonRowContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela que irá permitir a listagem, edição e remoção de receitas
 * @returns Tela que lista as receitas de um período selecionado, além de permitir a alteração do período a ser buscado
 */
const IncomesList = () => {
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

  /**
   * Diálogo de detalhes da transação
   */
  const [open, setOpen] = useState(false);

  /* ======================== Armazenando em variáveis de estado informações vindas do backend para exibir na tela ===================================== */
  /**
   * Lista de receitas
   */
  const [receitas, setReceitas] = useState([]);

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
   * Atualiza a variável de estado do diálogo de detalhes da transação quando usuário clica em "Ver" na linha de uma transação na tabela
   */
  const handleClickToOpenDialog = () => {
    setOpen(true);
  };

  /**
   * Atualiza a variável de estado do diálogo de detalhes da transação quando usuário clica em "Fechar" no diálogo de detalhes da transação
   */
  const handleToCloseDialog = () => {
    setOpen(false);
  };

  /* ====================== Funções que populam a tabela de transações e que executam as ações dos botões de cada transação ========================================== */

  /**
   * Carrega a lista de receitas do período padrão cada vez que a tela é renderizada e quando as variáveis currentUser, userToken, lastFiveDays e today mudarem de valor
   */
  useEffect(() => {
    const fetchReceitas = async () => {
      const resposta = await ReceitasService.getReceitasPorPeriodo(
        userToken,
        convertDateFormat(lastFiveDays),
        convertDateFormat(today)
      );
      setReceitas(resposta.data);
    };
    fetchReceitas();
  }, [currentUser, userToken, lastFiveDays, today]);

  /**
   * Carrega a lista de receitas do período selecionado pelo usuário
   */
  const fetchReceitasDoPeriodo = async () => {
    const resposta = await ReceitasService.getReceitasPorPeriodo(
      userToken,
      convertDateFormat(startDatePeriod),
      convertDateFormat(endDatePeriod)
    );
    setReceitas(resposta.data);
  };

  /**
   * Remove a transação solicitada pelo usuário e atualiza a lista de transações
   * @param {Event} e - Evento de clique no botão
   */
  const deleteIncomes = async (e) => {
    const resultado = await ReceitasService.removeReceita(
      userToken,
      e.target.id
    );
    if (resultado.status === 204) {
      toast.success("Receita removida com sucesso.", {
        position: "bottom-center",
      });
      fetchReceitasDoPeriodo();
    } else {
      toast.error("Houve um problema ao remover a receita.", {
        position: "bottom-center",
      });
    }
  };

  /* ====================== Construção da tela de lista de receitas ========================================== */
  return (
    <div>
      <PageTitleWithButton
        title="Lista de Receitas"
        buttonName="Nova Receita"
        addressPage="receitas"
      />
      <DateFilterSelector
        startValue={startDatePeriod}
        startOnChange={onChangeStartDatePeriod}
        endValue={endDatePeriod}
        endOnChange={onChangeEndDatePeriod}
        onClickOk={fetchReceitasDoPeriodo}
      />
      <PageContentSectionContainer>
        <ToastContainer theme="colored" />
        <table className="responsive-table">
          <TransactionListHeader />
          {receitas.map((r) => (
            <tr>
              <td>{r.data}</td>
              <td>{r.descricao}</td>
              <td>R$ {r.valor.toFixed(2)}</td>
              <td>
                <PrimaryButtonRowContainer onClick={handleClickToOpenDialog}>
                  Ver
                </PrimaryButtonRowContainer>
                <SecondaryButtonRowContainer>
                  Editar
                </SecondaryButtonRowContainer>
                <SecondaryButtonRowContainer id={r.id} onClick={deleteIncomes}>
                  Remover
                </SecondaryButtonRowContainer>
                <Dialog open={open} onClose={handleToCloseDialog}>
                  <DialogTitle>{"Detalhes da receita"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>{`Data: ${r.data}`}</DialogContentText>
                    <DialogContentText>{`Descrição: ${r.descricao}`}</DialogContentText>
                    <DialogContentText>{`Categoria: ${r.nomeCategoriaReceita}`}</DialogContentText>
                    <DialogContentText>{`Valor: R$ ${r.valor.toFixed(
                      2
                    )}`}</DialogContentText>
                    <DialogContentText>{`Conta: ${r.conta.nome}`}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleToCloseDialog}
                      color="primary"
                      autoFocus
                    >
                      Fechar
                    </Button>
                  </DialogActions>
                </Dialog>
              </td>
            </tr>
          ))}
          <tbody></tbody>
        </table>
      </PageContentSectionContainer>
    </div>
  );
};

export default IncomesList;
