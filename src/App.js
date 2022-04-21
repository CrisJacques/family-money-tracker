import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Header from './components/Header';
import MainMenu from './components/MainMenu';

import Categories from './views/Categories';
import Accounts from './views/Accounts';
import CreditCardPayments from './views/CreditCardPayments';
import CreditCards from './views/CreditCards';
import CreateEditExpense from './views/CreateEditExpense';
import FutureBills from './views/FutureBills';
import Help from './views/Help';
import CreateEditIncome from './views/CreateEditIncome';
import ManagementReports from './views/ManagementReports';
import MyProfile from './views/MyProfile';
import RecurringItems from './views/RecurringItems';
import SummaryReport from './views/SummaryReport';
import Welcome from './views/Welcome';
import Login2 from "./views/Login2";

import { logout } from "./actions/auth";

import { history } from "./helpers/history";

import AppContainer from './styles/AppContainer'
import LogoutButtonContainer from './styles/LogoutButtonContainer'

//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


export function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.roles.includes("ADMIN_GRUPO"));
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Login2 />;
  }

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <AppContainer>
      <Header />
      <div className="row">
        <Router history={history}>
          <div className="col s3">
            <MainMenu userIsAdmin={isAdmin} />
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
              <Route path="/" element={<Welcome />} />
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
            </Routes>
          </div>
        </Router>
      </div>
    </AppContainer>
  );
}