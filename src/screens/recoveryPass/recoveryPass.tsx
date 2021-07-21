import React from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import InputField from "../../components/inputField";
import SubmitButton from "../../components/buttons/submitButton";
import Api from "../../api";
import { Link } from "react-router-dom";

const Recovery: React.FC = () => {
  const recovery = (values: any) => {
    if (values.email && values.email.trim().length) {
      const user = {
        email: values.email
      };
      Api.recovery(user)
        .then((res: any) => console.log(res))
        .catch((er: any) => console.log(er));
    }
  };
  return (
    <Modal>
      <Header>
        <p>Forgot Password</p>
        <span>Please enter your email address. You will receive a link to reset your password via email.</span>
      </Header>
      <Form
        onSubmit={recovery}
        render={({ handleSubmit }) => (
          <Forms onSubmit={handleSubmit}>
            <Field name="email" component={InputField} placeholder="Email" />
            <SubmitButton text={"Submit"} />
          </Forms>
        )}
      />
      <ButtonSignIn>
        <p>Remember password?</p>
        <Link to='/signIn'> Sign In</Link>
      </ButtonSignIn>
    </Modal>
  );
};
const Modal = styled.div`
  width: 100%;
  max-width: 450px;
  background: hsla(0, 0%, 100%, 0.8);
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  backdrop-filter: blur(5px);
  margin: auto;
  color: #667784;
`;
const Header = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & p {
    font-size: 20px;
    margin-bottom: 8px;
  }
  & span {
    display: block;
    text-align: center;
  }
`;
const ButtonSignIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & a {
    color: #48bbff;
    padding-left: 3px;
  }
`;
const Forms = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
export default Recovery;
