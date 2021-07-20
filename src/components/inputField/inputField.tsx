import React from "react";
import styled from "styled-components";
type InputFieldProps = {
  input: any,
  meta: any
  placeholder: string
}
const InputField: React.FC<InputFieldProps> = ({placeholder, input }) => {
 return (
    <Container>
      <input type="text" {...input} placeholder={placeholder}/>
    </Container>
 )
}
const Container = styled.div`
  & input {
    width: 100%;
  }
`;
export default InputField