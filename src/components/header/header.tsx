import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { actions } from "../../states/auth";
import { useAppDispatch } from "../../store";
import Logo from '../icon/logo'
import { useClickOutside } from '../../App'
import { CURRENT_PROFILE } from "../../api/graphql/query";
import { useQuery } from "@apollo/client";
type HeaderProps = {
  auth?: boolean;
};
const Header: React.FC<HeaderProps> = ({ auth }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const innerRef = useRef(null)
  const { loading, data } = useQuery(CURRENT_PROFILE);
  useClickOutside(innerRef, () => setModalVisible(false))
  const logOut = () => {
    dispatch(actions.signOut());
  };
  return (
    <Main>
      <Link to="/">
        <Logo/>
      </Link>
      {auth ? null : loading ? null : (
        <Options>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/network">Network</Link>
          <Link to="/profile">
            <UserImg>
              <img src={data.current_profile.avatar || "/assets/user.svg"} alt="#" />
            </UserImg>
          </Link>
          <DropDown ref={innerRef} onClick={() => setModalVisible(true)}>
            <span>{data.current_profile.first_name + ' ' + data.current_profile.last_name}</span>
            {modalVisible ? (
              <ModalList>
                <Link to="/profile"> My Profile </Link>
                <a href='#' onClick={logOut}>Log Out</a>
              </ModalList>
            ) : null}
          </DropDown>
        </Options>
      )}
    </Main>
  );
};
const Main = styled.div`
  background-color: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 8px;
  & img {
    height: 45px;
    width: 100px;
    cursor: pointer;
  }
`;
const Options = styled.div`
  display: flex;
  align-items: center;
  color: #788b99;
  & a {
    padding: 0 8px;
    text-decoration: none;
    cursor: pointer;
    color: #788b99;
  }
  & span {
    margin: 0 8px;
    cursor: pointer;
  }
`;
const UserImg = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
const DropDown = styled.div`
  position: relative;
`;
const ModalList = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  background-color: #fff;
  padding: 8px 0;
  width: 178px;
  border-radius: 5px;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  z-index: 2;
  & a {
    display: block;
    width: 100%;
    padding: 8px 16px;
    color: #788b99;
    cursor: pointer;
    text-decoration: none;
  }
  & a:hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`;
export default Header;
