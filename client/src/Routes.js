import React from "react";

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/authentificate" />;
const _App = ({ lastTab, isTokenVerified }) => (
  <Switch>
    <Route exact path="/authentificate" component={Login} />
    <ProtectedRoute
      isAllowed={isTokenVerified}
      exact
      path="/secrets"
      component={Secrets}
    />
    <ProtectedRoute
      isAllowed={isTokenVerified}
      exact
      path="/polices"
      component={Polices}
    />
    <ProtectedRoute
      isAllowed={isTokenVerified}
      exact
      path="/grants"
      component={Grants}
    />
    <Redirect from="/" to={lastTab} />
  </Switch>
);
