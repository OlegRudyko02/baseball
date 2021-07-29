import React from "react";
import styled from 'styled-components'
import Header from "../../components/header";
import Footer from "../../components/footer";
type AuthLayoutProps = {
  Component: any
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ Component }) => {
 
  return (
    <Auth>
      <Header auth/>
      <Main>
        <Image src="/assets/stadium.png" alt="#" />
        <Component/>
      </Main>
      <Footer/>
    </Auth>
  )
}
const Auth = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const Main = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 81px);
  display: flex;
`
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
export default AuthLayout