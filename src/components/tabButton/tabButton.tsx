import React from "react";
import styled from "styled-components";

type ChartButtonProps = {
  text: string
  onClick: any
  style: { color: string, backgroundColor: string} | {}
}
const ChartButton:React.FC<ChartButtonProps> = ({ text, onClick, style}) => {
 return (
  <Button style={style} onClick={onClick} type='button'> {text} </Button>
 )
}
const Button = styled.button`
  padding: 8px;
  margin: 8px;
  border: 2px solid #788b99;
  border-radius: 40px;
  cursor: pointer;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  color: #667784;
  background-color: #fff;
`;
export default ChartButton