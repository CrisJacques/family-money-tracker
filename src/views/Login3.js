import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Field, reduxForm } from 'redux-form';

import { login } from "../actions/auth";

import LoginPageContainer from "../styles/LoginPageContainer";
import LoginFormContainer from "../styles/LoginFormContainer";

import { InputField } from "../components/InputField";
import  LoginForm  from "../components/LoginForm";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { AppHeader } from "../components/AppHeader";

import showResults from "./showResults";


const Login3 = (props) => {
  return (
    <div>
      <h2>Simple Form</h2>
      <LoginForm onSubmit={showResults} />
    </div>
  );
};

export default Login3;

