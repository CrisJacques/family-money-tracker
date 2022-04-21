import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import PageTitleContainer from "../styles/PageTitleContainer";
import InputFieldContainer from "../styles/InputFieldContainer";
import PrimaryButtonContainer from '../styles/PrimaryButtonContainer';
import SecondaryButtonContainer from '../styles/SecondaryButtonContainer';

import InputLabel from "../components/InputLabel";

import requiredValidation from "../helpers/requiredValidation";

import ContasService from "../services/ContasService";
import CategoriasReceitasService from "../services/CategoriasReceitasService";

const CreateEditIncome = (props) => {
  const form = useRef();

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [categoriasReceitas, setCategoriasReceitas] = useState([]);
  const [contas, setContas] = useState([]);

  const { user: currentUser } = useSelector((state) => state.auth);
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  useEffect(() => {
    const fetchAccounts = async () => {
      const resposta = await ContasService.getContas(
        userToken
      );
      setContas(resposta.data);
    };
    fetchAccounts();
  }, [currentUser, userToken]);

  useEffect(() => {
    const fetchIncomeCategories = async () => {
      const resposta = await CategoriasReceitasService.getCategoriasReceitas(
        userToken
      );
      setCategoriasReceitas(resposta.data);
    };
    fetchIncomeCategories();
  }, [currentUser, userToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.current.validateAll();
    alert(value);
    alert(description);
  };

  const onChangeValue = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onChangeRegisterDate = (e) => {
    const registerDate = e.target.value;
    setRegisterDate(registerDate);
  };

  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const onChangeAccount = (e) => {
    const account = e.target.value;
    setAccount(account);
  };

  const onClickCancelButton = () => {
    props.history.push("/");
    window.location.reload();
  };

  return (
    <div>
      <PageTitleContainer>Cadastrar Receita</PageTitleContainer>
      <Form onSubmit={handleSubmit} ref={form}>
        <div className="row">
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="value" name="Valor" />
              <Input
                type="text"
                className="validate"
                name="value"
                value={value}
                onChange={onChangeValue}
                validations={[requiredValidation]}
              />
            </InputFieldContainer>
          </div>
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="description" name="Descrição" />
              <Input
                type="text"
                className="validate"
                name="description"
                value={description}
                onChange={onChangeDescription}
                validations={[requiredValidation]}
              />
            </InputFieldContainer>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="account" name="Conta" />
              <select
                className="browser-default"
                name="account"
                value={account}
                onChange={onChangeAccount}
                validations={[requiredValidation]}
              >
                <option value="">Selecione uma conta...</option>
                {contas.map((conta)=> <option key={conta.id} value={conta.id}>{conta.nome}</option>)}
              </select>
            </InputFieldContainer>
          </div>
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="category" name="Categoria" />
              <select
                className="browser-default"
                name="category"
                value={category}
                onChange={onChangeCategory}
                validations={[requiredValidation]}
              >
                <option value="">Selecione uma categoria...</option>
                {categoriasReceitas.map((categoriaReceita)=> <option key={categoriaReceita.id} value={categoriaReceita.id}>{categoriaReceita.nome}</option>)}
              </select>
            </InputFieldContainer>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6">
            <InputFieldContainer>
              <InputLabel id="registerDate" name="Data" />
              <Input
                type="date"
                className="validate"
                name="registerDate"
                value={registerDate}
                onChange={onChangeRegisterDate}
                validations={[requiredValidation]}
              />
            </InputFieldContainer>
          </div>
          <div className="col s12" style={{ "text-align": "right" }}>
            <SecondaryButtonContainer
              type="button"
              onClick={onClickCancelButton}
            >
              Cancelar
            </SecondaryButtonContainer>
            <PrimaryButtonContainer type="submit">
              Salvar
            </PrimaryButtonContainer>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateEditIncome;