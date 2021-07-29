import React from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import InputField from "../../components/inputField";
import SubmitButton from "../../components/button";
import Api from "../../api";
import { useAppDispatch } from "../../store";
import { actions } from "../../states/auth";
import { Link } from "react-router-dom";
import { ISignIn } from "../../interfaces/interfaces";
import { useHistory } from "react-router-dom";

const SignIn: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const signIn = (values: ISignIn) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    Api.signIn(user)
      .then((res: any) => {
        dispatch(actions.signIn(res.headers));
        history.push("/profile");
      })
      .catch((er: any) => console.log(er));
  };
  const email = (value: string) =>
    value && value.trim().length ? undefined : "Required";
  const password = (value: string) =>
    value && value.trim().length >= 8 ? undefined : "Required";
  return (
    <Modal>
      <Header>
        <p>Welcome to BaseballCloud!</p>
        <span>Sign into your account here:</span>
      </Header>
      <Form
        onSubmit={signIn}
        render={({ handleSubmit, submitting }) => (
          <Forms onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={email}
              component={InputField}
              placeholder="Email"
            />
            <Field
              name="password"
              component={InputField}
              placeholder="Password"
              secure
              validate={password}
            />
            <SubmitButton disabled={submitting} text={"Sign In"} />
          </Forms>
        )}
      />
      <div>
        <Recovery>
          <Link to="/recovery">Forgotten password?</Link>
        </Recovery>
        <ButtonSignUp>
          <p>Don’t have an account?</p>
          <Link to="/signUp">Sign Up</Link>
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
  color: #667784;
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
  & a {
    color: #48bbff;
    padding-left: 3px;
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
const Forms = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
export default SignIn;
