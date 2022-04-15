import styled from 'styled-components';

/* O objetivo deste syled component é centralizar o formulário de login na tela, tanto horizontalmente quanto verticalmente */
const LoginFormContainer = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`

export default LoginFormContainer;