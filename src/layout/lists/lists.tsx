import React from "react";
import styled from 'styled-components'
import Header from "../../components/header";
import Footer from "../../components/footer";

const Lists: React.FC = () => {
  return (
    <ListsScreen>
      <Header/>
      <Main>
       
       
      </Main>
      <Footer/>
    </ListsScreen>
  )
}
const ListsScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
`
const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
export default Lists