import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela de gerenciamento de categorias de despesas e receitas por parte do administrador do grupo
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const Categories = () => (
  <div>
    <PageTitleContainer>Categorias</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o gerenciamento de categorias de despesas e
        receitas por parte do administrador do grupo. Será possível criar,
        editar e excluir categorias. O intuito desta funcionalidade é permitir
        que os usuários possam organizar as despesas e receitas em categorias
        que façam sentido para o seu dia a dia.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default Categories;
