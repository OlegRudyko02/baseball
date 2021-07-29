import React from "react";
import styled from "styled-components";
type TextareaProps = {
  input: any,
  meta: any
  placeholder: string
}
const Textarea: React.FC<TextareaProps> = ({ placeholder, input, meta }) => {
 return (
    <Container>
      <textarea {...input} placeholder={placeholder}/>
      {meta.error && meta.touched && <span>{input.name + " " + meta.error}</span>}
    </Container>
 )
}
const Container = styled.div`
  position: relative;
  margin-bottom: 15px;
  & textarea {
    resize:none;
    width: 100%;
    min-height: 110px;
    height: 40px;
    border-radius: 4px;
    background-color: #eff1f3;
    padding: 11px 16px;
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
export default Textarea