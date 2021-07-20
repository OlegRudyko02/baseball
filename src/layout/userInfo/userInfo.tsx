import React from "react";
import styled from 'styled-components'
import Header from "../../components/header";
import Footer from "../../components/footer";

const UserInfo: React.FC = () => {
  return (
    <UserInfoScreen>
      <Header/>
      <Main>
       <InfoPanel>

       </InfoPanel>
       
      </Main>
      <Footer/>
    </UserInfoScreen>
  )
}
const UserInfoScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #788b99;
`
const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const InfoPanel = styled.div`
  height: 100%;
  width: 200px;
`
export default UserInfo