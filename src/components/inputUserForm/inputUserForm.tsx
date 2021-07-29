import React from "react";
import styled from "styled-components";
type InputUserFormProps = {
  input: any,
  meta: any
  placeholder: string
  type?: string
  style?: any
}
const InputUserForm: React.FC<InputUserFormProps> = ({ placeholder, input, meta, style, type = 'text' }) => {
 return (
    <Container style={style}>
      <input type={type} {...input} placeholder={placeholder}/>
      {meta.error && meta.touched && <span>{input.name + " " + meta.error}</span>}
    </Container>
 )
}
const Container = styled.div`
  position: relative;
  margin-bottom: 15px;
  & input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background-color: #eff1f3;
    padding: 6px 12px 10px 12px;
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
export default InputUserForm