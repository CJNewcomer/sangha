import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from "./components/SplashPage";

// import redux
import { setUser } from "./store/session";
import { getAllUsers } from "./store/user";
import { authenticate } from "./services/auth";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(getAllUsers());
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        dispatch(setUser(user));
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return "loading...";
  }

  return (
    <BrowserRouter>
      <NavBar authenticated={!!sessionUser} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={!!sessionUser} />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={!!sessionUser} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={!!sessionUser}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={!!sessionUser}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={!!sessionUser} >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

