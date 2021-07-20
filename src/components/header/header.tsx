import React from "react";
import styled from 'styled-components'
type HeaderProps = {
  auth?: boolean
}
const Header:React.FC <HeaderProps> = ({ auth }) => {
 return (
  <Main>
    <img src="/assets/logotype.png" alt="#" />
    {
      auth ?
        null
      :
      <Options>
        <span>Leaderboard</span>
        <span>Network</span>
        <div>
          <img src="" alt="#" />
        </div>
        <span>{'name'}</span>
      </Options>
    }
  </Main>
 )
}
const Main = styled.div`
  background-color: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & img {
    height: 45px;
    width: 100px;
    cursor: pointer;
  }
`;
const Options = styled.div`
  display: flex;
  align-items: center;
  & img {
    height: 45px;
    width: 100px;
    cursor: pointer;
  }
`;
export default Header