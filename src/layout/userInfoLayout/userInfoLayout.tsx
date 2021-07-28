import React, { ReactNode } from "react";
import styled from 'styled-components'
import Header from "../../components/header";
import Footer from "../../components/footer";
type UserInfoLayoutProps = {
  children: ReactNode
}
const UserInfoLayout: React.FC <UserInfoLayoutProps>= ({ children }) => {
  return (
    <UserInfo>
      <Header/>
      <Main>
        {children}
      </Main>
      <Footer/>
    </UserInfo>
  )
}
const UserInfo = styled.div`
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
  height: calc(100vh - 81px);
`
const InfoPanel = styled.div`
  height: 100%;
  width: 200px;
  background-color: #fff;
`
export default UserInfoLayout