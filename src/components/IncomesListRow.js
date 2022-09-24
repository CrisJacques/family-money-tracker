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
 * Componente que tem a responsabilidade de construir cada linha da lista de receitas
 * @param {String} id - Identificador numérico da receita no banco de dados
 * @param {String} data - Data da receita
 * @param {String} descricao - Descrição da receita
 * @param {String} valor - Valor da receita
 * @param {String} nomeCategoriaReceita - Nome da categoria da receita
 * @param {String} conta - Nome da conta onde o valor da receita está entrando
 * @param {String} deleteIncomes - Nome da função responsável por deletar as receitas
 * @returns Conteúdo de uma linha da tabela de receitas, com informações e botões que possibilitam ações de ver, editar e deletar a receita
 */
const IncomesListRow = ({
  id,
  data,
  descricao,
  valor,
  nomeCategoriaReceita,
  conta,
  deleteIncomes,
}) => {
  /**
   * Variável de estado do diálogo de detalhes da receita
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
        <SecondaryButtonRowContainer>Editar</SecondaryButtonRowContainer>
        <SecondaryButtonRowContainer id={id} onClick={deleteIncomes}>
          Remover
        </SecondaryButtonRowContainer>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle>{"Detalhes da receita"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{`Data: ${data}`}</DialogContentText>
            <DialogContentText>{`Descrição: ${descricao}`}</DialogContentText>
            <DialogContentText>{`Categoria: ${nomeCategoriaReceita}`}</DialogContentText>
            <DialogContentText>{`Valor: R$ ${valor.toFixed(
              2
            )}`}</DialogContentText>
            <DialogContentText>{`Conta: ${conta}`}</DialogContentText>
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

export default IncomesListRow;
