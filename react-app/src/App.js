import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import ProtectedRoute from "./components/NavBar/ProtectedRoute";
// import UserProfile from "./components/UserProfile";
import SplashPage from "./components/SplashPage";
import LandingPage from './components/LandingPage';
import CreateClassForm from './components/CreateClassForm';
import ClassProfile from './components/ClassProfile/ClassProfile';
import SplashNavigation from './components/SplashPage/SplashNavigation';

// import redux
import { authenticate } from "./store/session";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    (async() => {
      const user = await dispatch(authenticate());
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return "loading...";
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} >
          <SplashNavigation />
        </Route>
        <ProtectedRoute path="/classes/:classId" exact={true} authenticated={!!sessionUser}>
          <ClassProfile />
        </ProtectedRoute>
        {/* <ProtectedRoute path="/users/:userId" exact={true} authenticated={!!sessionUser}>
          <UserProfile />
        </ProtectedRoute> */}
        <ProtectedRoute path="/classes/new" exact={true} authenticated={!!sessionUser}>
          <CreateClassForm />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={authenticated}>
          <SplashPage />
        </Route>
        <ProtectedRoute path="/home" exact={true} setAuthenticated={setAuthenticated} >
          <LandingPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

