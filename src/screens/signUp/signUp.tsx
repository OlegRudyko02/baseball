import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import InputField from "../../components/inputField";
import SubmitButton from "../../components/button";
import Api from "../../api";
import { useAppDispatch } from "../../store";
import { actions } from "../../states/auth";
import { Link } from "react-router-dom";
import { ISignUp } from "../../interfaces/interfaces";

const SignUp: React.FC = () => {
  const [role, setRole] = useState("Player");
  const dispatch = useAppDispatch();
  const signUp = (values: ISignUp) => {
    const user = {
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      role: role.toLowerCase(),
    };
    Api.signUp(user)
      .then((res: any) => dispatch(actions.signIn(res.headers)))
      .catch((er: any) => console.log(er));
  };
  const email = (value: string) =>
    value && value.trim().length ? undefined : "Required";
  const password = (value: string) =>
    value && value.trim().length >= 8 ? undefined : "Required";
  const description =
    role === "Scout"
      ? "Coaches and scouts can view players in the system but do not have their own profile."
      : "Players have their own profile within the system and plan on having data collected.";
  return (
    <Modal>
      <RoleContainer>
        <RoleItem
          style={
            role === "Player"
              ? { color: "#fff", backgroundColor: "#35c32a" }
              : {}
          }
          onClick={() => setRole("Player")}
        >
          <span>Sign Up as Player</span>
        </RoleItem>
        <RoleItem
          style={
            role === "Player"
              ? {}
              : { color: "#fff", backgroundColor: "#35c32a" }
          }
          onClick={() => setRole("Scout")}
        >
          <span>Sign Up as Scout</span>
        </RoleItem>
      </RoleContainer>
      <RoleDescription>
        <div>{role + "s"}</div>
        <p>{description}</p>
      </RoleDescription>
      <Form
        onSubmit={signUp}
        validate={(values) => {
          const errors: any = {};
          if (values.password_confirmation !== values.password) {
            errors.password_confirmation = "Must match password";
          }
          return errors;
        }}
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
            <Field
              name="password_confirmation"
              component={InputField}
              placeholder="Confirm password"
              secure
              validate={password}
            />
            <Agree>
              By clicking Sign Up, you agree to our
              <a href="#"> Terms of Service</a> and
              <a href="#"> Privacy Policy</a>.
            </Agree>
            <SubmitButton disabled={submitting} text={"Sign Up"} />
          </Forms>
        )}
      />
      <ButtonSignIn>
        <p>Already registered?</p>
        <Link to="/signIn">Sign In</Link>
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
const RoleContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const RoleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 5px 17px;
  color: #35c32a;
  font-weight: 700;
  border: solid 1px #35c32a;
  background-color: #ffffff;
  width: 100%;
  cursor: pointer;
`;
const RoleDescription = styled.div`
  background: #48bbff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  & div {
    font-size: 36px;
    line-height: 0.78;
    margin-bottom: 20px;
  }
  & p {
    line-height: 1.64;
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
const Agree = styled.div`
  display: block;
  margin-bottom: 8px;
  margin-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
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
export default SignUp;
