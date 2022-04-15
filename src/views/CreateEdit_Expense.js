import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";

import PageTitleContainer from "../styles/PageTitleContainer";
import InputFieldContainer from "../styles/InputFieldContainer";
import PrimaryButtonContainer from '../styles/PrimaryButtonContainer';
import SecondaryButtonContainer from '../styles/SecondaryButtonContainer';

import InputLabel from "../components/InputLabel";

import requiredValidation from "../helpers/requiredValidation";

const CreateEdit_Expense = (props) => {
  const form = useRef();

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");

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
          <div className="input-field col s12 l6">
            <InputLabel id="value" name="Valor" />
            <InputFieldContainer>
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
          <div className="input-field col s12 l6">
            <InputLabel id="description" name="Descrição" />
            <InputFieldContainer>
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
          <div className="input-field col s12 l6">
            <InputLabel id="registerDate" name="Data" />
            <InputFieldContainer>
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
          <div className="input-field col s12 l6">
            <InputLabel id="category" name="Categoria" />
            <InputFieldContainer>
              <Input
                type="text"
                className="validate"
                name="category"
                value={category}
                onChange={onChangeCategory}
                validations={[requiredValidation]}
              />
            </InputFieldContainer>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 l6">
            <InputLabel id="paymentType" name="Forma de pagamento" />
            <InputFieldContainer>
              <Input
                type="text"
                className="validate"
                name="paymentType"
                value={paymentType}
                onChange={onChangePaymentType}
                validations={[requiredValidation]}
              />
            </InputFieldContainer>
          </div>
          </div>
        <div className="col s12" style={{ "text-align": "right" }}>
          <SecondaryButtonContainer type="button" onClick={onClickCancelButton}>
            Cancelar
          </SecondaryButtonContainer>
          <PrimaryButtonContainer type="submit">Salvar</PrimaryButtonContainer>
        </div>
      </Form>
    </div>
  );
};

export default CreateEdit_Expense;