import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import ProtectedRoute from "./components/NavBar/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from "./components/SplashPage";
import LandingPage from './components/LandingPage';

// import redux
import { getAllUsers } from "./store/user";
import { authenticate } from "./store/session";

function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(getAllUsers());
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return "loading...";
  }

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/users" exact={true} authenticated={!!sessionUser}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={!!sessionUser}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={!!sessionUser} >
          <SplashPage />
        </Route>
        <ProtectedRoute path="/" exact={true} authenticated={!!sessionUser} >
          <LandingPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

