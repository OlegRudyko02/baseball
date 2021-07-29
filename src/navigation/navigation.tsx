import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "../screens/signIn";
import SignUp from "../screens/signUp";
import Recovery from "../screens/recoveryPass";
import AuthLayout from "../layout/authLayout";

const Navigation: React.FC = () => {
  const hoc = (WrappedComponent: any, Wrapper: any) => {
    return <Wrapper Component={WrappedComponent} />;
  };
  return (
    <Switch>
      <Route exact path="/">
        {hoc(SignIn, AuthLayout)}
      </Route>
      <Route path="/signIn">{hoc(SignIn, AuthLayout)}</Route>
      <Route path="/signUp">{hoc(SignUp, AuthLayout)}</Route>
      <Route path="/recovery">{hoc(Recovery, AuthLayout)}</Route>
    </Switch>
  );
};

export default Navigation;
