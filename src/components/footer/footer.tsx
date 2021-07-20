import React from "react";
import styled from 'styled-components'

const Footer:React.FC = () => {
 return (
  <Main>
    <Content>
      <span>© 2021 BaseballCloud</span>
      <a href=''>Terms of Service</a>
      <a href=''>Privacy Policy</a>
    </Content>
    <Content>
      <a href=''>Blog</a>
      <a href=''>Twitter</a>
      <a href=''>Instagram</a>
      <a href=''>Facebook</a>
    </Content>
  </Main>
 )
}
const Main = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px 10px 16px;
  font-size: 14px;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  & a {
    color: #337ab7;
    text-decoration: none;
    padding-right: 8px;
  }
  & span {
    padding-right: 8px;
  }
`
export default Footer