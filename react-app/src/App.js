import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import ProtectedRoute from "./components/NavBar/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserProfile/User"
import SplashPage from "./components/SplashPage";
import LandingPage from './components/LandingPage';

// import redux
import { getAllUsers } from "./store/user";
import { setUser } from "./store/session";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar/NavBar";

function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(getAllUsers());
    (async() => {
      const user = await dispatch(authenticate());
      if (!user.errors) {
        dispatch(setUser(user));
      }
      // await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return "loading...";
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/users" exact={true} authenticated={!!sessionUser}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={!!sessionUser}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} >
          <SplashPage />
        </Route>
        <ProtectedRoute path="/home" exact={true} authenticated={!!sessionUser} >
          <LandingPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

