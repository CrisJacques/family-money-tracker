<h1 align="center">Family Money Tracker</h1>

<h4 align="center"> 
	🚧  Em construção... 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autora">Autora</a>
</p>


## 💻 Sobre o projeto

O Family Money Tracker é uma aplicação web voltada a familias que querem registrar, analisar e controlar seus ganhos e seus gastos a fim de poder ter uma visão geral da saúde financeira da família ao longo do tempo e poder tomar decisões baseadas nesses dados. Além disso, a ideia é permitir que não só os pais, mas também os filhos possam utilizar a aplicação para ajudar nos registros dos ganhos e gastos da família.

Esta aplicação está sendo concebida e desenvolvida durante a disciplina *Projeto Integrado* da Pós Graduação em Engenharia de Software da PUC Minas.

Este repositório contém o frontend da aplicação, que consiste de uma SPA (Single Page Application) desenvolvida com React em Javascript. 

*Para acessar o repositório do backend, [clique aqui.](https://github.com/CrisJacques/family-money-tracker-api)*

---

## ⚙️ Funcionalidades

Até o momento, as seguintes funcionalidades foram desenvolvidas e já estão disponíveis para uso:
- [x] Autenticação e autorização:
  - [x] 3 perfis de usuário:
    - [x] Administrador do sistema
    - [x] Administrador de grupo
    - [x] Usuário comum
  - Por enquanto, a maior diferença entre esses perfis é quais opções eles conseguem acessar no menu principal do sistema.
  - Nesta versão, ainda não é possível criar novos usuários. Para fins de testes, foram cadastrados 3 usuários no banco de dados, um de cada perfil.
  - A tela de login do sistema é mostrada na imagem a seguir:
  
  ![image](https://user-images.githubusercontent.com/66973973/168686914-e21de287-714c-42db-91a1-080610b2c75d.png)


- [x] Cadastro de receitas
  - [x] Aplicação já permite o cadastro de receitas (ou seja, dinheiro que entra nas contas da família, por exemplo salários, renda extra, etc)
  - Por enquanto, ainda não é possível cadastrar contas nem categorias de receitas além das já cadastradas no banco de dados para fins de testes e demonstrações.
  - A tela de cadastro de receitas é mostrada na imagem a seguir:
  
  ![image](https://user-images.githubusercontent.com/66973973/168687228-7efa5459-594f-40ad-aada-bbfef520432c.png)


- [x] Cadastro de despesas
  - [x] Aplicação já permite o cadastro de despesas, contemplando diversas formas de pagamento (débito, dinheiro, cartão de crédito, financiamento e empréstimo)
  - Por enquanto, ainda não é possível cadastrar cartões de crédito nem categorias de despesas além das já cadastradas no banco de dados para fins de testes e demonstrações.
  - A tela de cadastro de despesas é mostrada na imagem a seguir:
  
  ![image](https://user-images.githubusercontent.com/66973973/168687472-8a854044-321a-4636-92a2-811c30c2f04a.png)


- [x] Visualização do resumo de despesas e receitas do mês atual 
    - [x] Na tela inicial da aplicação, é exibido um resumo financeiro do mês atual:
      - [x] Despesas e receitas recentes (os 5 últimos registros de cada tipo dentro do mês atual)
      - [x] Somatório de despesas e receitas por categoria, com gráficos ilustrando a parcela do todo que cada categoria representa
      - [x] Somatório total de despesas e receitas para o mês atual, informando também o saldo resultante
    - A tela inicial da aplicação é mostrada na imagem a seguir:
    
    ![image](https://user-images.githubusercontent.com/66973973/168687768-431b08cd-0b6c-4737-9b53-faf3413bb8b7.png)


---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)


#### 🎲 Rodando a API

Verifique os pré-requisitos e instruções para rodar a API do do Family Money Tracker [aqui.](https://github.com/CrisJacques/family-money-tracker-api#-como-executar-o-projeto)


#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone https://github.com/CrisJacques/family-money-tracker.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd family-money-tracker

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# A aplicação será aberta na porta:8081 - acesse http://localhost:8081

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

-   **[React](https://pt-br.reactjs.org/)**
-   **[ReactDOM](https://pt-br.reactjs.org/docs/react-dom.html)**
-   **[React Router DOM](https://www.npmjs.com/package/react-router-dom)**
-   **[Redux](https://redux.js.org/)**
-   **[React Redux](https://react-redux.js.org/)**
-   **[React Toastify](https://www.npmjs.com/package/react-toastify)**
-   **[React Number Format](https://www.npmjs.com/package/react-number-format)**
-   **[Recharts](https://recharts.org/en-US/)**
-   **[Axios](https://axios-http.com/ptbr/docs/intro)**
-   **[Styled Components](https://styled-components.com/)** 

---

## 🦸 Autora

Cristhiane Jacques

👋🏽 [Entre em contato!](https://www.linkedin.com/in/cristhiane-jacques/)
