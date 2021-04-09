import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import ProtectedRoute from './components/NavBar/ProtectedRoute';
import UserProfile from './components/UserProfile';
import SplashPage from './components/SplashPage';
import LandingPage from './components/LandingPage';
import CreateClassForm from './components/CreateClassForm';
import ClassProfile from './components/ClassProfile/ClassProfile';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import ClassReview from './components/ClassReviews/ClassReview';
import AboutDev from './components/AboutDev/AboutDev';
import Messages from './components/Messages';
import PageNotFound from './components/PageNotFound/PageNotFound';

// import redux
import { authenticate } from './store/session';


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
      <NavBar />
      <Switch>
        <ProtectedRoute path="/classes/:classId" exact={true} authenticated={!!sessionUser}>
          <ClassProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/about" exact={true} authenticated={!!sessionUser}>
          <AboutDev />
        </ProtectedRoute>
        <ProtectedRoute path="/classes/:classId" exact={true} authenticated={!!sessionUser}>
          <ClassReview />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={!!sessionUser}>
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/classes" exact={true} authenticated={!!sessionUser}>
          <CreateClassForm />
        </ProtectedRoute>
        <ProtectedRoute path='/messages' exact={true} authenticated={!!sessionUser}>
          <Messages />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true} authenticated={!!sessionUser} >
          <LandingPage />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path='/search'>
          <SearchBar />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

