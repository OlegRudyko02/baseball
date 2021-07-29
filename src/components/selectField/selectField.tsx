import React from "react";
import styled from "styled-components";

type SelectFieldProps = {
  input: any,
  meta: any
  placeholder: string,
  style?: any
  arr: any[]
}
const SelectField: React.FC<SelectFieldProps> = ({ placeholder, input, meta, style, arr }) => {
 return ( 
    <Container style={style}>
      <select {...input} placeholder={placeholder}>
        {
          arr.map((item) => {
            if (typeof item === 'string') {
             return <option key={item} value={item.toLowerCase()}>{item}</option>
            }
            else {
              return <option key={item.id} value={item}>{item.name || item.u_name}</option>
            } 
          })
        }
      </select>
      {meta.error && meta.touched && <span>{input.name + " " + meta.error}</span>}
    </Container>
 )
}
const Container = styled.div`
  position: relative;
  margin-bottom: 15px;
  width: 100%;
  & select {
    position: relative;
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

export default SelectField