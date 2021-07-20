import React, { useState }  from "react";
import SignIn from "../../screens/signIn";
import SignUp from "../../screens/signUp";
import styled from 'styled-components'
import Header from "../../components/header";
import Footer from "../../components/footer";

const Auth: React.FC = () => {
 const [currentScreen, setCurrentScreen] = useState('SignIn')

  return (
    <AuthScreen>
      <Header auth/>
      <Main>
        <img src="/assets/stadium.png" alt="#" />
        {currentScreen === 'SignIn' ?
          <SignIn/>
        :
          <SignUp/>}
      </Main>
      <Footer/>
    </AuthScreen>
  )
}
const AuthScreen = styled.div`
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
  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
export default Auth