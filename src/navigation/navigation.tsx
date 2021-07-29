import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "../screens/signIn";
import SignUp from "../screens/signUp";
import Recovery from "../screens/recoveryPass";
import AuthLayout from "../layout/authLayout";
import UserInfoLayout from "../layout/userInfoLayout";
import ListsLayout from "../layout/listsLayout";
import Profile from "../screens/profile";
import Leaderboard from "../screens/leaderboard";
import Network from "../screens/network";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "../store";
import { auth } from "../states/auth";

const Navigation: React.FC = () => {
  const user = useAppSelector(auth);
  const authCheck = (Screen?: any, Layout?: any) => {
    const WrappedComponent = (props: any) => {
      const { client } = user;
      const {
        match: { url },
      } = props;
      if (!Screen)
        return <Redirect to={client ? "/profile" : "/signIn"} />;
      if (url !== "/signIn" && url !== "/signUp" && url !== "/recovery" && !client) return <Redirect to="/signIn" />;
      if ((url === "/signIn" || url === "/signUp" || url === "/recovery") && client)
        return <Redirect to="/profile" />;
        return (
          <Layout {...props}>
            <Screen />
          </Layout>
        )
    };
    return WrappedComponent
  };
  return (
    <Switch>
      <Route exact path="/">
        {authCheck()}
      </Route>
      <Route exact path="/signIn">{authCheck(SignIn, AuthLayout)}</Route>
      <Route exact path="/signUp">{authCheck(SignUp, AuthLayout)}</Route>
      <Route exact path="/recovery">{authCheck(Recovery, AuthLayout)}</Route>
      <Route exact path="/profile">{authCheck(Profile, UserInfoLayout)}</Route>
      <Route exact path="/profile/:id">{authCheck(Profile, UserInfoLayout)}</Route>
      <Route exact path="/leaderboard">{authCheck(Leaderboard, ListsLayout)}</Route>
      <Route exact path="/network">{authCheck(Network, ListsLayout)}</Route>
    </Switch>
  );
};

export default Navigation;
