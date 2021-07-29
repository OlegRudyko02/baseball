import React from "react";
import styled from "styled-components";
type SubmitButtonProps = {
  text: string
  disabled: boolean
}
const SubmitButton:React.FC<SubmitButtonProps> = ({ text, disabled }) => {
 return (
    <Button disabled={disabled} type='submit'> {text} </Button>
 )
}
const Button = styled.button`
  width: 100%;
  color: #ffffff;
  border: solid 1px transparent;
  box-shadow: 0 0 4px 0 rgb(72 187 255 / 0%);
  background-color: #48bbff;
  display: block;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  margin-bottom: 15px;
  cursor: pointer;
`;
export default SubmitButton