import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from "./components/SplashPage";

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
      {/* <NavBar authenticated={!!sessionUser} /> */}
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;

