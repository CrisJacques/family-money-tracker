import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import PrimaryButtonRowContainer from "../styles/PrimaryButtonRowContainer";
import SecondaryButtonRowContainer from "../styles/SecondaryButtonRowContainer";

/**
 * Componente que tem a responsabilidade de construir cada linha da lista de despesas
 * @param {String} id - Identificador numérico da despesa no banco de dados
 * @param {String} data - Data da despesa
 * @param {String} descricao - Descrição da despesa
 * @param {String} valor - Valor da despesa
 * @param {String} nomeCategoriaDespesa - Nome da categoria da despesa
 * @param {String} idCategoriaDespesa - Identificador numérico da categoria da despesa
 * @param {String} formaDePagamentoName - Nome da forma de pagamento
 * @param {String} formaDePagamentoDesc - Descrição da forma de pagamento
 * @param {String} idFormaDePagamento - Identificador numérico da forma de pagamento
 * @param {String} deleteExpenses - Nome da função responsável por deletar as despesas
 * @returns Conteúdo de uma linha da tabela de despesas, com informações e botões que possibilitam ações de ver, editar e deletar a despesa
 */
const ExpensesListRow = ({
  id,
  data,
  descricao,
  valor,
  nomeCategoriaDespesa,
  idCategoriaDespesa,
  formaDePagamentoName,
  formaDePagamentoDesc,
  idFormaDePagamento,
  deleteExpenses,
}) => {
  /**
   * Variável de estado do diálogo de detalhes da despesa
   */
  const [open, setOpen] = useState(false);
  return (
    <tr>
      <td>{data}</td>
      <td>{descricao}</td>
      <td>R$ {valor.toFixed(2)}</td>
      <td>
        <PrimaryButtonRowContainer
          onClick={() => {
            setOpen(true);
          }}
        >
          Ver
        </PrimaryButtonRowContainer>
        <SecondaryButtonRowContainer>
          <Link
            to="/despesas"
            style={{ color: "#00675b" }}
            state={{
              valorTela: valor,
              descricaoTela: descricao,
              dataTela: data,
              idCategoriaTela: idCategoriaDespesa,
              idFormaDePagamentoTela: idFormaDePagamento,
              idDespesa: id,
            }}
          >
            Editar
          </Link>
        </SecondaryButtonRowContainer>
        <SecondaryButtonRowContainer
          id={`${id}-${formaDePagamentoName}`}
          onClick={deleteExpenses}
        >
          Remover
        </SecondaryButtonRowContainer>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle>{"Detalhes da despesa"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{`Data: ${data}`}</DialogContentText>
            <DialogContentText>{`Descrição: ${descricao}`}</DialogContentText>
            <DialogContentText>{`Categoria: ${nomeCategoriaDespesa}`}</DialogContentText>
            <DialogContentText>{`Valor: R$ ${valor.toFixed(
              2
            )}`}</DialogContentText>
            <DialogContentText>{`Forma de pagamento: ${formaDePagamentoDesc}`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              color="primary"
              autoFocus
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </td>
    </tr>
  );
};

export default ExpensesListRow;
