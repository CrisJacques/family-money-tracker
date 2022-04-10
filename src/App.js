import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';

import { Categories } from './views/Categories';
import { Accounts } from './views/Accounts';
import { CreditCardPayments } from './views/CreditCardPayments';
import { CreditCards } from './views/CreditCards';
import { Expenses } from './views/Expenses';
import { FutureBills } from './views/FutureBills';
import { Help } from './views/Help';
import { Incomes } from './views/Incomes';
import { ManagementReports } from './views/ManagementReports';
import { MyProfile } from './views/MyProfile';
import { RecurringItems } from './views/RecurringItems';
import { SummaryReport } from './views/SummaryReport';
import { Welcome } from './views/Welcome';
import Login2 from "./views/Login2";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import AppContainer from './styles/AppContainer'

//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

    if (!currentUser) {
      return <Login2 />;
    };

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <AppContainer>
      <Header />
      <div className="row">
        <Router history={history}>
          <MainMenu />
          <div className="col s9">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/despesas" element={<Expenses />} />
              <Route path="/receitas" element={<Incomes />} />
              <Route path="/pagamento_parcelas" element={<CreditCardPayments />} />
              <Route path="/relatorio_resumo" element={<SummaryReport />} />
              <Route path="/contas" element={<Accounts />} />
              <Route path="/cartoes_credito" element={<CreditCards />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/contas_a_pagar_futuras" element={<FutureBills />} />
              <Route path="/itens_recorrentes" element={<RecurringItems />} />
              <Route path="/relatorios_gerenciais" element={<ManagementReports />} />
              <Route path="/meu_perfil" element={<MyProfile />} />
              <Route path="/ajuda" element={<Help />} />
              <Route path="/login" element={<Login2 />} />
            </Routes>
          </div>
        </Router>
      </div>
      <button onClick={logOut}>Teste</button>
    </AppContainer>
  );
}

export default App;

