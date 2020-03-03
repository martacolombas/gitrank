import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ isAllowed, ...props }) {
	return isAllowed ? <Route {...props} /> : <Redirect to='/login' />;
}

export default ProtectedRoute;

// const _App = ({ lastTab, isTokenVerified }) => {
//     /* verificar token */
// }
