import React, { ReactNode } from "react";
import styled from 'styled-components'
import Header from "../../components/header";
import Footer from "../../components/footer";
type ListsLayoutProps = {
  children: ReactNode
}
const ListsLayout: React.FC<ListsLayoutProps> = ({children}) => {
  return (
    <Lists>
      <Header/>
      <Main>
        {children}
      </Main>
      <Footer/>
    </Lists>
  )
}
const Lists = styled.div`
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
  padding: 16px 16px 0px 16px;
  height: calc(100vh - 81px);
`
export default ListsLayout