import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import PrimaryButtonRowContainer from "../styles/PrimaryButtonRowContainer";
import SecondaryButtonRowContainer from "../styles/SecondaryButtonRowContainer";

/**
 * Constrói uma linha da lista de transações (despesas ou receitas)
 * @param {String} id - Identificador numérico da transação oriundo do backend
 * @param {String} date - Data da transação
 * @param {String} description - Descrição da transação
 * @param {String} category - Nome da categoria da transação
 * @param {String} value - Valor da transação
 * @param {String} transactionType - Tipo da transação ("despesa" ou "receita")
 * @returns Componente que exibe os valores das colunas da lista de despesas e receitas
 */
const TransactionListRow = ({
  id,
  date,
  description,
  category,
  value,
  transactionType,
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickToOpenDialog = () => {
    setOpen(true);
  };

  const handleToCloseDialog = () => {
    setOpen(false);
  };

  const handleClickToOpenDialogDelete = () => {
    setOpenDelete(true);
  };

  const handleToCloseDialogDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    setOpenDelete(false);
    if (transactionType === "despesa") {
      console.log("DELETOU DESPESA");
    } else if (transactionType === "receita") {
      console.log("DELETOU RECEITA");
    }
    else {
      console.log("Opção de tipo de transação só pode ser despesa ou receita");
    }
  }

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>R$ {value.toFixed(2)}</td>
      <td>
        <PrimaryButtonRowContainer onClick={handleClickToOpenDialog}>
          Ver
        </PrimaryButtonRowContainer>
        <SecondaryButtonRowContainer>Editar</SecondaryButtonRowContainer>
        <SecondaryButtonRowContainer onClick={handleClickToOpenDialogDelete}>
          Remover
        </SecondaryButtonRowContainer>
        <Dialog open={open} onClose={handleToCloseDialog}>
          <DialogTitle>{`Detalhes da ${transactionType}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>{`Data: ${date}`}</DialogContentText>
            <DialogContentText>{`Descrição: ${description}`}</DialogContentText>
            <DialogContentText>{`Categoria: ${category}`}</DialogContentText>
            <DialogContentText>{`Valor: R$ ${value.toFixed(
              2
            )}`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToCloseDialog} color="primary" autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDelete} onClose={handleToCloseDialogDelete}>
          <DialogTitle>{"Confirmação"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{`Deseja realmente remover a ${transactionType}: ${description}?`}</DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleToCloseDialogDelete}>Não</Button>
            <Button
              onClick={handleDelete}
              color="primary"
              autoFocus
            >
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </td>
    </tr>
  );
};

export default TransactionListRow;
