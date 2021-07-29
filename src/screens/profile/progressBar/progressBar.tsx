import React from "react";
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar'
import './bar.css'

type BarProps = {
  max: number
  current: number
  label: string
}
const Bar: React.FC<BarProps> = ({ max, label, current}) => {
 return (
    <Container>
      <Text>
        <p>{label}</p>
        <span>{max}</span>
      </Text>
      <ProgressBar now={current} />
    </Container>
 )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 0 0;
  width: 300px;
  
`;
const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span {
    font-weight: 700;
  }
`;
export default Bar