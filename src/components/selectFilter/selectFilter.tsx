import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useClickOutside } from '../../App'

type SelectFilterProps = {
  data: string[];
  text?: string;
  choose: (value: any) => void;
  initialVal?: string
  position?: any
};
const SelectFilter: React.FC<SelectFilterProps> = ({ data, text = '', choose, initialVal = '', position = { right: '0px' }}) => {
  const [listVisible, setListVisible] = useState(false);
  const [value, setValue] = useState(initialVal);
  const ref = useRef(null)
  useClickOutside(ref, () => setListVisible(false))
  const handleClick = (value: string) => {
    setValue(value);
    choose(value);
    setListVisible(false);
  };
  return (
    <Container ref={ref}>
      <Button onClick={() => setListVisible(prev => !prev)}>
        {text + (value === 'None'? '' : text !== '' && value === 'All'? '' : value)}
        <span style={listVisible ? {transform:'rotate(180deg)'}: {}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="9"
            viewBox="0 0 16 9"
          >
            <path
              fill="#48BBFF"
              fillRule="nonzero"
              d="M13.469.432a1.081 1.081 0 0 1 1.565 0 1.165 1.165 0 0 1 0 1.615L8.78 8.43a1.083 1.083 0 0 1-1.567 0L.962 2.047a1.168 1.168 0 0 1 0-1.615 1.081 1.081 0 0 1 1.564 0L8 5.667 13.469.432z"
            ></path>
          </svg>
        </span>
      </Button>
      {listVisible ? (
        <List style={{...position}}>
          {data.map((item) => {
            return <a key={item} onClick={() => handleClick(item)}>{item}</a>;
          })}
        </List>
      ) : null}
    </Container>
  );
};
const Container = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
`;
const Button = styled.button`
  padding: 0;
  line-height: 1.19;
  font-size: 16px;
  color: #48bbff;
  white-space: nowrap;
  display: flex;
  align-items: flex-start;
  outline: none;
  border: none;
  background-color: #fff;
  cursor: pointer;
  & span {
    display: flex;
    margin-left: 6px;
    margin-top: 6px;
    width: 16px;
    height: 9px;
  }
`;
const List = styled.div`
  width: 178px;
  position: absolute;
  top: 100%;
  margin-top: 12px;
  padding: 8px 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  z-index: 10;
  & a {
    display: block;
    padding: 8px 16px;
    background: #fff;
    line-height: 1;
    color: #788b99;
    text-decoration: none;
    cursor: pointer;
  }
`;
export default SelectFilter;
