import React from "react";
import styled from "styled-components";
type InputFieldProps = {
  input: any,
  meta: any
  placeholder: string,
  secure?: boolean
}
const InputField: React.FC<InputFieldProps> = ({ placeholder, input, secure, meta }) => {
 return (
    <Container>
      <Img src="/assets/user.svg" alt="#" />
      <input type={secure ? 'password' : 'text'} {...input} placeholder={placeholder}/>
      {meta.error && meta.touched && <span>{input.name + " " + meta.error}</span>}
    </Container>
 )
}
const Container = styled.div`
  position: relative;
  margin-bottom: 15px;
  & input {
    width: 100%;
    height: 50px;
    border-radius: 4px;
    background-color: #eff1f3;
    padding: 6px 12px 10px 37px;
    font-size: 16px;
    line-height: 1.13;
    font-weight: 400;
    color: #667784;
    border: 1px solid transparent;
  }
  & span {
    display: block;
    margin-top: 8px;
    color: #F05F62;
  }
  & span:first-letter {
    text-transform: uppercase;
  }
`;
const Img = styled.img`
  margin-bottom: 15px;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 15px;
  left: 9px;
`;
export default InputField