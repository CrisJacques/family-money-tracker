import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import MainMenu from "./components/MainMenu";

import Categories from "./views/Categories";
import Accounts from "./views/Accounts";
import CreditCardPayments from "./views/CreditCardPayments";
import CreditCards from "./views/CreditCards";
import CreateEditExpense from "./views/CreateEditExpense";
import FutureBills from "./views/FutureBills";
import Help from "./views/Help";
import CreateEditIncome from "./views/CreateEditIncome";
import ManagementReports from "./views/ManagementReports";
import MyProfile from "./views/MyProfile";
import RecurringItems from "./views/RecurringItems";
import SummaryReport from "./views/SummaryReport";
import Welcome from "./views/Welcome";
import Login from "./views/Login";
import UserEngagementReport from "./views/UserEngagementReport";
import UserProfileStatistics from "./views/UserProfileStatistics";
import Feedbacks from "./views/Feedbacks";

import { logout } from "./actions/auth";

import { history } from "./helpers/history";

import AppContainer from "./styles/AppContainer";
import LogoutButtonContainer from "./styles/LogoutButtonContainer";

/* Aplicação Family Money Tracker */
function App() {
  /* Obtendo o usuário a partir da store */
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser.grupoUsuarios.nome);

  /* Variável de estado para armazenar se usuário é admin de grupo ou não */
  const [isAdmin, setIsAdmin] = useState(false);

  /* Variável de estado para armazenar se usuário é admin do sistema ou não */
  const [isSysAdmin, setIsSysAdmin] = useState(false);

  const dispatch = useDispatch();

  /* ================ Verificando se usuário é admin de grupo ou do sistema cada vez que aplicação é carregada e quando a variável currentUser mudar de valor =============== */
  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.roles.includes("ADMIN_GRUPO"));
      setIsSysAdmin(currentUser.roles.includes("ADMIN_SISTEMA"));
    } else {
      setIsAdmin(false);
      setIsSysAdmin(false);
    }
  }, [currentUser]);

  /* ======================== Redirecionando para a tela de login quando usuário não estiver logado ============================== */
  if (!currentUser) {
    return <Login />;
  }

  /* ======================== Fazendo o logout da aplicação quando usuário clicar em Sair ============================== */
  const logOut = () => {
    dispatch(logout());
  };

  /* ======================== Construção da aplicação ============================== */
  return (
    <AppContainer>
      <Header />
      <div className="row">
        <Router history={history}>
          <div className="col s3">
            <MainMenu userIsAdmin={isAdmin} userIsSysAdmin={isSysAdmin} />
            <div
              style={{
                display: "flex",
                "padding-top": "0.7em",
                "padding-left": "0.25em",
              }}
            >
              <i className="material-icons">logout</i>
              <LogoutButtonContainer onClick={logOut}>
                Sair
              </LogoutButtonContainer>
            </div>
          </div>
          <div className="col s9">
            <Routes>
              <Route path="/" element={<Welcome userName={currentUser.username} userProfile={currentUser.roles[0]} groupName={currentUser.grupoUsuarios.nome}/>} />
              <Route
                path="/despesas"
                element={<CreateEditExpense history={history} />}
              />
              <Route
                path="/receitas"
                element={<CreateEditIncome history={history} />}
              />
              <Route
                path="/pagamento_parcelas"
                element={<CreditCardPayments />}
              />
              <Route path="/relatorio_resumo" element={<SummaryReport />} />
              <Route path="/contas" element={<Accounts />} />
              <Route path="/cartoes_credito" element={<CreditCards />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/contas_a_pagar_futuras" element={<FutureBills />} />
              <Route path="/itens_recorrentes" element={<RecurringItems />} />
              <Route
                path="/relatorios_gerenciais"
                element={<ManagementReports />}
              />
              <Route path="/meu_perfil" element={<MyProfile />} />
              <Route path="/ajuda" element={<Help />} />
              <Route path="/engajamento_usuarios" element={<UserEngagementReport />} />
              <Route path="/perfis_usuarios" element={<UserProfileStatistics />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
            </Routes>
          </div>
        </Router>
      </div>
    </AppContainer>
  );
}

export default App;
