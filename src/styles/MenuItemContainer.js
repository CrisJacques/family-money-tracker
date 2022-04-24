import styled from "styled-components";

/* O objetivo deste styled component é estilizar cada item do menu lateral, a fim de manter consistência visual */
const MenuItemContainer = styled.div`
  font-family: "Roboto", sans-serif;
  color: black;
  display: grid;
  grid-template-columns: 0.2fr 2fr;
  margin: 0.1rem;
`;

export default MenuItemContainer;
