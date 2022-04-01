import React from 'react';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { Fragment } from 'react';

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

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Header />
      <div className="row">
        <Router>
          <MainMenu />
          <div className="col s10">
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
            </Routes>
          </div>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;

