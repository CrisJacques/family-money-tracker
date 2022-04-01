import React from "react";
import { Fragment } from 'react';
import { Link } from "react-router-dom"
import { MenuItem } from './MenuItem'

export const MainMenu = () => (
    <ul className="col s2">
        <div className="section">
            <MenuItem name="Início" addressPage="" />
        </div>
        <div class="divider"></div>
        <div className="section">
            <MenuItem name="Despesas" addressPage="despesas" />
            <MenuItem name="Receitas" addressPage="receitas" />
            <MenuItem name="Pagamento de parcelas / faturas" addressPage="pagamento_parcelas" />
            <MenuItem name="Relatório de Resumo" addressPage="relatorio_resumo" />
        </div>
        <div class="divider"></div>
        <div className="section">
            <MenuItem name="Contas" addressPage="contas" />
            <MenuItem name="Cartões de Crédito" addressPage="cartoes_credito" />
            <MenuItem name="Categorias" addressPage="categorias" />
            <MenuItem name="Contas a pagar futuras" addressPage="contas_a_pagar_futuras" />
            <MenuItem name="Itens recorrentes" addressPage="itens_recorrentes" />
            <MenuItem name="Relatórios gerenciais" addressPage="relatorios_gerenciais" />
        </div>
        <div class="divider"></div>
        <div className="section">
            <MenuItem name="Meu perfil" addressPage="meu_perfil" />
            <MenuItem name="Ajuda e feedback" addressPage="ajuda" />
            <MenuItem name="Sair" addressPage="" />
        </div>
        
    </ul>  
);