import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import ProtectedRoute from "./components/NavBar/ProtectedRoute";
// import User from "./components/UserProfile";
import SplashPage from "./components/SplashPage";
import LandingPage from './components/LandingPage';
import CreateClassForm from './components/CreateClassForm';

// import redux
import { getAllUsers } from "./store/user";
import { setUser, authenticate } from "./store/session";

function App() {

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
      {/* <NavBar /> */}
      <Switch>
        {/* <ProtectedRoute path="/users/:userId" exact={true} authenticated={!!sessionUser}>
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path="/classes/new" exact={true} authenticated={!!sessionUser}>
          <CreateClassForm />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={!!sessionUser}>
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

