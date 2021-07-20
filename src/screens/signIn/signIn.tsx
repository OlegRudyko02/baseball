import React from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import InputField from "../../components/inputField";

const SignIn: React.FC = () => {
  const signIn = (values: any) => {
    if (
      values.email &&
      values.password &&
      values.email.trim().length &&
      values.password.trim().length
    ) {

    }
  };
  return (
    <Modal>
      <Header>
        <p>Welcome to BaseballCloud!</p>
        <span>Sign into your account here:</span>
      </Header>
      <Forms>
        <Form
          onSubmit={signIn}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="email"
                  component={InputField}
                  placeholder="email"
                />
              </div>
              <div>
                <Field
                  name="password"
                  component={InputField}
                  placeholder="password"
                  secure
                />
              </div>
              <button type="submit">Sign In</button>
            </form>
          )}
        />
      </Forms>
      <div>
        <Recovery>
          <a href="">Forgotten password?</a>
        </Recovery>
        <ButtonSignUp>
          <p>Don’t have an account?</p>
          <span>Sign Up</span>
        </ButtonSignUp>
      </div>
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
`;
const Header = styled.div`
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & p {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;
const ButtonSignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    color: #48bbff;
    text-decoration: underline;
    padding-left: 3px;
    cursor: pointer;
  }
`;
const Recovery = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  & a {
    color: #337ab7;
    text-decoration: none;
  }
`;
const Forms = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
`;
export default SignIn;
