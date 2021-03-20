import React, {useSelector} from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <Route {...props}>
      {(props.authenticated)? props.children  : <Redirect to="/" />}
    </Route>
  )
};


export default ProtectedRoute;
