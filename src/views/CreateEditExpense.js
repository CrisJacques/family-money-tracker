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

import CategoriasDespesasService from "../services/CategoriasDespesasService";
import FormasDePagamentoService from "../services/FormasDePagamentoService";

const CreateEditExpense = (props) => {
  const form = useRef();

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [categoriasDespesas, setCategoriasDespesas] = useState([]);
  const [formasDePagamento, setFormasDePagamento] = useState([]);

  const { user: currentUser } = useSelector((state) => state.auth);
  const userToken = `${currentUser.tokenType} ${currentUser.accessToken}`;

  const fetchPaymentTypes = async () => {
    const resposta = await FormasDePagamentoService.getFormasDePagamento(
      userToken
    );
    const result = Object.keys(resposta.data).map((key) => [resposta.data[key]]);
    setFormasDePagamento(result);
  };

  const fetchExpenseCategories = async () => {
    const resposta = await CategoriasDespesasService.getCategoriasDespesas(
      userToken
    );
    setCategoriasDespesas(resposta.data);
  };

  useEffect(() => {
    fetchPaymentTypes();
  }, []);

  useEffect(() => {
    fetchExpenseCategories();
  }, []);

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

  const onChangePaymentType = (e) => {
    const paymentType = e.target.value;
    setPaymentType(paymentType);
  };

  const onClickCancelButton = () => {
    props.history.push("/");
    window.location.reload();
  };

  return (
    <div>
      <PageTitleContainer>Cadastrar Despesa</PageTitleContainer>
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
              <InputLabel id="paymentType" name="Forma de pagamento" />
              <select
                className="browser-default"
                name="paymentType"
                value={paymentType}
                onChange={onChangePaymentType}
                validations={[requiredValidation]}
              >
                <option value="">Selecione uma forma de pagamento...</option>
                {formasDePagamento.map((formaDePagamento)=> <option key={formaDePagamento.cod} value={formaDePagamento.cod}>{formaDePagamento.descricao}</option>)}
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
                {categoriasDespesas.map((categoriaDespesa)=> <option key={categoriaDespesa.id} value={categoriaDespesa.id}>{categoriaDespesa.nome}</option>)}
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

export default CreateEditExpense;